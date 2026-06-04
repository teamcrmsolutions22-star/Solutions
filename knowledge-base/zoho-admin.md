# Zoho CRM — Адміністрування та Налаштування

## Ролі та Профілі

**Roles = Які ДАНІ бачить користувач:**
- CEO → всі дані
- Sales Manager → свої + дані підлеглих
- Sales Exec → тільки свої
- Налаштування: Setup → Users & Permissions → Roles

**Profiles = Що користувач може РОБИТИ:**
- Admin: повний доступ, import/export, конфігурація
- Standard: вводити і керувати даними, без адміна
- Custom: обмежити конкретні дії (заборонити import, export, тільки перегляд звітів)
- CRM Plus: дозволи по-застосунково (Campaigns, Support, SalesIQ, Survey, Projects)

**Data Sharing Settings:**
- Default: private (тільки власні записи)
- Public: всі бачать все
- Public Read-Only: всі бачать, але не редагують
- **Best practice:** почни з restrictive, розширюй за потребою

---

## Звіти та Дашборди

### Три типи звітів
| Тип | Графіки? | Групування |
|-----|---------|------------|
| Tabular | Ні | Ні |
| Summary | **Так (тільки цей)** | До 3 рівнів |
| Matrix | Ні | X / Y вісь |

### Побудова звіту
1. Головний модуль (max 1) + до 3 пов'язаних
2. Тип → колонки → групування → розрахунки (sum/avg/min/max)
3. Фільтри дат (відносні: current fiscal year, last 3 quarters)
4. Advanced filters; AND/OR логіка
5. Зберегти в папку (sharing: public/private/group/role/territory)
6. Графік → Dashboard

### Дашборди
- Old UI: max 6 компонентів; New UI: max 10
- Drill-down на графіку → відкриває базовий звіт
- Report Scheduler: надсилати не-Zoho emails; сховати модуль Reports від repів

### Zoho Analytics (Advanced)
- Увімкнути: CRM → Advanced Analytics add-on
- Синхронізує всі модулі; 20+ готових дашбордів
- Drill: quarter → month → week → day
- Pivot з period-over-period % порівнянням
- Data blending: CRM + зовнішні таблиці (actual vs. target)
- Sharing: per-user permissions, фільтр по критеріях, iframe embed, Web Tab в CRM

---

## Імпорт даних

| Формат | Max записів |
|--------|-------------|
| Excel / VCF | 5,000 |
| CSV Standard | 5,000 |
| CSV Enterprise | 20,000 |
| Розмір файлу | 5 MB |

**Правила:**
- Перший рядок = заголовки колонок
- Формат дати: MM/DD/YYYY (точно)
- Валюта: без символів і ком (поле залишиться пустим)

**Обробка дублів:**
| Опція | Поведінка |
|-------|-----------|
| Clone | Без перевірки; все імпортується |
| Skip | Перевірка по email; існуючий залишається |
| Overwrite | Перевірка по email; імпортований виграє |

**Best practices:**
- Перший стовпець в list views = клікабельний елемент
- Web Form Lead Approval — перевіряти перед потраплянням в базу (блокує ботів)

---

## Управління дублями

**Запобігання:**
- Setup → Customization → Layouts: "Do not allow duplicates on email field"
- Import з опцією Skip

**Очищення:**
- Індивідуально: Record → More Actions → Find and Merge Duplicates → порівняння поле за полем; нотатки і активності зливаються
- По модулю: Tools → Deduplicate → пошук по email, phone
- **НЕ видаляй просто** — втратиш нотатки, активності, історію

---

## Якість даних

- Використовуй pick lists для: Country, State, Industry, Lead Source, Lead Status
- Приклад помилки: "US" + "USA" + "United States" → фільтр пропускає 70%+ записів
- Однаковий формат телефону (вчи команду стандарту)
- Currency поля: ніяких символів або ком при імпорті

---

## Lead Management

- Джерела: web forms, соціальні мережі, events (import), campaigns, card scanner
- Конвертація: створює Contact + Account + (optional) Potential одночасно
- **Custom field transfer mapping обов'язковий** — налаштуй до запуску або втратиш дані
- Nurturing: шаблони email, auto-responders (Enterprise), drip через Campaigns

### Assignment Rules
- Setup → Automation → Assignment Rules
- Round-robin; по geography, product, department

### Pipeline
- Stage History: відслідковує дні в кожній стадії → duration reports
- Expected Revenue = Amount × Probability %
- Competitors tab: відслідковувати конкурентів і feedback
- Contact Roles: decision maker, influencer, тощо

### Активності
- **Tasks:** to-do, НЕ в календарі
- **Events:** в CRM calendar; sync Google/Outlook; запрошувати contacts, leads, users
- **Calls:** auto-log через PhoneBridge
- **Calendar Booking:** embed у вебсайт або email signature
- **RouteIQ:** географічна маршрутизація для польових продавців

### Email Deliverability
- Setup → Email → Email Deliverability → Add Domain
- Додати SPF + DKIM DNS записи → підвищує inbox delivery

---

## Масові операції

- **Mass Update:** вибрати записи → mass update (одне поле за раз)
- **Spreadsheet view:** редагувати кілька полів на кількох записах одночасно
- **Mass Transfer:** передати всі записи звільненого співробітника новому власнику
- **Mass Delete:** краще ставити статус "Dead Lead" / "Junk" замість видалення
- **Backup:** 2 безкоштовних backup/місяць → zip всіх модулів
