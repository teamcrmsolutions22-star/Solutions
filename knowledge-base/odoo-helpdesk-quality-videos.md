# Odoo Helpdesk, Quality, PLM, Field Service — Knowledge Base (Video Transcripts)

---

## HELPDESK

### Огляд та налаштування команд

**Що таке Helpdesk:**
- Додаток для організації клієнтської підтримки: створення команд, призначення тікетів, відстеження прогресу
- Головна сторінка — overview dashboard: метрики тікетів, рейтинг задоволеності клієнтів, відсоток успішних тікетів

**Створення Helpdesk-команди:**
- Configuration → Help Desk Teams → New
- Поля: назва, опис (відображається на клієнтському порталі — не писати внутрішню інформацію)
- Visibility (видимість у базі): All Internal Users / Invited Internal Users / Invited Portal Users and Internal Users
- Поле «Follow all team tickets» — підписка конкретних співробітників на всі тікети команди (єдиний спосіб запросити до private-команди)

**Автоматичне призначення тікетів:**
- Automatic Assignment: рівномірно розподіляє нові тікети між членами команди
- Два режими:
  - **Equal number of tickets** — рівна кількість тікетів на людину (не враховує поточне навантаження)
  - **Equal number of open tickets** — враховує поточну кількість відкритих тікетів (рекомендується для рівномірного навантаження)
- Після увімкнення необхідно додати членів команди у відповідне поле

**Стадії тікет-пайплайну:**
- Стадії організовані у Kanban-view, можна перетягувати картки та стадії
- Кнопка «+ stage» — створення нової стадії
- Параметри стадії (через gear icon → Edit):
  - **Folded in Kanban**: якщо checked, стадія завжди згорнута і тікети в ній вважаються закритими
  - **Teams**: стадію можна ділити між кількома Helpdesk-командами (не треба створювати заново)
  - **Email Template**: автоматичний email при переміщенні тікета у стадію; підтримує Dynamic Placeholders (ім'я клієнта, номер тікета тощо)
  - **SMS Template**: SMS-повідомлення при переміщенні; потребує In-App Purchase токенів
- Всі стадії всіх команд — Configuration → Stages

---

### Тікети: створення та обробка

**Ручне та автоматичне створення:**
- Тікети можна створювати вручну всередині бекенду
- Три канали автоматичного створення: Email Alias, Website Contact Form, Live Chat

**Email Alias:**
- При створенні команди автоматично генерується email alias (назва команди)
- Тема листа стає назвою тікета, тіло листа — у Description + Chatter
- Автоматична відповідь клієнту згідно email template, заданого на першій стадії пайплайну

**Website Contact Form:**
- Активується в налаштуваннях команди (Help Center → Website Form)
- Компанія обирає які поля показувати (обов'язкові поля помічені *)
- Стандартно: Name, Email, Subject (залогінені клієнти — поля заповнюються автоматично)
- Після відправки клієнт отримує номер тікета; може переглядати тікет через customer portal
- Для website form опис проблеми відображається лише у вкладці Description (не в Chatter, на відміну від email)

**Пріоритет і теги:**
- Пріоритет: 0–3 зірки (3 зірки — вгорі у Kanban та List view)
- Теги — для категоризації та звітності; можна додавати кілька

**Конвертація тікета в Opportunity (CRM):**
- Кнопка «Convert to Opportunity» (видима лише якщо встановлено CRM; якщо увімкнено Leads — «Convert to Lead»)
- Можна вибрати існуючий customer record або створити новий
- Тікет архівується після конвертації — виключає дублювання контакту з клієнтом

**Закриття тікетів:**
- Переміщення у Folded stage автоматично закриває тікет
- **Closure by Customers** (Self-Service): клієнти можуть самостійно закривати тікети через portal
- **Automatic Closing**: закриття тікетів після N днів неактивності
  - Move to Stage: вказати цільову (folded) стадію
  - After: кількість неактивних днів (за замовчуванням 7)
  - In Stages: стадії, в яких ODU шукає неактивні тікети (порожнє = всі стадії)

**Rotting tickets (неактивні тікети):**
- Активується у Self-Service → Automatic Closing → Auto Close Reminder
- На кожній стадії можна задати кількість днів після яких тікет вважається «гнилим»
- Вгорі стадії — червоний лічильник гнилих тікетів; окремі тікети позначені червоною іконкою
- Auto Close Reminder: автоматичний email клієнту за N днів до закриття (за замовчуванням 2 дні)

---

### SLA (Service Level Agreements)

**Призначення:**
- SLA описує стандарт сервісу та терміни виконання, які компанія гарантує клієнтам
- Прострочені SLA автоматично позначаються червоним на тікет-картці

**Активація:**
- Для кожної Helpdesk-команди окремо: Team Settings → Performance → SLA Policies
- Working Hours: робочий розклад, який ODU враховує при підрахунку дедлайну

**Налаштування Working Hours:**
- Configuration → (через internal link у полі SLA)
- Часовий пояс, тривалість робочого дня (Average hours per day — важливо для part-time/contractors)
- Один робочий день = 8 годин; 2 дні = 16 годин при стандартному розкладі

**Створення SLA Policy:**
- Configuration → SLA Policies → New
- Поля: назва, опис, Help Desk Team, Priority, Tags, Customer (можна залишити порожнім = для всіх)
- Target section: Reach Stage (напр. Solved) + Within (кількість годин) + Excluding Stage (напр. Canceled)

**Відображення SLA на тікетах:**
- Після призначення SLA на тікеті відображається тег з дедлайном
- Червоний тег = SLA прострочено
- На overview dashboard: лічильник тікетів де SLA провалено

---

### Help Center (портал самообслуговування)

**Три компоненти Help Center** (всі інтегруються з Helpdesk-командою):
1. Community Forums
2. E-Learning Courses
3. Knowledge Articles

**Активація:** через Tax Settings (три точки на картці команди → Settings → Help Center section)

**Community Forums:**
- Потребує встановленого модуля Website (встановлюється автоматично при активації Forums)
- Два режими форуму: **Questions** (одна відповідь на питання) або **Discussions** (відкрита дискусія)
- Privacy: Public / Signed in / Some users
- **Karma points**: система балів — стимулює активність, карає за downvote, блокує спам
  - Приклади: +2 за питання, -1 за downvote, -100 за flag; цифри довільні, налаштовуються
- З тікета → кнопка «Share on Forums» → створення поста форуму з тегами та описом
- З поста форуму → три крапки → «Create Ticket» — зворотній шлях для чутливих питань

**E-Learning Courses:**
- Відеоконтент, PDF, quizzes; сертифікати після проходження
- Можна додавати відео по URL (ODU автоматично тягне thumbnail, назву, тривалість)
- Published курси — з зеленим банером; непубліковані — не видні клієнтам
- Preview vs. enrolled content: окремі уроки можна позначити як preview (без реєстрації)

**Knowledge (База знань):**
- Collaborative Library: команда редагує, клієнти читають
- При обробці тікета: іконка Knowledge у правому верхньому куті chatter → пошук → знаходить статтю → надсилає як повідомлення
- З порталу: клієнти можуть переглядати Knowledge articles через Help Center → Browse Articles
- Видимість: можна обмежити статті — деякі лише для внутрішнього використання

---

### After-Sales функції

**Активація:** Configuration → Help Desk Teams → команда → прокрутити вниз до After Sales

**П'ять after-sales функцій:**
1. **Refunds** — видача кредит-ноти (повна або часткова); кнопка «Refund» на тікеті
   - Автоматично підтягує останній sales order та invoice клієнта
   - Reverse (draft credit note) або Reverse and Create Invoice (posted credit note + draft invoice)
2. **Coupons** — генерація промокоду знижки; відправка клієнту по email
3. **Returns** — повернення товару: створює warehouse transfer + return label
4. **Repairs** — відкриття repair order; дані з тікета переносяться у Notes секцію repair
5. **Field Service** — кнопка «Plan Intervention»; створює task у Field Service project
   - Можна вказати окремий project board для тасків з Helpdesk
   - Навіть без прав доступу до Field Service можна відкрити task через smart button

---

### Відстеження та білінг часу

**Активація:** Configuration → Help Desk Teams → команда → Track and Bill Time
- **Timesheets**: трекінг часу на тікетах; потребує вибору проекту для зберігання timesheet
- **Time Billing**: білінг часу назад клієнту

**Два сценарії білінгу:**

**Prepaid (Fixed Price):**
- Product: тип Service, Create on Order = Task, Invoicing Policy = Prepaid / Fixed Price
- Продати продукт у SO → підтвердити → виставити invoice → отримати оплату → почати виконання
- На тікеті: Sales Order Item field підтягує SO автоматично за ім'ям клієнта
- У вкладці Timesheets на тікеті: бачить залишок куплених годин

**Billable by Timesheets (Time & Material):**
- Product: Invoicing Policy = Based on Timesheets
- SO підтверджується, але invoice не можна виставити поки немає recorded timesheets
- Після виконання роботи: виставляється invoice на основі фактично залогованих годин
- Delivered column у SO оновлюється автоматично після логування часу

---

### Оцінки клієнтів

**Активація:** Team Settings → Performance → Customer Ratings

**Після активації:**
- Опція публікувати рейтинги команди на сайті (portal users можуть бачити рейтинги за останній місяць)
- Посилання «Set an email template on stages» → переходить до списку стадій

**Email template для рейтингу:**
- Встановлюється на стадії Solved: pre-loaded template «Ticket Rating Request»
- Клієнт отримує email із трьома емотиконами (happy / neutral / sad) + текстове поле для коментаря
- При Live Chat: рейтинг автоматично запитується при завершенні чату (тасінг кнопки X)
  - Якщо нейтральна/негативна оцінка — з'являється текстове поле для пояснення
  - Клієнт може залишити email для отримання транскрипту чату

**Важливо:** якщо LiveChat увімкнений для команди, рейтинг після чату запитується автоматично (окремий email не потрібен)

---

### Звітність Helpdesk

**Reporting → три типи звітів:**

**1. Ticket Analysis:**
- За замовчуванням: кількість тікетів по командах (bar chart, кольори = стадії)
- Measures (числові показники): Count, Average Hours to Respond, Hours Open, Hours to First Response тощо
- Зміна формату: bar / line / pie chart; стекований або не стекований; порядок сортування
- Group By: Assigned To, Customer, Team, Stage тощо
- Використання: порівняти навантаження агентів, відстежити час відповіді

**2. SLA Status Analysis:**
- За замовчуванням: Pivot table
- Рядки = SLA policy; Колонки = статуси (failed/success)
- Розгортання (+): деталізація до конкретного агента
- У pivot view можна додавати кілька measures одночасно
- Можна перемикати на Graph view; export в Excel

**3. Customer Ratings:**
- За замовчуванням: Kanban view
- Group By: Help Desk Team — для зручного перегляду
- При відкритті конкретного рейтингу: тікет, агент, коментар клієнта
- Toggle visibility: internal (для внутрішнього аналізу) або показати на portal

**Live Chat звітність** (лише через Live Chat app):
- Sessions History — перегляд транскриптів
- Session Statistics — середня кількість повідомлень, тривалість сесії
- Operator Analysis — кількість сесій на оператора (включно з chatbot)

---

## QUALITY CONTROL

### Основи контролю якості

**Ключові концепції:**

**Quality Check** — ручна або автоматична перевірка продукту на відповідність специфікаціям.
Типи перевірок:
- **Pass/Fail** — найпоширеніший; співробітник вирішує: пройшло чи ні
- **Take a Picture** — обов'язкове завантаження фото; автоматично проходить при валідації (можна відхилити після review)
- **Measure** — замір проти Norm + Tolerance; якщо поза діапазоном — fail
- **Spreadsheet** — заповнення ODU spreadsheet; прохідність визначається значенням Success Cell (True/False)
- **Worksheet** — заповнення кастомної форми (worksheet template); умови успіху налаштовуються окремо

**Quality Control Point (QCP)** — налаштована контрольна точка, що автоматично тригерить перевірку в заданий момент процесу.
- Без QCP якісна перевірка НЕ тригериться автоматично
- Прив'язується до: Product або Product Category, Operation (Receipts / Manufacturing / Delivery), Work Order Operation

**Quality Alert** — сповіщення команди якості про виявлений дефект.
- Містить: Root Cause, Description, Corrective Actions, Preventative Actions
- Створюється вручну або автоматично при fail check (якщо задано у «Message If Failure»)
- Можна створити з: manufacturing order, inventory order, shop floor, quality app

**Quality Teams** — команди для обробки різних типів перевірок; мають email alias для сповіщень

---

### Контрольні точки (Control Points)

**Налаштування QCP:** Quality app → Quality Control → Control Points → New

**Основні поля:**
- **Product / Product Category**: для категорії — задати широкі правила (напр. температура зберігання для всіх продуктів категорії Office Furniture)
- **Operations**: Receipts (вхідні поставки), Manufacturing, Delivery
- **Work Order Operation**: прив'язка до конкретного кроку виробничого процесу (лише для Manufacturing)
- **Type**: тип перевірки
- **Control Per**: Product / Lot / Order; після ODU 18.2 — вибір failure location доступний для будь-якого типу

**Вкладки QCP:**
- **Instructions**: детальний опис що перевіряти (відображається оператору під час перевірки)
- **Message If Failure**: інструкція при провалі (напр. «Створи quality alert, вкажи постачальника і номер відвантаження»)
- **Notes**: внутрішні нотатки (не показуються оператору)

**Порядок виконання QCP:**
- При кількох QCP для одного продукту — виконуються у порядку переліку на сторінці Control Points
- Порядок змінюється drag & drop за handle-іконкою

---

### Типи перевірок якості

**Pass/Fail:**
- Найпростіший тип; кнопки Pass / Fail на формі перевірки або у popup на MO
- Зелена Smart Button = всі пройшли; червона = є провали

**Take a Picture:**
- QCP tab «Message If Failure» відсутній (перевірка автоматично проходить при validate)
- Після validate quality employee може вручну перевести у Fail (кнопка Fail на формі quality check у Quality app)
- Підтримує «Create Alert» для проблемних фото

**Measure Check:**
- QCP fields: **Norm** (ідеальне значення + одиниця виміру), **Tolerance** (From / To)
- При вводі значення поза допустимим діапазоном: fail → з'являються кнопки «Confirm Measure» та «Correct Measure»
- Correct Measure — повернутися і ввести правильне значення
- Confirm Measure — підтвердити fail (навмисний)

**Spreadsheet Check:**
- Створення шаблону: Quality app → Configuration → Quality Spreadsheet Templates
- **Success Cell** field: вказує клітинку, значення якої визначає результат (True = pass)
- В шаблоні через формули (IF, AND тощо) прив'язати результати інших клітинок до success cell
- Data Validation → Checkbox: для зручного введення True/False
- **Conditional Formatting**: кольорові індикатори (зелений = pass, червоний = fail)
- **Gauge Chart**: Insert → Chart → Gauge для візуалізації вимірів; налаштовуються Thresholds та кольори

**Worksheet Check:**
- Потребує активації у Manufacturing app: Configuration → Settings → Operations tab → Quality + Quality Worksheet
- Шаблон: Quality app → Configuration → Quality Worksheet Templates → Design Template (відкриває ODU Studio)
- В Studio: drag & drop поля — Text, Date, Checkbox, Selection, Image, Signature тощо; налаштування Required / Label / Tooltip
- **Success Conditions** на QCP: правила на основі полів шаблону; наприклад «Assembly Complete is set»

---

### Перевірки при вхідних поставках

**Навіщо:**
- Зупиняє неякісні матеріали до запуску у виробництво
- Стандартизує перевірки незалежно від досвіду оператора складу
- Документує стан товарів при надходженні (фото, нотатки)

**Налаштування QCP для Receipts:**
- Operations = Receipts (або конкретний warehouse receipt)
- При надходженні товару на складі з'являється кнопка «Quality Checks» на receipt order

**Workflow при провалі вхідної перевірки:**
- Оператор натискає Fail → бачить інструкцію з Message If Failure
- З'являється кнопка «Quality Alert» замість «Quality Checks»
- Quality Alert: Root Cause, Description, Corrective Actions (напр. «зв'язатися з постачальником»), Preventative Actions

---

### Прив'язка до виробничих замовлень

**Вимоги:**
- Manufacturing app, Quality app, Shop Floor module (для work order-рівневих перевірок)

**Два рівні прив'язки:**
1. **На рівні MO** (Manufacturing Order): QCP без Work Order Operation — перевірка для всього MO
2. **На рівні Work Order**: QCP з вказаним Work Order Operation — перевірка для конкретного кроку

**Обробка у бекенді:**
- На MO: purple кнопка «Quality Checks» → popup з перевірками по одній
- Quality Checks smart button (вгорі): зелений шрифт = всі пройшли, червоний = є провали

**Обробка у Shop Floor:**
- Перевірки MO-рівня: кнопка «Quality Checks» на картці MO в Shop Floor
- Перевірки work order-рівня: відображаються як крок у списку інструкцій work order
  - Перевірки work order можна обробити **ТІЛЬКИ** через Shop Floor (не в бекенді)
  - Checkmark поруч з кроком = автоматичний Pass; клік на назву кроку = відкриває popup

---

### Локації збоїв

**Призначення:**
- Автоматичне направлення неякісного товару у визначене місце на складі
- Попереджає переплутування бракованого та придатного товару

**Налаштування:**
- Inventory app → Configuration → Settings → Warehouse → Storage Locations (має бути увімкнено)
- Після цього поле **Failure Locations** з'являється на формі QCP

**Конфігурація QCP:**
- Failure Locations: вибрати одну або кілька locations (напр. «Repair Assessment Zone» та «Damaged Stock»)
- При fail: оператор бачить список failure locations і обирає куди направити товар
- Після підтвердження — transfer автоматично направляє товар у обрану локацію

**Важливо (ODU 18.2+):**
- Раніше failure location доступна лише при Control Per = Quality; тепер — для будь-якого типу QCP

---

### Звітність по якості

**Quality App Dashboard:**
- Картки по кожній quality team: кількість перевірок у прогресі та активні alerts

**Quality Checks List:**
- Quality Control → Quality Checks: всі перевірки з фільтрами та пошуком

**Quality Alerts List:**
- Відстеження всіх відкритих/закритих alerts по командах

**Загальний підхід (з App Tour):**
- QCP можна налаштувати з частотою: кожен N-й продукт (напр. кожен 10-й keycap set)
- Прив'язка до роботи в Shop Floor дозволяє оператору опрацювати все з планшета без виходу з інтерфейсу

---

## PLM (Product Lifecycle Management)

### Основи PLM

**Що таке PLM:**
- Систематичний підхід до тестування, співпраці та покращення продуктів
- Стадії: Design → Development (прототипи, тестування) → Production → Service (post-sales, feedback) → End of Life
- Includes version control: кожен ECO = нова версія BOM; можна відкотитися до стабільної версії

**Вимоги:**
- Manufacturing app + PLM app (companion до Manufacturing)

**BOM та версії:**
- У BOM: вкладка Miscellaneous → поле Version (показує поточну версію)
- При застосуванні ECO версія BOM оновлюється автоматично
- До BOM можна прикріпляти файли (напр. design file) — версіонуються разом з BOM

---

### Engineering Change Orders (ECO)

**Що таке ECO:**
- Документ для управління ревізіями продуктів
- PLM app → Engineering Changes → New ECO

**Поля ECO:**
- Назва, ECO Type, Product, BOM (якщо кілька — вибір конкретного), Responsible, Date, Notes

**Workflow:**
1. Створити ECO → кнопка «Start Revision» → копія BOM позначається Archived banner (sandbox)
2. Відкрити «Revision» smart button → редагувати BOM (компоненти, операції, тривалість)
3. На ECO автоматично з'являються вкладки **BoM Changes** та **Operation Changes** — summary diff
4. Перемістити у стадію затвердження → approve → перемістити у Final stage
5. **Apply Changes** → нова версія BOM стає активною, стара архівується

**Файли документів:**
- На ECO у вкладці Documents: можна завантажити нову версію design file; архівувати стару через «Remove»

**Важливо:**
- Поки MO у стані Confirmed — примусово використовує стару BOM (захист від змін під час виробництва)
- Якщо виникає merge conflict по work orders при Update BoM — видалити старий work order, тоді оновити

---

### Типи та стадії ECO

**ECO Types:**
- Дозволяють організувати різні категорії змін (New Product Introduction, Product Improvement, Product Updates тощо)
- Кожен тип має свій Kanban-пайплайн зі своїми стадіями
- Configuration → ECO Types → New
- Email Alias: будь-який email на цей alias → автоматично створює ECO у цьому типі (для збору feedback)
- ECO Type можна змінити лише до запуску ревізії (до натискання Start Revision)

**Стадії ECO:**
- Кожен ECO Type має власний набір стадій (Configuration → ECO Stages → Group By Types)
- На стадії налаштовується Approval (Add a Line з approver + approval type)
- Стадія з **Allow to Apply Changes** = closing stage де можна застосувати зміни
- Closing stage також: Final Stage (checked) + Folded in Kanban (checked)

---

### Процес погодження ECO

**Три типи погодження:**
1. **Is Required to Approve** — блокує перехід до наступної стадії без схвалення
2. **Approves but Approval is Optional** — не блокує, але відхилення блокує ECO
3. **Comments Only** — людина лише сповіщається та може коментувати; не впливає на рух ECO

**Approvals tab на ECO:**
- Список всіх approvers з їх статусом (pending / approved / rejected)
- Approve / Reject кнопки

**Rejected ECO:**
- Drag & drop картки назад у попередню стадію → виправити → знову просунути вперед

**Перегляд всіх approvers:**
- Configuration → ECO Stages → Group By: Types → розгорнути конкретний type → видно всі стадії та ролі

---

### Застосування ревізій до виробничих замовлень

**Проблема:** MO створений на основі старої BOM, потім BOM оновлюється через ECO.

**Рішення для Draft MO:**
- Після Apply Changes у PLM → на Draft MO з'являється червона кнопка **«Update BoM»**
- Клік → ODU автоматично застосовує нову BOM до цього MO (оновлює кількість компонентів, операції)

**Обмеження:**
- **Confirmed MO** — вже не можна оновити BOM (захист від змін у процесі виробництва)
- Якщо потрібно — доведеться скасувати та перестворити MO

**Merge conflicts:**
- При незначних змінах операцій ODU може заплутатися — видалити старий work order на MO, потім натиснути Update BoM знову

---

## FIELD SERVICE

### Кастомізація робочих листів

**Активація:**
- Field Service app → Configuration → Settings → Worksheet Templates (увімкнути)
- Після активації: Configuration → Worksheet Templates

**Створення шаблону:**
- New → дати назву → «Design Template» → відкривається ODU Studio
- Потребує встановленого Studio module

**Доступні поля для drag & drop (в Studio):**
- Text box, Date, Selection (dropdown), Checkbox, Signature, Image та інші
- Кожне поле: змінити Label, зробити Required, додати Tooltip

**Практичні приклади полів:**
- Serial Number (text) — для сервісних інженерів, що обслуговують обладнання
- Date — дата виконання роботи
- Status (selection: In Warranty / Out of Warranty) — для управління розрахунками
- Job Completed (checkbox) — підтвердження завершення
- Signature — підпис виконавця або клієнта

**Прив'язка шаблону до завдання:**
- На task: поле вибору worksheet template
- Після вибору — з'являється smart button; клік → форма для заповнення

---

### Використання карт

**Out-of-the-box функціональність:**
- На будь-якому task є посилання «View Itinerary» → відкриває Google Maps з адресою клієнта
- Корисно для мобільного використання (планшет/телефон)

**Map View:**
- Всі завдання відображаються на карті; перехід до навігації з будь-якої картки

**Розширена функціональність (Mapbox integration):**
- Field Service → Configuration → Settings → General → Map Routes → ввести Mapbox token
- Mapbox token: безкоштовний, реєстрація на mailbox.com
- Після налаштування: карта відображає маршрути між завданнями (оптимізація пересування)

---

### Нові функції Field Service (ODU 19)

**Управління проектами та завданнями:**
- **Project Templates**: тепер потрібно явно позначити проект як template (захист від випадкових змін)
- **Task Templates**: попередньо налаштований пріоритет, теги, ролі → при створенні проекту ODU автоматично призначає виконавців по ролях
- **Role-based Assignment**: при створенні проекту з шаблону — pop-up для призначення людей на ролі (Plumber, Electrician тощо)

**Геолокація:**
- Активується per-project (або через project template для default)
- При старті таймера → GPS координати логуються в chatter
- При зупинці таймера → ще один запис GPS
- Використання: перевірка timesheet при скаргах клієнтів

**Hide Unit Price:**
- Активується per-project
- Ховає ціни продуктів у worksheet report для Field Service users (не admins)
- Також приховує ціни в кнопці «Add Product» для field service операторів

**Покращення Gantt View:**
- Порожні колонки (вихідні) автоматично згортаються
- Revamped task wizard → kanban cards з гнучкою кастомізацією
- Кнопка Undo для скасування змін планування
- Gantt View доступний на portal (для зовнішніх stakeholders)

**Покращення Kanban View:**
- 3-зіркова пріоритетність (раніше 1 зірка)
- Швидке призначення виконавця з kanban view
- Загальна кнопка show/hide subtasks (замість per-subtask toggle)

**Покращення Map View:**
- Можна змінювати порядок завдань прямо на карті (не потрібно переходити до Google Maps)

**Покращення Calendar View:**
- Drag & drop для переміщення завдань між днями

**Підрядні послуги (Subcontracted Services):**
- Purchase orders тепер ungrouped by default (раніше ODU групував PO з одним постачальником)
- PO враховуються у dashboard проекту для підрахунку прибутковості (не треба чекати vendor bill)

**Звітність:**
- Графіки в Reporting стали клікабельними → деталізація без додаткових фільтрів

**Інтеграція з Online Appointments:**
- Сервіс-продукт що створює task при підтвердженні appointment → тепер переносить assignee та allocated time

**Відповідь на Q&A:**
- Геолокація прив'язана до конкретного проекту (не глобальна)
- Field Service app ≠ Planning app: Field Service для timesheets/worksheets (потребує платного доступу); Planning для управління змінами
- Skill filter у Gantt view → бере дані з Employee form → дозволяє фільтрувати техніків по навичках
- Travel time між роботами: ODU не рахує автоматично; можна групувати по zip code у Gantt

---

## SHOP FLOOR

### Огляд Shop Floor

**Що таке Shop Floor:**
- Companion module до Manufacturing app (встановлюється разом)
- Введено в ODU 16.4; замінює старий Tablet View
- Інтерфейс для планшетів: оператори обробляють work orders без бекенду

**Налаштування планшету:**
- Відкрити Shop Floor → Activate Work Centers → вибрати конкретний work center → Confirm
- Можна встановити Chrome app (hamburger menu → Install App) для обмеження доступу до інших ODU модулів

**Дашборд (Overview):**
- Показує MO що готові до старту (фільтр «Ready to Start» за замовчуванням)
- Картка MO: номер MO, продукт, кількість, перший work order, статус (Confirmed / In Progress)
- Кнопка Close Production → з'являється після виконання всіх quality checks
- Кнопка Undo після Close Production (кілька секунд до остаточного закриття)

**Options на картці MO:**
- Scrap Component — списати непридатний компонент
- Add Work Order — додати незаплановану операцію
- Add Component — додати незапланований компонент
- Open Backend MO — відкрити повний MO у Manufacturing app

**Tabs у Shop Floor:**
- **Overview** — всі MO готові до старту
- **My WO** — лише work orders призначені поточному оператору
- Вкладки по work centers — кнопка «+» для додавання нового work center у tabs

**Operator Panel:**
- Ліва бокова панель: список активних операторів
- Edit Operators → додати collaborators
- Клік на ім'я оператора → підсвічує його активний статус + фільтрує My WO до його завдань
- Кожен оператор має власний таймер по поточному work order

**Work Center View:**
- Перехід через кнопку work center на картці MO
- Картка work order: номер MO, продукт, кількість, список кроків, статус (To-do / таймер)
- Кнопки завершення: **Mark as Done** (є ще наступні work orders) або **Close Production** (фінальний)

**Options на картці Work Order:**
- Scrap, Add Component (як на MO)
- **Move to Work Center** — перенести work order на інший work center (якщо поточний недоступний)
- **Suggest Worksheet Improvement** — запропонувати зміни до інструкцій
- **Create Quality Alert** — сповістити quality team
- **Block** — зробити work center недоступним

---

### Обробка виробничих замовлень

**Передумови:**
- MO підтверджений + компоненти зарезервовані
- Для 2-step та 3-step manufacturing: завершити Pick Components transfer (тоді MO стає «Ready to Start»)
- Для 1-step manufacturing: підтверджений MO готовий якщо компоненти доступні

**Процес виконання work order:**
1. Натиснути заголовок work order → запускається таймер (логується час)
2. Виконати кроки по одному:
   - Клік на крок → відкриває popup з інструкціями
   - Чекмарк поруч з кроком → автоматичне виконання
   - Кроки можуть бути: звичайні інструкції, serial number генерація, вибір компонента (lot traceability), quality check
3. Натиснути **Mark as Done** (або Close Production якщо фінальний work order)
4. ODU автоматично активує наступний work order у черзі (відображається у відповідному work center)

**Quality Checks у Shop Floor:**
- Перевірки рівня MO: кнопка «Quality Checks» на картці MO → обробляються як popup
- Перевірки рівня Work Order: відображаються як крок у списку → можна обробити лише тут
- Після fail: кнопка «Quality Alert» замість «Quality Checks»

**Трекінг часу:**
- Таймер автоматично логує час на work order
- Кожен оператор в operator panel має власний таймер
- Дані зберігаються на MO (можна переглянути загальний час та вартість)

**Серійні номери в Shop Floor:**
- Generate Serial button: автоматична генерація серійного номера прямо у Shop Floor
- Take Photo: завантаження фото серійного номера з камери планшета
