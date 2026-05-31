# KeepinCRM — Технічний посібник для інтеграторів

> Джерело: Gemini Deep Research — технічний архітектурний довідник (актуально 2025–2026)  
> Swagger API: https://app.swaggerhub.com/apis-docs/KeepInCRM/keepincrm-api/  
> Базовий URL API: https://api.keepincrm.com/v1/

---

## БЛОК 1. АРХІТЕКТУРА ТА КЛЮЧОВІ СУТНОСТІ

### 1.1 Загальна архітектура

KeepinCRM — виключно хмарне SaaS-рішення. Локальне встановлення (On-Premise) та Private Cloud архітектурно **не передбачені**.

Система обслуговує **понад 900 мільйонів запитів на місяць**.

```
+-----------------------------------------------------------------------------------+
|                                     KeepinCRM SaaS                                |
+-----------------------------------------------------------------------------------+
|  [Ліди] (lead: true)                                                              |
|     │                                                                             |
|     ▼                                                                             |
|  [Клієнти] (lead: false)                                                          |
|     │                                                                             |
|     ├──────────────────────┬──────────────────────┐                               |
|     ▼                      ▼                      ▼                               |
|  [Угоди]            [Завдання]            [Чати / Документи]                      |
|     │ (jobs_attributes)    │ (parent_id)           │                              |
|     ├──────────────────────┼──────────────────────┤                               |
|     ▼                      ▼                      ▼                               |
|  [Склад / Прайс-лист]  [Фінанси]         [Зовнішні інтеграції]                    |
+-----------------------------------------------------------------------------------+
```

### 1.2 Таблиця ключових сутностей

| Сутність | Основні поля | Зв'язки |
|----------|-------------|---------|
| Лід / Клієнт (Counterparty) | id, person, company, phones[], emails[], lead (Boolean) | 1:N з Угодами та Завданнями |
| Угода (Agreement) | id, title, total, paid, stage_id, source_id | Належить client_id. Містить jobs_attributes (товари) |
| Завдання (Task) | id, title, finished, parent_type, parent_id | Поліморфний зв'язок: Agreement або Client |
| Товар (Material) | id, sku, title, cost, price, available | Зв'язок з category_id та модифікаціями через parent_id |
| Фінанси (Transaction) | id, amount, kind, purse_id, category_id | Поліморфний зв'язок parent (Угода або Клієнт) |

**Важливо:** Ліди та Клієнти зберігаються в **одній таблиці БД**, розділені прапорцем `lead` (Boolean).

### 1.3 Де знаходяться налаштування інтеграцій

| Функція | Шлях в інтерфейсі |
|---------|-------------------|
| API-ключ та лог запитів | Налаштування → Профіль компанії → API |
| Вхідні Webhooks | Налаштування → Інтеграції → Webhook |
| Вихідні Webhooks (Тригери) | Налаштування → Управління → Тригери |

---

## БЛОК 2. REST API

### 2.1 Аутентифікація

Авторизація — статичний API-ключ у HTTP-заголовку. JWT/OAuth2 **не підтримуються**.

```http
X-Auth-Token: <ваш_діючий_API_ключ>
Accept: application/json
Content-Type: application/json
```

**Правила API-ключа:**
- Лише **один активний ключ** на акаунт одночасно
- Термін дії — **необмежений**
- Генерація дозволена **тільки Власнику компанії** (Company Creator — той хто реєстрував акаунт)
- При повторній генерації попередній ключ **моментально деактивується** → всі інтеграції отримають 401

**Генерація ключа:** Налаштування → Профіль компанії → API → кнопка генерації  
⚠️ Ключ відображається повністю **лише один раз** — скопіювати одразу!

### Приклади авторизації

**cURL:**
```bash
curl -X GET "https://api.keepincrm.com/v1/agreements" \
  -H "X-Auth-Token: de768912cf34ab890123de7f" \
  -H "Accept: application/json"
```

**Python:**
```python
import requests

headers = {
    "X-Auth-Token": "de768912cf34ab890123de7f",
    "Accept": "application/json",
    "Content-Type": "application/json"
}
response = requests.get("https://api.keepincrm.com/v1/agreements", headers=headers)
```

**JavaScript (Fetch):**
```javascript
fetch('https://api.keepincrm.com/v1/agreements', {
  method: 'GET',
  headers: {
    'X-Auth-Token': 'de768912cf34ab890123de7f',
    'Accept': 'application/json'
  }
}).then(r => r.json()).then(console.log);
```

### 2.2 Формат відповідей

**Успішний запит (список з пагінацією):**
```json
{
  "data": [
    {"id": 1405, "title": "Угода #1405", "total": 3500.0}
  ],
  "meta": {
    "current_page": 1,
    "next_page": 2,
    "prev_page": null,
    "total_pages": 12,
    "total_count": 580
  }
}
```

**Помилка валідації (HTTP 422):**
```json
{
  "errors": {
    "person": ["не може бути порожнім"],
    "phones": ["має неправильний формат"]
  }
}
```

### 2.3 CRUD по основних сутностях

#### Ліди

```
GET  /v1/clients?q[lead_true]=true   — список лідів
POST /v1/clients                      — створення ліда
PATCH /v1/clients/:id                 — оновлення (в т.ч. конвертація в клієнта: lead: false)
```

**Мінімальний POST для ліда:**
```json
{
  "person": "Іван Іванов",
  "lead": true,
  "phones": ["+380991112233"]
}
```

#### Клієнти

```
GET  /v1/clients?q[lead_false]=true  — список клієнтів
POST /v1/clients                      — створення (lead: false або не вказувати)
PATCH /v1/clients/:id                 — оновлення
```

**Пошук дублів перед створенням:**
```
GET /v1/clients?q[phones_i_cont]=+380991112233
GET /v1/clients?q[emails_eq]=test@mail.com
```

#### Угоди

```
GET    /v1/agreements          — список угод
POST   /v1/agreements          — створення
PATCH  /v1/agreements/:id      — оновлення (в т.ч. зміна stage_id для руху по воронці)
DELETE /v1/agreements/:id      — видалення
```

**Створення угоди з товаром:**
```json
{
  "title": "Угода на постачання",
  "client_id": 9901,
  "stage_id": 14,
  "source_id": 3,
  "jobs_attributes": [
    {
      "title": "Товар А",
      "price": 450.0,
      "amount": 2,
      "product_id": 105
    }
  ]
}
```

> **Переміщення по воронці:** `PATCH /v1/agreements/:id` з полем `"stage_id": <id_нового_етапу>`

#### Завдання

```
GET   /v1/tasks          — список завдань
POST  /v1/tasks          — створення
PATCH /v1/tasks/:id      — оновлення (завершення: "finished": true)
```

**Прив'язка через поліморфний зв'язок:**
```json
{
  "title": "Передзвонити щодо ТТН",
  "parent_type": "Agreement",
  "parent_id": 1502,
  "finished": false
}
```
`parent_type` може бути: `"Agreement"` або `"Client"`

#### Товари та склад

```
GET /v1/products   — прайс-лист та залишки
```

При **об'єднаному складі** замість одного поля `available` — динамічні поля по філіях: `Kyiv_available`, `Lviv_available` тощо.

> ⚠️ Додавання товару якого немає в наявності — **заблоковано в інтерфейсі, але дозволено через API**

### 2.4 Кастомні поля

Ідентифікатори кастомних полів мають префікс + числовий індекс: `iedrpo_123`, `utm_source_217517`.

**Передача через API:**
```json
{
  "custom_fields": {
    "iedrpo_123": "01234567",
    "client_address_456": "м. Київ, вул. Хрещатик, 1"
  }
}
```

**Типи полів і особливості:**

| Тип | Формат передачі |
|-----|----------------|
| Текст (String) | Будь-який рядок |
| Число (Decimal) | Строго числовий тип: `45.2`, `100` — текст → 422 |
| Список (Array) | Масив рядків при мультивиборі |
| Дата (Date) | ISO 8601: `2026-05-31T12:00:00.000Z` |
| HTML | Рядок з валідною HTML-версткою |
| Довідник | Вибір з попередньо завантаженого масиву (з пошуком) |

**Фільтрація по кастомних полях:**
```
q[custom_fields_jcont][код_поля]=значення
```

### 2.5 Фільтрація, пагінація, сортування

**Формат Ransack-фільтрів:** `q[назва_поля_оператор]=значення`

| Оператор | Опис | Приклад |
|----------|------|---------|
| `_eq` | Точна рівність | `q[status_id_eq]=5` |
| `_not_eq` | Не дорівнює | `q[main_responsible_id_not_eq]=11` |
| `_lt` / `_lteq` | Менше / менше або рівно | `q[total_lteq]=1500.0` |
| `_gt` / `_gteq` | Більше / більше або рівно | `q[created_at_gteq]=2026-05-01` |
| `_blank` | Порожній рядок | `q[phones_blank]=true` |
| `_null` / `_not_null` | null / не null | `q[result_null]=true` |
| `_start` / `_end` | Починається з / закінчується на | `q[sku_start]=SP-` |
| `_cont` / `_i_cont` | Містить (case-sensitive / insensitive) | `q[person_i_cont]=петро` |

**Пагінація:**
```
?page=1&per_page=50   (max per_page = 100)
```

**Сортування:**
```
?order=created_at+desc
?order=total+asc
```

### 2.6 Rate Limits та коди помилок

**Ліміт: 5 запитів на секунду** з одного акаунту.

При перевищенні → `429 Too Many Requests` + заголовок `Retry-After: <секунди>`

| HTTP код | Причина |
|----------|---------|
| 400 | Невірний формат JSON або структура об'єкта |
| 401 | Недійсний токен X-Auth-Token (або ключ не від власника) |
| 403 | Заблоковано тарифом (безкоштовний/базовий) або права доступу |
| 404 | Ресурс не існує або видалений |
| 422 | Помилка валідації полів (порожні обов'язкові, невірний тип) |
| 429 | Перевищено rate limit |
| 500 | Критична помилка серверів KeepinCRM |

**Обмеження прав в API:**
- `Hide prices` — блокує фінансові поля у GET-відповідях
- `Edit only own deals` — 403 при PATCH чужої угоди
- `Full delete block` — 403 при DELETE

---

## БЛОК 3. WEBHOOK-И ТА ТРИГЕРИ

### 3.1 Вхідні Webhooks

Налаштування: Налаштування → Інтеграції → Webhook

**Правила мапінгу:**

1. **Обов'язково:** поле `person` (ПІБ) або `company` (назва компанії) — без них вебхук **ігнорується**
2. **Статичний текст:** огортається в косі дужки: `/Новий лід з лендингу/`
3. **Конкатенація полів:** `{{first_name}} {{last_name}}`
4. **Вкладені об'єкти:** крапка — `customer.address.city`
5. **Масиви:** квадратні дужки — `items.product_name`
6. **Безпека:** HMAC-SHA256 не використовується. Безпека — унікальний UUID у структурі URL вебхука.

### 3.2 Вихідні Webhooks (Тригери)

Payload формується через **шаблонізатор Mustache** на боці CRM.

**Приклад payload — нова оплата:**
```json
{
  "event": "finance.created",
  "transaction_id": "88412",
  "amount": 1500.0,
  "currency": "UAH",
  "purse": "Основна каса",
  "deal_info": {
    "deal_id": "1502",
    "deal_title": "Угода на постачання"
  }
}
```

**Приклад payload — зміна етапу з масивом товарів:**
```json
{
  "event": "agreement.stage_changed",
  "deal_id": "1502",
  "new_stage": "Відправлено",
  "client": {
    "name": "Іван Іванов",
    "phone": "+380991112233"
  },
  "items": [{"title": "Товар А", "amount": 2}]
}
```

**Mustache-синтаксис для масиву товарів:**
```
{{#jobs}}...{{^_last}},{{/_last}}{{/jobs}}
```

### 3.3 Відмінність вхідного Webhook від Тригера

| | Вхідний Webhook | Вихідний Webhook (Тригер) |
|--|---|---|
| Напрямок | Зовнішня система → CRM | CRM → Зовнішня система |
| Логіка | Жорсткий мапінг полів | Складні умови (AND/OR) + кастомний payload |
| Використання | Імпорт лідів з форм, кошиків | Повідомлення при подіях, передача в SMS/GA4/etc |

### 3.4 Retry-логіка та журнал

- **Повторні спроби:** 3 рази з інтервалом 15 хвилин при відповіді 5xx від сервера-приймача
- **Журнал:** немає глобального екрану — статус записується в **лог активності конкретної картки** (угоди/клієнта)

---

## БЛОК 4. КОНЕКТОРИ ТА ГОТОВІ ІНТЕГРАЦІЇ

### 4.1 Таблиця всіх конекторів

| Інтеграція | Категорія | Напрямок | Що синхронізується |
|-----------|-----------|----------|-------------------|
| Rozetka | Маркетплейс | Двосторонній | Замовлення, статуси, залишки (YML-фід) |
| Prom.ua | Маркетплейс | Двосторонній | Замовлення, статуси, прайс-лист (XLSX) |
| OpenCart | CMS | Двосторонній | Замовлення, клієнти, залишки |
| WooCommerce | CMS | Один (→CRM) | Угоди та контрагенти з кошика |
| Хорошоп | CMS | Двосторонній | Замовлення, залишки |
| Shop-Express | CMS | Двосторонній | Каталог товарів, угоди, статуси |
| Telegram / Viber (бот) | Месенджери | Двосторонній | Текстові чати |
| Instagram / Facebook | Соцмережі | Двосторонній | Direct, Messenger, коментарі, Lead Forms |
| OLX | Класифайд | Двосторонній | Повідомлення покупців, автостворення лідів |
| E-chat | Агрегатор | Двосторонній | WhatsApp, Viber, Telegram (особисті номери) |
| Нова Пошта | Доставка | Двосторонній | ТТН, вартість, трекінг статусів |
| Укрпошта / Meest / Justin | Доставка | Двосторонній | ТТН, маркування |
| Monobank / LiqPay | Платежі | Один (→CRM) | Виписки, генерація інвойсів |
| WayForPay | Платежі | Один (→CRM) | Підтвердження оплат |
| ПриватБанк | Платежі | Один (→CRM) | Банківська виписка |
| Checkbox (ПРРО) | Фіскалізація | Один (з CRM) | Автоматичні фіскальні чеки |
| Binotel / Ringostat | Телефонія | Двосторонній | Спливаюча картка, автоліди, записи |
| 1С / BAS | ERP | Двосторонній | Номенклатура, замовлення, контрагенти |
| OpenAI API | AI | Двосторонній | Транскрибація дзвінків, оцінка діалогів |
| Zakupivli.Pro | Тендери | Двосторонній | Тендерні процеси |

### 4.2 Особливості ключових конекторів

**Rozetka:**
- Polling кожні 5 хвилин
- Синхронізація залишків через YML-фід з тегом Артикул (sku)

**LiqPay / Monobank (Plata by mono):**
- Відстеження оплати в реальному часі
- Автоматична транзакція в «Фінансах»
- Допустима розбіжність еквайрингової комісії — до 5%

**Checkbox:**
- Тригер фіскалізації блокується якщо касу не відкрито

**OpenAI:**
- Підключення через токен platform.openai.com
- Транскрибація з розподілом реплік менеджер/клієнт
- Оцінка тональності + аналіз скрипта + резюме в нотатки

**Месенджери (чат-боти):**
- Підключення через токен бота в Налаштування → Чати
- Можна вимкнути системне повідомлення «прийнято оператором»

**OLX:**
- Авторизація через OAuth OLX
- Один клік → угода з повідомлення

### 4.3 Обмеження конекторів

| Проблема | Рішення |
|---------|---------|
| Кастомні атрибути товарів не синхронізуються з маркетплейсами | Передача через кастомні текстові поля або XLSX-шаблони |
| Конфлікт при одночасному редагуванні в CRM та CMS | Пріоритет має той, хто останній надіслав PATCH. Рекомендується: CRM — власник залишків, CMS — власник нових замовлень |
| Частота синхронізації маркетплейсів | Polling 5–15 хвилин. Чати/телефонія/еквайринг — Real-time через Webhooks |

---

## БЛОК 5. КОД — ГОТОВІ ПРИКЛАДИ

### cURL: Список лідів з фільтром

```bash
curl -X GET "https://api.keepincrm.com/v1/clients?q[lead_true]=true&q[status_id_eq]=2&q[created_at_gteq]=2026-05-01T00:00:00.000Z" \
  -H "X-Auth-Token: secure_api_token_here" \
  -H "Accept: application/json"
```

### cURL: Створити ліда з кастомним полем

```bash
curl -X POST "https://api.keepincrm.com/v1/clients" \
  -H "X-Auth-Token: secure_api_token_here" \
  -H "Content-Type: application/json" \
  -d '{
    "person": "Олексій Інтегратор",
    "lead": true,
    "phones": ["+380670001122"],
    "custom_fields": {
      "iedrpo_123": "44332211"
    }
  }'
```

### Python: Отримати всі угоди з пагінацією (з обробкою 429)

```python
import requests
import time

API_TOKEN = "secure_api_token_here"
HEADERS = {
    "X-Auth-Token": API_TOKEN,
    "Accept": "application/json",
    "Content-Type": "application/json"
}

def fetch_all_agreements():
    page = 1
    all_agreements = []
    
    while True:
        url = f"https://api.keepincrm.com/v1/agreements?page={page}&per_page=50"
        response = requests.get(url, headers=HEADERS)
        
        if response.status_code == 429:
            retry_after = int(response.headers.get("Retry-After", 5))
            time.sleep(retry_after)
            continue
            
        if response.status_code != 200:
            raise Exception(f"Помилка API: {response.status_code} - {response.text}")
            
        payload = response.json()
        all_agreements.extend(payload.get("data", []))
        
        meta = payload.get("meta", {})
        if page >= meta.get("total_pages", 1):
            break
            
        page += 1
        time.sleep(0.2)  # Тротлінг: 5 запитів/сек
        
    return all_agreements
```

### Python: Створити угоду з товаром

```python
import requests

url = "https://api.keepincrm.com/v1/agreements"
headers = {
    "X-Auth-Token": "secure_api_token_here",
    "Accept": "application/json",
    "Content-Type": "application/json"
}

payload = {
    "title": "Угода з Python API",
    "client_id": 9901,
    "stage_id": 14,
    "jobs_attributes": [
        {
            "title": "Кастомна послуга",
            "price": 12500.0,
            "amount": 1,
            "product_id": 204
        }
    ]
}

response = requests.post(url, headers=headers, json=payload)
print(response.json())
```

### Python (Flask): Прийняти вихідний вебхук від KeepinCRM

```python
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/crm-webhook', methods=['POST'])
def crm_webhook_receiver():
    data = request.json
    if not data:
        return jsonify({"error": "Empty body"}), 400
        
    event_type = data.get("event")
    object_id = data.get("id")
    
    if event_type == "agreement.stage_changed":
        print(f"Угода {object_id} змінила етап на {data.get('stage_name')}")
        
    return jsonify({"status": "received"}), 200

if __name__ == '__main__':
    app.run(port=5000)
```

### Node.js: Список клієнтів + створення завдання

```javascript
const axios = require('axios');

const config = {
  headers: {
    'X-Auth-Token': 'secure_api_token_here',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};

async function syncClientsAndAssignTask() {
  const res = await axios.get('https://api.keepincrm.com/v1/clients?q[lead_false]=true', config);
  const clients = res.data.data;
  
  if (clients.length > 0) {
    const firstClient = clients[0];
    
    const taskPayload = {
      title: `Контрольний дзвінок: ${firstClient.person}`,
      parent_type: "Client",
      parent_id: firstClient.id,
      finished: false
    };
    
    const taskRes = await axios.post('https://api.keepincrm.com/v1/tasks', taskPayload, config);
    console.log('Задачу створено:', taskRes.data);
  }
}

syncClientsAndAssignTask();
```

---

## БЛОК 6. ТОП-10 ТИПОВИХ ПОМИЛОК ІНТЕГРАТОРІВ

| Симптом | Причина | Вирішення |
|---------|---------|-----------|
| CORS помилка у браузері | API-запити з Frontend JS (браузер) | Перенести запити на Backend — ключ не можна палити у клієнті |
| HTTP 401 при діючому токені | Ключ згенерований не власником, а адміністратором | Перегенерувати ключ під акаунтом Company Creator |
| HTTP 403 на будь-яких запитах | Безкоштовний або базовий тариф | Перейти на розширений тариф |
| Вхідний Webhook не створює сутності | Не вказано або невірно вказано поле `person` / `company` | Перевірити обов'язкові поля в налаштуваннях вебхука |
| HTTP 422 при записі кастомних полів | Текст у числовому полі | Строге приведення типів на стороні інтеграції |
| Файли не прикріплюються через API | Спроба передати файли у POST/PATCH угоди | Файли — тільки через об'єкт `comments` методом `multipart/form-data` |
| Помилки 5xx при відправці файлів | Файл перевищує ліміт розміру | Максимальний розмір файлу — **100 Мб** |
| Тригер на суму не спрацьовує | Ціле число замість decimal у умові тригера | Писати `total > 500.0` (з крапкою), а не `total > 500` |
| Пропуск товарів у вихідних вебхуках | Невірний Mustache-синтаксис для масивів | Використовувати `{{#jobs}}...{{^_last}},{{/_last}}{{/jobs}}` |
| HTTP 429 при масовому імпорті | Паралельні запити без тротлінгу | Черги (Redis Queue) + ліміт 5 запитів/сек |

---

## БЛОК 7. ІМПОРТ / ЕКСПОРТ ТА МІГРАЦІЯ

### 7.1 Вбудований імпорт (XLSX)

Підтримувані сутності: Ліди, Клієнти, Угоди, Прайс-лист, Склад, Завдання.

**Вимоги до файлів імпорту складу:**
- Обов'язкове поле: `title` (назва товару)
- Уникальний ідентифікатор для de-duplication: ID в CRM, Rozetka Offer ID, SKU або Назва
- Кастомні поля: колонки з назвами, що точно відповідають назвам полів у налаштуваннях
- Об'єднаний склад: формат колонок `<Назва_складу>_available`
- **Рекомендований розмір файлу: до 10 000 рядків**

### 7.2 Масова міграція через API — порядок

```
1. Склад та Прайс-листи   → отримати product_id
           │
           ▼
2. База Контрагентів       → отримати client_id
           │
           ▼
3. Угоди                   → прив'язка до client_id + product_id
           │
           ▼
4. Завдання та Фінанси     → прив'язка через parent_id
```

**De-duplication перед створенням:**
```python
# Пошук перед POST
GET /v1/clients?q[phones_i_cont]=+380991112233
# Якщо знайдено → PATCH, якщо ні → POST
```

---

## БЛОК 8. НАЛАГОДЖЕННЯ ТА МОНІТОРИНГ

### 8.1 Точки контролю в інтерфейсі

1. **Журнал API-запитів:** Налаштування → Профіль компанії → API  
   Містить: метод, ендпоінт, IP відправника, HTTP-код, тіло помилок

2. **Журнал тригерів:** немає глобального екрану — перегляд у **лог активності конкретної картки** (угоди/клієнта)

### 8.2 Інструменти розробника

- **ngrok** — для локального тестування вихідних вебхуків (тимчасовий публічний URL)
- **Postman-колекція** — доступна в кабінеті розробника KeepinCRM
- **Swagger UI** — https://app.swaggerhub.com/apis-docs/KeepInCRM/keepincrm-api/

---

## БЛОК 9. ПАТЕРНИ ІНТЕГРАЦІЙ

### One-way sync (Одностороння)
Кастомний сайт → вхідний Webhook → KeepinCRM  
Використовується для: форм заявок, лендингів

### Two-way sync (Двостороння)
**Обов'язково:** Loop Prevention!
```
# Умова в тригері щоб не зациклитись:
main_responsible_id_not_eq <id_інтеграційного_юзера>
# або аналогічна системна ознака
```

### Batch import
- Послідовні запити (не паралельні)
- Тайм-аут між запитами: **мінімум 200 мс**

### Event-driven архітектура (рекомендовано для складної автоматизації)
```
KeepinCRM → легкий webhook ("угоду переведено на Складання")
         ↓
Зовнішній мікросервіс → асинхронна обробка в черзі
         ↓
Зовнішній мікросервіс → REST API назад до KeepinCRM
```

---

## Швидка довідка

| Параметр | Значення |
|----------|---------|
| Base URL | `https://api.keepincrm.com/v1/` |
| Auth header | `X-Auth-Token: <ключ>` |
| Rate limit | 5 запитів/сек |
| Retry-After | заголовок при 429 |
| Max file size | 100 Мб |
| Max per_page | 100 |
| Webhook retry | 3 спроби × 15 хвилин |
| Swagger | https://app.swaggerhub.com/apis-docs/KeepInCRM/keepincrm-api/ |
| GitHub | https://github.com/KeepinCRM |
| Magento модуль | https://github.com/KeepinCRM/magento2-module |

---

*Джерело: Gemini Deep Research, технічний архітектурний довідник KeepinCRM, 2025–2026*
