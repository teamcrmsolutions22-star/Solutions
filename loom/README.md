# Loom-транскрипт для скилла `call-analysis`

Автозагрузка транскрипта из ссылки Loom через **Supabase Edge Function**.

Зачем так: окружение Claude Code on the web **не имеет доступа к `loom.com`** (сетевой
allowlist), а текст транскрипта на странице Loom рендерится JS. Поэтому загрузку делает
Edge Function на стороне Supabase (egress свободен), а Claude вызывает её через Supabase MCP
и читает готовый текст из таблицы.

## Как работает

```
Claude (получил ссылку Loom)
   │  net.http_post -> loom-transcript (через pg_net, внутри Supabase)
   ▼
Edge Function loom-transcript
   │  1. вынимает video_id из ссылки
   │  2. POST https://www.loom.com/graphql  (операция FetchVideoTranscript)
   │     -> source_url (JSON) / captions_source_url (VTT)   ← публично, без авторизации
   │  3. качает VTT/JSON, парсит в чистый текст
   │  4. INSERT в public.loom_transcripts
   ▼
Claude читает transcript из public.loom_transcripts (execute_sql) и разбирает звонок
```

Проект Supabase: **`call-analysis-bot`** (`beoendcicsoorvipswmh`).
Функция: `supabase/functions/loom-transcript/index.ts`. Таблица: `supabase/migrations/0001_*.sql`.

## Ключевой факт про доступы

Эндпоинт `FetchVideoTranscript` у Loom **публичный** — для обычных share-ссылок
**не нужны ни API-ключ, ни логин, ни куки**. Проверено на реальном видео (рус. транскрипт,
4021 символ, через VTT). Официального «API-ключа Loom» для транскриптов не существует
(dev.loom.com — только SDK записи), поэтому он и не требуется.

## Вызов (через Supabase MCP)

```sql
-- запустить загрузку
select net.http_post(
  url := 'https://beoendcicsoorvipswmh.supabase.co/functions/v1/loom-transcript',
  headers := jsonb_build_object(
    'Content-Type','application/json',
    'Authorization','Bearer ' || (select value from public.tg_config where key='anon_key'),
    'apikey', (select value from public.tg_config where key='anon_key')
  ),
  body := jsonb_build_object('action','fetch','url','https://www.loom.com/share/<id>'),
  timeout_milliseconds := 15000
);

-- прочитать ответ функции
select status_code, content from net._http_response order by id desc limit 1;

-- забрать сам транскрипт
select transcript, chars from public.loom_transcripts
where video_id = '<id>' order by id desc limit 1;
```

Для запароленного видео — добавь `'password','<пароль>'` в body (общий доступ к аккаунту не нужен).

## Когда авто-загрузка не сработает

- Видео **приватное** (только для воркспейса, нужен логин) или удалено/без транскрипта.
- Loom поменял внутренний эндпоинт (функция вернёт `ok:false` + диагностику: `stage`, `status`, `error`).

Фолбэк: открыть видео → вкладка **Transcript** → скопировать текст → вставить в чат.
Функция возвращает понятную ошибку, так что всегда видно, нужен ли фолбэк.
