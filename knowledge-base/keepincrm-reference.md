# KeepinCRM — Integrator Technical Reference

Source: ChatGPT Deep Research (2026)

## Authentication

- Header: `X-Auth-Token: <your_token>` (NOT OAuth / Bearer)
- 1 API key per account; only account registrant can create the key
- Requires a **paid plan** (no free-tier API access)
- Base URL: `https://api.keepincrm.com/v1/`

## Architecture Notes

- **SaaS only** — no on-premise deployment
- Leads = clients with `lead: true` flag — **no separate `/leads` endpoint**
- No documented rate limits (implement retry anyway)
- No documented pagination header standard — check Swagger
- CORS error in browser = must use **backend proxy**, not frontend JS

## Entities & Data Model

```
COUNTERPARTY (company/person)
  ├── AGREEMENT (deal/contract)
  │     ├── TASK
  │     ├── PAYMENT
  │     └── DELIVERY
  ├── CONTACT
  └── CUSTOM FIELDS (11 types)
PRODUCT
```

### Custom Field Types (11 total)
- Text, Number, Date, Dropdown, Checkbox, URL, Phone, Email — standard (free)
- **Formula, Large List, HTML** — paid plan only

## Filtering (Ransack Syntax)

| Predicate | Meaning |
|-----------|---------|
| `q[field_eq]` | equals |
| `q[field_cont]` | contains |
| `q[field_gteq]` | >= |
| `q[field_lteq]` | <= |
| `q[field_not_eq]` | not equal |
| `q[field_present]` | not blank |
| `q[field_true]` | boolean true |
| `q[field_null]` | null |

Example: `GET /v1/clients?q[lead_true]=1` — returns leads only

## Webhooks

- Body is **fully custom** — no fixed schema
- **No HMAC** — use shared secret in URL query param
- Implement **idempotency on receiver side**
- Always include in body: `event`, `object_type`, `object_id`, `sent_at`

```python
@app.post("/webhooks/keepincrm")
def keepincrm_webhook():
    if request.args.get("token") != EXPECTED_TOKEN:
        abort(401)
    payload = request.get_json()
    return {"status": "ok"}, 200
```

## Python Retry Pattern

```python
def request_with_retry(method, url, **kwargs):
    for attempt in range(1, 6):
        resp = session.request(method, url, timeout=30, **kwargs)
        if resp.status_code < 400:
            return resp
        if resp.status_code == 429:
            retry_after = resp.headers.get("Retry-After")
            sleep_for = int(retry_after) if retry_after and retry_after.isdigit() else min(2**attempt, 30)
            time.sleep(sleep_for)
            continue
        if 500 <= resp.status_code < 600 and attempt < 5:
            time.sleep(min(2**attempt, 30))
            continue
        resp.raise_for_status()
```

## Migration Order (must follow)

1. Config / directories (statuses, tags, custom fields, users)
2. Counterparties
3. Agreements
4. Tasks
5. Deliveries / Finances

## Connectors
- **29 built-in** (Telegram, Viber, email, Google Calendar, Zapier, etc.)
- **No 1C/BAS native** — via partners only

## vs Zoho CRM

| Feature | KeepinCRM | Zoho CRM |
|---------|-----------|----------|
| Auth | X-Auth-Token header | OAuth 2.0 |
| Leads | `lead:true` flag on client | Separate module |
| Webhooks | Custom body, no HMAC | Workflow or Notification API |
| On-premise | No | Yes |
| Rate limits | Not documented | Documented by plan |
| Regional DCs | 1 (UA) | 8 worldwide |
| AI | None | Zia (Enterprise+) |
| Marketplace | No | Yes |

## Common Pitfalls

1. CORS — always use backend proxy
2. Leads = `q[lead_true]=1` on `/v1/clients` (no separate endpoint)
3. Webhook body has no fixed schema — define your own
4. No HMAC — validate URL token on every request
5. Free plan = no API access
6. Only registrant can create API key
7. Formula/Large List/HTML fields = paid only
