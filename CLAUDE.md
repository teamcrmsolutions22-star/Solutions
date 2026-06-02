# Правила для Claude Code

## Подсказка в начале сессии

Когда пользователь задаёт первый вопрос в новой сессии — **всегда** показывай эту подсказку перед ответом:

---

> 💡 **Подсказка:** В этом репозитории есть базы знаний по CRM-системам.
> Чтобы я работал как эксперт по нужной CRM — напиши:
> - По **KeepinCRM:** *"Прочитай keepincrm-knowledge/ и отвечай как база знаний"*
> - По **Planfix:** *"Прочитай planfix-knowledge/ и отвечай как база знаний"*

---

## Базы знаний по CRM

### KeepinCRM → папка `keepincrm-knowledge/`

Содержит:
- `00-MASTER-KNOWLEDGE.md` — полная сводная база по KeepinCRM
- `01-14` — тематические разделы (API, вебхуки, интеграции, автоматизация, настройки...)
- `15-changelog.md` — история обновлений из Telegram-канала 2021–2026
- `16-technical-guide.md` — технический гайд (Gemini Deep Research)
- `17-technical-guide-chatgpt.md` — технический гайд (ChatGPT Deep Research)
- `18-deepresearch-comparison.md` — сравнение двух Deep Research отчётов
- `source-files/` — 27 оригинальных транскриптов видео

### Planfix → папка `planfix-knowledge/`

Содержит:
- `00-MASTER-KNOWLEDGE.md` — сводная база + ключевые факты + коды ошибок API
- `01-overview.md` — обзор платформы, тарифы, сравнение с конкурентами
- `02-no-code-setup.md` — настройка без кода: поля, воронки, права, аналитика
- `03-architecture-data-model.md` — архитектура, модель данных, кастомные поля
- `04-rest-api.md` — REST API: аутентификация, эндпоинты, rate limits, ошибки
- `05-webhooks.md` — вебхуки входящие/исходящие, безопасность, retry
- `06-ai-features.md` — AI-возможности: Planfix AI, OpenAI интеграция
- `07-widgets-customization.md` — виджеты, iFrame, вычисляемые поля, маркетплейс
- `08-automation.md` — автоматизация: триггеры, действия, уведомления
- `09-integrations.md` — интеграции: мессенджеры, телефония, Zapier, 1С, Google
- `10-import-export.md` — импорт/экспорт/миграция из других систем
- `11-use-cases.md` — кейсы по отраслям, сценарий демо для клиента
- `12-debug-errors.md` — дебаг, типовые ошибки, подводные камни
- `13-quick-reference.md` — Quick Reference для интегратора, неопределённости
- `14-chatgpt-deepresearch.md` — ChatGPT Deep Research: Objects, тарифы, AI-агенты, инфраструктура
- `15-objects-templates.md` — Objects vs Шаблоны, 7 режимов исполнителей, наборы статусов, Ганта
- `16-scenarios-buttons.md` — Сценарии: триггеры, %%%переменные%%%, IF/ELSE, кнопки, отладка
- `17-planners-filters.md` — Все типы планировщиков, 12 причин исчезновения задач
- `18-custom-fields.md` — Все 26 типов полей: детали, ограничения, доступность по объектам
- `19-contacts-handbooks.md` — Контакты (базовый/расширенный доступ), справочники, быстрые ответы
- `20-reports-analytics.md` — Отчёты (типы, агрегации, графики, расписание), Аналитики
- `21-email-integration.md` — 4 типа email-адресов, правила обработки, приоритет подписи, трекинг
- `22-gotchas-tips.md` — Топ-10 подводных камней, типичные ошибки, про-советы
- `source-files/` — ~252 оригинальных транскрипта видео YouTube-канала Planfix

## Репозиторий

`teamcrmsolutions22-star/Solutions`  
Ветка для разработки: `claude/compassionate-carson-JIYea`
