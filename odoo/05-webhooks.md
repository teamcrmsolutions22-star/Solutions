# Odoo — Вебхуки

## БЛОК 5: ВЕБХУКИ

### 5.1 Нативні вебхуки (v17+)

- **Inbound** (прийом): обидві редакції — через Automated Actions з тригером "On Webhook"
- **Outbound** (відправка): дія "Send Webhook Notification" → HTTP POST з JSON-payload (ID, модель, змінені поля)
- **Enterprise + Studio**: візуальний no-code конструктор

### 5.2 Кастомний вхідний вебхук (Python)

```python
from odoo import http
from odoo.http import request
import json

class WebhookController(http.Controller):

    @http.route('/api/v1/webhook/receive', type='json', auth='none', methods=['POST'], csrf=False)
    def receive_webhook(self, **post):
        payload = json.loads(request.httprequest.data)
        partner_name = payload.get('name')
        if partner_name:
            request.env['res.partner'].sudo().create({
                'name': partner_name,
                'email': payload.get('email')
            })
            return {'status': 'success', 'code': 200}
        return {'status': 'error', 'message': 'Missing fields', 'code': 400}
```

### 5.3 OCA модулі для вебхуків

- `base_automation_webhook` — черги вихідних вебхуків, кастомні HTTP-заголовки, логування статусів
- `queue_job` — async виконання важких задач, Retry-logic

---

## БЛОК 5б: КОНТАКТИ ODOO (з офіційного сайту)

- **Телефон**: +32 2 290 34 90
- **WhatsApp**: wa.me/85264491993
- **Демо/зустріч з експертом**: через сайт, розбиті за розміром компанії:
  - Micro Business (1–15 employees)
  - Small Business (16–50 employees)
  - Medium Business (51–200 employees)
  - Large Company (>200 employees)

---
