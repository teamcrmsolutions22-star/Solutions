# Odoo Purchase, Project, Planning, Appointments, Surveys, Expenses — Knowledge Base (Video Transcripts)

---

## PURCHASE

### Основи закупівель та RFQ

- **RFQ (Request for Quotation)** — запит комерційної пропозиції. Основний документ для закупівель, до підтвердження якого не є Purchase Order.
- Дашборд Purchase app показує: кольорові блоки вгорі — всі RFQ бази, менші блоки внизу — RFQ, призначені поточному користувачу.
- Створення RFQ: `Orders → Requests for Quotation → New`. Вказуємо постачальника, Order Deadline, продукти.
- **Vendor rules (правила постачальника)**: якщо кількість досягає мінімального порогу — ціна автоматично змінюється на знижкову (налаштовується у Vendor Pricelist на картці продукту).
- Новий продукт можна створити прямо з рядка RFQ через `Create and Edit`.
- Кнопка **Send RFQ** генерує e-mail з вкладеним PDF. Статус змінюється на `RFQ Sent`.
- Після підтвердження постачальника → кнопка **Confirm Order** → статус змінюється на Purchase Order.
- Smart button **Receipts** з'являється після підтвердження PO; через нього підтверджується отримання товару → `Validate`.
- Для вендорів, що працюють офлайн, доступна кнопка **Print** (PDF).

#### Vendor Bill Matching (зіставлення рахунків)

- Функція доступна при наявності обох застосунків: Purchase + Accounting.
- Активація: `Accounting → Configuration → Settings → Vendor Bills → Predict vendor bill product` → Save.
- Автоматично пропонує продукти у вхідних рахунках на основі попередніх закупівель.
- Платіжні умови налаштовуються на картці постачальника (вкладка `Sales & Purchase`) — автоматично розраховують дату оплати.
- **Bill Matching workflow**: PO → Receive Products → Validate → повернутись до PO → кнопка **Bill Matching** → вибрати рядки PO → **Match** → рахунки заповнюються автоматично → Confirm → Post → Pay.
- При незбігу кількостей (отримано менше, ніж замовлено) рядки недоступні для зіставлення до вирішення розбіжності.
- Методи оплати: Manual, Checks, NACHA (банківський переказ США).

---

### Альтернативні запити (Alternative RFQs)

- Використовується для порівняння пропозицій від кількох постачальників — як у держзакупівлях (тендери), так і у приватному бізнесі.
- Активація: `Purchase → Configuration → Settings → Purchase Agreements → Purchase Alternatives` → увімкнути і зберегти.
- **Workflow**:
  1. Створити RFQ для першого постачальника, надіслати.
  2. Вкладка **Alternatives** → `Create an Alternative` → обрати іншого постачальника. Опція `Copy Products` копіює рядки з оригінального RFQ.
  3. Для нового RFQ, створеного незалежно → `Link to Existing RFQ` → вибрати пов'язані RFQ.
  4. Кнопка **Compare Products** → сторінка порівняння всіх пропозицій.
- Odoo автоматично підсвічує зеленим: найдешевшу одиницю, найдешевшу загальну вартість, найшвидшу очікувану доставку.
- Після вибору постачальника → `Confirm Order` → popup запитує: залишити або **Cancel Alternatives** (скасувати решту RFQ).

---

### Бланкетні замовлення (Blanket Orders)

- **Blanket Order** — довгострокова угода з постачальником на отримання товарів частинами протягом певного часу (на відміну від одноразового великого замовлення).
- Активація: `Purchase → Configuration → Settings → Purchase Agreements` → увімкнути.
- Шлях: `Orders → Purchase Agreements → New`. У полі **Agreement Type** обрати `Blanket Order`.
- Поля: Vendor, Agreement Validity (дати початку і кінця дії), Products (загальна кількість і ціна).
- Після підтвердження бланкетного замовлення → кнопка **New Quotation** → створює RFQ з продуктами та цінами з угоди. Для кожного RFQ встановлюється кількість (частина від загальної) та дата доставки.
- Замовлення вважається закритим, коли всі RFQ перетворені на PO (не обов'язково оплачені).
- На сторінці бланкетного замовлення показується загальна витрачена сума і статус кожного RFQ.
- **Різниця між Blanket Order і Purchase Template**:
  - Blanket Order: великий обсяг розбивається на кілька поставок від одного постачальника; кількість у RFQ за замовчуванням = 0.
  - Purchase Template: шаблон для швидкого повторного замовлення; кількість копіюється з шаблону. Постачальник може бути різним.

---

### Контроль рахунків (Bill Control)

- Налаштування: `Purchase → Configuration → Settings → Invoicing → Bill Control`.
- Два режими:
  - **Ordered Quantities** — рахунок можна створити одразу після підтвердження PO.
  - **Received Quantities** — рахунок доступний лише після отримання хоча б частини замовлення.
- Глобальне налаштування можна перевизначити на рівні окремого продукту (`Products → purchase tab → Vendor Bills → Control Policy`).
- **Three-Way Matching** (тристороннє зіставлення): порівняння PO, рахунку та квитанції про отримання — гарантує оплату лише за отриманий товар. Увімкнення: в тих самих налаштуваннях поруч з Bill Control.
- Статус `Nothing to Bill` на PO означає, що товар ще не отримано (при режимі Received Quantities).
- Статус у полі `Billing Status` на вкладці `Other Info` PO: `Waiting Bills`, `Fully Billed` тощо.

---

### Погодження та попередження

- **Purchase Order Approval**: `Purchase → Configuration → Settings → Orders → Purchase Order Approval`. Встановлюється мінімальна сума (наприклад, $500) — RFQ вище цієї суми вимагають схвалення менеджера.
- Право на створення PO без схвалення: рівень доступу `Administrator`. Користувачі з рівнем `User` — мають отримувати схвалення.
- Зміна прав: `Settings → Manage Users → профіль користувача → Purchase = User`.
- **Warnings (попередження)**: `Purchase → Configuration → Settings → Orders → Warnings` → увімкнути.
  - Два типи: `Warning` (сповіщення, не блокує) та `Blocking Message` (повністю блокує замовлення).
  - Налаштування на постачальнику: `Orders → Vendors → Internal Notes → Warning`.
  - Налаштування на продукті: `Products → Purchase tab → Warning When Purchasing`.
- Статус RFQ, що очікує на схвалення: `To Approve`. Менеджер бачить їх у списку RFQ.
- Після схвалення: кнопка **Approve Order** на формі RFQ → стає Purchase Order.

---

### Шаблони закупівель (Purchase Templates)

- Активація: та сама опція `Purchase Agreements` у налаштуваннях.
- Шлях: `Orders → Purchase Agreements → New`. У полі `Agreement Type` обрати `Purchase Template`.
- Поле `Vendor` — необов'язкове (можна використовувати шаблон з різними постачальниками).
- Додаємо продукти з кількостями та цінами → Confirm.
- Кнопка **New Quotation** — створює RFQ з копіями продуктів, кількостей та цін із шаблону (можна редагувати).
- Smart button `RFQ/Orders` показує всі RFQ, створені за цим шаблоном, з датами підтвердження та очікуваної доставки, та загальною сумою.
- **Vs Blanket Order**: в шаблоні кількість копіюється; у blanket order — кількість = 0 за замовчуванням.

---

### Прайс-лист постачальника (Vendor Pricelist)

- Налаштовується на продукті: `Products → Purchase tab → Vendor Pricelist`.
- Поля: Vendor, Price, Min. Quantity (мінімальна кількість для застосування ціни), Delivery Lead Time.
- Порядок у списку важливий: перший постачальник обирається за замовчуванням при автоматичному поповненні (reordering rules).
- Знижка: можна задати як пряму ціну або через поле `Discount` (увімкнути через іконку слайдерів у рядку).
- При виборі постачальника у новому RFQ та зміні кількості ціна і знижка застосовуються автоматично.
- **Масовий імпорт**: `Purchase → Configuration → Vendor Pricelist` → вибрати записи → `Action → Export` (Excel або CSV) → заповнити → `Action (шестерня) → Import Records → Upload File → Import`.
- Очікувана дата доставки у RFQ автоматично розраховується на основі Delivery Lead Time з прайс-листа.

---

### EDI: Purchase-to-Sales Order

- **EDI (Electronic Data Interchange)** дозволяє імпортувати PO покупця у базу продавця як Sales Order без ручного введення.
- Формат: XML (UBL 3.0 — стандарт для закупівель і рахунків).
- **Workflow покупця**:
  1. Створити та підтвердити RFQ → PO.
  2. Постачальник через портал бачить PO → кнопка **Connect with Your Software** → копіює URL XML або завантажує XML-файл.
- **Workflow продавця**:
  1. `Sales → Upload` → вибрати XML-файл → Sales Order створюється автоматично з усіма даними: клієнт, продукти, кількості, ціни.
  2. XML-файл зберігається у чаттері для трасування.
- Якщо PDF містить вбудований UBL — OCR не потрібен і кредити не витрачаються.
- Якщо UBL відсутній — OCR зчитує дані з PDF (витрачаються кредити).

---

### Що нового в Purchase (Odoo 19)

- **Новий дашборд**: повністю перероблений UI з KPI — On-Time Delivery (командний і особистий), Time to Order. Кольорові фільтри: `Late RFQ`, `Not Acknowledged`.
- **Vendor Acknowledgement**: відстеження підтвердження отримання PO постачальником. Постачальник може підтвердити через портал; якщо ні — менеджер дзвонить або надсилає повторно.
- **Suggest (AI-допомога при замовленні)**:
  - Кнопка `Suggest` в каталозі товарів при створенні RFQ.
  - Вводиться кількість днів поповнення → Odoo пропонує продукти виходячи з місячного попиту, залишків на складі та прогнозу.
  - Параметр `Based on`: Last 7 days / Last 30 days / Previous year period — вибір бази для розрахунку.
  - Можна додати відсоток росту (наприклад, +50% для зростаючого бізнесу).
- **Завантаження PDF/XML-квотацій від постачальника**: перетягни PDF у RFQ → Odoo автоматично заповнює рядки продуктів через OCR або UBL. Нерозпізнані продукти позначаються жовтим.
- **Мінімальна сума замовлення (avoid delivery fees)**: попередження на формі PO, якщо сума нижче ліміту постачальника. Раніше з'являлося лише при виборі постачальника вручну — тепер показується навіть у RFQ, згенерованих автоматично (reordering rules, MTO).
- **Price Comparison** (смарт-кнопка): порівняння поточної ціни з попередніми покупками по всіх рядках одразу.
- **Ручне введення ціни**: якщо ціну відредаговано вручну — при зміні кількості вона вже не перераховується автоматично.
- **Group RFQ**: на картці постачальника можна налаштувати групування замовлень (наприклад, щотижня щопонеділка) — всі автоматичні replenishment-замовлення для цього постачальника об'єднуються в один RFQ.
- **Упаковки (Packaging)**: тепер один продукт може мати кілька варіантів упаковки від різних постачальників (наприклад, pack of 6). Конверсія розраховується автоматично.

---

## PROJECT & TIMESHEETS

### Основи проєктів та завдань

- **Kanban view** — основний вигляд проєкту. Колонки = стадії (stages). Drag & drop для переміщення завдань між стадіями.
- Створення проєкту: вказати назву, увімкнути Timesheet (якщо потрібне відстеження часу) і Billable (для виставлення рахунків клієнту).
- Поля завдання: назва, відповідальний (assignee), дедлайн, пріоритет (зірочки), теги, опис (з підтримкою checklist), виділений час, активності.
- **Статус завдання** (окрім стадії канбану): In Progress, Changes Requested, Approved, Done. Відображається кольоровим індикатором на картці Kanban.
- З картки Kanban без відкриття завдання: встановити пріоритет, запланувати активність, призначити людей, вибрати колір.
- Коли завдання позначається як Done — воно архівується, але залишається видимим у стадії (сірим кольором). Стадію можна згорнути (fold).

---

### Стадії та статуси

- **Стадії проєктів** (project stages, окрім task stages): увімкнути в `Configuration → Settings → Project Stages`.
- Показують де проєкт знаходиться в своєму life cycle: New, In Progress, In Review, Done, Cancelled тощо. Стадії drag & drop.
- Стадії Done та Cancelled за замовчуванням згорнуті (folded) у Kanban.
- На рівні стадії: `gear → Edit` — налаштувати e-mail або SMS шаблон для автоматичного сповіщення клієнта при переході проєкту в цю стадію.
- `gear → Archive All` — архівує всі проєкти в стадії.
- **Статуси проєктів** (project statuses): показують як проєкт поживає, незалежно від стадії. Кольорова крапка поруч з назвою проєкту.
  - Варіанти: On Track, At Risk, Off Track, On Hold тощо.
  - Прогрес-бар у верхній частині колонки стадії відображає агрегований статус проєктів.

---

### Автоматизації

- Automations у проєкті активуються через Studio (`gear icon → Automations`).
- Кожна автоматизація складається з **Trigger** (тригер) і **Action** (дія).
- Приклади тригерів: Tag is Added, Stage is Set to (назва стадії), тощо.
- Приклади дій: Add Follower, Create Activity, Send Email, тощо.
- Автоматизація, встановлена через шестерню стадії, за замовчуванням має тригер "Stage is Set to [ця стадія]".
- Дії Create Activity: можна задати тип (Call, Email, тощо), заголовок, дедлайн (відносний — наприклад, +2 дні від тригера), відповідального.
- Автоматизації застосовуються до конкретного проєкту; список наявних автоматизацій видно у тому ж меню.

---

### Top Bar (верхня панель)

- Активується кнопкою слайдерів у правому верхньому куті Kanban view проєкту.
- Дозволяє переглядати та редагувати пов'язані записи (Timesheets, Expenses, Sales Orders, Vendor Bills, Project Dashboard тощо), не виходячи з застосунку.
- Список доступних вкладок залежить від встановлених застосунків.
- Записи, додані через top bar, автоматично прив'язуються до аналітичного рахунку проєкту.
- Можна створювати і зберігати **custom views** (фільтри) у top bar: застосувати фільтр → `sliders → Save View` → назвати → опційно поділитися з колегами.
- Налаштування top bar — індивідуальне (per user, per project), спільне після явного sharing.

---

### Підзавдання та залежності

#### Subtasks

- Доступні без додаткового налаштування. На картці завдання вкладка **Subtasks**.
- Підзавдання за замовчуванням не прив'язані до жодного проєкту — не з'являються в Kanban view проєкту.
- Щоб subtask відображалося в Kanban: відкрити subtask → встановити поле `Project` → вибрати потрібний проєкт.
- Subtask може належати до іншого проєкту (різні workflows).
- З Kanban картки батьківського завдання можна відмічати виконання підзавдань напряму.
- Smart button `Parent Task` видно у subtask для навігації до батьківського завдання.

#### Task Dependencies

- Активація: `Project → Configuration → Settings → Task Dependencies`.
- Після увімкнення: у кожному завданні з'являється вкладка **Blocked By**.
- Блоковане завдання отримує статус `Waiting` у Kanban view.
- У батьківському завданні з'являється smart button з кількістю заблокованих завдань.
- **Gantt view** — найкращий спосіб візуалізувати залежності: завдання зображені лінією-зв'язком.
  - Нові завдання можна створювати прямо з Gantt view (клік на потрібний часовий слот).
  - Залежності задаються перетягуванням від червоної крапки одного завдання до іншого.
- Можна вимкнути dependencies для конкретного проєкту: `Project → Settings → Task Dependencies (uncheck)`.
- **Auto Plan**: автоматичне планування завдань з урахуванням робочого графіку, відпусток, свят, dependencies, зайнятості виконавця.

---

### Повторювані завдання (Recurring Tasks)

- Активація: `Project → Configuration → Settings → Recurring Tasks`.
- На формі завдання поруч із дедлайном з'являється кнопка `Recurrent`.
- Налаштування: інтервал (Daily, Weekly, Monthly, тощо), конкретний день тижня/місяця, кількість повторень або "forever".
- При закритті завдання (Done або Cancelled) автоматично створюється наступне завдання з оновленою датою. Інші атрибути (assignee, опис, теги) — копіюються.
- Для скасування рекурентності: клікнути на іконку рекурентності в останньому завданні серії → прибрати → зберегти.

---

### Створення завдань (email, форми, SO)

#### З email

- Налаштування email-аліасу: `Project → Settings → Create Tasks by Sending Email to [alias]`.
- Лист на цю адресу → автоматично створює завдання у проєкті.
- На рівні Kanban стадії: `Edit → Email Template` → при переміщенні завдання в цю стадію клієнту-відправнику автоматично надсилається підтвердження.

#### З веб-форм (website contact form)

- На сайті Odoo: `Edit → Contact Form → Action → Create Task → Project → [вибрати проєкт]`.
- Заповнення форми відвідувачем → завдання у проєкті.

#### З Sales Orders

- На картці продукту (тип Service): поле `Create on Order` — вибрати `Task`, `Project & Task`, або `Project`.
- Після підтвердження SO: smart buttons `Projects` та `Tasks` з'являються на формі SO.
- **Project Templates** для SO: налаштувати шаблонний проєкт з фіксованими завданнями → у продукті `Project Template = [шаблон]`.
  - При кожному продажу — створюється нова копія шаблонного проєкту для цього конкретного клієнта.
  - Завдання можуть мати попередньо налаштовані виконавців, пріоритети тощо.

---

### Білінг завдань (Invoicing Project Tasks)

Три основні типи виставлення рахунків (встановлюються на продукті-сервісі):

1. **Fixed Price**: клієнт оплачує фіксовану суму незалежно від витраченого часу. Фактичний час у timesheets не впливає на інвойс.
2. **Based on Timesheets**: клієнт оплачує фактично відпрацьований час. Інвойс = реальні часові витрати з timesheet.
3. **Based on Delivered Quantity**: кількість для виставлення рахунку оновлюється вручну на Sales Order. Корисно для послуг, де кількість може змінюватися (кількість лекцій, сесій тощо).
4. **Based on Milestones**: окремий тип — рахунок виставляється при досягненні milestone (детальніше — у секції Milestones).

- Поле `Timesheets to Invoice` у налаштуваннях: враховувати всі або лише validated timesheets.
- Overrun (перевитрата часу) для Fixed Price: зайвий час відображається червоним, але рахунок виставляється лише за первинну суму.

---

### Milestones

- Активація: `Project → Configuration → Settings → Milestones`.
- Milestones — project-specific. Шлях: `Project → (⋮) → Milestones → New`.
- Завдання прив'язуються до milestone через поле `Milestone` на формі завдання.
- Milestone стає `Ready to Mark as Reached` (зелений), коли всі пов'язані завдання виконані.
- Milestone може бути поміченим як `Reached` навіть без прив'язаних завдань.
- **Invoicing by Milestones**:
  - На продукті-сервісі: `Invoicing Policy → Based on Milestones`.
  - Після підтвердження SO → smart button `Milestones` (створюється 1 milestone за замовчуванням).
  - Кожному milestone присвоюється відсоток від загальної ціни.
  - При відмітці milestone як `Reached` → на SO `Delivered` оновлюється на відповідний відсоток → можна виставити частковий інвойс.

---

### Оцінки клієнтів (Customer Ratings)

- Активація: `Project → Configuration → Settings → Customer Ratings`.
- На рівні Kanban стадії: `gear → Edit → Rating Email Template → Task: Rating Request`.
- Після переміщення завдання в цю стадію клієнту автоматично надсилається email з emoji-шкалою оцінки.
- Клієнт кликає на смайлик → переходить у portal → може залишити коментар.
- **Automatic Kanban Status**: при позитивній оцінці → статус завдання `Approved` (зелена крапка); при нейтральній/негативній → `Changes Requested` (жовта крапка).
- Reporting: `Project → Reporting → Customer Ratings` — агрегована аналітика по клієнтах і виконавцях.

---

### Кастомізація проєкту

- Налаштування проєкту: `Project → (⋮) → Settings` (або `Edit`).
  - Назва завдань: за замовчуванням `Tasks`, можна перейменувати на `Tickets`, `Requests` тощо.
  - Customer (клієнт проєкту), Tags, Planned Dates, Project Manager.
  - Allocated Time (потребує встановленого Timesheets) — показується на картці Kanban.
  - Description: Rich text editor з командами `/` (checklist, media, files тощо).
- Кольорове маркування проєктів на Kanban.
- Активності на рівні проєкту (не окремого завдання) — з'являються у to-do і нотифікаціях.

#### Видимість та колаборація

- Три рівні видимості проєкту:
  1. **All Internal Users** — всі внутрішні користувачі.
  2. **Invited Portal Users and All Internal Users** — + запрошені зовнішні користувачі (клієнти, підрядники). Режим: Read Only або Editable.
  3. **Invited Internal Users** (приватний проєкт) — тільки ті, кого явно запрошено.
- Зовнішній (portal) доступ: `Project → Settings → Followers → Add Followers` (для всього проєкту) або dodavання людини як assignee/follower до конкретного завдання.
- Portal users з Editable access: можуть переміщати завдання між стадіями, редагувати description, коментувати, змінювати статус.
- Odoo 19: новий варіант видимості — **Internal and Portal Users** (private project + можливість запрошення portal users).
- В Odoo 19 portal users отримали доступ до **Gantt view** через portal.

---

### Дашборди та прибутковість

#### Project Dashboard

- Доступ: `Project → (⋮) → Dashboard` або через top bar.
- Показує smart buttons з агрегованими даними: Vendor Bills, Timesheets, Sales Orders тощо.
- Секція Milestones — можна відразу позначити як досягнуті.
- Секція Project Profitability: витрати та доходи по категоріях (timesheets, purchase orders, expenses тощо).
- Секція Budget (якщо налаштований аналітичний бюджет).
- Дашборд підлаштовується до проєкту — показує лише релевантні смарт-кнопки.
- **Project Updates**: `New Update` → фіксується знімок дашборду (profitability, milestones, budget, activities) + ручні нотатки і відсоток прогресу. Зберігається для порівняння в часі.

#### Project Profitability (Прибутковість)

- Потребує: Analytic Accounting увімкнено в Accounting settings.
- Всі записи, створені через top bar проєкту, автоматично отримують аналітичний рахунок проєкту.
- Costs відображають: employee timesheets (розраховуються за `Hourly Cost` з картки Employee → Settings), purchase orders, vendor bills, expenses тощо.
- Revenues: invoiced amounts, down payments, milestones.
- Дані оновлюються в реальному часі.

---

### Timesheets

- Вигляди: Weekly grid (за замовчуванням), Monthly.
- Колірне кодування підсумків: зелений = норма годин за договором, червоний = брак, чорний = овертайм.
- Курсивні завдання = завдання з виділеним часом, де ще є відкриті години.
- **Способи логування**:
  1. Вбудований таймер у Timesheets app: `Start` → вибрати проєкт і завдання → `Stop`.
  2. Клавіатурні скорочення (наприклад, клавіша F) для швидкого старту/зупинки таймера.
  3. Кнопка `Start` безпосередньо на формі завдання.
  4. Ручне введення рядка timesheet (мінімальний інтервал — 15 хвилин).
  5. **Mass entry** (Odoo 19): у Calendar view вибрати діапазон дат → `Add` → вказати проєкт, завдання, час → одразу створюється кілька записів.
- **Валідація timesheet**:
  - Менеджер переглядає timesheets підлеглих: `Timesheets → To Validate`.
  - Вибрати період, скоригувати (якщо потрібно), `Validate`.
  - Approver визначається на картці Employee → `Work Information → Approvers → Timesheet`.
  - Можна валідувати окремі записи через list view → `Actions → Validate`.
- **Odoo 19 — кольорове кодування в All Timesheets**: зелений = норма, з кольором = понад або менше норми. Легко знаходити помилки/невідповідності.
- **Odoo 19 — clickable reports**: в Task Analysis натиснути на частину діаграми → деталізація записів, що увійшли до цього сегменту.

---

### Що нового в Projects (Odoo 19)

- **Project Templates** (нова реалізація):
  - При створенні проєкту → опція вибрати шаблон.
  - Шаблон містить: налаштування, задачі з описами і підзадачами, dependencies, виділений час.
  - **Project Roles**: шаблон може мати ролі (Project Manager, Business Analyst, Developer). При створенні проєкту за шаблоном → вибрати конкретних людей на ролі → завдання автоматично призначаються.
  - **Automatic Scheduling**: дати завдань розраховуються від дат проєкту за алгоритмом auto-plan (враховує графік роботи, відпустки, holidays, dependencies).
  - Auto-plan тепер підтримує flexible working calendars.
- **Task Templates**:
  - Шаблон для завдання зі стандартним описом, підзадачами, виділеним часом.
  - Прив'язка до продукту: при продажу сервісу — завдання створюється за шаблоном.
  - Перегляд шаблонів: `Filter → Templates`.
- **Priority Levels**: тепер 3 рівні пріоритету (раніше — 1 зірочка).
- **Subtask Toggle**: перемикач у Kanban для відображення/приховування підзавдань у контексті всього проєкту.
- **Gantt view improvements**:
  - Квартальний масштаб (Quarter).
  - Popover картки замінено Kanban-картою (функціональний, редагований).
  - Вихідні дні займають менше місця (folded).
  - **Рескедулювання залежностей** — 3 режими:
    1. Keep Buffer: при зсуві завдання — буфер між залежними завданнями зберігається.
    2. Use Buffer: буфер поглинається при рескедулюванні.
    3. Manual: залежні завдання не рескедулюються, конфлікти позначаються помаранчевою/червоною стрілкою.
  - Okupancy project managers: у Gantt проєктів показується завантаженість PM.
- **Milestones у Top Bar** (нова дія в Odoo 19).
- **Portal View improvements**: новий рівень видимості `Internal and Portal Users`, portal users отримали Gantt view.
- **Masquerade Timesheets**: нова можливість для приховування деталей timesheet.
- **Clickable Reports**: у Task Analysis клік на сегмент → деталі.

---

## PLANNING

### Основи планування змін

- Ролі та ресурси: `Planning → Configuration → Roles`. Кожен співробітник може мати кілька ролей, одна — Default Role.
- Матеріальні ресурси (техніка, транспорт): також можна планувати через ролі (`Configuration → Resources → New`).
- Робочий графік задається на картці Employee (`Work Information → Working Hours`).
- Shift можна:
  - Повторювати (щотижня, щомісяця тощо) — опція при створенні.
  - Зберегти як шаблон (`Save as Template`).
  - Publish → співробітникам надсилається email зі змінами.

- **Режими перегляду**: Weekly Gantt (за замовчуванням), Monthly Calendar (новий в Odoo 19), Daily.
- **Auto Plan**: автоматичне призначення співробітників на відкриті зміни.
  - Враховує: Working Hours, capacity, time off, public holidays.
  - В Odoo 19: підтримка flexible та fully flexible working schedules.

- **Planning Portal**: співробітники без доступу до Odoo backend бачать свій розклад через e-mail посилання → планувальний portal.

---

### Управління змінами

#### Свап та де-призначення

- **Shift Switch**: співробітник через portal запитує обмін зміни → зміна залишається призначеною, але відкривається для інших колег тієї самої ролі (`I take it`).
- **Unassign feature**: `Planning → Configuration → Settings → Allow Unassignment` → увімкнути. Можна задати дедлайн (наприклад, не пізніше ніж за 1 день до зміни). Після де-призначення → зміна переходить у список відкритих для інших.
- Менеджер бачить запити на обмін безпосередньо на картці зміни.

#### Odoo 19: Mass Shift Creation

- **Calendar view**: нова сторінка планування. Вибір декількох співробітників + декількох дат → `Add` → вибрати шаблон зміни → зміни створюються для всіх обраних, з урахуванням індивідуального графіку.
- Odoo пропускає створення зміни: якщо день є non-working day для даного співробітника, якщо є public holiday.
- Mass publish/delete: вибрати кілька змін → `Publish/Send` або `Delete`.

#### Odoo 19: Smart PDF Printing

- `Action → Print` → PDF з кольоровим timeline-layout замість чорно-білого списку.
- Групування: by Resource, by Role, by Project, by Sales Order.
- Доступно з Gantt та Calendar view.

#### Odoo 19: Planning & Attendance Report

- Новий звіт: порівнює планований час зі змін і фактичний час відвідуваності (з Attendance app).
- Метрики: Attendance Time, Attendance Cost, Planned Time, Planned Cost, Time Difference, Cost Difference.
- Допомагає виявити перевантажених або недостатньо завантажених співробітників.

#### Odoo 19: Employee Planning Preview

- `Action → Preview → [вибрати співробітника]` → відкривається portal view цього співробітника.
- Видно: опубліковані зміни, відкриті зміни, зміни для обміну.

#### Odoo 19: Інтеграція з Rental

- Матеріальні ресурси (техніка) можна синхронізувати з Rental app.
- На картці Resources: `Sync Shifts and Rental Orders` → при оренді автоматично створюється shift для ресурсу → запобігає подвійному бронюванню.
- З Gantt можна безпосередньо створити rental order для ресурсу або прив'язати shift до наявного rental order.
- На rental product: `Plan Services for [Role]` → при оренді автоматично планується shift для ролі.

---

## APPOINTMENTS

### Основи бронювання

- **Resources** (ресурси): `Configuration → Resources → New`. Поля: Name, Capacity (кількість осіб), Shareable (дозволяє декільком бронювати той самий слот), додатковий прив'язаний ресурс, Description.
- **Appointment Type** — основний об'єкт. Кнопка `New`. Параметри:
  - Preset: Meeting, Phone Call, тощо.
  - Title, image, Duration, Location, Video Conference link.
  - `Booked By`: Users або Resources (при виборі Resources → з'являється поле для вибору ресурсу + `Manage Capacities` для обмеження кількості).
- **Availability tab**: розклад доступності (за замовчуванням копіює Company Working Hours з обідньою перервою).
- **Questions tab**: `Add a Line → New` → тип відповіді (Multi-line text, тощо), placeholder, mandatory, reusable.
- **Communications tab**: intro/confirmation pages, email і SMS нагадування (default: email за 3 год, SMS за 1 год), booking/confirmation email templates.
- **Options tab**: Allow Invitations, Auto Confirmation, Display Pictures, Create Opportunity (CRM), Upfront Payment, Schedule (Weekly / Flexible), Allow Booking (within N days, at least N hours before).
- Публікація: `Go to Website → toggle Unpublished → Published`.

---

### Інтеграція з CRM (Opportunities)

- Опція `Create Opportunity` на вкладці Options appointment type — потребує встановленого CRM app.
- Відповіді клієнта на питання при бронюванні автоматично переносяться у CRM лід.
- Ліди з'являються у потрібній стадії пайплайна з усіма контактними даними і відповідями.
- У чаттері lead'у видно заплановану зустріч.

---

### Гнучке розкладування (Flexible Scheduling)

- В Options tab: `Schedule → Flexible` (замість Weekly).
- При гнучкому розкладі: тривалість залежить від слотів (немає фіксованого Duration); поле `Allow Bookings within N days` зникає (керується через слоти Availability).
- У вкладці Availability — немає стандартних часових рядків; потрібно вручну додавати `Add a Line` → вибрати дату, час початку і кінця.
- Клієнт може бронювати лише в рамках зазначених слотів.
- Повернення до Weekly: Options → Schedule → Weekly → Availability відновлюється зі стандартним розкладом.
- Корисно для нерегулярних подій (ремонти, разові сезонні пропозиції, side jobs).

#### Odoo 19: новини в Appointments

- **Capacity on User**: тепер можна задати capacity безпосередньо на user (раніше — лише на resource). Раніше перетворення user на resource руйнувало Google Calendar sync.
- **Restrict Slots to User**: в одному appointment type можна обмежити певного user тільки його слотами (без дублювання типу для кожного виконавця).
- **Flexible schedule для User**: якщо user/employee має side job — можна вказати гнучкий графік зі специфічними слотами (не прив'язаними до стандартного робочого тижня).
- **Gantt view**: при створенні зустрічі з Gantt view — Duration автоматично підтягується з конфігурації appointment type.
- **Reuse Question Templates**: шаблони питань можна повторно використовувати між різними appointment types.
- **AI Voice Transcript**: у зустрічі можна запустити запис голосу → автоматичне резюме розмови.
- **Bulk Publish**: вибрати кілька appointment types у list view → опублікувати одним кліком.
- **Google Reserve Integration**: синхронізація з Google Business Profile — кнопка `Reserve` для клієнтів прямо у Google.
- **Calendar view on Resources**: новий вид для ресурсів (раніше лише для users).
- **Appointment type recurrence**: на рівні зустрічі (через Calendar app) можна налаштувати recurrence — слоти стають динамічними і не пропонуються повторно.

---

## SURVEYS

### Основи опитувань

- Дашборд показує: назва, кількість питань, середня тривалість, кількість учасників, кількість завершених, progress bar (Pass/Certified).
- Кнопки на кожному рядку: Share, Test, See Results, Start Live Session, End Live Session.
- 4 пресети при створенні: Survey, Live Session, Assessment, Custom. При Custom — доступні всі опції. Тип впливає на набір полів у вкладці Options.
- **Options tab** — 4 секції:
  1. **Questions**: Pagination, Progress Display, Question Selection (All / Randomized per Section — недоступно в Live Session), Allow Roaming (повернення до попередніх сторінок).
  2. **Participants**: Access Mode (Anyone / Invited People Only), Require Login, Limit Attempts.
  3. **Time & Scoring**: Survey Time Limit (хвилини), Scoring (No Scoring / Scoring with Answers at the End / Scoring with Immediate Answers), Required Score (%), Is a Certification (вибір сертифікату + email template для успішних).
  4. **Live Session**: Session Code (кастомізований), Session Link (для поширення), Reward Quick Answers.
- **Description tab**: текст на першій сторінці опитування.
- **End Message tab**: повідомлення після завершення.
- Smart button `Participations`: список всіх учасників.

---

### Питання та секції

- **Типи питань**:
  - Multiple Choice: Only One Answer / Multiple Answers Allowed.
  - Multiple Lines Text Box — відкрита відповідь (довгий текст).
  - Single Line Text Box — коротка відповідь (email, username тощо). Додаткова опція: Validate Entry (min/max limits + error message).
  - Numerical Value — числова відповідь (з можливістю min/max).
  - Scale — шкала з кастомними підписами (Not Likely → Extremely Likely).
  - Date / DateTime.
  - Matrix — рядки відповідей × варіанти оцінки. Типи матриці: One Choice Per Row / Multiple Choices Per Row.
- **Options tab** у питанні:
  - Mandatory: обов'язкова відповідь + кастомне повідомлення про помилку.
  - Show Comments Field: відкрите поле для коментаря (для "інше" тощо). Comment Message — підказка. Comment is an Answer — врахувати як валідну відповідь.
  - Conditional Display — тригерна логіка (детальніше в секції нижче).
  - Live Session options.
- **Секції**: `Add a Section` між питаннями → текстовий заголовок.
- Рандомізація по секціях: в Options → `Randomized per Section` → у кожній секції з'являється поле "кількість питань для випадкового відбору".
- Питання і секції можна перетягувати (drag & drop).

---

### Умовне відображення (Conditional Display)

- Дозволяє показувати питання лише тим учасникам, що дали певну відповідь на попереднє питання.
- Налаштовується на вкладці **Options** кожного питання → секція **Conditional Display** → `Triggering Answer`.
- Іконка `fork` на питанні в списку = є умовна логіка; hover → tooltip пояснює умову.
- Дозволяє один опитувальник покривати різні продукти/сегменти без дублювання форм.
- Приклад: `Which product did you purchase? → Erggo Chair` → показати питання про headrest лише тим, хто обрав Chair.
- Кнопка `Test` — попередній перегляд від імені учасника для перевірки логіки.

---

### Живі сесії (Live Sessions)

- Режим: вибрати `Live Session` пресет (або Custom + увімкнути в Options).
- При Live Session деякі параметри обмежені (наприклад, Pagination).
- Scoring рекомендується вимкнути для презентаційних сесій.
- Session Code: кастомізований (наприклад, `EXPO2025`) → стає частиною Session Link.
- Старт сесії: кнопка `Create Live Session` → відкривається **Session Manager** (нова вкладка).
  - Session Manager: QR code, Session Link, лічильник учасників.
  - Питання НЕ відображаються учасникам до натискання `Start`.
  - Результати оновлюються в реальному часі (bar graphs).
  - Кнопка `Next` → перехід до наступного питання.
  - Учасники, що приєдналися пізніше, бачать поточне питання і одразу беруть участь.
- Відповіді учасників можуть визначати напрямок презентації (умовна логіка).
- `Reward Quick Answers`: бонус за швидкі відповіді.

---

## EXPENSES

### Реєстрація витрат

#### Категорії витрат

- Шлях: `Configuration → Expense Categories`. Поля: Name, Cost (0 = задається при введенні), Internal Reference (код для email), Expense Account, Taxes, Reinvoice (No / At Cost / Sales Price), Company (для split).
- **Фіксована вартість**: якщо Cost > 0 — виплата фіксована незалежно від суми чека (типово для mileage).
- **Mileage**: Cost = сума за одиницю (за милю/км); кількість = відстань.
- Якщо Cost > 0 — витрату не можна розділити (split).
- `Sales Price` у Reinvoice: дозволяє додати маржу до ціни клієнту.

#### Способи реєстрації витрат

1. **Сканування чеку** (`Scan` → вибрати зображення/PDF): Odoo через OCR заповнює description, суму, дату (потребує кредитів, якщо digitize автоматично).
2. **Завантаження (`Upload`)**: перетягнути або вибрати файл.
3. **Drag & Drop**: перетягнути PDF/зображення прямо на дашборд expenses.
4. **Email**: надіслати лист на alias expenses. Subject: `[Internal Reference] [сума]`, прикріпити чек → автоматично створює expense record. Активація: `Configuration → Settings → Incoming Emails`.
5. **Вручну**: `New` → заповнити всі поля.
6. **Odoo Mobile App**: для реєстрації в дорозі.

- **OCR Digitization**: `Configuration → Settings → Expense Digitalization → Digitize Automatically`.
- **Paid By**: Employee (буде відшкодовано) або Company.
- **Customer to Reinvoice**: прив'язати витрату до Sales Order клієнта.

#### Split Expense

- Кнопка `Split Expense` — розділяє один запис на кілька (наприклад, готель на 2 кімнати для 2 співробітників, або номер + конференц-зал).
- Поля: Description, Employee (різні виконавці), Total для кожної частини.
- Сума частин має дорівнювати оригінальній — поки не збігається, відображається червоним.
- Недоступно, якщо в категорії Cost > 0.

---

### Витратні картки (Expense Cards)

- Фізичні або віртуальні картки для оплати корпоративних витрат без попередніх особистих виплат співробітника.
- Використовує **Stripe** як платіжний процесор.
- Вимоги: Stripe account + Accounting app + Expenses app.
- Активація: `Expenses → Configuration → Settings → Expense Card` → Save → Connect Stripe account.
- Поповнення балансу: `Accounting → Stripe Issuing → Top Up` (реквізити через бухгалтерію; ~2-3 робочі дні).
- Конфігурація картки: `Expenses → Cards → New`.
  - Cardholder, тип (Physical/Virtual).
  - **Spending Policy**: Countries (де можна використовувати), Categories (які типи витрат дозволені), Per Transaction limit, Per All Time limit.
  - Активація: кнопка `Activate`.
- Картка прив'язується до конкретного заходу/місяця.
- Потребує коректно заповненого профілю Employee (телефон обов'язковий).

---

### Звіти про витрати (Expense Reports)

- Expense Report = група expense records, що подаються разом на відшкодування.
- **Статуси**: To Report (блакитний) → To Submit (блакитний на звіті) → Submitted → Approved → Done.
- **Refused** — прихований за замовчуванням; переглядається через `Status → Refused` у фільтрах.
- Автоматичне створення звіту: `Create Report` — Odoo поміщає всі non-reported витрати в один звіт.
- Ручне: `Expense Reports → New` → Add a Line → вибрати витрати → Submit to Manager.
- Менеджер бачить звіти лише своїх підлеглих (за правами approval).
- Менеджер може: видалити рядки зі звіту, прокоментувати через chatter, **Approve** або **Refuse** (з поясненням).
- Після схвалення: `Post Journal Entries` → записується в журнали.
- Варіанти виплати:
  - `Report and Next Payslip` — додається до наступної зарплати.
  - `Pay` → налаштувати журнал (Bank) і метод (Manual / Checks) → `Create Payment` → статус `In Payment`.
  - `Remove from Payslip` — скасувати нарахування через зарплату.
- Після відмови (Refuse): автоматично надсилається email з поясненням.

---

### Перевиставлення витрат клієнту (Re-invoice Expenses)

- Вимога: у категорії витрат `Invoicing = At Cost` або `Sales Price` (не `No`).
- На записі витрати: `Customer to Reinvoice` → вибрати SO клієнта.
- Після затвердження звіту менеджером і `Post Journal Entries` → витрата з'являється у SO клієнта як окремий рядок `Order Lines`.
- Рядок містить: код продукту (exp_gen), опис, суму.
- Після цього — звичайне виставлення інвойсу клієнту.

---

### Email-витрати (Email Expenses)

- Email alias для витрат: `Expenses → Configuration → Settings → Incoming Emails → alias address`.
- **Формат Subject**: `[Internal Reference категорії] [сума]` — наприклад, `HOTEL 550`.
  - Internal Reference береться з картки категорії витрат.
- Прикріпити чек (PDF або зображення) → надіслати → expense record створюється автоматично.
- Якщо включено OCR Digitization: дата, сума, опис підтягуються з чеку автоматично; потрібно лише перевірити і доповнити.
- Корисно для роботи в дорозі (фотографуєш чек на телефон → відразу надсилаєш).
