# Odoo Accounting — відео-конспекти YouTube

> Джерело: офіційні YouTube-відео Odoo (транскрипти), 2026-06

---

## Початок роботи (Getting Started)

- **Фіскальна локалізація** задається в Configuration → Settings → Fiscal Localization. Після першого journal entry змінити її неможливо — треба налаштувати до початку роботи.
- **Основні терміни:**
  - *Journal item* — окремий дебет або кредит на рахунку
  - *Journal entry* — збалансована група journal items (дебет = кредит)
  - *Journal* — папка для journal entries (Sales, Purchase, Bank тощо)
- **Dashboard** — канбан-вигляд журналів; звідси можна швидко створити інвойс, завантажити вендорський білл, звірити банк.
- **Меню Accounting** — автоматичні переводи, аналітика, бюджети, активи, блокування дат.
- **Меню Reporting** — General Ledger, Balance Sheet, Profit & Loss, Partner Ledger, Aged Payables/Receivables, Tax Return.
- **Меню Configuration** — Payment Terms, Taxes, Chart of Accounts, тощо.

---

## План рахунків (Chart of Accounts)

### Структура
- Рахунки групуються за типом відповідно до фінансового звіту:
  - **Balance Sheet:** Equity, Assets (Bank/Cash, Current Assets, Fixed Assets), Liabilities
  - **P&L:** Income, Expense
- Кожен рахунок має: унікальний код, назву, тип, ознаку "Allow Reconciliation".
- Якщо валюта не вказана — рахунок працює з будь-якою валютою.
- Один рахунок може бути зіставлений з кількома компаніями (multi-company).

### Створення рахунку
- Найкращий спосіб — продублювати схожий існуючий рахунок (Actions → Duplicate).
- Odoo автоматично генерує унікальний код.
- На формі рахунку доступні: Fiscal Category, опція Active/Deprecated, поле Description (підказка при виборі рахунку на інвойсі).

### Пріоритет рахунків доходів/витрат на інвойсі
1. Рахунок, вказаний безпосередньо на рядку інвойсу
2. Рахунок на продукті
3. Рахунок на категорії продукту
4. Рахунок за замовчуванням у журналі

### Масове оновлення (Import)
- Вибрати всі рахунки → Actions → Export → активувати "I want to update data" (щоб оновлювати, а не дублювати).
- Обов'язкові поля: code, name, account type, allow reconciliation, deprecated.
- Поле ID і Account Type не редагувати для існуючих записів.
- Рахунок типу **Current Year Earnings** — специфічний для Odoo; не видаляти і не модифікувати.
- Не видаляти непотрібні рахунки — краще позначити як deprecated.
- Нові рахунки: заповнити код, назву, тип, reconciliation; external ID не потрібен.
- Імпорт: Configuration → Chart of Accounts → Import → "Import Chart of Accounts".

---

## Банківська конфігурація та синхронізація

### Ключові рахунки (налаштовуються в Configuration → Settings)
| Рахунок | Призначення |
|---|---|
| Bank Suspense Account | Тимчасовий placeholder між отриманням банківської транзакції і її звіркою |
| Outstanding Receipts | Холдинг між реєстрацією оплати від клієнта і банківською звіркою |
| Outstanding Payments | Те саме для вихідних платежів постачальникам |
| Internal Transfer | Баланс при переказах між банківськими/касовими журналами |

### Флоу журнальних проводок (Invoicing → Payment → Bank)
1. Підтвердження інвойсу → Debit AR / Credit Income + Tax
2. Реєстрація оплати → Debit Outstanding Receipts / Credit AR
3. Банківська транзакція → Debit Bank / Credit Suspense Account
4. Звірка → Suspense Account замінюється на Outstanding Receipts (рахунок балансується)

### Налаштування Bank Journal
- Configuration → Journals → Bank Journal
- Поле **Bank Account** — унікальне (два журнали не можуть використовувати один рахунок)
- Можна перевизначити Suspense Account, Outstanding Accounts для конкретного журналу
- IBAN — обов'язковий для деяких локалізацій (SEPA, NACHA)
- В Incoming/Outgoing Payments tabs — налаштування payment methods і outstanding accounts для кожного методу

### Синхронізація банку
- З dashboard: Kebab menu журналу → Connect Bank → вибрати банк (26 000+ банків) → вибрати провайдера → Connect.
- Транзакції імпортуються автоматично.

### Ручне введення / імпорт транзакцій
- Завантаження PDF-виписки: Odoo читає PDF, автоматично створює транзакції та групує в statement. Помилкові поля правляться кліком.
- Excel-файл окремих транзакцій також підтримується.
- Ручне створення: New → задати Date, Label (обов'язково), Partner, Amount (+ вхідний / - вихідний).
- **Statement** — група транзакцій: hover на рядку → кнопка Statement → задати Reference, Starting/Ending Balance.
- Вже звірені транзакції редагувати не можна без попереднього unreconcile.

---

## Банківська звірка (Bank Reconciliation)

### Логіка проводок
- Нова банківська транзакція: Debit Bank / Credit Suspense Account.
- Після звірки: Suspense Account замінюється на AR (або інший відповідний рахунок).

### Процес звірки (з Dashboard → Transactions)
- Незвірені транзакції отримують **кнопки-підказки** (фіолетові):
  - **Set Partner** — якщо партнер не вказаний
  - **Reconcile** — якщо є відкриті інвойси/білли/платежі по партнеру
  - **Receivable / Payable** — якщо відкритих записів немає
  - **Set Account** — ручне списання на рахунок
- Вертикальне меню (⋮) — повний список дій, включаючи upload vendor bill прямо з транзакції.

### Автоматичне зіставлення (вбудоване правило)
- Якщо 2 з 3 елементів (партнер, мітка, сума) збігаються з інвойсом/білл/платежем — Odoo зіставляє автоматично.
- Tolerance (допустиме відхилення) — дозволяє автоматично обробляти малі різниці (комісії тощо).

### Часткова оплата / редагування
- Розгорнути рядок → іконка олівця → редагувати баланс або перемикатись між partial/full payment.
- Іконка кошика → видалити зіставлення (транзакція залишається, зв'язок розривається).

### Reconciliation Models (Моделі звірки)
- Accounting → Configuration → Bank Journal (⋮) → Models (або аналогічно).
- **Manual trigger** — кнопка з'являється при звірці конкретної транзакції.
- **Automated trigger** — модель застосовується автоматично до відповідних транзакцій.
- Порядок моделей важливий: Odoo перебирає список зверху вниз і застосовує першу відповідну.
- Налаштування моделі: фільтри (журнал, партнер, сума, мітка / regex), counterpart items (рахунок, відсоток від залишку, фіксована сума, мітка).
- Odoo **автоматично створює моделі**, якщо бачить повторювані дії (наприклад, одна й та сама мітка → один рахунок двічі поспіль).
- Автоматично створені моделі можна знайти через ⋮ → Manage Models (зняти фільтр "created by user").

---

## Виставлення рахунків клієнтам (Customer Invoices)

### Ручне створення
- Dashboard → New (у Sales журналі) → вибрати клієнта → додати рядки.
- Можна додавати секції та використовувати **Catalog** для пошуку продуктів.
- Поле Invoice Date: залишити порожнім → при підтвердженні проставляється сьогоднішня дата.
- **Send**: кнопка надсилання; PDF додається в chatter.
- Сума прописом на інвойсі — вмикається в Settings → Customer Invoices.

### З Sales Order
- Sales → Confirm Order → Create Invoice.
- **Invoicing Policy** продукту: Ordered Quantities (можна відразу) або Delivered Quantities (тільки після доставки).
- Після підтвердження інвойсу рядки замовлення стають чорними (вже проінвойсовано).
- **Consolidated billing**: при масовому створенні інвойсів з кількох SO одному клієнту — об'єднує в один інвойс.
- Масове створення: вибрати кілька SO → Actions → Create Invoices.

### Статуси перегляду (review)
- Користувачі з обмеженими правами (Invoicing / Invoicing + Banks) можуть підтверджувати інвойси, але вони позначаються **"To Review"**.
- Бухгалтер (Bookkeeper / Administrator) перевіряє та натискає **Reviewed** — після цього скасувати перегляд звичайним користувачем неможливо.

### Перегляд інвойсів
- Customers → Invoices: список з номером, клієнтом, датами, статусом (Draft/Posted) та статусом оплати.
- Additional Fields → можна додати колонки (напр., Tax Excluded amount).

---

## Кредитні ноти (Credit Notes)

- **Призначення**: зменшення заборгованості клієнта (повернення, пошкоджений товар тощо).
- **Journal Entry**: протилежна до інвойсу (Debit Income / Credit AR).
- **Окрема нумерація** кредитних нот: налаштовується в журналі Sales (опція "Dedicated credit note sequence" → код, напр., RINV).

### Створення
- Найкраще: відкрити існуючий інвойс → кнопка **Credit Note**.
  - Reason — причина (відображається на кредитній ноті)
  - Journal — вже підставлено
  - Reversal Date
  - **Reverse** — частковий реверс (2 документи: оригінальний інвойс + кредитна нота)
  - **Reverse and Create Invoice** — повний реверс + новий чистий інвойс (3 документи)
- Також: Customers → Credit Notes → New (але без прив'язки до інвойсу).

### Поведінка при незаплаченому інвойсі
- Кредитна нота автоматично звіряється з оригінальним інвойсом (info іконка пояснює).
- Оригінальний інвойс отримує статус Partially Paid або Paid.
- Клієнт бачить кредитну ноту у своєму порталі поряд з інвойсами.

---

## Рахунки постачальників (Vendor Bills) + OCR

### Способи створення vendor bill
1. **З Purchase Order**: PO → Create Bill (підтягує вендора, рядки, іншу інфо).
2. **Вручну з dashboard**: Purchases journal → New → autocomplete (вибрати PO або вендора) → можна об'єднати кілька PO одного вендора.
3. **Завантаження PDF**: Dashboard → Upload у Purchases journal → OCR розпізнає поля автоматично.
4. **Email Alias**: налаштовується в журналі (Advanced Settings → Email Alias); отримані білли з'являються на dashboard автоматично.

### Дати
- **Bill Date** — дата виставлення рахунку.
- **Accounting Date** — дата проводки; якщо до lock date — Odoo автоматично переносить на першу дату після lock.

### Статуси
- Draft → Posted (після підтвердження) → In Payment → Paid.
- Підтверджений білл можна скинути в Draft і скасувати за необхідності.

### Аналітика на dashboard
- Kebab menu Purchases journal → Bills Analysis / Aged Payables.

### Digitization (OCR / AI)
- Вбудована документація: Documents app → Finance workspace → Email Alias сканера.
- **Сплітування PDF**: при завантаженні кількох сторінок → іконка ножиць → розбити або залишити разом.
- **Автоматичне розпізнавання**: Create Vendor Bills → Odoo заповнює вендора, дату, рядки, ставку ПДВ.
- OCR вчиться: якщо поле заповнено вручну — наступного разу від того ж вендора з тією самою міткою підставляє автоматично.
- Якщо рахунок вже завантажений → попередження про дублікат (порівнює всі поля).
- **Автоматичне створення Asset**: якщо рядок білла потрапляє на fixed asset рахунок — Odoo створює актив автоматично (якщо налаштовано asset model).
- **Credit note розпізнається**: Odoo визначає тип документу з PDF навіть якщо обрано "Create Vendor Bills".
- **Рядки з різними ставками ПДВ**: OCR розбиває на окремі рядки (напр., 0% і 21%).
- **Ліміт кредитів**: digitization вимагає in-app credits.

---

## Платежі та непроведені рахунки (Payments & Outstanding Accounts)

### Статуси оплати
| Статус | Значення |
|---|---|
| Not Paid | Жодного платежу |
| Partially Paid | Частина суми оплачена |
| In Payment | Повністю оплачено, але не звірено з банківською транзакцією |
| Paid | Оплачено і звірено з банком |

### Три варіанти налаштування outstanding accounts
1. **Порожнє поле** — платежі не створюють journal entry.
2. **Окремий outstanding рахунок** — тимчасово тримає баланс до банківської звірки (стандартний підхід).
3. **Основний рахунок журналу (Cash)** — journal entry одразу йде на cash account; банківська звірка не потрібна → статус одразу Paid.

### Способи реєстрації платежу
- **Прямо з інвойсу/білла** → Register Payment → автоматично зіставляється з документом.
- **Масово**: вибрати кілька інвойсів/біллів → Pay. Опція **Group Payments** — один платіж на партнера (не один на документ).
- **Вручну**: Customers → Payments → New → задати партнера та суму → потім зіставити з інвойсом:
  - На самому інвойсі: banner "Outstanding Credits" → вибрати платіж.
  - Через Accounting → Reconcile: знайти journal items і зіставити вручну або Auto-reconcile.

### Важливо
- Ручне зіставлення через Reconcile menu працює **тільки якщо платіж створив journal entry** (тобто outstanding account налаштовано).
- Bank Reconciliation (транзакція ↔ платіж) — це окремий процес від Payment Reconciliation (платіж ↔ інвойс).

---

## Умови оплати та терміни та умови (Payment Terms & T&C)

### Payment Terms
- Конфігурація: Configuration → Payment Terms.
- Можливості: встановити дедлайн, розбити на кілька платежів (installments), знижка за раннє погашення.
- Налаштування рядків: відсоток (або залишок), кількість днів, від якої дати (invoice date, end of month, end of next month тощо).
- **Preview** праворуч: можна змінити зразкову дату і побачити фактичні суми та дедлайни.
- Поле "Written explanation" — текст умов, який з'являється на інвойсі.
- Опція показувати/приховувати дати платежів на інвойсі.

### Terms & Conditions (Терміни та умови)
- Активуються в Accounting → Settings → Default Terms and Conditions.
- **Короткий текст** — відображається внизу інвойсу/замовлення/квотації.
- **Посилання на веб-сторінку** — якщо T&C надто довгі для інвойсу.
- На конкретному інвойсі T&C можна відредагувати.

### Застосування
- Payment Terms можна вказати на клієнті (за замовчуванням) або безпосередньо на інвойсі.
- Aged Receivables report (Reporting → Aged Receivable) — моніторинг прострочень.

---

## Знижки за раннє погашення (Cash Discounts)

- **Логіка**: якщо клієнт оплачує раніше за N днів — отримує X% знижку; інакше — сплачує повну суму.
- Вплив на податки: залежить від країни. Варіанти Tax Reduction: Never / Always / On Early Payment.
- Рахунки для знижок: Configuration → Settings → Cash Discount Gains/Losses accounts.

### Налаштування
- Configuration → Payment Terms → відкрити потрібний термін → активувати checkbox "Cash Discount for Early Payment" → задати % і кількість днів.
- Приклад назви: "2/7 Net 30" = 2% знижка якщо оплата за 7 днів, повна сума — 30 днів.

### Реєстрація оплати зі знижкою
- При Register Payment Odoo показує banner: "Early payment discount applied" і пропонує суму зі знижкою.
- Якщо оплата відповідає умовам — Odoo пропонує позначити інвойс як fully paid.
- Journal Entry платежу включає окремий рядок "Early Payment Discount" → рахунок Financial Discounts Allowed.
- Всі taxgrids заповнюються коректно відповідно до локалізації.

---

## Касовий метод обліку ПДВ (Cash Basis)

- **Суть**: ПДВ відображається в звіті тільки після отримання/здійснення платежу, а не при підтвердженні інвойсу.
- Активується: Configuration → Settings → Cash Basis → вибрати journal і (опційно) рахунок.

### Налаштування податку
- Configuration → Taxes → відкрити/дублювати потрібний податок → Advanced Options → Tax Exigibility: **Based on Payment**.
- Встановити **Transition Account** — тимчасовий рахунок між підтвердженням інвойсу і отриманням оплати.

### Поведінка
- При підтвердженні інвойсу з cash basis податком: tax amount йде на Transition Account (не на основний VAT рахунок); tax grids порожні.
- Після реєстрації платежу: створюється Cash Basis Entry → переміщує суму з Transition → VAT Payable, заповнює tax grids → тепер відображається в Tax Report.

---

## Податки та ПДВ (Taxes & VAT)

### Загальне
- Податки встановлюються автоматично при виборі правильної країни/локалізації.
- Rounding method: Per Line або Globally (в Settings).

### Поля на записі податку
- Назва, опис, тип (Sales / Purchase), ставка
- **Tax Scope**: Goods / Services / Both
- **Tax Computation**: Fixed, Percentage, Group of Taxes, Python Expression
- **Distribution for Invoices/Refunds**: які рахунки отримують суму і скільки; tax grids для звіту
- **Advanced Options**:
  - Included in Price — ціна вже містить податок
  - Affect Base of Subsequent Taxes — впливає на базу наступних податків у стеку (для luxury/environmental taxes)
  - Include in Analytic Cost
  - Tax Group — заголовок групи на інвойсі (за замовчуванням один на кожну ставку)

### Де встановлюється податок
1. Безпосередньо на рядку інвойсу (найвищий пріоритет)
2. На продукті (окремо Sales Taxes і Purchase Taxes)
3. На рахунку доходів/витрат (нижчий пріоритет, перекривається продуктом)
4. Fiscal Position може перекрити будь-яке з вищесказаного

### Порядок податків
- У list view є handles — drag & drop для зміни sequence.

---

## Податковий звіт та подача (Tax Report & Return)

### Механіка
- ПДВ Receivable і ПДВ Payable накопичуються протягом фіскального періоду.
- В кінці: різниця = сума до сплати (позитивна) або до відшкодування (негативна).

### Налаштування
- Configuration → Settings → Tax Return Periodicity (Monthly / Quarterly тощо) + вибір журналу.
- Configuration → Tax Groups → VAT Payable / VAT Receivable accounts (для автоматичного закриття).
- Tax Returns Journal: Dashboard → кнопка Tax Returns → задати Opening Date → Apply.

### Процес Tax Return (три кроки: Review → Submit → Pay)
1. **Review**: Odoo автоматично запускає **перевірки (checks)**:
   - Прикріплені PDF до біллів (для аудиту)
   - Відсутня інфо компанії
   - Чернеткові записи (draft entries)
   - Неузгоджені банківські транзакції
   - Зіставлення ставок і кодів країн
   - Можна додавати власні перевірки (Developer Mode → Checks)
2. **Validate & Lock**: постить closing entry + встановлює **Tax Lock Date** → журнальні записи з рахунками ПДВ після цього заблоковані.
3. **Submit**: інструкції залежать від локалізації; кнопка "Mark as Submitted".
4. **Pay**: з'являється вікно з деталями платежу (QR код для банківського додатку); кнопки "Pay Now" / "Pay Later" / надіслати колезі.

### Важливо
- Після lock date: новий білл з датою до lock date — accounting date автоматично переноситься на перший день після lock.
- Окремі компанії мають окремі fiscal periods і lock dates; branches/subsidiaries — спільні з parent.

---

## Фіскальні позиції (Fiscal Positions)

- **Призначення**: автоматично замінювати ставки податків і рахунки залежно від типу партнера (B2B/B2C, резидент/нерезидент, EU/non-EU тощо).
- Приклад: бельгійська компанія → продаж B2B партнеру з іншої країни ЄС → замість 21% VAT застосовується 0% (intra-community).

### Конфігурація на податку (новий підхід в Odoo 19)
- Configuration → Taxes → відкрити податок → поле **Fiscal Position** (яка ФП використовує цей податок).
- Поле **Replaces** — місцевий податок, який замінюється даним.

### Конфігурація фіскальної позиції
- Configuration → Fiscal Positions → відкрити ФП:
  - **Taxes tab**: зіставлення "from tax → to tax"
  - **Accounts tab**: зіставлення "from account → to account"
  - **Legal Notes**: текст, який додається на інвойс при використанні цієї ФП
  - **Detect Automatically**: автоматичне застосування за умовами (VAT номер, країна, група країн, діапазон zip-кодів)

### Де застосовується
1. **Автоматично** — за правилами Detect Automatically
2. **На партнері** — Sales & Purchases tab → Fiscal Position (перекриває автоматику)
3. **На конкретному документі** — Other Info tab → Fiscal Position (тільки для цього документу)

### Важливо
- Додавати партнера на інвойсі ПЕРШИМ — щоб правильна ФП застосувалась до продуктів.

---

## Фінансові звіти (Financial Reports)

### Доступні звіти (Reporting menu)
- **Balance Sheet** — знімок активів, пасивів, капіталу на дату.
- **Profit & Loss** — доходи і витрати за період.
- **General Ledger** — всі рахунки з балансами; можна розгорнути до journal items.
- **Annual Statements** — Balance Sheet + P&L + Trial Balance в одному файлі.
- **Partner Ledger, Aged Payables/Receivables** — партнерська аналітика.
- **Tax Return** — звіт по ПДВ.

### Загальні можливості всіх звітів
- Вибір дати/діапазону; кнопка **Comparison** (попередній період / той самий рік раніше; кілька порівнянь).
- Фільтр по журналах.
- Додаткові фільтри: Draft Entries, Hide Lines at Zero, горизонтальний спліт, одиниця округлення.
- Тип Balance Sheet: Country-specific або Generic.
- Drill-down: клік по рядку → journal items або вкладений звіт.
- Коментар/activity: іконка speech bubble на рядку.
- Зміна рахунку в mass: вибрати рядки → клікнути поле Account → ввести новий рахунок → Update.
- Завантаження: кнопка форматів (PDF, Excel) у лівому верхньому кутку кожного звіту.
- Збереження в Documents: gear icon → Copy to Documents.

### Budget в P&L
- Активувати бюджет: клікнути **Budget** → вибрати або створити бюджет.
- З'являється колонка бюджету та колонка % виконання.
- При місячному вигляді загальний бюджет ділиться на 12 автоматично.
- Клік на клітинку → відредагувати суму для конкретного місяця.

### Journal Audit Report (Review menu)
- Drill-down по журналах і рахунках; показує tax grids у Global Tax Summary.
- Масова зміна рахунку на позначених рядках.

### Annual Audit Report (Review → Annual Report)
- Зберігається в Knowledge App.
- Типи секцій: Attestation (toggle on/off, динамічний текст) і Посилання на accounting reports.
- Customize reports (фільтри зберігаються для фінального PDF).
- Annexes: порядок перетягуванням, завантаження PDFs.
- Завантаження: вибрати звіт у лівій колонці → меню → Download Annual Report.

---

## Аналітичні бюджети (Analytic Budgets)

- Передумова: налаштовані Analytic Accounts і Plans. Активувати в Settings → Budget Management.
- Меню: Accounting → Budgets.

### Структура бюджету
- Колонки = аналітичні плани; рядки = аналітичні рахунки.
- Тип: Revenue або Expense.
- Можна мати необмежену кількість бюджетів.

### Колонки після відкриття бюджету
| Колонка | Значення |
|---|---|
| Achieved | Фактично витрачено (проведені vendor bills) |
| Committed | Committed = Achieved + замовлено але не виставлено білл |
| Theoretical | Скільки мало бути витрачено на поточну дату (авто-розрахунок) |

### Ревізія бюджету
- **Reset to Draft** — якщо щось не так при заповненні.
- **Revise** — оновити після відкриття; попередній бюджет отримує статус Revised; в новому з'являються нові колонки.

### Перевищення бюджету
- На рядку PO рядок підсвічується **червоним**, якщо аналітичний розподіл перевищує бюджет.

### Генерація кількох бюджетів
- List view → вибрати бюджет → Generate → задати Period + частоту (Monthly/Quarterly тощо) → Split.
- Результат: кілька підбюджетів (наприклад 12 місячних).

### Перегляд
- Budget Smart Button на PO/Bill → pivot view по бюджету.
- Reporting → Budget Report (pivot/list/graph view).
- Вибрати всі бюджети → Budget Lines — агрегований перегляд усіх рядків.

---

## Активи (Assets)

### Створення активу (Accounting → Assets)
- Поля: назва, Original Value, Acquisition Date, Not Depreciable Value (залишкова/salvage value).
- **Book Value** = Original Value - Cumulative Depreciation (розраховується автоматично).
- Методи амортизації: Straight Line / Declining / Declining then Straight Line.
- Тривалість: вказувати в місяцях (84 місяці ≠ 7 років — різна частота проводок).
- Computation: Constant Periods / Based on Days per Period / No Prorata.
- Prorata date — дата, від якої рахується перший амортизаційний запис.
- Рахунки: Fixed Asset Account (де зберігається вартість), Depreciation Account (кредитується при амортизації), Expense Account (дебетується).

### Depreciation Board
- Compute Depreciation → таблиця з датами, сумами та залишковою вартістю.
- Після підтвердження: draft entries автоматично проводяться у свій час.
- Posted Entries smart button — всі проводки (проведені і майбутні).

### Depreciation Schedule (Reporting → Depreciation Schedule)
- Огляд всіх активів по рахунках; вибір часового діапазону.
- Опція Include Draft Entries — показує майбутні амортизаційні записи.

### Asset Models (шаблони активів)
- Configuration → Asset Models.
- Модель містить метод, тривалість, рахунки — але не суму (вона різна для кожного активу).
- При створенні активу: вибрати Asset Model → автоматично заповнює поля амортизації.

### Автоматизація через рахунок (найшвидший спосіб)
- Chart of Accounts → відкрити Fixed Asset рахунок → вкладка **Automation**:
  - Create Asset: In Draft / Create and Validate
  - Asset Model: обов'язковий якщо Validate
  - Manage Items: 5 ноутбуків → 5 окремих активів (або 1 груповий)
- Після підтвердження vendor bill → актив створюється автоматично (smart button на білл).

---

## Визнання доходів/витрат (Expense & Revenue Recognition)

### Три концепції
| Термін | Коли | Приклад |
|---|---|---|
| Deferred | Платіж ДО надання послуги/товару | Річна підписка оплачена зараз → розподілити на 12 місяців |
| Accrued | Платіж ПІСЛЯ надання | |
| One-shot entry | Одноразовий запис, розбитий на дві частини | Половина в поточному, половина в наступному фіскальному |

### Налаштування (Settings → Post Deferred Entries)
- Журнал для deferred entries.
- Коли генерувати: при підтвердженні білла / вручну.
- Computation: Based on Days / Equal per Month.

### Deferred Revenue/Expense
- На рядку білла/інвойсу: розгорнути приховані поля → Start Date / End Date.
- Після підтвердження: smart button "Deferred Entries" → список проводок.

### One-shot Accrual Entry
- Підтвердити інвойс → Journal Items tab → кнопка **Cut-off** (тільки для рахунків типу Income або Expense).
- Поля: Recognition Date, Accrual Account, Adjusting Amount (сума яка переноситься).
- Логіка: оригінальна проводка → повна сума в income account; другий запис → переносить частину в accrual account до Recognition Date.

### Масова зміна
- Journal Items → вибрати кілька рядків одного типу (або всі Income, або всі Expense) → Actions → Change Period.

---

## Вхідне сальдо (Opening Balance Import)

### Чотири компоненти
1. **General Ledger** — баланс кожного рахунку
2. **Відкриті AR/AP** — незаплачені інвойси/білли/кредитні ноти
3. **Банківський баланс**
4. **Залишки запасів** (якщо manual inventory valuation)

### Ключові правила підготовки
- Переходити на кінці фіскального року або кінці податкового періоду.
- General Ledger повинен бути збалансований (дебет = кредит).
- Total AR на GL = сума відкритих інвойсів − відкриті credit notes.
- Total AP на GL = сума відкритих біллів − відкриті vendor credit notes.

### Хитрощі для уникнення задвоєння
- **AR/AP на GL**: замінити рахунки AR і AP на **Suspense Account** (тимчасовий).
- **Інвойси/білли при імпорті**: вказати той самий Suspense Account замість стандартного AR/AP.
- Так рахунки балансуються взаємно і не вдвоюють залишки.
- **Банківський рахунок**: замінити на **Bank Outstanding Receipts Account** (якщо баланс позитивний).

### Покрокова процедура
1. Створити новий журнал "Opening Balance" (тип: Miscellaneous, код: OPB).
2. Імпортувати GL: Accounting → Journal Entries → Actions → Import. Поля: date, journal, reference, account, debit, credit.
3. Відкрити і підтвердити (Post) journal entry.
4. Імпортувати інвойси: Customers → Invoices → Actions → Import. Достатньо одного рядка на інвойс (загальна сума).
5. Select All → Post all.
6. Те саме для vendor bills: Vendors → Bills → Import.
7. Створити відкриваючу банківську транзакцію вручну (New transaction → Opening Balance → сума).
8. Звірити з opening entry (suggested автоматично).

---

## Оцінка запасів (Inventory Valuation — Continental)

- **Continental** (протилежність Anglo-Saxon): вартість товару потрапляє в обліку одразу при надходженні на склад.
- Перевірка: Settings → пошук "Anglo" → має бути вимкнено.
- Активувати Automated Inventory Valuation на категорії продукту.

### Журнальні проводки (флоу)
| Подія | Дебет | Кредит |
|---|---|---|
| Отримання товару (Receipt) | Inventory Account | Stock Interim Account |
| Підтвердження Vendor Bill | Expense Account | Accounts Payable |
| Відправка клієнту (Delivery) | Stock Interim Account | Inventory Account |
| Підтвердження Customer Invoice | Accounts Receivable | Income Account |

- Vendor Bill і Customer Invoice не пов'язані між собою окремою проводкою в Continental обліку.
- Якщо товар не продано одразу — бухгалтер має **вручну** коригувати balance sheet (запаси).
- Маржа відображається в P&L тільки при продажу.

---

## Мультивалютність (Multi-currency)

### Налаштування
- Configuration → Settings → Currencies → активувати валюти.
- **Automatic Currency Rate**: вибрати провайдера (напр., European Central Bank), інтервал оновлення (Daily/Weekly/Monthly/Manual).
- Кнопка з подвійною стрілкою → оновити курс негайно.

### Реалізовані курсові різниці (Realized Gains/Losses)
- Виникають при **оплаті** інвойсу/білла у валюті, відмінній від домашньої, коли курс змінився.
- Різниця визначена і незаперечна (на відміну від unrealized).
- Odoo автоматично генерує **Exchange Difference Entry** при реєстрації платежу.
- На білл/інвойсі: smart button посилається на цей exchange entry.

### Банк в іноземній валюті
- У Journal Configuration: вказати Currency = USD (наприклад).
- У Chart of Accounts: налаштувати Account Currency на відповідному рахунку.
- При звірці: Odoo автоматично конвертує суми з EUR у USD (або навпаки) для порівняння.
- Reconciliation models можна використовувати для заповнення рахунку курсової різниці.

### Нереалізовані курсові різниці (Unrealized Gains/Losses)
- Стосуються **незакритих** позицій (неоплачені інвойси/білли, банківські рахунки у валюті).
- Не є остаточними — курс може змінитись до оплати.
- Мета: реалістичне відображення фінансового стану на кінець periodу.
- Звіт: Reporting → Unrealized Currency Gains/Losses.
  - Розбито за валютами; показує foreign amount, курс на дату операції, поточний курс, adjustment.
  - Можна вручну змінити курс для конкретної валюти.
- **Adjustment Entry**: кнопка → вибрати журнал, рахунки gain/loss, дату та дату реверсу → Create.
- Odoo автоматично створює і реверсну проводку (на початок наступного período).

---

## SEPA

### SEPA Credit Transfer (вихідні платежі)
- Призначення: пакетна оплата постачальникам через XML файл замість ручного введення на банківській платформі.
- Активація: Configuration → Settings → SEPA Credit Transfer → заповнити Company Name, Identification, Issuer.
- Після активації в Bank Journal → Outgoing Payments → з'являється метод "SEPA Credit Transfer".
- IBAN: вказати в Bank Journal → Journal Items tab → Account Number field.
- На картці вендора (Vendors → Vendors → Accounting tab): створити банківський рахунок вендора (для відправки платежу).

### Процес виплати
1. Vendors → Bills → Register Payment → вибрати журнал з SEPA → вказати recipient bank account.
2. Vendors → Payments → вибрати платежі → Create Batch.
3. Validate → у chatter генерується XML файл.
4. Завантажити XML у банківський портал.
- Навіть для одного платежу потрібно створити batch для генерації XML.

### SEPA Direct Debit (вхідні платежі від клієнтів)
- Призначення: списання коштів з рахунку клієнта за його авторизацією (мандатом).
- Активація: Configuration → Settings → SEPA Direct Debit → вказати Creditor Identifier.
- **Мандат**: Customers → Direct Debit Mandates → New:
  - Клієнт, IBAN клієнта, Journal (банківський), SDD Scheme (B2B або CORE для B2C), Start Date.
  - Identifier: автоматично або власний.
  - Revoke — кнопка відкликання мандату.

### Процес отримання оплати через SDD
1. Customers → Invoices → фільтр по SDD mandate → вибрати інвойси → Register Payment → обрати SDD метод.
2. Payments → вибрати → Actions → Create Batch Payment → Validate → XML генерується.
3. Звірка: Dashboard → Reconcile → вкладка Batch Payments → Odoo підказує match → Validate.
- Якщо у клієнта недостатньо коштів: транзакція відхиляється банком, в Odoo нічого робити не потрібно.

---

## US Tax Compliance — Avatax

- **Avatax** (від Avalara) — сервіс розрахунку Sales & Use taxes для США та Канади; автоматично оновлює ставки.

### Налаштування
1. Мати акаунт Avatax (Avalara).
2. Встановити модуль Avatax в Odoo.
3. Configuration → Settings → Taxes section → вставити API ID та API Key → Test Connection.
4. Увімкнути **Address Validation**.
5. Customers → Validate Address вручну (або автоматично при налаштуванні).
6. Configuration → Product Categories → вибрати **Avatax Category** (або на окремому продукті).
7. Configuration → Fiscal Positions → відкрити "Automatic Tax Mapping (Avatax)" → увімкнути **Use Avatax API** + **Detect Automatically**.
8. Перевірити Avatax tab: рахунки для Invoice та Refund.

### Тригери розрахунку податків
- **Автоматичні**: підтвердження замовлення, відправка email, перегляд квотації клієнтом у порталі, підтвердження інвойсу, генерація підписки, перегляд клієнтом підписки.
- **Ручний**: кнопка "Compute Taxes Using Avatax" на замовленні/інвойсі.
- eCommerce: автоматично на останньому кроці чекауту.

### Особливості
- Знижки враховуються в розрахунку.
- Reset to Draft та скасування інвойсу підтримуються (uncommitting).
- Мінімум для адреси: Country + State + Zip.
- Avatax portal: перегляд транзакцій, tax reports, tax filing, exemption certificates.

### Обмеження
- Використовується адреса компанії, не адреса складу.
- Excise taxes (паливо, тютюн, алкоголь) не підтримуються коннектором.

---

## Що нового в Accounting (Odoo 19)

### Електронні інвойси (e-Invoicing)
- Odoo сертифікований для 58 країн (e-invoicing compliant).
- Активація: Settings → Electronic Invoicing → вмикає sending + receiving.
- Вибір: отримувати білли прямо в журнал або спочатку в Documents app (з сортуванням по workspaces).
- Формат (напр., ZUGFeRD для Німеччини): **визначається автоматично** при першому відправленні.
- **Дун & Bradstreet**: новий провайдер для autocomplete даних компанії.
- **Peppoll network**: автоматична реєстрація для sending і receiving (якщо не зареєстрований на іншій платформі).
- **QR-код** та **номер банківського рахунку** можна редагувати прямо у вікні відправки.
- Кредитні ноти підтримуються в e-invoicing.
- Банківський рахунок для оплати в іноземній валюті: Odoo автоматично підбирає рахунок у валюті інвойсу.

### Sections на інвойсі
- Нові опції для секцій: можна приховати ціни або склад (composition) для окремих секцій.

### Self-billing
- Для галузей, де постачальник не надсилає білл — компанія сама генерує vendor bill і відправляє його вендору електронно.
- Налаштування: окремий Self-billing Journal → активувати Self Billing.

### AI для документів
- При надходженні нових документів AI автоматично сортує їх у правильні workspaces.
- Parking tickets → Employee workspace; insurance → Insurance workspace; vendor bill → Accounting journal.

### Professional Percentage (витрати)
- На vendor bill: поле **Professional Percentage** — скільки відсотків витрат є корпоративними.
- Odoo розраховує ПДВ відповідно; непрофесійна частина іде на окремий рахунок.
- Рахунок для private share: конфігурується в Purchase Journal → Configuration → Private Share Account.

### Банк та платежі
- **SEPA End-to-End**: bank transaction автоматично зіставляється з batch payment без ручного втручання.
- **Пріоритет платежу**: при створенні batch можна позначити платіж як "high priority".
- **Charge Bearer**: поле хто несе комісію (creditor / debtor / shared / service level).
- Оплата draft bills: можна включити чорнетковий білл у batch payment.

### Новий екран Bank Reconciliation
- Всі транзакції у вигляді списку; Odoo пропонує найлогічніший крок (фіолетові кнопки).
- **3% rule**: якщо різниця < 3% — Odoo автозіставляє; якщо > 3% — пропонує вибір.
- Можна зіставити транзакцію з **draft bill** (без підтвердження).
- Odoo вчиться з дій і автоматично створює reconciliation models.
- Upload bill прямо з reconciliation screen.

### Фіскальні позиції (зміна логіки)
- Fiscal Position тепер налаштовується **на самому податку** (поле Fiscal Position + Replaces).
- При виборі партнера з ФП — пропонуються тільки релевантні податки.

### Tax Return Dashboard
- Новий дашборд з усіма VAT дедлайнами, згрупованими по місяцях.
- Включає не тільки VAT, але й інші фіскальні дедлайни (EU localizations).
- Автоматичні перевірки (checks) перед закриттям → "reviewed" статус для кожної.
- Нотифікації: email в перший день після відкриття нового período + день до закриття.
- Після Submit: автоматичне вікно VAT payment з QR кодом.

### Audit & Closing (Working Files)
- Review → Working Files: новий інструмент для закриття.
- Вибір циклів для перевірки → список checks.
- **Balance review**: порівняння балансів між періодами; великі відхилення → drill-down.
- Якщо баланс змінився після review → статус повертається в "To Review".
- Завантаження документів до checks (напр., підписана інвентаризація).

### Inventory Valuation (новий підхід)
- Review → Inventory Valuation: Odoo пропонує проводку на основі різниці між початковим і кінцевим залишком.
- Генерація проводки в один клік.

### "To Review" мітка на інвойсах/біллах
- Документи, підтверджені користувачами з обмеженими правами, отримують мітку "To Review".
- Бухгалтер може переглядати і підтверджувати окремо або масово.

### Audit Trail (легка версія)
- Відстеження всіх змін у journal entries; бухгалтер бачить що і коли змінилось.

### Analytic Distribution
- При коригуванні аналітичного розподілу можна **заблокувати** окремі плани і редагувати тільки потрібний.

### Ask AI
- Нова функція: запитати AI → він знаходить дані в базі і будує графічне представлення.

### Expense Credit Cards (Stripe Issuing)
- Фізичні та віртуальні корпоративні картки (Mastercard через Stripe).
- Налаштування: ім'я картки, holder, категорії витрат (fast food, hotel тощо), ліміти (загальний і на транзакцію).
- Транзакції автоматично потрапляють у Stripe Issuing journal.
- Співробітник отримує активність → прикріплює чек.
- Submit → одразу затверджено (контроль на рівні категорій картки).
- Post Entries → автоматична звірка → статус Paid.
- Потребує наявності Stripe акаунту.
