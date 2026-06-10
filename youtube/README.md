# youtube-transcript — субтитры YouTube → текст

Edge Function `youtube-transcript` в проекте **call-analysis-bot** (`beoendcicsoorvipswmh`).
Тянет субтитры видео без браузера и кладёт текст в `public.youtube_transcripts`;
Claude читает через Supabase MCP (egress к YouTube есть только у Supabase).

## Как достаёт субтитры
Последовательно пробует 3 источника, берёт первый, что отдал непустой timedtext:
1. **InnerTube ANDROID** (`youtubei/v1/player`, клиент ANDROID) — самый надёжный из дата-центра;
2. **InnerTube WEB**;
3. **scrape** watch-страницы (`captionTracks` из `ytInitialPlayerResponse`).

Дальше `baseUrl` → `&fmt=json3` → собираем `events[].segs[].utf8`. Выбор дорожки: предпочитаем
ручные субтитры на нужном языке (`lang`), иначе любые ручные, иначе авто (`asr`).

> Простой scrape watch-страницы из дата-центра часто отдаёт **пустой** timedtext (анти-бот / PO-token).
> Поэтому первичен InnerTube ANDROID — на нём проверено работает.

## Вызов (через pg_net)
```sql
select net.http_post(
  'https://beoendcicsoorvipswmh.supabase.co/functions/v1/youtube-transcript',
  jsonb_build_object('action','fetch','id','<videoId или URL>','lang','uk'),
  headers := jsonb_build_object(
    'Content-Type','application/json',
    'Authorization','Bearer ' || (select value from tg_config where key='anon_key')
  )
);
-- ответ → net._http_response; полный текст → public.youtube_transcripts.
```

Ответ: `{ ok, via:'ANDROID', lang, chars, langs:[…доступные дорожки…], preview }`
или `{ ok:false, stage:'no_captions', attempts:[…] }` — у видео **нет субтитров**.

## Видео без субтитров
`no_captions` (0 tracks во всех источниках) — это не сбой функции, у ролика просто нет субтитров.
Тогда путь один: **audio → Whisper** через `audio_jobs` (Railway-воркер с yt-dlp тянет аудио →
Edge Function `audio-transcribe`). См. `frames/railway-worker/`.

## Деплой
```
supabase functions deploy youtube-transcript --project-ref beoendcicsoorvipswmh
```
Миграция таблицы — `supabase/migrations/0001_youtube_transcripts.sql`.
