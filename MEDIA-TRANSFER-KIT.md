# 📦 MEDIA TRANSFER KIT — перенос «видео/аудио/транскрипты» в другой проект

Цель: поднять пайплайн **«медиа → текст (+ кадры)»** в **новом, независимом** окружении
(другой Supabase + другой репозиторий + другой Claude), без потери качества.

Возможности, которые переносятся:
- **Loom / tl;dv / Vidyard / YouTube** → транскрипт (субтитры);
- **веб-страница / Google Doc/Sheet/Slides** → текст;
- **аудио по URL** → текст (Whisper);
- **видео без субтитров** (YouTube/Vidyard/Loom/файл) → аудио → Whisper (через Railway-воркер с yt-dlp);
- **стоп-кадры из видео** по ключевым таймкодам (ffmpeg-воркер) → Storage.

> Качество идентично, потому что это **тот же код и та же модель**. Единственное ограничение —
> YouTube из дата-центра (нужны cookies в `YT_COOKIES` у воркера) — оно одинаково везде.

---

## Что скопировать в новый репозиторий
Самодостаточные модули (каждый = edge-функция + миграция + README):
```
loom/        tldv/        vidyard/        youtube/        web-fetch/        audio/        frames/
```
Плюс инструкция для Claude (как дёргать источники): `.claude/skills/call-analysis/SKILL.md`
(для медиа важен **шаг 0 «Источник»** — там SQL по каждому источнику; остальное про Notion/Telegram — опционально).

---

## Шаги установки (новый Claude выполняет в НОВОМ Supabase через Supabase MCP)

### 1. Таблицы и бакеты (миграции)
Прогнать миграции из скопированных папок (`apply_migration`):
- `loom/…/0001_loom_transcripts.sql`, `tldv/…0001_…`, `vidyard/…0001_…`, `youtube/…0001_…`,
  `web-fetch/…0001_web_fetches.sql`, `audio/…0001_audio_transcripts.sql`,
  `frames/…0001_frame_jobs.sql`, `frames/…0002_audio_jobs.sql`.
- Storage-бакеты:
```sql
insert into storage.buckets (id,name,public) values ('frames','frames',true),('audio','audio',true)
on conflict (id) do nothing;
```
- Минимальный `tg_config` (нужен воркеру и для вызова функций через pg_net):
```sql
create table if not exists public.tg_config (key text primary key, value text);
alter table public.tg_config enable row level security;
insert into public.tg_config(key,value) values ('anon_key','<НОВЫЙ publishable/anon key проекта>')
on conflict (key) do update set value=excluded.value;
```

### 2. Секреты (Supabase → Edge Functions → Secrets)
- `TLDV_API_KEY` — только для tl;dv.
- `GROQ_API_KEY` **или** `OPENAI_API_KEY` — для `audio-transcribe` (Whisper).
- (loom / vidyard / youtube / fetch-url секретов НЕ требуют.)
`SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` подставляются платформой автоматически.

### 3. Деплой edge-функций (`deploy_edge_function`)
`loom-transcript`, `tldv-transcript`, `vidyard-transcript`, `youtube-transcript`, `fetch-url`, `audio-transcribe`.
Источники — в соответствующих папках `*/supabase/functions/<name>/index.ts`.
> verify_jwt можно оставить true и вызывать через pg_net с `Authorization: Bearer <anon_key из tg_config>`
> (как в SKILL.md). `audio-transcribe` воркер вызывает тем же anon_key.

### 4. Railway-воркер (видео→аудио→Whisper + кадры)
Деплой `frames/railway-worker/` (Dockerfile ставит ffmpeg + yt-dlp). Variables:
- `SUPABASE_URL` = `https://<новый-проект>.supabase.co`
- `SUPABASE_SERVICE_ROLE_KEY` = service/secret-ключ нового проекта
- (опц.) `YT_COOKIES` = cookies.txt (для YouTube из дата-центра), `FRAME_BUCKET`, `AUDIO_BUCKET`, `POLL_SEC`.
Деплой: Root Directory = `frames/railway-worker`, сборка по Dockerfile.

### 5. Скилл (чтобы новый Claude знал, КАК это дёргать)
Скопировать `.claude/skills/call-analysis/SKILL.md`. В **SQL-сниппетах шага 0 заменить URL проекта**
(`https://beoendcicsoorvipswmh.supabase.co/...` → `https://<новый-проект>.supabase.co/...`).

---

## Проверка (после установки)
- Loom/Vidyard/YouTube: дёрнуть функцию через pg_net → прочитать `*_transcripts`.
- Аудио без субтитров: `insert into audio_jobs(video_url,meeting) …` → воркер → `audio_jobs.transcript`.
- Кадры: `insert into frame_jobs(video_url,timestamps,meeting) …` → `frame_jobs.result` (URL кадров).
Детали и SQL — в README каждой папки и в `SKILL.md` (шаг 0).

## Что НЕ входит (это про продажника, не про медиа)
`telegram*`, `calendar/`, `server-agent/`, базы Notion «Договорённости/Менеджери/Правила» — не нужны
для медиа-пайплайна. Бери только модули из списка выше.
