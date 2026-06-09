# Telegram-отправщик для скилла `call-analysis`

Конвейер рассылки задач со звонков/встреч в Telegram, построенный на **Supabase Edge Function**.

Зачем так: окружение Claude Code on the web **не имеет доступа к `api.telegram.org`** (сетевой
allowlist режет хост). Поэтому отправка вынесена в Supabase — все звонки в Telegram идут из
сети Supabase, а Claude управляет всем через Supabase MCP (вставляет сообщения в очередь).

## Архитектура

```
Claude (анализ звонка)
   │  ── создаёт задачи в Notion (база «Договорённости»)
   │  ── INSERT в public.tg_outbox  (через Supabase MCP)
   ▼
Supabase Postgres
   │  pg_cron (раз в минуту) ──► pg_net ──► Edge Function `telegram-bot` (action: drain)
   ▼
Edge Function telegram-bot
   │  читает tg_outbox (service role) ──► api.telegram.org/sendMessage ──► помечает sent
   ▼
Сотрудники получают сообщения в Telegram
```

Проект Supabase: **`call-analysis-bot`** (`beoendcicsoorvipswmh`).

## Компоненты

| Что | Где |
|---|---|
| Таблицы `tg_employees`, `tg_outbox`, `tg_seen_chats`, `tg_config` | `supabase/migrations/0001_*.sql` |
| Cron `telegram-drain` (раз в минуту) | `supabase/migrations/0002_*.sql` |
| Edge Function `telegram-bot` (`ping` / `drain` / `sync_updates`) | `supabase/functions/telegram-bot/index.ts` |

## Установка / что нужно сделать руками

**Единственный секрет, который ставишь ты (Claude его не видит):**

1. Создай/обнови бота у **@BotFather**, возьми токен (после `/revoke`, если светился).
2. Supabase Dashboard → проект `call-analysis-bot` → **Edge Functions → Secrets** →
   добавь секрет `TELEGRAM_BOT_TOKEN = <новый токен>`.
   (CLI-аналог: `supabase secrets set TELEGRAM_BOT_TOKEN=... --project-ref beoendcicsoorvipswmh`)
3. Проверка: `ping` должен вернуть `token_set: true` (Claude дернёт через MCP).

`SUPABASE_URL` и `SUPABASE_SERVICE_ROLE_KEY` платформа подставляет сама — их ставить не нужно.

## Регистрация сотрудников

1. Каждый сотрудник пишет боту `/start` (любое сообщение).
2. Claude вызывает `sync_updates` → их чаты попадают в `public.tg_seen_chats`.
3. Сверяем имя (как в договорённостях) с чатом и заносим в `public.tg_employees`
   (`name`, `username`, `chat_id`).

## Как идёт отправка (режим ANALYZE скилла)

1. Claude разбирает транскрипт → создаёт задачи в Notion.
2. Для каждого ответственного ищет `chat_id` в `tg_employees` по имени.
3. INSERT сообщений в `tg_outbox` (приветствие + по сообщению на задачу,
   кнопка-ссылка «Открыть в Notion»).
4. Cron в течение ≤1 минуты отправляет всё из очереди. Статус — в `tg_outbox.status`.

## Диагностика

- Дернуть функцию: `net.http_post(... body {"action":"ping|drain|sync_updates"})` через `execute_sql`.
- Ответы функции: `select * from net._http_response order by id desc limit 5;`
- Очередь: `select id,status,attempts,error,responsible from public.tg_outbox order by id desc;`
- Логи функции: Supabase MCP `get_logs(service: edge-function)`.
- Cron: `select * from cron.job;`  и  `select * from cron.job_run_details order by start_time desc limit 5;`

## Объём

- **v1 (сделано):** надёжная **отправка** задач, кнопка-ссылка на Notion, авто-ретраи (до 3),
  автономный cron-дренаж.
- **v2 (план):** «живые» кнопки ✅ Готово / 🕐 Отложить / ❌ Не актуально — тап прилетает
  в Telegram webhook (отдельная функция, `verify_jwt=false`, проверка секрета Telegram),
  которая обновляет статус задачи в Notion. Требует выставить webhook бота на функцию.
