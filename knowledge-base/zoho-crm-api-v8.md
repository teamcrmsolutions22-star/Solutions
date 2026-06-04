# Zoho CRM API v8 — Technical Reference

Source: Gemini Deep Research (2026)

## Authentication (OAuth 2.0)

### Grant Types
- **Authorization Code** — standard web apps (server-side)
- **Self-Client** — headless/server apps (generate token manually in Developer Console)
- **PKCE** — SPA / mobile apps (no client_secret)
- **NO Client Credentials grant** — Zoho does not support it

### Token Details
- Access token lifetime: **3600 seconds**
- Refresh token: **permanent** until manually revoked
- ALWAYS parse `api_domain` from the token response — do not hardcode domain
- Scope format: `ZohoCRM.modules.ALL,ZohoCRM.settings.ALL`

### Regional Data Centers (8 total)
| Region | Auth URL | API URL |
|--------|----------|---------|
| US | accounts.zoho.com | www.zohoapis.com |
| EU | accounts.zoho.eu | www.zohoapis.eu |
| IN | accounts.zoho.in | www.zohoapis.in |
| AU | accounts.zoho.com.au | www.zohoapis.com.au |
| JP | accounts.zoho.jp | www.zohoapis.jp |
| CN | accounts.zoho.com.cn | www.zohoapis.com.cn |
| CA | accounts.zoho.ca | www.zohoapis.ca |
| SA | accounts.zoho.sa | www.zohoapis.sa |

### Python Token Manager Pattern
```python
class ZohoTokenManager:
    def get_access_token(self):
        if not self.access_token or time.time() >= (self.expires_at - 60):
            self._refresh_token_flow()
        return self.access_token
```

## COQL (CRM Object Query Language)
- Max fields per query: **500**
- Max criteria: **25**
- Max records per request: **2000**
- Max paginated total: **100,000 records**
- Max JOINs in FROM clause: **5 base tables**
- Syntax: `SELECT field1, field2 FROM Leads WHERE (criteria) LIMIT 200 OFFSET 0`

## Rate Limits by Plan
| Plan | Daily API Calls |
|------|----------------|
| Free | 5,000 |
| Standard | 50,000 + 250/user (max 100K) |
| Professional | 50,000 + 500/user (max 3M) |
| Enterprise | 50,000 + 1,000/user (max 5M) |
| Ultimate | 50,000 + 2,000/user (unlimited) |

## Bulk API
- Async CSV-based
- Poll `job_id` until status = `COMPLETED`
- Use for large data imports/exports (not real-time)

## Webhooks
Two types:
1. **Workflow-bound** — triggered by workflow rule action
2. **Notification API (Watch)** — programmatic subscription, max **1 week** before renewal needed

## Deluge Function Timeouts
| Context | Timeout |
|---------|---------|
| Button / API call | 10 seconds |
| Workflow action | 30 seconds |
| Scheduled function | 15 minutes |
| UI display (error shown) | 5 minutes (but backend continues to 15min) |

## Widget SDK
- Default Widget SDK uses **API V2** — does NOT support custom subform fields
- For v7/v8 custom fields in widgets: use `ZOHO.CRM.CONNECTION.invoke` instead
- Widget types: **Popup** (blocking), **Flyout** (persistent sidebar), **Callout** (field-attached)

## File Size Limits
- Professional plan: **20 MB** max file
- Enterprise plan: **50 MB** max file

## Bulk Import Limits
- Standard: **5,000 rows** per job
- Enterprise: **30,000 rows** per job

## AI Scoring
- Requires **Enterprise plan or higher**
- 5 scoring types: Health, Engagement, Follow-up, Conversion, Field Attribute

## Key API Endpoints (v8)
- `GET /crm/v8/{module}` — list records
- `POST /crm/v8/{module}` — create records
- `PUT /crm/v8/{module}/{id}` — update record
- `DELETE /crm/v8/{module}/{id}` — delete record
- `POST /crm/v8/coql` — COQL query
- `POST /crm/v8/{module}/search` — search with criteria
- `GET /crm/v8/settings/fields?module=Leads` — get field metadata
