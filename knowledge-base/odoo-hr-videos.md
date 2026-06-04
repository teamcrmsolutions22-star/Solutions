# Odoo HR (Human Resources) — відео-конспекти YouTube

> Джерело: офіційні YouTube-відео Odoo (транскрипти), 2026-06
> База: Odoo 17/18, нотатки щодо новинок v19 — окремий розділ

---

## Співробітники (Employees)

### Дашборд і базові налаштування
- Дашборд показує картки всіх співробітників: посада, контактна інформація, статус присутності
- Іконка в правому куті картки — статус: **зелена крапка** = активний у базі, **жовта** = idle/неактивний, **сіра** = поза робочими годинами
- Іконки: 🏠 домик = WFH (Work From Home), ✈️ літак = відпустка, крапка = за замовчуванням
- Активності: кольорові іконки — червоний = прострочено, жовтий = сьогодні, зелений = в майбутньому
- Доступні види: картки (kanban), список, активності

### Конфігурація (Settings → Employees)
- **Presence Display** — вмикає кольорові іконки присутності
- **Remote Work** — показує іконку будинку при WFH
- **Employee Editing** — дозволяє співробітникам самостійно оновлювати власні дані (адресу тощо)
- **Default Working Hours** — стандартний розклад (наприклад, 40 год/тиждень)

### Work Locations (Місця роботи)
- Конфігурація: Configuration → Work Locations
- Поля: назва локації, адреса, зображення (обкладинка)

### Форма співробітника — основні вкладки

**Загальна інформація:**
- Обов'язкове поле: тільки ім'я
- Відділ → автоматично підтягує менеджера та коуча
- Посада (Job Position) → автоматично заповнює Job Title вгорі
- При найманні через рекрутинг: ім'я, посада, email автоматично переносяться з картки кандидата
- Резюме (Resume tab): досвід роботи, освіта — переносяться з recruitment автоматично
- Навички (Skills): також переносяться з recruitment; додавати можна вручну (skill type → skill → рівень)
- **Наступна дата апрейзалу** — автоматично за датою найму + налаштування в апрейзалах

**Work Information:**
- Організаційна схема (справа)
- Work Address — з recruitment
- Approvers: Time Off, Expenses, Timesheets, Attendance
- Remote Work: розклад WFH по днях тижня (Пн–Нд)
- Working Schedule — з вакансії
- Planning Roles — для застосунку Planning

**Private Information:**
- Приватний email та телефон (з applicant card)
- Приватна адреса
- **Банківський рахунок** — обов'язково для виплати зарплатні (потрібно позначити "Send Money = Trusted")
- Work-Home Distance — може впливати на оподаткування
- Приватний номер авто (Private Car Plate)
- Сімейний статус, кількість дітей
- Громадянство, ІПН/соцстрахування — для W2 (US localization)
- Дозволи на роботу (Work Permit) — для іноземних працівників
- Рівень освіти

**Payroll tab:**
- Пов'язаний із застосунком Payroll
- Юридичне ім'я, статус сімейного стану, утримувані особи — автозаповнення
- Federal/State Tax Filing Status
- Registration Number (обов'язково для payroll)
- W4 та W2 форми (US localization)

**Settings tab:**
- Employee Type, Related User (не всі співробітники = користувачі)
- Attendance/POS PIN — для кіоска відвідуваності
- **Badge ID** — генерується кнопкою, після чого стає кнопкою "Print Badge" → PDF для ID-картки
- Hourly Cost — впливає на вартість продуктів (manufacturing)
- Fleet Mobility Card

### Масові операції (v19)
- Архівування кількох співробітників одночасно: вибір → Actions → Archive → wizard з причиною звільнення
- Масове створення користувачів: вибір → Actions → Create User → підтвердження (з перевіркою ліцензій)

---

## Відділи (Departments)

### Дашборд відділів
- Канбан-вигляд: назва відділу, менеджер, кількість співробітників
- На картці відділу видно (з пов'язаних застосунків):
  - Запити на відпустку (Time Off app)
  - Запити на виділення відпустки (Allocations)
  - Нові кандидати (Recruitment app)
  - Підтверджені апрейзали (Appraisals app)
- Кліком на цифри → детальні списки

### Структура відділу
- Поля: назва, менеджер, **Parent Department** (батьківський відділ — для ієрархії)
- Колір — для візуальної організації (наприклад, усі виробничі = жовті)
- Шаблон апрейзалу та опитування для відділу
- Організаційна схема — показує дочірні відділи та кількість співробітників

### Режими перегляду
- Канбан (за замовчуванням)
- Список — сортування за алфавітом, групування за Parent Department
- **Hierarchy View** — як сімейне дерево: розгорнути дочірні відділи кнопкою "Unfold"

### Smart Buttons на формі відділу
- **Employees** — список співробітників
- **Plans** — плани онбординг/офбординг для цього відділу

---

## Контракти (Contracts)

> Важливо: без активного контракту співробітник не отримає зарплатню — на дашборді Payroll з'являється попередження.

### Створення контракту
- Доступ: з форми співробітника → вкладка Payroll → Contract Overview
- Або через Payroll → Employees → вибрати співробітника
- **Load a Template** — завантажити шаблон контракту (наприклад, "Summer Interns")
- Поля: дата початку, дата закінчення (для тимчасових), годинна/місячна/річна ставка
- ODO автоматично розраховує суміжні значення (наприклад, річна вартість з годинної ставки)
- **Work Entry Source** — звідки беруться записи роботи: з Attendances або з розкладу

### Підпис контракту
- Кнопка **Signature Request** → email-вікно з налаштуванням ролей (хто підписує де на PDF)
- Потрібен застосунок **Sign** для підпису контрактів
- Поле "Person Responsible" = хто стежить за підписом

### Версії співробітника (Employee Versions)
- При зміні контракту (наприклад, підвищення зарплати) — нова версія зберігається
- Кнопки з датами у верхньому правому куті форми = попередні версії
- Можна переглядати зарплату та умови в будь-який минулий момент

### Масове оновлення контрактів (Index Contracts)
- Employees → список → вибрати групу → Actions → **Index Contracts**
- Ввести % підвищення → Confirm → всі контракти оновлюються

### Нове в v19 (Злиття контракту та профілю)
- Контракт та профіль співробітника **об'єднані**: всі поля контракту тепер у вкладці Payroll форми співробітника
- Окремої моделі "Contract" більше немає
- Версіонування залишається: нова версія = новий запис з датою

---

## Онбординг / Офбординг

### Плани активностей (Activity Plans)
- Configuration → Activity Plans
- Поля плану: назва, модель (Employee), відділ (якщо dept-специфічний)
- Для загального онбордингу — поле Department порожнє
- Для конкретного відділу — вказати відділ (наприклад, Carpentry)

### Налаштування кроків плану
Кожен рядок у "Activities to Create":
- **Activity Type**: зустріч, підпис документу, to-do тощо
- **Document to Sign** (якщо Request Signature): вибрати документ з Sign app
- **Employee Role**: хто підписує на документі
- **Assignment**: Ask at Launch / Default User / Coach / Manager / Employee / Fleet Manager
- **Interval**: через скільки днів/тижнів/місяців після (або до) дати плану

### Запуск плану
- Форма співробітника → кнопка **Launch Plan**
- Вибрати план, дату початку, призначення (якщо "Ask at Launch")
- Праворуч — дати дедлайнів кожного кроку
- Кнопка **Schedule** → активності з'являються в chatter

### Офбординг
- Той самий механізм Activity Plans, але план "Offboarding"
- Типові кроки: передача знань (5 днів до виходу), план виходу від HR, вихідне інтерв'ю, повернення обладнання/бейджів, повідомлення команди
- **Відправка HR Access Link** (шестерня → Send HR Access Link): дозволяє звільненому завантажити свої документи
- **Архівування** (шестерня → Archive): з'являється wizard — причина звільнення, дата, деталі
  - Опції: скасувати майбутні апрейзали, видалити як водія авто, встановити дату закінчення контракту
- Після архівування → пошук через фільтр "Archived" у списку співробітників

---

## Рекрутинг (Recruitment)

### Основи та налаштування
- **Online Posting** (Settings) — публікація вакансій на сайті компанії (потрібен Website app)
- **Job Board**: інтеграція з monster.com (налаштування credentials)
- **Interview Survey** — відправка тестів кандидатам (потрібен Surveys app)
- **Resume Display** — показ резюме прямо на картці кандидата
- **Salary Package Validity** — термін дії оферу (наприклад, 30 днів)
- **Resume Digitization** — AI-витяг імені, email, телефону з PDF-резюме

### Дашборд вакансій
- Картки по вакансіях: опублікована / кількість заявок / нові / кількість позицій / прострочені активності
- Фільтр за відділами (ліва панель)

### Стадії канбану
- Повністю кастомізовані
- Шестерня → Edit стадії: назва, email-шаблон (автоматичний email при переміщенні), fold/unfold, "hired stage" toggle
- **Job-specific stages**: стадія тільки для певної вакансії

### Автоматизації (Studio)
- Шестерня → Automations → New
- Trigger = переміщення в стадію
- Action = Create Activity → тип, опис, дедлайн, відповідальний
- Приклад: при переміщенні в "Contract Proposal" — to-do "follow up" через 5 днів для HR-менеджера

### Способи додавання кандидатів
1. **Вручну** через дашборд (три крапки на картці вакансії → Application)
2. **Через канбан** (+ в стовпці)
3. **Із сайту компанії** (форма заявки — результат автоматично у базі)
4. **З job board** (monster.com тощо) — через email інтеграцію
5. **Email alias** — окрема адреса для кожної вакансії → лист з резюме автоматично створює заявку

### Форма кандидата
- Ім'я, email, телефон, LinkedIn
- Резюме (вкладення)
- Джерело, Medium (як подав заявку)
- Тег, стадія, рекрутер, інтерв'юер
- Referred By — від якого співробітника (Referrals integration)

### Навички кандидата
- При подачі через сайт: навички з резюме автоматично переносяться (якщо вони є в базі)
- Вкладка Skills → Skill Type → Skill → Level (%)
- **Search Matching Applicants**: по вакансії → три крапки → Search Matching Applicants → список кандидатів з % співпадіння навичок

### Інтерв'ю-форми (Survey)
- Тип: Recruitment (щоб не використовувалась в інших застосунках)
- Типи питань: Multiple Choice, Scale, Matrix, Multiple Lines Text Box тощо
- Налаштування: пагінація (одна сторінка / кілька), вибір питань (всі / випадкові), ліміт часу, режим доступу (тільки запрошені)
- Кнопка **Send Interview** на формі кандидата → email з посиланням
- **Consult Interview** → перегляд відповідей

### Планування інтерв'ю
- Автоматичний email при переміщенні в стадію з шаблоном "Recruitment Schedule Interview"
- Кандидат отримує посилання → вибирає слот зі свого часового поясу (синхронізація з календарем рекрутера)
- Або вручну: кнопка **No Meetings / Meetings** → вибрати дату → додати інтерв'юерів → Virtual URL → надіслати email

### Публікація вакансій та трекінг
- Publish on Job Board → вибрати board (monster.com), метод заявки (email / редирект на сайт), дати публікації
- AI генерація опису вакансії (кнопка Generate Description)
- **Tracker** smart button: trackable-посилання для різних джерел (Facebook, Glassdoor тощо)
  - Кожен трекер = окреме джерело + email alias → ODO знає звідки прийшов кандидат
  - Generate Email → автоматично для кожного джерела

### Найм та переведення
- При переведенні в hired-стадію → кнопка **Create Employee** → переносить дані до форми співробітника

### Аналітика рекрутингу
- **Applicant Analysis**: кількість заявок по місяцях, по стадіях (бар/лінійна/кругова діаграма)
- **Source Analysis**: звідки кандидати, hire rate по джерелах, окремо по рекрутерах-реферерах
- **Velocity Analysis**: середня кількість днів у кожній стадії — виявляє блокери
- **Team Performance**: кількість найнятих по кожному рекрутеру

### Нове в v19 (Recruitment)
- **Idle System** — підсвічування кандидатів, які довго не рухаються по стадіям
  - Налаштування: скільки днів = idle для кожної стадії
  - Канбан показує кількість днів у стадії
- **Talent Pools** замість Candidate Model
  - "Add to Pool" → додати кандидата до пулу (наприклад, "Developers", "Entry Level")
  - З пулу можна одразу створити заявку на нову вакансію без очікування
  - Smart button показує всі заявки кандидата та % співпадіння
- **Matching Percentage** за навичками/сертифікатами/освітою — видно на формі та у списку
- Можливість перегорнути порядок записів у канбані вручну (зберігається)
- Масове управління підписниками (followers): Actions → Remove Followers

---

## Нарахування зарплати (Payroll)

### Дашборд Payroll
- **Warnings** — попередження про проблеми (немає контракту, немає банк. рахунку тощо)
- **Batches card** — останні партії виплат та їхній статус
- **Employee Cost** — витрати на зарплату по місяцях/роках
- **Employee Trends** — нові найми
- **Notes** — нотатки для команди (з форматуванням, banner-попередженнями, посиланнями)

### Work Entry Types (Типи записів роботи)
- Configuration → Work Entry Types
- Поля: назва, код (не змінювати у стандартних!), external code (для export), колір, країна
- Display in Payslip: rounding (No / Half Day / Full Day), round type (Up/Down)
- **Не змінювати коди** стандартних типів — використовуються в обчисленнях інших застосунків
- Прив'язка до типу відпустки (наприклад, Sick Time Off)
- Checkbox "Include in Absenteeism Report"

### Working Schedules (Розклади роботи)
- Configuration → Working Schedules
- Поля: назва, Working Time Rate (%), Time Zone, список змін (ранок/обід/вечір)
- **Flexible Hours** — прибирає фіксований список змін
- Приклад: Apprentice 20 hours/week — flexible, 20 год/тиж, 4 год/день, EST

### Структура зарплати (Salary Configuration)
**Hierarchy: Structure Type → Structure → Rules**

**Structure Types:**
- Employee (Fixed Wage, Regular Pay) — передналаштований
- Worker (Hourly Wage, Worker Pay) — передналаштований
- US Employee — локалізаційний
- Власний: назва, країна (порожня = всі офіси), тип ставки (fixed/hourly), розклад виплат (weekly/bi-weekly/monthly), розклад роботи за замовчуванням

**Structures:**
- Вкладена в Structure Type
- Поля: назва, Use Workday Lines, країна, шаблон payslip, назва payslip, приховати Basic Wage
- Schedule Pay успадковується від Structure Type

**Salary Rules:**
- Вкладені в Structure
- Поля: назва, код, категорія (Basic / Gross / Net / Allowance тощо), sequence
- Condition: Always True / Range / Python
- Computation: Fixed Amount / Python / % of another rule
- Toggle: view on employer cost dashboard, view in payroll reporting
- Partner — якщо хтось інший відшкодовує цю виплату

### Salary Attachments (Утримання із зарплати)
Contracts → Salary Attachments. Три типи:
1. **Attachment of Salary** — примусові утримання (податкові, арешт зарплати)
2. **Assignment of Salary** — добровільні (внески до фондів, union dues)
3. **Child Support** — виплати на дитину

Поля: співробітник, опис, тип, дата початку, дата закінчення (або "No End Date"), сума per payslip, загальна сума → ODO розраховує кількість payslips
- Можна прикріпити документ (court order тощо)
- Статуси: New → Running → Done / Cancelled
- Масове дублювання існуючого запису для нових співробітників (Actions → Duplicate → змінити Employee)

### Payslips (Розрахункові листки)
- Payslips → All Payslips (згруповані по батчах)
- Одиночні (не в батчі) → категорія "None" (бонуси, комісії)
- Поля листка: Reference, Contract, Batch, Structure, Payment Report
- Вкладка **Work Days and Inputs**: розбивка годин (regular / overtime / PTO тощо), дні, суми
- Кнопка **Work Entries** → календарний вигляд записів роботи
- Вкладка **Salary Computation**: всі обчислення від Gross до Net, рядки з нульовою сумою = сині
- Кнопка **Compute Sheet** → перерахунок на основі поточних даних
- Кнопка **Payslips to Pay** → тільки незаплачені

**Створення payslip:**
- New → вибрати співробітника → контракт і структура підтягуються автоматично
- Вказати período → дати автоматично підлаштовуються під schedule (weekly/bi-weekly)
- Compute Sheet → зберегти/відправити

### Payroll Batches (Партії виплат)
- Payslips → Batches або з Dashboard
- **Назва**: зазвичай містить дати (наприклад, "Interns 03/23/25 – 03/29/25")
- **Add Payslips** → тільки payslips без батчу
- **Generate** → wizard: фільтр по відділах, посадах, структурах → генерує payslips для вибраних; можна виключити окремих

**Процес обробки:**
1. Create Draft Entry → проводки в Accounting
2. Create Payment Report → NACHA (US), SEPA, CSV
3. Завантажити файл → передати в банк
4. Mark as Paid

### Нове в v19 (Payroll)
- **Batches → Pay Runs**: перейменовано, повністю перероблений UI
- Pay Run: вибрати структуру → вибрати period → wizard з вибором співробітників → генерація
- Попередження (Issues) тепер видно прямо в list view pay run (не тільки у формі payslip)
- **Work Entries повністю перероблені**:
  - Тільки дата + тривалість (без start/end time) → легший import/export
  - Клік на слот → Set → тип + тривалість + Add або Replace
  - Split — розбити на частини
  - Виділення діапазону → зміна кількох одночасно
  - Скидання до автоматично розрахованих значень (кнопка-стрілка)
- **Salary Inputs (Properties)**:
  - Нова умова в salary rule: "Salary Input" → прив'язати до employee або payslip
  - Тип: monetary / quantity / percentage / checkbox
  - З'являється у вкладці Payroll на формі співробітника
  - Приклад: Transportation Allowance без локалізації
- **Корекція payslip**: якщо змінили версію employee після виплати → система виявляє і пропонує скоригувати (цей payslip / всі уражені)
- **Salary Configurator** (Job Offer): вибір benefits пакету кандидатом → бачить net salary в реальному часі

### Payroll Reporting
- **Payroll Analysis**: net/gross wage по місяцях (лінійна або бар-діаграма), Measures: днів відпустки, gross тощо
- **Headcount Report**: вручну створювані записи по датах → кількість співробітників
- **Work Entry Analysis**: поточний/квартальний/річний аналіз записів роботи по типах, з деталізацією по співробітниках

---

## Відпустки (Time Off)

### Дашборд (для співробітника)
- Календар з кольоровим кодуванням: суцільний = approved, штрих = pending, закреслений = refused
- Mandatory Days — дні, коли не можна брати відпустку (виділено червоним)
- Public Holidays
- Summary зверху: залишок по кожному типу відпустки, дата закінчення якщо є
- Клік на "?" → деталі accrual / approved / available
- Поле "Future date" → скільки буде накопичено на певну дату

### Запит відпустки
- New → тип відпустки, дати, опис → Save → чекає схвалення
- **Half-day selection** (v19): при виборі 2.5 дні → вказати яку половину останнього дня → ODO рахує автоматично
- Години: виділити блок у тижневому view → автоматично заповнює wizard
- **Working Time vs Absence** (v19 — "Time Not Off"):
  - Тип відпустки можна налаштувати як "Working Time" (не відсутність)
  - Приклад: Remote Work на 2 тижні — не скасовується якщо вирішили взяти sick day поверх

### Allocation Request
- New Allocation Request → кількість днів, причина
- Або менеджер виділяє вручну

### My Time Off / My Allocations
- Список усіх запитів по місяцях зі статусами
- Список виділень (allocations) зі статусами

### Управління відпустками (Manager)
- Departments dashboard → клік на цифри відпустки → схвалити/відхилити
- Reporting → By Employees: всі запити, фільтр "My Team", групування по статусу
- Зберегти пошук як фільтр за замовчуванням

### Reporting
- **By Employees**: список запитів, фільтри, групування по типу/статусу
- **By Type**: стовпці по типах відпустки (дні виділені)
- **Balance Report**: залишки по кожному співробітнику по кожному типу
  - Фільтр по менеджеру (custom filter → Employee → Manager)
  - Показник: Taken / Planned / Available
- Попередження якщо співробітник наближається до ліміту (наприклад, 59/60 днів)

---

## Плани нарахування відпустки (Accrual Plans)

### Основи
- Time Off → Configuration → Accrual Plans
- **Accrued Gain Time**: на початку чи в кінці accrual-периоду
- **Carry Over Time**: коли невикористане переноситься (початок року / дата виділення / інша дата)
- **Based on Work Time**: якщо відмічено → accrues тільки за робочі дні; якщо ні → за календарні дні
- **Milestone Transition**: якщо є 2+ правила → негайно або після поточного payperiod

### Правила (Milestones)
Кожне правило:
- **Employee Accrues** — скільки днів нараховується
- **Frequency**: daily / hourly / weekly / monthly (і конкретний день)
- **Cap Accrued Time** — максимальний накопичений залишок (наприклад, 60 днів)
- **Started Accruing After** — через скільки (наприклад, 2 роки = перший день 3-го року)
- **Carryover**: All / None / Up to N days
- **Milestone Cap** — максимум за весь план
- **Carryover Validity** — скільки днів переносяться діють (наприклад, 90 днів = до кінця Q1)

**Приклад seniority plan:**
- Рік 1: 10 днів/рік (нараховується щодня)
- Рік 2: 15 днів/рік
- Рік 3+: 20 днів/рік
- Максимум накопичення: 60 днів

---

## Відвідуваність (Attendances)

### Методи реєстрації
1. **Крапка вгорі** в будь-якому застосунку → Check In / Check Out
2. **Kiosk Mode**: QR/RFID/штрих-код бейджу → scan → auto check in
3. **Manual Identification** у кіоску: вибрати зі списку + PIN
4. **Mobile** (через браузер)

### Налаштування (Settings)
- **Kiosk Identification**: Barcode/RFID + Manual Selection (або тільки PIN)
- **Automatic Checkout**: автоматичний checkout через N годин після закінчення зміни
- **Absence Management**: показувати відсутності у звіті
- **Barcode Source**: фронт-камера / бек-камера / сканер
- **Employee PIN**: додатковий рівень безпеки
- **Display Time**: скільки секунд показується вікно після чекіну (за замовчуванням 10 сек)
- **Attendance Kiosk URL**: посилання для kiosk-пристрою (можна оновити якщо скомпрометоване)

**Extra Hours:**
- **Tolerance in favor of Company**: grace period перед overtime (наприклад, 15 хв)
- **Tolerance in favor of Employee**: grace period якщо трохи запізнився (наприклад, 15 хв)
- **Extra Hours Validation**: Auto Approved / Approved by Manager
- **Display Extra Hours**: показувати накопичені extra hours при чекіні

### Дашборд (Overview)
- Вигляд по днях: всі співробітники, години, check-in/out
- Поточний час = жовта вертикальна лінія
- Білі блоки = logged attendance
- Сірі блоки = потребують схвалення
- Кольори: червоний = перепрацював, зелений = відпрацював нормально або менше

### Створення записів вручну
- New → вибрати співробітника, дату, check-in, check-out
- ODO автоматично враховує перерву (lunch break за розкладом)

### Management (Схвалення)
- Management → список записів з фільтром "To Approve"
- Можна схвалити/відхилити індивідуально або масово
- **Часткове схвалення**: клік на поле Extra Hours → змінити значення → Approve

### Reporting
- Filtering: остатні 3 місяці (90 днів), grouping по місяцях і співробітнику
- Колонки: Worked Hours, Expected Hours, **Difference**, **Balance**
  - Difference = worked - expected
  - Balance = different, враховуючи tolerance (якщо різниця в межах tolerance → до Balance не йде)

### Overtime Rule Sets (Нове в v19)
- Конфігурація: Configuration → Overtime Rule Sets
- Одному співробітнику призначається один rule set (Settings tab на профілі)
- Правило: умова (Quantity / Timing), period (Day / Week), поріг
- Action: Payout (% rate, work entry type) або Time Off Allocation
- Менеджер схвалює/відхиляє overtime у Management → детальний розбір по застосованих правилах
- Схвалені overtime → work entries в Payroll або allocation в Time Off

### Нове в v19 (Attendance)
- Kiosk: список показує хто present/absent без входу в бекенд
- Новий **Ledger Report**: комбінований звіт attendance + time off по днях
- Disable GPS tracking опція
- RFID: більше не залежить від мови інтерфейсу (отримує числовий код)

---

## Записи роботи (Work Entries)

### Що це таке
- Work Entries = фіксований час роботи кожного співробітника
- Для погодинних: безпосередній вплив на суму зарплати
- Для окладників: вплив на баланси відпустки (sick time, vacation)
- Джерела: Attendance, Time Off, Planning

### Управління (Payroll → Work Entries)
- Канбан-вигляд по місяцях (кольори: сірий = attendance, фіолетовий = PTO тощо)
- Валідовані записи (кут загнутий) — **не можна змінювати**
- Фільтр "Conflicting" — записи з конфліктами (наприклад, забув checkout)

### Конфлікти
- Два записи на один час → попередження
- Рішення: Edit → побачити деталі → Remove конфліктний → OK
- Якщо пропустив check-out: duration буде незвично великим

### Додавання запису вручну
- Клік на дату в календарі → popup з даними співробітника → вказати тип, From, To

### Time Off to Defer (Відстрочення відпустки)
- Якщо зарплата вже прорахована, а потім з'ясувалось що день був sick leave:
  - Work Entries → Time Off → Reports → "Time Off to Defer"
  - Report to Next Month → переноситься на наступний payslip
- Після відстрочення: **Regenerate Work Entries** для цього співробітника
  - Вказати діапазон з незавалідованих дат → Regenerate
  - Сірі (attendance) блоки замінюються фіолетовими (PTO)

---

## Контроль присутності (Presence Control)

### Іконки на картках співробітників
| Іконка | Значення |
|--------|----------|
| Будинок 🏠 | WFH (Working From Home) |
| Офіс 🏢 | Працює в офісі |
| Літак ✈️ | Відпустка (будь-який тип) |

| Колір | Значення |
|-------|----------|
| Зелений | Активний у базі, підписаний |
| Помаранчевий/Жовтий | Idle або відсутній |
| Сірий | Поза робочими годинами |

### Налаштування (Settings → Employee Presence)
- **Based on Attendances**: колір = статус check-in/out
- **Based on User Status in System**: колір = чи залогінений у ODO
- **Advanced Presence Control**: дозволяє менеджерам змінювати статус вручну
- **Based on Number of Emails Sent**: email/year → вважається активним (якщо N+ per hour)
- **Based on IP Address**: список IP → якщо підключений = "present"
- **Remote Work**: дозволяє іконку будинку

### Фільтрація на дашборді
- Filter: "At Work" → бачити тільки тих хто працює
- Group By: Work Location → розбивка по місцях роботи
- Group By: Job Position → за посадою

### Ручне управління статусом (List View)
- Перейти в list view
- Вибрати співробітника → чекбокс
- **Presence Control** (кнопка в центрі вгорі) → Set Present / Send SMS

---

## Оцінка персоналу (Appraisals)

### Налаштування
- Configuration → Settings:
  - **Appraisal Plans**: автоматичний розклад (наприклад: через 6 міс, потім ще 6, потім щорічно)
  - **360 Feedback**: запит відгуків від колег (потрібен Surveys app)
  - **Appraisal Automation**: автоматичне підтвердження апрейзалу в день запланованої дати
  - **Evaluation Scale**: налаштувати рівні (Exceeds Expectations, Strongly Exceeds, Rockstar тощо)

### Дашборд апрейзалів
- Картки по апрейзалах: ім'я, відділ, дата, активності
- Зелений banner = confirmed, фіолетовий = completed
- **Launch Campaign**: масова розсилка апрейзалу (by tag, by employee, by department)

### Створення апрейзалу
- New → вибрати співробітника → менеджер, посада, відділ автозаповнюються
- Appraisal Date (поточний), Next Appraisal Date (за розкладом)
- Confirm → апрейзал активний

### Процес проведення
1. **Ask Feedback** (360): вибрати колег-реципієнтів, deadline → Send
2. Співробітник заповнює свою частину (Employee Feedback section)
3. Менеджер переглядає 360-відгуки (Feedback smart button → See Answers)
4. Менеджер заповнює свою секцію (Manager Feedback)
5. Star ratings по компетенціях (1-5 зірок)
6. Toggle "Not Visible to Employee" → "Visible to Employee" → співробітник бачить
7. **Skills tab**: оновити рівні навичок (синхронізуються з employee form)
8. **Private Note** tab: нотатки тільки для менеджерів
9. **Final Rating** → Mark as Done

### Цілі (Goals)
- Goals smart button на апрейзалі (показує тільки незавершені)
- Форма цілі: назва, співробітник, прогрес (%), менеджер, дедлайн, теги, опис
- **Open Library**: вибрати шаблони цілей → Add Goal to Employee
- **Save as Template**: зберегти ціль як шаблон (з Parent Goal, Skills)
- **Massive Goals** (v19): ціль для цілого відділу — вибрати всіх співробітників в одному записі
- **Goal Hierarchy** (v19): ціль може мати підцілі (sub-goals); smart button показує ієрархію

### Goals Library
- Configuration → Goals → Library
- Шаблони з Parent Goal, рекомендовані навички (skill level до якого ціль допомагає)
- При виборі з бібліотеки — підцілі додаються автоматично

### Target Job Position (Нове в v19)
- На вкладці Skills в апрейзалі: вибрати цільову посаду
- ODO показує: поточні навички vs необхідні для цієї посади (delta)
- Рекомендує цілі, які покривають потрібні навички

### Reporting
- **Appraisal Analysis**: апрейзали по місяцях, групування по відділах або статусах
- **Skills Evolution**: як змінюються навички між апрейзалами
  - Зелений = зростання, Червоний = зниження, Сірий = без змін або нові
  - Group By Evolution: Declined / Improved / Added / Unchanged

---

## Реферальна програма (Referrals)

### Основи
- Employees рекомендують знайомих → отримують бали → обмінюють на нагороди
- Переваги: нижча вартість найму, краще culture fit, вища retention
- Інтеграція: Referrals app + Recruitment app

### Дашборд рефералів
- Аватар співробітника в центрі, найняті реферали по боках
- Лічильники: Total Referrals / Ongoing Interviews / Hired
- Бали: Total / Available to Spend
- **Level Up** кнопка → суперheroy skin (cape)

### Поширення вакансій
- View Jobs → список активних вакансій
- Для кожної вакансії: Send Email / Send SMS / Send WhatsApp / Copy Link / Share on Facebook/X/LinkedIn
- Email a Friend → відправити всі вакансії одному контакту
- Referral Campaign: в Recruitment → три крапки → Referral Campaign → All Employees або Selection → Email / SMS

### Як ODO знає кого нагороджувати
- Кандидат застосовує через особистий реферал-лінк
- На картці кандидата в Recruitment: поле "Referred By User"

### Бали (Points)
- Бали нараховуються за кожну стадію рекрутингу де пройшов кандидат
- Налаштування балів: в Recruitment → стадія → шестерня → Edit → поле **Points**
- Зміна балів в стадії впливає на всі вакансії

### Нагороди (Rewards)
- Configuration → Rewards: назва, вартість у балах, відповідальна особа, фото, опис
- Buy → підтвердження → відповідальний отримує активність
- Alerts: Configuration → Alerts (нові нагороди, зміни в балах тощо)

### Alerts
- Configuration → Alerts: текст, посилання, дати показу
- Send Mail → відправити повідомлення всім (або вибраним) про новий alert

---

## Автопарк (Fleet)

### Дашборд Fleet
- Картки авто: статус контракту (без = купівля, зі = лізинг)
- Трикутник: червоний = контракт прострочений, жовтий = скоро спливає
- Activity icons: зелений = не срочно, жовтий = скоро, червоний = прострочено, годинник = немає

### Форма автомобіля
- **Driver Information**: поточний водій, майбутній водій, дата призначення
- **Vehicle Details**: категорія, дата замовлення, дата реєстрації, VIN (Chassis Number), Fleet Manager, Location
- **Driver's History** smart button: хто і коли їздив
- **Contract** smart button: активний лізинговий контракт
- **Services** smart button: вся історія обслуговування
- **Odometer** smart button: пробіг (регулярно оновлювати)

### Додавання автомобіля
1. Configuration → Manufacturers → перевірити/додати виробника (+ логотип)
2. Configuration → Models → новий: назва, виробник, тип, категорія, кількість місць/дверей
   - Рік, коробка передач, паливо (gasoline / diesel / hybrid / plugin), потужність (HP/kW), CO2
   - Vendors → додати дилера
3. Новий Vehicle record: ліцензійний номер, теги, водій, категорія, дати, VIN, пробіг, Fleet Manager, Location
4. Вкладка Tax Info: activation cost, деталі оподаткування
5. Status → Registered
6. Contract smart button → New → тип (Leasing/Purchase), постачальник, included services
   - Activation Cost (initial payment), Recurring Cost (monthly), дата початку

### Обслуговування (Services)
- Fleet → Services: список усіх сервісів групований за типом
- Кожен запис: опис, service type, дата, вартість, vendor, vehicle, водій, одометр, нотатки
- Стадії: New → Running → Done
- Якщо нового service type немає → New в списку (назва + категорія: Service / Contract)
- Якщо нового vendor немає → Create & Edit (назва, адреса, логотип)
- Вартість оновлюється при отриманні рахунку

### Управління аваріями
- Service Type: "Accident Driver Fault" / "Accident Driver Not at Fault" (створити окремо)
- Description = що пошкоджено (rear bumper replacement тощо)
- Notes = деталі аварії
- Процес: New → схвалити кошторис → Running → Done з фінальною вартістю
- Custom Filter "Stage = New OR Running" + Save as Default → зручний список для follow-up

### Fleet Reporting
- Reporting → Cost Analysis: синій = contract cost, червоний = service cost
- Порівняння з попереднім роком (фільтр "Previous Year")
- Pivot table + Group By Vehicle → вартість по авто
- Filter "Service" + Pivot + Group By Driver → хто скільки коштує в ремонтах

### Нове в v19
- **Odometers Report** (новий): витрата пального та пробіг по кожному авто

---

## Сертифікати співробітників

### Два типи
1. **External Certifications**: зовнішні (курси, навчання поза компанією)
2. **Internal Certifications**: внутрішні (іспити, налаштовані через Surveys app)

### Перегляд
- На формі співробітника (внизу): External Certifications / Internal Certifications
- Reporting → Certifications: всі сертифікати по компанії

### Таблиця certifications
- Колонки: Employee, Certification Name, Date Earned, Expiration Date, Internal Certification
- Кольори: чорний = актуальний, помаранчевий = закінчується (90 днів), червоний = прострочений
- Фільтр "Expired" → хто потребує поновлення
- Group By Certification + Group By Expiration Status

### Додавання сертифікату
- New (або з форми співробітника → Add)
- Поля: Title, Employee, Validity Start/End, Type (External/Internal), **Display Type = Certification** (обов'язково!)
- Certification field: вибрати внутрішній іспит (якщо Internal type)
- Notes: деталі

### Масове додавання
- Вибрати один запис → checkbox → Actions → **Duplicate** → змінити Employee
- Зручно коли багато людей отримали одне й те саме (наприклад, First Aid training)

### Нове в v19 (Learning)
- **Certifications** тепер налаштовуються з Skill Types (позначити як "certification")
- **Training Attendances** — новий розділ у Employee:
  - External Trainings (зовнішні провайдери)
  - E-Learning Trainings (через ODO e-learning module)
  - On-site Trainings (внутрішні тренінги)
- Видно на резюме співробітника + на Training Attendances dashboard
- Групування по типу або по співробітнику

---

## Що нового в HR (v19 — What's New)

### Загальні зміни в HR

**Employees:**
- Контракт та профіль **об'єднані** — всі поля контракту у вкладці Payroll
- **Employee Records (Versioning)**: кожна зміна = нова версія з датою
  - History smart button → вся хронологія кар'єри
  - Можна встановити зміну на конкретну дату в минулому або майбутньому
- Масове архівування (bulk archive) + wizard з причиною звільнення
- Масове створення Users (bulk create users)
- Власний профіль: smart buttons до своїх Attendances, Time Off, Appraisals
- Видимість колег: можна бачити коли колега у відпустці (time off без private info)

**Time Off:**
- Виділення половини дня: два кліки замість кількох запитів
- "Time Not Off" (Working Time mode): Remote Work або Training не є відсутністю
  - Можна накласти sick day поверх remote work без скасування
- Вибір годинного блоку в тижневому view → автозаповнення wizard

**Recruitment:**
- Idle system — підсвічування застряглих кандидатів
- **Talent Pools** замість Candidate Model
- Matching % за навичками/сертифікатами/освітою
- Перегляд всіх заявок кандидата з будь-якого пулу
- Ручне впорядкування kanban
- Масове управління followers

**Payroll:**
- Pay Runs (замість Batches) — новий UI
- Issues (попередження) видно в list view
- Work Entries: тільки дата+тривалість, Set/Replace/Split/Reset, масові зміни
- Salary Inputs (Properties): custom поля на employee → впливають на обчислення
- Виявлення необхідності корекції при зміні версії employee
- Salary Configurator для job offers

**Appraisals:**
- Цілі для всього відділу в одному записі
- Goal Hierarchy та Smart Button ієрархії
- Goals Library з sub-goals та recommended skills
- Target Job Position → delta навичок + рекомендовані цілі
- Matching % в апрейзалі

**Attendance:**
- Повний UI-перегляд (Gant, Employee form fields)
- Overtime Rule Sets — кастомний рушій overtime (Quantity / Timing)
- Kiosk показує присутніх/відсутніх
- Ledger Report (attendance + time off)
- GPS tracking — можна вимкнути

**Localization Payroll (v19):**
- Certified: Switzerland (SDP), Australia (STP2 + SuperStream), Mexico (stamping)
- Структура: той самий core engine для всіх країн
- Локалізації в розробці: понад 20 країн, включно з Францією, Німеччиною
- Стратегія: 2 developer per localization → мета 5 developers per localization

**Fleet:**
- Новий Odometers Report: пробіг + витрата пального по авто

**Referrals:**
- Новий звіт: awards та зароблені бали
