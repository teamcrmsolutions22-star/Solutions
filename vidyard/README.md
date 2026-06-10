# Vidyard-транскрипт для скилла `call-analysis`

Автозагрузка транскрипта из ссылки Vidyard через **Supabase Edge Function** — по той же схеме, что Loom.

Окружение Claude Code on the web не имеет доступа к vidyard (allowlist), поэтому загрузку
делает Edge Function на стороне Supabase, а Claude вызывает её через Supabase MCP и читает текст из таблицы.

## Как работает

```
Claude (получил ссылку Vidyard)
   │  net.http_post -> vidyard-transcript (через pg_net, внутри Supabase)
   ▼
Edge Function vidyard-transcript
   │  1. берёт id из ссылки (share.vidyard.com/watch/<id>, play/embed/<id>)
   │  2. тянет конфиг плеера: https://play.vidyard.com/player/<id>.json   ← публично, без авторизации
   │  3. находит в JSON caption .vtt url (или plain_text/transcript), качает VTT, парсит в текст
   │  4. INSERT в public.vidyard_transcripts
   ▼
Claude читает transcript из public.vidyard_transcripts (execute_sql) и разбирает встречу
```

Проект Supabase: **`call-analysis-bot`** (`beoendcicsoorvipswmh`).
Функция: `supabase/functions/vidyard-transcript/index.ts`. Таблица: `supabase/migrations/0001_*.sql`.

✅ Проверено на публичном демо-видео Vidyard: транскрипт получен через VTT, **без API-ключа** (~5 тыс. символов).

## Вызов (через Supabase MCP)

```sql
select net.http_post(
  url := 'https://beoendcicsoorvipswmh.supabase.co/functions/v1/vidyard-transcript',
  headers := jsonb_build_object(
    'Content-Type','application/json',
    'Authorization','Bearer ' || (select value from public.tg_config where key='anon_key'),
    'apikey', (select value from public.tg_config where key='anon_key')
  ),
  body := jsonb_build_object('action','fetch','url','https://share.vidyard.com/watch/<id>'),
  timeout_milliseconds := 20000
);
select status_code, content from net._http_response order by id desc limit 1;  -- ok / диагностика
select transcript, chars from public.vidyard_transcripts where share_url = '<ССЫЛКА>' order by id desc limit 1;
```

## Когда не сработает

- У видео **не включены субтитры/транскрипт** → их нужно сгенерировать в Vidyard.
- Видео **закрытое** (не публичное) → нужен **API-ключ владельца** (Vidyard Captions API: `vtt_url`/`txt_url`/`plain_text`); тогда допишем путь по аналогии с tl;dv (секрет `VIDYARD_API_KEY`).
- Vidyard изменил конфиг плеера → функция вернёт `ok:false` + диагностику (`stage`, `tried` со статусами, `raw_excerpt`).

Фолбэк всегда: открыть видео → включить/скопировать транскрипт вручную → вставить текст.
