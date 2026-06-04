# Odoo Spreadsheet, Barcode, eLearning, Sign, та інші — Knowledge Base (Video Transcripts)

> Джерело: відеотранскрипти Odoo (частини 1, 2, 3). Мова: українська, технічні терміни — англійською.
> Аудиторія: Odoo-інтегратори, консультанти, сейлзи.

---

## SPREADSHEET & DASHBOARDS

### Основи Odoo Spreadsheet

- Odoo Spreadsheet вбудований у модуль Documents — не потребує окремої установки
- Імпорт Excel: підтримується через меню файлу, зберігає структуру таблиць і формули
- Доступні Excel-сумісні формули: `PROPER`, `MEDIAN`, `VLOOKUP`, `HLOOKUP`, `MATCH`, `DATEDIF`, та інші
- Pivot-таблиці: вставляються через Insert > Pivot; можна вибрати модель, поля рядків/колонок/значень, налаштувати агрегацію (sum, count, avg тощо)
- Conditional formatting: формати за правилами (колір клітинки/тексту залежно від значення)
- Freeze rows/columns: фіксація рядків і стовпців через меню View
- Стилізація таблиць: вбудовані теми оформлення, color fill, borders
- Sharing: файл ділиться через Documents, можна задати права (viewer/editor), заморозити перегляд (frozen link — знімок даних на момент відправки)

### Odoo Live Lists (функції ODOO.LIST / ODOO.LIST.HEADER)

- `ODOO.LIST(list_id, row_index, field_name)` — повертає значення поля з живого списку Odoo
- `ODOO.LIST.HEADER(list_id, field_name)` — заголовок поля
- Data Source налаштовується окремо: модель, domain-фільтр, поля, сортування
- Dot notation для related fields: наприклад `partner_id.country_id.name` — відразу тягне значення з пов'язаного запису
- Сортування задається на рівні data source, а не через локальний Excel-фільтр
- При копіюванні/вставці списку зв'язок з data source обривається — треба використовувати "reinsert" або cut/paste (а не copy/paste)
- Можна вставити кілька списків на одному аркуші з різними data sources

### Odoo Dashboards

- Dashboard = Spreadsheet, конвертований у режим Dashboard
- Глобальні фільтри на дашборді діють на рівні запиту до БД (не Excel-фільтрація), тобто відображаються тільки реально відповідні записи
- Drill-down: клік на значення → відкривається список відповідних записів в Odoo
- Carousel: кілька дашбордів можна об'єднати в слайд-шоу (режим перегляду для TV/office display)
- Frozen share link: копія дашборду на певний момент — дані не оновлюються (snapshot)
- Access rights: дашборд ділиться разом з документом; права viewer/editor контролюються на рівні Documents

### Побудова Dashboard з нуля (приклад: Commission Dashboard)

**Методологія: Prepare → Manipulate → Visualize**

1. **Prepare**: вставити Pivot з моделі Sales (Salesperson, Invoice Date, Revenue)
2. **Manipulate**: додати calculated measures через Edit Pivot:
   - `Target` — підтягується через `HLOOKUP/MATCH` або введений вручну
   - `% above Target` — `(Revenue - Target) / Target`
   - `Commission Rate` — шкала ставок залежно від % виконання
   - `Commission Amount` — `Revenue × Commission Rate`
3. **Visualize**: конвертувати в Dashboard, налаштувати глобальні фільтри

**Глобальні фільтри:**
- `relatedModel: res.users` → фільтр за продавцем
- `date by month/quarter` → фільтр за датою

**Seniority розрахунок:**
- `VLOOKUP` для отримання дати найму з HR
- `DATEDIF(hire_date, TODAY(), "Y")` → роки стажу

**Формули:**
- `PIVOT.VALUE(pivot_id, measure, [field, value, ...])` — отримати значення з pivot
- `PIVOT.HEADER(pivot_id, [field, value, ...])` — отримати заголовок

---

## BARCODE

### Типи штрих-кодів

| Тип | Застосування |
|-----|-------------|
| Code 39 | Склад, прості продукти |
| Code 128 | Найпоширеніший, ASCII-символи |
| GS1-128 | Стандарт для харчової/фарм промисловості, містить атрибути (lot, expiry, qty) |
| UPC-A / EAN-13 | Роздрібна торгівля |
| QR Code | Employee badges, multi-field encoding |

### Типи сканерів

- USB-сканер (підключається як HID-клавіатура)
- Bluetooth-сканер
- Мобільний телефон (Odoo Mobile App)
- IoT-підключені сканери (через Odoo IoT Box)

### Operation Barcodes

- Кожній операції (Receipt, Delivery, Internal Transfer тощо) можна призначити штрих-код
- Налаштування: Inventory > Configuration > Operation Types > поле Barcode
- Сканування operation barcode → одразу відкриває операцію в мобільному інтерфейсі

### Command Barcodes

Спеціальні штрих-коди для команд без сканування конкретного товару:

| Команда | Дія |
|---------|-----|
| O-BTN.validate | Підтвердити операцію |
| O-BTN.cancel | Скасувати |
| O-BTN.scrap | Відправити в брак |
| O-BTN.return | Повернення |

- Роздрукувати команди можна з: Inventory > Configuration > Settings > Print Command Barcodes

### GS1 Barcode Lookup

- У GS1-128 закодовано кілька атрибутів через Application Identifiers (AI)
- AI `01` = GTIN (product), AI `10` = lot number, AI `17` = expiry date, AI `30` = quantity
- Odoo автоматично парсить GS1-рядок і заповнює відповідні поля операції
- Налаштування: Inventory > Configuration > Settings > GS1 Nomenclature

### Призначення штрих-кодів продуктам

- Вручну: на картці продукту, поле Barcode
- Через меню конфігурації: Inventory > Configuration > Barcodes (або Products > Barcodes) — таблиця з усіма продуктами
- Bulk import через CSV:
  1. Завантажити CSV з колонками: External ID або Name, Barcode
  2. Import > увімкнути чекбокс **"I want to update data"** (інакше намагатиметься створити нові записи)
  3. Важлива відмінність: `product.template.attribute.value` (значення атрибута шаблону) vs `product.attribute.value` (глобальне значення) — для штрих-кодів варіантів використовується `product.product` (variant level)

### Друк штрих-кодів

- Друк розташувань складу: Inventory > Configuration > Settings > Print Location Barcodes
- Bulk друк етикеток продуктів: Inventory > Products > виділити > Print > Product Labels
- PDF формати:
  - 2×7 (14 на аркуш A4)
  - 4×7 (28 на аркуш A4)
  - 4×12 (48 на аркуш A4, з ціною)
- ZPL формат: для термопринтерів (Zebra та сумісних)
  - Підключення через Odoo IoT Box
  - Перегляд/тестування ZPL: labelary.com
- При друку є опція вказати кількість копій та діапазон продуктів

---

## eLEARNING

### Налаштування курсів

- Модуль: eLearning
- Типи зарахування на курс:
  - **Open** — будь-хто може записатись
  - **By Invitation** — тільки запрошені (email-invite)
  - **Paid** — потрібна оплата (інтеграція з eCommerce)
- Prerequisite courses: можна задати обов'язкові попередні курси
- Karma система:
  - Karma points нараховуються за дії: перегляд контенту, проходження quiz, участь у форумах
  - Можна задати мінімальний karma для запису на курс або перегляду контенту
  - Gamification: leaderboards, badges

### Типи контенту

| Тип | Особливості |
|-----|-------------|
| Image | Просте зображення |
| Video | URL або завантажений файл; YouTube — автозаповнення заголовку/обкладинки |
| Document | PDF, Word тощо |
| PDF | Вбудований PDF viewer |
| Quiz | Запитання з варіантами відповідей |
| Certification | Фінальний тест із видачею сертифіката |

- Google Drive: можна прикріпити файл з Google Drive (документ відкривається в iframe)
- YouTube: достатньо вставити URL, Odoo автоматично підтягує назву, обкладинку, тривалість

### Quiz та очки

- За правильну відповідь з першої спроби: 10 очок
- За другу спробу: 7 очок, і т.д. (спадаюча шкала)
- Кількість очок налаштовується вручну для кожного запитання
- Publishing: контент і курс публікуються окремо; публікація з frontend через кнопку "Publish"

---

## SIGN (Електронний підпис)

### Базовий процес підписання

1. Завантажити PDF-документ
2. Додати поля підпису: Signature, Initial, Date, Text, Checkbox, Selection, тощо
3. Задати підписантів (Signers) з порядком підписання (якщо потрібна послідовність)
4. Надіслати документ — кожен підписант отримує email
5. Після підписання всіма — всі отримують фінальний PDF
6. Certificate of Authenticity: Odoo генерує файл з хешами, датами підписання, IP-адресами

### Шаблони

- Повторювані документи (NDA, offer letter) зберігаються як templates
- Шаблон = документ з полями без заповнення; при відправці вибирається шаблон і вказуються реальні підписанти
- Інтеграція з Sales: при підтвердженні Quotation можна автоматично надіслати документ на підпис

### Що нового в Sign (Odoo 19)

- **Підписання з будь-якого модуля**: кнопка через gear icon (⚙️) "Send for Signature" доступна в будь-якому записі (Sale Order, Contract, HR тощо)
- **WhatsApp відправка**: документ на підпис можна надіслати через WhatsApp (не тільки email)
- **Document Bundles / Envelopes**: об'єднання кількох документів в один пакет для підписання за один раз
- **Linked Fields**: поля Sign-документу можуть бути прив'язані до полів Odoo-моделі → автозаповнення при відправці (наприклад, ім'я клієнта з Sale Order)
- **Default Signers**: у шаблоні можна вказати роль підписанта + прив'язати до поля моделі (наприклад, `partner_id` → Customer автоматично підставляється)
- **Stamp field**: нове поле для проставляння фірмового штампу (корисно для юрисдикцій, де потрібен мокрий штамп)
- **"It's me" authentication**: підписант може підтвердити особу через Odoo-аккаунт (замість email-верифікації)
- **SMS Validation**: підтвердження підпису через SMS-код (двофакторна верифікація для юридичної значущості)
- **Новий UI**: оновлений дизайн форми підписання

---

## LUNCH & FRONTDESK

### Lunch — Налаштування

**Vendors:**
- Назва, адреса, контактна особа
- Availability: дні тижня та часовий діапазон замовлень
- Delivery: або самовивіз, або доставка (задати вартість доставки)
- Cutoff time: час після якого замовлення на сьогодні не приймаються
- Extras: додаткові опції до страв (наприклад, "без глютену", "extra sauce")

**Locations:** можна задати кілька локацій (офіс, поверх, кімната) — для розподілу замовлень

**Product Categories:** категоризація страв (Salads, Main Course, Drinks тощо)

**Products:** назва, ціна, фото, категорія, постачальник, доступні дні

**Alerts:** повідомлення для всіх співробітників (наприклад, "сьогодні немає піци")

### Lunch — Управління замовленнями

- **Cash Moves**: поповнення особового рахунку співробітника (HR Manager або Lunch Manager)
- **Overdraft limit**: можна дозволити від'ємний баланс до певної суми
- **Today's Orders**: зведена таблиця всіх замовлень на сьогодні
  - Статуси: New → Confirmed → Received
  - Масові дії: "Send Orders" (надіслати постачальнику), "Confirm Orders"
- **Reports:**
  - Control Vendors: скільки замовлень/сума по постачальнику
  - Control Accounts: баланси співробітників
- **Pre-ordering**: замовлення на завтра/наступні дні

### Frontdesk — Налаштування

**Stations (стійки реєстрації):**
- Назва стійки, локація
- Host: відповідальна особа (отримує сповіщення про відвідувачів)
- Notification channels: Discuss, Email, SMS (або комбінація)
- Drinks menu: налаштовується окремо — що можна запропонувати відвідувачу

**Автентифікація відвідувача:**
- None (без верифікації)
- Email
- Phone (SMS)

**Self-check-in QR code:**
- Відвідувач сканує QR (роздрукований або на моніторі стійки)
- Заповнює форму самостійно → host отримує сповіщення
- Kiosk mode: окремий режим для планшету/монітору на ресепшені

### Frontdesk — Управління відвідувачами

- **Planned Visitors**: попередньо зареєстровані відвідувачі (з датою/часом) → при прибутті лише підтверджують
- **Badge printing**: інтеграція з принтером для друку бейджу з іменем та фото
- **Reports:**
  - Visitors report: всі відвідувачі за період, час прибуття/відходу
  - Drinks report: які напої замовлялись (для закупівлі)

---

## APPROVALS MANAGEMENT

### Налаштування

- Модуль: Approvals
- **Categories (категорії запитів):**
  - Назва, іконка, тип запиту
  - Approvers tab: список затверджуючих (можна задати кількох, вказати обов'язковість)
  - Approval type: Any (достатньо одного), All (всі повинні затвердити)
  - Додаткові поля форми: текст, дата, грошова сума, посилання тощо

### Процес затвердження

1. Співробітник створює Request у відповідній категорії
2. Затверджуючий бачить запит у черзі, натискає **Approve** або **Refuse**
3. Запитувач може відкликати запит: **Withdraw**
4. Весь audit trail зберігається в chatter (хто затвердив, коли, коментарі)

### Перегляд всіх запитів

- Managers: "All Approvals" view — всі запити всіх категорій
- Filters by status: To Approve, Approved, Refused, Withdrawn
- Інтеграція з Leave/Time Off: можна налаштувати Approval category для нестандартних запитів на відпустку

---

## DISCUSS & LIVE CHAT

### Odoo Discuss — Основи

- **Канали (Channels):** публічні або приватні групи для спілкування
  - Email alias: канал може мати email-адресу → листи приходять в канал
  - Privacy: Public (всі), Private (запрошені), Selected Groups
- **Canned Responses:** збережені відповіді по `:shortcut`
  - Налаштування: Discuss > Configuration > Canned Responses
  - Введення `:` в полі повідомлення → dropdown з відповідними варіантами
- **Slash commands:** `/lead`, `/ticket` тощо — для швидкого створення записів прямо з чату

### Що нового в Discuss (Odoo 19)

- **@role mentions:** тепер можна тегнути не тільки конкретного користувача, але й роль (`@Sales Manager`) — всі носії ролі отримають сповіщення
- **Picture-in-Picture відео:** під час відеодзвінку можна згорнути вікно і продовжити роботу в Odoo
- **Availability status:** зелений/жовтий/червоний статус (онлайн/зайнятий/недоступний), налаштовується вручну або автоматично
- **Time-off integration:** якщо у користувача схвалена відпустка → автоматично показується "out-of-office" widget з датами повернення
- **AI в log notes:** AI може допомогти сформулювати/відредагувати повідомлення в log note
- **Push notifications:** web push notifications для браузера без Odoo-вкладки
- **Portal users in channels:** зовнішні портальні користувачі можуть бути учасниками каналів

### Що нового в Live Chat (Odoo 19)

- **Expertise-based forwarding:** chatbot або оператор може перенаправити чат до оператора з потрібною expertise (тегом компетенції)
- **Information side panel:** при відкритому чаті — бічна панель з даними про клієнта (контакт, попередні тикети, замовлення)
- **"Looking for help" menu:** відвідувач бачить меню часто задаваних питань / тем перед початком чату
- **Concurrent chat limits:** для кожного оператора можна задати максимальну кількість одночасних чатів
- **PDF copy:** конвертація розмови в PDF одним кліком
- **External rating redirect:** після оцінки чату можна перенаправити клієнта на зовнішній сайт (Google Reviews, Trustpilot)
- **Live Chat AI Agent:** новий AI-агент, який відповідає замість chatbot'а; якщо AI не може допомогти — передає людині. Якщо AI agent активний → chatbot має нижчий пріоритет
- **Reports:** звіти по агентам (кількість чатів, час відповіді, рейтинг) та по сесіям (тривалість, теми)

---

## ЩО НОВОГО в інших модулях

### Attendance (Odoo 19)

- **Overtime Rule Sets:** нова система правил переробок
  - Можна задати: кількість годин threshold, window (тиждень/місяць), тип компенсації (pay або time-off)
  - Кілька rule sets для різних груп співробітників
- **Gantt view з фокусом на графік роботи:** Gantt показує working schedule як baseline — одразу видно відхилення
- **Time-off Ledger report:** звіт з усіма рухами балансу відпусток (нарахування, використання, залишок)
- **Kiosk presence indicator:** на kiosk-екрані видно, хто зараз зачекінований (присутній у офісі)

### Field Service (Odoo 19)

- **Role-based task assignment:** задачі призначаються за роллю виконавця, а не конкретним ім'ям → система підбирає доступного спеціаліста
- **Geolocation timer:** відлік часу прив'язується до геолокації (підтверджує фізичну присутність на об'єкті)
- **Hide unit price:** опція приховати ціну одиниці у фінансових деталях задачі (для клієнтського порталу)
- **Gantt improvements:**
  - Collapse empty columns (приховати порожні колонки)
  - Undo button
  - Portal Gantt: клієнт може бачити Gantt своїх задач у порталі
- **Calendar drag-and-drop:** переміщення задач у calendar view
- **Subcontracted services ungrouped:** субпідрядні послуги відображаються окремо (не групуються)
- **POs in profitability dashboard:** Purchase Orders включені у розрахунок прибутковості проекту

### Human Resources (Odoo 19)

- **Employee + Contract merge:** картка співробітника і контракт об'єднані в один view — менше перемикань між записами
- **Employee records versioning:** при зміні ключових полів (посада, зарплата) — автоматично зберігається попередня версія
- **Bulk operations:** масове архівування співробітників, масове створення Odoo-акаунтів
- **LMS integration:** курси eLearning прив'язуються до співробітника; tracking certifications і training attendances
- **"Time not off" (Remote work):** новий тип відсутності без впливу на баланс відпусток — для роботи вдома
- **Partial day time-off:** запит на неповний день (наприклад, 2 години)
- **Talent Pools:** кандидати групуються у пули для майбутніх вакансій
- **Idle system:** якщо кандидат довго не рухається по воронці → автоматичне сповіщення рекрутеру
- **Skill matching %:** при відкритті вакансії система показує % збігу навичок кандидата з вимогами
- **Appraisal Goal Hierarchy:** цілі організовані в ієрархію (Company → Department → Employee)
- **Goal Library:** шаблонні цілі, які можна призначати кільком співробітникам одразу

### Payroll (Odoo 19)

- **Pay Runs (замінює Batches):** новий об'єкт для групового розрахунку зарплати; краща структура статусів і валідації
- **Issue Detection:** система автоматично виявляє проблеми у розрахунку (відсутній контракт, непідтверджений work entry) і показує їх у чеклісті
- **Work Entries revamp:**
  - Тривалість без прив'язки до конкретного часу (duration only, no start/end)
  - Простіше редагування і коригування
- **Salary Inputs / Properties:** кастомні поля для нестандартних виплат (бонуси, утримання), не вимагають Python-правил
- **Multiple Bank Accounts з allocation:** співробітник може мати кілька банківських рахунків і задати розподіл зарплати між ними (%, фіксована сума)
- **Certifications:**
  - 🇨🇭 Швейцарія: ELM-сертифікація
  - 🇲🇽 Мексика: CFDI 4.0
  - 🇦🇺 Австралія: STP Phase 2
- **Salary Configurator:** покращений wizard для конфігурації пакету компенсацій при найомі

### ESG (Environmental, Social, Governance)

- Новий модуль Odoo ESG
- **CO2 розрахунок:**
  - Автоматичний розрахунок вуглецевого сліду з закупівель, операцій, подорожей
  - Emission factor databases: IPCC, ADEME (французька база, найповніша)
  - AI factor assignment: AI підбирає коефіцієнт емісії для категорії витрат
- **CSRD reporting:** відповідність European Corporate Sustainability Reporting Directive
- **Social metrics:** gender parity tracking, pay gap аналіз
- **Ціна:** €20/місяць vs ~€500 для standalone ESG-інструментів

### Documents (Odoo)

- **Folder permissions (3 рівні):**
  - None — папка невидима
  - Viewer — можна читати
  - Editor — можна редагувати і завантажувати
- **Email aliases to folders:** кожна папка може мати email-адресу → вкладення з листів автоматично зберігаються
- **Document Requests / Placeholders:** створити "запит документа" → система нагадує відповідальному завантажити потрібний файл
- **PDF split/merge:** розбити PDF на окремі сторінки або об'єднати кілька PDF в один
- **One-click actions:** "Create Vendor Bill" → документ відправляється в OCR Odoo і автоматично створюється чернетка рахунку
- **Sign integration:** відправка будь-якого документа з папки Documents на підписання (Sign)

### Bank Sync (Odoo Accounting)

- **Архітектура:**
  - Odoo ↔ OdooFin proxy ↔ 5 провайдерів: Plaid, Ponto, Yodlee, Enable Banking, Saltage
  - 26,000+ підтримуваних банків по всьому світу
- **Налаштування:** Accounting > Configuration > Banks > Sync
- **Troubleshooting:**
  - Find missing transactions: перевірити дати синхронізації, статус підключення
  - Duplicate transactions: Odoo автоматично дедублікує за online_transaction_identifier
- **Payment Initiation (через Ponto):** ініціація SEPA-переказів прямо з Odoo (не тільки читання, але й запис)
- **Online transaction identifier:** унікальний ідентифікатор транзакції від банку, використовується для дедублікації та reconciliation

---

## QUICK TIPS (корисні підказки)

> Примітка: Більшість відеофайлів серії "Odoo Quick Tips" містили лише технічні артефакти (порожній аудіо, нечіткий транскрипт: "heat heat", "foreign", одиночні символи). Корисний контент із цих відео недоступний.

### Доступні Quick Tips

З технічних Q&A сесій ("Odoo Insider") були виділені такі практичні поради:

**Multi-company Email Signatures (Qweb):**
```xml
<t t-if="user.company_id.id == COMPANY_ID">
  <!-- підпис для компанії A -->
</t>
<t t-else="">
  <!-- підпис для інших компаній -->
</t>
```
- Використовується `t-if` умова в шаблоні підпису для різних юридичних осіб

**Product Variant Import через CSV:**
- При імпорті варіантів у CSV треба коректно вказувати `product.template.attribute.value` (зв'язок шаблон → атрибут → значення)
- Відмінність: `product.attribute.value` — глобальне значення атрибута; `product.template.attribute.value` — прив'язка до конкретного шаблону
- Для штрих-кодів варіантів використовується модель `product.product` (рівень конкретного варіанту)

**BoM Archiving Automation:**
- При зміні версії Bill of Materials через PLM → стара версія архівується автоматично
- Можна налаштувати автоматизацію (Automated Actions) на archiving старих BoM при активації нової ревізії

**Product Attribute Modes:**
- `Dynamic`: варіант створюється тільки коли його вибрали в Sales Order (економить кількість variants у базі)
- `Instantly`: всі комбінації створюються одразу при збереженні шаблону
- `No Variant`: атрибут відображається при замовленні, але окремий product.product не створюється

---

## ODOO 19 ОГЛЯД

### Ключові теми Odoo 19 (зі загального огляду "Meet Odoo 19's best features")

**Sales / CRM:**
- **Quote on the fly:** каталог товарів у пропозиції з секціями та підсекціями
  - Опції: приховати ціни (`Hide Prices`), приховати склад (`Hide Composition`)
  - Примітки до позицій (`Notes`)
  - Швидке додавання товарів з фільтром по категоріях
- Покращений Sales configurator

**Accounting:**
- Bank Sync: 26,000+ банків, troubleshooting tools
- AI-assisted reconciliation

**Manufacturing / Inventory:**
- Shop Floor improvements
- PLM (Product Lifecycle Management): ревізії, ECO-процеси

**HR Suite:**
- Повне злиття Employee + Contract
- Pay Runs замість Batches
- Talent Pools + Skill Matching

**Discuss & Collaboration:**
- @role mentions
- AI в log notes
- Picture-in-Picture відеодзвінки

**New Modules:**
- ESG (Environmental, Social, Governance)
- AI module (окремий набір AI-інструментів)

### Odoo AI (Odoo 19) — огляд можливостей

- **AI Fields:** будь-яке текстове поле в Odoo може мати AI-асистента (генерація, покращення тексту)
- **AI Document Sorting:** Documents module — автоматична класифікація і розкладання документів по папках
- **AI-Powered Applicant Screening:** аналіз резюме, скоринг кандидатів по навичках
- **AI Helpdesk Ticket Routing:** автоматичний розподіл тикетів по командах на основі теми
- **AI Live Chat Agent:** відповідає на запити клієнтів, передає людині якщо не може
- **AI Packing Instructions for 3PLs:** генерація інструкцій пакування для third-party logistics
- **AI-Assisted Workflows:** suggestions для наступних дій у процесах
- **AI Agents (загальна концепція):** автономні AI-агенти, які можуть виконувати складніші багатокрокові задачі в Odoo
- **Analyzing Analytic Budget Reports with AI:** AI-аналіз бюджетних звітів, виявлення відхилень

---

## MISC

### Odoo OWL (JavaScript Framework) для розробників

- **OWL** = Odoo Web Library — власний реактивний JS-фреймворк (схожий на Vue.js/React)
- **Assets Bundles:** `web.assets_backend`, `web.assets_frontend`, `web.assets_qweb` — де реєструвати JS/CSS файли
  - В `__manifest__.py`: `'assets': {'web.assets_backend': ['module/static/src/...']}`
- **Registry:** механізм реєстрації компонентів, widgets, services
  ```js
  import { registry } from "@web/core/registry";
  registry.category("fields").add("my_widget", MyWidget);
  ```
- **patch() function:** monkey-patching існуючих компонентів Odoo без fork
  ```js
  import { patch } from "@web/core/utils/patch";
  import { SomeComponent } from "@some_module/path";
  patch(SomeComponent.prototype, { 
    myMethod() { /* override */ }
  });
  ```
- **Hoot testing framework:** замінює старі JS tours у v18+
  - Юніт-тести для OWL компонентів
  - Команда: `odoo-bin --test-enable --test-tags hoot`
- **Odoo Studio:** Add a Field — генерує кастомні поля без коду (для нетехнічних адміністраторів)

### Технічні поради з Odoo Insider Q&A

- **Регіони даних (Data Centers):** при підключенні через API важливо вказати правильний регіон (EU, US) в base URL — різні endpoints для різних регіонів
- **COQL (CRM Object Query Language для Zoho):** не плутати з Odoo domain filters — це різні системи. В Odoo фільтрація через Python domain: `[('stage_id.name', '=', 'Won')]`
- **Webhook налаштування в Odoo:** Automated Actions (тип = "Execute Code" або "Send Webhook") → тригери на create/write/delete
- **Bulk операції через XML-RPC/JSON-RPC:** `execute_kw` з методом `write` або `create` підтримує масові операції (список ID для write)
- **Debugging в Odoo:**
  - Увімкнути debug mode: `?debug=1` в URL або через Settings > Activate Developer Mode
  - `?debug=assets` — для дебагу JS без мінімізації
  - Technical menu з'являється в Settings при активному debug mode

### Відео без корисного контенту (для довідки)

Наступні файли містили тільки технічні артефакти транскрипції і не надали корисної інформації:
- `What_is_Odoo_in_two_minutes.md` (арабські/нечіткі символи)
- `Odoo_Quick_Tips_-_It's_me_integration_[Sign].md`
- `Odoo_Quick_Tips_-_SMS_Validation_[Sign].md`
- `Odoo_Quick_Tips_-_Tax_Return_[Accounting].md`
- `Odoo_Quick_Tips_-_Subscriptions_for_storable_products_[Sales].md`
- `Odoo_Quick_Tips_-_Recurring_tasks_[Project].md`
- `Odoo_Quick_Tips_-_Payment_Term_Installments_[Accounting].md`
- Більшість інших Quick Tips файлів у part3
