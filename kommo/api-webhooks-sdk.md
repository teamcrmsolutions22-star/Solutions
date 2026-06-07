# Kommo API — Вебхуки, JS SDK, телефонія, приклади

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

**Incoming Message Events:** `add`

**Catalog Element Events:** `add`, `update`, `delete`

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
- **Ліміт:** максимум **100 вебхуків** на один акаунт (через `/api/v4/webhooks`)
- **Retry-логіка:** не задокументовано ⚠️ — кількість повторних спроб, інтервали та критерії невідомі

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


---

## Widget Development — Повна документація (YouTube)

### Skeleton CLI

```bash
npx @kommo/create-kommo-integration
```

CLI доступний на npm та GitHub. Встановлює React, TypeScript, i18n, deployment configs і документацію одним запуском.

**Кроки при ініціалізації:**
1. Вибір мови CLI: English, Spanish, Portuguese, Indonesian, Turkish
2. Ввести назву директорії проекту
3. Вибрати локалі (створює i18n з JSON-файлами перекладів)
4. Налаштування manifest: `init_once`, потрібні дані, посилання, email, locations

**Структура проекту після scaffold:**
```
project-dir/
├── README.md
├── client/
│   ├── manifest.json
│   ├── script.js
│   ├── i18n/
│   ├── images/
│   ├── css/
│   └── templates/
├── server/           ← бекенд (OAuth, webhook-handlers)
├── .env.dev
└── .env.prod
```

**Environment файли:**
- `.env.dev` / `.env.prod` — `INTEGRATION_CODE`, `BASE_URL` (зазвичай порт 9000)
- `server/.env` — `CLIENT_ID`, `CLIENT_SECRET`, `REDIRECT_URI`, `SUBDOMAIN`

**Dev server:**
```bash
# Термінал 1 — фронтенд
cd client && yarn dev      # localhost:9000, live reload

# Термінал 2 — бекенд
cd server && yarn dev      # localhost:3000
```

**Dev mode (без повторного завантаження zip):**
```javascript
// В браузерній консолі:
localStorage.setItem('<integration_code>_is_dev', 'localhost:9000')
```

**Build та деплой:**
```bash
yarn build   # → dist/ + widget.zip (готовий до завантаження в Kommo)
```

**Tunneling для локальної розробки:** ngrok — зовнішній URL вказується у `manifest.json` (webhook_url, iframe URL), OAuth redirect URI.

---

### manifest.json — всі поля

**КРИТИЧНО:** `interface_version` ЗАВЖДИ має дорівнювати `2`.

```json
{
  "widget": {
    "name": "i18n:widget.name",
    "description": "i18n:widget.description",
    "version": "1.0.0",
    "interface_version": 2,
    "init_once": false,
    "langs": ["en", "es", "pt"],
    "installation": true,
    "locations": [
      {"code": "settings", "path": "settings/widget"},
      {"code": "card1", "path": "card/widget"},
      {"code": "ccard0", "path": "ccard/widget"}
    ],
    "adp_digital_pipeline": {
      "webhook_url": "https://your-ngrok-url/webhook"
    }
  }
}
```

| Поле | Опис |
|------|------|
| `interface_version` | **Завжди `2`** — обов'язково |
| `init_once` | `true` — ініціалізується один раз; `false` — на кожній сторінці |
| `langs` | Масив локалей: `"en"`, `"es"`, `"pt"` |
| `installation` | `true` — є сторінка налаштувань; `false` — налаштування через API |
| `locations` | `settings` (сторінка встановлення), `card1` (права панель ліда), `ccard0` (профіль контакту без відображення) |

---

### script.js — AMD патерн та callbacks

```javascript
define(['jquery'], function($) {
  return {
    render: function() {
      var self = this;
      // Логіка відображення
      return self;
    },
    init: function() {
      var self = this;
      // Одноразова ініціалізація
      return self;
    },
    onSave: function() {
      var self = this;
      // Збереження налаштувань
      return self;
    },
    bind_actions: function() {
      var self = this;
      // jQuery-обробники кліків, форм
      return self;
    },
    settings: function() {
      return this;
    },
    destroy: function() {
      return this;
    }
  };
});
```

---

### Структура файлів — обов'язкові компоненти

```
widget.zip (кореневий рівень!)
├── manifest.json
├── script.js
├── i18n/
│   ├── en.json
│   ├── es.json
│   └── pt.json
├── images/
│   ├── logo_min.png       ← обов'язковий
│   ├── logo.png           ← обов'язковий
│   ├── logo_main.png      ← обов'язковий
│   ├── logo_feature.png   ← обов'язковий
│   └── logo_medium.png    ← обов'язковий
├── css/
│   └── style.css
└── templates/
    └── *.twig
```

⚠️ **Усі файли мають бути на кореневому рівні архіву** — не у вкладеній папці.

---

### Lead Capture Integration — Python

```python
subdomain = "your_account_subdomain"
api_key = "your_long_lived_token"

base_lead_url = f"https://{subdomain}.kommo.com/api/v4/leads"
base_contact_url = f"https://{subdomain}.kommo.com/api/v4/contacts"
base_contact_custom_fields_url = f"https://{subdomain}.kommo.com/api/v4/contacts/custom_fields"

# Крок 1: Отримати ID поля телефону
contact_custom_fields_response = requests.get(
    base_contact_custom_fields_url,
    headers={"Authorization": f"Bearer {api_key}"}
)
contact_custom_fields = contact_custom_fields_response.json()["_embedded"]["custom_fields"]
phone_field_id = next(f["id"] for f in contact_custom_fields if f["code"] == "PHONE")

# Крок 2: Перевірка дублікатів (HTTP 204 = не знайдено, 200 = знайдено)
check_response = requests.get(
    base_contact_url,
    params={"query": phone_number},
    headers={"Authorization": f"Bearer {api_key}"}
)

# Крок 3: Створення ліда з контактом
lead_body = [{
    "name": student_name,
    "pipeline_id": pipeline_id,
    "status_id": stage_id,
    "responsible_user_id": manager_id,
    "_embedded": {
        "contacts": [{
            "first_name": parent_name,
            "custom_fields_values": [{
                "field_id": phone_field_id,
                "values": [{"value": phone_number, "enum_code": "WORK"}]
            }]
        }]
    }
}]

# Якщо контакт вже існує — додати його ID замість нових даних
if duplicate_contact_id:
    lead_body[0]["_embedded"]["contacts"] = [{"id": duplicate_contact_id}]

response = requests.post(base_lead_url, json=lead_body,
                         headers={"Authorization": f"Bearer {api_key}"})
```

**UTM-параметри (поля типу `tracking_data`):**
```python
def parse_utm(url):
    from urllib.parse import urlparse, parse_qs
    params = parse_qs(urlparse(url).query)
    return {k: v[0] for k, v in params.items() if k.startswith("utm_")}

# Знайти поля типу tracking_data та додати UTM до тіла запиту
for field in lead_custom_fields:
    if field["type"] == "tracking_data":
        utm_value = utm_data.get(field["code"].lower(), "")
        if utm_value:
            lead_custom_fields_body.append({
                "field_id": field["id"],
                "values": [{"value": utm_value}]
            })
```

---

### Типові помилки та підводні камені

1. **`interface_version` ≠ 2** → віджет не завантажиться.
2. **Відсутній будь-який з 5 PNG-логотипів** → системна помилка при встановленні.
3. **Файли не на кореневому рівні архіву** → упакуй файли безпосередньо у корінь zip, не у вкладену папку.
4. **Неунікальні CSS-класи** → конфлікт стилів з іншими víджетами або системою Kommo.
5. **Хардкодні `pipeline_id` / `status_id` / `custom_field_id`** → IDs не є універсальними; завжди отримувати динамічно через API.
6. **Rate limit API: 7 запитів/сек** → HTTP 429. Повторні порушення → IP-блокування (HTTP 403).
7. **`installation: true` vs `false`**: якщо налаштування через зовнішній API — встановлювати `false`.
8. **`init_once: false`** для víджетів без спільного контексту між сторінками.

---

## 10. CODE EXAMPLES — cURL / Python / Node.js

> Неофіційні навчальні приклади на основі офіційних endpoint-ів. Точні схеми запитів/відповідей звіряйте з `developers.kommo.com`.

### GET /api/v4/contacts — Список контактів

```bash
# cURL
curl -X GET \
  "https://SUBDOMAIN.kommo.com/api/v4/contacts?limit=50&order[updated_at]=desc" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

```python
# Python
import requests

resp = requests.get(
    "https://SUBDOMAIN.kommo.com/api/v4/contacts",
    headers={"Authorization": "Bearer YOUR_ACCESS_TOKEN", "Accept": "application/json"},
    params={"limit": 50, "order[updated_at]": "desc"},
)
resp.raise_for_status()
for contact in resp.json().get("_embedded", {}).get("contacts", []):
    print(contact.get("id"), contact.get("name"))
```

```js
// Node.js
import fetch from "node-fetch";

const res = await fetch(
  "https://SUBDOMAIN.kommo.com/api/v4/contacts?limit=50&order[updated_at]=desc",
  { headers: { "Authorization": "Bearer YOUR_ACCESS_TOKEN", "Accept": "application/json" } }
);
const data = await res.json();
data._embedded?.contacts?.forEach((c) => console.log(c.id, c.name));
```

### POST /api/v4/contacts — Створення контакту

```bash
# cURL
curl -X POST \
  "https://SUBDOMAIN.kommo.com/api/v4/contacts" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '[{"name": "Jane Doe", "custom_fields_values": [{"field_id": 123456, "values": [{"value": "+1 999 555 1234"}]}]}]'
```

```python
# Python
import requests

resp = requests.post(
    "https://SUBDOMAIN.kommo.com/api/v4/contacts",
    headers={"Authorization": "Bearer YOUR_ACCESS_TOKEN", "Content-Type": "application/json"},
    json=[{"name": "Jane Doe", "custom_fields_values": [{"field_id": 123456, "values": [{"value": "+1 999 555 1234"}]}]}],
)
resp.raise_for_status()
print("Created", [c.get("id") for c in resp.json().get("_embedded", {}).get("contacts", [])])
```

```js
// Node.js
import fetch from "node-fetch";

const res = await fetch("https://SUBDOMAIN.kommo.com/api/v4/contacts", {
  method: "POST",
  headers: { "Authorization": "Bearer YOUR_ACCESS_TOKEN", "Content-Type": "application/json" },
  body: JSON.stringify([{ name: "Jane Doe", custom_fields_values: [{ field_id: 123456, values: [{ value: "+1 999 555 1234" }] }] }]),
});
const data = await res.json();
console.log("Created", data._embedded?.contacts?.map((c) => c.id));
```

### GET /api/v4/leads — Список лідів

```bash
# cURL
curl -X GET \
  "https://SUBDOMAIN.kommo.com/api/v4/leads?limit=50&order[created_at]=desc" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

```python
# Python
import requests

resp = requests.get(
    "https://SUBDOMAIN.kommo.com/api/v4/leads",
    headers={"Authorization": "Bearer YOUR_ACCESS_TOKEN"},
    params={"limit": 50, "order[created_at]": "desc"},
)
resp.raise_for_status()
for lead in resp.json().get("_embedded", {}).get("leads", []):
    print(lead.get("id"), lead.get("name"), lead.get("price"))
```

```js
// Node.js
import fetch from "node-fetch";

const res = await fetch(
  "https://SUBDOMAIN.kommo.com/api/v4/leads?limit=50&order[created_at]=desc",
  { headers: { "Authorization": "Bearer YOUR_ACCESS_TOKEN" } }
);
const data = await res.json();
data._embedded?.leads?.forEach((l) => console.log(l.id, l.name, l.price));
```

### PATCH /api/v4/leads — Масове оновлення лідів

```bash
# cURL
curl -X PATCH \
  "https://SUBDOMAIN.kommo.com/api/v4/leads" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '[{"id": 12345678, "price": 5000, "custom_fields_values": [{"field_id": 987654, "values": [{"value": "VIP"}]}]}]'
```

```python
# Python
import requests

resp = requests.patch(
    "https://SUBDOMAIN.kommo.com/api/v4/leads",
    headers={"Authorization": "Bearer YOUR_ACCESS_TOKEN", "Content-Type": "application/json"},
    json=[{"id": 12345678, "price": 5000, "custom_fields_values": [{"field_id": 987654, "values": [{"value": "VIP"}]}]}],
)
resp.raise_for_status()
print(resp.json())
```

### GET + POST /api/v4/webhooks — Керування вебхуками

```bash
# GET — список вебхуків
curl -X GET "https://SUBDOMAIN.kommo.com/api/v4/webhooks" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# POST — створення вебхука
curl -X POST "https://SUBDOMAIN.kommo.com/api/v4/webhooks" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"destination": "https://example.com/kommo-webhook", "settings": ["add_lead"]}'
```

```python
# Python — отримання списку
import requests

headers = {"Authorization": "Bearer YOUR_ACCESS_TOKEN"}
resp = requests.get("https://SUBDOMAIN.kommo.com/api/v4/webhooks", headers=headers)
resp.raise_for_status()
for wh in resp.json().get("_embedded", {}).get("webhooks", []):
    print(wh.get("id"), wh.get("destination"), wh.get("settings"))

# Python — створення вебхука
resp = requests.post(
    "https://SUBDOMAIN.kommo.com/api/v4/webhooks",
    headers={**headers, "Content-Type": "application/json"},
    json={"destination": "https://example.com/kommo-webhook", "settings": ["add_lead"]},
)
resp.raise_for_status()
print(resp.json())
```

### X-Signature — Верифікація підпису Chats API Webhook (Node.js)

Chats API вебхуки містять заголовок `X-Signature` (HMAC-SHA1 з channel secret).

```js
import crypto from "crypto";
import express from "express";

const app = express();
app.use(express.text({ type: "*/*" })); // зчитуємо "сирий" body

const CHANNEL_SECRET = process.env.KOMMO_CHANNEL_SECRET;

app.post("/kommo-chat-webhook", (req, res) => {
  const signature = req.headers["x-signature"];
  const expected = crypto
    .createHmac("sha1", CHANNEL_SECRET)
    .update(req.body, "utf8")
    .digest("hex");

  if (signature !== expected) {
    return res.status(401).send("Invalid signature");
  }

  console.log("Valid webhook", req.body);
  res.sendStatus(200);
});

app.listen(3000);
```
