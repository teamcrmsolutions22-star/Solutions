# Odoo — Налаштування без коду

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

