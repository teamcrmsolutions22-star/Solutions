# frames-worker — Railway-поллер для кадров из видео

Долгоживущий сервис: опрашивает таблицу `public.frame_jobs` в Supabase, режет кадры
из видео по таймкодам (ffmpeg) и заливает их в Supabase Storage (bucket `frames`).

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
   - `SUPABASE_SERVICE_ROLE_KEY` = service_role-ключ (Supabase → **Settings → API → service_role**, секретный)
   - (опц.) `FRAME_BUCKET` = `frames` · `POLL_SEC` = `15`
4. **Deploy**. Nixpacks поставит ffmpeg (`nixpacks.toml`), воркер начнёт опрашивать `frame_jobs`.
   В логах должно появиться: `frames-worker up. bucket=frames ...`.

> `SUPABASE_SERVICE_ROLE_KEY` — секрет: ставится только в Railway Variables, в репозиторий не коммитим.

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
