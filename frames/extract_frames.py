#!/usr/bin/env python3
"""
extract_frames.py — ffmpeg-воркер для скилла call-analysis.

Берёт видео (URL / Loom-Vidyard share-ссылку / локальный файл) и список
таймкодов ключевых моментов (их подбирает Claude по транскрипту) и вырезает
кадры через ffmpeg. Опционально заливает кадры в Supabase Storage, чтобы
Claude мог их прочитать и описать.

Требует установленного ffmpeg. Чистый stdlib (urllib / subprocess / json).
Запускать ТАМ, где есть ffmpeg и интернет: локально / VPS / Cloud Run.

Примеры:
  python3 extract_frames.py --video meeting.mp4 --timestamps "0:12,1:05,3:40" --out ./frames
  python3 extract_frames.py --video https://share.vidyard.com/watch/<id> --timestamps "1:00,2:30"
  python3 extract_frames.py --video https://.../video.mp4 --timestamps 12,65,220
  # с заливкой в Supabase Storage (env SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY):
  python3 extract_frames.py --video meeting.mp4 --timestamps 12,65 --supabase-bucket frames
"""
import argparse, json, os, re, subprocess, sys, urllib.request, urllib.parse

UA = {"User-Agent": "Mozilla/5.0 (call-analysis frames worker)"}


def http_get(url, headers=None):
    req = urllib.request.Request(url, headers={**UA, **(headers or {})})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read()


def parse_ts(s):
    """'90' / '1:30' / '1:02:03' -> секунды (int)."""
    s = s.strip()
    if not s:
        return None
    if ":" in s:
        sec = 0
        for p in s.split(":"):
            sec = sec * 60 + int(p)
        return sec
    return int(float(s))


def pick_media(text):
    """Из текста (player JSON / HTML) выбрать прямой .mp4, избегая adaptive urlset/m3u8."""
    text = text.replace("\\/", "/")
    mp4 = [u for u in re.findall(r'https?:[^"\s\\]+?\.mp4[^"\s\\]*', text) if "urlset" not in u and ".m3u8" not in u]
    if mp4:
        return sorted(set(mp4), key=len)[-1]
    m3u8 = [u for u in re.findall(r'https?:[^"\s\\]+?\.m3u8[^"\s\\]*', text) if "urlset" not in u]
    if m3u8:
        return sorted(set(m3u8), key=len)[-1]
    return None


def resolve_media(video):
    """Best-effort: Vidyard/Loom share URL -> прямой .mp4 (или реальный HLS). Иначе вернуть как есть."""
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
        print(f"  (резолв медиа не удался: {e}; использую ссылку как есть)", file=sys.stderr)
    return video


def extract(video, sec, out_path):
    # -ss перед -i = быстрый seek; -q:v 2 = хорошее качество jpg
    cmd = ["ffmpeg", "-y", "-ss", str(sec), "-i", video, "-frames:v", "1", "-q:v", "2", out_path]
    p = subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
    if p.returncode != 0 or not os.path.exists(out_path):
        raise RuntimeError(p.stderr.decode("utf-8", "ignore")[-300:])


def supa_upload(path, bucket):
    base = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    if not base or not key:
        print("  (для заливки нужны env SUPABASE_URL и SUPABASE_SERVICE_ROLE_KEY)", file=sys.stderr)
        return None
    name = os.path.basename(path)
    url = f"{base}/storage/v1/object/{bucket}/{urllib.parse.quote(name)}"
    req = urllib.request.Request(
        url, data=open(path, "rb").read(), method="POST",
        headers={"Authorization": f"Bearer {key}", "apikey": key, "Content-Type": "image/jpeg", "x-upsert": "true"},
    )
    try:
        urllib.request.urlopen(req, timeout=60)
        return f"{base}/storage/v1/object/public/{bucket}/{urllib.parse.quote(name)}"
    except Exception as e:
        print(f"  (заливка не удалась: {e})", file=sys.stderr)
        return None


def main():
    ap = argparse.ArgumentParser(description="Вырезать кадры из видео по таймкодам (ffmpeg)")
    ap.add_argument("--video", required=True, help="URL медиа / Loom-Vidyard share-ссылка / локальный файл")
    ap.add_argument("--timestamps", required=True, help="через запятую: секунды или mm:ss / hh:mm:ss")
    ap.add_argument("--out", default="./frames", help="папка для кадров")
    ap.add_argument("--prefix", default="frame", help="префикс имени файла")
    ap.add_argument("--supabase-bucket", default=None, help="залить кадры в этот bucket Supabase Storage")
    args = ap.parse_args()

    if subprocess.run(["which", "ffmpeg"], stdout=subprocess.DEVNULL).returncode != 0:
        sys.exit("ffmpeg не найден. Установи: macOS `brew install ffmpeg`, Ubuntu `sudo apt install ffmpeg`.")

    os.makedirs(args.out, exist_ok=True)
    video = resolve_media(args.video)
    print(f"видео: {video}")
    tss = [parse_ts(x) for x in args.timestamps.split(",") if x.strip()]
    results = []
    for sec in tss:
        path = os.path.join(args.out, f"{args.prefix}_{sec:06d}.jpg")
        try:
            extract(video, sec, path)
            url = supa_upload(path, args.supabase_bucket) if args.supabase_bucket else None
            results.append({"sec": sec, "file": path, "url": url})
            print(f"  ✓ {sec}s -> {path}" + (f"  {url}" if url else ""))
        except Exception as e:
            print(f"  ✗ {sec}s: {e}", file=sys.stderr)
    print(f"\nГотово: {len(results)}/{len(tss)} кадров в {args.out}")
    print(json.dumps(results, ensure_ascii=False))


if __name__ == "__main__":
    main()
