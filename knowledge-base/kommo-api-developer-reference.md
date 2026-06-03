# KOMMO DEVELOPER PORTAL — COMPLETE TECHNICAL KNOWLEDGE BASE

*Compiled: June 2026 | Source: WebSearch (developers.kommo.com returns HTTP 403 to direct fetch; all data via web search and cached/indexed sources)*

---

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

## 6. WEBHOOKS REFERENCE

### Overview
Webhooks send **POST requests** to a specified URL in **`x-www-form-urlencoded`** format (not JSON).

Basic payload format:
```
{"lead":{"event":{entity fields array}}}
```

### All Webhook Event Types

**Lead Events:** `add`, `update`, `delete`, `restore`, `responsible`, `status`, `note`

**Contact Events:** `add`, `update`, `delete`, `restore`, `responsible`, `note`

**Company Events:** `add`, `update`, `delete`, `restore`, `responsible`

**Task Events:** `add`, `update`, `delete`, `responsible`

**Customer Events:** `add`, `update`, `delete`, `responsible`, `note`

**Incoming Lead Events:** `add`, `update`, `delete`

### Webhook Payload — Note Added to Lead

Fields included: `text`, `attachment`, `date_create`, `note_type`, `element_type`, `element_id`, `metadata`

### Delivery Behavior

| Parameter | Value |
|-----------|-------|
| **Timeout** | 2 seconds |
| **Valid response** | HTTP 100–299 |
| **Auto-disable trigger** | More than 100 invalid responses in last 2 hours AND last webhook also invalid |

### Webhook Management
- Available on **Advanced, Pro, Enterprise** plans only
- API: `POST /api/v4/webhooks` with `destination` URL and `settings` array
- UI: Settings → Integrations → Add webhook

### Digital Pipeline Webhooks
- Separate from account webhooks
- Triggered by Digital Pipeline stage conditions
- Payload contains: lead ID, element type, status ID, pipeline ID
- Docs: `https://developers.kommo.com/docs/webhooks-dp`

### Security / Verification
- Standard webhooks: No built-in signing (verify by IP or shared secret)
- Chats API webhooks: `X-Signature` header (HMAC-SHA1)
- Salesbot webhooks: JWT token signed with integration secret (HS256)

---

## 7. JS SDK / WIDGET FRAMEWORK

### Widget Structure
1. **`manifest.json`** — metadata, settings schema, locations
2. **`script.js`** — JavaScript logic with callbacks
3. **`i18n/`** folder — localization JSON files

### manifest.json Fields

| Field | Description |
|-------|-------------|
| `name` | Widget name |
| `description` | Full description |
| `short_description` | Short description |
| `version` | Widget version |
| `interface_version` | Interface version |
| `init_once` | `true/false` — initialize once for all pages |
| `locale` | Array of supported language codes |
| `installation` | Installation settings |
| `support.link` | Support URL |
| `support.email` | Support email |
| `locations` | Object defining which areas to display in |

### Widget Locations

| Location Key | Description |
|-------------|-------------|
| `lcard-1` | Lead card with right panel |
| `lcard-0` | Lead card without right panel |
| `llist-0` | Leads list |
| `ccard-1` | Contact card with right panel |
| `ccard-0` | Contact card without right panel |
| `clist-0` | Contacts list |
| `comcard-0` | Company card |
| `card_sdk` | Card SDK integration |
| `settings` | Widget settings page |
| `digital_pipeline` | Digital Pipeline integration |
| `lead_sources` | Lead sources section |
| `catalogs` | Catalogs/lists section |
| `advanced_settings` | Advanced settings |
| `ai_agent` | AI Agent integration (new) |

Panel: `1` = show on right-side panel; `0` = initialize but don't show on panel

### script.js Callback Structure

```javascript
define(['jquery'], function($) {
  return {
    callbacks: {
      settings: function() { /* display widget settings */ },
      init: function() { /* widget initialization */ },
      bind_actions: function() { /* bind events */ },
      render: function() { /* render widget */ },
      dpSettings: function() { /* digital pipeline settings */ },
      advancedSettings: function() { /* advanced settings */ },
      destroy: function() { /* cleanup on widget disable */ },
      'contacts.selected': function() { /* contact selected */ },
      'leads.selected': function() { /* lead selected */ },
      'todo.selected': function() { /* todo selected */ },
      onSalesbotDesignerSave: function() { /* salesbot designer save */ },
      onSave: function() {
        // called when user clicks Set/Save button
        // must return true or a Promise
        return true;
      },
      onAddAsSource: function() { /* add as source */ },
      onInstall: function() { /* called once on installation */ }
    }
  };
});
```

### Key Callbacks

| Callback | When Called | Must Return |
|----------|-------------|-------------|
| `render` | Widget connected to interface; JS script loaded | — |
| `init` | After render() | — |
| `bind_actions` | After init() | — |
| `onSave` | User clicks Set/Save button in settings | `true` or `Promise` |
| `onInstall` | Once, on first installation | — |
| `destroy` | Widget disabled (after onSave) | — |
| `settings` | Settings page displayed | — |

### JS SDK Methods

| Method | Description |
|--------|-------------|
| `self.i18n('key')` | Get localized string from i18n file |
| `self.params` | Access widget settings/parameters |
| `self.system()` | Access system info |
| `self.get_settings()` | Get widget settings |

### Modules System (requireJS / AMD)

Built-in packages available via `define()`:
- `jquery` — jQuery library
- `underscore` — Underscore.js
- `backbone` — Backbone.js (MVC)
- `Modal` — Built-in modal dialog component

### React Hooks Library
- Package: `@kommo-crm/react-hooks`
- GitHub: `https://github.com/kommo-crm/react-hooks`
- Available hooks (confirmed): `useConst`, `useDebounce`

### Card SDK (for `card_sdk` location)

| Method | Description |
|--------|-------------|
| `loadPreloadedData()` | Initialize widget tab, load data for search |
| `searchDataInCard()` | Called on search; returns `Promise<Array<{id, sku, name, price}>>` |
| `loadElements()` | Display found elements; returns `Promise<Array<{id, sku, name, price, quantity}>>` |
| `linkCard()` | Called when saving/modifying/unlinking items |

### i18n / Localization

**Supported languages:** `en`, `es`, `pt`, `tr`, `id`
Files: `i18n/en.json`, `i18n/es.json`, etc. — all files must have **identical structure**.

```json
{
  "widget": {
    "name": "My Widget",
    "short_description": "Short description here",
    "description": "Full description here",
    "tour_description": "Tour description",
    "ai_agent_description": "AI agent description (max 100 chars)"
  },
  "settings": {
    "login": "Login",
    "api_key": "API Key",
    "account": "Account"
  }
}
```

### Widget Marketplace Submission Requirements
1. **Dark theme compatibility** — all elements readable in dark mode
2. **No external script injection** via `document.createElement('script')` — use requireJS `define`
3. **Icon:** original SVG, not copying Kommo icons
4. **Marketplace image:** 400×272px with 10px margins; 1–5 slideshow images
5. **Branding:** must clearly indicate third-party developer (not Kommo)
6. Archive is auto-validated; errors return `400 Bad Request` with error list
7. On acceptance → developer becomes **Kommo Technical Partner**

---

## 8. TELEPHONY / VOIP API

### VoIP Integration Features
- Click-to-call — 1-click dialing from CRM
- Call logging — automatic recording and logging in client card
- Caller ID — identifies caller and links to contact/company
- Call results — managers add notes or attach calls to leads
- Smart forwarding — routes calls to responsible manager
- Call recording — playback via audio player in UI

### Caller ID Matching
- Uses **last 8 digits** of phone number
- Search order: Contact → Company → Lead

### Call Logging Endpoint
```
POST https://{subdomain}.kommo.com/api/v4/calls
```
Request body fields: `phone`, `created_at`, `created_by`, `duration`, `call_status`, `direction`, `link`, `responsible_user_id`, `uniq`

**Recording server requirement:** Must include header `Accept-Ranges: bytes`

### Additional Telephony Docs
- Call result: `https://developers.kommo.com/docs/call-result`
- Call from webhook: `https://developers.kommo.com/docs/call-from-webhook`
- VoIP JS methods: `https://developers.kommo.com/docs/voip`

---

## 9. CODE EXAMPLES

### OAuth Token Request
```
POST https://{subdomain}.kommo.com/oauth2/access_token
Content-Type: application/json

{
  "client_id": "YOUR_CLIENT_ID",
  "client_secret": "YOUR_CLIENT_SECRET",
  "grant_type": "authorization_code",
  "code": "YOUR_AUTHORIZATION_CODE",
  "redirect_uri": "https://yourapp.com/callback"
}
```

Token refresh:
```json
{
  "client_id": "YOUR_CLIENT_ID",
  "client_secret": "YOUR_CLIENT_SECRET",
  "grant_type": "refresh_token",
  "refresh_token": "YOUR_REFRESH_TOKEN",
  "redirect_uri": "https://yourapp.com/callback"
}
```

### Create Lead
```json
[
  {
    "name": "Lead Name",
    "pipeline_id": 12345,
    "status_id": 67890,
    "responsible_user_id": 111222,
    "custom_fields_values": [
      {
        "field_id": 333,
        "values": [{"value": "custom value"}]
      }
    ]
  }
]
```

### Complex Lead Creation (with embedded contact)
```json
[
  {
    "name": "Lead with contact",
    "pipeline_id": 12345,
    "status_id": 67890,
    "_embedded": {
      "contacts": [
        {
          "first_name": "John",
          "last_name": "Doe",
          "custom_fields_values": [
            {
              "field_code": "PHONE",
              "values": [{"value": "+1234567890", "enum_code": "WORK"}]
            }
          ]
        }
      ]
    }
  }
]
```

### Create Task
```json
[
  {
    "text": "Call the client",
    "complete_till": 1609459200,
    "entity_type": "leads",
    "entity_id": 12345,
    "responsible_user_id": 67890,
    "result": {
      "text": "Client confirmed next steps"
    }
  }
]
```

### Custom Fields Values
```json
{
  "custom_fields_values": [
    {
      "field_id": 123456,
      "values": [{"value": "text value"}]
    },
    {
      "field_code": "PHONE",
      "values": [{"value": "+1234567890", "enum_code": "WORK"}]
    }
  ]
}
```

### Webhook Registration
```json
{
  "destination": "https://your-server.com/webhook",
  "settings": [
    "add_lead",
    "update_lead",
    "status_lead",
    "responsible_lead"
  ]
}
```

### Chats API X-Signature (PHP)
```php
$signature = hash_hmac('sha1', $body, $secret);
// Add header: X-Signature: {$signature}
```

### Widget script.js (full callback structure)
```javascript
define(['jquery'], function($) {
  return {
    callbacks: {
      settings: function() {},
      init: function() { return true; },
      bind_actions: function() { return true; },
      render: function() { return true; },
      dpSettings: function() {},
      advancedSettings: function() {},
      destroy: function() {},
      onSave: function() {
        return true; // or return Promise
      },
      onInstall: function() {},
      'contacts.selected': function() {},
      'leads.selected': function() {}
    }
  };
});
```

### HAL+JSON Response Structure
```json
{
  "_links": {
    "self": { "href": "/api/v4/leads", "method": "get" },
    "next": { "href": "/api/v4/leads?page=2", "method": "get" }
  },
  "_embedded": {
    "leads": [
      {
        "id": 12345,
        "name": "My Lead",
        "status_id": 67890,
        "_links": {
          "self": { "href": "/api/v4/leads/12345", "method": "get" }
        }
      }
    ]
  }
}
```

---

## 10. CHANGELOG

| Date | Description |
|------|-------------|
| November 18, 2024 | New parameters and descriptions added to developer guides and references |
| November 18, 2024 | Added List Message parameter info in webhooks for Chats API |
| 2024 | New endpoints for **pinning and unpinning notes** via API |
| 2024 | New endpoint for **starting a single Salesbot** |
| 2024 | New endpoint for **stopping a Salesbot** |
| 2024 | New endpoints for **getting list of lead loss reasons** and **loss reason by entity ID** |
| 2024 | Ability to set **delivery status** when importing new message in Chats API |
| 2024 | Salesbot start endpoint **updated to v4** |
| 2024 | `_embedded[source][external_id]` and `_embedded[source][type]` parameters added to add-leads |
| Recent | React Hooks library (`@kommo-crm/react-hooks`) released |
| Recent | `ai_agent` widget location introduced |

**Changelog pages:**
- `https://developers.kommo.com/changelog`
- `https://developers.kommo.com/changelog/updates-in-api-documentation`
- `https://developers.kommo.com/changelog/welcome-to-kommo-api`
- `https://developers.kommo.com/changelog/get-your-access-token`
- `https://developers.kommo.com/changelog/new-developer-tools-out`

---

## 11. COMPLETE DOCUMENTATION MAP

### Guide Pages (/docs/)

| Title | URL |
|-------|-----|
| Kommo for Developers | `/docs/kommo-for-developers` |
| Subject Area | `/docs/subject-area` |
| Dictionary for Developers | `/docs/dictionary-for-developers` |
| OAuth 2.0 | `/docs/oauth-20` |
| Permissions | `/docs/permissions` |
| Long-lived Token | `/docs/long-lived-token` |
| Private Integration | `/docs/private-integration` |
| Authorization for Public Integrations | `/docs/authorization-public` |
| Create a Public Integration | `/docs/get-started-public` |
| Public Integration Checklist | `/docs/getting-listed` |
| Limitations | `/docs/limitations` |
| HTTP Status Codes | `/docs/http-codes` |
| Lead Capture | `/docs/lead-capture` |
| Webhooks (General) | `/docs/webhooks-general` |
| Webhooks in Digital Pipeline | `/docs/webhooks-dp` |
| JS SDK | `/docs/js-sdk` |
| Widget Tutorial | `/docs/widgets-tutorial` |
| Structure of Widget | `/docs/structure-widget` |
| Manifest.json | `/docs/manifest-json` |
| Widget Locations | `/docs/widget-locations` |
| Script.js | `/docs/script-js` |
| Modules and Packages | `/docs/modules` |
| Field Types (Settings) | `/docs/field-types` |
| i18n Localization | `/docs/i18n` |
| Card SDK | `/docs/card-sdk` |
| Lists SDK | `/docs/lists-sdk` |
| React Hooks | `/docs/react-hooks` |
| Widgets in Digital Pipeline | `/docs/widgets-dp` |
| Salesbot in Digital Pipeline | `/docs/salesbot-dp` |
| Private Chatbot Integration | `/docs/private-chatbot-integration` |
| VoIP | `/docs/voip` |
| Caller ID | `/docs/caller-id` |
| Call Logging | `/docs/call-logging` |
| Call Result | `/docs/call-result` |
| Call from Webhook | `/docs/call-from-webhook` |
| Changelog | `/changelog` |

### API Reference Pages (/reference/)

| Title | URL |
|-------|-----|
| About Kommo API | `/reference/kommo-api-reference` |
| Get/Renew Access Token | `/reference/get-token` |
| Leads | `/reference/leads` |
| Leads List | `/reference/leads-list` |
| Getting a Lead by ID | `/reference/getting-a-lead-by-its-id` |
| Complex Leads | `/reference/complex-leads` |
| Incoming Leads List | `/reference/incoming-leads-list` |
| Incoming Lead by UID | `/reference/incoming-lead-uid` |
| Accept Incoming Leads | `/reference/accepting-incoming-leads` |
| Link Incoming Leads | `/reference/linking-incoming-leads` |
| Add Incoming Leads (Form) | `/reference/incoming-leads-form` |
| Contacts | `/reference/contacts` |
| Contacts List | `/reference/contacts-list` |
| Get Contact by ID | `/reference/get-contact` |
| Add Contacts | `/reference/add-contacts` |
| Companies | `/reference/companies` |
| Companies List | `/reference/companies-list` |
| Leads Pipelines and Stages | `/reference/leads-pipelines-and-stages` |
| Pipelines List | `/reference/pipelines-list` |
| Stages List | `/reference/stages-list` |
| Get Stage by ID | `/reference/get-stage` |
| Add Stages | `/reference/add-stages` |
| Edit Stage | `/reference/edit-stage` |
| Get Pipeline by ID | `/reference/get-pipeline-by-id` |
| Tasks | `/reference/tasks` |
| Tasks List | `/reference/tasks-list` |
| Add Tasks | `/reference/add-tasks` |
| Edit Tasks | `/reference/edit-tasks` |
| Edit Task (single) | `/reference/edit-task` |
| Notes | `/reference/notes` |
| Notes Types | `/reference/notes-types` |
| Notes List (by entity) | `/reference/notes-list-entity` |
| Add Notes | `/reference/add-notes` |
| Events | `/reference/events` |
| Events Types | `/reference/events-types` |
| Get Events Types | `/reference/get-events-types` |
| Events Filtration | `/reference/events-filtration` |
| Webhooks | `/reference/webhooks` |
| Webhook Events | `/reference/webhook-events` |
| List Webhooks | `/reference/list-webhooks` |
| Add Webhooks | `/reference/add-webhooks` |
| Custom Fields | `/reference/custom-fields` |
| Custom Field by Entity | `/reference/custom-field-by-entity` |
| Custom Fields by ID | `/reference/custom-fields-by-id` |
| Add Custom Fields | `/reference/add-custom-fields` |
| Update Custom Fields | `/reference/update-custom-fields` |
| Get Entity Field Group by ID | `/reference/get-a-fields-group-by-id` |
| Custom Fields List of Catalog | `/reference/custom-fields-list-of-list` |
| Get Catalog Field by ID | `/reference/get-list-custom-field` |
| Add Custom Field to Catalog | `/reference/adding-custom-field` |
| Tags | `/reference/tags` |
| List of Entity Tags | `/reference/list-of-entity-tags` |
| Add Tags | `/reference/add-tags` |
| Update Tags | `/reference/update-tags` |
| Catalogs | `/reference/catalogs` |
| Lists | `/reference/lists` |
| Get List | `/reference/get-list` |
| Add List Elements | `/reference/add-list-elements` |
| Customers | `/reference/customers` |
| Calls | `/reference/calls` |
| Users | `/reference/users` |
| User Roles List | `/reference/user-roles-list` |
| Account Parameters | `/reference/account-parameters` |
| Link Entities | `/reference/linking-entities` |
| Linked Entities List | `/reference/linked-entities` |
| Get Sources | `/reference/get-sources` |
| Add Sources | `/reference/add-sources` |
| Sources | `/reference/sources` |
| AI API Methods | `/reference/ai-api-methods` |
| AI Features | `/reference/ai-features` |
| Register Channel (Chats) | `/reference/register-channel` |
| Connect Channel | `/reference/connect-channel` |
| Send/Import Messages | `/reference/send-import-messages` |
| Five Steps to Send a Message | `/reference/send-message-guide` |
| Typing Info | `/reference/typing-info` |
| Files API | `/reference/files-api` |
| Files API Key Features | `/reference/files-api-key-features` |
| Upload File | `/reference/upload-file` |
| Attach Files to Entity | `/reference/attached-to-entity` |
| Get Files from Entity | `/reference/get-files-entity` |
| Chats API Authorization | `/reference/chats-api-authorization-and-headers` |
| Widgets (API) | `/reference/widgets` |

---

## 12. GAPS & 404s

### Pages Returning 403 (All Direct Fetches)
All `developers.kommo.com` pages return **HTTP 403** to direct fetch tools. All data in this report came from web search snippets and cached/indexed sources.

### Information Not Found

| Topic | Status |
|-------|--------|
| Complete OAuth scopes list (exact strings) | Not found — `/docs/permissions` blocked |
| `llms.txt` full OpenAPI spec | Not accessible — 403 |
| Exact `expires_in` value for access tokens | Not confirmed — described as "short-lived" |
| Complete events types list (all strings) | Partial — confirmed 5 types |
| Complete webhook payload JSON examples | Partial — x-www-form-urlencoded format noted |
| VoIP JS method names (exact) | Not found — docs blocked |
| Salesbot start/stop exact endpoint paths | Not confirmed |
| AI API exact endpoint paths | Not found |
| Exact `call_status` code values | Not found |
| Customer entity exact field names | Partial |
| Complete `manifest.json` schema | Partial |
| One-time token generation flow details | Partial |
| React Hooks full method list | Partial — confirmed: `useConst`, `useDebounce` |

### Undocumented Behaviors Noted
1. **If-Modified-Since header:** Community reports suggest it may not work correctly — returns all entities instead of 304/empty when no changes
2. **Webhook auto-disable:** After 100 invalid responses in 2 hours — specific threshold worth monitoring in production
3. **API block after 403:** Once blocked, ALL API requests return 403 — not just the rate-limited endpoints
4. **Catalogs vs Lists:** Terms appear interchangeable (`/reference/catalogs` and `/reference/lists` both exist)

---

## KEY INTEGRATION FACTS (Summary)

1. Use `Authorization: Bearer {token}` for all CRM API calls
2. Respect the **7 req/s** hard limit — use bulk endpoints
3. Webhook delivery requires response **within 2 seconds** (HTTP 100-299)
4. For private integrations: long-lived tokens are simpler than OAuth flow
5. Chats API uses completely different auth (HMAC-SHA1 signatures, no Bearer)
6. Widget SDK uses AMD/requireJS — no ES modules
7. Response format is HAL+JSON (`_links` + `_embedded` structure)
8. Pagination: max **250 entities/page**, max **100 pages**
9. Maximum **10 pipelines** per account
10. Maximum **100 webhooks** per account
