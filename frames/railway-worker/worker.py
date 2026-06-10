#!/usr/bin/env python3
"""
Railway ffmpeg-воркер (поллер) для скилла call-analysis.

Опрашивает public.frame_jobs в Supabase → режет кадры из видео по таймкодам
(ffmpeg) → заливает в Supabase Storage (bucket FRAME_BUCKET) → пишет result в job.

Связь с Claude идёт ЧЕРЕЗ Supabase (общая «почта»): Claude кладёт job (через MCP),
воркер обрабатывает, Claude читает result. Прямого канала Railway<->Claude нет и не нужно.

ENV (задаются в Railway):
  SUPABASE_URL                 напр. https://beoendcicsoorvipswmh.supabase.co
  SUPABASE_SERVICE_ROLE_KEY    service_role ключ (Supabase → Settings → API)
  FRAME_BUCKET                 (опц.) bucket для кадров, default "frames"
  POLL_SEC                     (опц.) интервал опроса, default 15

Требует ffmpeg (см. nixpacks.toml). Чистый stdlib.
"""
import json, os, re, subprocess, time, tempfile, urllib.request, urllib.parse

SUPABASE_URL = os.environ["SUPABASE_URL"].rstrip("/")
KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]
BUCKET = os.environ.get("FRAME_BUCKET", "frames")
POLL = int(os.environ.get("POLL_SEC", "15"))
UA = {"User-Agent": "Mozilla/5.0 (frames-worker)"}


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


def extract(video, sec, path):
    cmd = ["ffmpeg", "-y", "-ss", str(sec), "-i", video, "-frames:v", "1", "-q:v", "2", path]
    p = subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
    if p.returncode != 0 or not os.path.exists(path):
        raise RuntimeError(p.stderr.decode("utf-8", "ignore")[-300:])


def upload(path, name):
    obj = urllib.parse.quote(name)
    sb("POST", f"/storage/v1/object/{BUCKET}/{obj}", body=open(path, "rb").read(), raw=True,
       extra={"Content-Type": "image/jpeg", "x-upsert": "true"})
    return f"{SUPABASE_URL}/storage/v1/object/public/{BUCKET}/{obj}"


def process(job):
    jid = job["id"]
    video = resolve_media(job["video_url"])
    out = []
    with tempfile.TemporaryDirectory() as d:
        for x in job["timestamps"]:
            sec = parse_ts(x)
            try:
                fp = os.path.join(d, f"f{sec}.jpg")
                extract(video, sec, fp)
                url = upload(fp, f"job{jid}_{sec:06d}.jpg")
                out.append({"sec": sec, "url": url})
                print(f"  job {jid}: {sec}s ok", flush=True)
            except Exception as e:
                out.append({"sec": sec, "error": str(e)[:200]})
                print(f"  job {jid}: {sec}s FAIL {e}", flush=True)
    return out


def claim_one():
    _, body = sb("GET", "/rest/v1/frame_jobs?status=eq.pending&order=id.asc&limit=1")
    rows = json.loads(body or b"[]")
    if not rows:
        return None
    job = rows[0]
    sb("PATCH", f"/rest/v1/frame_jobs?id=eq.{job['id']}&status=eq.pending",
       body={"status": "processing"}, extra={"Prefer": "return=minimal"})
    return job


def main():
    print(f"frames-worker up. bucket={BUCKET} poll={POLL}s url={SUPABASE_URL}", flush=True)
    while True:
        try:
            job = claim_one()
            if not job:
                time.sleep(POLL)
                continue
            print(f"processing job {job['id']} ({len(job['timestamps'])} ts)", flush=True)
            result = process(job)
            ok = any("url" in r for r in result)
            sb("PATCH", f"/rest/v1/frame_jobs?id=eq.{job['id']}",
               body={"status": "done" if ok else "error", "result": result,
                     "done_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())},
               extra={"Prefer": "return=minimal"})
            print(f"job {job['id']} done ({sum(1 for r in result if 'url' in r)}/{len(result)})", flush=True)
        except Exception as e:
            print(f"loop error: {e}", flush=True)
            time.sleep(POLL)


if __name__ == "__main__":
    main()
