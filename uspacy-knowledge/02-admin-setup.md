# Uspacy — Адміністрування, налаштування та фічі

> Оновлено: 2026-06-04 (Deep Research via WebSearch)

---

## Повний список модулів платформи

| Модуль | Опис | Plan | Джерело |
|--------|------|------|---------|
| CRM — Ліди | Воронка первинних запитів до конверсії | All | https://uspacy.com/features/crm/ |
| CRM — Контакти | Картки фізичних осіб | All | https://uspacy.com/features/crm/ |
| CRM — Компанії | Картки юридичних осіб | All | https://uspacy.com/features/crm/ |
| CRM — Угоди | Продажні можливості з вартістю та стадіями | All | https://uspacy.com/features/crm/ |
| CRM — Активності | Дзвінки, зустрічі, листи, завдання по клієнту | All | ua.uspacy.support/en/articles/7845463 |
| CRM — Мультиворонки | Окремі воронки для лідів та угод | Std/Pro | https://uspacy.com/support/knowledgebase/multi-funnels-in-deals-and-leads-en/ |
| CRM — Продукти | Каталог товарів і послуг | All | — |
| CRM — Генератор документів | Шаблони + автозаповнення з CRM | Std/Pro | ua.uspacy.support/en/articles/8687738 |
| CRM — Кошик (Recycle Bin) | Відновлення видалених записів | Std/Pro | https://uspacy.readme.io |
| Smart Objects | Кастомні бізнес-сутності (власні ентіті) | Std/Pro | ua.uspacy.support/en/collections/6483059 |
| Directions (Напрямки) | Підтип Smart Objects з Kanban | Std/Pro | ua.uspacy.support |
| Завдання — Kanban | Дошка по статусах / відповідальних | All | ua.uspacy.support/en/articles/7216039 |
| Завдання — Список | Табличний вигляд | All | — |
| Завдання — Ієрархія | Вкладені підзавдання | All | ua.uspacy.support/en/articles/9310191 |
| Завдання — Deadlines Board | Автоматична сортировка по дедлайнах | All | ua.uspacy.support/en/articles/9121066 |
| Завдання — Time Tracking | Облік витраченого часу | All | ua.uspacy.support/en/articles/8099999 |
| Завдання — Smart Filters | Збережені та кастомні фільтри | All | — |
| Месенджер — внутрішній чат | Корпоративні чати, канали, особисте | All | https://uspacy.com/blog/internal-chat-vs-telegram/ |
| External Lines — WhatsApp | Клієнти пишуть у WhatsApp → чат у Uspacy | All | ua.uspacy.support/en/articles/8310625 |
| External Lines — Telegram | Клієнти пишуть у Telegram → чат у Uspacy | All | ua.uspacy.support/en/articles/8332839 |
| External Lines — Viber | Клієнти пишуть у Viber → чат у Uspacy | All | ua.uspacy.support/en/articles/8332847 |
| External Lines — Facebook | Клієнти пишуть у FB Messenger → чат у Uspacy | All | ua.uspacy.support/en/articles/9361372 |
| External Lines — Instagram | Direct/Stories/Reels → чат у Uspacy | All | ua.uspacy.support/en/articles/9361363 |
| External Lines — Facebook Lead Forms | Ліди з форм FB → автоматично в CRM | All | — |
| Новинна стрічка (Newsfeed) | Корпоративні пости, коментарі, лайки | All | — |
| Групи | Публічні / приватні / секретні робочі групи | All | — |
| Company & People | Org-структура, відділи, профілі | All | https://uspacy.com/features/company/ |
| Ролі та дозволи | RBAC: перегляд/редагування/видалення/експорт | All | ua.uspacy.support/en/articles/6927214 |
| Аналітика — кастомні звіти | Конструктор звітів | All | ua.uspacy.support/en/articles/10295357 |
| Аналітика — Company Rhythm | Дашборд ритму компанії | All | — |
| Аналітика — My Productivity | Дашборд особистої продуктивності | All | — |
| Аналітика — History CRM | Хто і коли змінив запис у CRM | All | ua.uspacy.support/en/articles/10502628 |
| Автоматизація — Process Builder | Візуальний конструктор процесів (canvas) | All | https://uspacy.com/features/automation/ |
| Автоматизація — Conditional Actions | Правила для полів та карток | Std/Pro | https://uspacy.com/features/automation/ |
| Автоматизація — Robots | Автодії (email, SMS, завдання, webhook) | All | — |
| Автоматизація — Triggers | Реакція на події (тригери) | All | — |
| Webhooks — вхідні | Приймати дані ззовні без токена | Free: 1, Std/Pro: ∞ | https://uspacy.com/support/knowledgebase/for-developers/ |
| Webhooks — вихідні | Надсилати події назовні | Free: 1, Std/Pro: ∞ | ua.uspacy.support/en/articles/8186103 |
| Quick Replies | Швидкі відповіді в External Lines | All | ua.uspacy.support (Jan 8, 2026) |
| AI — Task Creation | Створення завдань з повідомлень/коментарів/нотаток | All | ua.uspacy.support (Dec 22, 2025) |
| Mobile App | iOS, Android, macOS, Windows, visionOS, Linux | All | https://uspacy.com/features/apps/ |

---

## Організаційна структура (Company & People)

- Створення відділів і підвідділів
- Прив'язка батьківський→дочірній відділ
- Профілі співробітників з кастомними полями
- Провізія: email-запрошення, пряме посилання, масовий імпорт

### Offboarding (звільнення)
Автоматизований workflow:
1. Відкликати доступ до workspace
2. Перепризначити активні завдання та відкриті ліди
3. Заархівувати комунікаційну історію

---

## Рольова модель (RBAC)

| Тариф | Кастомні ролі |
|-------|--------------|
| Free | 2 статичні ролі |
| Standard | до 6 кастомних ролей |
| Professional | Необмежено |

**Налаштування дозволів для CRM-сутностей:** leads, deals, contacts, companies, activities, call log.
**Рівні:** Create / View / Edit / Delete.
**Права доступу по відділах** — тільки Professional.

---

## Smart Objects — кастомні сутності

**Що це:** власні бізнес-об'єкти, якщо стандартних не вистачає.

**Налаштування при створенні:**
- `Support Directions` — вмикає Kanban-режим
- `Support Products` — вмикає роботу з товарами в картці
- `Support Activities` — вмикає активності та прив'язку до інших сутностей

**Ліміти:**
- Standard: до 5 Smart Objects
- Professional: необмежено

**Джерело:** https://ua.uspacy.support/en/articles/8472836

---

## Генератор документів

- Шаблони DOCX/PDF із змінними з CRM
- Автозаповнення даних клієнта, угоди, товарів
- Генерація прямо з картки ліда/угоди/контакту
- Статуси: Active / Inactive / Deleted

**Ліміти:**
- Free: 0 (або 1 шаблон в деяких версіях)
- Standard: до 5 активних шаблонів
- Professional: необмежено

**Джерело:** https://ua.uspacy.support/en/articles/8687738

---

## Автоматизація — деталі

### Process Builder
- Візуальний canvas для мультиетапних процесів
- Підтримка: умовні гілки, очікування, сповіщення
- Тригери: створення ліда, зміна етапу, зміна поля
- Дії: завдання, email, SMS, webhook, оновлення полів

### Conditional Actions (Умовні дії)
- Правила для карток завдань та CRM-полів
- Приклад: поле «Причина відмови» — обов'язкове тільки при переміщенні в «Програно»
- Ліміти: Standard — до 5 правил, Professional — необмежено

### Robots & Triggers
- **Robots** — виконують дії: надсилають email/SMS, призначають завдання
- **Triggers** — реагують на події: заповнення форми, зміна стадії

---

## Аналітика

- **Custom Report Builder** — фільтри за сутністю та відповідальним
- **Company Rhythm Dashboard** — ключові метрики компанії
- **My Productivity Dashboard** — особиста продуктивність
- **CRM History** — журнал змін записів
- Передача подій в Google Analytics 4 (опосередковано)

**Джерело:** https://uspacy.ua/features/analytics/

---

## CRM — деталі по сутностях

### Ліди (Leads)
- Первинний інтерес; ще не покупець
- Конвертуються в Контакт/Угоду автоматично або вручну
- Мультиворонки: кожна воронка — свої стадії
- Kanban + List view
- **Джерело:** ua.uspacy.support/en/articles/7435934

### Угоди (Deals)
- Продажна можливість: сума, стадія, менеджер, клієнт, джерело
- Мультиворонки (Standard: до 5, Pro: ∞)
- **Джерело:** ua.uspacy.support

### Контакти (Contacts)
- Конкретна фізична особа
- Прив'язка до Компанії та Угод

### Компанії (Companies)
- Юридична особа / організація
- Прив'язка до Контактів та Угод

### Активності (Activities)
- Дзвінки, зустрічі, листи по клієнту/угоді
- Прив'язка до всіх CRM-сутностей

---

## Tasks — деталі

| Вигляд | Опис |
|--------|------|
| Kanban | Drag & drop між стадіями, кастомні назви/кольори колонок |
| My Kanban | Персональна дошка |
| Deadlines Board | Автосортування по дедлайнах |
| List | Таблиця з фільтрами |
| Hierarchy | Вкладені підзавдання |

**Функції:**
- Підзавдання з власними дедлайнами та файлами
- Призначення відповідального, учасників, спостерігачів
- Time Tracking (облік часу)
- Smart filters + Saved filters
- Масові дії

---

## Успішні кейси

| Клієнт | Галузь | Особливості впровадження |
|--------|--------|--------------------------|
| Optima Hotels & Resorts | Готелі | CRM + Tasks + Groups + Smart Objects. Кастомні поля для корпоративних клієнтів, контактних осіб, поїздок, фінансових цілей. Починаючи з літа 2022. |
| (інші) | різні | https://uspacy.com/successstories/ |
