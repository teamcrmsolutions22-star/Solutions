# frames-worker — Railway-поллер для кадров и аудио из видео

Долгоживущий сервис. Опрашивает **две** очереди в Supabase:
- `public.frame_jobs` — режет кадры из видео по таймкодам (ffmpeg) → Storage bucket `frames`,
  + **OCR/описание каждого кадра** через edge fn `frame-ocr` (Groq Vision, бесплатно) → `result[].text`.
  Авто-режим: пустые `timestamps` (`[]`) → воркер сам режет кадры на **сменах сцен** (scene-detect);
- `public.audio_jobs` — тянет аудио-дорожку из видео (ffmpeg `-vn`) → Storage bucket `audio`
  → зовёт Edge Function `audio-transcribe` (Whisper) → транскрипт обратно в `audio_jobs`.

Резолвер медиа — **yt-dlp** (ставится в Dockerfile): открывает YouTube/Vidyard/Loom и прямые
`.mp4`. Если yt-dlp недоступен или не справился — fallback на ffmpeg по прямой ссылке.
Это и есть путь для видео **без субтитров** (когда `youtube-transcript` вернул `no_captions`):
видео → аудио → Whisper.

## Как это «соединяется с Claude»
Прямого канала Railway ↔ Claude нет (и не нужно). Связь — **через Supabase**, как общая почта:

```
Claude ── INSERT в frame_jobs (через Supabase MCP) ──▶ Supabase ◀── опрашивает ── Railway worker
   ▲                                                                                   │
   └────────── читает result (URL кадров) ◀── кадры в Storage bucket `frames` ◀────────┘
```

Railway-воркер ходит и в Supabase, и к видео-CDN (у него открытый интернет). Claude — только
в Supabase (через MCP). Поэтому всё работает несмотря на сетевой allowlist окружения Claude.

## Деплой на Railway (≈5 кликов; проект создаёт пользователь)
1. Railway → **New** → **Deploy from GitHub repo** → `teamcrmsolutions22-star/solutions`
   (или в существующем проекте: **+ New → GitHub Repo**).
2. Service → **Settings → Root Directory** = `frames/railway-worker`
   (важно: чтобы Railway собирал именно воркер, а не весь репозиторий).
3. **Variables** (env):
   - `SUPABASE_URL` = `https://beoendcicsoorvipswmh.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY` = секретный ключ (новый `sb_secret_...` из **Settings → API Keys**, либо legacy `service_role`)
   - (опц.) `FRAME_BUCKET` = `frames` · `AUDIO_BUCKET` = `audio` · `POLL_SEC` = `15`
   - (опц.) `YT_COOKIES` = содержимое `cookies.txt` (Netscape-формат) — нужно, чтобы yt-dlp тянул
     **YouTube** из дата-центра (без cookies YouTube отдаёт bot-check). Экспортируй cookies из браузера
     расширением «Get cookies.txt», вставь весь текст в эту переменную.
4. **Deploy**. Сборка идёт через **Dockerfile** (ставит ffmpeg + yt-dlp). Воркер начнёт
   опрашивать обе очереди. В логах: `frames-worker up. frames=frames audio=audio … yt-dlp=yes cookies=… …`.

> `SUPABASE_SERVICE_ROLE_KEY` — секрет: ставится только в Railway Variables, в репозиторий не коммитим.

> **Watchdog.** Воркер каждые ~`POLL_SEC` пишет «я жив» в `public.worker_heartbeat`. Крон
> `worker-watchdog` (раз в 5 мин) шлёт алерт в Telegram менеджеру (`tg_config.report_chat_id`),
> если воркер замолчал >10 мин — конвейер не умрёт молча.

## Как Claude ставит задание
```sql
insert into public.frame_jobs (video_url, timestamps, meeting) values (
  'https://share.vidyard.com/watch/<id>',   -- или прямой URL .mp4 / Loom
  '[12, "1:05", "3:40"]'::jsonb,            -- секунды или mm:ss
  'Разбор такой-то встречи'
);
```
Воркер обработает и запишет `result = [{"sec":12,"url":"https://…/frames/job1_000012.jpg"}, …]`,
`status = done`. Claude читает result через MCP.

## Нюанс
Кадры лежат в Supabase Storage (публичный bucket) — это для Notion/документа и для тебя.
Claude из своего окружения **сами картинки по URL не открывает** (нет egress). Чтобы Claude
описал конкретный кадр — приложи его в чат или вставь в Notion.
