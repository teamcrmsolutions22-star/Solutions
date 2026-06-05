# Odoo Sales — відео-конспекти YouTube

> Джерело: офіційні YouTube-відео Odoo (транскрипти), 2026-06

---

## Базові продажі (Sales Basics)

- Головна сторінка Sales-додатку за замовчуванням показує лише квотації поточного користувача (фільтр); прибравши фільтр — видно всі замовлення бази.
- Головне меню: **Orders** (Quotations, Orders, Sales Teams, Customers), **Products** (Products, Variants, Pricelists, Discounts & Loyalty, Gift Cards), **To Invoice** (Orders to Invoice, Orders to Upsell), **Reporting**, **Configuration** → Settings.
- Всі ключові параметри продажів налаштовуються через **Configuration → Settings**: каталог продуктів, ціноутворення, квотації, замовлення тощо.

---

## Комерційні пропозиції (Quotations)

### Створення квотації
- Нова квотація: **Orders → Quotations → New**.
- Поля заголовку: Customer (адреса доставки та інвойсу підтягуються автоматично якщо клієнт є в базі), Quotation Template, Expiration Date, Recurring Plan (для підписок), Pricelist, Payment Terms.
- Вкладка **Order Lines**: додавання продуктів через «Add a product» або кнопку **Catalog** (канбан-вигляд каталогу). Підтримуються секції (sections) та нотатки (notes) з можливістю перетягування.
- Додаткові кнопки в Order Lines: **Add a coupon code**, **Reward discounts**, **Add shipping costs**.
- Вкладка **Optional Products**: супутні товари, які клієнт бачить у порталі та може додати одним кліком.
- Вкладка **Quote Builder**: вибір PDF-заголовків, футерів, документів продукту для фінального PDF.
- Вкладка **Other Info**: поля для продажів, інвойсингу, доставки.
- Вкладка **Notes**: внутрішні нотатки (не видимі клієнту).
- Кнопка **Preview** — перегляд квотації з точки зору клієнта (customer portal).
- **Send by Email** — відправка з вкладеним PDF; статус змінюється на «Quotation Sent».
- **Confirm** — перетворення квотації на Sales Order.

### Варіанти продуктів у квотації
- При додаванні продукту з варіантами з'являється popup для вибору конкретного варіанту.

### Нові можливості (v18/v19)
- **Секції з підсекціями**: можна приховувати ціни в секції або ховати цілі секції від клієнта.
- **Каталог з секціями**: продукти в каталозі організовуються по секціях шаблону квотації.
- **Версіонування квотацій**: всі пов'язані квотації видно через CRM-opportunity.

---

## Шаблони пропозицій (Quotation Templates)

### Активація
- **Configuration → Settings → Quotations & Orders → Quotation Templates** → увімкнути → Save.

### Створення шаблону
- **Configuration → Quotation Templates → New**.
- Поля: назва, Quotation Validity (днів; 0 = завжди дійсний), Confirmation Mail (email-шаблон при підтвердженні), Company (для мульти-компанії; порожньо = всі), Invoicing Journal.
- **Quotation Calculator**: прикріплення Excel-подібного spreadsheet для розрахунку складних цін (наприклад, сонячні панелі, меблі з виміром). Значення автоматично переносяться у поле ціни квотації.
- Чекбокси: **Online Signature** (клієнт підтверджує підписом), **Online Payment** (% передоплати; можна налаштувати відсоток).
- Recurring Plan — для підписок.
- Вкладка **Lines**: товари та кількості.
- Вкладка **Optional Products**: пропозиції супутніх товарів.
- Вкладка **Terms and Conditions**: специфічні умови шаблону.
- Вкладка **Quote Builder**: PDF-заголовки та футери для шаблону.
- Порядок шаблонів у dropdown можна змінювати перетягуванням.

### Використання
- На формі квотації: поле **Quotation Template** → вибір → Order Lines, Optional Products, Terms, Expiration Date заповнюються автоматично.
- Клієнт у порталі: **Sign and Pay** → електронний підпис → оплата (мінімум % від суми як налаштовано).

---

## Онлайн-квотації (Online Quotations)

- Потрібні увімкнені налаштування: **Online Signature**, **Online Payment**, **Quotation Templates**, **Quotation Builder** (вимагає встановленого модуля Website).
- **Design Template** (кнопка на формі шаблону) — відкриває Website Builder для кастомізації зовнішнього вигляду квотації (drag-and-drop блоки, без коду).
- Optional Products: клієнт додає їх у порталі одним кліком; ціна оновлюється автоматично.
- Після підписання та оплати — статус квотації оновлюється; підпис і PDF зберігаються в chatter.
- Якщо налаштовано payment provider — оплата обробляється автоматично.

---

## PDF Quote Builder

### Активація
- **Configuration → Settings → Quotations & Orders → PDF Quote Builder** → Save.
- Також потрібен модуль **Website**.

### Логіка роботи
- PDF Quote = динамічний заголовок (header) + стандартний order lines блок + додаткові секції (про компанію, testimonials, продуктові документи, умови) + футер.
- Headers/Footers зберігаються у **Configuration → Headers & Footers**.

### Створення динамічного PDF-заголовку
1. Створити PDF у зовнішньому редакторі (Adobe Acrobat Pro, Scribus, тощо).
2. Додати **text fields** у PDF; назви полів мають відповідати технічним іменам полів Odoo (через підкреслення замість крапок: `partner_id_name` замість `partner_id.name`).
3. Знайти технічне ім'я поля в Odoo: увімкнути **Developer Mode** → навести на знак «?» біля поля → в popup є рядок **Field**.
4. Завантажити PDF через кнопку **Upload** на сторінці Headers & Footers.
5. Відкрити запис → **Configure Dynamic Fields** → перевірити маппінг (Odoo намагається зіставити автоматично).
6. Вказати **Document Type**: Header або Footer.
7. Опціонально: **Add by Default** — PDF додається до всіх квотацій автоматично.
8. Прикріпити до **Quotation Template** у вкладці Quote Builder.

### Використання у квотації
- Вкладка **Quote Builder** у квотації: вибрати потрібні headers/footers/документи продуктів галочками.
- При **Send by Email** — Odoo компілює повний PDF і прикріплює до листа.

---

## Заголовки та футери для шаблонів і продуктів

### Документи продуктів
- На формі продукту: кнопка **Documents** (smart button) → список документів продукту.
- Типи: **File** (завантажити PDF) або **URL**.
- Налаштування видимості (`Visible in Sales` / `Sale Visibility`):
  - **Hidden** — не показувати клієнту
  - **Inside Quote PDF** — включається в PDF квотації
  - **On Confirmed Order** — доступно після підтвердження замовлення
- **Publish on Website** — клієнт може завантажити PDF зі сторінки продукту на сайті.
- Документи варіантів: додаються на формі конкретного варіанту (Products → Product Variants).
- Документ батьківського продукту включається автоматично, якщо не прихований.

### PDF та шаблони квотацій
- На формі шаблону: вкладка **Quote Builder → Add Headers and Footers** → вибір з popup.
- Headers/Footers, прикріплені до шаблону, доступні лише для квотацій, що використовують цей шаблон.

---

## Продукти (Products)

### Створення продукту (Products → Products → New)
- **Поля заголовку**: назва, фото, чекбокси Sales / Purchase / Subscriptions.
- **Вкладка General Information**:
  - **Product Type**: Goods або Service.
  - Для **Service**: Create on Order (нічого / Task / Project & Task / Project); Invoicing Policy (Prepaid/Fixed Price, Milestones, Delivered Quantities, Timesheets).
  - Для **Goods**: Track Inventory (By Quantity / Lots / Serial Numbers); Invoicing Policy (Ordered Quantities / Delivered Quantities).
  - Sales Price, Sales Tax (за замовчуванням 15%), Cost, Category, Internal Reference (SKU/barcode).
  - Company (для мульти-компанії; порожньо = всі).
- **Вкладка Attributes & Variants**: додавання атрибутів (колір, матеріал тощо) та значень.
- **Вкладка Sales**:
  - **Optional Products** — пропонуються при оформленні замовлення.
  - **Accessories** — додаткові товари, що покращують основний (відображаються окремо).
  - **Alternative Products** — схожі товари для порівняння клієнтом.
  - **E-commerce**: сайт, категорія, продавати якщо немає в наявності, показувати залишок, повідомлення «out of stock», теги, медіа (додаткові фото, відео).
- **Вкладка Inventory**: маршрути (Buy, Manufacture, Dropship тощо), вага, об'єм, Customer Lead Time.
- **Вкладка Accounting**: рахунки доходів/витрат.
- **Smart buttons**: Pricelists, Documents, Go to Website (червоний = не опублікований).
- Публікація на сайті: **Go to Website** → toggle Unpublished → Published.

### Invoicing Policy (детально)
- **Goods — Ordered Quantities**: інвойс одразу після підтвердження замовлення (default).
- **Goods — Delivered Quantities**: інвойс після валідації доставки.
- **Service — Prepaid/Fixed Price**: аналог Ordered Quantities для послуг.
- **Service — Delivered Quantities**: вручну вводиться кількість у полі Delivered на підтвердженому SO перед створенням інвойсу.
- **Service — Milestones**: кількість оновлюється автоматично через досягнення у модулі Project (потрібен Project app + увімкнені Milestones).
- **Service — Timesheets**: рахується по годинах у Timesheets app (потрібен Timesheets app + увімкнені Timesheets у Project settings).
- Глобальний default: **Configuration → Settings → Invoicing → Invoicing Policy** (для всіх нових продуктів; не змінює існуючі).
- **Automatic Invoice**: **Settings → Invoicing → Automatic Invoice** — Odoo автоматично генерує інвойс після онлайн-оплати (не відправляє автоматично).

---

## Варіанти продуктів (Product Variants)

### Активація
- **Configuration → Settings → Product Catalog → Variants** → Save.

### Атрибути (Attributes)
- **Configuration → Attributes** або посилання в Settings під варіантами.
- Атрибут = параметр (колір, розмір, матеріал); Значення = конкретні опції (червоний, синій).
- **Display Type** (як відображається у e-commerce): Radio, Pills, Select (dropdown), Color, Multi-Checkbox.
- **Variant Creation Mode**:
  - **Instantly** — всі можливі варіанти створюються одразу при додаванні атрибуту до продукту (найпоширеніший).
  - **Dynamically** — варіант створюється лише коли додається до SO.
  - **Never** — варіанти не створюються на сторінці атрибутів продукту.
  - Режим не можна змінити, якщо атрибут вже використовується хоча б в одному продукті.
- **E-commerce Filter Visibility**: Visible / Hidden.
- **Default Extra Price** для значення — додається до базової ціни продукту.
- **Free Text checkbox** — дозволяє клієнту ввести власне значення (для кастомізаційних атрибутів).

### Додавання до продукту
- Форма продукту → вкладка **Attributes & Variants** → **Add a line** → вибір атрибуту → вибір значень.
- Після збереження — smart button **Variants** у верхній частині форми.
- На формі окремого варіанту: налаштування фото, кодів, логістики, ціноутворення, продажних налаштувань.
- Навігація між варіантами: стрілки у правому верхньому куті форми варіанту.

---

## Прайс-листи (Pricelists)

### Активація
- **Configuration → Settings → Pricing → Pricelists** → Save.

### Створення прайс-листа
- **Configuration → Pricelists → New**.
- Поля: назва, Company, Country Groups (обмеження по регіону; порожньо = всі).
- Вкладка **Price Rules** → **Add a line** → popup для налаштування правила:
  - **Apply on**: Product або Category.
  - **Price Type**: Discount %, Fixed Price, Formula.
  - **Formula**: задається % знижки, округлення (до найближчих N одиниць), extra fee (наприклад, -0.01 для цін типу $X.99).
  - **Minimum Quantity**: поріг кількості для застосування знижки.
  - **Validity Period**: дати початку та кінця дії правила.
- Вкладка **Recurring Prices**: для підписок.
- Вкладка **E-commerce**: публікація прайс-листа на сайті; клієнт може самостійно вибрати.

### Швидке додавання правила до продукту
- На формі продукту → smart button **Pricelists** → **New** → вказати назву, ціну, мін. кількість, дати.

### Застосування
- На формі квотації: поле **Pricelist** — вибір потрібного прайс-листа.
- На сайті: якщо pricelist опублікований, клієнти бачать знижкову ціну при додаванні до кошика (враховується мін. кількість).

---

## Знижки, купони, акції (Discounts, Coupons, Promotions)

### Активація
- **Configuration → Settings → Pricing → Discounts, Loyalty & Gift Cards** → Save.

### Типи програм (Products → Discounts & Loyalty)
| Тип | Опис |
|-----|------|
| **Coupons** | Унікальний код для конкретного клієнта, зазвичай одноразовий |
| **Promotion** | Загальний промо-код, може використовуватися багатьма |
| **Discount Code** | Код, який клієнт вводить при checkout для знижки |
| **Next Order Coupons** | Купон на наступне замовлення |
| **Loyalty Cards** | Програма накопичення балів |
| **Buy X Get Y** | Безкоштовний продукт за покупку N одиниць |
| **Gift Card** | Подарункова картка з фіксованою сумою |

### Налаштування програми (загальне)
- Назва, Program Type, Currency, Validity (дата закінчення; порожньо = безстрокова), Max Usages (ліміт застосувань), Company, Available On (Sales / Website / Point of Sale).
- Вкладка **Conditional Rules**: умови (мін. кількість, мін. сума, конкретні продукти/категорії/теги, discount code).
- Вкладка **Rewards**: тип нагороди — Discount (% або фіксована сума, на весь ордер / конкретний продукт / найдешевший товар), Free Product, Free Shipping. Поля: Max Discount, Description on Order.

### Знижка 100% на найдешевший товар (лайфхак)
- Reward Type: Discount → 100% → On: Cheapest Product.

### Купони (Coupons)
- Program Type: Coupons.
- Після налаштування: кнопка **Generate Coupons**.
  - **Anonymous Customers**: вказати кількість, Odoo генерує коди.
  - **Selected Customers**: вибрати клієнтів (можна кілька) або залишити порожнім = всі клієнти. Встановити дату закінчення.
- Odoo автоматично відправляє email з кодом вибраним клієнтам.
- Smart button **Coupons** показує всі згенеровані коди.
- Технічно: будь-хто може використати отриманий код (не прив'язується до конкретного акаунту).

### Discount Code (промо-код)
- Клієнт вводить код у поле «Discount Code» в кошику на сайті.
- Застосування коду відображається як окремий рядок знижки в замовленні.

---

## Програми лояльності та подарункові картки

### Програми лояльності (Loyalty Programs)
- Program Type: **Loyalty Cards**.
- **Points Unit**: кастомна назва балів (наприклад, «Stealthy Points»).
- **Conditional Rules**: мін. кількість, мін. сума покупки; можна виділити бонусні продукти з підвищеними балами.
- **Points awarded**: per order / per dollar spent / per unit.
- **Rewards**: знижка в %, безкоштовний продукт тощо. Встановлюється вартість нагороди в балах (Points Cost).
- Клієнт **повинен мати акаунт** для участі в програмі (відстеження балів).
- Odoo автоматично додає клієнта до програми при першому кваліфікованому замовленні.
- В SO: кнопка **Reward** (внизу order lines) → вибір нагороди → знижка додається окремим рядком.
- Перегляд балів клієнта: форма контакту → smart button **Loyalty Cards**.

### Подарункові картки (Gift Cards)
- **Products → Gift Cards & eWallet** (або **Products → Discounts & Loyalty**).
- Program Type: **Gift Card**.
- Поля: Gift Card Product (продукт-картка в базі), Email Template (шаблон листа при отриманні картки), Print Report (для POS — що друкується), Currency, Company, Available On.
- Генерація: **Generate Gift Cards**:
  - **Anonymous** — кількість + сума + термін дії + опис → Odoo генерує коди.
  - **Selected Customers** — кількість генерується автоматично по кількості клієнтів.
- Відправка конкретному клієнту: кнопка **Send** в списку карток.
- Клієнт застосовує картку в кошику через поле «Gift Card or Discount Code».

---

## Комісійні плани (Commission Plans)

### Активація
- **Configuration → Settings → Invoicing → Commissions** → Save.
- Після збереження з'являється пункт меню **Commissions** у верхньому меню Sales.

### Два типи планів
| Тип | Опис |
|-----|------|
| **Achievements per salesperson** | Фіксований % від суми інвойсів продавця |
| **Targets** | Комісія залежить від % досягнення цільового показника |

### Налаштування плану (Commissions → Commission Plans → New)
- Назва, Type (Achievements / Targets), On-Target Commission ($ при 100% виконанні цілі, для типу Targets).
- **Effective Period**: дати початку/кінця (кваліфіковані інвойси в цьому діапазоні).
- **Target Frequency**: Monthly / Quarterly / Yearly.
- **Performance based on**: Individual Salesperson або Sales Team (для менеджерів).

### Вкладка Targets
- При Quarterly — автоматично створюються 4 квартальні цілі.
- Встановити суму цілі ($) для кожного періоду.

### Вкладка Achievements
- Метрика: Quantity Sold / Margin / **Amount Invoiced** (найпоширеніша).
- Rate Percentage: % від метрики, що використовується для розрахунку.

### Вкладка Salespeople
- **Add New Salesperson** → вибір продавця.
- From / To: дати для конкретного продавця (можуть відрізнятися від дат плану).
- **Other Plans**: показує інші плани, до яких належить продавець.

### Вкладка Commission (тири)
- Задаються рівні: % досягнення → $ комісії.
- Приклад: 50% → $500, 100% → $2000, 150% → $3500, 200% → $4000.
- Графік візуально відображає криву комісії.

### Затвердження та редагування
- **Approve** — план починає розраховувати комісії.
- **Reset to Draft** — для редагування або додавання продавців.
- Комісія розраховується на основі **підтверджених інвойсів** у межах effective period.

---

## Податки з продажів (Sales Tax)

### Основи
- При створенні бази Odoo автоматично встановлює локалізаційний пакет з податками країни компанії.
- Перегляд та редагування: **Accounting → Configuration → Taxes** (або **Invoicing → Configuration → Taxes**).

### Типи розрахунку податку (Tax Computation)
| Тип | Опис |
|-----|------|
| **Group of Taxes** | Група кількох податків, застосовуються всі одночасно |
| **Fixed** | Фіксована сума незалежно від ціни |
| **Percentage of Price** | % від ціни продукту (ціна × % = сума податку) |
| **Percentage of Price Tax Included** | % від ціни вже з включеним податком (ціна / (1 - %) = база) |
| **Python Code** | Кастомний розрахунок на Python (потрібен модуль «Defined Taxes as Python Code») |

### Налаштування форми податку
- **Tax Type**: Sales / Purchase / None (для групи без самостійного відображення).
- **Tax Scope**: Goods / Services (або порожньо = без обмежень).
- **Amount**: % або фіксована сума.
- Вкладка **Definition**: Distribution for Invoices та Distribution for Refunds.
  - Обов'язковий рядок **Base** (посилання на order line).
  - Рядок з % та акаунтом, куди записується податок (journal item створюється автоматично при кожному продажу).
  - **Tax Grids**: для автоматичної генерації звітів по країні.
- Вкладка **Advanced Options**: Label on Invoices (текст для клієнта), Tax Group (відображення над Total на інвойсі), Country, Company, Include in Price (ціна вже включає податок).

### Default Tax
- **Accounting/Invoicing → Configuration → Settings → Default Taxes** — глобальний default для нових інвойсів (можна змінити на рівні окремого SO або продукту).

### Fiscal Positions (Податкові позиції)
- **Accounting → Configuration → Fiscal Positions**.
- Автоматично застосовують інший набір податків для клієнтів певних країн/регіонів.
- **Detect Automatically**: VAT Required + Country → автоматична прив'язка.
- Вкладка **Taxes**: маппінг «податок у нас → податок для клієнта» (наприклад, 15% → 5% для Канади).
- Вкладка **Accounts**: маппінг рахунків.
- Вбудовані опції: **AvaTax** і **Tax Cloud** — API-сервіси для автоматичного розрахунку US-податків по штатах/містах (потрібна установка відповідних модулів).
- Призначення fiscal position клієнту: форма контакту → поле **Fiscal Position**.

### Застосування у квотації
- При додаванні продукту до SO — default-податок підтягується автоматично (якщо не налаштована fiscal position на контакті і не перевизначено на продукті).
- Зміна податку безпосередньо в рядку SO: клік на поле Taxes → вибір з dropdown.
- Клієнт бачить суму податку в Customer Preview у розділі Pricing.

---

## Терміни та ціни доставки

### Терміни доставки (Delivery Lead Times)
- Налаштовується на рівні **продукту**: форма продукту → вкладка **Inventory** → секція Logistics → поле **Customer Lead Time** (кількість днів).
- За замовчуванням: 0 (не відкладати).
- Дата доставки в SO: **Other Info → Delivery Date** = дата замовлення + Customer Lead Time.
- Також відображається у **Delivery Order** (smart button у SO) у полі **Scheduled Date**.

### Security Lead Time (буфер)
- **Inventory → Configuration → Settings → Advanced Scheduling → Security Lead Time for Sales** → вказати кількість днів.
- Внутрішня дата доставки (Scheduled Date у Delivery Order) = очікувана дата клієнта **мінус** security lead time.
- Це дозволяє вчасно відреагувати на затримки і все одно доставити вчасно.

### Методи доставки (Delivery Prices / Delivery Methods)
- Активація: **Configuration → Settings → Shipping → Delivery Methods** → Save.
- Перегляд: **Configuration → Shipping Methods**.
- Щоб метод був доступний клієнтам — потрібно **опублікувати** (кнопка Published у формі методу).

### Створення методу доставки (New)
- **Name**, **Website** (порожньо = всі), **Provider**:
  - **Fixed Price** — фіксована вартість.
  - **Based on Rules** — правила по вазі/об'єму/кількості/ціні.
  - **Pick Up in Store** — самовивіз (потрібна функція Onsite Payments у Website settings).
  - Інтегровані перевізники: FedEx, UPS, bpost та інші.
- **Company** (порожньо = всі), **Delivery Product** (назва рядка доставки в SO).
- **Free if Order Above**: поріг суми для безкоштовної доставки.
- Вкладка **Pricing**:
  - Fixed Price: одна ціна.
  - Rules-based: список правил у вигляді умов (Weight/Volume/Price/Quantity ≥/≤ X → ціна Y).
  - Порядок правил важливий: Odoo перевіряє зверху вниз, застосовує перше підхожче.
- Вкладка **Destination Availability**: обмеження по країнах, штатах, zip-кодах (порожньо = без обмежень).
- Вкладка **Description**: текст для клієнта онлайн та в листах-підтвердженнях.

### Застосування у SO
- Кнопка **Add Shipping** внизу order lines → вибір методу → **Add**.
- При досягненні порогу безкоштовної доставки: рядок доставки підсвічується жовтим, кнопка **Update Shipping** — оновити до $0.
- Для правил по вазі: вага **обов'язково** має бути вказана на формі продукту (вкладка Inventory).

---

## Дропшипінг (Dropshipping)

### Активація
- **Purchase → Configuration → Settings → Logistics → Drop Shipping** → Save.

### Налаштування продукту для дропшипінгу
1. Форма продукту → вкладка **Inventory** → **Routes** → поставити галочку **Dropship**.
2. Вкладка **Purchase** → **Add a line** → вказати постачальника та ціну закупівлі.
3. При кількох постачальниках — Odoo використовує першого в списку для дропшипінгу (можна змінити порядок drag-and-drop).

### Флоу дропшипінгу
1. Підтверджений SO → замість Delivery smart button з'являється **Purchase** smart button.
2. Відкрити Purchase → **Confirm Order** → з'являється **Dropship** smart button.
3. У Dropship-ордері: **Set Quantities** → **Validate** → статус «Done».
4. Повернення до SO: з'являється smart button **Dropship** (замість Delivery).
- Ідентифікація: в назві Dropship-ордеру є префікс **DS**.
- Вкладки Dropship-ордеру: Operations, Additional Info — містять інформацію з вихідного SO.

---

## Калькулятор квотацій (Quote Calculator)

- Інструмент для продуктів з комплексним кастомним ціноутворенням.
- Фактично — spreadsheet (Excel-подібний), прикріплений до шаблону квотації.
- Поля spreadsheet прив'язані до конкретних полів у рядках квотації (Unit Price, Quantity тощо).
- Продавець відкриває калькулятор з квотації, вводить параметри (відстань, виміри, години тощо) → ціни підтягуються автоматично.
- Налаштування: у формі **Quotation Template** → поле **Quotation Calculator** → вибрати або завантажити spreadsheet.
- В квотації кнопка **Quote Calculator** з'являється автоматично при використанні відповідного шаблону.

---

## Що нового в Sales (v18/v19)

### Квотації та замовлення
- **Секції з підсекціями**: організація рядків замовлення у вкладені групи.
- **Приховування цін у секціях**: окремі секції або цілі блоки можна показати без цін.
- **Каталог з секціями**: при відкритті каталогу з квотації, що використовує шаблон із секціями, продукти відображаються по секціях.
- **Versioning quotations**: всі версії пропозиції для клієнта видно в CRM-opportunity.

### Комісії
- Новий модуль **Sales Commissions**: плани на основі цілей або досягнень, підтримка тирів, індивідуальні та командні плани.

### Нові платіжні провайдери
- DPO Pay, Liqo, NubiPay, Mob, RedSys.

### Нові маркетплейс-конектори
- Gelato, Shopee Sync.

### CRM + Sales інтеграція
- Запит з сайту через форму Contact Us → автоматично створює opportunity в CRM.
- З opportunity — відправка листа з dynamic placeholders (ім'я клієнта підставляється автоматично).
- Підпис NDA через додаток **Sign** прямо з SO: **gear icon → Request Signature** → вибір документу → відправка клієнту → підпис зберігається з геолокацією та IP (юридично значущий підпис).

### Loyalty / Rewards у порталі
- Клієнт бачить кількість накопичених loyalty points у своєму обліковому записі після оформлення замовлення.
