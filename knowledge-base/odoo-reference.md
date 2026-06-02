# Odoo — База знань для інтегратора та консультанта

> Джерела (за пріоритетом): Офіційний сайт odoo.com (HTML), ChatGPT Deep Research 2026-06, Gemini Deep Research 2026-05
> Актуальна версія на офіційному сайті: **saas~19.2+e** (підтверджено з HTML odoo.com/ru_RU)

---

## БЛОК 0: КАРТА ДОСТОВІРНОСТІ (Quick Reference)

| Параметр | Значення | Маркер |
|---|---|---|
| API протоколи | XML-RPC / JSON-RPC (legacy) / JSON-2 (v19+) | ✅ |
| JSON-2 endpoint | `/json/2/...` | ✅ |
| XML-RPC/JSON-RPC deprecation | Заплановано видалити в **Odoo 20 (осінь 2026)** | ✅ ChatGPT |
| БД | PostgreSQL 12+ | ✅ |
| Python | 3.10+ (для v17/v18/v19) | ✅ |
| Ціна Custom (офіційна) | US$46.70–$58.40/користувач/місяць | ✅ ChatGPT |
| Ціна Standard | ~$31.10/користувач/місяць (США) | ⚠️ уточнити |
| Odoo.sh | Оплачується **окремо** від ліцензії | ✅ |
| Локалізація України | **Відсутня** в офіційних fiscal localizations 18/19 | ✅ ChatGPT |
| WhatsApp | Enterprise-only, v17+, через Meta Business API | ✅ |
| Odoo Studio | Enterprise-only, v14+ | ✅ |
| External API | Тільки на тарифі **Custom** | ✅ |
| Безкоштовний тариф | 1 додаток, необмежено користувачів (Odoo Online) | ✅ |

---

## БЛОК 1: ОГЛЯД ДЛЯ БІЗНЕСУ

### 1.1 Що таке Odoo і для кого

Odoo — інтегрована модульна ERP/CRM-платформа. Офіційно (з сайту): **15 млн користувачів**, **100+ тис. розробників**, **40+ тис. community apps**.

Ключова заява (офіційний сайт): **«Весь ваш бізнес на одній платформі. Просто, ефективно і за доступною ціною.»**

Продуктивність: **всі операції виконуються менш ніж за 90 мс** (офіційна заява сайту).

Trial: **без прив'язки картки, миттєвий доступ** (підтверджено сайтом).

Сильна сторона: **наскрізний потік даних** між лідами, замовленнями, закупівлями, складом, документами та сервісом на одній платформі.

Головне обмеження: не є рішенням "з коробки без перевірки" для країн з особливими вимогами до бухгалтерії та ЕДО (зокрема Україна).

**Ціновий меседж (офіційний сайт)**: «У нас немає: оплати за фактом використання, додаткових платних функцій, довгострокових контрактів, обмежень розміщення та інших сюрпризів. Тільки фіксована ціна за користувача за принципом «всё включено».»

**Контакти Odoo** (офіційний сайт): Телефон: +32 2 290 34 90 | WhatsApp: +852 6449 1993

**Runbot** (CI/CD для розробників): runbot.odoo.com — публічний сервер безперервного тестування Odoo

**Сегментація демо** (офіційний сайт, appointment forms):
- Micro Business: 1–15 співробітників
- Small Business: 16–50 співробітників
- Medium Business: 51–200 співробітників
- Large Company: >200 співробітників

### 1.2 Community vs Enterprise

| Функціонал | Community | Enterprise |
|---|---|---|
| CRM, Sales, Purchase | ✅ | ✅ |
| Inventory (склад) | ✅ | ✅ + IoT, штрихкодування |
| Accounting (повний) | ❌ (тільки Invoicing) | ✅ |
| Odoo Studio | ❌ | ✅ |
| Multi-company | ❌ (обмежено) | ✅ (тільки Custom план) |
| External API | ✅ self-hosted | ✅ (тільки Custom план) |
| Helpdesk | ❌ | ✅ |
| WhatsApp | ❌ | ✅ (v17+) |
| OCR рахунків | ❌ | ✅ |
| AI Lead Scoring | ❌ | ✅ |

Community — open-source (LGPL-3), тільки self-hosted. Enterprise — комерційна ліцензія.

### 1.3 Варіанти розгортання

| Варіант | Опис | Обмеження |
|---|---|---|
| **Odoo Online (SaaS)** | Повністю керується Odoo SA, авто-оновлення | Без кастомного Python-коду; кастомізація тільки через Studio |
| **Odoo.sh (PaaS)** | GitHub-інтеграція, staging, CI/CD, SSH-доступ, моніторинг, щоденні бекапи | Enterprise-only; ліцензія оплачується окремо від хостингу |
| **Self-hosted** | Повний контроль, будь-які модулі | Потребує Linux + Python 3.10+ + PostgreSQL 12+ + адміністратора |

### 1.3б Офіційний повний список модулів (з сайту odoo.com)

**Фінанси:** Бухгалтерія · Виставлення рахунків (Invoicing) · Витрати (Expenses) · Таблиці (Spreadsheet) · Документообіг (Documents) · Підпис (Sign)

**Продажі:** CRM · Продажі (Sales) · POS Магазин · POS Ресторан · Підписки (Subscriptions) · Оренда (Rental)

**Вебсайти:** Конструктор вебсайтів · eCommerce · Блог · Форум · Онлайн-чат (Live Chat) · Електронне навчання (eLearning)

**Логістика:** Склад (Inventory) · Виробництво (Manufacturing) · PLM · Закупівлі (Purchase) · Обслуговування (Maintenance) · Якість (Quality)

**Відділ кадрів:** Співробітники (Employees) · Підбір персоналу (Recruitment) · Відпустки (Time Off) · Оцінка персоналу (Appraisals) · Реферальна програма (Referrals) · Автопарк (Fleet)

**Маркетинг:** SMM (Social Marketing) · Email-розсилки · SMS-розсилки · Заходи (Events) · Автоматизація маркетингу · Опитування (Surveys)

**Послуги:** Проекти · Табелі (Timesheets) · Виїзний сервіс (Field Service) · Підтримка (Helpdesk) · Планування (Planning) · Зустрічі (Appointments)

**Продуктивність:** Обговорення (Discuss) · Штучний інтелект (AI) · IoT · VoIP-телефонія · Knowledge · WhatsApp

**Окремо:** Студія Odoo (Studio) · Платформа Odoo Cloud (Odoo.sh) · Сторонні додатки (apps.odoo.com)

### 1.3в Галузі з офіційного сайту (Industries)

| Категорія | Підгалузі |
|---|---|
| Роздрібна торгівля | Книжковий, Одяг, Меблі, Продукти, Будівельний, Іграшки |
| Готельно-ресторанний | Бар/паб, Ресторан, Фастфуд, Гостьовий будинок, Напої, Готель |
| Нерухомість | Агентство, Архітектурне бюро, Будівництво, Управління, Ландшафт, ТСЖ |
| Консалтинг | Бухгалтерська фірма, Партнер Odoo, Маркетингове агентство, Юридична, HR, Аудит |
| Виробництво | Текстиль, Метал, Меблі, Продукти харчування, Пивоварня, Корпоративні сувеніри |
| Здоров'я та фітнес | Спортклуб, Оптика, Фітнес, Велнес-центр, Аптека, Салон краси |
| Послуги | Побутові послуги, IT-обладнання, Сонячна енергія, Взуття, Клінінг, HVAC |
| Інше | НКО, Сталий розвиток, Рекламні щити, Фотографія, Прокат велосипедів, Реселер ПО |

### 1.4 Тарифні плани (офіційна сторінка odoo.com/pricing)

| Plan | Що включено | Хостинг |
|---|---|---|
| **Один модуль безкоштовно** | 1 модуль (на вибір), необмежено користувачів | Тільки Odoo Online |
| **Standard** | Всі модулі, без кастомного коду | Тільки Odoo Online |
| **Custom** | Всі модулі + Studio + multi-company + External API | Odoo Online / Odoo.sh* / On-premise** |

> (*) Odoo.sh оплачується окремо від ліцензії.
> (**) On-premise доступно **тільки при річній оплаті** Custom-плану.

**Орієнтовні ціни в USD (ChatGPT Deep Research 2026-06):**
- Standard: ~$31.10/user/міс (річна) / ~$38.90 (місячна)
- Custom: ~$46.70–$58.40/user/міс (річна)

**Орієнтир витрат Custom/рік (без хостингу та впровадження):**
- 5 users → ~$2,800–3,500/рік
- 25 users → ~$14,000–17,500/рік
- 100 users → ~$56,000–70,000/рік

**Що включено у ВСІ плани (офіційно):**
- Хостинг + щоденні інкрементальні резервні копії на двох континентах
- Інтеграція з електронною поштою
- Безпека + моніторинг 24/7
- Необмежена підтримка по email: Пн–Пт, 24/5, мовами EN / FR / ES / NL
- Безкоштовний доступ до платформи e-learning
- Оновлення включені без додаткової плати

**Що НЕ включено (офіційно):**
- Хостинг на Odoo.sh для кастомних модулів
- Послуги по впровадженню та консультації
- **IAP-кредити**: SMS-розсилки, автозаповнення контактів, генерація лідів, AI-сканування рахунків постачальників та витрат
- Супровід кастомного коду

**Знижка:** скидка діє 12 місяців для вказаної кількості користувачів при річній оплаті.

### 1.5 Версії та терміни підтримки

| Версія | Реліз | Статус у 2026 |
|---|---|---|
| v16 | жовтень 2022 | Legacy; тільки підтримка існуючих |
| v17 | листопад 2023 | Консервативний baseline |
| v18 | жовтень 2024 | Стабільний baseline для обережних впроваджень |
| **v19** | **вересень 2025** | **Актуальна версія; рекомендована для greenfield** |
| v20 | очікується осінь 2026 | Видалення XML-RPC та JSON-RPC |

Підтримуються лише 3 останні мажорні версії.

### 1.6 Порівняння з конкурентами

| Критерій | Odoo | SAP B1 | 1С / BAS | Bitrix24 | HubSpot |
|---|---|---|---|---|---|
| Клас | ERP + CRM + E-com | ERP | ERP / Облік | CRM + Портал | CRM + Маркетинг |
| Open Source | Частково (Community) | Ні | Ні | Ні | Ні |
| Вартість ліцензій | Середня | Висока | Низька/Середня | Середня | Висока |
| Складність впровадження | Середня | Дуже висока | Висока | Низька | Низька |
| Вбудований AI | Так (v17+) | Обмежено | Відсутній | Обмежено | Так |
| API | Відмінне | Середнє | Середнє | Середнє | Висока |

### 1.6б Офіційна філософія ціноутворення (з сайту)

**Офіційна заява Odoo (дослівно):** «Справедливі ціни: у нас немає оплати за фактом використання, додаткових платних функцій, довгострокових договорів, обмежень на розміщення та інших сюрпризів. Тільки фіксована ціна за користувача за принципом "все включено".»

**Офіційна заява про дані:** «Ми не використовуємо пропрієтарний формат даних, тільки PostgreSQL: ви повністю контролюєте свої дані. Ніякої прив'язки до програмного забезпечення: ви отримуєте вихідний код, доступ до GitHub і гнучкість у виборі розміщення.»

### 1.4б Визначення платного користувача (офіційно)

**Платний користувач** — співробітник з доступом до back-end Odoo для створення, перегляду або редагування документів.

**Платні:** співробітник, що звітує про витрати / заповнює табелі; сторонній бухгалтер в Odoo.

**БЕЗКОШТОВНІ (не тарифікуються):**
- Клієнти і постачальники через портал (перегляд рахунків)
- Відвідувачі сайту, що роблять eCommerce-замовлення та відстежують доставку

### 1.4в Уточнення: що таке External API (офіційно)

**Потребує Custom-плану:** зовнішня система (legacy, BI, звітність) **ініціює** виклики до Odoo API (JSON-RPC або XML-RPC).

**Входить у Standard (не вважається зовнішнім API):** якщо сам Odoo викликає зовнішній сервіс:
- Платіжні системи: Stripe, PayPal, Adyen та ін.
- Доставка: UPS, FedEx, DHL та ін.
- VoIP-провайдери
- Банківська синхронізація

### 1.4г Послуги впровадження (офіційна градація)

| Розмір компанії | Канал |
|---|---|
| < 50 співробітників | Пакети **Success Pack** від Odoo напряму |
| > 50 співробітників | Локальні **партнери Odoo** (odoo.com/partners) |
| > 250 співробітників | Напряму з Odoo (odoo.com/contactus) |

### 1.4д Безкоштовний план — важливі нюанси (FAQ)

- **Можна обрати Studio Odoo** як безкоштовний модуль у плані "Один модуль"
- **Multi-company включено** у безкоштовному плані
- Залежні модулі надаються автоматично: наприклад, eCommerce → Вебсайт + Invoicing безкоштовно
- **Автоматичний перехід на Custom:** якщо встановити Studio або додати компанію в БД

### 1.4е Конкуренти та ціни (з калькулятора на pricing page)

Одoo замінює весь цей стек за одну ціну:

| Конкурент | Модуль Odoo | Ціна конкурента |
|---|---|---|
| Salesforce | CRM | $165/user |
| DocuSign | Підпис | $38/user |
| BambooHR | HR | $40/user |
| WordPress | Вебсайт | $25 flat |
| Quickbooks | Бухгалтерія | $76 flat |
| Slack | Обговорення | $14.10/user |
| Notion | Knowledge | $14/user |
| Asana | Проекти | $20/user |
| Zendesk | Helpdesk | $20/user |
| ClickUp | Планування | $50/user |
| HubSpot | Email-маркетинг | $10/user |
| Shopify | eCommerce | $30 flat |
| Hootsuite | SMM | $20/user |
| Expensify | Витрати | $40/user |
| Calendly | Зустрічі | $10/user |
| Coupa | Закупівлі | $20/user |
| Harvest | Табелі | $10/user |
| Katana MRP | Виробництво | $12/user |
| Booqable | Оренда | $20/user |

### 1.7 ROI та бізнес-кейси (Україна)

- **KPMG Belgium (з офіційного сайту)**: обробка бухгалтерських документів скоротилася з **2 днів до 5 годин**. Цитата Harry Van Donink (CEO): *«Тепер ми можемо зосередитися на важливіших завданнях: складанні звітності та наданні консультацій.»*
- **Оптова торгівля (ToDo LLC)**: +40% швидкість обробки замовлень, нуль помилок при штрихкодуванні
- **Виробництво меблів (ERP Ukraine)**: точна собівартість, -25% незавершене виробництво
- Вартість впровадження через партнера: $75–150/год (розробники + аналітики)
- Малий бізнес (до 15 users): 2–4 місяці; середній з кастомізацією: 6–12 місяців
- Studio-first без важких інтеграцій: 8–12 тижнів

---

## БЛОК 2: НАЛАШТУВАННЯ БЕЗ КОДУ

### 2.1 Odoo Studio [Enterprise]

- Додавання нових полів (всі типи), редагування макетів форм (drag-and-drop)
- Нові view (calendar, pivot, kanban), кастомні кнопки, нові моделі та меню
- Approval Rules (ланцюжки погоджень)
- **Під капотом**: зміни зберігаються в БД як XML (не файли на диску); `ir.model.fields`, `ir.ui.view`, `ir.actions.server`
- Можна **експортувати як ZIP-модуль** `studio_customization` → перенести на іншу інстанцію
- Конфлікт ризик: якщо розробник перейменує поле, на яке посилається Studio — критична помилка UI

### 2.2 Кастомні поля без Studio (Community)

Settings ‣ Technical ‣ Database Structure ‣ Fields (потрібен Developer Mode).
Типи: Char, Text, Html, Integer, Float, Monetary, Boolean, Date, Datetime, Binary, Selection, Many2one, One2many, Many2many, Reference.
Для відображення поля на формі — вручну вносити XPath у View через Edit View: Form.

### 2.3 CRM — воронки та стадії

- Стадії = колонки канбан; можна прив'язати до команди продажів
- Кілька паралельних воронок — через команди + фільтри
- AI Lead Scoring [Enterprise]: naive Bayes probability model, автоматично оновлює ймовірність
- Lost Reasons — настроюються у довіднику

### 2.4 Права доступу

- **Groups**: базові дозволи CRUD на модель (`ir.model.access.csv`)
- **Record Rules**: SQL-domain фільтри, наприклад `[('user_id', '=', user.id)]`
- **Field-level security**: атрибут `groups` в XML view
- **Multi-company ізоляція**: автофільтр по `company_id`

### 2.5 Email та комунікації

- **Catch-all адреса** → автоматичний маршрутинг листів → створення лідів/тікетів
- **Chatter**: лог всіх змін полів + листування + нотатки
- **Email Templates**: Jinja + QWeb, динамічні змінні з документів
- **SMS**: через IAP-кредити Odoo SA
- Gmail OAuth / Microsoft 365 Graph API / IMAP/SMTP

### 2.6 Звіти та аналітика

- **Pivot View**: зведена таблиця, групування по будь-яких вимірах
- **Graph View**: лінійні, стовпчикові, кругові
- **Dashboard**: консолідація кількох звітів
- **Odoo Spreadsheet [Enterprise]**: фінансові звіти поверх live-даних ERP
- **PDF звіти**: QWeb-шаблони; Studio дозволяє налаштувати структуру без коду

### 2.7 Автоматизовані дії (Automated Actions)

Settings ‣ Technical ‣ Automation ‣ Automation Rules.

Типи тригерів: On Creation, On Update, On Creation & Update, Based on Time Condition, **On Webhook** (v17+).

Доступні дії: оновити запис, створити активність, надіслати email/SMS, виконати Python-код, **"Send Webhook Notification"** (v17+).

Контекст Python-коду: `env`, `model`, `record`, `records`, `time`, `datetime`.
Python виконується у `safe_eval` — **без `import os`** та системних викликів.

### 2.8 Scheduled Actions (Cron)

Settings ‣ Technical ‣ Automation ‣ Scheduled Actions.
Мінімальний інтервал — 18 хвилин (адаптується автоматично). Логи виконання та помилки — в картці задачі.
Автоматично деактивується після серії помилок або таймаутів.

---

## БЛОК 3: АРХІТЕКТУРА

### 3.1 Технічний стек

```
Frontend:  OWL (Odoo Web Library, JS/CSS) — реактивний фреймворк
Backend:   Python + Werkzeug WSGI
ORM:       → PostgreSQL 12+
Кеш:       Memory Cache (рівень транзакції/сесії)
Черга:     ir.cron + OCA queue_job (для async/heavy ops)
```

### 3.2 Типи моделей ORM

| Тип | Опис |
|---|---|
| `models.Model` | Персистентна; таблиця в БД |
| `models.TransientModel` | Тимчасова (візарди); автоочищення |
| `models.AbstractModel` | Абстрактна (міксини); без таблиці |

### 3.3 Поля ORM

**Базові:** Char, Text, Html, Integer, Float, Monetary, Boolean, Date, Datetime, Binary, Selection, Reference

**Реляційні:** Many2one, One2many, Many2many

**Computed fields:**
- `compute='_method'` + `@api.depends('field_a', 'field_b')`
- `store=False` (за замовчуванням) — обчислюється в RAM під час запиту
- `store=True` — записується в БД, перераховується при зміні залежностей
- ⚠️ `sudo()` у `store=True` computed → витік конфіденційних даних

**Related fields:** `partner_phone = fields.Char(related='partner_id.phone', store=True)`
⚠️ Не можна будувати ланцюжки залежностей через Many2many та One2many.

**Constraints:**
- SQL: `_sql_constraints = [('name_uniq', 'unique(name)', 'Msg')]`
- Python: `@api.constrains('field')` → `ValidationError`
- ⚠️ `@api.constrains` не підтримує dotted-names; спрацьовує тільки якщо поле є в create/write

### 3.4 Наслідування

| Механізм | Опис | Коли використовувати |
|---|---|---|
| `_inherit = 'model'` | Розширює існуючу таблицю in-place | Основний спосіб розширення |
| `_inherits = {'parent': 'id'}` | Делегація (дві таблиці, One2one) | Рідко; офіційна дока попереджає про ризики — **уникати в ланцюжках** |

### 3.5 Структура кастомного модуля

```
my_module/
├── __init__.py
├── __manifest__.py        # name, version, depends, data, assets, license
├── models/                # Python ORM класи
├── views/                 # XML шаблони інтерфейсу
├── data/                  # XML/CSV ініціалізаційні дані
├── security/              # ir.model.access.csv + record rules
├── controllers/           # HTTP маршрути (Werkzeug)
└── static/                # JS/CSS/OWL ресурси
```

**Формат версії в маніфесті:** `'18.0.1.0.0'`

### 3.6 Ключові декоратори ORM

| Декоратор | Призначення |
|---|---|
| `@api.model` | Метод класу, без конкретного recordset |
| `@api.depends('fields')` | Залежності computed поля |
| `@api.onchange('field')` | Клієнтський тригер (без збереження в БД) |
| `@api.constrains('fields')` | Валідація при збереженні |
| `@api.model_create_multi` | Override create для пакетного створення |

---

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

## БЛОК 6: AI-МОЖЛИВОСТІ

**Офіційна позиція (з сайту):** «Вбудований ШІ для всього бізнесу — автоматизуйте процеси, налаштовуйте функції під свої завдання, проводьте глибоку аналітику і масштабуйте систему без обмежень.»

**Відкритий код + AI (офіційна заява):** «Завдяки відкритому коду LLM-асистенти вже знають всі нюанси системи і готові допомагати вам у розробці» (посилання на Odoo.sh для vibe-coding модулів).

| Функція | Редакція | Деталі |
|---|---|---|
| **AI Lead Scoring** | Enterprise | naive Bayes probability; оновлює ймовірність угоди автоматично |
| **Invoice OCR** | Enterprise | Розпізнає PDF-рахунки через IAP; **рекомендується human-in-the-loop** — завжди перевіряти результат |
| **ChatGPT / OpenAI** | Community | Через `openai_api_key` в System Parameters; всі HTML-редактори отримують AI-помічника |
| **Прогноз складських залишків** | Enterprise | Аналіз часових рядів → авто-замовлення постачальникам |
| **Email-to-Lead** | Community | Аналіз вхідних листів → автозаповнення полів картки |

**WhatsApp [Enterprise, v17+]**: через **WhatsApp Business Platform API від Meta** — це зв'язка трьох сторін (Odoo + Meta + операційна дисципліна). Потребує: webhook-налаштування, постійного токена зі спеціальними правами, затверджених шаблонів повідомлень. Не є автономним внутрішнім модулем.

---

## БЛОК 7: РОЗШИРЕННЯ МОДЕЛЕЙ (ПРИКЛАДИ)

```python
from odoo import models, fields, api

class CrmLead(models.Model):
    _inherit = 'crm.lead'

    x_additional_info = fields.Text(string='Additional Info')

    @api.model_create_multi
    def create(self, vals_list):
        for vals in vals_list:
            if not vals.get('x_additional_info'):
                vals['x_additional_info'] = 'Auto-filled.'
        return super().create(vals_list)
```

**XPath розширення view:**
```xml
<odoo>
  <record id="view_crm_lead_form_inherit" model="ir.ui.view">
    <field name="inherit_id" ref="crm.crm_case_form_view_leads"/>
    <field name="arch" type="xml">
      <xpath expr="//field[@name='email_from']" position="after">
        <field name="x_additional_info"/>
      </xpath>
    </field>
  </record>
</odoo>
```

---

## БЛОК 8: ІНТЕГРАЦІЇ

### 8.1 Автоматизаційні платформи

- **Zapier**: офіційний сертифікований конектор
- **Make (Integromat)**: офіційні готові сценарії
- **n8n**: нативні ноди Odoo

### 8.2 Месенджери

- **WhatsApp**: [Enterprise, v17+], Meta Cloud API — детальніше в Блоці 6
- **Telegram**: через маркетплейс або кастомні боти
- **Slack**: конектори на маркетплейсі (передає повідомлення з Chatter)

### 8.3 Платіжні системи (Україна)

- **LiqPay, Monobank (Plata), WayForPay**: через маркетплейс-модулі партнерів (Garazd Creation, Browseinfo)
- Підтримують онлайн-оплату та повернення коштів (Refunds) з інтерфейсу Odoo

### 8.4 Логістика (Україна)

- **Нова Пошта, Укрпошта**: через модулі ToDo LLC (розрахунок вартості, ЕН, трекінг)
- **DHL / FedEx / UPS**: нативно в Enterprise (друк етикеток, тарифи в реальному часі)

### 8.5 Бухгалтерія та ERP

- **1С / BAS**: нативна інтеграція відсутня; реалізується через XML/JSON API або кастомні конектори
- **Банківські виписки**: OFX, QIF, CAMT, MT940; ПриватБанк та Monobank — через партнерські модулі

### 8.6 Телефонія

Вбудована VoIP-панель (SIP). Підтримка: Asterisk, FreePBX, Zadarma, Binotel.
Click-to-Call, картка клієнта при вхідному дзвінку.

### 8.7 OCA топ-10 модулів для інтеграцій

1. `connector` — фреймворк двосторонніх синхронізацій
2. `queue_job` — асинхронне виконання задач
3. `base_automation_webhook` — розширення вихідних вебхуків
4. `partner_firstname` — поділ імені/прізвища
5. `web_responsive` — адаптивний UI для мобільних (Community)
6. `server_environment` — конфігурації dev/staging/prod
7. `auditlog` — детальний аудит дій користувачів
8. `excel_import_export` — розширений імпорт/експорт
9. `database_cleanup` — очищення БД
10. `attachment_queue` — асинхронне завантаження файлів

---

## БЛОК 9: ІМПОРТ / МІГРАЦІЯ

### 9.1 Імпорт через UI

- CSV або XLSX, до **20 000 рядків** за один файл
- **External ID** (`__export__.res_partner_125_a8f`) — ключ для оновлення без дублікатів
- Many2one — пошук за Name або External ID (надійніше)

### 9.2 Програмний імпорт через API

Для великих масивів — метод `load(fields, data)` замість `create()`.
Оптимальний batch size: **500–1000 записів** за запит.

### 9.3 Порядок міграції з інших систем

```
1. Системні довідники (Країни, Валюти, Податки)
   ↓
2. Партнери та контрагенти (res.partner)
   ↓
3. Номенклатура продуктів (product.template)
   ↓
4. Специфікації виробництва (BoM)
   ↓
5. Історичні замовлення та відкриті транзакції
   ↓
6. Початкові залишки на складах (Stock Inventory)
   ↓
7. Початкові бухгалтерські проведення та баланси
```

### 9.4 Бекапи

- **Odoo Online**: автоматично + ручне завантаження ZIP (дамп PostgreSQL + filestore) з панелі
- **Self-hosted**: `pg_dump` + копія `~/.local/share/Odoo/filestore/`
- **Odoo.sh**: інтерфейс snapshots, щоденні інкрементальні бекапи на 3 серверах

---

## БЛОК 10: ЛОКАЛІЗАЦІЯ УКРАЇНИ

⚠️ **Критично для проектів в Україні:**

Офіційні fiscal localizations Odoo 18/19 **НЕ включають Україну**. Це не означає неможливість впровадження, але:

**Що НЕ підтверджено офіційно:**
- Офіційний fiscal localization package (план рахунків, VAT-логіка, звітність) — тільки через партнерські модулі
- Payroll, ЕДО, банківські формати — тільки через OCA або партнерів

**Що доступно через партнерів (ToDo LLC, ERP Ukraine):**
- Інтеграція ПРРО (Checkbox, Cashalot, Вчасно.Каса)
- Нова Пошта / Укрпошта
- ПриватБанк / Monobank виписки
- LiqPay / WayForPay

**Обов'язковий pre-project checklist для України:**
- [ ] Chart of accounts (план рахунків)
- [ ] VAT logic (ПДВ 20%/7%/0%)
- [ ] Локальна звітність
- [ ] Payroll
- [ ] ЕДО / електронний підпис
- [ ] Банківські формати
- [ ] Апгрейдна підтримуваність партнерських модулів

**Мова інтерфейсу:** Українська присутня (90%+ перекладу базових модулів). Повноту локалізації конкретного модульного набору треба тестувати окремо.

---

## БЛОК 11: ДЕБАГ І ТИПОВІ ПОМИЛКИ

### 11.1 Інструменти дебагу

- **Debug Mode**: `?debug=1` в URL → меню розробника (павук у шапці)
- **Логи сервера**: `log_level = debug_rpc` в `odoo.conf` → всі RPC запити
- **Odoo Shell**: `odoo-bin shell -c odoo.conf -d my-database` → інтерактивна Python-консоль з ORM
- **pdb**: `import pdb; pdb.set_trace()` у коді методу

### 11.2 Типові помилки API

| Помилка | Причина | Рішення |
|---|---|---|
| `AccessDenied` | Невірний ключ/БД/логін | Перевірити ключ в Settings ‣ Users ‣ Preferences |
| `AccessError` | Немає прав на модель/запис | Додати групу доступу в Settings |
| `ValidationError` | Порушення constraint | Аналізувати поле в JSON-відповіді |
| Transaction rollback | SQL-помилка → транзакція в неробочому стані | Обгортати у `savepoint` |

### 11.3 Підводні камені

- ⚠️ `sudo()` у `store=True` computed → витік даних через запис в БД під правами адміністратора
- ⚠️ Пряме SQL в PostgreSQL не перераховує computed поля (ORM-тригери не запускаються)
- ⚠️ Всі `Datetime` в БД зберігаються в **UTC**; конвертація у локальний TZ — тільки на рівні UI
- ⚠️ Команда Many2many `(4, id)` — лише додає зв'язок, не створює і не видаляє записи
- ⚠️ `_inherits` (делегація) — офіційна дока попереджає: "implemented more or less"; уникати в ланцюжках
- ⚠️ View не оновлюється після редагування XML: перезапустити сервер з `--update=module_name`
- ⚠️ Assets (JS) не підвантажуються: перевірити кеш браузера або шлях в секції `assets` маніфесту

### 11.4 При оновленні версії (Migration)

Що зазвичай ламається при мажорному апгрейді:
- XPath-запити у XML (через зміну структури базових форм вендором)
- Сигнатури ORM-методів ядра
- JS/OWL компоненти при переході на новий UI-фреймворк

Міграція Enterprise — безкоштовно через Odoo Upgrade.
Міграція Community — через OCA OpenUpgrade.

---

## БЛОК 12: ДЕМО-СЦЕНАРІЇ ДЛЯ ПРОДАЖУ

### Для виробника
Специфікація (BoM) ‣ Комерційна пропозиція ‣ Виробниче замовлення ‣ Списання сировини ‣ Рахунок-фактура

### Для торгової компанії
Замовлення з інтернет-магазину ‣ Резерв на складі ‣ Пакувальний лист + ТТН Нової Пошти в один клік

### Для CRM-бізнесу
Вхідний лист → автоматичний лід ‣ Канбан-дошка ‣ Інвойс з Chatter ‣ Посилання на оплату (Stripe/LiqPay)

### Для сервісної компанії
Підтверджене замовлення → автоматичний проект ‣ Таймшити в мобільному ‣ Авторахунок по людино-годинах

### Killer features для демо власнику бізнесу
1. **Studio live** — створити нове поле прямо під час зустрічі
2. **Chatter** — вся комунікація, зміни, завдання в одному місці
3. **Наскрізний процес** — від ліда до бухгалтерського проведення без перемикання систем
4. **Odoo Spreadsheet** — фінансовий звіт поверх live-даних без Excel

---

## БЛОК 13: РЕКОМЕНДАЦІЇ ДЛЯ НОВИХ ПРОЕКТІВ (2026)

### Вибір варіанту розгортання

| Пріоритет клієнта | Рекомендація |
|---|---|
| Швидкий старт, мінімум інфраструктури | Custom + Odoo Online |
| Кастомні модулі, CI/CD, staging | Custom + Odoo.sh |
| Жорсткий контроль периметру та даних | Custom + on-premise |

### Вибір версії

- **Greenfield 2026** → **Odoo 19** (JSON-2 API, актуальна версія) — за умови готовності партнерських модулів
- **Консервативний baseline** → **Odoo 18** (стабільний, широка екосистема)
- **v16/v17** → тільки для підтримки існуючих інсталяцій

### Головні принципи успіху

1. **Configuration-first**: спочатку конфігурація та Studio, потім код
2. **Обмежити кастомний код**: хаотична кастомізація → складний апгрейд + зростання tech debt
3. **Виділені bot users** для інтеграцій (не особисті акаунти)
4. **OCR/AI — human-in-the-loop**: не auto-posting без перевірки
5. **Локалізаційний аудит** ДО підписання архітектури та бюджету (особливо для України)
6. **Позначити всі XML-RPC/JSON-RPC інтеграції** як кандидати на рефакторинг (Odoo 20 = осінь 2026)

---

## БЛОК 14: GITHUB ОРГАНІЗАЦІЯ ODOO

> Джерело: github.com/odoo (WebFetch, 2026-06-02). Усього публічних репозиторіїв: **43**.

### Основний репозиторій: odoo/odoo

| Метрика | Значення |
|---|---|
| Stars | 51,792 ⭐ |
| Forks | 32,610 |
| Commits | 200,254+ |
| Issues | 3,700+ відкритих |
| Pull Requests | 5,000+ відкритих |
| Поточна гілка | `19.0` |
| Ліцензія | LGPL-3.0 (Community частина) |

### Технологічний стек (odoo/odoo)

| Мова | % |
|---|---|
| Python | 52.1% |
| JavaScript | 43.8% |
| SCSS | 1.9% |
| Fluent | 1.8% |
| CSS | 0.3% |
| HTML | 0.1% |

**Висновок для інтегратора**: платформа фактично 50/50 Python (backend ORM, логіка) + JavaScript (OWL-фреймворк, UI). Для кастомних модулів потрібні компетенції в обох стеках.

### Структура репозиторію odoo/odoo

```
/addons     — всі стандартні модулі (CRM, Sales, Inventory, Accounting...)
/odoo       — ядро: ORM, HTTP контролер, fields, migrations
/setup      — пакетна конфігурація Python (setup.py)
/debian     — файли для Debian/Ubuntu пакету
```

### Ключові допоміжні репозиторії

| Репозиторій | Stars | Стек | Призначення |
|---|---|---|---|
| odoo/documentation | 1,225 | RST | Офіційна документація (Sphinx) |
| odoo/o-spreadsheet | 278 | TypeScript | Spreadsheet-компонент (OWL), вбудований в Odoo |
| odoo/paper-muncher | 257 | C++ | HTML/CSS → PDF рендерер (LGPL-3.0) |
| odoo/design-themes | 188 | SCSS | Теми для Website / eCommerce |
| odoo/odoo-ls | 177 | Rust | Language Server (LSP) для IDE — автодоповнення Odoo Python/XML |
| odoo/tutorials | 161 | Python | Офіційні навчальні матеріали |
| odoo/upgrade-util | 140 | Python | Утиліти для міграції між версіями (LGPL-3.0) |
| odoo/industry | 89 | Python | Галузеві конфігурації (вертикальні рішення) |

### Практичні висновки для команди

- **odoo-ls** (Rust LSP) — рекомендовано встановити в IDE (VS Code / PyCharm) для роботи з кастомними модулями; дає автодоповнення полів, моделей, XML-атрибутів
- **upgrade-util** — критично важливий при міграції клієнта між версіями (наприклад, 16→18); містить готові helper-функції для трансформації даних
- **paper-muncher** — замінює wkhtmltopdf у нових версіях Odoo для генерації PDF звітів; важливо для Enterprise клієнтів з кастомними звітами
- **o-spreadsheet** — TypeScript, окремий пакет; якщо клієнт хоче вбудовані фінансові звіти поверх live-даних — цей компонент вже в Odoo Enterprise
- **industry** репозиторій — галузеві конфіги (Restaurant, Real Estate, Rental тощо); перевірити перед початком проекту, чи є готова вертикаль для клієнта
- **Документація** (RST формат) — можна клонувати і шукати grep-ом для швидкого пошуку без доступу до інтернету

---

## БЛОК 15: APPS STORE (apps.odoo.com)

> Джерело: apps.odoo.com/apps/modules (офіційний HTML, 2026-06-02, найвищий пріоритет)

### Структура магазину

3 розділи: **APPS** (модулі) | **INDUSTRIES** (галузеві конфіги) | **THEMES** (теми для сайту)

### Фільтри Apps Store

| Фільтр | Значення |
|---|---|
| Ціна | All / Open Source (Free) / Paid |
| Платформа | All / Odoo Online (деякі модулі тільки для Online) |
| Версія | 5.0 → 6.0 → 6.1 → 7.0 → … → 18.0 → **19.0** |

**Важливо для інтегратора**: фільтр "Odoo Online" — означає сумісність з хмарою без self-hosted; якщо модуль НЕ відзначений — потрібна перевірка на хостингу клієнта.

### Категорії модулів (офіційний список)

Accounting | Discuss | Document Management | eCommerce | Human Resources | Industries | **Localization** | Manufacturing | Marketing | Point of Sale | Productivity | Project | Purchases | Sales | Warehouse | Website | Extra Tools | Tutorial

Зверніть увагу: категорія **Localization** — тут шукати українські фіскальні доповнення від community.

### Топ Apps (за релевантністю, станом на 2026-06-02)

| Назва | Вендор | Ціна | Покупки |
|---|---|---|---|
| Shopify Odoo Connector | Emipro Technologies | $469.33 | 2,287 |
| Dashboard Ninja with AI | Ksolves India Ltd. | $603.98 | 3,042 |
| Simplify Access Management | Terabits Technolab | $448.08 | 968 |
| Odoo WooCommerce Connector | Emipro Technologies | $469.33 | 1,761 |

### Найбільш завантажувані (безкоштовні)

| Назва | Вендор | Завантажень | Примітка |
|---|---|---|---|
| Odoo 19 Accounting Community | Odoo Mates | **118,260** | Повна бухгалтерія для Community edition — FREE |
| Odoo 19 Full Accounting Kit | Cybrosys | **84,891** | Альтернатива Enterprise Accounting — FREE |
| IT Hardware & Support | Odoo S.A. | 12,221 | Офіційний модуль від Odoo S.A. |
| MCP Server | much. GmbH | 1,322 (1,040/міс) | Підключення AI-асистентів через Model Context Protocol — FREE |

**Ключовий висновок**: якщо клієнт на Community edition і потребує повної бухгалтерії — `om_account_accountant` або `base_accounting_kit` (обидва FREE, >100K завантажень) закривають більшість потреб без переходу на Enterprise. Перевіряти сумісність з версією клієнта!

**MCP Server** (mcp_server) — trending модуль: дозволяє підключати AI-агентів (Claude, GPT) безпосередньо до Odoo через Model Context Protocol. 1040 завантажень за останній місяць.

### Публікація власного модуля

- URL для завантаження: apps.odoo.com/apps/upload
- Є Vendor Guidelines та Sales Conditions (окремі сторінки)
- Підтримуються версії від 5.0 до 19.0

---

## БЛОК 16: ОФІЦІЙНА ДОКУМЕНТАЦІЯ — СТРУКТУРА

> Джерело: odoo.com/ru_RU/page/docs (офіційний HTML, 2026-06-02, найвищий пріоритет)

### 7 розділів офіційної документації

| Розділ | URL | Призначення |
|---|---|---|
| Руководства пользователя | /documentation/latest/applications.html | Гайди та відеоуроки для кожного модуля |
| White Papers | /page/odoo-white-paper | Порівняння Odoo з конкурентами |
| Руководство разработчика | /documentation/latest/developer.html | API, ORM, кастомізація |
| Установка / адмін | /documentation/latest/administration.html | Інсталяція, обслуговування, оновлення БД |
| Тренинг-центр | /slides/all/tag/odoo-tutorials-9 | Відео, вправи, квізи |
| Сертификация | /slides/all?slide_category=certification | Офіційні сертифікати Odoo |
| Правові документи | /page/legal | Ліцензії та legal |

**Ключові URL для розробника**:
- Документація latest: `odoo.com/documentation/latest/`
- Developer guide: `odoo.com/documentation/latest/developer.html`
- Runbot (CI/CD): `runbot.odoo.com`
- Upgrade tool: `upgrade.odoo.com`

### Community ресурси

- Форум: odoo.com/forum/help-1
- Переклади: github.com/odoo/odoo/wiki/Translations
- Стати партнером: odoo.com/become-a-partner
- Знайти партнера: odoo.com/partners
- Знайти бухгалтера: odoo.com/accounting-firms
- Послуги з впровадження (Success Packs): odoo.com/pricing-packs
- Розробники на замовлення: odoo.com/page/developers-on-demand
- Підкаст: odoo.fm / podcast.odoo.com
- Scale Up! Business Game: odoo.com/education/scale-up-business-game (навчальна бізнес-гра)
