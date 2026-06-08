# HubSpot — REST API (для розробника)

> Актуально: червень 2026. Маркери: ✅ офіц. | ⚠️ потребує перевірки | ❌ застаріло
> **Base URL:** `https://api.hubapi.com` (канонічний для всіх API). ✅

## Автентифікація

| Спосіб | Деталі | Статус |
|--------|--------|--------|
| **Private App Token** | Рекомендований для інтеграцій 1 акаунта. Статичний токен зі скоупами, у заголовку `Authorization: Bearer {token}` | ✅ |
| **OAuth 2.0** | Для публічних/marketplace-додатків. Authorization Code Flow, обмін на `https://api.hubapi.com/oauth/v1/token` | ✅ |
| **API Key (`hapikey`)** | Вимкнено для продакшну (legacy після 30.11.2022). Dev API key — лише для dev-tooling | ❌ deprecated |

- **OAuth access token:** видається з `expires_in`; додаток має зберігати TTL і **рефрешити** (не покладатися на 401 як сигнал). Фіксований числовий час життя офіційно не публікується. ⚠️
- **Scopes:** гранулярні per object/feature (напр. `crm.objects.contacts.read`, `tickets`, `conversations.read`). ✅
- Реєстрація додатків: `app.hubspot.com/developer`.

## Версіонування та base URL

- **Date-based версії** (новий канонічний патерн): `/crm/objects/2026-03/...`, `/webhooks/2026-3/{appId}/...`. ✅
- **Legacy v3:** `/crm/v3/objects/contacts` — ще підтримується й присутній у багатьох прикладах. ✅
- **v1/v2** — для деяких legacy-функцій (Timeline, OAuth v1). ✅
- OpenAPI/Swagger: developers.hubspot.com.

## Основні групи CRM API

| Об'єкт | Date-based | Legacy v3 |
|--------|-----------|-----------|
| Contacts | `/crm/objects/2026-03/contacts/...` | `/crm/v3/objects/contacts` |
| Companies | `/crm/objects/2026-03/companies/...` | `/crm/v3/objects/companies` |
| Deals | `/crm/objects/2026-03/deals/...` | `/crm/v3/objects/deals` |
| Tickets | `/crm/objects/2026-03/tickets/...` | `/crm/v3/objects/tickets` |
| Products | `/crm/objects/2026-03/products/...` | `/crm/v3/objects/products` |
| Line Items | `/crm/objects/2026-03/line_items/...` | `/crm/v3/objects/line_items` |
| Custom Objects | `/crm/objects/2026-03/{objectType}/...` (схема через custom-objects guide) | `/crm/v3/objects/{objectType}` |
| Engagements | notes/calls/emails/tasks/meetings як CRM-об'єкти | `/crm/v3/objects/{type}` |

- **Associations (v4):** `/crm/v4/associations/...` — many-to-many, кастомні типи/мітки. ✅
- **Properties:** `/crm/v3/properties/{objectType}`. ✅
- **Pipelines:** `/crm/v3/pipelines/{objectType}`. ✅
- **Owners (users):** `/crm/v3/owners`. ✅
- **Marketing:** `/marketing/v3/emails`, `/marketing/v3/forms`, campaigns guide. ✅
- **Webhooks:** `/webhooks/2026-3/{appId}/subscriptions` (новий) / `/webhooks/v3/{appId}/subscriptions` (legacy). ✅ (деталі → `05-webhooks.md`)
- **Timeline Events:** legacy timeline extensions API. ✅
- **Workflows API:** ⚠️ повноцінного публічного Workflow management API немає; є **Sequences API** (Sales Pro+) + automation v4. Оркестрація — переважно через UI.

## CRM Search API

- **Endpoint:** `POST /crm/objects/2026-03/{object}/search` (або `/crm/v3/objects/{objectType}/search`). ✅
- **Сторінка:** до **200** записів (`limit`, default 10); курсор `after`. ✅
- **Макс. результатів на запит:** **10,000** (спроба пройти далі → 400). ✅
- **Фільтри:** до **5 `filterGroups`**, до **6 `filters` у групі**, **макс. 18 фільтрів**. ✅
- **Оператори:** `LT, LTE, GT, GTE, EQ, NEQ, BETWEEN, IN, NOT_IN, HAS_PROPERTY, NOT_HAS_PROPERTY, CONTAINS_TOKEN, NOT_CONTAINS_TOKEN`. ✅
- **Rate limit Search:** **5 запитів/сек на акаунт** (окремо). ✅

## Batch API

- Операції create/update/read/delete по CRM-об'єктах: `POST /crm/v3/objects/{objectType}/batch/{op}`.
- **Макс. за batch: 100 записів** — ✅ за SDK/blog-патернами, але ⚠️ цей конкретний ліміт **не повторено** в API-reference 2026 (детектувати через помилки API).
- Часткові помилки: HTTP **207 Multi-Status** — обробляти статус кожного елемента окремо. ⚠️

## Rate limits

| Контекст | Ліміт | План |
|----------|-------|------|
| Private App — Free/Starter | **100 req/10с** на додаток; **250,000/день** на акаунт | Free/Starter ✅ |
| Private App — Professional | **190 req/10с**; **625,000/день** | Pro ✅ |
| Private App — Enterprise | **190 req/10с**; **1,000,000/день** | Ent ✅ |
| API Limit Increase add-on | **250 req/10с**; **+1,000,000/день** за пак (до 2 паків, +2M) | Усі ✅ |
| Public OAuth (Marketplace) | **110 req/10с** на акаунт (burst) | OAuth ✅ |
| Search API | **5 req/сек** на акаунт | Усі ✅ |

> Ліміти **не залежать від хаба** — лише від тарифу акаунта + add-ons. ✅

- **Заголовки:** `X-HubSpot-RateLimit-Max`, `-Remaining`, `-Interval-Milliseconds` (+ deprecated secondly). ✅
- **429** — JSON із `status`, `message`, `errorType: "RATE_LIMIT"`, `policyName` (DAILY / TEN_SECONDLY_ROLLING), `correlationId`, `requestId`. Робити **exponential backoff** за заголовками. ✅
- **423** (locked) — затримка ≥2 сек перед повтором. ✅
- Webhook-доставки **не рахуються** в API rate limits. ✅

## Асоціації v4

- Кастомні типи асоціацій із labels; дефолтні + кастомні; many-to-many. ✅
- Часто потрібен `associationType`/`associationCategory` (дефолт `HUBSPOT_DEFINED`). ⚠️ Per-object ліміти — у guide/PST.

## Кастомні об'єкти (Enterprise)

- Створення схеми: `POST /crm/v3/schemas` (JSON: name, поля, опції); **тільки Enterprise**. ✅
- Мін. поля схеми: `name`, `id`, `createdate`. ⚠️
- CRUD записів — як звичайні об'єкти через `/crm/.../objects/{objectType}`. ✅
- ⚠️ Макс. кількість типів/записів на портал офіційно не вказана в KB (ChatGPT: 10 типів, 1M записів, 50 воронок) — у PST.

## SDK

- Офіційні: **Node.js, Python, PHP, Ruby, Java**. ✅
- Community **hubspot-go** (2026): `WithRetries(n)` — 5xx/429 з exponential backoff + Retry-After; batch-хелпери. ⚠️ (повнота vs REST не гарантована).
- Встановлення: `npm install @hubspot/api-client`, `pip install hubspot-api-client`, `composer require hubspot/hubspot-php`.

## Приклади (ілюстративні, не офіц. семпли)

```bash
# OAuth: обмін коду на токен
curl -X POST https://api.hubapi.com/oauth/v1/token \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=authorization_code&client_id=ID&client_secret=SECRET&redirect_uri=URI&code=CODE'

# GET контактів
curl 'https://api.hubapi.com/crm/v3/objects/contacts?properties=firstname,lastname,email&limit=10' \
  -H 'Authorization: Bearer YOUR_TOKEN'

# POST угоди + асоціація з контактом
curl -X POST https://api.hubapi.com/crm/v3/objects/deals \
  -H 'Authorization: Bearer YOUR_TOKEN' -H 'Content-Type: application/json' \
  -d '{"properties":{"dealname":"Test","amount":"1000"},
       "associations":[{"to":{"id":"CONTACT_ID"},
       "types":[{"associationCategory":"HUBSPOT_DEFINED","associationTypeId":3}]}]}'
```

## Типові помилки інтеграцій

- Використання deprecated `hapikey` замість Private App/OAuth → помилка auth. ✅
- Невірний base URL (треба `api.hubapi.com`). ✅
- Брак OAuth scope → 401/403. ✅
- Ігнорування різниці v3 vs v4 associations (`associationTypeId`). ✅
- Без backoff → швидко 429. ✅
- Search offset > 10,000 → помилка (пагінація через `after`). ✅
- Batch: не перевіряти 207 поелементно. ⚠️
- Webhook: невірний `propertyName` → шквал сповіщень. ⚠️
- Підпис вебхука: SHA-256, не SHA-1. ✅
- Timestamps — мс UTC. ✅

## Дебаг-інструменти

- **API call usage / Logs** у developer-порталі (Monitoring). ✅
- **Webhooks journal API** (BETA) — історія + фільтрація. ✅
- **Workflow execution history** (Automation → Workflows). ✅
- **Developer test accounts / sandboxes** — концепт підтверджено. ✅ (ChatGPT: повноцінний Sandbox — Enterprise ⚠️).

**Джерела:** developers.hubspot.com/docs/api-reference/latest | developers.hubspot.com/docs/developer-tooling/platform/apis-by-tier | developers.hubspot.com/changelog/increasing-our-api-limits | developers.hubspot.com/docs/api-reference/error-handling | developers.hubspot.com/blog/introducing-hubspot-go-a-community-go-sdk-for-hubspot-developers
