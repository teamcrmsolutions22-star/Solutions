# Правила для Claude Code

## Подсказка в начале сессии

Когда пользователь задаёт первый вопрос в новой сессии — **всегда** показывай эту подсказку перед ответом:

---

> 💡 **Подсказка:** В этом репозитории есть базы знаний по CRM-системам.
> Чтобы я работал как эксперт по нужной CRM — напиши название CRM и свой вопрос.
> Например: *"Planfix: как настроить сценарий?"* или *"KeepinCRM: как работает API?"*

---

## Инструкция: КАК ЧИТАТЬ базы знаний (экономия токенов)

**ВАЖНО:** Никогда не читай всю папку целиком. Определи тему вопроса и читай ТОЛЬКО нужные файлы из карты ниже.

### Карта тем → файлов: PLANFIX

| Тема вопроса | Читать файл(ы) |
|-------------|---------------|
| Тарифы, обзор платформы, сравнение | `planfix-knowledge/01-overview.md` |
| Настройка без кода, воронки, права | `planfix-knowledge/02-no-code-setup.md` |
| Objects, архитектура, модель данных | `planfix-knowledge/03-architecture-data-model.md` + `planfix-knowledge/15-objects-templates.md` |
| REST API, эндпоинты, авторизация, rate limits | `planfix-knowledge/04-rest-api.md` |
| Вебхуки входящие/исходящие | `planfix-knowledge/05-webhooks.md` |
| AI-функции, Planfix AI, OpenAI | `planfix-knowledge/06-ai-features.md` |
| Виджеты, iFrame, вычисляемые поля | `planfix-knowledge/07-widgets-customization.md` |
| Автоматизация (общее), тригеры, планировщик | `planfix-knowledge/08-automation.md` |
| Сценарии, кнопки, IF/ELSE, переменные, отладка | `planfix-knowledge/16-scenarios-buttons.md` |
| Интеграции: мессенджеры, телефония, Zapier, 1С | `planfix-knowledge/09-integrations.md` |
| Импорт, экспорт, миграция из Bitrix/amoCRM | `planfix-knowledge/10-import-export.md` |
| Кейсы по отраслям, демо для клиента | `planfix-knowledge/11-use-cases.md` |
| Ошибки, HTTP коды, дебаг, токены | `planfix-knowledge/12-debug-errors.md` |
| Быстрый справочник для интегратора | `planfix-knowledge/13-quick-reference.md` |
| Objects vs Шаблоны, статусы, Ганта, фильтры | `planfix-knowledge/15-objects-templates.md` |
| Планировщики, виды задач, 12 причин исчезновения | `planfix-knowledge/17-planners-filters.md` |
| Кастомные поля (все 26 типов) | `planfix-knowledge/18-custom-fields.md` |
| Контакты, справочники, быстрые ответы | `planfix-knowledge/19-contacts-handbooks.md` |
| Отчёты, аналитики, графики, расписание | `planfix-knowledge/20-reports-analytics.md` |
| Email-интеграция, правила обработки почты | `planfix-knowledge/21-email-integration.md` |
| Подводные камни, типичные ошибки, про-советы | `planfix-knowledge/22-gotchas-tips.md` |
| Общие ключевые факты, коды ошибок API | `planfix-knowledge/00-MASTER-KNOWLEDGE.md` |

### Карта тем → файлов: KEEPINCRM

| Тема вопроса | Читать файл(ы) |
|-------------|---------------|
| Обзор, тарифы, возможности | `keepincrm-knowledge/00-MASTER-KNOWLEDGE.md` |
| API, вебхуки, интеграции | Читай `keepincrm-knowledge/00-MASTER-KNOWLEDGE.md` → найди нужный раздел → при необходимости читай конкретный файл `01-14` |
| Автоматизация, настройки | Аналогично через `00-MASTER-KNOWLEDGE.md` |
| История обновлений | `keepincrm-knowledge/15-changelog.md` |
| Технический гайд | `keepincrm-knowledge/16-technical-guide.md` или `17-technical-guide-chatgpt.md` |

### Правило для неопределённых тем
Если тема не ясна → сначала читай `00-MASTER-KNOWLEDGE.md` нужной CRM (там сводка + оглавление), затем дочитывай только нужный файл.

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
Ветка для разработки: `claude/epic-hawking-fwgQt`
