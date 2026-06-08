# HubSpot — Повна База Знань

> Джерела: Perplexity Deep Research (станом на 2026-06-07) + ChatGPT Deep Research (2026-06), обидва на основі офіційної документації HubSpot.
> Маркери достовірності: ✅ підтверджено офіц. доками | ⚠️ вторинне джерело / потребує перевірки | ❌ застаріло / deprecated
> ⛔ Лише офіційні домени (hubspot.com, developers.hubspot.com, knowledge.hubspot.com, legal.hubspot.com, ecosystem.hubspot.com) — повністю надійні.

---

## ЗМІСТ

| Файл | Тема |
|------|------|
| [01-overview-pricing.md](01-overview-pricing.md) | Огляд платформи, хаби, тарифи/seats, HubSpot Credits, ROI, заперечення, конкуренти |
| [02-admin-setup.md](02-admin-setup.md) | No-code: об'єкти, воронки, ролі, Marketing/Sales/Service Hub, workflows, inbox, email, аналітика, імпорт, властивості |
| [03-ai-breeze.md](03-ai-breeze.md) | Breeze AI: Assistant, Agents, Intelligence, Credits, чатботи, MCP, Run Agent |
| [04-api.md](04-api.md) | REST API: auth, версіонування, ендпоінти, Search, Batch, rate limits, асоціації v4, custom objects, SDK |
| [05-webhooks.md](05-webhooks.md) | Вебхуки: налаштування, ліміти, retry, підпис, дебаг |
| [06-integrations.md](06-integrations.md) | Каталог інтеграцій: пошта, телефонія, реклама, месенджери, e-commerce, Data Sync |
| [07-onboarding-partners.md](07-onboarding-partners.md) | Навчання (Academy), впровадження, onboarding, партнерська програма |
| [08-changelog.md](08-changelog.md) | Що нового: Spring 2026 Spotlight, травень–червень 2026 |

---

## КЛЮЧОВІ ФАКТИ (швидкий доступ)

### Платформа
- **Тип:** «agentic customer platform» — Smart CRM + хаби + Breeze AI
- **Хаби:** Marketing, Sales, Service, **Content Hub** (ex-CMS), **Data Hub** (ex-Operations), Commerce + Smart CRM
- **Рівні:** Free / Starter / Professional / Enterprise
- **Аудиторія:** SMB → mid-market → enterprise; **~299,000+ клієнтів, 135+ країн**
- **Marketplace:** 2,000+ інтеграцій

### Місця (Seats), зміна 2024
- **Core Seat** (edit) | **Sales/Service Seat** (Pro/Ent спец-функції) | **View-Only** (безкоштовно, безліміт) | **Partner Seats**
- Лише платні місця споживають Credits; Free + View-Only — ні

### API (критично для інтеграторів)
- **Base URL:** `https://api.hubapi.com` ✅
- **Auth:** Private App Token (Bearer) / OAuth 2.0; `hapikey` ❌ deprecated
- **Версії:** date-based `/crm/objects/2026-03/...` (новий) + legacy `/crm/v3/...`
- **Rate limit:** Free/Starter 100/10с + 250k/добу; Pro 190/10с + 625k; Ent 190/10с + 1M; add-on 250/10с + до +2M
- **Search:** 5 req/сек, 200/сторінка, 10k max, 5 filterGroups × 6 фільтрів (max 18)
- **Batch:** ~100/запит ⚠️ (не повторено в reference 2026)

### Webhooks
- 10 concurrent HTTP/портал, до 100 events/запит, 1,000 підписок/додаток
- Timeout 5с, до 10 retry за 24 год, at-least-once, підпис SHA-256

### Breeze AI
- **Assistant** (усі плани) | **Agents** (Pro/Ent, Breeze Studio) | **Intelligence** (збагачення)
- **Credits:** включені за найвищим тарифом; **no rollover**; точні per-tier цифри офіційно не публікуються ⚠️
- **Pay-per-outcome:** Prospecting Agent **$1/лід**, Customer Agent — кредити при вирішенні розмови
- **Run Agent** (workflow): 500 виконань/день

---

## BLOCK 0: Карта надійності (Reliability Map)

### API & Auth
| Параметр | Значення | Надійність |
|----------|----------|-----------|
| Base URL | `https://api.hubapi.com` | ✅ |
| Auth Private App | `Authorization: Bearer {token}` | ✅ |
| Auth OAuth 2.0 | Authorization Code Flow, `/oauth/v1/token` | ✅ |
| API Key (`hapikey`) | deprecated (вимкнено для продакшну) | ❌/✅(факт) |
| OAuth token lifetime | `expires_in` + рефреш; число не публікується | ⚠️ |
| Версіонування | date-based `2026-03` + legacy v3 | ✅ |

### Rate Limits
| Контекст | Ліміт | План |
|----------|-------|------|
| Private App Free/Starter | 100/10с; 250k/добу | ✅ |
| Private App Pro | 190/10с; 625k/добу | ✅ |
| Private App Ent | 190/10с; 1M/добу | ✅ |
| API Limit Increase add-on | 250/10с; +1M/пак (до 2) | ✅ |
| Public OAuth burst | 110/10с на акаунт | ✅ |
| Search API | 5 req/сек | ✅ |
| 429 policyName | DAILY / TEN_SECONDLY_ROLLING | ✅ |

> Ліміти НЕ залежать від хаба — лише від тарифу + add-ons. ✅

### Webhooks
| Параметр | Значення | Надійність |
|----------|----------|-----------|
| Версія підписок | `/webhooks/2026-3/{appId}/...` | ✅ |
| Concurrency | 10 HTTP/портал | ✅ |
| Events/запит | до 100 | ✅ |
| Підписок/додаток | до 1,000 | ✅ |
| Timeout | 5 сек | ✅ |
| Retry | до 10 за 24 год, рандом backoff | ✅ |
| Доставка | at-least-once, без гарантії порядку | ✅ |
| Підпис | SHA-256, `X-HubSpot-Signature` | ✅ |
| vs API limits | не рахуються | ✅ |

### Search API
| Параметр | Значення |
|----------|----------|
| Endpoint | `POST /crm/objects/2026-03/{object}/search` ✅ |
| Сторінка | 200 max (default 10) ✅ |
| Всього | 10,000 max (далі 400) ✅ |
| Фільтри | 5 groups × 6 = max 18 ✅ |

### Custom Objects & Batch
| Параметр | Значення | Надійність |
|----------|----------|-----------|
| Custom Objects | Enterprise only | ✅ |
| Макс. типів/записів | не в KB (PST); ChatGPT: 10 типів, 1M | ⚠️ |
| Batch max | ~100/запит (SDK/blog) | ⚠️ |

### Breeze / Credits
| Параметр | Значення | Надійність |
|----------|----------|-----------|
| Assistant | усі продукти й плани | ✅ |
| Agents | Breeze Studio, Pro/Ent, потребують Credits | ✅ |
| Credits reset | щомісяця, no rollover | ✅ |
| Credits per tier | офіційно не публікується; ChatGPT: 500/3000/5000 | ⚠️ |
| Міграція BI→HubSpot Credits | 100/1k/10k → 3,000/15,000/125,000 (червень 2025) | ✅ |
| Prospecting Agent | $1/рекомендований лід | ✅ |
| Customer Agent | кредити при resolution; 28 днів free (Service Pro/Ent) | ✅ |
| Run Agent workflow | 500 виконань/день/дія | ✅ |
| Workflow logs | 100k успішних/день; історія 6 міс | ✅ |

### Фічі за tier (ключове)
| Фіча | Доступність | Надійність |
|------|-------------|-----------|
| Custom Report Builder | Pro+ (Mkt/Sales/Service/Data/Commerce) | ✅ |
| Sequences | Sales Hub Pro+ | ✅ |
| Predictive Lead Scoring | Marketing Ent + Sales Ent | ✅ |
| Workflows (повноцінні) | Professional+ | ✅ |
| WhatsApp | 25 номерів/WABA; 1,000 template/міс | ✅ |
| Knowledge Base | Service Pro+ (історично) | ⚠️ |
| Customer Portal | Enterprise (історично) | ⚠️ |
| Built-in Calling | tier-gating у PST | ⚠️ |
| Воронки (ліміти) | Starter 2 / Pro 15 / Ent 100 (ChatGPT) | ⚠️ |

---

## BLOCK 8: Відомі невідомі (потребують уточнення в PST/доках)

| Питання | Що знайдено | Де перевірити |
|---------|-------------|---------------|
| Точні інтервали retry вебхуків | до 10 спроб/24 год, рандом | webhooks/guide |
| Макс. кількість custom objects/портал | Enterprise-only, число не вказано | custom objects guide + PST |
| Макс. кастомних властивостей/об'єкт | лише в PST | PST technical limits |
| Batch max objects | 100 (SDK/blog), не в reference 2026 | object API guides + PST |
| Точні credits per Hub/tier | за найвищим tier; числа в PST | PST (Credits) |
| Ліміти email-розсилки per tier | contact-based, точні caps відсутні | PST (email sends) |
| A/B testing per tier | історично Pro+ | PST feature matrix |
| Knowledge Base per tier | історично Service Pro+ | Service pricing + PST |
| Sandbox per tier | історично Enterprise | Account Types + PST |
| Точні ціни per hub/seat | за калькулятором + PST | in-app calculator + PST |

---

## Конфлікти джерел (вирішені за пріоритетом: офіц. > ChatGPT DR)

1. **Sales Hub Starter ціна:** офіц. блог **$9/seat (річна)** vs ChatGPT $20 → пріоритет блог.
2. **Credits per tier:** офіційно не публікується; ChatGPT 500/3000/5000 → позначено ⚠️.
3. **Кількість workflow за tier:** офіц. (Workflows = Pro+) vs ChatGPT (Free 20/Pro 50/Ent 100) → ⚠️.
4. **Prospecting Agent:** офіц. $1/лід (pay-per-outcome) > ChatGPT «1000 credits».
5. **Версіонування API:** date-based `2026-03` — новий канон; v3 — legacy (обидва підтримуються).

**Джерела:** developers.hubspot.com | knowledge.hubspot.com | hubspot.com/spotlight | legal.hubspot.com/hubspot-product-and-services-catalog
