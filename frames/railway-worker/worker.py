#!/usr/bin/env python3
"""
Railway ffmpeg-воркер (поллер) для скилла call-analysis.

Обрабатывает две очереди в Supabase:
  • public.frame_jobs  — стоп-кадры из видео по таймкодам -> Storage bucket `frames`
  • public.audio_jobs  — видео -> аудио-дорожка (ffmpeg -vn) -> Storage bucket `audio`
                         -> вызов Edge Function audio-transcribe (Whisper) -> транскрипт

Связь с Claude — через Supabase (общая «почта»). Прямого канала Railway<->Claude нет.

ENV: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, [FRAME_BUCKET=frames], [AUDIO_BUCKET=audio], [POLL_SEC=15]
Требует ffmpeg (см. Dockerfile). Чистый stdlib.
"""
import json, os, re, shutil, subprocess, time, tempfile, urllib.request, urllib.parse

SUPABASE_URL = os.environ["SUPABASE_URL"].rstrip("/")
KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]
FRAME_BUCKET = os.environ.get("FRAME_BUCKET", "frames")
AUDIO_BUCKET = os.environ.get("AUDIO_BUCKET", "audio")
POLL = int(os.environ.get("POLL_SEC", "15"))
AUDIO_FN = f"{SUPABASE_URL}/functions/v1/audio-transcribe"
UA = {"User-Agent": "Mozilla/5.0 (frames-worker)"}
YTDLP = shutil.which("yt-dlp")  # универсальный резолвер (YouTube/Vidyard/Loom/…); если нет — fallback на ffmpeg-direct


def sb(method, path, body=None, raw=False, extra=None):
    headers = {"apikey": KEY, "Authorization": f"Bearer {KEY}"}
    data = None
    if raw:
        data = body
    elif body is not None:
        data = json.dumps(body).encode()
        headers["Content-Type"] = "application/json"
    headers.update(extra or {})
    req = urllib.request.Request(f"{SUPABASE_URL}{path}", data=data, method=method, headers=headers)
    with urllib.request.urlopen(req, timeout=120) as r:
        return r.status, r.read()


def http_get(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=120) as r:
        return r.read()


def get_anon():
    _, b = sb("GET", "/rest/v1/tg_config?key=eq.anon_key&select=value")
    rows = json.loads(b or b"[]")
    return rows[0]["value"] if rows else None


def parse_ts(x):
    s = str(x).strip()
    if ":" in s:
        sec = 0
        for p in s.split(":"):
            sec = sec * 60 + int(p)
        return sec
    return int(float(s))


def pick_media(text):
    text = text.replace("\\/", "/")
    mp4 = [u for u in re.findall(r'https?:[^"\s\\]+?\.mp4[^"\s\\]*', text) if "urlset" not in u and ".m3u8" not in u]
    if mp4:
        return sorted(set(mp4), key=len)[-1]
    m3u8 = [u for u in re.findall(r'https?:[^"\s\\]+?\.m3u8[^"\s\\]*', text) if "urlset" not in u]
    if m3u8:
        return sorted(set(m3u8), key=len)[-1]
    return None


def resolve_media(video):
    if not video.startswith("http"):
        return video
    host = urllib.parse.urlparse(video).netloc
    try:
        if "vidyard.com" in host:
            m = re.search(r"/(?:watch|player|embed)/([A-Za-z0-9_-]{6,})", video)
            if m:
                pj = http_get(f"https://play.vidyard.com/player/{m.group(1)}.json").decode("utf-8", "ignore")
                u = pick_media(pj)
                if u:
                    return u
        if "loom.com" in host:
            u = pick_media(http_get(video).decode("utf-8", "ignore"))
            if u:
                return u
    except Exception as e:
        print(f"resolve failed: {e}", flush=True)
    return video


def fetch_to_file(url, d, audio=False):
    """Скачать медиа в локальный файл через yt-dlp (YouTube/Vidyard/Loom/прямые .mp4 и т.д.).
    Если yt-dlp нет или он не справился — вернуть прямой/резолвнутый URL (ffmpeg откроет сам)."""
    if YTDLP and url.startswith("http"):
        out = os.path.join(d, "dl.%(ext)s")
        fmt = "bestaudio/best" if audio else "best[height<=720][ext=mp4]/best[ext=mp4]/best"
        p = subprocess.run([YTDLP, "--no-playlist", "--no-warnings", "--no-progress",
                            "-f", fmt, "-o", out, url],
                           stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
        files = [os.path.join(d, f) for f in os.listdir(d) if f.startswith("dl.")]
        if p.returncode == 0 and files:
            return files[0]
        print(f"yt-dlp failed ({url}): {p.stderr.decode('utf-8', 'ignore')[-200:]}", flush=True)
    return resolve_media(url)


def ffmpeg(cmd):
    p = subprocess.run(["ffmpeg", "-y", *cmd], stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
    if p.returncode != 0:
        raise RuntimeError(p.stderr.decode("utf-8", "ignore")[-300:])


def upload(path, name, bucket, content_type):
    obj = urllib.parse.quote(name)
    sb("POST", f"/storage/v1/object/{bucket}/{obj}", body=open(path, "rb").read(), raw=True,
       extra={"Content-Type": content_type, "x-upsert": "true"})
    return f"{SUPABASE_URL}/storage/v1/object/public/{bucket}/{obj}"


def claim(table):
    _, b = sb("GET", f"/rest/v1/{table}?status=eq.pending&order=id.asc&limit=1")
    rows = json.loads(b or b"[]")
    if not rows:
        return None
    job = rows[0]
    sb("PATCH", f"/rest/v1/{table}?id=eq.{job['id']}&status=eq.pending",
       body={"status": "processing"}, extra={"Prefer": "return=minimal"})
    return job


# ---------- frames ----------
def process_frames(job):
    jid = job["id"]
    out = []
    with tempfile.TemporaryDirectory() as d:
        video = fetch_to_file(job["video_url"], d, audio=False)
        for x in job["timestamps"]:
            sec = parse_ts(x)
            try:
                fp = os.path.join(d, f"f{sec}.jpg")
                ffmpeg(["-ss", str(sec), "-i", video, "-frames:v", "1", "-q:v", "2", fp])
                url = upload(fp, f"job{jid}_{sec:06d}.jpg", FRAME_BUCKET, "image/jpeg")
                out.append({"sec": sec, "url": url})
            except Exception as e:
                out.append({"sec": sec, "error": str(e)[:200]})
    ok = any("url" in r for r in out)
    sb("PATCH", f"/rest/v1/frame_jobs?id=eq.{jid}",
       body={"status": "done" if ok else "error", "result": out,
             "done_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())},
       extra={"Prefer": "return=minimal"})
    print(f"frame job {jid} done ({sum(1 for r in out if 'url' in r)}/{len(out)})", flush=True)


# ---------- audio (видео -> аудио -> Whisper) ----------
def call_audio_transcribe(audio_url):
    anon = get_anon()
    data = json.dumps({"action": "fetch", "url": audio_url}).encode()
    req = urllib.request.Request(AUDIO_FN, data=data, method="POST",
                                 headers={"Content-Type": "application/json", "apikey": anon, "Authorization": f"Bearer {anon}"})
    with urllib.request.urlopen(req, timeout=300) as r:
        return r.status, r.read()


def fetch_transcript_text(audio_url):
    q = urllib.parse.quote(audio_url, safe="")
    _, b = sb("GET", f"/rest/v1/audio_transcripts?source_url=eq.{q}&select=transcript,chars&order=id.desc&limit=1")
    rows = json.loads(b or b"[]")
    if rows:
        return rows[0].get("transcript"), rows[0].get("chars")
    return None, None


def process_audio(job):
    jid = job["id"]
    with tempfile.TemporaryDirectory() as d:
        src = fetch_to_file(job["video_url"], d, audio=True)
        ap = os.path.join(d, f"a{jid}.m4a")
        ffmpeg(["-i", src, "-vn", "-ac", "1", "-ar", "16000", "-b:a", "64k", ap])
        size_mb = round(os.path.getsize(ap) / 1048576, 1)
        audio_url = upload(ap, f"audiojob{jid}.m4a", AUDIO_BUCKET, "audio/mp4")
    sb("PATCH", f"/rest/v1/audio_jobs?id=eq.{jid}",
       body={"status": "transcribing", "audio_url": audio_url, "size_mb": size_mb},
       extra={"Prefer": "return=minimal"})
    st, body = call_audio_transcribe(audio_url)
    if st != 200:
        raise RuntimeError(f"audio-transcribe {st}: {body.decode('utf-8', 'ignore')[:200]}")
    transcript, chars = fetch_transcript_text(audio_url)
    sb("PATCH", f"/rest/v1/audio_jobs?id=eq.{jid}",
       body={"status": "done", "transcript": transcript, "chars": chars,
             "done_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())},
       extra={"Prefer": "return=minimal"})
    print(f"audio job {jid} done ({chars} chars, {size_mb}MB)", flush=True)


def main():
    print(f"frames-worker up. frames={FRAME_BUCKET} audio={AUDIO_BUCKET} poll={POLL}s "
          f"yt-dlp={'yes' if YTDLP else 'no'} url={SUPABASE_URL}", flush=True)
    while True:
        try:
            did = False
            fj = claim("frame_jobs")
            if fj:
                print(f"processing frame job {fj['id']}", flush=True)
                process_frames(fj)
                did = True
            aj = claim("audio_jobs")
            if aj:
                print(f"processing audio job {aj['id']}", flush=True)
                try:
                    process_audio(aj)
                except Exception as e:
                    sb("PATCH", f"/rest/v1/audio_jobs?id=eq.{aj['id']}",
                       body={"status": "error", "error": str(e)[:400]}, extra={"Prefer": "return=minimal"})
                    print(f"audio job {aj['id']} error: {e}", flush=True)
                did = True
            if not did:
                time.sleep(POLL)
        except Exception as e:
            print(f"loop error: {e}", flush=True)
            time.sleep(POLL)


if __name__ == "__main__":
    main()
