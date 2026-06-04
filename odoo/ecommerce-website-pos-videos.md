# Odoo eCommerce, Website, POS, Rental, IoT — Knowledge Base (Video Transcripts)

---

## eCOMMERCE

### Налаштування інтернет-магазину

**Загальна концепція**
- Odoo eCommerce повністю інтегрований з модулями Inventory, Sales, Accounting — без дублювання даних
- Інтернет-магазин доступний 24/7, зміни на фронтенді публікуються миттєво
- Продукти можна створювати з фронтенду (публікуються автоматично) або з бекенду (потрібна ручна публікація)
- Масовий імпорт товарів через XLS/CSV: Ecommerce → Products → шестерня (⚙) → Import Records

**Налаштування магазину (Configuration → Settings)**
- **Pricelist** — обов'язково активувати для знижок та цінових формул
- **Product Variants** — активувати для роботи з варіантами товарів
- **Wishlist** — дозволяє авторизованим користувачам зберігати товари
- **Product Comparison** — інструмент порівняння товарів за атрибутами
- **Prevent sale of zero-priced products** — кнопка "Add to cart" замінюється на "Contact us" для товарів без ціни
- **Continue selling out-of-stock products** — якщо вимкнено, відсутні товари недоступні для замовлення
- **Show available quantity** — відображати залишок, якщо менше X одиниць
- **Sign in/Sign up** — Optional / Disabled / Mandatory (налаштування акаунтів покупців)

**Дизайн каталогу (v19)**
- Нова система редагування з миттєвим застосуванням змін (без затримок 300–500 мс)
- Product Design Controller: зміна шаблону картки товару безпосередньо на сторінці каталогу
- Доступні шаблони картки: thumbnails, grid, list, cards, chips, showcase (великі картки)
- Параметри картки: gap, roundness, over-effect, alignment, font size, image ratio, hover animation
- Hover-ефекти: показ secondary image, zoom, кнопки add-to-cart / compare / favorite
- Floating bar (плаваюча панель пошуку/сортування) — замість статичного sidebar
- Автоматична генерація 5 кольорових пресетів з теми сайту

---

### Товари та каталог

**Категорії товарів (eCommerce → Categories)**
- Ієрархія: одна батьківська категорія + необмежена кількість дочірніх
- Додати категорію на продукт: вкладка Sales → Categories
- Відображення категорій у каталозі: Edit → Customize → Category Section (ліворуч або зверху)
- Collapse children categories — приховати підкатегорії
- Порядок категорій у sidebar визначається порядком у бекенді (drag-and-drop)

**Ribbons та Badges (v19)**
- Автоматичне призначення ribbon за умовами: manually / on sale / new / out of stock
- Для "new" ribbon можна задати термін новизни (в днях)
- Badges — нова сутність поряд із ribbons (v19)
- Налаштування ribbon: назва, колір фону, колір тексту, позиція (ліво/право)

**Варіанти відображення атрибутів на картці товару (v19)**
- Поле "On Product Card" на рівні атрибута — показувати варіанти прямо в каталозі
- Типи відображення: thumbnails (зображення варіанту), pills, color, select
- Новий тип атрибута "Image" — для відображення текстур і деталей матеріалу

**Фільтри каталогу (v19)**
- Автоматичний collapse фільтрів при великій кількості значень
- Автоматична поява search field при більше ніж 20 значень атрибута
- View More кнопка при більше ніж 8 атрибутів
- Перероблений компаратор: тепер порівнює конкретні variants (не шаблони), доступний на мобільних

**Packaging як атрибут (v19)**
- Дозволяє продавати один товар у різних одиницях вимірювання (pack of 2, pack of 6)
- Управління пакуванням: вкладка Sales на продукті

**Динамічні сніпети для eCommerce**
- **Category snippet** — автоматично підтягує категорії; можна вибрати всі або конкретну + підкатегорії
- **Payment method snippet** — inner snippet, показує всі встановлені методи оплати автоматично
- Статичний product snippet — підтягує дані товару (ціна, назва) з БД в реальному часі

**Швидке замовлення (Quick Reorder)**
- Відображає 10 останніх замовлень покупця прямо в кошику
- Особливо корисно для B2B (регулярні закупівлі)

**Click & Collect (v19)**
- На сторінці товару відображається кількість на складі для кожного магазину
- Управління наявністю для доставки та самовивозу окремо

---

### Варіанти товарів

**Конфігурація атрибутів**
- Attributes & Variants вкладка на продукті
- Odoo автоматично підраховує кількість варіантів з усіх атрибутів
- На рівні значення атрибута можна задати extra price (наценку)
- Extra price можна перевизначити для конкретного продукту через кнопку "Configure" на атрибуті
- Для кожного варіанту можна завантажити окреме зображення через smart button "Variants"
- Можна деактивувати конкретний варіант (прибрати зі списку) — він стає недоступним на сайті
- Display type для атрибута: radio, pills, select, color, multicheck box

**Варіанти та Stock**
- Product type "Goods" (не Service) + "Track Inventory" — обов'язково для управління залишками
- Оновлення кількості: smart button "On Hand Quantity" → вибір варіанту → кількість
- Повідомлення Out of Stock можна кастомізувати на продукті (вкладка Sales)

---

### Ціноутворення

**Pricelistи**
- Configuration → Settings → Pricelist — увімкнути
- Відображення ціни: з ПДВ або без (налаштування відображення в Settings)
- Pricelist прив'язується до Country Group (автоматичне застосування за країною)
- Pricelist можна зробити selectable клієнтом (вкладка eCommerce → Selectable)
- Промокод для прайсліста: вкладка eCommerce → Promotional Code (знімити Selectable, ввести код)

**Валюти**
- Додаткові валюти активуються в Settings → Currencies
- Пов'язані з конкретним Pricelist через поле Currency на прайслісті

---

### Програми лояльності та e-Wallet

**Активація**: Settings → Discounts, Loyalty & Gift Card

**Loyalty Card (eCommerce → Discount & Loyalty)**
- Program type: loyalty card, discount code, buy X get Y, coupons тощо
- Умови (Rules): мінімальна кількість, мінімальна сума покупки, кількість points
- Нагороди (Rewards): безкоштовний товар / знижка (% від замовлення / на найдешевший / на конкретний) / безкоштовна доставка
- Назву "loyalty points" можна кастомізувати (наприклад, "stitches")
- Програму можна обмежити певним Pricelist та Point of Sale

**Gift Cards (eCommerce → Gift Cards & Wallets)**
- Прив'язується до продукту, який продається в магазині
- Генерація: кількість карток + номінал + термін дії
- Анонімні (будь-хто з кодом) або для конкретних клієнтів
- Print report: для фізичних магазинів (потрібен POS)
- Можна надіслати на email або поділитись посиланням

**eWallet**
- Аналог gift card, але: купівля = поповнення гаманця, gift card = передача коштів іншій особі
- Покупець може бачити залишок в Customer Portal

**Використання на сайті**
- Discount code (з gift card або loyalty) вводиться в кошику / на checkout
- eWallet автоматично пропонується як метод оплати

---

### Стратегії продажів

**Cross-selling та Upselling** (вкладка Sales на продукті)

| Тип | Де відображається | Призначення |
|-----|---|---|
| Optional Products | Popup при натисканні "Add to Cart" | Доповнюючі товари |
| Accessory Products | На сторінці перегляду кошика | Аксесуари/доповнення |
| Alternative Products (Upsell) | Блок на сторінці товару | Альтернативні/кращі версії |

- Для кожного поля можна додати кілька товарів
- Шаблон блоку alternative products налаштовується через Edit (кількість елементів, стиль)

---

### Кошик та оформлення замовлення

**Дії при "Add to Cart"**: залишитись на сторінці / перейти в кошик / вибір (налаштування в Settings)
- **Buy Now button** — миттєвий перехід до оплати, минаючи кошик

**Checkout кастомізація**
- Extra Step (додатковий крок після доставки): кастомізована форма для довільної інформації (подарункове повідомлення, завантаження файлу тощо)
- Налаштування Extra Step через фронтенд Edit або Configuration → Settings
- Accept Terms & Conditions — чекбокс на кроці оплати
- Приховати B2B fields — для B2C магазинів

**Адреси**
- Google Address Autocomplete — автодоповнення адреси (налаштовується в Settings)

**Delivery для сервісних продуктів (v19)**
- Автоматичне визначення: якщо замовлення складається тільки з service-продуктів (квитки, апоінтменти) — крок доставки пропускається
- Прискорений checkout без полів адреси

**Customizable Login Page (v19)**
- Можна додавати форми та прайсліст на сторінку входу для категоризації клієнтів

---

### Управління замовленнями

**Статуси замовлень**
- **Quotation** — товар в кошику, checkout не завершено
- **Quotation Sent** — checkout пройдено, оплата не підтверджена (wire transfer, pickup)
- **Sales Order** — оплата підтверджена

**Автоматизації (Settings → Checkout Process)**
- Призначення sales team та продавця для онлайн-замовлень
- WhatsApp-повідомлення клієнту при підтвердженні замовлення
- Abandoned cart email — відправляється авторизованим покупцям через X годин (налаштовується)
- Automatic Invoice — генерація інвойсу при підтвердженні оплати
- Confirmation email після доставки (потрібен Inventory модуль)
- SMS-сповіщення після доставки (потрібні SMS credits)

**Фільтрація замовлень**: eCommerce → Orders
- Фільтри: Unpaid / Abandoned / за статусом інвойсу

**Повернення та рефанди**
- Кнопка Return на підтвердженому замовленні → вказати кількість → Validate → товар повертається на склад
- Рефанди: через Accounting модуль

---

### Клієнтський портал

**Режими доступу** (Settings → Sign in/Sign up)
- **Optional** — guest або реєстрація після підтвердження
- **Disabled** — тільки гості
- **Mandatory** — тільки авторизовані

**Надання доступу конкретному клієнту (B2B)**
- eCommerce → Customers → Actions → Grant Portal Access
- Можна відкликати або повторно запросити клієнта

**Customer Portal**
- Покупець бачить: sales orders, invoices, bills, projects, orders
- Контент порталу кастомізується через website builder (drag-and-drop, видалення секцій)
- Product name автозаповнюється в контактних формах (v19)

---

### Доставка та платіжні провайдери

**Методи доставки** (Configuration → Delivery Methods)

**Вбудовані інтеграції**: DHL, UPS, FedEx, Bpost та ін.

**Поле Integration на методі доставки**:
- *Get Rate* — розрахунок вартості без бронювання відправки (ручне бронювання поза Odoo)
- *Get Rate and Create Shipment* — автоматично бронює відправку при валідації delivery order

**Власний метод (Rule-based)**:
- Pricing rules: умова (вага/обсяг/кількість) + базова ціна + множник
- Можна задати безкоштовну доставку від суми замовлення
- Обмеження по максимальній вазі та об'єму

**Pickup in Store**:
- Одна запис = один фізичний магазин
- Публікується окремо для кожної точки

**Платіжні провайдери** (Configuration → Payment Providers)
- Режими: Disabled / Test (fake payment) / Enabled
- **Test mode** — рекомендується при першому налаштуванні
- Configuration tab:
  - Payment Methods (картки, bank transfer, digital wallets)
  - Allow saving payment methods — збереження даних картки для швидкого checkout
  - Capture Amount Manually — авторизація без списання (списання вручну пізніше)
  - Express Checkout — оминути стандартний checkout flow
- Availability: обмеження по сумі, валютах, країнах
- Messages tab: кастомні повідомлення для статусів оплати

**Cash on Delivery (v19)**
- Новий провайдер: оплата при доставці
- Підтверджує sales order без передплати (запускає всі post-processing процеси: доставку тощо)
- Активується чекбоксом на кожному delivery method окремо

**Нові інтеграції (v19)**
- **Gelato** — print-on-demand сервіс (друк та відправка футболок, кружок тощо)
- **Google Merchant Center** — синхронізація каталогу; сумісно з Meta, TikTok Shop, Facebook, Instagram, Amazon
- Конфігурація: Settings → Google Merchant Center → Feeds (мова, прайсліст, категорії)

---

### Що нового в eCommerce (v19)

**Дизайн і UX**
- Нова система редагування без затримок (immediate preview)
- 6+ нових шаблонів сторінки каталогу (Tokyo, showcase, grid, list, thumbnails, chips)
- Product card повністю інтегровано з Color System теми
- Новий eCommerce footer з автоматичним відображенням платіжних методів
- Відображення варіантів товару прямо на картці в каталозі (hover preview)

**AI-функції**
- Генерація опису товару одним кліком
- AI-переклад описів товарів
- SEO-оптимізатор: автозаповнення meta title, description, пропозиція ключових слів
- Alt-теги для зображень товарів (SEO + accessibility)

**Технічне**
- Мікродані (structured data) для Google search (ціна, рейтинг, зображення — без налаштувань)
- Per-website email confirmation template
- Checkout вдосконалений (чистіший UI, покращений мобайл)
- Cart summary на мобайлі переміщено в off-canvas

---

## WEBSITE

### Website Configurator

**Запуск** (2 способи)
1. Через App Store → Website → Activate (якщо Odoo вже встановлено)
2. З нуля: odu.com → Website icon → Start Now

**4 кроки конфігуратора**
1. Тип сайту: бізнес / магазин / блог / e-learning
2. Галузь (industry) — пошук та вибір
3. Головна ціль: Get new leads / Inform customers / Sell more / Develop the brand
4. Кольорова палітра або завантаження логотипу (кольори визначаються автоматично)
5. Вибір сторінок (About, Services, Pricing, Privacy, Blog тощо)
6. Вибір теми

**Результат**: готовий сайт із усіма вибраними сторінками, кольорами, темою та головним CTA-кнопкою

**Базові налаштування** (Configuration → Settings): назва сайту, favicon

**Що нового в Website (v18/v19)**
- Технічний рефакторинг (видалення jQuery залежностей, кращий codebase)
- 200+ сніпетів (vs. 20 у попередніх версіях)
- Sliding panels для складних налаштувань (замість перевантаженого sidebar)
- Inline text toolbar (як у бекенді)
- Новий multi-step wizard для onboarding

---

### Навігація та меню

**Типи посилань**
- *Internal links* — починаються з `/`, автопідказки сторінок
- *External links* — повний URL
- *Anchor links* — навігація в межах сторінки (`#anchor-name`)

**Кастомізація посилань**: кнопки (primary/secondary/outline/fill+rounded), розмір (small/medium/large), колір

**Типи меню**
- Стандартне dropdown меню
- *Submenu* — вкладений елемент (shift вправо в Menu Editor)
- *Mega Menu* — широкий dropdown з колонками; кастомізується шаблонами

**Редагування меню**: Website → Site → Menu Editor (drag-and-drop, додавання/видалення пунктів)

**Header та Footer**: вибір з шаблонів, кастомізація соціальних мереж, логотипу, кольору

---

### Контактні форми

**Дії форми** (один Action на форму):
- Send an email — відправка на вказану адресу
- Create Task (потрібен Project)
- Create Opportunity (потрібен CRM) + призначення sales team та продавця
- Create Ticket (потрібен Helpdesk)

**Trick для кількох форм на одній сторінці**
- Використовувати блок Tabs → окрема форма в кожному tab
- Кожна форма має власний Action

**Типи полів форми**: text, selection (dropdown), list, checkboxes, file upload (макс. кількість файлів та розмір), date
**Налаштування поля**: label, позиція label, required/optional, default value, description

**Conditional Visibility (умовна видимість)**
- На рівні поля: Visibility → Visible only if [Field] [is set / equals / contains / ...]
- На рівні блоку: умова по пристрою (desktop/mobile)

**After Submit**: redirect to thank you page / show message / nothing

---

### Аналітика сайту

**Plausible (вбудований)**
- Lightweight, без third-party cookies, хостується на серверах Odoo
- Активація: Settings → дно сторінки → Plausible → заповнити два поля
- Для on-premise/SH1: підтримуються також Google Analytics та інші

**Dashboard** (Website → Reporting → Analytics)
- X-axis: часовий вимір (7 днів, поточний місяць, custom range)
- Y-axis: unique visitors / pageviews / avg. session time / bounce rate
- Bounce rate < 40% — хороший показник
- Entry Pages — з яких сторінок найчастіше починають сесію

**Додаткова аналітика**
- Referrers / countries / devices — є в dashboard
- Google Search Console: підтвердити домен → моніторинг позицій у Google

**Cookies bar**
- Активація: Settings → Privacy → Cookies bar
- Кастомізація через Edit → Invisible Elements → Cookies bar
- Policy page створюється автоматично

---

### Мобільна версія

**Bootstrap grid**
- Odoo використовує Bootstrap для автоматичного адаптивного layout
- Елементи автоматично стакаються на мобільних (column → stack)
- Кількість колонок на мобільних налаштовується окремо (Edit → Select block → mobile columns)

**Conditional visibility по пристрою**
- Блок → Visibility → Conditionally → Mobile icon (приховати на мобайлі) або Desktop icon
- Background shape: окрема кнопка мобайл-приховання поруч із шейпом

**Бургер меню**: на мобайлі замість горизонтального меню автоматично

---

### Переклади

**Додавання мови**: Settings → Install Languages → вибрати мову → вибрати сайт

**Режими редагування при перекладі**
- *Edit* (з мовою) — повне редагування, але переключає на default мову
- *Translate* — залишається в цільовій мові, тільки переклади

**Кольорова індикація**: жовтий = не перекладено, зелений = перекладено

**Поведінка**: переклад одного екземпляра кнопки/тексту застосовується до всіх однакових елементів

**Language selector**: Edit → вибрати selector → Inline / Dropdown, текст / прапор / прапор+текст

---

### Web Design приклади

**Загальні принципи дизайну**
- Брендинг: логотип (header версія + stamp-версія), типографіка (max 2 шрифти: serif для заголовків + sans-serif для тексту), кольорова палітра (3–5 кольорів)
- Шрифти: тільки Google Fonts; URL шрифту → Edit → Theme → Font Family → Add Google Font
- Кольори: Edit → Theme → Theme Colors (5 dots) → автоматично генерується 5 color presets
- Unsplash інтегрований у website builder — безкоштовна бібліотека мільйонів фотографій

**Ефекти та анімації**
- Animation on Scroll — для окремих колонок та блоків (slide from bottom/top/left/right + intensity)
- Parallax: Background → Image → Effects → Fixed (фон стоїть, контент прокручується)
- Shape для блоку (декоративний фон), Image shape (форма зображення, деякі анімовані)
- Grid mode — розміщення елементів у вільній сітці (resize, drag-and-drop)

**Технічна кастомізація**
- Custom CSS: Website → Site → HTML Editor → CSS секція
- Backdrop/color filter поверх фонового зображення — для читабельності тексту

**Рекомендації для e-commerce**
- Product dynamic block: filters (newest/recently sold/tags) → відображає товари в реальному часі
- Newsletter block + Email Marketing app → автоматична підписка
- Product tag "best selling" на продукті → відображення в відповідному сніпеті

---

### Імпорт сайту через AI

**Доступність**: Enterprise (включно з free one-app), Odoo 18.4+

**Як користуватись**
1. Website → Configuration → Settings → Import Website
2. Вставити URL → Import My Website
3. Обробка займає кілька хвилин (до 200 сторінок)

**Що переноситься**
- Вся структура сторінок (URL structure зберігається)
- Зображення та медіа-файли
- Текстовий контент (через LLM для заповнення відсутніх placeholder)
- Продукти з metadata (назва, ціна, зображення, опис, варіанти)
- eCommerce категорії

**Принцип роботи (3 етапи)**
1. *Detection* — знаходження всіх візуальних елементів (текст, зображення, посилання, header, footer)
2. *Matching* — AI-модель маппить групи елементів на Odoo блоки
3. *Generation* — генерація Odoo HTML, завантаження ресурсів, заповнення LLM-ом

**Важливо**
- Результат не є точною копією — адаптується під Odoo-блоки (але редагується як звичайний сайт)
- Мобільно-оптимізований автоматично
- Shopify: особливо ефективно (доступне API товарів)
- Toggle "Import products" — можна вимкнути
- SEO attributes поки що переносяться частково

---

## POINT OF SALE (POS)

### Налаштування магазину

**Загальна архітектура**
- POS кешує всі дані в IndexDB браузера при першому завантаженні
- Наступні відкриття — дані з кешу (швидко навіть при 100,000+ товарів)
- **Reload Data**: Limited (ціни, нові товари) / Full (повне оновлення) — без закриття сесії

**Вкладки інтерфейсу POS (v19)**
- **Register** — поточні продажі
- **Orders** — архів замовлень
- **Bookings** — бронювання (якщо активовано)
- **Floor Plan** — план залу (для ресторанів)

**Long press** на картці товару — швидкий доступ до інформації та редагування

**Рівні доступу співробітників**
- **Advanced** — адміністраторські права
- **Basic** — стандартний касир (повернення, cash in/out, checkout)
- **Minimal** — студент/помічник (тільки базовий checkout, без знижок та змін цін)

**One-click payment**
- Кнопка на головному екрані для швидкої оплати (тільки методи без вибору клієнта або terminal)
- Налаштовується кількість та тип кнопок

**Presets (шаблони замовлень)**
- Набір налаштувань: прайсліст, фіскальна позиція, підготовча потужність (для ресторанів)
- Кожен preset = кнопка на екрані POS
- Застосування: Dine In / Takeout / Delivery (різні ставки ПДВ, ціни, ідентифікація клієнта)
- Available in Self: видимість пресетів у кіоску самообслуговування

**Presets → Order by Time**
- Можливість приймати замовлення на майбутнє (наприклад, замовлення на завтра)

**Customer Account (B2B)**
- Вибрати клієнта → Payment → Customer Account → транзакція списується на рахунок
- Settle due amounts: вибір конкретних замовлень/інвойсів для оплати
- Global Invoice: back-end → Orders → Orders → Group by Customer → Create Invoices (consolidated)

**Live Dashboard**
- Перегляд декількох POS в реальному часі з одного місця
- AI-відповіді на запити: "how many orders this session", "avg. spend per guest"

---

### Управління залою та столиками

**Налаштування** (POS → Configuration → Settings → Floors & Tables)

**Створення поверху**: Orders → Preparation Display → New Floor (або в POS Settings) → назва + POS + top view зображення

**Редагування floor plan на фронтенді**: Edit Plan (burger menu)
- Додавання столиків кліком
- Переміщення та зміна розміру — drag-and-drop
- Форма столика: круг / квадрат
- Мульти-вибір: Ctrl/Cmd + click → зміни застосовуються до всіх вибраних
- Параметри: номер, кількість місць, колір, форма
- Дублювання столика

**Бронювання (v19)**
- Канбан-вигляд бронювань (колонки: Booked / Checked In / No Show)
- Інформація про гостя: кількість людей, алергени, спеціальні запити
- **Google Reservation Integration** — прийом бронювань через Google
- Фільтри по датам для прогнозування завантаженості
- Синхронізація з website bookings в реальному часі

---

### Товари: створення та варіанти

**Типи продуктів у POS**
- **Goods** (Consumable або Storable) — фізичні товари
- **Service** — послуги з подальшим супроводом (warranty, maintenance)
- **Combo** — набір з кількох товарів

**Costing Method** визначається категорією товару (Standard Price / AVCO / FIFO)

**Barcode Lookup**
- POS фронтенд → Burger menu → Create Product → Сканування штрихкоду
- Автоматично підтягує: назву, фото, ціну, штрихкод з глобальної бази виробників

**Варіанти в POS**
- Активація: Sales → Configuration → Settings → Variants
- Variant creation mode:
  - **Instantly** — варіанти створюються відразу при додаванні атрибута
  - **Dynamically** — варіанти обираються на льоту, без генерації сотень записів
  - **Never** — атрибути без фізичних варіантів
- Режим "Never" або "Dynamically" рекомендується при великій кількості комбінацій
- Зображення для конкретного варіанту — через smart button "Variants" на продукті
- Extra price per attribute value (глобально або per-продукт через "Configure")

**Display type**: radio / pills / select / color / multicheck box

**Послідовність товарів у POS**
- Drag-and-drop у list view (back-end)
- Favorites — відзначені товари відображаються першими
- Підкатегорії відображаються на новому рядку (по батьківській категорії)

---

### Комбо-продукти

**Структура**
- Combo Choice = список товарів для вибору (напр., "Pastries", "Hot Drinks")
- Combo Product = набір з кількох Combo Choices за фіксованою ціною

**Налаштування Combo Choice**
- Maximum items — скільки позицій можна вибрати
- Items included — скільки входить у базову ціну combo
- Combo price — автоматично = мінімальна ціна серед товарів у combo choice
- Якщо клієнт бере більше included — доплачує combo price (не повну ціну товару)

**Flexible Combo (v19 для ресторанів)**
- Cross-sell/upsell всередині combo (клієнт обирає додаткові інгредієнти)
- Ціна адаптується в реальному часі

---

### Методи оплати

**Типи методів**
- **Cash** — кожен POS потребує власного окремого cash journal
- **Bank/Card** — один bank journal може ділитись між кількома POS
- **QR Code** — оплата через banking app (Wero/Bancontact/інші)
- **Customer Account** — списання на рахунок клієнта

**Налаштування методу оплати**
- Journal (обов'язково) — де записуються транзакції
- Integration: None / Terminal / QR Code
- Identify Customer — примусовий вибір клієнта (для customer account)

**QR-оплата (v19)**
- Wero підтримує Bancontact → вся Європа
- Вартість: ~4 центи за транзакцію
- Не потрібен термінал, лише QR-код (можна надрукувати)

**Cash Machines (v19)**
- Інтеграція з автоматичними касовими апаратами (для ритейлу, заправок)

---

### Платіжні термінали (Adyen, Worldline, Viva.com)

#### Adyen
- API-based інтеграція, IoT box не потрібен
- Налаштування:
  1. POS → Configuration → Settings → Payment Terminal → активувати Adyen
  2. Configuration → Payment Methods → New → Bank journal + Terminal + Adyen
  3. Вставити API Key та Terminal Identifier з Adyen платформи
  4. Скопіювати Event URL з Odoo → вставити в Adyen → Integrations → Event URL
  5. Test mode → увімкнути при налаштуванні (вимкнути перед production)
- Сумісність: перевіряти по країнах у документації

#### Worldline
- **IoT Box обов'язковий** (один IoT на один термінал)
- Протокол: CTE, підключення TCP/IP
- Підтримувані країни: Нідерланди, Бельгія, Люксембург
- Рекомендовані моделі: Yomani XR, Yoximo
- **Немає test mode** — конфігурація напряму в production
- Налаштування ECR протоколу на терміналі: `.` → `3` → `Stop` → `3` → `0` → `9` → пароль `1235789` → `4` → `2` → CTE
- Встановлення IP адреси IoT: той самий шлях → `4` → `2` → `9` → ввести IP

#### Viva.com (Viva Wallet)
- Налаштування:
  1. POS → Configuration → Settings → Terminals → активувати Viva Wallet
  2. Configuration → Payment Methods → New → Bank journal + Terminal + Viva Wallet
  3. Вставити Viva Wallet credentials (API key, merchant ID)
  4. Test mode для тестування
  5. Скопіювати Endpoint URL → Viva Account → Webhooks → Create → вставити URL → Verify → Event: "Transaction payment created"
  6. Додати метод оплати до POS у Settings

---

### Квитанції та інвойси

**Налаштування** (POS → Configuration → Settings → Bills & Receipts)
- Custom Header/Footer — довільний текст на чеку
- SMS enabled — відправка чеку по SMS
- Basic Receipt — тільки базова інформація (без цін, для подарунків)
- Automatic Receipt Printing — автодрук після оплати (потрібен налаштований принтер)
- **Self-service Invoicing** — QR-код + URL на чеку → клієнт сам генерує інвойс
  - Введення: номер квитанції + дата + унікальний код → Download Invoice
- WhatsApp enabled — відправка через WhatsApp

**Глобальний інвойс (Global Invoice)**
- Back-end → Orders → Orders → Group by Customer → вибрати замовлення → Create Invoices
- Consolidated billing option — всі замовлення в одному інвойсі

**Різні логотипи на чеках** (в roadmap): зараз один логотип на POS config

---

### Розподіл рахунку (Bill Splitting)

**Сценарій 1: всі платять одночасно**
- Таблиця → Payment → Ellipsis (...) → **Split**
- Вибір позицій для першого гостя → Payment → оплата (статус таблиці: 5B)
- Continue → оплата для наступного гостя

**Сценарій 2: гість виходить раніше**
- Таблиця → Ellipsis → **Split Order**
- Повертає до register (можна додати товари "на виніс")
- Payment → Continue → решта гостей продовжують замовлення

**Рівномірний розподіл**: вказати кількість гостей → автоматичне ділення суми на рівні частини

**Transfer Order** — переміщення позицій до іншого столика (окрема функція)

---

### Обробка котирувань

**Workflow**: Sales → New Quotation → Confirm → POS → Actions → Quotation/Order

**Down payment у POS**
- Відкрити quotation/order в POS → Down Payment → вибрати суму або % → Payment

**Final Settlement**
- POS → Actions → Quotation/Order → вибрати order → Settle Order
- Попередній down payment автоматично вираховується з фінальної суми

**Smart button "Transfer to POS"** на sales order — зведення всіх POS-транзакцій

---

### Кіоск самообслуговування

**Активація**: POS → Configuration → Settings → New Shop → Is a Bar/Restaurant → Self-ordering → Kiosk

**Налаштування кіоску**
- Home Buttons style: lights та інші варіанти візуального стилю
- Landing image: кастомне зображення
- Pickup zone: за зоною pickup або за столиком (з tracker number)
- Payment methods: тільки через касира або картою (Adyen/Stripe)
- Category restrictions: обмежити доступні категорії товарів

**Запуск**: Dashboard → Start Kiosk → генерується URL (або встановлюється на пристрій)

**Presets в кіоску**: клієнт вибирає тип обслуговування (Dine In / Takeout / Delivery)

**Алергени та опис**: відображаються при long press на товар

---

### Preparation Display (для ресторанів та барів)

**Налаштування**: POS → Orders → Preparation Display → New
- Назва, прив'язка до POS
- Категорії товарів (фільтрація — що готувати на цій станції)
- Stages (етапи): New / In Progress / Ready (налаштовувані кольори, alert time)

**Два екрани**
- **Preparation Screen** (для персоналу): картки замовлень з позиціями; кожна позиція відмічається як ready → замовлення переходить до наступного stage
- **Order Status Screen** (для клієнтів): "Almost There" / "Ready" → клієнт бачить статус свого замовлення

**Поведінка за типом POS**
- Shop: замовлення потрапляє на Preparation Display після оплати
- Restaurant: замовлення потрапляє одразу після натискання "Order" (до оплати)

**Courses (Страви по курсах) — тільки ресторан**
- Кнопка "Course" в POS → розподіл позицій на course 1/2/3
- Fire Course 2/3 — запуск приготування наступного курсу
- Kitchen display показує pending orders з таймером

---

### Онлайн доставка їжі

**Urban Piper Integration**
- Підтримувані платформи: Uber Eats, Just Eat та інші
- Налаштування: POS → Configuration → Settings → Food Delivery Connector
  - Username + API Key (від Urban Piper)
  - Linked POS + Pulse ID (з Urban Piper панелі → Location)
- На продукті (POS tab → Available on Food Delivery): вибрати POS, meal type (vegetarian), is recommended, is alcoholic
- Store Timings: Configuration → Urban Piper → Store Timings
- Sync Menu: після налаштувань синхронізувати меню

**Workflow прийняття замовлення**
- Іконка в POS → перелік incoming/existing замовлень
- Відхилити або прийняти → статус: Pending → Acknowledged
- Замовлення перетворюється на стандартний POS order
- Mark as Ready → кур'єр забирає

---

### Customer Display

**Призначення**: secondary screen для покупця; показує товари, ціни, загальну суму, loyalty points

**3 способи підключення**

| Спосіб | Налаштування | Опис |
|--------|---|---|
| Same Device | "In the same device" | HDMI кабель від того самого пристрою |
| Another Device | "Another device" | Tablet/монітор; відкрити в браузері My POS → Customer Display |
| IoT Box | "IoT connected screen" | Screen підключено до IoT box |

**Важливо (v19)**: кожен касир бачить тільки свій customer display (прив'язка по device ID), а не спільний

**Another Device**: пристрої можуть бути в різних мережах

---

### Друк чеків без IoT

**Підтримуваний протокол**: EPOS (Epson) — підключення через мережу (Ethernet або Wi-Fi)
- USB-принтери без IoT — не підтримуються (потрібен IoT box)
- Рекомендована модель: Epson TM-M30/2/3

**Налаштування**
1. Підключити принтер до мережі
2. Призначити статичний IP (на роутері)
3. Ввімкнути принтер → він надрукує свій IP
4. POS → Configuration → Settings → EPOS Printer → ввести IP

**SSL Certificate (для безпечного з'єднання)**
1. Відкрити IP принтера в браузері → Accept → Advanced Settings → Login (серійний номер)
2. Network Security → Certificate → Update → Common Name = IP принтер → Next
3. Після перезавантаження: Export certificate (Base64, .crt)
4. Браузер → Settings → Privacy → Manage Certificates → Import → Trusted Root CAs
5. POS Settings: Technical → System Parameters → `web.base.url.freeze` = `true`

**Troubleshooting**
- Принтер не роздрукував IP → перевірити кабель/Wi-Fi
- Чек виходить білий → папір встановлено неправильно стороною
- SSL errors → перезапустити браузер після імпорту сертифіката
- IP змінився → призначити static IP на роутері

---

### Що нового в POS Retail (v19)

**Продуктивність**
- IndexDB кешування: перше завантаження = повний pull; наступні = тільки diff
- Reload Data: Limited / Full без закриття сесії
- 12,000+ замовлень на день — перевірено на реальних клієнтах

**UI/UX**
- Чисті картки товарів (тільки категорійний колір знизу)
- Long press = деталі товару
- Нові вкладки: Registers / Orders / Bookings

**Booking (канбан-вигляд)**
- Для hairdressers, ресторанів, сервісних бізнесів
- Синхронізація з website bookings
- Kanban view: хто приходить сьогодні та в який час

**Фіскальна відповідність**
- Австрія: Fiscaly інтеграція
- Німеччина: перероблена TSE інтеграція

---

### Що нового в POS для ресторанів (v19)

**Google Reservation Integration**
- Клієнти бронюють столик через Google → миттєво з'являється в Odoo POS
- Kanban view бронювань: Booked / Checked In / No Show

**Presets для обслуговування**
- Дозволяє задати різні ПДВ, прайсліст, підготовчу потужність для Dine In / Takeout / Delivery
- Колір на Kitchen Display відображає тип обслуговування
- Preparation capacity: обмеження кількості замовлень на X хвилин (для управління навантаженням)

**Courses (Страви по курсах)**
- Розподіл позицій на окремі курси (стартер, основне, десерт)
- Запуск приготування наступного курсу (Fire Course)
- Фільтрація у Kitchen Display по курсах

**Allergens та Product Description**
- Відображаються у POS, кіоску та Kitchen Display
- Налаштовуються на продукті (вкладка Point of Sale → Product Description)

**Cashier restrictions**
- 3 рівні: Advanced / Basic / Minimal
- Minimal: не може давати знижки, змінювати ціну, закривати сесію, cash out

**Tips (Чайові)**
- Settings → Accept tips → до або після оплати
- Рівень "rounding up" (наприклад, до €3 якщо рахунок €2.95)
- Процентні чайові

**Live Dashboard** — перегляд всіх ресторанів в реальному часі

**AI в POS** — текстові запити для аналітики: кількість гостей, середній чек, найпопулярніші страви

---

## RENTAL

### Налаштування сервісу оренди

**Глобальні налаштування** (Settings → Rental)
- **Default Delay Costs** — плата за пізнє повернення (після X годин)
- **Default Padding Time** — буфер між орендами (підготовка товару)
- **Minimal Rental Duration** — мінімальний термін оренди (запобігання micro-bookings)

**Інтеграції**
- **Sales** — прайсліст, шаблони котирувань, онлайн-оплата
- **Planning** — управління ресурсами для сервісної оренди (кімнати, персонал)
- **Inventory** — відстеження залишків та переміщень фізичних товарів
- **Project** — уpsell для event-компаній, управління все в одному місці

**Типи орендних продуктів**
- **Goods** (physical) — product type = Goods, Track Inventory (by quantity / by lot / by serial)
- **Service** (time-based booking) — product type = Service, Plan Services checkbox → інтеграція з Planning

---

### Налаштування орендних продуктів

**Вкладка Rental Prices**
- Add a Price: вибір Period (hourly / daily / weekly / monthly / nightly) + Price
- Rental Periods: Configuration → Rental Periods → кастомні переваги check-in/checkout часу
- **Nightly Period (v19)** — для готельного бізнесу: задається час check-in та checkout

**Логіка ціноутворення (оренда)**
Odoo вибирає найдешевший варіант для покриття всього терміну:
- Тестує кожен ціновий tier: скільки разів потрібно повторити, щоб покрити термін (округлення вгору)
- Порівнює загальні вартості → обирає найдешевший tier

**Reservation Section**
- Hourly/Daily Fine — штраф за прострочення
- Reserve products X hours before pickup — буфер для перевірки стану перед видачею

**Plan Services (для сервісної оренди)**
- Enable → пов'язує з Planning App
- Role = тип ресурсу (наприклад, "Deluxe Room")
- Resources = конкретні одиниці (кімнати 102, 103 — тип Material)
- Sync shifts with rental orders — блокує подвійні бронювання

**Варіанти та атрибути** — доступні на орендних продуктах (наприклад, розмір ліжка, кількість гостей)

---

### Створення замовлення на оренду

**Rental Orders Dashboard** (Kanban view)
- Sidebar фільтри: Reserved / Picked Up / Returned / To Invoice / Late

**Workflow створення**
1. Orders → New
2. Вибрати Customer
3. Вибрати дати (rental period) → Duration автоматично
4. Add a Product → кількість → ціна автоматично за логікою вибору tier
5. Update Rental Prices — при зміні дат
6. Confirm → статус Booked (inventory заблоковано)
7. Pickup → popup validation → статус Picked Up
8. Return → popup validation → статус Returned

**Підпис договору (Sign module)**
- Rental order → Sign Documents → підписання онлайн → копія в Chatter

**Catalog view** при додаванні продукту — зручний вибір з каталогу

**Pricing calculation display** — таблиця пояснення чому обрано певний tier

---

### Планування та звітність

**Schedule View** (Rental → Schedule)
- Відображення: Day / Week / Month / Year
- Group by: Customer / Product / Serial Number (для контролю ротації одиниць)
- Sidebar фільтри: Confirmed Orders / Quotations / Late / To Do Today

**Кольорова індикація**
| Колір | Значення |
|---|---|
| Червоний | Прострочений return |
| Блакитний | Зарезервований (не отриманий) |
| Блакитний + червоний кут | Зарезервований, клієнт запізнився на pickup |
| Помаранчевий | Видано, в терміні |
| Темно-синій | Повернуто |
| Блакитний зі смугами | Quotation (не підтверджено) |

**Дії зі Schedule**
- Клік → деталі замовлення (клієнт, позиції, серійні номери)
- Drag-and-drop горизонтально (зміна дат) та вертикально (зміна продукту)
- Зміна reserved serial number — перетягнути в schedule
- Створення нового замовлення кліком на порожній слот (v19)
- Create from Planning → rental order прямо з planning view

**Billing при прострочені**
- Return → червоний годинник → Delay Costs автоматично додаються до sales order

**Reporting** (Reporting → Rentals)
- Graph / Pivot view
- Measures: price / quantity returned / кастомні
- Group by: Customer / Product / Date range

---

### Що нового в Rental (v19)

**Booking Era — фокус на сервісній оренді**
- **Nightly rental period** — time-based booking з check-in/checkout годинами
- **Website nightly booking** — клієнт обирає дати на сайті; зайняті дати блокуються автоматично
- **Planning integration (двостороння синхронізація)**:
  - Ліміт ресурсів (не більше N бронювань одночасно)
  - Автоматичне призначення ресурсу (кімнати/персоналу) при бронюванні
  - Створення rental order прямо з planning
  - Drag-and-drop зміна дат у planning → автоматично оновлює rental order
  - Додавання нового бронювання до існуючого замовлення клієнта
- **Schedule improvements**:
  - Drag-and-drop горизонтально/вертикально (зміна дат/продукту)
  - Групування по serial number; резервування конкретних одиниць перетягуванням
- **Project integration** — rental order прив'язується до проекту; upsell з project top bar

---

## IoT

### Підключення пристроїв

**Підтримувані пристрої**
- Принтери (Receipt, Label), Ваги, Камери, Платіжні термінали, Вимірювальні пристрої, Сканери, Педалі та інші

**Plug-and-Play підключення**
1. Підключити USB-пристрій до IoT Box
2. Перезавантажити IoT Box (вручну або через admin console в Odoo)
3. IoT автоматично розпізнає пристрій (всі драйвери вбудовані в IoT framework)
4. IoT App → Devices — перевірити зелений статус "Connected"

**Прив'язка принтера до операцій**
- IoT App → Devices → Printer → Add a Line → вибрати тип звіту (Product Label, Receipt тощо)
- Також конфігурується через: POS Settings / Manufacturing App

**Загальний принцип** — однаковий процес для всіх пристроїв

---

### Прошивка IoT Box

**Вимоги**: Raspberry Pi (рекомендований — низька вартість, малий розмір, versatile)

**Процес прошивки**
1. Встановити **Balena Etcher** (etcher.balena.io) або Raspberry Pi Imager
2. Завантажити образ: `iotbox-latest.zip` з директорії Odoo IoT images
   - Кожна версія Odoo сумісна з конкретною версією IoT образу
3. Вийняти microSD з Raspberry Pi → вставити в card reader
4. Etcher: Flash from File → вибрати image → вибрати Target → Flash
5. Вставити SD назад у Pi, підключити всі пристрої → увімкнути
6. Дочекатись завантаження (browser: "Odoo IoT Box") — не вимикати під час процесу
7. Рекомендований reboot після підключення до бази даних

**Коли необхідно перепрошити**
- Новий пристрій
- Проблеми з pairing code при первинному налаштуванні
- Оновлення програмного забезпечення

---

### Virtual IoT Setup

**Призначення**: Windows-програма, що емулює IoT Box без фізичного пристрою

**Вимоги**
- Windows OS
- Odoo 16+ database
- Постійне підключення до інтернету та увімкнений ПК під час роботи

**Підтримувані пристрої**
- POS devices (scales, printers) ✓
- Payment terminals ✓
- MRP devices (cameras, measurement tools) ✗

**Процес встановлення**
1. Завантажити Virtual IoT: кнопка Download у Odoo (top left)
2. Вибрати мову → погодитись з угодою
3. **Тип інсталяції**: вибрати "Odoo IoT" (не Odoo Server)
4. Вказати destination folder → Install
5. Після встановлення → **pairing code** (alphanumeric) з'являється у вікні

**Підключення до бази даних**
1. Odoo → IoT module → Connect
2. Вставити token (pairing code) в Section A → Pair
3. Refresh → IoT з'явиться в системі

**Підключення пристроїв**
- Windows автоматично визначає пристрій (якщо драйвер вже встановлено)
- Якщо ні: Windows → пошук та встановлення драйвера
- Refresh IoT Box config page → перевірити device у списку
- Якщо не з'явився: Reload Handlers у configuration page

**Мережева безпека**
- Підключати тільки до захищеної (зашифрованої) мережі
- Через IoT може проходити PII (персональні дані) — рекомендується network specialist
