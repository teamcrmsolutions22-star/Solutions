# HubSpot — REST API (розробник)

> Актуально: червень 2026 (Deep Research). Маркери: ✅ офіц. | ⚠️ не виявлено/вторинне | ❌ застаріло
> **Base URL:** `https://api.hubapi.com` (усі API). ✅

## Автентифікація

| Спосіб | Деталі | Статус |
|--------|--------|--------|
| **Private App Token** | Bearer; **не протухає**, ротується; формат `pat-na1-…` (na1=регіон); ті ж scopes | ✅ |
| **OAuth 2.0** | Authorization Code; **access token 30 хв (1800с)**; **refresh не протухає**; обмін `POST /oauth/v1/token` | ✅ |
| **API Key (`hapikey`)** | нові з 15.07.2022 ні; **вимкнено 30.11.2022** (Developer Account API Key для конфігу додатків лишився) | ❌ |

- **OAuth v3** ендпоінти випущено (v1 deprecated, працює); date-based: `POST /oauth/2026-03/token` + `/token/introspect`. ✅
- Реєстрація: developer-акаунт; публічні додатки — OAuth authorization code flow. ✅

## Версіонування та base URLs

- **Date-based версіонування** `/YYYY-MM/` (напр. `/2026-03/`), замінює v1–v4. Перша версія **`2026-03`** (Spring 2026), GA **30.03.2026**. ✅
- **Immutable**, підтримка кожної ≥**18 міс**, breaking changes **двічі/рік (березень + вересень)**. ✅
- Legacy `/crm/v3/...`, `/crm/v4/associations/...` ще працюють; v4 — до березня 2027; `/2025-09/` — до релізу `/2027-03/`. ✅
- **OpenAPI:** `GET https://api.hubspot.com/public/api/spec/v1/specs`; GitHub **HubSpot/HubSpot-public-api-spec-collection**. ✅

## Основні групи ендпоінтів

- CRM-об'єкти: `/crm/v3/objects/{contacts|companies|deals|tickets|products|line_items|…}` (+ date-based `/crm/objects/2026-03/...`). ✅
- Custom object схеми: `POST /crm/v3/schemas`. ✅
- Associations **v4**: `/crm/v4/associations/...`. ✅
- Properties, Pipelines, Owners, Engagements (notes/emails/calls/meetings/tasks), Marketing Emails, Forms — окремі групи. ✅
- **Webhooks:** `webhooks/v3/{appId}/...`. ✅
- **Timeline Events:** `POST /crm/v3/timeline/{appId}/event-templates` (750 шаблонів/додаток, 500 токенів/шаблон). ✅
- **Workflows/Automation API ІСНУЄ:** `/automation/...`; **v4 Automation API (public beta)** — batch + оновлення існуючих workflow; **Custom Workflow Actions v4** (actionUrl отримує HTTPS POST). ✅ *(раніше «немає»)*

## CRM Search API

- `POST /crm/v3/objects/{type}/search`. ✅
- **5 filterGroups × 6 фільтрів = max 18** (з 26.08.2024; перевищення → `VALIDATION_ERROR`). ✅
- Сторінка **200** (default 10); cap **10,000** (далі HTTP 400); пагінація **cursor `after`** (не offset). ✅
- Оператори: `EQ NEQ LT LTE GT GTE BETWEEN IN NOT_IN HAS_PROPERTY NOT_HAS_PROPERTY CONTAINS_TOKEN NOT_CONTAINS_TOKEN`. ✅
- **Rate limit: 5 req/сек** на акаунт (з 23.09.2024, було 4); 1 sort-правило/запит. ✅

## Batch API

- create/update/read/upsert: **до 100 inputs/запит**; **batch зі 100 = 1 виклик** rate-limit. ✅
- HTTP **200** при повному успіху, **207 Multi-Status** при частковій помилці (перевіряти кожен елемент). ✅

## Rate limits

| Контекст | Ліміт |
|----------|-------|
| Free/Starter | 100/10с; 250k/добу ⚠️ (JS-таблиця не зчиталась) |
| **Professional** | **190/10с; 650,000/добу** ✅ |
| **Enterprise** | **190/10с; 1,000,000/добу** ✅ |
| API Limit Increase | **250/10с; +1M/добу за пак (×2 = +2M)** ✅ |
| Public OAuth | 110/10с на акаунт ✅ |
| Search | 5/сек ✅ |

- Денний reset — північ за часовим поясом акаунта; burst per-app, денний — спільний на всі private apps. ✅
- **429:** `status:error`, `message`, `errorType:RATE_LIMIT`, `correlationId`, `policyName` (DAILY/secondly), `requestId`. ✅
- **Headers:** `X-HubSpot-RateLimit-Daily(-Remaining)`, `X-HubSpot-RateLimit-Secondly(-Remaining)` (secondly **deprecated**, не енфорситься); тепер є й на OAuth-викликах. ✅
- Вторинні ліміти: Search 5/сек, Form Submissions свій. ✅
- **423** (locked) — затримка ≥2с. ✅

## Асоціації v4 vs v3

- `category` (`HUBSPOT_DEFINED` vs `USER_DEFINED`) + `typeId` (associationTypeId) + опц. `label`. ✅
- Дефолтні: «Primary» (для lists/workflows) + «Unlabeled» (label=null). ✅
- **Many-to-many**; ліміти однакові для symmetric, різні per-direction для asymmetric; адмін конфігурує ліміти через API. ✅

## Custom Objects (Enterprise)

- `POST /crm/v3/schemas` (name, properties, associations); потрібна ≥1 Enterprise-підписка. ✅
- **Max 10 custom objects/портал**; докупівля через PST; live-ліміти `GET /crm/v3/limits/custom-object-types`. ✅
- CRUD через `/crm/v3/objects/{objectTypeId|FQN}`. ✅

## SDK

- **Офіційні:** Node.js, Python, PHP (v2), Ruby, **.NET**. ✅
- ❌ Офіційних **Go/Java немає**; Go — community: `hubspot-go`, `belong-inc/go-hubspot`, `clarkmcc/go-hubspot`. ✅
- Repo: github.com/HubSpot/hubspot-api-{nodejs|python|ruby}. Встановлення: `npm i @hubspot/api-client`, `pip install hubspot-api-client`.

## Приклади (ілюстративні, не офіц. семпли)

```bash
# OAuth: обмін коду на токен
curl -X POST https://api.hubapi.com/oauth/v1/token \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=authorization_code&client_id=ID&client_secret=SECRET&redirect_uri=URI&code=CODE'

# GET контактів (cursor-пагінація)
curl 'https://api.hubapi.com/crm/v3/objects/contacts?properties=firstname,email&limit=100&after=CURSOR' \
  -H 'Authorization: Bearer TOKEN'

# Search з фільтрами
curl -X POST https://api.hubapi.com/crm/v3/objects/deals/search \
  -H 'Authorization: Bearer TOKEN' -H 'Content-Type: application/json' \
  -d '{"filterGroups":[{"filters":[{"propertyName":"amount","operator":"GT","value":"1000"}]}],
       "sorts":[{"propertyName":"createdate","direction":"DESCENDING"}],"limit":100}'
```

## Топ помилок інтеграцій

`hapikey` замість Bearer ❌ • невірний base URL (треба api.hubapi.com) • брак OAuth scope → 401/403 • плутанина v3↔v4 associations (`associationTypeId`) • без backoff → 429 • Search offset>10k (треба `after`) • Batch: не перевіряти 207 поелементно • webhook: невірний `propertyName` → шквал • підпис **v3 SHA-256** (не SHA-1) • timestamps — мс UTC • OAuth: не ротувати refresh-token.

## Дебаг та пісочниці

- API call usage + build history у CRM dev tools. ✅
- **Developer test accounts:** до **10**, безкоштовні, **90-дн trial Enterprise-фіч**. ✅
- **Standard Sandbox — Enterprise**; Dev Sandbox — легкий; усі sandbox: **200,000 записів/об'єкт**. ✅
- ⚠️ Webhook-activity-log та workflow-execution-history як публічні API-ендпоінти не виявлено (моніторинг через UI/app logs).

**Джерела:** developers.hubspot.com/changelog (date-based-versioning, increasing-our-api-limits, oauth-tokens, search breaking change, simplifying-batch) | developers.hubspot.com/docs/api-reference/* (webhooks-v3, crm-associations-v4, crm-custom-objects-v3, search) | developers.hubspot.com/docs/api/client-libraries | developers.hubspot.com/docs/api/creating-test-accounts
