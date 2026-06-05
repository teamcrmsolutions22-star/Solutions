# Odoo — Інтеграції та Apps Store

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
