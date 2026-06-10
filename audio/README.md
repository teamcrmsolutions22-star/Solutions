# Аудио-транскрипт для скилла `call-analysis`

Распознавание речи из аудио/видео-файлов через **Supabase Edge Function** + Whisper API.

Claude напрямую звук не «слышит», а это окружение не имеет egress к API распознавания.
Поэтому транскрибация идёт со стороны Supabase: функция качает аудио **по URL** → шлёт в Whisper →
кладёт текст в таблицу, а Claude читает его через Supabase MCP.

## Архитектура

```
Claude (есть ссылка на аудио)
   │  net.http_post -> audio-transcribe (через pg_net, внутри Supabase)
   ▼
Edge Function audio-transcribe
   │  1. качает файл по URL (лимит ~25 МБ — лимит Whisper)
   │  2. POST multipart -> Whisper:
   │       Groq   https://api.groq.com/openai/v1/audio/transcriptions  (whisper-large-v3)
   │       OpenAI https://api.openai.com/v1/audio/transcriptions       (whisper-1)
   │     провайдер выбирается автоматически по тому ключу, что задан
   │  3. INSERT в public.audio_transcripts
   ▼
Claude читает transcript из public.audio_transcripts (execute_sql) и разбирает встречу
```

Проект Supabase: **`call-analysis-bot`** (`beoendcicsoorvipswmh`).
Функция: `supabase/functions/audio-transcribe/index.ts`. Таблица: `supabase/migrations/0001_*.sql`.

## Установка / секрет (ставит пользователь, Claude не видит)

Один из ключей в Supabase → Edge Functions → Secrets:
- **`GROQ_API_KEY`** — рекомендуется (быстро/дёшево, whisper-large-v3). Ключ: console.groq.com
- или **`OPENAI_API_KEY`** — whisper-1.

Проверка: `ping` → `groq_set:true` / `openai_set:true`.

## Вызов (через Supabase MCP)

```sql
select net.http_post(
  url := 'https://beoendcicsoorvipswmh.supabase.co/functions/v1/audio-transcribe',
  headers := jsonb_build_object(
    'Content-Type','application/json',
    'Authorization','Bearer ' || (select value from public.tg_config where key='anon_key'),
    'apikey', (select value from public.tg_config where key='anon_key')
  ),
  body := jsonb_build_object('action','fetch','url','<АУДИО-URL>','language','ru'),
  timeout_milliseconds := 120000
);
select status_code, content from net._http_response order by id desc limit 1;
select transcript, chars from public.audio_transcripts where source_url = '<АУДИО-URL>' order by id desc limit 1;
```

## Ограничения / как подать аудио

- Аудио должно быть **доступно по URL** (прямая ссылка на файл). Файл, брошенный прямо в чат,
  это окружение транскрибировать не может (нет egress к API) — нужно положить файл туда, откуда
  его достанет функция (публичный URL или Supabase Storage).
- **Лимит ~25 МБ** на файл (ограничение Whisper). Длинное аудио — нарезать/сжать.
- Очень длинные файлы могут упереться в таймаут edge-функции — резать на части.
- Скриншоты (PNG/JPG) и PDF Claude читает **нативно** (инструмент Read) — для них функция не нужна.
