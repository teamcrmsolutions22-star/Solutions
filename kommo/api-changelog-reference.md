# Kommo API — Changelog, документація, довідник

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
