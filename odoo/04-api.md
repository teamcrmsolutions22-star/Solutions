# Odoo — API технічні деталі

## БЛОК 4: API — ТЕХНІЧНІ ДЕТАЛІ

### 4.1 Стан API в 2026 році

| Протокол | Endpoint | Версія | Статус |
|---|---|---|---|
| XML-RPC auth | `/xmlrpc/2/common` | v16–v19 | ⚠️ Legacy; видалення в Odoo 20 (осінь 2026) |
| XML-RPC objects | `/xmlrpc/2/object` | v16–v19 | ⚠️ Legacy |
| JSON-RPC | `/jsonrpc` або `/web/dataset/call_kw` | v16–v19 | ⚠️ Legacy; видалення в Odoo 20 |
| **JSON-2** | **`/json/2/...`** | **v19+** | ✅ Актуальний; заміна RPC |

> **Правило для нових проектів (2026):** Якщо проект на v19 — проектувати під JSON-2. Якщо на v16–v18 — вважати RPC legacy-шаром, всі існуючі XML-RPC/JSON-RPC інтеграції позначити як кандидати на рефакторинг до виходу Odoo 20.

**"REST API на `/api/`"** для v16–v18 — офіційно НЕ підтверджений як universal layer для всіх моделей. Коли інтегратори кажуть "є REST" — це або кастомні HTTP-контролери, або партнерські обгортки.

### 4.2 Автентифікація

**XML-RPC (v16–v19):**
1. `common.authenticate(db, username, api_key, {})` → отримати `uid`
2. Використовувати `uid` + `api_key` у наступних викликах

API-ключ: Settings ‣ Users ‣ Preferences ‣ API Keys. Діє безстроково до відкликання.
Рівень прав = права користувача, під яким авторизований.
External API доступний **тільки на тарифі Custom**.

**JSON-2 (v19+):**
HTTP-заголовок: `Authorization: bearer <API_KEY>`
Модель і метод — у URL.

**Multi-company контекст:** `{'allowed_company_ids': [company_id]}`

### 4.3 CRUD через execute_kw (XML-RPC / JSON-RPC)

```python
import xmlrpc.client

url = "https://your-db.odoo.com"
db = "prod-db"
username = "api@company.com"
api_key = "your_api_key"

common = xmlrpc.client.ServerProxy(f"{url}/xmlrpc/2/common")
uid = common.authenticate(db, username, api_key, {})
models = xmlrpc.client.ServerProxy(f"{url}/xmlrpc/2/object")

# Search
ids = models.execute_kw(db, uid, api_key, 'res.partner', 'search',
    [[('is_company', '=', True), ('city', '=', 'Kyiv')]])

# Read
data = models.execute_kw(db, uid, api_key, 'res.partner', 'read',
    [ids], {'fields': ['name', 'email', 'phone']})

# Search_read (одним запитом)
invoices = models.execute_kw(db, uid, api_key, 'account.move', 'search_read',
    [[('move_type', '=', 'out_invoice'), ('invoice_date', '>=', '2026-05-01')]],
    {'fields': ['name', 'amount_total', 'state'], 'limit': 100})

# Create
lead_id = models.execute_kw(db, uid, api_key, 'crm.lead', 'create',
    [{'name': 'New Lead', 'partner_id': 42}])

# Write
models.execute_kw(db, uid, api_key, 'crm.lead', 'write',
    [[lead_id]], {'description': 'Updated'})

# Unlink
models.execute_kw(db, uid, api_key, 'crm.lead', 'unlink', [[lead_id]])
```

**Пагінація:** параметри `limit` (кількість) + `offset` (зсув).
**Сортування:** `'order': 'field_name desc, id asc'`
**Дати у API:** ISO 8601 UTC (`2026-05-31T12:00:00Z`)
**Кастомні поля:** з префіксом `x_` (наприклад `x_custom_field`)

### 4.4 Командний синтаксис One2many / Many2many

| Команда | Формат | Дія |
|---|---|---|
| 0 | `(0, 0, {values})` | Створити новий запис + зв'язати |
| 1 | `(1, id, {values})` | Оновити пов'язаний запис |
| 2 | `(2, id, 0)` | Видалити запис і зв'язок |
| 3 | `(3, id, 0)` | Розірвати зв'язок (запис не видаляти) |
| 4 | `(4, id, 0)` | Додати зв'язок з існуючим записом |
| 5 | `(5, 0, 0)` | Видалити всі зв'язки |
| 6 | `(6, 0, [ids])` | Замінити список ID |

```python
# Замовлення з позиціями
order_id = models.execute_kw(db, uid, api_key, 'sale.order', 'create', [{
    'partner_id': 42,
    'order_line': [
        (0, 0, {'product_id': 101, 'product_uom_qty': 2.0, 'price_unit': 150.0}),
        (0, 0, {'product_id': 102, 'product_uom_qty': 1.0, 'price_unit': 45.0}),
    ]
}])
```

### 4.5 Domain Filters (польський запис)

```python
# Синтаксис: [('field', 'operator', value)]
# Оператори: =, !=, >, >=, <, <=, like, ilike, in, not in, child_of, parent_of
# Логіка: & (за замовчуванням), |, !

# Приклад: менеджер 5 АБО (після 01.05 ТА статус "в роботі")
domain = [
    '|',
        ('user_id', '=', 5),
        '&',
            ('create_date', '>=', '2026-05-01 00:00:00'),
            ('stage_id.name', 'ilike', 'progress')
]
```

Крапкова нотація для зв'язків: `('stage_id.name', 'ilike', 'progress')`

### 4.6 Rate Limits

Офіційно не задокументовані для on-premise. На Odoo Online — динамічні обмеження (захист від DDoS/abuse). Self-hosted — на рівні Nginx/балансувальника.

### 4.7 Обробка помилок

```json
{
  "jsonrpc": "2.0",
  "error": {
    "code": 200,
    "message": "Odoo Server Error",
    "data": {
      "name": "odoo.exceptions.AccessError",
      "exception_type": "access_error"
    }
  }
}
```

| Виняток | Причина |
|---|---|
| `AccessError` | Немає прав на модель/запис |
| `ValidationError` | Порушення constraint (невірний email, обов'язкове поле) |
| `UserError` | Бізнес-логіка заблокувала (наприклад, скасування оплаченого інвойсу) |
| `AccessDenied` | Невірний API-ключ або ім'я БД |

**Transaction rollback**: будь-яка SQL-помилка переводить транзакцію в неробочий стан → обгортати небезпечні виклики в `savepoint`.

### 4.8 HTTP Controllers

```python
from odoo import http
from odoo.http import request

class MyController(http.Controller):
    @http.route('/api/v1/data', type='json', auth='user', methods=['POST'], csrf=False)
    def endpoint(self, **post):
        # auth варіанти: 'user', 'bearer', 'public', 'none'
        return {'status': 'ok'}
```

Режим `auth='none'` — без ініціалізації сесії; вимагає ручної перевірки токенів у заголовках.

---
