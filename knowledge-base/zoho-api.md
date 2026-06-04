# Zoho CRM — API, Deluge, Widgets

## API v8 Authentication (OAuth 2.0)

### Grant Types
- **Authorization Code** — стандартні веб-застосунки (server-side)
- **Self-Client** — headless/server (генерується вручну в Developer Console)
- **PKCE** — SPA / mobile (без client_secret)
- **NO Client Credentials** — Zoho не підтримує

### Token Details
- Access token: **3600 секунд**
- Refresh token: **постійний** до ручного відкликання
- ЗАВЖДИ парсити `api_domain` з відповіді токена — не хардкодити домен
- Scope: `ZohoCRM.modules.ALL,ZohoCRM.settings.ALL`

### 8 Регіональних дата-центрів
| Регіон | Auth URL | API URL |
|--------|----------|---------|
| US | accounts.zoho.com | www.zohoapis.com |
| EU | accounts.zoho.eu | www.zohoapis.eu |
| IN | accounts.zoho.in | www.zohoapis.in |
| AU | accounts.zoho.com.au | www.zohoapis.com.au |
| JP | accounts.zoho.jp | www.zohoapis.jp |
| CN | accounts.zoho.com.cn | www.zohoapis.com.cn |
| CA | accounts.zoho.ca | www.zohoapis.ca |
| SA | accounts.zoho.sa | www.zohoapis.sa |

### Python Token Manager
```python
class ZohoTokenManager:
    def get_access_token(self):
        if not self.access_token or time.time() >= (self.expires_at - 60):
            self._refresh_token_flow()
        return self.access_token
```

## Key API Endpoints (v8)
- `GET /crm/v8/{module}` — список записів
- `POST /crm/v8/{module}` — створити запис
- `PUT /crm/v8/{module}/{id}` — оновити запис
- `DELETE /crm/v8/{module}/{id}` — видалити
- `POST /crm/v8/coql` — COQL запит
- `POST /crm/v8/{module}/search` — пошук
- `GET /crm/v8/settings/fields?module=Leads` — метадані полів

## COQL
- Max полів: **500**
- Max критеріїв: **25**
- Max записів за запит: **2000**
- Max пагінація: **100,000 записів**
- Max JOINs: **5 таблиць**
- Синтаксис: `SELECT field1, field2 FROM Leads WHERE (criteria) LIMIT 200 OFFSET 0`

## Rate Limits
| План | Денні виклики |
|------|---------------|
| Free | 5,000 |
| Standard | 50,000 + 250/user (max 100K) |
| Professional | 50,000 + 500/user (max 3M) |
| Enterprise | 50,000 + 1,000/user (max 5M) |
| Ultimate | 50,000 + 2,000/user (без обмежень) |

## Bulk API
- Асинхронний CSV
- Поллінг `job_id` до статусу `COMPLETED`
- Ліміти імпорту: Standard = 5,000 рядків; Enterprise = 30,000 рядків

## Webhooks
1. **Workflow-bound** — тригериться правилом workflow
2. **Notification API (Watch)** — програмна підписка, max **1 тиждень** до поновлення

## Deluge Timeouts
| Контекст | Таймаут |
|----------|---------|
| Button / API call | 10 секунд |
| Workflow action | 30 секунд |
| Scheduled function | 15 хвилин |
| UI display (показує помилку) | 5 хв (backend продовжує до 15хв) |

## Deluge CRM Functions
```
zoho.crm.getRecordById(module, id)       // отримати запис
zoho.crm.updateRecord(module, id, map)   // оновити запис
zoho.crm.searchRecords(module, criteria) // пошук
zoho.crm.createRecord(module, map)       // створити запис
```
- Connection object обов'язковий для крос-продуктових викликів з Deluge
- Написання складних функцій: Sublime Text (C++ syntax highlighting) → вставити в Zoho

## Widget SDK
- Default Widget SDK = **API V2** — НЕ підтримує custom subform поля
- Для v7/v8 custom полів у widgets: використовувати `ZOHO.CRM.CONNECTION.invoke`

## Widget Types
- **Popup** — блокуючий модал
- **Flyout** — постійний сайдбар
- **Callout** — прикріплений до поля

## Client Script (JS API)
```javascript
ZDKPage.getInput({fields: [...]})        // pseudo-fields popup (без layout)
ZDKPage.getCurrentPageType()             // тип сторінки
ZDKPage.getFieldValue()                  // UI значення (незбережене)
ZDKPage.getServerFieldValue()            // DB значення (збережене)
ZDKPage.setSubformRows("Name", [{...}]) // встановити рядки subform
ZDKPage.getListData()                    // дані Canvas List View
ZDKWebClient.updateRecord()              // оновити запис з Canvas
```
- Commands: ліміт 30/org; keyboard shortcuts вимкнені за замовчуванням

## Extensions / Marketplace
- Max 5 custom полів на модуль
- Connection naming: PascalCase (ZohoBooks-ServiceName)
- `access_type=offline` обов'язковий для OAuth connections
- Для крос-продуктових розширень: `invokeUrl`, не product SDK
- Publish: Sigma → Sandbox → Private URL → Finance review → Marketplace

## File Size Limits
- Professional: **20 MB**
- Enterprise: **50 MB**

## AI Scoring
- Тільки **Enterprise і вище**
- 5 типів: Health, Engagement, Follow-up, Conversion, Field Attribute
