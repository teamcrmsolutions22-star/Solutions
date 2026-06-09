# tl;dv-транскрипт для скилла `call-analysis`

Автозагрузка транскрипта встречи из tl;dv через **Supabase Edge Function** и **официальный API tl;dv**.

В отличие от Loom (публичный эндпоинт), у tl;dv транскрипт за авторизацией — нужен
**API-ключ** (генерится в настройках tl;dv, требует подходящего тарифа). Окружение Claude Code
on the web не имеет доступа к tldv.io (allowlist), поэтому запрос идёт со стороны Supabase.

## Архитектура

```
Claude (получил ссылку tl;dv)
   │  net.http_post -> tldv-transcript (через pg_net, внутри Supabase)
   ▼
Edge Function tldv-transcript
   │  1. вынимает meeting_id (24-hex) из ссылки
   │  2. GET https://pasta.tldv.io/v1alpha1/meetings/<id>/transcript   (header x-api-key)
   │  3. парсит JSON в "Спикер: текст"
   │  4. INSERT в public.tldv_transcripts (+ raw_excerpt для отладки)
   ▼
Claude читает transcript из public.tldv_transcripts (execute_sql) и разбирает встречу
```

Проект Supabase: **`call-analysis-bot`** (`beoendcicsoorvipswmh`).
Функция: `supabase/functions/tldv-transcript/index.ts`. Таблица: `supabase/migrations/0001_*.sql`.

## Установка / секрет

Единственный секрет (ставит пользователь, Claude его не видит):

1. tl;dv → **Settings → Personal settings → API keys** (`https://tldv.io/app/settings/personal-settings/api-keys`) → создать ключ.
   Если раздела нет — API не включён на тарифе.
2. Supabase Dashboard → проект `call-analysis-bot` → **Edge Functions → Secrets** → `TLDV_API_KEY = <ключ>`.
   (CLI: `supabase secrets set TLDV_API_KEY=... --project-ref beoendcicsoorvipswmh`)
3. Проверка: `ping` → `key_set:true`.

## Вызов (через Supabase MCP)

```sql
-- запустить загрузку (можно передать url или meeting_id)
select net.http_post(
  url := 'https://beoendcicsoorvipswmh.supabase.co/functions/v1/tldv-transcript',
  headers := jsonb_build_object(
    'Content-Type','application/json',
    'Authorization','Bearer ' || (select value from public.tg_config where key='anon_key'),
    'apikey', (select value from public.tg_config where key='anon_key')
  ),
  body := jsonb_build_object('action','fetch','url','https://tldv.io/app/meetings/<id>'),
  timeout_milliseconds := 15000
);

-- ответ функции (ok / диагностика: stage, status, hint)
select status_code, content from net._http_response order by id desc limit 1;

-- сам транскрипт
select transcript, chars from public.tldv_transcripts where meeting_id = '<id>' order by id desc limit 1;
```

## Диагностика ошибок (поле `stage` / `status`)

- `config` — не задан `TLDV_API_KEY`.
- `api` + `status 401/403` — неверный ключ или API не на тарифе.
- `api` + `status 404` — встреча не найдена / неверный id.
- `api` + `status 202/425` — транскрипт ещё обрабатывается, повторить позже.
- `empty` — ответ пустой; в `raw_excerpt`/`top_keys` видно форму ответа (подстроить парсер).

Парсер устойчив к форме ответа: собирает сегменты `data/transcript/segments[].{speaker,text}`,
иначе — глубокий обход по text-полям; если ответ plain-text — берёт как есть.
