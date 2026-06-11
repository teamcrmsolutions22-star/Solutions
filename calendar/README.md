# calendar — Google Calendar для AI-продажника (Блок 3, мульти-менеджер)

Edge Function `calendar` в проекте **call-analysis-bot** (`beoendcicsoorvipswmh`), `verify_jwt=false`
(OAuth-callback должен быть публичным; экшены защищены заголовком `x-fn-secret` = `tg_config.webhook_secret`).

**Мульти-менеджер:** у каждого менеджера свой календарь. Токены лежат в `tg_employees`
(`google_refresh_token`/`google_email`/`google_calendar_id`), менеджер определяется по Telegram `chat_id`.
Каждый менеджер один раз подключает СВОЙ Google по персональной ссылке.

## Что умеет (все экшены принимают `manager` = chat_id/имя/username)
- `connect_links` → персональные ссылки подключения Google для всех активных менеджеров + статус.
- `oauth_url {manager}` → ссылка подключения для одного менеджера.
- `status {manager?}` → кто подключён (или сводка по всем).
- `set_calendar {manager, calendar_id}` → выбрать календарь менеджера (по умолч. `primary`).
- `slots {manager}` → свободные слоты ЭТОГО менеджера (freeBusy + Mon–Fri 10–19 Europe/Kyiv, 30 мин).
- `book {manager, start, client_email}` → событие в календаре менеджера + инвайт клиенту + Google Meet.

## Разовая настройка Google (Workspace — надёжнее)
1. console.cloud.google.com → проект (новый или существующий).
2. **APIs & Services → Library** → включить **Google Calendar API**.
3. **OAuth consent screen** → User type **Internal** (для Workspace; для Gmail — External + добавь себя в Test users).
4. **Credentials → Create credentials → OAuth client ID** → тип **Web application**.
   **Authorized redirect URIs** → добавить ровно:
   `https://beoendcicsoorvipswmh.supabase.co/functions/v1/calendar`
5. Скопировать **Client ID** и **Client secret**.
6. Supabase → **Edge Functions → Secrets**: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`.
7. Подключение: дёрнуть `oauth_url` → открыть ссылку → авторизоваться нужным Google-аккаунтом →
   callback сам сохранит refresh_token. Готово.

## Вызовы (через pg_net; заголовок x-fn-secret)
```sql
-- свободные слоты
select net.http_post(
  'https://beoendcicsoorvipswmh.supabase.co/functions/v1/calendar',
  jsonb_build_object('action','slots','days',7,'duration_min',30),
  headers := jsonb_build_object('Content-Type','application/json',
    'x-fn-secret',(select value from tg_config where key='webhook_secret')));

-- забронировать
select net.http_post(
  'https://beoendcicsoorvipswmh.supabase.co/functions/v1/calendar',
  jsonb_build_object('action','book','start','2026-06-12T13:00:00Z',
    'client_email','client@example.com','summary','Консультація CRM'),
  headers := jsonb_build_object('Content-Type','application/json',
    'x-fn-secret',(select value from tg_config where key='webhook_secret')));
```

## Хранится в tg_config
`google_refresh_token`, `google_email`, `google_calendar_id` (по умолч. `primary`).

## Дальше
Эти `slots`/`book` будет дёргать AI-продажник (Этап 1) прямо в диалоге с лидом:
предложить слоты → спросить почту → `book` → отдать ссылку на событие/Meet + напоминания.
