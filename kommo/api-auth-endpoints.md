# Kommo API — Автентифікація та ендпоінти

## 1. PORTAL OVERVIEW

The Kommo developer portal at **https://developers.kommo.com** is the official technical resource for building integrations with Kommo CRM. It covers:

- **CRM REST API v4** — Full CRUD access to all CRM entities (leads, contacts, companies, pipelines, tasks, notes, events, tags, catalogs, customers, calls, users, account settings)
- **OAuth 2.0 Authentication** — Authorization code flow, refresh tokens, long-lived tokens
- **Webhooks** — Account-level event subscriptions and Digital Pipeline webhooks
- **Widget SDK (JS)** — Framework for building embedded widgets in the Kommo interface
- **VoIP / Telephony API** — Caller ID, call logging, call results, smart forwarding
- **Chats API** — Custom messaging channel integration via `amojo.kommo.com`
- **Files API** — File upload and entity attachment
- **AI API** — AI Suggested Reply and AI Agent feature endpoints
- **Digital Pipeline** — Automated action triggers including widgets, webhooks, Salesbot
- **React Hooks Library** — `@kommo-crm/react-hooks` NPM package for widget development

**AI-friendly index (OpenAPI format):** https://developers.kommo.com/llms.txt

**Portal sections:**
| Section | URL Pattern |
|---------|------------|
| Getting Started / Guides | `/docs/` prefix |
| API Reference | `/reference/` prefix |
| Changelog | `/changelog` |
| Developer Discussions | `/discuss/` |

---

## 2. AUTHENTICATION

### OAuth 2.0 Flow

#### Integration Types

| Type | Description |
|------|-------------|
| **Private Integration** | Used within a single account; no marketplace moderation required |
| **Public Integration** | Published in Kommo Marketplace; must pass moderation and audit |

#### Step-by-Step: Private Integration Setup
1. Log in as account administrator → **Settings → Integrations**
2. Click **Create Integration** and fill the form (name, description, permissions)
3. If using a long-lived token: **leave Redirect URL empty**
4. Save the integration — Kommo generates keys in the **Keys and scopes** tab
5. Copy `client_id`, `client_secret`
6. Either use long-lived token OR implement OAuth code flow

#### Step-by-Step: Authorization Code Flow
1. Redirect user to the Kommo authorization page
2. User approves → Kommo redirects to `redirect_uri` with `code` parameter
3. Exchange the code for tokens via POST to the token endpoint
4. Use `access_token` in `Authorization: Bearer` header for API calls
5. When `access_token` expires, use `refresh_token` to get new tokens

**Authorization code expires after: 20 minutes**

#### Token Endpoint
```
POST https://{subdomain}.kommo.com/oauth2/access_token
Content-Type: application/json
```

#### Request Body — authorization_code grant:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `client_id` | string | yes | Integration client ID |
| `client_secret` | string | yes | Integration client secret |
| `grant_type` | string | yes | `"authorization_code"` |
| `code` | string | yes | Authorization code from redirect |
| `redirect_uri` | string | yes | Must match registered redirect URI |

#### Request Body — refresh_token grant:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `client_id` | string | yes | Integration client ID |
| `client_secret` | string | yes | Integration client secret |
| `grant_type` | string | yes | `"refresh_token"` |
| `refresh_token` | string | yes | The refresh token |
| `redirect_uri` | string | yes | Must match registered redirect URI |

#### Token Response Fields:
| Field | Type | Description |
|-------|------|-------------|
| `token_type` | string | Bearer |
| `expires_in` | integer | Seconds until access token expires |
| `access_token` | string | Access token for API calls |
| `refresh_token` | string | Token to get new access tokens |

#### Token Lifetimes:
- **Access token:** short-lived (exact value in `expires_in` response field, typically ~24h)
- **Refresh token:** 3 months; revoked if integration unused for 3 months

#### Authorization Header for All API Requests:
```
Authorization: Bearer $YOUR_ACCESS_TOKEN
```

#### Long-Lived Token (Private integrations only)
- Validity: 1 day to 5 years (user selects expiration)
- Generated via: Settings → Integrations → Keys and scopes → **Generate long-lived token**
- No `refresh_token` — does not need to be exchanged
- Used with: `Authorization: Bearer {long_lived_token}`
- **Warning:** If compromised, entire account is at risk

#### One-Time Tokens (Widget Context)
- Used for widget-to-backend server authentication
- Header: `X-Auth-Token`
- Algorithm: `HS256`
- Key: integration secret key

#### Permissions/Scopes
Defined when creating the integration in the Kommo admin panel. Granular permissions — users see exactly what data an integration can access. Admins can revoke access at any time.
Documented at: `https://developers.kommo.com/docs/permissions`

---

## 3. API BASE URL & VERSIONING

### Main CRM API
```
https://{subdomain}.kommo.com/api/v4/{endpoint}
```
- `{subdomain}` = the account's unique subdomain
- Current API version: **v4**
- All requests must use **HTTPS**

### Chats API (separate service)
```
https://amojo.kommo.com/v2/origin/custom/{scope_id}
```

### Files API (separate service)
```
https://{your-drive}.kommo.com/upload/{session_token}
```

### Response Format
- Success: `Content-Type: application/hal+json`
- Error: `Content-Type: application/problem+json`

### HAL+JSON Response Structure
```json
{
  "_links": {
    "self": { "href": "/api/v4/...", "method": "get" },
    "next": { "href": "/api/v4/...?page=2", "method": "get" }
  },
  "_embedded": {
    "leads": [ { "id": 12345, "_links": { "self": { "href": "/api/v4/leads/12345", "method": "get" } } } ]
  }
}
```

---

## 4. RATE LIMITS

| Parameter | Value |
|-----------|-------|
| **Max requests per second** | **7 req/s per account** |
| **Rate limit error code** | **HTTP 429** Too Many Requests |
| **After repeated violations** | IP blocked → **HTTP 403** on all requests |

### Pagination Limits
- Maximum **250 entities** per page
- Maximum **100 pages** per pagination sequence

### Triggers for Account Blocking
- Selecting the same timestamp repeatedly in short period
- Unchecked search of all data without pagination
- Repeated 429 violations

### Best Practices
1. Do not exceed 7 req/s
2. Use `If-Modified-Since` header when polling leads, contacts, companies, tasks lists
3. Implement exponential backoff on 429 responses
4. Use bulk/batch endpoints (e.g., `POST /api/v4/leads` with array)
5. Paginate with max 250 per page

---

## 5. COMPLETE API ENDPOINT TABLE

### Leads

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v4/leads` | Get list of leads |
| POST | `/api/v4/leads` | Add leads (array) |
| PATCH | `/api/v4/leads` | Edit leads (bulk) |
| GET | `/api/v4/leads/{id}` | Get a lead by ID |
| PATCH | `/api/v4/leads/{id}` | Edit a single lead |
| POST | `/api/v4/leads/complex` | Complex add: lead + contact + company in one request |
| GET | `/api/v4/leads/unsorted` | Get list of incoming (unsorted) leads |
| GET | `/api/v4/leads/unsorted/{uid}` | Get an incoming lead by UID |
| POST | `/api/v4/leads/unsorted/forms` | Add incoming leads from forms |
| POST | `/api/v4/leads/unsorted/sip` | Add incoming leads of SIP/call type |
| POST | `/api/v4/leads/unsorted/{uid}/accept` | Accept an incoming lead |
| POST | `/api/v4/leads/unsorted/{uid}/link` | Link an incoming lead to existing lead |
| GET | `/api/v4/leads/loss_reasons` | Get list of lead loss reasons |
| GET | `/api/v4/leads/loss_reasons/{id}` | Get lead loss reason by entity ID |

**Key Lead Fields (POST/PATCH body):**

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Lead name |
| `price` | integer | Lead amount/value |
| `status_id` | integer | Stage ID (pipeline stage) |
| `pipeline_id` | integer | Pipeline ID |
| `responsible_user_id` | integer | Responsible user ID |
| `created_by` | integer | Creator user ID |
| `created_at` | timestamp | Creation time (unix) |
| `updated_at` | timestamp | Last update time (unix) |
| `closed_at` | timestamp | Close time (unix) |
| `loss_reason_id` | integer | Loss reason ID |
| `custom_fields_values` | array | Custom field values array |
| `tags_to_add` | array | Tags to add (avoids collisions) |
| `tags_to_delete` | array | Tags to delete (avoids collisions) |
| `_embedded` | object | Embedded contacts/companies |

**Leads List Query Parameters:**

| Parameter | Description |
|-----------|-------------|
| `page` | Page number |
| `limit` | Items per page (max 250) |
| `with` | Comma-separated embedded resources (e.g., `contacts,companies`) |
| `query` | Search query string |
| `filter[id][]` | Filter by ID(s) |
| `filter[status][]` | Filter by status/stage |
| `filter[pipeline_id][]` | Filter by pipeline |
| `filter[responsible_user_id][]` | Filter by responsible user |
| `order[created_at]` | Sort by creation date |
| `order[updated_at]` | Sort by update date |
| `If-Modified-Since` | Header for incremental sync |

---

### Contacts

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v4/contacts` | Get list of contacts |
| POST | `/api/v4/contacts` | Add contacts (array) |
| PATCH | `/api/v4/contacts` | Edit contacts (bulk) |
| GET | `/api/v4/contacts/{id}` | Get a contact by ID |
| PATCH | `/api/v4/contacts/{id}` | Edit a single contact |
| DELETE | `/api/v4/contacts/{id}` | Delete a contact |
| GET | `/api/v4/contacts/{id}/links` | Get linked entities for contact |
| POST | `/api/v4/contacts/{id}/link` | Link entity to contact |
| DELETE | `/api/v4/contacts/{id}/unlink` | Unlink entity from contact |

**Key Contact Fields:**
`name`, `first_name`, `last_name`, `responsible_user_id`, `created_by`, `created_at`, `updated_at`, `is_main_contact`, `custom_fields_values`, `tags_to_add`, `tags_to_delete`

Unique identifiers: **email** and **phone number**
A contact can be linked to multiple leads, but only **one company**.

---

### Companies

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v4/companies` | Get list of companies |
| POST | `/api/v4/companies` | Add companies (array) |
| PATCH | `/api/v4/companies` | Edit companies (bulk) |
| GET | `/api/v4/companies/{id}` | Get a company by ID |
| PATCH | `/api/v4/companies/{id}` | Edit a single company |
| DELETE | `/api/v4/companies/{id}` | Delete a company |
| GET | `/api/v4/companies/{id}/links` | Get linked entities |
| POST | `/api/v4/companies/{id}/link` | Link entity to company |
| DELETE | `/api/v4/companies/{id}/unlink` | Unlink entity |

---

### Pipelines & Stages

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v4/leads/pipelines` | Get list of pipelines |
| POST | `/api/v4/leads/pipelines` | Add a pipeline |
| GET | `/api/v4/leads/pipelines/{id}` | Get a pipeline by ID |
| PATCH | `/api/v4/leads/pipelines/{id}` | Edit a pipeline |
| DELETE | `/api/v4/leads/pipelines/{id}` | Delete a pipeline |
| GET | `/api/v4/leads/pipelines/{pipeline_id}/statuses` | Get stages list for pipeline |
| POST | `/api/v4/leads/pipelines/{pipeline_id}/statuses` | Add stages to pipeline |
| GET | `/api/v4/leads/pipelines/{pipeline_id}/statuses/{id}` | Get a pipeline stage by ID |
| PATCH | `/api/v4/leads/pipelines/{pipeline_id}/statuses/{id}` | Edit a stage |
| DELETE | `/api/v4/leads/pipelines/{pipeline_id}/statuses/{id}` | Delete a stage |

**Key facts:**
- Maximum **10 pipelines** per account
- Each lead **must** have a stage (`status_id`)

---

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v4/tasks` | Get list of tasks |
| POST | `/api/v4/tasks` | Add tasks (array) |
| PATCH | `/api/v4/tasks` | Edit tasks (bulk) |
| GET | `/api/v4/tasks/{id}` | Get a task by ID |
| PATCH | `/api/v4/tasks/{id}` | Edit a single task |
| DELETE | `/api/v4/tasks/{id}` | Delete a task |

**Task Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `text` | string | yes | Task description |
| `complete_till` | integer | yes | Deadline (unix timestamp) |
| `entity_type` | string | optional | `leads`, `contacts`, or `companies` |
| `entity_id` | integer | optional | ID of linked entity |
| `responsible_user_id` | integer | optional | Defaults to current user |
| `result` | object | optional | `{"text": "..."}` — task result |
| `created_at` | integer | optional | Unix timestamp |
| `updated_at` | integer | optional | Unix timestamp |

Request body must be a **JSON array** even for a single task.

---

### Notes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v4/{entity_type}/notes` | Get notes list by entity type |
| POST | `/api/v4/{entity_type}/notes` | Add notes to entity |
| PATCH | `/api/v4/{entity_type}/notes/{id}` | Edit a note |
| DELETE | `/api/v4/{entity_type}/notes/{id}` | Delete a note |
| GET | `/api/v4/{entity_type}/{entity_id}/notes` | Get notes for specific entity |
| POST | `/api/v4/leads/notes/{id}/pin` | Pin a note |
| DELETE | `/api/v4/leads/notes/{id}/pin` | Unpin a note |

`{entity_type}` = `leads`, `contacts`, `companies`

**Note Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Note ID |
| `entity_type` | string | Entity type |
| `entity_id` | integer | ID of the entity |
| `created_by` | integer | User ID who created |
| `modified_by` | integer | User ID who last modified |
| `created_at` | integer | Unix timestamp |
| `updated_at` | integer | Unix timestamp |
| `responsible_user_id` | integer | Responsible user |
| `note_type` | string | Note type (see below) |
| `text` | string | Text content |
| `attachment` | string | URL to attachment |

**Note Types:**

| Type | Description |
|------|-------------|
| `common` | Text note (default) |
| `call_in` | Incoming call |
| `call_out` | Outgoing call |
| `service_message` | Created by integration |
| `geolocation` | Text note with geo-tag (mobile) |
| `sms_in` | Incoming SMS |
| `sms_out` | Outgoing SMS |
| `extended_service_message` | Extended system event/note |

---

### Events

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v4/events` | Get list of account events |
| GET | `/api/v4/events/{id}` | Get a single event |
| GET | `/api/v4/events/types` | Get all available event types |

**Events Filter Parameters:**
- `filter[responsible_user_id][]`
- `filter[pipeline_id][]` and `filter[status_id][]` (for lead stage change events)
- `filter[value][]`
- `filter[custom_field_{FIELD_ID}_value_changed]`

**Known Event Types:** `nps_rate_added`, `sale_field_changed`, `name_field_changed`, `ltv_field_changed`, `custom_field_value_changed`

---

### Webhooks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v4/webhooks` | Get list of webhooks |
| POST | `/api/v4/webhooks` | Add a webhook |
| DELETE | `/api/v4/webhooks` | Delete a webhook |

**Note:** Webhook API management requires **Advanced, Pro, or Enterprise** plan.

**Webhook Registration Fields:**

| Field | Description |
|-------|-------------|
| `destination` | URL to receive webhook POST requests |
| `settings` | Array of event type strings to subscribe to |

---

### Custom Fields

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v4/{entity_type}/custom_fields` | Get custom fields list |
| POST | `/api/v4/{entity_type}/custom_fields` | Add custom fields |
| PATCH | `/api/v4/{entity_type}/custom_fields/{id}` | Update a custom field |
| DELETE | `/api/v4/{entity_type}/custom_fields/{id}` | Delete a custom field |
| GET | `/api/v4/{entity_type}/custom_fields/{id}` | Get a field by ID |
| GET | `/api/v4/{entity_type}/custom_fields/groups` | Get field groups |
| GET | `/api/v4/{entity_type}/custom_fields/groups/{id}` | Get a field group by ID |
| GET | `/api/v4/catalogs/{list_id}/custom_fields` | Get catalog custom fields |
| POST | `/api/v4/catalogs/{list_id}/custom_fields` | Add custom field to catalog |
| GET | `/api/v4/catalogs/{list_id}/custom_fields/{id}` | Get catalog field by ID |

`{entity_type}` = `leads`, `contacts`, `companies`, `customers`

**Custom Field Types:**

| Type | Description |
|------|-------------|
| `text` | Free text |
| `numeric` | Numbers only |
| `checkbox` | Boolean checkbox |
| `select` | Single-select dropdown |
| `multiselect` | Multi-select |
| `date` | Calendar date |
| `url` | URL field |
| `textarea` | Multi-line text |
| `radiobutton` | Radio button |
| `streetaddress` | Short address |
| `smart_address` | Smart address with geocoding |
| `legal_entity` | Legal entity data |
| `birthday` | Birthday field |
| `date_time` | Date and time |
| `price` | Price field |
| `category` | Category |
| `items` | Items/products list |
| `multitext` | Multiple text values (email, phone) |

**Custom Field Model Properties:**
`id`, `name`, `type`, `account_id`, `code`, `sort`, `is_api_only`, `enums`, `request_id`, `catalog_id`, `is_visible`, `is_deletable`, `is_required`, `nested`, `entity_type`

**Using Custom Fields in Requests — all values inside `custom_fields_values` array:**
```json
{
  "custom_fields_values": [
    {
      "field_id": 123,
      "values": [{"value": "some value"}]
    }
  ]
}
```
Can use `field_code` instead of `field_id`.

---

### Tags

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v4/{entity_type}/tags` | Get list of entity tags |
| POST | `/api/v4/{entity_type}/tags` | Add tags for entity type |
| PATCH | `/api/v4/{entity_type}/tags` | Update multiple entity tags |

`{entity_type}` = `leads`, `contacts`, `companies`, `customers`

- To add a tag: pass `"name"` parameter; if name already exists, returns its ID
- Use `tags_to_add` and `tags_to_delete` keys on entity CRUD to avoid integration conflicts

---

### Catalogs / Lists

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v4/catalogs` | Get list of catalogs |
| POST | `/api/v4/catalogs` | Add a catalog |
| GET | `/api/v4/catalogs/{list_id}` | Get a catalog by ID |
| PATCH | `/api/v4/catalogs/{list_id}` | Edit a catalog |
| GET | `/api/v4/catalogs/{list_id}/elements` | Get catalog elements |
| POST | `/api/v4/catalogs/{list_id}/elements` | Add catalog elements |
| PATCH | `/api/v4/catalogs/{list_id}/elements/{id}` | Edit a catalog element |
| DELETE | `/api/v4/catalogs/{list_id}/elements/{id}` | Delete a catalog element |

**Catalog Element Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Element ID |
| `name` | string | Element name |
| `created_by` | integer | Creator user ID |
| `created_at` | integer | Unix timestamp |
| `updated_at` | integer | Unix timestamp |
| `updated_by` | integer | Last updated by user ID |
| `is_deleted` | boolean | Whether deleted |
| `custom_fields` | array | Custom field values |
| `catalog_id` | integer | Parent catalog ID |

---

### Customers

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v4/customers` | Get list of customers |
| POST | `/api/v4/customers` | Add customers |
| PATCH | `/api/v4/customers` | Edit customers (bulk) |
| GET | `/api/v4/customers/{id}` | Get a customer by ID |
| PATCH | `/api/v4/customers/{id}` | Edit a single customer |
| GET | `/api/v4/customers/segments` | Get customer segments |
| GET | `/api/v4/customers/stages` | Get customer stages (statuses) |
| GET | `/api/v4/customers/{id}/subscriptions` | Get customer subscriptions |
| GET | `/api/v4/customers/custom_fields` | Get customer custom fields |
| GET | `/api/v4/customers/tags` | Get customer tags |

Customers are available in the B2C module and represent repeat-purchase clients.

---

### Calls

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v4/calls` | Log a call (bulk add call logs) |

**Call Log Request Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `phone` | string | Phone number for entity matching |
| `created_at` | integer | Unix timestamp of call |
| `created_by` | integer | User ID who created |
| `duration` | integer | Call duration in seconds |
| `call_status` | integer | Call status code |
| `direction` | string | `"inbound"` or `"outbound"` |
| `link` | string | URL to call recording file |
| `responsible_user_id` | integer | Responsible user ID |
| `uniq` | string | Unique identifier for deduplication |

**Call Status Logic:**
- Automatically searches for entities by phone number
- Attaches the call record to appropriate entity
- If recording URL provided, UI shows audio player
- Recording server **must** return `Accept-Ranges: bytes` HTTP header for playback

**Call matching uses last 8 digits of phone number**

---

### Users & Account

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v4/users` | Get list of account users |
| GET | `/api/v4/users/{id}` | Get a user by ID |
| GET | `/api/v4/users/me` | Get current user |
| GET | `/api/v4/roles` | Get list of user roles |
| GET | `/api/v4/roles/{id}` | Get a role by ID |
| POST | `/api/v4/roles` | Add a user role |
| PATCH | `/api/v4/roles/{id}` | Edit a role |
| DELETE | `/api/v4/roles/{id}` | Delete a role |
| GET | `/api/v4/account` | Get account parameters |

**Account Response Fields:**
`id`, `name`, `subdomain`, `created_at`, `created_by`, `updated_at`, `updated_by`, `current_user_id`, `country`, `currency`, `currency_symbol`

---

### Sources

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v4/sources` | Get list of integration sources |
| POST | `/api/v4/sources` | Add integration sources |

---

### Link Entities

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v4/{entity_type}/{entity_id}/links` | Get linked entities |
| POST | `/api/v4/{entity_type}/{entity_id}/link` | Link entities |
| DELETE | `/api/v4/{entity_type}/{entity_id}/unlink` | Unlink entities |

---

### Files API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `https://{drive}.kommo.com/upload/{session_token}` | Upload a part of a file |
| PUT | `/api/v4/{entity}/{entity_id}/files` | Attach files to entity |
| GET | `/api/v4/{entity}/{entity_id}/files` | Get files attached to entity |

Requires scope: **"Access to files"**

---

### AI API

| Method | Endpoint | Description |
|--------|----------|-------------|
| (various) | `/reference/ai-api-methods` | AI Suggested Reply methods |
| (various) | `/reference/ai-features` | AI Agent feature endpoints |

**AI Features:**
- **AI Suggested Reply** — generates reply suggestions based on recent Q&A and knowledge base
- **AI Agent** — automatically processes and responds to inquiries; uses product list data (names, specs, prices, descriptions)

Widget location `"ai_agent"` available for widgets integrating with the AI Agent.

---

### Chats API (amojo.kommo.com — separate auth)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `https://amojo.kommo.com/v2/origin/custom/{channel_id}/connect` | Connect account to channel |
| POST | `https://amojo.kommo.com/v2/origin/custom/{scope_id}` | Send/import messages |
| POST | `https://amojo.kommo.com/v2/origin/custom/{scope_id}/typing` | Transfer typing info |

**Chats API Authorization Headers (required for all amojo.kommo.com requests):**

| Header | Value |
|--------|-------|
| `Date` | Current date |
| `Content-Type` | `application/json` |
| `Content-MD5` | MD5 hash of body |
| `X-Signature` | HMAC-SHA1 of body signed with channel secret |

**No Bearer token** — uses signature-based auth.

**X-Signature Calculation (PHP):**
```php
$signature = hash_hmac('sha1', $body, $secret);
// Add header: X-Signature: {$signature}
```

**Message Types Supported:** `text`, `image`, `file`, `location`, `contact`

**Channel Registration:** Must submit request to Kommo technical support; they provide Chat API parameters and channel bot parameters.

---

## Додаткові факти (ChatGPT Deep Research, червень 2026)

### Soft-deleted записи

Видалені записи (в «кошику») повертають 404 при GET. Щоб отримати їх:

```
GET /api/v4/leads?with=deleted
GET /api/v4/leads?with=all
```

### Batch API — ліміт

Максимум **250 об'єктів** за один запит у `add`/`update` масивах. Рекомендується по 50–100 об'єктів за запит.

### OAuth токен — endpoint

```
POST https://oauth.kommo.com/token
```

Параметри: `grant_type`, `code` (або `refresh_token`), `client_id`, `client_secret`, `redirect_uri`.

### Топ-10 помилок інтеграторів

| # | Помилка | Рішення |
|---|---------|---------|
| 1 | Невірний subdomain — 404/500 | Використовуй `https://mycompany.kommo.com/api/v4/...` |
| 2 | Expired access token — 401 | Оновлюй через refresh token |
| 3 | Невірний формат `custom_fields_values` | Масив з `field_id` + `values` |
| 4 | Контакт без прив'язки при створенні ліда | Використовуй `/leads/complex` або `contacts_id` вже існуючого |
| 5 | Пагінація: пропуск записів | `limit` + `page`, поки не повернеться порожній масив |
| 6 | Rate limit 429 | Затримка / backoff між запитами |
| 7 | Вебхуки не приходять | Тільки HTTPS, порти 80/443 |
| 8 | Плутанина `catalogs` vs `catalog_elements` | `/api/v4/catalogs/{id}/elements` для елементів |
| 9 | Batch перевищено 250 — помилка | Ділити на менші пакети |
| 10 | Soft-delete — 404 при GET | Використовуй `with=deleted` або `with=all` |

