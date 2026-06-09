# HubSpot — Повна База Знань

> Джерело: **власний Deep Research (червень 2026)** — 5 паралельних агентів по офіційних доменах HubSpot (developers.hubspot.com, knowledge.hubspot.com, hubspot.com, legal.hubspot.com, ecosystem.hubspot.com, ir.hubspot.com/SEC). Попередня база (Perplexity + ChatGPT DR) оновлена й виправлена.
> Маркери: ✅ підтверджено офіц. доками | ⚠️ вторинне джерело / число у PST не виявлено | ❌ застаріло / спростовано
> Метод-кав'ят: WebFetch блокується (403) на доменах HubSpot → факти зібрані з пошукових сніпетів офіц. сторінок; числа з JS-таблиць і PST PDF позначені ⚠️.

---

## ЗМІСТ

| Файл | Тема |
|------|------|
| [01-overview-pricing.md](01-overview-pricing.md) | Огляд, хаби, тарифи/seats, повна цінова таблиця, Credits, ROI, заперечення, конкуренти |
| [02-admin-setup.md](02-admin-setup.md) | No-code: об'єкти, воронки, ролі, Marketing/Sales/Service Hub, workflows, inbox, email, аналітика, імпорт, властивості |
| [03-ai-breeze.md](03-ai-breeze.md) | Breeze AI: Assistant, Agents, Intelligence, Credits, чатботи, MCP, Run Agent |
| [04-api.md](04-api.md) | REST API: auth, date-based версіонування, ендпоінти, Search, Batch, rate limits, асоціації v4, custom objects, SDK |
| [05-webhooks.md](05-webhooks.md) | Вебхуки: налаштування, підпис v3, concurrency, retry, дебаг |
| [06-integrations.md](06-integrations.md) | Каталог інтеграцій: пошта, телефонія, реклама, месенджери, e-commerce, Data Sync, маркетплейс |
| [07-onboarding-partners.md](07-onboarding-partners.md) | Academy, впровадження, onboarding-fees, партнерська програма 2026 |
| [08-changelog.md](08-changelog.md) | Spring 2026 Spotlight + dev changelog (березень–червень 2026) |
| [09-youtube-insights.md](09-youtube-insights.md) | YouTube-інсайти: ренейми, free-ліміти, тактики, приклади промптів, каталог інтеграцій, кейси, 152 відео |
| [source-files/](source-files/) | 152 сирі транскрипти офіційного YouTube HubSpot (⛔ не читати для відповідей) |

---

## КЛЮЧОВІ ФАКТИ

### Платформа
- **Тип:** «agentic customer platform» — Smart CRM (БД-фундамент) + 6 хабів + Breeze AI
- **Хаби:** Marketing, Sales, Service, **Content** (ex-CMS), **Data** (ex-Operations), Commerce
- **Рівні:** Free / Starter / Professional / Enterprise (24 комбінації хаб×tier)
- **Free CRM:** 2 користувачі, 1,000 контактів, без терміну дії ✅
- **Клієнтів:** **278,880** (30.09.2025, SEC 10-Q) у **135+ країнах** ✅ *(прежнє «~299k» ❌)*

### API (критично)
- **Base URL:** `https://api.hubapi.com` ✅
- **Auth:** Private App Token (Bearer, **не протухає**, `pat-na1-…`) / OAuth 2.0 (**access 30 хв / 1800с**, refresh безстроковий); `hapikey` ❌ (вимкнено 30.11.2022)
- **Версіонування:** **date-based `/YYYY-MM/`**, перша версія **`2026-03`** (GA 30.03.2026); immutable, підтримка ≥18 міс, breaking changes двічі/рік (березень+вересень); legacy v3/v4 ще працюють
- **Rate limit:** Pro **190/10с + 650k/добу** ✅; Ent 190/10с + **1M/добу** ✅; Free/Starter 100/10с + 250k/добу ⚠️; API Increase add-on **250/10с + 1M/пак (×2 = +2M)**; public OAuth 110/10с; Search 5/сек
- **Search:** 5 filterGroups × 6 фільтрів = **18 max**; 200/сторінка; **10,000 cap**; cursor `after`
- **Batch:** **100 inputs/запит** (= 1 виклик ліміту); 207 при частковій помилці ✅
- **Custom Objects:** Enterprise, **10/портал** ✅ (live endpoint `/crm/v3/limits/custom-object-types`)

### Webhooks
- Підписки `webhooks/v3/{appId}`; payload-масив подій; **concurrency 10/акаунт** (`maxConcurrentRequests`), **rate-limit прибрано** (поле `period` видалено 20.05.2024); timeout **5с**; retry **до 10/24год**; підпис **v3** = HMAC-SHA256(`method+uri+body+timestamp`), reject якщо >5 хв; HTTPS-only; **не рахується** в API-ліміт; max підписок/додаток ⚠️ (≈1,000)

### Breeze AI / Credits
- **Шари:** Assistant (усі плани) | Agents (Pro/Ent, Breeze Studio) | Intelligence (200M+ профілів) | Custom Assistants
- **Credits/міс:** Starter **500** / Pro **3,000** / Ent **5,000** ✅ (за найвищим tier, не сумуються); **no rollover**; **1 credit = $0.01**
- **Pay-per-outcome (з 14.04.2026):** Customer Agent **50 cr = $0.50/вирішення** (включено 60/міс Pro, 100/міс Ent); Prospecting Agent **100 cr = $1/лід**; Data Agent ~10 cr/відповідь ⚠️; Run Agent ~10 cr ⚠️
- **Run Agent (workflow):** ліміт **500 виконань/день**
- **MCP:** Remote MCP Server GA; конектори Breeze Agents: Notion, Atlassian, Asana, Zapier, G2, Linear, Gong (Amplitude — лише маркетинг ⚠️)

---

## BLOCK 0: Карта надійності (виправлена)

### Auth & версіонування
| Параметр | Значення | Надійність |
|----------|----------|-----------|
| Base URL | `https://api.hubapi.com` | ✅ |
| Private App token | Bearer, не протухає, `pat-na1-` | ✅ |
| OAuth access token | **30 хв (1800с)** | ✅ |
| OAuth refresh token | не протухає (до відкликання) | ✅ |
| OAuth token endpoint | `POST /oauth/v1/token` + date-based `/oauth/2026-03/token` | ✅ |
| `hapikey` | нові з 15.07.2022 ні; вимкнено 30.11.2022 | ❌ |
| Версіонування | date-based `/YYYY-MM/`, 1-ша `2026-03`, immutable, 18 міс | ✅ |
| OpenAPI spec | `GET api.hubspot.com/public/api/spec/v1/specs` + GitHub HubSpot-public-api-spec-collection | ✅ |

### Rate limits
| Контекст | Ліміт | Надійність |
|----------|-------|-----------|
| Free/Starter | 100/10с; 250k/добу | ⚠️ (не виявлено цей раз) |
| **Professional** | **190/10с; 650,000/добу** | ✅ (підвищено 23.09.2024) |
| **Enterprise** | **190/10с; 1,000,000/добу** | ✅ |
| API Limit Increase | **250/10с; +1M/добу за пак (×2)** | ✅ |
| Public OAuth | 110/10с на акаунт | ✅ |
| Search | 5/сек | ✅ |
| Batch у ліміті | 100 об'єктів = 1 виклик | ✅ |
| Денний reset | північ за часовим поясом акаунта | ✅ |
| 429 | `errorType: RATE_LIMIT`, `policyName` DAILY/secondly | ✅ |
| Headers | `X-HubSpot-RateLimit-Daily(-Remaining)`, `-Secondly(-Remaining)` (deprecated) | ✅ |

### Search / Batch
| Параметр | Значення |
|----------|----------|
| Endpoint | `POST /crm/v3/objects/{type}/search` (+ date-based) ✅ |
| filterGroups / filters / total | 5 / 6 / **18** (з 26.08.2024) ✅ |
| Сторінка / cap / пагінація | 200 / 10,000 / cursor `after` ✅ |
| Оператори | EQ NEQ LT LTE GT GTE BETWEEN IN NOT_IN HAS_PROPERTY NOT_HAS_PROPERTY CONTAINS_TOKEN NOT_CONTAINS_TOKEN ✅ |
| Batch | 100/запит; 200 success / 207 partial ✅ |

### Webhooks
| Параметр | Значення | Надійність |
|----------|----------|-----------|
| Підписки | `webhooks/v3/{appId}/settings` + `/subscriptions` | ✅ |
| Concurrency | 10 in-flight/акаунт (`maxConcurrentRequests`) | ✅ |
| Rate limit | прибрано (`period`/`rateLimitPolicy` видалено 20.05.2024) | ✅ |
| Timeout | 5с (2XX) | ✅ |
| Retry | до 10/24год | ✅ |
| Підпис | v3 `X-HubSpot-Signature-v3`, HMAC-SHA256(method+uri+body+timestamp), reject >5хв; v1/v2 legacy | ✅ |
| Payload | масив: objectId, propertyName/Value, changeSource, eventId, subscriptionId, occurredAt, attemptNumber | ✅ |
| HTTPS / vs API ліміт | обов'язково / не рахується | ✅ |
| Max підписок/додаток | ≈1,000 | ⚠️ (не підтверджено) |

### Custom Objects / Credits / фічі
| Параметр | Значення | Надійність |
|----------|----------|-----------|
| Custom Objects | Enterprise, 10/портал, +докупівля | ✅ |
| Credits/міс | Starter 500 / Pro 3,000 / Ent 5,000; no rollover | ✅ |
| Customer Agent | 50 cr/$0.50 вирішення (60 Pro/100 Ent вкл.) | ✅ |
| Prospecting Agent | 100 cr/$1 лід; Sales Pro/Ent | ✅ |
| Воронки/акаунт | Free/Starter 2, Pro 15, Ent 100 | ⚠️ (PST) |
| Workflows/акаунт | Pro 300, Ent 1,000 (+100 Brands) | ✅ |
| Predictive Lead Scoring | Marketing Ent + Sales Ent | ✅ |
| HubSpot score (traditional) | Marketing Pro/Ent | ✅ |
| Sequences | Sales seat; 10 шаблонів/sequence; 500/день Pro, 1,000/день Ent | ✅ |
| CPQ/Quotes | **Commerce Hub Pro/Ent** (мігровано з Sales) | ✅ |
| Knowledge Base | Service Pro 1 KB/2,000 ст.; Ent 25 KB/10,000 ст. | ✅ |
| Calling хвилини | Free 15/user; Starter 500; Pro 3,000; Ent 12,000 | ✅ |
| WhatsApp | Marketing/Service Pro+; 1,000 template msg/міс; 25 #/WABA | ✅ |
| Import | Free 20MB/50/день/500k рядків; Starter+ 512MB/500/день/10M, 1,048,576/файл | ✅ |
| Sandbox | Standard = Enterprise; Dev test accounts ×10 (free, 90-дн Ent trial) | ✅ |

---

## BLOCK 8: Відомі невідомі (після цього дослідження)

| Питання | Що знайдено | Де перевірити |
|---------|-------------|---------------|
| Точні Free/Starter rate limits | JS-таблиця не зчиталась (403) | developers.hubspot.com/docs/developer-tooling/platform/usage-guidelines |
| Max webhook-підписок/додаток | прежнє «1,000», цей раз не підтверджено | webhooks-webhooks-v3/guide |
| Точні credits Data Agent / Run Agent | ~10 cr (вторинне, $0.01×10) | PST / vantagepoint guide |
| Точні # дашбордів і звітів/дашборд per tier | «за найвищим tier», числа в PST | PST technical limits |
| Custom properties/об'єкт per tier | капається tier'ом, число в PST | track-crm-data-limits + PST |
| Повний список країн Calling/SMS | не перелічено | calling/what-countries-are-supported |
| Точні onboarding-fees | блог: Sales Pro $1,500/Ent $3,500; Mkt Pro $3,000/Ent $7,000 | hubspot.com/pricing |
| Email send limit формула (5×/10×) | вторинне джерело | PST |

---

## Виправлення vs попередня база (Perplexity+ChatGPT)

1. **Клієнтів ~279k** (SEC 10-Q), не «~299k» ❌.
2. **Pro API = 650,000/добу** (не 625k); API Increase **250/10с, +2M** (не 200).
3. **Credits 500/3,000/5,000 — тепер ✅** (підтверджено 2 незалежними джерелами; раніше ⚠️). Міграційні числа 3k/15k/125k стосувались старих BI-credits — **не плутати** з місячною квотою.
4. **OAuth access token = 30 хв** (раніше «не задокументовано»).
5. **Custom objects = 10/портал; Batch = 100 — тепер ✅** (раніше ⚠️).
6. **Workflows: Pro 300 / Ent 1,000** (не 50/100 з ChatGPT).
7. **CPQ/Quotes → Commerce Hub Pro/Ent** (мігровано; legacy Sales quotes лише для старих акаунтів).
8. **Knowledge Base: Pro 2,000 / Ent 10,000 статей** (не 25/100).
9. **Date-based версіонування 2026-03** — головний технічний зсув.
10. **Публічний Workflows/Automation API існує** (v4 beta) — раніше «немає».
11. **SDK: офіційні Node/Python/PHP/Ruby/.NET** (Java/Go — НЕ офіційні; Go community).
12. **ROI-цифри тепер офіційні** (hubspot.com/roi): +129% лідів/12міс, +94% угод/6міс, −48% час до закриття.

**Джерела:** developers.hubspot.com/changelog | knowledge.hubspot.com | hubspot.com/pricing, /roi, /spotlight | legal.hubspot.com/hubspot-product-and-services-catalog | sec.gov (HubSpot 10-Q)
