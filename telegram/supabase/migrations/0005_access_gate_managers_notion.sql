-- Access gate + manager Notion mirror (AI-продажник)
-- Project: call-analysis-bot (beoendcicsoorvipswmh)

-- бот только для одобренных менеджеров; код доступа в tg_config.manager_code
alter table public.tg_employees
  add column if not exists is_approved boolean not null default false,
  add column if not exists notion_url text;   -- личная карточка менеджера в Notion

-- tg_config keys (значения ставит админ; коды/секреты в репозиторий НЕ коммитим):
--   manager_code   — код доступа для своих
--   managers_db_id — Notion DB «👥 Менеджери CRM Solutions»
--   manager_emoji  — единый эмодзи карточек (по умолч. 🧑‍💼)
--   rules_page_id  — Notion-страница «🎛 Правила бота» (governance, читает агент)
