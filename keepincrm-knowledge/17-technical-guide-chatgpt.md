# KeepinCRM — Технічний посібник для інтеграторів (ChatGPT Deep Research)

> Джерело: ChatGPT Deep Research  
> Базовий URL API: https://api.keepincrm.com/v1/

---

## БЛОК 1. АРХІТЕКТУРА ТА КЛЮЧОВІ СУТНОСТІ

KeepinCRM — хмарна CRM (SaaS) для малого і середнього бізнесу. Локального розгортання немає.

Типовий бізнес-процес: **Лід → Контрагент/Клієнт → Угода → Задачі/Документи/Фінанси**

### Ключові сутності

| Сутність | API-назва | Опис |
|----------|-----------|------|
| Лід | `leads` | Потенційний клієнт, первинний запис |
| Клієнт/Контрагент | `clients` | Фізособа чи компанія |
| Угода | `agreements` | Комерційна угода з позиціями товарів |
| Завдання | `tasks` | Може бути прив'язане до ліда, клієнта або угоди |
| Товар | `products` / `price_lists` | Елемент прайс-листа, має кількість на складі |
| Постачальник | Supplier | Окремий модуль |
| Фінанси | Wallet/Transaction | Платежі, витрати |

Налаштування API: **Налаштування → Профіль компанії → API**

---

## БЛОК 2. РОЛІ ТА ПРАВА ДОСТУПУ

- API-ключ генерує лише **адміністратор/власник акаунту** (той хто реєстрував)
- Шлях: Налаштування → Профіль компанії → API
- Лише **один активний ключ** на акаунт
- Усі API-запити виконуються від імені власника ключа з його правами
- Ролі (Адміністратор, Менеджер тощо) впливають на доступ через API аналогічно UI

---

## БЛОК 3. КАСТОМНІ ПОЛЯ

Створюються в: Налаштування → Користувацькі поля

**Формат передачі через API (ChatGPT варіант — масив об'єктів):**
```json
"custom_fields": [
  {"name": "Адреса", "value": "Україна, Київ"}
]
```
> ⚠️ Назва поля `name` повинна **точно збігатися** з назвою в CRM

Типи полів: текст, число, дата, список (dropdown), чекбокс.  
Для списків замість `value` може використовуватися `id` опції.

---

## БЛОК 4. REST API

### 4.1 Аутентифікація

```bash
curl -H "X-Auth-Token: <ВАШ_API_KEY>" https://api.keepincrm.com/v1/leads
```

```python
headers = {"X-Auth-Token": API_KEY}
response = requests.get("https://api.keepincrm.com/v1/leads", headers=headers)
```

- Bearer та OAuth2 не використовуються
- Термін дії ключа необмежений
- Один активний ключ одночасно

### 4.2 Базова структура

**Base URL:** `https://api.keepincrm.com/v1/`  
**Версія:** v1 (v2 не анонсовано)

**Формат відповіді (список):**
```json
{
  "data": [...],
  "meta": {
    "pagination": {
      "current_page": 1,
      "next_page": 2,
      "total_pages": 10,
      "total_count": 480
    }
  },
  "errors": null
}
```

**Формат помилки:**
```json
{
  "data": null,
  "errors": ["опис помилок"]
}
```

**Фільтрація (Ransack-стиль):**
```
GET /v1/agreements?q[main_responsible_id_eq]=158&q[created_at_gteq]=2023-10-01T00:00:00Z
```

**Пагінація:** `?page=2&per_page=50`  
**Сортування:** `?sort_by=created_at&order=desc`

### 4.3 CRUD по основних сутностях

#### Ліди

```bash
# Список лідів
GET /v1/leads?q[status_id_eq]=10&q[created_at_gteq]=2023-01-01T00:00:00Z&page=1&per_page=20

# Створити лід
POST /v1/leads
{
  "title": "Новий лід",
  "status_id": 5,
  "client_attributes": {"person": "Ім'я", "lead": true}
}

# Оновити
PATCH /v1/leads/123
{"status_id": 2, "comment": "Зміна статусу"}

# Видалити
DELETE /v1/leads/123  → 204 No Content
```

#### Клієнти

```bash
# Список
GET /v1/clients

# Створити
POST /v1/clients
{"person": "Ім'я Клієнта", "email": "a@b.com"}

# Пошук дублів (немає окремого endpoint — через фільтри)
GET /v1/clients?q[email_eq]=test@mail.com
```

#### Угоди

```bash
# Список
GET /v1/agreements

# Створити угоду з новим клієнтом
POST /v1/agreements
{
  "title": "Нова угода",
  "stage_id": 3,
  "client_attributes": {"person": "Ім'я", "lead": false}
}

# Оновити (переміщення по воронці — через stage_id)
PATCH /v1/agreements/123
{"stage_id": 5}
```

> `lead: false` → запис в клієнти; `lead: true` → запис в ліди

#### Завдання

```bash
POST /v1/tasks
{
  "title": "Нове завдання",
  "assign_to_id": 45,
  "deal_id": 123
}

PATCH /v1/tasks/456
{"status": 1}  # 1 = виконано
```

#### Товари та Склад

```
GET /v1/price_lists   — список товарів прайс-листа
GET /v1/inventory     — залишки
POST /v1/agreements/:id/jobs  — додати позицію в угоду
```

### 4.4 Фільтрація

| Приклад | Опис |
|---------|------|
| `q[status_id_eq]=10` | Рівність |
| `q[created_at_gteq]=2023-01-01` | Діапазон по даті |
| `q[client_person_cont]=Іван` | Пошук по підрядку |
| `q[sum_gteq]=1000` | Фільтр за сумою |

### 4.5 Rate Limits та помилки

> ⚠️ Документація не вказує точних лімітів, рекомендовано не перевищувати кількасот запитів/хвилину. Практично — до 10–20 req/sec.

| Код | Причина |
|-----|---------|
| 400 | Невірний JSON |
| 401 | Відсутній або некоректний X-Auth-Token |
| 403 | Недостатньо прав |
| 404 | Об'єкт не знайдено |
| 422 | Помилка валідації (порожні обов'язкові поля, невірний тип) |
| 429 | Перевищено rate limit (+ заголовок Retry-After) |
| 5xx | Внутрішня помилка — повторити через кілька секунд |

---

## БЛОК 5. WEBHOOK-И ТА ТРИГЕРИ

### 5.1 Налаштування вхідних вебхуків

Шлях: Налаштування → Інтеграції → Webhook → "+"

- KeepinCRM генерує URL вигляду `https://keepincrm.com/get/webhook/...`
- Цей URL вставляється у зовнішній сервіс
- Вибирається шаблон (Contact Form 7, WooCommerce тощо) або чистий webhook
- HMAC-підпис **не підтримується** — безпека через унікальний UUID в URL
- Змінні у назвах webhook-полів мають бути **латиницею**

### 5.2 Структура payload

KeepinCRM **не генерує власної** обов'язкової структури для вхідних вебхуків.  
Ви конструюєте payload самі (з зовнішньої системи) і зіставляєте поля в UI.

**Приклад від зовнішньої системи:**
```json
{"name": "Покупець", "email": "a@b.com", "order_id": "123", "items": [...]}
```

У UI KeepinCRM: `order_id` → поле "Номер угоди", `name` → поле клієнта.

Для вкладених об'єктів — шлях через крапку: `customer.address.city`  
Для масивів — індекси: `items[0].name`

### 5.3 Retry логіка

> ⚠️ Офіційно не задокументовано автоматичних повторних спроб.  
> Журнал — в Налаштування → Інтеграції → Webhook (вкладка "Історія").

---

## БЛОК 6. КОНЕКТОРИ ТА ГОТОВІ ІНТЕГРАЦІЇ

### 6.1 Повний список

| Категорія | Інтеграції |
|-----------|-----------|
| Маркетплейси | Rozetka, Prom.ua, OpenCart, WooCommerce, Хорошоп, Shop-Express |
| Месенджери | Telegram-бот, Viber-бот, E-chat (WA/Viber/TG номери), Instagram, Facebook, OLX |
| Email | Ukr.net, Yahoo, Zoho, Outlook (Microsoft 365) |
| Доставка | Нова Пошта, Justin, Укрпошта, Meest |
| Оплати | ПриватБанк, Monobank, LiqPay, WayForPay |
| Фіскалізація | Checkbox (ПРРО) |
| Телефонія | Ringostat, Binotel, Google Voice |
| ERP | 1С/BAS |
| AI | OpenAI (ChatGPT) |

### 6.2 Ключові особливості конекторів

**Rozetka:**
- Синхронізація кожні 10–15 хвилин (polling)
- Імпорт через YML-файл (унікальний ідентифікатор — Rozetka Offer ID або SKU)
- Статуси угоди ↔ статуси Rozetka (двосторонньо)

**Prom.ua:**
- Polling ~15 хв
- XLS/YML для прайс-листа
- Двостороння синхронізація статусів

**Instagram/Facebook:**
- Повідомлення та коментарі → розділ "Чати" в CRM
- Фактично одностороння (CRM отримує, але не ініціює нові чати)

**Telegram/Viber-бот:**
- Клієнт пише боту → CRM створює лід/завдання
- CRM може відписати через інтерфейс
- Тільки текст та файли

**Нова Пошта:**
- API-ключ НП в Налаштування → Інтеграції → Нова Пошта
- Автоматична генерація ТТН з картки угоди
- Автоматичний трекінг статусів

**LiqPay/WayForPay/Monobank:**
- Webhook від платіжного шлюзу → підтвердження оплати в CRM
- Автоматична транзакція в "Фінансах"

**OpenAI:**
- Введення API-ключів в Налаштування → Інтеграції → OpenAI
- Аналіз текстів угод, генерація відповідей, резюме
- Ліміти залежать від тарифів OpenAI

### 6.3 Обмеження

- **Невідповідні поля:** кастомні характеристики товарів (Prom, Rozetka) часто не мають пари в CRM
- **Конфлікт даних:** пріоритет — остання зміна (Last Write Wins)
- **Частота:** маркетплейси — polling 10–15 хв; платіжки/телефонія — Real-time webhook

---

## БЛОК 7. КОД — ГОТОВІ ПРИКЛАДИ

### cURL: Список лідів з фільтром

```bash
curl -X GET \
  'https://api.keepincrm.com/v1/leads?sort_by=created_at&order=desc&q[status_id_eq]=1&q[created_at_gteq]=2023-01-01T00:00:00Z' \
  -H 'X-Auth-Token: <YOUR_API_KEY>'
```

### cURL: Створити ліда з кастомним полем

```bash
curl -X POST 'https://api.keepincrm.com/v1/leads' \
  -H 'X-Auth-Token: <YOUR_API_KEY>' \
  -H 'Content-Type: application/json' \
  -d '{
    "title": "Заявка з форми",
    "status_id": 5,
    "main_responsible_id": 10,
    "custom_fields": [
        {"name": "Джерело", "value": "Веб-форма"}
    ]
}'
```

### Python: Пагінація угод

```python
import requests

API_KEY = "<YOUR_API_KEY>"
headers = {"X-Auth-Token": API_KEY}
page = 1

while True:
    resp = requests.get(
        f"https://api.keepincrm.com/v1/agreements?page={page}&per_page=50",
        headers=headers
    )
    data = resp.json()
    for deal in data["data"]:
        print(deal["id"], deal["title"])
    if not data["meta"]["pagination"]["next_page"]:
        break
    page += 1
```

### Python: Створити угоду + додати товар

```python
import requests

headers = {"X-Auth-Token": API_KEY, "Content-Type": "application/json"}

# Створити угоду
deal_data = {
    "title": "Нова угода від API",
    "stage_id": 2,
    "client_attributes": {"person": "Іванов Іван", "lead": False}
}
resp = requests.post("https://api.keepincrm.com/v1/agreements", json=deal_data, headers=headers)
deal_id = resp.json()["data"]["id"]

# Додати товар в угоду
item = {"price": 100, "amount": 2, "name": "Товар A"}
requests.post(f"https://api.keepincrm.com/v1/agreements/{deal_id}/jobs", json=item, headers=headers)
```

### Python (Flask): Прийняти вебхук

```python
from flask import Flask, request, jsonify
import hmac, hashlib

app = Flask(__name__)
SECRET = b"your_webhook_secret"

@app.route("/webhook", methods=["POST"])
def webhook():
    data = request.get_json()
    # Перевірка HMAC (якщо реалізовано на вашому боці)
    signature = request.headers.get('X-Signature', '')
    expected = hmac.new(SECRET, request.data, hashlib.sha256).hexdigest()
    if not hmac.compare_digest(signature, expected):
        return "Invalid signature", 400
    
    event_type = data.get("event")
    if event_type == "deal_created":
        deal_id = data["object_id"]
    return jsonify(success=True)

if __name__ == "__main__":
    app.run(port=5000)
```

### Node.js: Список клієнтів + створення завдання

```javascript
const fetch = require('node-fetch');
const API_KEY = "<YOUR_API_KEY>";
const headers = {'X-Auth-Token': API_KEY, 'Content-Type': 'application/json'};

// Список клієнтів
fetch('https://api.keepincrm.com/v1/clients?page=1&per_page=20', { headers })
  .then(res => res.json())
  .then(data => console.log("Clients:", data.data.map(c => c.person)));

// Створити завдання
fetch('https://api.keepincrm.com/v1/tasks', {
  method: 'POST',
  headers,
  body: JSON.stringify({
    title: "Перевірити API інтеграцію",
    assign_to_id: 12,
    deal_id: 345
  })
}).then(res => res.json()).then(task => console.log("New Task ID:", task.data.id));
```

---

## БЛОК 8. ТОП-10 ПОМИЛОК ІНТЕГРАТОРІВ

| # | Симптом | Причина | Рішення |
|---|---------|---------|---------|
| 1 | 404 | Неправильний endpoint (v2 замість v1) | URL: `https://api.keepincrm.com/v1/` |
| 2 | 401 | Відсутній або некоректний X-Auth-Token | Заголовок без `Bearer` |
| 3 | 400/422 | Невалідний JSON або відсутній Content-Type | Валідатор JSON + заголовок |
| 4 | 422 | Відсутні обов'язкові поля | title + stage_id для угод |
| 5 | Фільтр ігнорується | Невірний формат дати | ISO-8601 з Z: `2023-01-01T00:00:00Z` |
| 6 | Webhook не обробляє змінні | Кирилиця у назвах змінних | Тільки латиниця у назвах |
| 7 | Дублі при міграції | Не перевіряється унікальність | GET перед POST по email/телефону |
| 8 | 429 | Занадто багато запитів | Паузи між запитами (10–20 req/sec) |
| 9 | Endpoint не знайдено | Відсутня публічна Swagger-документація | Використовувати офіційні гайди |
| 10 | Некоректні поля | Не UTF-8 або спецсимволи | Забезпечити UTF-8, екранування |

---

## БЛОК 9. ІМПОРТ / ЕКСПОРТ

### Вбудований XLSX-імпорт

Підтримувані: Ліди, Контрагенти, Угоди, Прайс-лист, Склад, Завдання.

- Шаблон скачується в UI кожного розділу (кнопка "Імпорт/Експорт")
- Обов'язкові колонки вже відмічені в шаблоні
- Кастомні поля — колонки з точними назвами з CRM
- Дати: `DD.MM.YYYY` або `YYYY-MM-DD` (уточнюється в шаблоні)
- **Обмеження:** до 5000–10 000 рядків, більше — розбивати на частини

### Порядок міграції через API

```
1. Клієнти/Контрагенти   (отримати client_id)
          ↓
2. Угоди                 (прив'язка до client_id)
          ↓
3. Завдання              (прив'язка через deal_id / client_id)
```

**Де-дуплікація:** GET з фільтром перед POST, при знаходженні — PATCH.  
**Тротлінг:** 0.2–0.5 сек між запитами, пакети по 50–100.

---

## БЛОК 10. НАЛАГОДЖЕННЯ

### Інструменти в UI

- Логів API-запитів в UI немає → покладатись на зовнішні логи
- Журнал webhook: Налаштування → Інтеграції → Webhook → "Історія"
- Логи конекторів (Rozetka, Prom): в параметрах кожного конектора

### Інструменти розробника

- **ngrok / Localtunnel** — тунель для локального тестування вебхуків
- **webhook.site** — онлайн-перехоплення для перевірки payload
- **JSONPath-інструмент** — https://www.site24x7.com/tools/jsonpath-finder-validator.html
- **Postman** — офіційної колекції немає, створювати вручну
- Офіційного Postman collection від KeepinCRM **немає**

---

*Джерело: ChatGPT Deep Research, технічний посібник KeepinCRM, 2025–2026*
