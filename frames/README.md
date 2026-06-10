# Кадры из видео по ключевым моментам (ffmpeg-воркер)

Вырезает стоп-кадры из видео на нужных секундах (их подбирает Claude по транскрипту),
опционально заливает в Supabase Storage — чтобы Claude потом их прочитал/описал.

Почему отдельный воркер: ffmpeg нельзя запустить ни в окружении Claude Code on the web
(нет ffmpeg + нет egress к видео-CDN), ни в Supabase Edge Functions (лёгкий Deno, видео не
декодирует). Нужен компонент с ffmpeg и интернетом.

## Что нужно
- Python 3 (только stdlib) + **ffmpeg** в PATH.
  - macOS: `brew install ffmpeg` · Ubuntu/Debian: `sudo apt install ffmpeg`
- (опц.) для заливки кадров: env `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` + bucket.

## Запуск (вручную, где угодно)
```bash
python3 extract_frames.py --video meeting.mp4 --timestamps "0:12,1:05,3:40" --out ./frames
python3 extract_frames.py --video https://share.vidyard.com/watch/<id> --timestamps "1:00,2:30"
# с заливкой в Supabase Storage:
SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... \
python3 extract_frames.py --video meeting.mp4 --timestamps 12,65 --supabase-bucket frames
```
`--video` принимает: прямой URL медиа, локальный файл, либо Loom/Vidyard share-ссылку
(скрипт best-effort достаёт `.mp4` из конфига плеера). `--timestamps`: секунды или `mm:ss`/`hh:mm:ss`.

## Хостинг на Railway (и аналогах: VPS / Cloud Run / Fly)
ffmpeg на Railway ставится легко: положи рядом **`nixpacks.toml`** с
```toml
[phases.setup]
aptPkgs = ["ffmpeg"]
```
(или Dockerfile с `apt-get install -y ffmpeg`). Дальше два режима:

1. **Разовый / cron** — Railway Cron Job запускает `extract_frames.py` с нужными аргументами.
   Просто и достаточно, если кадры режем по запросу.
2. **Декаплед-поллер (для полной автоматизации, рекомендуется)** — сделать из воркера
   маленький сервис, который **опрашивает таблицу `public.frame_jobs` в Supabase**: Claude
   кладёт задание (видео + таймкоды) через Supabase MCP → Railway-воркер видит его, режет
   кадры, заливает в Supabase Storage, помечает done → Claude читает кадры.
   Почему так: окружение Claude **не может дёргать Railway напрямую** (allowlist), а Railway
   спокойно ходит и в Supabase, и к видео-CDN. То есть связь идёт через Supabase, как у
   telegram-outbox. (Эту таблицу + поллер можно добавить — скажи, соберу.)

## Поток
1. Берём транскрипт (Loom/tl;dv/Vidyard/аудио) — уже умеем.
2. Claude по транскрипту выбирает ключевые моменты → список таймкодов.
3. Воркер режет кадры на этих секундах.
4. Кадры → Supabase Storage / Notion; Claude читает и описывает, что на экране.
