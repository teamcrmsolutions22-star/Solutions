# Odoo Inventory — відео-конспекти YouTube

> Джерело: офіційні YouTube-відео Odoo (транскрипти), 2026-06
> Версії: переважно Odoo 17/18, з окремим блоком про Odoo 19

---

## Базове налаштування складу (Warehouse Setup)

**Потоки прийому та відвантаження налаштовуються на рівні складу** (не глобально). Різні склади можуть мати різну кількість кроків.

**Прийом (Inbound):**
- **1 крок** (за замовчуванням) — товар відразу йде в stock. Найпростіший варіант.
- **2 кроки** — товар спочатку потрапляє в зону Input, потім сортується і розкладається по місцях зберігання. Підходить для великих складів із щоденними надходженнями.
- **3 кроки** — Input → Quality Control → Stock. Для складів із обов'язковим вхідним контролем якості.

**Відвантаження (Outbound):**
- **1 крок** — товар відразу зі stock відправляється клієнту.
- **2 кроки** — комплектувальник (picker) забирає товар зі стелажу → Output-зона → потім команда доставки відправляє клієнту.
- **3 кроки** — Pick → Pack → Ship. Для великих складів із виділеними командами.

> Якість можна контролювати за допомогою Quality Control Points на будь-якому кроці — не обов'язково використовувати 3 кроки лише для цього.

**Як увімкнути:** Inventory → Configuration → Settings → розділ Warehouse:
- Поставити ✅ **Storage Locations**
- Поставити ✅ **Multi-Step Routes**
- Зберегти → Configuration → Warehouses → вибрати склад → розділ Shipments.

---

## Склади та локації (Warehouses & Locations)

**Локація (Location)** — будь-яке фізичне місце, де може знаходитись товар: стелаж, морозильник, проїзд, зона відвантаження, навіть "локація клієнта". Локації утворюють ієрархічну деревоподібну структуру (батьківська → дочірня).

**Склад (Warehouse)** — окрема фізична будівля з адресою. Правило: один склад = одна адреса.

**Типи локацій:**
| Тип | Призначення |
|-----|-------------|
| Internal | Фізичні місця зберігання всередині складу; враховуються у valuation |
| Transit | Переміщення між складами або адресами; враховуються у valuation |
| Customer | Куди товар потрапляє після продажу; не в stock |
| Vendor | Звідки приходить товар від постачальника |
| Production | Споживання сировини / виробництво готових виробів |
| Inventory Loss / Scrap | Списання, пошкоджені товари |

**Створення локації:** Configuration → Locations → New → назва + Parent Location + тип Internal.

**Створення нового складу:** Configuration → Warehouses → New → назва, короткий код (prefix), адреса. Адреса складу відображається на всіх документах.

---

## Прийом та зберігання товарів

**Продукти в Odoo:**
- Тип **Goods** + ✅ **Track Inventory** = відстежується кількість і місцезнаходження.
- **By Quantity** — облік загальної кількості.
- **By Lots** — облік партіями.
- **By Serial Number** — облік поштучно.
- Без Track Inventory (наприклад, шурупи) — продукт існує, але кількість не відстежується.

**Дашборд Inventory:**
- **Receipts** — надходження від постачальників. Помаранчева смуга = прийом сьогодні, червона = прострочені, зелена = майбутні.
- **Delivery Orders** — відправлення клієнтам.

**Прийом товару (1-крок):**
1. Відкрити Receipt → перевірити кількість у полі Done vs Demand.
2. Встановити **Destination Location** (конкретний стелаж/зона).
3. Зберегти → Validate.
4. При частковому прийомі — опція **Create Backorder** (для очікування решти) або **No Backorder**.

**Перегляд stock:** Operations → Physical Inventory — всі товари зі своїми локаціями та кількостями.

**Релокація товару:** Physical Inventory → вибрати рядок → Actions → **Relocate** → вказати нову локацію → Confirm.

---

## Відвантаження (Outgoing Shipments)

**2-крок delivery (Pick → Deliver):**
- Команда пікерів забирає товар зі стелажів → несе до Output-зони.
- Команда доставки перевіряє, упаковує, відправляє клієнту.

**Налаштування:** Warehouses → Outgoing Shipments → "Send goods in output and ship (2 steps)".

**Barcode-додаток для пікінгу:**
- Відкрити Barcode → Operations → Pick.
- Сканувати штрихкод локації → сканувати товар (кожен скан = 1 одиниця).
- Або: меню шестерні → Text Field → ввести назву локації вручну.
- Після збору всіх товарів → Validate.

**Barcode-сканери:** USB-сканер, мобільний (Zebra TC21 з встановленим додатком), Bluetooth (до 30 футів / 10 м від планшету), камера смартфону.

**Shipping connectors (FedEx, UPS тощо):** увімкнути у Settings → розділ Shipping Connectors. Після валідації delivery order в чаттері автоматично з'являється мітка для друку.

---

## Коригування запасів (Inventory Adjustments & Cycle Counts)

**Inventory Adjustment** — виправлення розбіжностей між фізичним залишком і базою даних (помилки, крадіжка, пошкодження).

**Cycle Counts** — регулярні підрахунки невеликих частин складу замість щорічної повної інвентаризації.

**Налаштування:**
1. Встановити **Annual Inventory Date** (дата повної щорічної інвентаризації).
2. Увімкнути Storage Locations.
3. Configuration → Locations → вибрати локацію → поле **Cyclic Counting** → **Inventory Frequency** (наприклад, 30 днів).
4. Цикл запускається після першого підрахунку в цій локації.

**Виконання підрахунку:**
- Operations → Physical Inventory → групувати по Location.
- Вибрати продукти → **Request a Count** → призначити відповідального + дату → Confirm.
- У полі **Counted Quantity** ввести реальну кількість.
- **Apply All** → вказати причину → Apply Quantities.
- Після застосування дата наступного підрахунку автоматично зсувається на +30 днів.

**Дії в Physical Inventory:**
- **New** — додати новий рядок продукту.
- **Relocate** — перемістити продукт в іншу локацію.
- **Set Quantity on Hand** — підтвердити поточну кількість без зміни.
- Actions → **Set to Zero** — обнулити залишок (якщо не знаєте куди подівся товар).

**Barcode для інвентаризації:** Barcode → Inventory Adjustments → сканувати локацію → сканувати товар → вводити кількість → Apply.

---

## Правила поповнення (Reordering Rules)

### Автоматичні правила

**Принцип:** Odoo автоматично створює RFQ, коли прогнозована кількість падає нижче мінімуму.

**Налаштування:**
1. Inventory → Configuration → Reordering Rules → New.
2. Вибрати продукт, встановити **Min Qty** та **Max Qty**.
3. На продукті (вкладка Purchase) обов'язково вказати постачальника з ціною та **Delivery Lead Time**.

**Кількість замовлення:** Max Qty − прогнозована кількість (Forecasted Qty).

**Тригери:**
- **Scheduler** запускається автоматично 1 раз на день.
- Вручну: Operations → Run Scheduler (потрібен Developer Mode).
- Автоматично при підтвердженні Sales або Purchase Order.

**Кнопка "Order Once"** (синя іконка вантажівки) — ручний запуск правила.

### Ручні правила (Manual)

**Trigger = Manual** — правило не запускається автоматично, а відображає продукти у **Replenishment Dashboard** (Operations → Replenishment).

**Переваги ручного режиму:** гнучкість, можливість враховувати сезонність і коливання попиту, непередбачені закупівлі.

**"i" іконка** в Replenishment — показує ETA з урахуванням lead times різних постачальників. Можна змінити постачальника прямо тут.

**Кнопка "Order to Max"** — замовити кількість до максимуму з урахуванням поточного прогнозу (корисно для сезонного поповнення).

**Replenishment Dashboard (Odoo 19):**
- Нова колонка **Origin** (горизонт: за замовчуванням 365 днів, можна змінити в Settings).
- Видно постачальника, маршрут, упаковку прямо в рядку.
- Кнопка **"i"** — оновлений вигляд з датами, lead times, графіком.
- Інструмент підбору правила: аналіз частоти замовлень, середнього запасу, рекомендації по зміні Min/Max.
- **Group RFQ** на постачальнику: вибір "On order / Daily / Weekly / Always" — замінює складне "propagate procurement group".

### MTO (Make-to-Order / Replenish on Order)

**Принцип:** Odoo не тримає товар на складі, а замовляє/виробляє лише після підтвердження sales order.

**Налаштування:**
1. Settings → увімкнути **Multi-Step Routes** + **Replenish on Order (MTO)** (у розділі Logistics).
2. На продукті → вкладка Inventory → Routes → вибрати **Replenish on Order (MTO)** + маршрут доставки (**Buy** або **Manufacture**).
3. При виборі Buy — обов'язково вказати постачальника на вкладці Purchase.

**Odoo 19:** MTO тепер доступне через Settings → пошук "MTO". Маршрут можна вибирати не лише на продукті, а й на рядку sales order.

**Workflow MTO:**
- Підтвердження SO → автоматичне створення RFQ/MO → підтвердити → отримати/виробити → відвантажити.

---

## Партії та серійні номери (Lots & Serial Numbers)

**Лот (Lot)** — група однакових товарів, отриманих або вироблених разом. Один лот-номер = багато одиниць.  
Приклад: партія кави, отримана в один день.

**Серійний номер (Serial Number)** — унікальний ідентифікатор конкретної одиниці товару.  
Аналог: VIN автомобіля, IMEI телефону.

**Застосування:**
- **Lots** → масові товари, контроль партій (харчі, косметика, фарба).
- **Serial Numbers** → одиничний облік (електроніка, велосипеди, медичне обладнання).

**Увімкнення:** Settings → Traceability → ✅ Lots & Serial Numbers.

**Налаштування продукту:** Product Type = Goods + ✅ Track Inventory → By Lots або By Unique Serial Number.

**Присвоєння при прийомі:**
- Кнопка "гамбургер" (деталі) поруч з кількістю → добавити лот/серійний номер.
- Для кількох лотів: Add a Line для кожного.
- **Import Serial/Lots** — вставити список.
- **Generate Serial Lots** — автогенерація за шаблоном (наприклад, SN17, SN18...).

**Звіт трасованості:** Smart button Traceability → повний ланцюжок руху (від постачальника до клієнта).

**Перегляд лотів:** Products → Lots/Serial Numbers — список усіх лотів із смарт-кнопками (Локація, Трасованість, Закупівлі, Продажі).

**Barcode з лотами (Odoo):** Configuration → Operation Types → Delivery Orders → вкладка Barcode App → ✅ **Show Reserved Lots and Serial Numbers** (для галузей з суворим трекінгом) або без галочки (Odoo вибирає лоти автоматично).

---

## Терміни придатності (Expiration Dates)

**Призначення:** відстеження терміну придатності в розрізі партій (lots), автоматична пріоритизація FEFO при відвантаженні.

**Увімкнення:** Settings → Traceability → ✅ Lots & Serial Numbers + ✅ Expiration Dates.

**Поля на продукті** (вкладка Inventory → Traceability):
| Поле | Сенс |
|------|------|
| Expiration Date | Кількість днів від дати прийому до закінчення терміну |
| Best Before Date | Днів до дати "краще використати до" (відлік від expiration) |
| Removal Date | Днів до видалення з warehouse (відлік від expiration) |
| Alert Date | Днів до попередження (відлік від expiration) |

**Зміна дати для конкретної партії:** Products → Lots/Serial Numbers → відкрити лот → змінити Expiration Date → ODU перерахує інші дати.

**FEFO (First Expiry First Out):** налаштовується на локації. Configuration → Locations → вибрати локацію → Logistics → Removal Strategy: **First Expiry First Out**. Можна встановити також на рівні Product Category.

**Перегляд:** Products → Lots/Serial Numbers → сортування за Removal Date — видно, що потрібно прибрати найближче.

---

## Одиниці виміру (Units of Measure)

**Призначення:** автоматичне конвертування між різними одиницями виміру при закупівлі та зберіганні.

**Увімкнення:** Settings → Products → ✅ Units of Measure and Packagings.

**Налаштування:** Configuration → Units of Measure (або Configuration → Units & Packagings).

**Логіка конвертування:** поле "Contains" = скільки reference units входить в одну UoM.  
Приклад: yard (YD) → reference unit: meter → Contains = 0.9144 (1 ярд = 0.9144 м).

**На продукті:**
- UoM зберігання = одиниця, в якій ведеться склад (наприклад, ярди).
- На вкладці Purchase для постачальника → окрема UoM (наприклад, метри).
- При отриманні товару ODU автоматично конвертує: 100 м → 109.36 ярдів.

**Практика:** Виробник продає в метрах, склад зберігає в ярдах → ODU рахує автоматично без ручних перерахунків.

---

## Пакети та упаковка (Packages & Packaging)

### Пакети (Packages)

**Пакет** = довільний контейнер для переміщення набору товарів (коробка, піддон, візок). Може містити різні продукти.

**Різниця:**
- **Package** (Packages) — довільне групування різних товарів для переміщення/зберігання.
- **Packaging** (Product Packaging) — стандартна упаковка одного типу продукту (6-pack пива).

**Увімкнення:** Settings → Operations → ✅ Packages.

**Додавання до пакета при прийомі:** на формі receipt → кнопка **Put in Pack** → Odoo генерує назву пакета.  
Для різних пакетів: кнопка-гамбургер поруч з кількістю → змінити Destination Package.

**Переміщення пакетів (Internal Transfer):**
- Operations tab → розділ Package → Add a Line → вибрати пакет → встановити локацію.
- Configuration → Operation Types → Internal Transfers → ✅ **Move Entire Packages** (товари переміщуються разом з пакетом).

**Трасованість пакетів:** Smart button Moves → видно звідки і куди переміщувались.

**Odoo 19 — вкладені пакети:** пакет можна вкласти в піддон (box → pallet). Scan pallet barcode → одне сканування переміщує весь вміст.

### Product Packaging (Упаковка продукту)

**Packaging** = стандартне пакування одного типу продукту: 1 банка, 4-pack, 8-pack.

**Увімкнення:** Settings → Products → ✅ Units of Measure and Packagings.

**Налаштування на продукті:**
- Вкладка Inventory → розділ Packaging → Add a Line.
- Поля: назва, кількість одиниць у пакуванні, reference unit, barcode, Package Type.

**На Purchase Order:** стовпець Packaging → вибрати потрібну упаковку. Odoo попередить якщо кількість не кратна упаковці.  
Автоконвертація: 10 packs × 8 штук = 80 одиниць в inventory.

**Barcode + Packaging:** сканування штрихкоду упаковки → Odoo автоматично зараховує кількість одиниць всередині.

---

## Пакетні переміщення (Batch Transfers)

**Batch Picking** = один пікер збирає товари для кількох замовлень за один прохід по складу.

**Batch Transfer** = об'єднання кількох transfers в одну операцію (picking, internal, delivery).

**Увімкнення:** Settings → Operations → ✅ Batch, Wave and Cluster Transfers.

**Автоматичне створення батчів:** Configuration → Operation Types → Delivery Orders → ✅ **Automatic Batches** → вибрати критерій (наприклад, по Carrier).

**Ручне створення батчу:**
- На списку picking → вибрати кілька → Actions → Add to Batch.
- Або: три крапки на картці Pick → Prepare Batch.

**Workflow batch picking:**
1. Пікер відкриває Barcode → Operations → Pick → вкладка Batches.
2. Сканує локацію → сканує товар (або + для ручного додавання).
3. Після збору → Validate.

**Сортування для доставки:** якщо Automatic Batches по Carrier → delivery orders автоматично групуються по FedEx, UPS тощо.

**Типи picking:**
- **Single** — один пікер = одне замовлення (за замовчуванням).
- **Batch** — один пікер = кілька замовлень.
- **Wave** і **Cluster** — інші стратегії (окремі відео).

---

## Маршрути: 2-крок, 3-крок (Receipt/Delivery Steps)

### 2-крок прийом

**Схема:** Вантаж прибуває → Input-зона → Putaway (розкладання по місцях зберігання).

**Навіщо:** великий склад з командами прийому і розкладання.

**Налаштування:** Warehouses → Incoming Shipments → "Receive goods in input and then stock (2 steps)".

**Результат:** Одо автоматично створює локацію WH/Input. Після прийому в Input → Internal Transfer для розкладання.

**Putaway Rules:** Configuration → Putaway Rules → вказати "якщо продукт Х потрапляє в WH/Stock → направити в Fridge A". Дозволяє автоматично направляти товари в правильні зони (молочка → холодильник А, фрукти → холодильник Ф).

**Dashboard:** Receipts-картка (команда прийому) + Internal Transfers (команда розкладання).

**Bulk validate:** відмітити кілька receipts → Actions → Validate.

### 3-крок прийом

**Схема:** Вантаж → Input → Quality Control → Stock.

**Навіщо:** обов'язковий вхідний контроль якості перед прийомом на зберігання.

**Налаштування:** Warehouses → Incoming Shipments → "Receive goods in input, then quality, then stock (3 steps)".

**Результат:** Автоматично створюються локації WH/Input, WH/Quality, WH/Stock. Два Internal Transfers на Internal Transfers картці (waiting).

**Процес:** Receipt → Validate (Input) → Internal Transfer Input→Quality → Validate → Internal Transfer Quality→Stock → Validate.

### 2-крок відвантаження з Batch Picking

**Схема:** Pick (зі складу → Output) → Deliver (Output → клієнт).

**Налаштування:** Warehouses → Outgoing Shipments → "Send goods in output and ship (2 steps)".

**Batch picking на 2-кроці:** пікер через Barcode збирає для кількох замовлень → валідує → delivery-команда сортує по Output → відправляє.

### 3-крок відвантаження з пакетами

**Схема:** Pick → Pack → Ship.

**Навіщо:** виділена команда пакувальників; пакет запечатується → barcode для трекінгу.

**Налаштування:**
- Settings → ✅ Packages + ✅ Barcode Scanner.
- Warehouses → Outgoing Shipments → "Pack goods, send goods in output, and ship (3 steps)".
- Operation Types → Delivery Orders → ✅ **Move Entire Packages**.
- Operation Types → Pack → вкладка Hardware → Print on Validation → **Package Content** (друкує barcode пакета та вміст після запечатування).

**Workflow:** Barcode Pick → Put in Pack (scan box barcode) → Validate → Barcode Delivery → scan package barcode → Validate.

**Odoo 19:** кнопка Barcode прямо на Transfer (без переходу в окремий додаток). Відображення кількості на інших локаціях якщо на поточній — стелаж порожній.

---

## Cross-Docking

**Суть:** товар від постачальника надходить на склад і одразу (без зберігання) передається на доставку клієнту. Знижує потребу у складських площах, прискорює доставку.

**Вимоги:** увімкнути Multi-Step Routes + налаштувати 2 або 3 кроки для incoming/outgoing.

**Маршрут Cross-Docking:** Configuration → Routes → Cross-Dock.  
Два правила:
1. Pull: WH/Input → WH/Output.
2. Pull: WH/Output → Customer Location.

**Налаштування продукту:** вкладка Inventory → Routes → ✅ **Buy** + ✅ **Cross-Dock**.

**Workflow:**
1. Підтвердити SO (Sales Order).
2. Підтвердити RFQ (автоматично створений при Buy + Cross-Dock).
3. Отримати продукт (Receive Products → Validate).
4. Transfer Input → Output: Validate.
5. Transfer Output → Customer: Validate.

**Статус:** обидва transfers спочатку "Waiting Another Operation" → після підтвердження PO → стають "Ready".

---

## Терміни виконання (Lead Times)

**Типи lead times в Odoo:**
| Lead Time | Де налаштовується | Що означає |
|-----------|-------------------|------------|
| Customer Lead Time | Продукт → вкладка Inventory | Очікувані дні від замовлення до доставки клієнту |
| Vendor Delivery Lead Time | Продукт → вкладка Purchase → Delivery Lead Time | Кількість днів від підтвердження PO до прибуття на склад |
| Security Lead Time for Sales | Settings → Advanced Scheduling | Буферні дні: готуємо замовлення раніше дедлайну |
| Security Lead Time for Purchase | Settings → Advanced Scheduling | Буферні дні: замовляємо у постачальника раніше потреби |
| Days to Purchase | Settings | Час на підтвердження PO постачальником |

**Логіка планування (приклад):**
- Customer Lead Time: 14 днів
- Security Lead Time Sales: 1 день → готуємо на 13-й день
- Vendor Lead Time: 5 днів
- Security Lead Time Purchase: 3 дні → замовляємо на 5 днів раніше
- Days to Purchase: 2 дні → дедлайн підтвердження PO за 2 дні

**Delivery Date Warning:** якщо вказати в SO дату доставки раніше за Customer Lead Time → Odoo покаже попередження.

**Forecasted Report:** у реквізитах RFQ видно Order Deadline (коли підтвердити у постачальника) і Expected Arrival (коли отримаємо) з урахуванням усіх lead times.

---

## Стратегії вилучення (FIFO, LIFO, Closest Location)

### FIFO та LIFO

**Вимоги:** увімкнути Lots & Serial Numbers + Storage Locations + Multi-Step Routes.

**FIFO (First In, First Out):**
- Перший що прийшов → перший іде до клієнта.
- Для: харчові продукти, ліки, промислові рідини, все що має термін придатності.
- Налаштовується: на локації або на product category.

**LIFO (Last In, First Out):**
- Останній що прийшов → перший іде до клієнта.
- Для: меблі, будматеріали, важкі товари без терміну придатності (зручно не переміщати нові надходження).
- Налаштовується: на product category (Configuration → Categories → Force Removal Strategy → LIFO).

**Встановлення на локації:** Configuration → Locations → вибрати локацію → Logistics → Removal Strategy → FIFO або LIFO.

**Перевірка:** на delivery order натиснути кнопку Details → видно які лоти/серійні номери вибрані.

### Closest Location

**Суть:** Odoo вибирає товар з локації, що найближча до зони пакування (за алфавітно-цифровим порядком назв).

**Правило:** порядок назв локацій = порядок відстані до Output/Packing. Перейменувати локації: Shelf 1 (найближча) → Shelf 2 → Shelf 3.

**Встановлення:** Configuration → Locations → WH/Stock → Logistics → Removal Strategy: **Closest Location**.

**Важливо:** стратегія встановлюється на батьківській локації. Якщо Closest Location не встановлена на WH/Stock → Odoo використовує FIFO за замовчуванням, навіть якщо встановлена на дочірніх.

**Якщо найближча локація зайнята/зарезервована:** Odoo автоматично бере з наступної по порядку.

---

## Категорії зберігання (Storage Categories)

**Суть:** розумні putaway rules з перевіркою вільного місця. Якщо основна локація заповнена → Odoo автоматично направляє в альтернативну.

**Налаштування Storage Categories:** Configuration → Storage Categories → New.
- Поля: назва, максимальна вага, вкладка "Capacity by Product" → вказати продукт + max кількість.
- Smart button Locations → побачити які локації входять в категорію.

**Додавання локації до категорії:** Configuration → Locations → вибрати локацію → поле Storage Category → встановити потрібну.

**Putaway Rule з Storage Category:**
- Configuration → Putaway Rules → вибрати правило.
- Поле **Store To** → вказати батьківську локацію (не конкретну дочірню).
- Поле **Sublocation** → вибрати **Closest Location** або **Last Used**.
- Поле **Having Category** → вибрати Storage Category.

**Результат:** Odoo перевіряє підлокації вказаної категорії → направляє в першу вільну → при заповненні автоматично переключає на наступну.

---

## Методи резервування (Reservation Methods)

**Reservation Method** визначає **коли** товар резервується за замовленням.  
(Відрізняється від Removal Strategy, яка визначає **який** товар використовується.)

**Три методи** (налаштовуються: Configuration → Operation Types → Delivery Orders → розділ Reservation):

| Метод | Коли резервується | Коли використовувати |
|-------|-------------------|---------------------|
| **At Confirmation** | Відразу при підтвердженні SO | Зазвичай є запас; потрібна негайна гарантія |
| **Manual** | Тільки після натискання "Check Availability" | Пріоритизація вручну, обмежений запас, дорогі товари |
| **Before Scheduled Date** | За X днів до дати відвантаження | Баланс між резервуванням і гнучкістю |

**Before Scheduled Date:**
- Поля: Days Before (звичайні замовлення) + Days Before (starred/пріоритетні).
- Starred delivery → резервується раніше (наприклад, за 4 дні), звичайне → за 2 дні.
- Статус "Waiting" → поки не настав час резервування; "Ready" → зарезервовано.

**Ручне резервування** завжди доступне незалежно від методу.

**Odoo 19 — Forecast View:** можна прямо з forecast unreserve одне замовлення і зарезервувати за іншим (вищий пріоритет).

---

## Правила проштовхування/протягування (Push & Pull Rules)

**Маршрути (Routes)** = шляхи руху товарів. Маршрути складаються з правил (rules).

**Pull Rule** = спрацьовує від **потреби** (demand). Odoo створює ланцюг переміщень у зворотньому порядку від клієнта до складу.  
Приклад: SO підтверджено → Odoo створює Delivery → Packing → Picking.

**Push Rule** = спрацьовує коли товар **досягає** певної локації.  
Приклад: товар надійшов у WH/Input → автоматично створюється transfer до Quality Control.

**Перегляд маршруту:** Products → вибрати продукт → вкладка Inventory → View Diagram → візуальна схема всіх кроків з кольоровим кодуванням.

**Налаштування правил:** Configuration → Routes → вибрати маршрут → кнопка правила → деталі (джерело, призначення, тип операції).

**Коли змінюєте кроки в Warehouse:** Odoo автоматично оновлює push & pull rules. Не треба налаштовувати вручну.

**Джерела потреби (triggers for pull):** підтверджений SO, reordering rule, inter-warehouse transfer.

---

## Консигнація (Consignment)

**Суть:** постачальник зберігає свій товар на вашому складі. Ви продаєте → отримуєте комісію. Право власності залишається у постачальника до моменту продажу.

**Увімкнення:** Settings → Traceability → ✅ Consignment.

**Прийом консигнаційного товару:**
- Немає PO → Receipt створюється вручну: Inventory → Receipts → New.
- Поле **Receive From** = постачальник (власник товару).
- Поле **Assigned Owner** = той самий постачальник (не ваша компанія).
- Add a Line → вибрати продукт → кількість → Validate.

**Вплив на Stock Valuation:**
- Товар відображається у On Hand (він фізично є на складі).
- Але **Inventory Valuation = 0** для консигнаційних товарів (Odoo знає що вони не ваші).
- Reporting → Valuation → поле Total Value для таких товарів = 0.

---

## Права доступу для команди інвентаризації (Access Rights)

**Рівні доступу в Inventory:**
- **Administrator** — повний доступ: налаштування, звіти, виробництво, закупівлі.
- **User** — операційний доступ: transfers, barcode, receipts.

**Warehouse Manager (приклад налаштувань):**
- Inventory: Administrator
- Purchase: Administrator
- Manufacturing: Administrator
- Quality: User (не admin)
- Documents: User (тільки свої документи)

**Warehouse Operator (приклад):**
- Inventory: User (без admin)
- Purchase: немає доступу
- Manufacturing: немає доступу

**Практичний наслідок:**
- Operator бачить менше додатків у головному меню.
- Barcode-додаток доступний при наявності Inventory User.
- Operator не може змінювати налаштування, BoM, workcenters тощо.

**Налаштування:** Settings → Manage Users → New → вибрати роль Member (не Admin) → налаштувати рівні доступу для кожного додатку → Save.

---

## Правила відвантаження (Shipping Policy)

**Дві стратегії:**

**1. Ship all products at once** (за замовчуванням):
- Чекає поки всі товари замовлення є в наявності → один delivery.
- Delivery = "Waiting" поки не вистачає хоча б одного товару.
- Validate стає сірим (неактивним) до заповнення запасу.

**2. Ship products as soon as available with back orders:**
- Відправляє наявні товари одразу → автоматично створює **backorder** для решти.
- Validate активний навіть при частковому запасі.
- При Validate → popup "Create Backorder?" → Так → другий delivery order для решти.

**Де налаштовується:** Settings → Operations → Picking Policy (dropdown).

**Застосування:** налаштовується глобально для компанії, але можна перевизначити на рівні конкретного SO.

---

## Друк етикеток відвантаження (Print Shipping Labels)

**Суть:** автоматичне генерування shipping label при Validate delivery order через інтеграцію зі стороннім перевізником.

**Доступні інтеграції:** FedEx, UPS та інші (Settings → Shipping Connectors → ✅ ввімкнути потрібного).

**Налаштування Shipping Method:** Configuration → Shipping Methods → вибрати метод:
- **Integration Level** = "Get Rate and Create Shipment" (для ставок + label).
- Вкладка **Configuration**: облікові дані аккаунту перевізника, тип pickup, тип упаковки.
- **Test/Production Environment**: переключати лише коли готові до реального використання.

**Що потрібно заповнити:**
1. Адреса та телефон компанії (Settings → Company → Update Info).
2. Адреса та телефон клієнта (Sales → Customers).
3. Вага продукту (Product → Inventory tab → Weight поле).

**Workflow:**
1. Створити SO → Add Shipping → вибрати метод → Get Rate → Add → Confirm.
2. Delivery Smart Button → Validate.
3. **Shipping label автоматично з'являється в Chatter** delivery order.
4. Роздрукувати та наклеїти на посилку.

---

## Поповнення складу між warehouse (Resupplying Warehouse)

**Суть:** склад-магазин поповнюється з головного складу/розподільчого центру.

**Налаштування:**
1. Settings → ✅ Storage Locations + ✅ Multi-Step Routes.
2. Configuration → Warehouses → вибрати склад-магазин → вкладка Warehouse Configuration.
3. Поле **Resupply From** → ✅ поставити галочку навпроти складу-донора.

**На продукті:** вкладка Inventory → Routes → вибрати маршрут поповнення (назва складу-магазину).

**Reordering Rule для міжскладського поповнення:** Products → вибрати продукт → Smart button Reordering Rules → New → Location = магазин/stock, Route = маршрут поповнення, Min/Max.

**Workflow:**
1. SO підтверджується у магазині → продається останній товар.
2. Reordering rule спрацьовує → створюється Delivery у розподільчому центрі.
3. Центр відправляє → магазин отримує (Receipt).
4. Перегляд: Inventory Overview → Group by Warehouse → видно операції в кожному складі.

**Prefix документів:** короткий код складу відображається у всіх документах (наприклад, SHOP/WH).

---

## Оцінка запасів (FIFO / AVCO / Standard — Costing Methods)

**Три методи оцінки:**

### Standard Price (Стандартна ціна)
- Собівартість фіксована на продукті. Не змінюється при надходженнях/виробництві.
- Зміна: ручне оновлення або "Compute Price from BoM".
- Найпростіший. Підходить для стабільних витрат.

### AVCO (Average Cost / Середня вартість)
- Собівартість перераховується після **кожного виробничого замовлення або надходження**.
- Формула: (поточний запас × поточна ціна + нові одиниці × нова ціна) / загальна кількість.
- При **продажі** — списується за поточною середньою ціною (без перерахунку).
- Підходить: ціни на матеріали коливаються, але не потрібна точна cost-history.

### FIFO (First In, First Out)
- Odoo відстежує вартість кожної партії.
- При продажі — списуються найстаріші партії першими.
- При cross-batch: береться середня вартість тільки тих партій що вибули.
- Повернення: використовується вартість на момент початкового продажу.
- Найточніший. Потрібен суворий контроль. Для tight margins та traceability.

**Де налаштовується:** Configuration → Categories → вибрати категорію → Costing Method.

**Зміна методу:** впливає на всю бухгалтерію. Тільки за погодженням з бухгалтером.

**Перегляд:** Reporting → Valuation → групувати по Product → розгорнути для перегляду шарів.

---

## Прямі витрати (Landed Costs)

**Landed Costs** = додаткові витрати на закупівлю (фрахт, мито, страхування, податки), які необхідно включати у собівартість товару.

**Вимоги:**
- Встановлений Accounting модуль.
- Settings → Valuation → ✅ **Landed Costs**.
- Costing Method = AVCO або FIFO (не Standard Price).
- Inventory Valuation = **Perpetual**.

**Створення продукту для landed cost:**
- Product Type = **Service** (не фізичний товар).
- Purchase tab → ✅ **Is a Landed Cost**.
- **Split Method** = метод розподілу по товарах:
  - **Equal** — порівну між всіма рядками receipt.
  - **By Quantity** — пропорційно кількості одиниць.
  - **Current Cost** — пропорційно вартості.
  - **By Weight** або **By Volume** — пропорційно вазі/об'єму.

**Workflow:**
1. Додати landed cost продукт (наприклад, "Import Tax") до рядків PO.
2. Підтвердити PO → отримати товар → Validate receipt.
3. Vendor Bills → Create Landed Cost → в полі Transfers вказати validated receipt.
4. Натиснути **Compute** → перевірити Valuation Adjustments tab → **Validate**.
5. Valuation товарів оновиться (наприклад: $50 → $52 з урахуванням $2 податку).

---

## Штрихкоди (Barcode)

### Загальне налаштування

**Увімкнення:** Settings → ✅ Barcode Scanner.

**Присвоєння штрихкодів:**
1. Settings → Configure Barcodes (масово для всіх продуктів).
2. Product form → поле Barcode (для одного продукту; скан реального штрихкоду).
3. Штрихкоди можна присвоювати: продуктам, операційним типам, пакетам, упаковкам, локаціям.

**Типи сканерів:** USB, Bluetooth (~10 м), мобільний додаток (Zebra TC21), камера планшету.

**Print Barcodes:** у Receipt у Barcode App → шестерня → Print Barcodes (PDF для всіх продуктів у receipts).

### Receipts та Deliveries через Barcode

**Receipt:**
- Barcode → Operations → Receipts → вибрати receipt → сканувати товари → Validate.

**Delivery:**
- Barcode → Operations → Delivery Orders → вибрати delivery → сканувати товари → Validate або scan validate barcode.

### Inventory Adjustments через Barcode

1. Operations → Physical Inventory → вибрати продукти → Request a Count → призначити user.
2. В Barcode → Inventory Adjustments → видно призначені підрахунки.
3. Scan location barcode → scan product → ввести кількість.
4. Зелений = Set Current Value (вже заповнено); без числа = залишити порожнім для підрахунку.
5. Apply → завершити.

### Picking з лотами та серійними номерами

**Configuration → Operation Types → Delivery Orders → вкладка Barcode App:**
- ✅ **Show Reserved Lots and Serial Numbers** → після сканування продукту видно які лоти зарезервовані.
- Без галочки → Odoo auto-зарезервував, але оператор може сканувати будь-який доступний лот.

**Scanning wrong lot:** Odoo дозволяє, але підсвічує червоним. Можна видалити іконкою кошика.

### Barcode + Упаковка (Product Packaging)

1. Налаштувати barcode на конкретному типі упаковки (Product → Inventory → Packaging → Barcode).
2. В Barcode App при скануванні штрихкоду упаковки (наприклад, 8-pack) → Odoo автоматично зараховує 8 одиниць.

---

## Що нового в Inventory (Odoo 19)

### UX та налаштування продуктів
- Тепер можна **змінити Track Inventory** на продукті після того як він вже продавався (раніше неможливо).
- **Inventory Adjustment прямо з продукту** — без переходу в Physical Inventory.
- **Units та Packaging об'єднані** — один інтерфейс замість двох окремих розділів.
- Packaging конфігурується у вкладці Sales продукту; можна призначити barcode прямо там.
- Можна мати **кілька штрихкодів** для одного packaging.
- Купівля у постачальника в різних UoM: кілька рядків для одного постачальника з різними одиницями.

### Закупівлі та поповнення (Procurement)
- **Suggest** в каталозі PO: рекомендує продукти та кількості на основі historical data або прогнозу.
  - Параметри: горизонт поповнення (дні), базовий період (3 місяці тощо), % зростання.
  - Фільтрується по категоріях → автоматично адаптує суму.
  - Кнопка "Add All" → всі рекомендовані товари одразу в PO.
- **Replenishment Dashboard оновлено:**
  - Відображає маршрут, постачальника, Origin прямо в рядку.
  - Поле Origin (горизонт) конфігурується в Settings (за замовчуванням 365 днів).
  - Кнопка "i" → повний перегляд дат, lead times, графіку, рекомендацій по Min/Max.
  - **Group RFQ на постачальнику** = групування по часовому проміжку (On Order / Daily / Weekly / Always). Замінює складне "propagate procurement group".
- **MTO конфігурується через Settings** → пошук "MTO" → без потреби ручно архівувати/розархівувати маршрут.
- MTO можна встановити **на рядку Sales Order** (без зміни налаштувань продукту).
- Якщо продукт купується і має постачальника → Buy route використовується автоматично без явного вибору.

### Відвантаження та пакети
- **Forecast View повністю переосмислений:**
  - Показує Time to Replenish, деталі lead times.
  - Видно кількість для резервування і що вже зарезервовано.
  - Unreserve одне замовлення → reserve за іншим прямо з forecast.
  - Для товарів з expiry date → видно removal dates та кількість "до видалення".
- **Вкладені пакети (nested packages):** Box → Pallet. Сканування штрихкоду піддону переміщує всі вкладені коробки та товари одним дією.
- **Barcode кнопка прямо на Transfer** (без переходу в окремий додаток Barcode).
- **Підказка альтернативної локації в Barcode:** якщо поточна локація порожня → показує кількість в інших місцях → тап → одразу переходимо туди.

### Оцінка запасів (Valuation)
- **Один Stock Report** (замість Stock Report + Valuation Report) — все в одному місці.
- **Backdating переміщень:** при прийомі товару можна змінити Effective Date (наприклад, 31 грудня, навіть якщо валідуємо 7 січня).
- **Backdating Physical Inventory:** при Apply Count → встановити конкретну дату підрахунку.
- **Inventory at Date фільтрується по warehouse/локації** у Stock Report.
- **Adjust Valuation** прямо зі Stock Move (зміна вартості з поясненням причини).
- **Спрощена конфігурація Valuation:**
  - Periodic at Closing або Perpetual at Invoicing.
  - Вибір periodicity: Manual / Daily / Weekly.
- **З Accounting → Review → Inventory Valuation:** вибрати дату → бачити Initial Balance + Ending Stock → кнопка **Generate Entry** → автоматичне створення journal entries.

---

*Конспект на основі транскриптів офіційних YouTube-відео Odoo Inventory. Функціонал Odoo 19 позначений відповідно.*
