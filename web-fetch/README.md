# fetch-url — забор текста из веб-страниц и Google Docs/Sheets/Slides

Edge Function `fetch-url` в проекте **call-analysis-bot** (`beoendcicsoorvipswmh`).
Нужна потому, что у окружения Claude нет egress к произвольным URL — а у Supabase он есть.

## Что делает
`POST { action:'fetch', url:'<любой URL>' }`:
1. Следует за редиректами (короткие ссылки `shr.name`, `t.ly` и т.п.) → `final_url`.
2. Если это Google **Docs / Sheets / Slides** — тянет export (`txt`/`csv`/`txt`).
   Если документ непубличный — вернёт честную ошибку `«документ не публичный…»`.
3. Иначе: HTML → текст (вырезает script/style/теги).
4. Кладёт результат в `public.web_fetches`; Claude читает его через Supabase MCP.

## Как Claude вызывает (через pg_net)
```sql
select net.http_post(
  'https://beoendcicsoorvipswmh.supabase.co/functions/v1/fetch-url',
  jsonb_build_object('action','fetch','url','<URL>'),
  headers := jsonb_build_object(
    'Content-Type','application/json',
    'Authorization','Bearer ' || (select value from tg_config where key='anon_key')
  )
);
-- ответ читать в net._http_response по вернувшемуся request_id;
-- полный текст — select text, chars from public.web_fetches order by id desc limit 1;
```

## Деплой
```
supabase functions deploy fetch-url --project-ref beoendcicsoorvipswmh
```
Миграция таблицы — `supabase/migrations/0001_web_fetches.sql`.

## Границы (честно)
- Приватные Google-документы (доступ «только по приглашению») → `export` отдаёт HTML-логин,
  функция вернёт ошибку. Лечится только повторной расшаркой «доступ по ссылке: любой».
- Мёртвые сокращатели (домен-парковка) → редирект ведёт в никуда, текста нет.
