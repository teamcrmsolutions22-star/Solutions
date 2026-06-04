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

