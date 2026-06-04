# Planfix — Повна База Знань (Gemini Deep Research)

> Джерело: Gemini Deep Research, дата збору: 2026-05-31  
> Маркери достовірності: ✅ підтверджено | ⚠️ потребує перевірки

---

## ЗМІСТ

| Файл | Тема |
|------|------|
| [01-overview.md](01-overview.md) | Огляд платформи, тарифи, порівняння з конкурентами |
| [02-no-code-setup.md](02-no-code-setup.md) | Налаштування без коду: поля, воронки, права, аналітика |
| [03-architecture-data-model.md](03-architecture-data-model.md) | Архітектура, модель даних, кастомні поля |
| [04-rest-api.md](04-rest-api.md) | REST API: автентифікація, ендпоінти, rate limits, помилки |
| [05-webhooks.md](05-webhooks.md) | Вебхуки вхідні/вихідні, безпека, retry-логіка |
| [06-ai-features.md](06-ai-features.md) | AI-можливості: Planfix AI, OpenAI інтеграція |
| [07-widgets-customization.md](07-widgets-customization.md) | Віджети, iFrame, обчислювані поля, маркетплейс |
| [08-automation.md](08-automation.md) | Автоматизація: тригери, дії, сповіщення, планувальник |
| [09-integrations.md](09-integrations.md) | Інтеграції: месенджери, телефонія, Zapier, 1С, Google |
| [10-import-export.md](10-import-export.md) | Імпорт/Експорт/Міграція з інших систем |
| [11-use-cases.md](11-use-cases.md) | Кейси по галузях, сценарій демо для клієнта |
| [12-debug-errors.md](12-debug-errors.md) | Дебаг, типові помилки, підводні камені |
| [13-quick-reference.md](13-quick-reference.md) | Quick Reference для інтегратора, невизначеності |
| [14-chatgpt-deepresearch.md](14-chatgpt-deepresearch.md) | ChatGPT Deep Research: Objects, нові тарифи, AI-агенти, інфраструктура |
| [15-objects-templates.md](15-objects-templates.md) | Objects vs Шаблони, 7 режимів виконавців, набори статусів, фільтри, Ганта |
| [16-scenarios-buttons.md](16-scenarios-buttons.md) | Сценарії: всі тригери, умови, %%%змінні%%%, IF/ELSE, дії, кнопки, відлагодження |
| [17-planners-filters.md](17-planners-filters.md) | Всі типи планувальників, 12 причин зникнення задач, Ганта, iCal/Google Calendar |
| [18-custom-fields.md](18-custom-fields.md) | Всі 26 типів полів: деталі, обмеження, доступність по об'єктах |
| [19-contacts-handbooks.md](19-contacts-handbooks.md) | Контакти (базовий/розширений доступ), довідники, швидкі відповіді |
| [20-reports-analytics.md](20-reports-analytics.md) | Звіти (типи, агрегації, графіки, розклад), Аналітики (структура, доступ) |
| [21-email-integration.md](21-email-integration.md) | 4 типи email-адрес, правила обробки, пріоритет підпису, трекінг |
| [22-gotchas-tips.md](22-gotchas-tips.md) | Топ-10 підводних каменів, типові помилки, про-поради, обмеження продуктивності |
| [23-changelog-updates.md](23-changelog-updates.md) | Changelog оновлень жовтень 2024 — травень 2026 (з Telegram-каналу) |
| [24-employees-structure.md](24-employees-structure.md) | Ролі в акаунті/задачах, структура компанії, групи, деактивація, мобільний |
| [source-files/](source-files/) | ~252 оригінальні транскрипти відео YouTube-каналу Planfix |

---

## КЛЮЧОВІ ФАКТИ (швидкий доступ)

### Платформа
- **Тип:** Low-code/no-code гібрид CRM + таск-менеджер + управління проєктами
- **Запуск:** Травень 2009, відкрите бета — 24 червня 2010
- **Аудиторія:** SMB та Enterprise, міжнародна (підтримка багатьох мов)
- **Домени:** planfix.com, planfix.ua, planfix.ru; академія: academy-ua.planfix.com

### Тарифи для України (planfix.com/uk/prices/, оновлено 2026-06) ✅
| Тариф | Юзерів | Ціна (річна оплата) | REST API | Сховище |
|-------|--------|---------------------|---------|---------|
| Free | до 5 | €0 | ❌ (помилка 21) | 1 ГБ / 500 задач |
| **Professional** | 1–99 | **€3/user/міс** | ✅ 20k/добу | 1 ГБ/user |
| **Business** | 1–250 | **€5/user/міс** | ✅ 50k/добу | 2 ГБ/user |
| **Enterprise** | 6+ | **€7/user/міс** | ✅ 100k/добу | 5 ГБ/user |

> Рахунок щорічно. 8 юзерів: Professional €24/міс, Business €40/міс, Enterprise €56/міс

Додатково: зовнішні користувачі $10/5 осіб, свій домен $290/міс, AI-кредити $5/1000

> Глобальні ціни (USD): Plan A $8 / Plan B $18 / Plan X $28 — застаріла назва ⚠️

### API (критично для інтеграторів)
- **Тип:** REST API v2.0 (OpenAPI 3.0, v1.5.7) + застарілий XML-RPC
- **Auth:** OAuth 2.0 Bearer Token
- **Base URL:** `https://<account>.planfix.com/rest/`
- **Rate limit:** 1 запит/сек; 20k/50k/100k на добу
- **Пагінація:** max 100 записів за запит (limit + offset)
- **Silent mode:** `?silent=true` — без сповіщень і логів
- **Bulk операції:** не підтримуються ⚠️

### Автентифікація
```
Authorization: Bearer <access_token>
```

### Коди помилок
| Код | Значення |
|-----|---------|
| 1 | Невалідний токен |
| 6 | Доступ заблоковано |
| 21 | API на Free тарифі |
| 22 | Перевищено rate limit (HTTP 429) |
| 30 | Помилка парсингу JSON |
| 1000 | Задача не існує |

### AI
- Вбудована дія **«Надіслати запит до Planfix AI»** (актуальна) ✅
- Стара дія «Надіслати запит до ChatGPT» — статус **«As Is», не підтримується** ✅
- OpenAI інтеграція через власний API-ключ; модель за замовч.: `gpt-3.5-turbo`
- Системні змінні: `{{Infoblock.Response}}`, `{{Infoblock.Tokens used}}`
