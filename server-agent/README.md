# server-agent — постоянный агент 24/7 (Claude Agent SDK)

Тот же «мозг», что и у Claude в этих сессиях, но живёт на сервере и работает сам.

## Общий мозг (как агент «знает то же самое»)
- **Знания и навыки = этот git-репозиторий.** Базы CRM (`zoho/`, `planfix/`, …), скиллы
  (`.claude/skills/`: call-analysis, call-corpus-analysis, client-dna, hunt-ladder, eco-sales) и
  инструкции `CLAUDE.md` подхватываются автоматически через `settingSources:['project']` при
  `cwd` = корень репо. Обновил знания в репо → `git pull` на сервере → агент сразу «умнее».
- **Оперативные данные = Supabase** (тот же проект `call-analysis-bot`): `tg_*`, `*_transcripts`,
  `frame_jobs`/`audio_jobs`, Notion-конвейер. Агент ходит туда через **Supabase MCP**.

Прямого канала «сервер ↔ Claude-в-сессии» нет и не нужно: общая шина — git + Supabase
(ровно как у Railway-воркера кадров/аудио).

## Как работает
Очередь `public.agent_jobs`: любой триггер (человек, cron, Telegram, другая функция) кладёт задачу
текстом → агент опрашивает `pending` → на каждую запускает `query()` Agent SDK с доступом к
Supabase MCP → финальный текст пишет обратно в строку (`status=done|error`). Decoupled-паттерн,
тот же что у `frame_jobs`/`audio_jobs`.

```sql
-- поставить задачу агенту:
insert into public.agent_jobs (prompt) values
  ('Разбери последний транскрипт из loom_transcripts: резюме + задачи в Notion + рассылка');
-- забрать результат:
select status, left(result, 500), error from public.agent_jobs order by id desc limit 1;
```

## Деплой на Railway (отдельный сервис, НЕ тот же что воркер)
> Ключевой нюанс: агенту нужен весь репо (скиллы + `CLAUDE.md`), поэтому контекст сборки —
> **корень репо**, а не `server-agent/`. Поэтому настройки иные, чем у воркера кадров.

1. Railway → твой проект → **+ New → GitHub Repo** → `teamcrmsolutions22-star/Solutions`, ветка `main`.
2. Открой созданный сервис → **Settings → Build**:
   - **Root Directory** — оставь **пустым** (= корень репо).
   - **Builder** = Dockerfile, **Dockerfile Path** = `server-agent/Dockerfile`.
   - (`.dockerignore` в корне уже исключает `.git`, `node_modules`, `source-files` — контекст лёгкий.)
3. **Settings → Variables** (см. `.env.example`):
   `ANTHROPIC_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (новый `sb_secret_...`),
   `SUPABASE_ACCESS_TOKEN`, опц. `AGENT_MODEL`, `POLL_SEC`. Секреты — только тут, не в репо.
4. **Deploy.** В логах: `server-agent up. repo=/app model=claude-opus-4-8 poll=15s`.

На чистом Docker (VPS) эквивалент — из **корня репо**:
`docker build -f server-agent/Dockerfile -t crm-agent . && docker run --env-file server-agent/.env crm-agent`

## Запуск локально
```
cd server-agent && npm install
ANTHROPIC_API_KEY=... SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... SUPABASE_ACCESS_TOKEN=... \
  node agent.mjs
```

## Границы / безопасность
- Агент запускается с `permissionMode:'bypassPermissions'` (это сервер, без интерактива) и
  суженным `allowedTools` (`Read/Grep/Glob/Bash/Edit/Write/WebFetch/mcp__supabase`). Перед
  выдачей шире прав — оцени риск (агент может писать в БД/Notion/слать Telegram).
- Это **скелет**: очередь + один прогон на задачу. Дальше можно навесить триггеры (cron на
  «разбери новые транскрипты», webhook из Telegram → agent_jobs) и автокоммит знаний.
- Свежесть мозга: повесь `git pull` по cron или передеплой при пуше в `main`.
