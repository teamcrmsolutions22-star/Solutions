# Odoo Marketing, VoIP, Events, Knowledge, Subscriptions — Knowledge Base (Video Transcripts)

---

## EMAIL MARKETING

### Основи email-маркетингу

**Ключові поняття:**
- **Mailing (розсилка)** — одиночний standalone лист
- **Campaign (кампанія)** — серія листів, що надсилаються цільовій аудиторії впродовж часу
- Додаток Email Marketing: планування, виконання та відстеження кампаній з одного місця

**Налаштування (Configuration → Settings):**
- **Mailing Campaigns** — активує управління кампаніями; без цього пункту меню «Campaigns» не з'являється
- **Split first and last name** — розділяє ім'я контакту на два поля для персоналізації
- **Blacklist option** — дозволяє одержувачам додавати себе до чорного списку під час відписки
- **24h stat mailing reports** — статистика надсилання через добу після відправлення
- **Dedicated server** — підключення окремого SMTP-сервера для розсилок

**Dashboard розсилок:**
- Колонки: дата, тема, відповідальний, кількість надісланих, % доставлено, % відкрито, % кліків, % відповідей, статус (draft / in queue / sent)
- Статус дозволяє відстежувати стан без відкриття кожного листа

**Створення розсилки:**
1. New → ввести subject
2. Recipients: вибір з mailing list, contacts, lead/opportunity, тощо; можливість зберегти кастомний фільтр
3. Вибір шаблону в tabs Mail Body → кастомізація через блоки (Blocks / Customize / Design)
4. Send → "Send to all" (автоматичне планування) або Schedule (вручну дата/час)
5. Після відправки: смарт-кнопки зі статистикою (open rate, click rate, reply rate)
6. Test — надсилання тестового листа на вказану адресу

**Recipients — фільтри:**
- По замовчуванню: blacklist is not set (захист від спаму)
- Можна додавати кастомні правила (AND/OR), наприклад: country = United States, company ≠ StealthyWood
- Архівовані записи (lost leads) не включаються без явного Toggle "Include archived"

---

### Шаблони листів

**Редактор листів (drag & drop):**
- Три вкладки: **Blocks** (готові секції — header, CTA, promo, text+image, footer), **Customize** (налаштування обраного елемента), **Design** (глобальні: шрифти, кольори фону, ширина листа)
- Зміна логотипу: клік → Replace → завантажити свій
- Зміна зображення: клік → Replace
- Редагування тексту: клік на текстовий блок
- Прибрати блок: іконка trash поруч із блоком

**AI-генерація тексту:**
- Виділити текст → кнопка AI → ввести prompt → Insert

**Збереження шаблону:**
- "Add to templates" — зберігає для повторного використання
- "Remove from templates" — прибирає зі списку
- Збережені шаблони відображаються зі зірочкою у новій розсилці

**Просунуті прийоми:**
- Фільтр на зображення (cover block): параметр Filter → ефект (early bird, gradient тощо)
- Зміна ширини тіла листа (Design tab → Body width → small) — краще відображення на мобільних
- Кольори через HEX-код: Custom tab → поле hex
- Border для футера: вибрати секцію → Border → px + тип лінії + колір
- Видалення соціальних іконок: клік → стрілка вправо → backspace ×2

---

### Кампанії

**Активація:** Configuration → Settings → Mailing Campaigns → Save

**Kanban-вид кампаній:**
- Картка кампанії: назва, теги, кількість розсилок/SMS/постів, відповідальний, метрики (revenue, quotations, opportunities, clicks)
- Стадії — кастомізуються: Configuration → Campaign Stages

**Форма кампанії:**
- Смарт-кнопки з аналітикою
- Кнопки для додавання контенту: **Send Mailing** (email), **Send SMS**, **Add Post** (Social Marketing), **Send Push** (Website push) — кнопки з'являються тільки якщо відповідні додатки встановлені

**Маршрутизація кампаній:**
- Кампанії можна створювати і управляти з Email Marketing, SMS Marketing, Social Marketing або Marketing Automation
- Всі канали кампанії доступні на одній сторінці — без дублювання даних

**Статуси розсилки:** draft → in queue → sending → sent

---

### A/B тестування

**Концепція:** надсилання двох і більше версій листа підмножині аудиторії → автоматичний вибір переможця → розсилка переможця решті аудиторії.

**Налаштування (вкладка A/B Test):**
- Checkbox "Allow A/B Testing"
- **% аудиторії** для тесту (за замовчуванням 10%)
- **Winner selection:** highest open rate, highest click rate, highest reply rate, quotations, revenues
- **Send final on** — дата і час відправки переможця

**Важливо:**
- Якщо лист вже надісланий — A/B тест налаштувати неможливо; потрібно Actions → Duplicate
- "Create an alternate version" — дублює поточний лист для створення варіанту B
- "Compare versions" — порівняння метрик версій після тесту

**Результати порівняння:** таблиця з датою відправки, темою, кількістю надісланих і bar-графіки метрик.

**Практика:** тест "з промо-кодом vs без промо-коду" показав 21% vs 8.3% click rate — промо-код переміг.

---

### Реактивація втрачених лідів

**Сценарій:** ліди, які були marked as lost в CRM, архівуються, але досі доступні для email-розсилок.

**Покрокова конфігурація:**
1. New mailing → Recipients: **Lead/Opportunity**
2. Розгорнути фільтр → увімкнути Toggle **"Include archived"** (без цього архівовані не включаються)
3. Додати правила фільтрації:
   - Stage → is not in → [потрібні стадії] (наприклад, оставити тільки "Proposition")
   - Lost Reasons → is in → [конкретна причина, напр. "Not enough stock"]
   - Country → is in → [потрібна країна]
4. Зберегти фільтр: іконка диска праворуч → назва → Add

**Бізнес-кейс:** clearance розпродаж для лідів, які раніше були lost через брак товару — тепер товар є.

---

### Списки розсилки та Opt-Out

**Mailing Lists (Email Marketing → Mailing Lists):**
- Kanban-вид: кількість контактів, email/mobile контакти, кількість розсилок, % bounce, opt-out, blacklist
- Кнопки: Import Contacts, Send Mailing

**Створення списку:**
- New → назва → опція "Show in preferences" (показує список на сторінці підписок для самокерування)

**Смарт-кнопки на формі списку:**
- Recipients — підписані контакти
- Mailings — надіслані розсилки
- Bounce / Opt-out / Blacklist — відповідні відсотки

**Додавання контактів:**
- З списку: кнопка Import Contacts → email або "Name" <email>
- З форми контакту: Add a line → вибір списку
- Mailing List Contacts (меню): загальний список із фільтром exclude blacklisted

**Відписка (Opt-out):**
- Посилання unsubscribe автоматично додається до всіх шаблонів (крім "start from scratch" — там треба вручну)
- Сторінка відписки: список розсилок + причини відписки + кнопка "Exclude me" (Blacklist)
- Кастомні причини відписки: Configuration → Opt-out Reasons → можна змінити порядок drag-and-drop

**Blacklist:**
- Configuration → Blacklisted Email Addresses
- Unblacklist: кнопка → причина → Confirm → запис архівується

**Website інтеграція:**
- Newsletter block (Website editor): поле email + кнопка subscribe → підписка на вибраний mailing list
- Newsletter popup: popup при скролі до блоку
- Newsletter (one field): компактна версія

---

## MARKETING AUTOMATION

### Основи автоматизації маркетингу

**Призначення:** автоматизація маркетингових активностей (nurturing, cart recovery, promo offers) без ручних дій.

**Dashboard:** kanban-вид усіх кампаній автоматизації зі статусами активностей.

**Створення кампанії:**
- Назва
- **Target** — модель (Lead/Opportunity, Contact, тощо); пошук через "Search more" якщо немає в quick dropdown
- **Unicity based on** — уникнення дублів (наприклад, по email: crm.lead → email)
- **Filter** — доменний вираз для звуження аудиторії (наприклад, stage_id.name = "New")
- Лічильник: Records (всі, що відповідають фільтру) vs Participants (вже залучені)
- Фільтр можна зберегти як Favorite для повторного використання

---

### Marketing Activities

**Типи активностей:**
- **Email** — надсилання листа (потрібен mail template)
- **SMS** — потребує номерів телефонів і IAP-кредитів
- **Server Action** — серверна дія (оновити запис, змінити стадію тощо)

**Конфігурація активності:**
- Назва
- Activity type
- Mail/SMS template (вибір або створення на льоту: Create and Edit)
- Затримка: X годин / днів / тижнів / місяців після старту або попередньої активності
- Expiry duration — дата закінчення активності
- Domain — додаткові фільтри аудиторії

**Child Activities (дочірні активності):**
- Тригери: opened / not opened / replied / not replied / clicked / not clicked / bounced
- Відступ у списку вказує на ієрархію
- "Add another activity" — паралельна активність (не дочірня)

**Server Actions:**
- Model: Lead/Opportunity
- Action to do: Update a Record
- Поля для оновлення (наприклад, stage_id = Qualified)

**Тестування кампанії:**
- Кнопка "Launch a test" → вибір існуючого запису або створення нового
- Покрокове виконання через кнопку Run
- Перевірка в Inbox та CRM після тесту

**Аналітика:** Reporting → Link Tracker, Traces, Participants

---

### SMS маркетинг

**Вимоги:** IAP-кредити (In-App Purchase). Купівля: Settings → Contacts → Buy credits.

**Конфігурація SMS:**
- Subject (внутрішній, одержувач не бачить)
- Recipients: вибір моделі + фільтри (наприклад, Sales Order status ≠ cancelled + country = US)
- SMS content: текст + посилання (UTM трекінг автоматично)
- Лічильник символів і кількість SMS-повідомлень

**Settings tab:**
- Include opt-out link — дає можливість відписатися від SMS
- Campaign, Responsible

**A/B тест SMS:** аналогічно email — checkbox, %, winner selection (quotations рекомендовано для продажів), дата відправки переможця.

**Аналітика:** смарт-кнопки після відправки; Reporting → графіки, Link Tracker; Configuration → Blacklisted Phone Numbers.

**UTM:** Odoo автоматично додає UTM-параметри до посилань в SMS для відстеження ефективності.

---

### Соціальний маркетинг

**Підключення соціальних мереж:**
- Configuration → Social Media → Link Account (Facebook, Instagram, YouTube, X/Twitter, LinkedIn)
- Або: Add Stream → вибір платформи

**Dashboard:** огляд стрічок підключених акаунтів; кнопка Sync для оновлення.

**Створення поста:**
- New Post → вибір компанії та каналів (мультивибір)
- Поле Message + Preview у реальному часі для кожного каналу
- Split per media — окремі вкладки і тексти для кожного каналу (корисно при обмеженні символів)
- Вкладення зображень
- Прив'язка до Campaign
- Send Now або Schedule Later (дата/час)

**Кампанії в Social Marketing:**
- Kanban-вид зі стадіями (New, Running, Ended — стадії крім New треба створювати вручну)
- Картка: назва, теги, кількість posts/notifications/mailings/SMS, clicks, revenue, quotations, opportunities
- З форми кампанії: Send Mailing (email), Send SMS, Add Post, Send Push Notification
- Всі канали в одному місці; SMS та email доступні тільки якщо активовано Mailing Campaigns

**Push Notifications:** через Website app; вибір "Post Notification" при створенні поста.

---

### Тестування та запуск кампаній автоматизації

**Перед запуском:**
1. Launch a test → вибір запису
2. Покрокове виконання: кнопка Run для кожної активності
3. Перевірка email в Inbox
4. Перевірка тригерів дочірніх активностей (відкриття листа, клік на посилання)
5. Перевірка server actions у відповідних додатках (CRM, тощо)

**Запуск кампанії:** після тестування — зміна статусу на Running.

**Аналітика (Reporting):**
- Traces — кількість оброблених, запланованих, перенаправлених активностей
- Participants — деталі по кожному учаснику
- Link Tracker — статистика по посиланнях

---

## SUBSCRIPTIONS

### Основи підписок

**Концепція:** Subscriptions — продукти або послуги з регулярною оплатою. Застосування: нові контракти, upsell, контроль churn.

**Dashboard:** огляд підписок; фільтр за замовчуванням — in progress або paused (підтверджені/виставлені рахунки); знімити X щоб побачити всі, включно з чернетками.

**Recurring Plan:**
- Встановлюється прямо на quotation (наприклад, Monthly, Yearly)
- Налаштування: Configuration → Recurring Plans

**Продукт підписки:**
- Checkbox **Subscriptions** — позначає продукт як recurring (автоматично для нових продуктів у Subscriptions)
- Вкладка **Recurring Prices** — прайс-правила: plan + pricelist + ціна
- Product type: Service (за замовчуванням), Goods (consumable або storable), Combo
- Invoicing Policy: рекомендовано **Ordered Quantities** (prepaid/fixed price)

**Quotation підписки:**
- Виглядає як звичайна sales quotation
- Поле Recurring Plan → вибір
- End Date — якщо порожнє, підписка безстрокова
- Pricelist — вибір + кнопка "Update Price" для застосування знижок

**Після підтвердження:**
- Перетворюється на Sales Order
- Поле Next Invoice — дата наступного рахунку

---

### Продукти підписок

**Типи продуктів:**
| Тип | Опис | Track Inventory |
|-----|------|----------------|
| Service | Послуга (урок, клас, підтримка) | Не потрібно |
| Goods — Consumable | Витратний матеріал (пляшка, засіб) | Необов'язково |
| Goods — Storable | Товар зі складу | Обов'язково |
| Combo | Набір продуктів підписки | — |

**Recurring Prices tab:**
- Add a price rule → план + pricelist (опціонально, якщо для всіх — залишити порожнім) + ціна
- Необмежена кількість правил
- Прив'язка до price list членства/партнерства

**Нові можливості (Odoo 19):**
- **One-time purchase** — опція "Accept one time" в Recurring Prices → клієнт може купити як разово, так і підписатися
- **Advanced price list rules** — повна підтримка цінових правил (знижки %, формули) для recurring цін
- **Subscriber price list** — автоматичне призначення pricelist при старті підписки через Membership Partnership
- **Prorata налаштування** — опція "Prorated price or not" в recurring prices для управління пропорційним розрахунком при upsell

---

### Автоматизація правил

**Automation Rules (Configuration → Automation Rules):**

**Структура правила:**
- Назва
- Умова (наприклад: rating satisfaction < 30%, over = 1 month)
- Action to do: **Create next activity**, Send email, Send SMS, Change health value
- Trigger: Ed condition / тригерна дата (наприклад, start date of sales order)
- Delay after trigger (наприклад, 1 month)

**Activity секція (для "Create next activity"):**
- Activity type: Todo, Call, тощо
- Due date: X днів
- Assign to: Subscription Salesperson (або конкретний користувач)
- Title та Note для контексту

**Кнопка "Trigger Now"** — миттєве виконання правила без очікування тригера.

**Кейс:** через місяць після старту підписки для клієнтів з satisfaction < 30% — автоматично створюється Todo-активність для менеджера з дзвінком протягом 5 днів.

---

### Scheduled Actions в Subscriptions

**Доступ:** Settings → (Developer Mode) → Technical → Scheduled Actions

**Потрібні налаштування бухобліку:** Settings → Accounting → Deferred Expense + Deferred Revenue (необхідно для генерації recurring інвойсів).

**Ключова scheduled action:** "Generate Recurring Invoices and Payments" (Subscriptions Apply)
- Модель: Sales Order
- Генерує recurring інвойси та платежі наприкінці кожного дня

**Параметри scheduled action:**
- **Model** — таблиця/модель даних
- **Allowed Groups** — обмеження доступу
- **Scheduled User** — виконавець (зазвичай OdooBot)
- **Execute every** — інтервал (дні/години/тижні)
- **Active** — вкл/викл
- **Next execution date** — наступний запуск
- **Number of calls** — 0 = не запускати, від'ємне = без ліміту, позитивне = кількість разів
- **Priority** — 0 найвищий, 10 найнижчий
- Кнопка **Run manually** — запуск поза розкладом

---

### Продовження та закриття підписок

**Renewal (Продовження):**
- Можна продовжувати тільки підписки зі створеним інвойсом
- Create Invoice → Create Draft → Confirm → повернутися на Sales Order → кнопка **Renew**
- ODO автоматично створює новий subscription quote для того ж клієнта і продукту

**Sales History:** смарт-кнопка → огляд поточних і минулих підписок клієнта з status.

**Closing (Закриття):**
- Кнопка **Close** → popup з причиною закриття (наявні або нова) → Submit
- Статус змінюється на **Churned**
- Причина відображається в чатері

**Reopen (Відновлення):**
- Кнопка **Reopen** (доступна навіть після закриття)
- Повертає підписку до In Progress
- Автоматично надсилається інвойс через Send by Email
- Активність "check reopened subscription" додається в чатер

**Cancellation vs Closing:**
- **Cancel** — тільки на стадії quotation (до підтвердження); статус → Cancelled
- **Close** — після підтвердження та інвойсу; статус → Churned
- Різниця важлива для аналізу retention: на якому етапі втрачено клієнта

---

### Upsell підписок

**Що таке upsell:** пропозиція преміальнішої версії продукту поточному підписнику.

**Умова:** підписка повинна мати хоча б один підтверджений інвойс.

**Процес:**
1. Відкрити Sales Order підписки
2. Create Invoice → Confirm (якщо ще не виставлявся)
3. Кнопка **Upsell** → створюється новий Sales Order з міткою "upsell" у чатері
4. Додати Quotation Template (якщо не відображається — увімкнути в Settings)
5. Вибрати template → Order Lines автоматично оновлюються
6. Send by Email → Confirm після підтвердження клієнтом

**Create Alternative:**
- Кнопка **Create Alternative** — дублює upsell order для пропозиції іншої версії
- Можна надіслати кілька альтернатив клієнту для вибору

**Після вибору клієнта:** Confirm → Create Invoice → продовжити звичайний флоу.

---

### Звіти по підписках

**Ключові метрики:**
- **MRR (Monthly Recurring Revenue)** — щомісячний recurring дохід (відокремлено від разових продажів)
- **ARR (Annual Run Rate)** — річний прогноз на основі MRR
- **Retention Rate** — % підписників, збережених від місяця до місяця
- **Churn** — зниження MRR (скасування підписки)
- **Expansion** — зростання MRR від upsell

**Звіти (Reporting menu):**
- **Subscriptions** — Pivot: MRR по salesperson, типу підписки; додаткові measures (count тощо); export до Spreadsheet
- **Retention** — cohort-таблиця: % збережених підписок по місяцях
- **MRR Breakdown** — bar graph: new, churn, expansion по місяцях; перемикання на ARR через Measures

**MRR смарт-кнопка** на конкретному Sales Order — хронологія змін MRR: renewals, upsells, cancellations.

**Source Tracking** (вкладка Other Info) — інтеграція з CRM: medium, campaign, source (звідки прийшов клієнт). Корисно для аналізу ефективності маркетингових каналів.

**Що нового в Odoo 19:**
- Pause підписки через customer portal (клієнт сам ставить на паузу з вказанням дат → ODoo відновлює автоматично)
- Warning при наближенні до auto-close (якщо підписка прострочена на N днів)
- Invoicing end of period: попередження замість блокування при ранньому інвойсі
- Better UX на product page: вибір плану, відображення економії

---

## VoIP

### Налаштування VoIP з Axivox

**Що таке VoIP:** цифрова телефонія через інтернет, без традиційних телефонних ліній.

**Вимоги:** обліковий запис у VoIP-провайдера (Axivox, OnSIP, DWW). Провайдер повинен підтримувати WebSocket-доступ до SIP-серверів.

**Встановлення модуля:** Apps → пошук "VoIP" → Install. Після цього у навігаційній панелі з'являється іконка телефону.

**Налаштування провайдера:**
1. Settings → Integrations → VoIP → Manage Providers → New
2. Поля: назва, WebSocket (однаковий для всіх Axivox), PBX Server IP (з Axivox: Users → ім'я → SIP Identifiers → Domain)
3. VoIP Environment: Demo → Production
4. Save

**Налаштування користувача:**
1. Settings → Manage Users → Edit профіль → вкладка VoIP
2. VoIP Provider: вибрати
3. VoIP Username: скопіювати SIP username з Axivox (Users → SIP Identifiers)
4. VoIP Secret: ввести пароль вручну (вставка не працює)

**Перевірка:** відкрити VoIP widget → Contacts → знайти контакт → зателефонувати.

---

### Управління користувачами Axivox

**Incoming Phone Numbers:**
- Список куплених номерів; номер без destination = unassigned
- Призначення: вибрати номер → Destination type: Extension → вибрати Extension

**Створення користувача (Add User):**
- Extension number (внутрішній)
- Name, Email (для voicemail-повідомлень)
- GSM number (альтернативний номер для переадресації)
- Voicemail: Yes
- Outgoing number: конкретний номер або Default
- Directory: Default
- Simultaneous calls: checkbox (дозволяє кілька одночасних дзвінків)
- Hot desk: для спільних фізичних телефонів (log in з будь-якого пристрою)

**Forwarding (переадресація):**
- **On no answer:** ланцюжок → агент 1 (N секунд) → агент 2 (M секунд) → voicemail
- **On busy:** аналогічно, спрацьовує якщо зайнятий
- **Follow me:** переадресація на зовнішній телефон; вмикається/вимикається checkbox; взаємовиключно з forwarding

**Speed Dial (Keys tab):**
- Кількість keys, тип (quick call, line), label, номер/extension

**SIP Identifiers tab:** credentials для підключення Axivox до ODoo або інших систем.

**Дозволи (Permissions tab):** для адміністраторів; не впливають на можливість дзвонити.

**Важливо:** після всіх змін → Save → Apply Changes (кнопка у правому верхньому куті).

---

### Дзвінки: здійснення, прийом, переключення

**VoIP widget:** іконка телефону у навігаційній панелі.

**Вихідний дзвінок:**
- Widget → Contacts → пошук → клік на контакт → іконка телефону
- Або: Widget → Keypad → ввести номер з country code (+1 для США) → зелена кнопка
- Або: навести на номер у CRM opportunity → іконка Call
- Або: з картки opportunity у чатері → клік на номер

**Під час дзвінка (widget):**
- Mute мікрофона
- Іконка email → надіслати email шаблон прямо під час дзвінка
- Іконка avatar → відкрити профіль контакту
- Іконка годинника → запланувати follow-up активність
- Іконка Transfer (дві стрілки) → ввести extension → Transfer
- Червона кнопка → завершити дзвінок

**Вхідний дзвінок:** попап у нижньому лівому куті → зелена кнопка (прийняти) / червона (відхилити).

**Call Queue (Next Activities):** 
- У CRM: навести на opportunity → іконка телефону з "+" → додати до черги
- Widget → Next Activities → список дзвінків на сьогодні і прострочених

**Переадресація (Forwarding) на зовнішній номер:**
- Введення зовнішнього номера (з +1) у поле Transfer
- Або: налаштування в Axivox → Users → Forwardings → Forward on no answer / on busy

---

### Dial Plans

**Що таке Dial Plan:** логіка маршрутизації вхідних дзвінків; налаштовується у Axivox → Dial Plans → Visual Editor.

**Елементи dial plan:**

| Елемент | Функція |
|---------|---------|
| Menu | IVR-меню; клієнт натискає цифру → перехід до відповідної гілки |
| Play a file | Відтворення аудіо-файлу або TTS |
| Digital Receptionist | Авторецепціоніст: клієнт вводить extension → автоматичне переключення |
| Time Condition | Умова за датою/часом (наприклад, свята) → True/False гілки |
| Dispatcher | Маршрутизація за кодом країни (regex); завжди є гілка "unknown" |
| Access List | Whitelist/blacklist за номером: Authorized → отримує дзвінок; Refused → Hangup |
| Call | Переключення на агента, групу, чергу |
| Voicemail | Перехід на voicemail |
| Hangup | Завершення дзвінка |

**Digital Receptionist:**
- Timeout — скільки секунд на введення extension
- "Not a valid extension" — аудіо при невірному введенні; вихід підключається назад до Menu

**Time Condition:**
- Add a date and time: day of week (all/конкретний) + дата range + місяць
- True → одна гілка, False → інша гілка

**Dispatcher (regex):**
- Назва + Regular expression (напр. `01-\d+` для US/CA, `^52` для MX)
- Кожне правило → окрема гілка; Unknown → загальна гілка

**Важливо:** Save + Apply Changes після кожного редагування.

---

### Черги дзвінків

**Call Queue** — система розподілу вхідних дзвінків між агентами.

**Налаштування у Axivox (Queues → Add a queue):**
- Назва + Internal Extension (для внутрішніх переключень)
- **Strategy (стратегія розподілу):**
  - Call all available agents — всі одночасно
  - Agent who hasn't received a call longest — найдовше без дзвінка
  - Agent with fewest calls — найменше дзвінків
  - Random agent — випадково
  - One after the other — послідовно
- **Maximum waiting time** — максимальний час очікування в черзі (секунди)
- **Maximum ringing duration** — час дзвінка одному агенту до переходу до наступного

**Static vs Dynamic агенти:**
- Static — завжди в черзі
- Dynamic — входять/виходять за допомогою кодів

**Коди агентів:**
- Agent connection number → набрати для входу в чергу
- Agent disconnection number → набрати для виходу

**Підключення через ODoo:**
- Widget → Keypad → набрати код підключення → зателефонувати
- Після підключення: одна секунда аудіо підтвердження

**Reporting:** у Axivox → Queues → Report → хто підключався, коли, які дзвінки.

**Ручне підключення агента:** кнопка "Connect an agent" → вибрати агента → Connect.

---

### Конференц-дзвінки

**Налаштування у Axivox (Conferences → Add a conference):**
- Назва + Internal Extension
- Access Code (пароль для входу)
- Administrator Extension
- Wait for administrator: Yes/No (No = учасники можуть говорити без адміністратора)

**Призначення зовнішнього номера:**
- Incoming Numbers → вибрати номер → Destination type: Conference → вибрати конференцію → Save + Apply Changes

**Підключення:**
- Зовнішній користувач: дзвінок на зовнішній номер → введення access code
- Внутрішній користувач: Widget → Keypad → набрати internal extension (напр. 505) → #після pin для прискорення

**Ручне запрошення:** кнопка Invite в Axivox → введення зовнішнього номера (з country code).

**Connected Users:** відображається і оновлюється в Axivox → Conferences.

---

### Dynamic Caller ID

**Концепція:** управління тим, який номер відображається у одержувача.

**Default outgoing number:** Axivox → Settings → Default outgoing number — відображається за замовчуванням для всіх дзвінків.

**На рівні користувача:** Axivox → Users → General → Outgoing number → Default або конкретний номер.

**Advanced options:** Axivox → Settings → Advanced options → правила за destination prefix:
- Destination prefix (код країни, напр. 0061 для Австралії) + номер для відображення
- Першим спрацьовує перше співпадаюче правило

**Переваги:**
- Клієнт бачить основний номер компанії (не особистий номер агента)
- При зворотному дзвінку потрапляє через dial plan компанії

---

### Голосові повідомлення та аудіо-файли

**Налаштування voicemail у Axivox:**
- Users → вибрати користувача → Forwardings tab → Send to voicemail as last resort (checkbox)
- Voicemails → Add voicemail → ім'я + email (для отримання аудіо-файлів)
- Призначити voicemail до incoming number

**Audio Messages:**
- Axivox → Audio Messages → Add a message → назва → Save
- **Text-to-speech:** кнопка "Text message" → вибір голосу (Mary US тощо) → текст → Generate → прослухати → Save
- **Record:** кнопка "Record/Listen" → вибрати extension → VoIP widget задзвонить → вимовити повідомлення → завершити

**Hold Music:** Axivox → Music on Hold → завантажити аудіо-файл.

**Використання:** аудіо-файли і voicemail підключаються у Dial Plans (елементи Play a file, Voicemail).

---

### Робота агента підтримки через VoIP

**Вхід у чергу дзвінків:**
- VoIP widget → Keypad → ввести agent connection code → зателефонувати → одна секунда підтвердження

**Helpdesk інтеграція:**
- При вхідному дзвінку: popup у Helpdesk app → можливість відкрити або створити ticket прямо з виклику
- З тікету: Activities → Call → вказати дату → Note

**Типовий воркфлоу агента:**
1. Вхід у чергу
2. Відкрити Helpdesk → знайти тікет клієнта
3. Запланувати активність "Call" у тікеті
4. Вхідний дзвінок → прийняти → переключити якщо потрібно (Transfer + extension)
5. Вихідний дзвінок через Next Activities → клік на іконку телефону
6. Під час дзвінка: нотатки в чатері, відкриття контакту (іконка avatar), редагування контактних даних
7. Follow-up: іконка годинника → нова Call активність через N днів
8. Іконка тікету в widget → швидкий доступ до Helpdesk тікету
9. Вихід із черги: Keypad → agent disconnection code

**Чатер після дзвінка:** автоматично зберігає запис про дзвінок і запланованих активностях.

---

### Що нового у VoIP (Odoo 19 — Odoo Phone)

**Перейменування:** ODoo VoIP → **ODoo Phone** (новий додаток, нова іконка на Start page).

**Новий UI:**
- Сучасний дизайн під час дзвінка (схожий на iOS/Android)
- Recent calls з картками: смарт-кнопки до пов'язаних записів (Leads, Helpdesk tickets, Subscriptions), кнопки для створення нових записів, кнопки email/SMS
- Список дзвінків (Call Log) з ODoo search bar (фільтри, group by, favorites)
- Calendar/Graph/Pivot view для аналізу дзвінків

**Нові функції:**

| Функція | Деталі |
|---------|--------|
| **Do Not Disturb** | Новий статус: silent (без дзвінка, але popup залишається якщо на вкладці); незалежно від Discuss-статусу |
| **T9 Search** | Пошук контакту по цифрах (D=3, O=6, U=8, G=4 → Douglas) |
| **Call Recording** | Незалежно від провайдера; запис локально в браузері → upload на сервер наприкінці; файл у чатері (webm/mp3); адміністратор налаштовує: всі/нікому/деяким користувачам; force on/off або на розсуд користувача |
| **Transcription** | Через OpenAI API; тільки адміністратором для all/none/деяких; summary і searchable текст у записі дзвінка |
| **Attended Transfer** | Новий тип трансферу: вибрати контакт → "Ask first" → попередньо поговорити з одержувачем → Confirm Transfer (первинний дзвінок на hold) |
| **Новий провайдер** | DWW підтримується з коробки (поряд з Axivox та OnSip) |

**Рівні доступу (Access Rights):**
- Employee: тільки свої дзвінки
- Manager: свої + дзвінки підлеглих (manager встановлюється на employee form)
- VoIP Officer: всі дзвінки
- VoIP Administrator: всі дзвінки + Settings

**AI Sentiment Analysis (Studio):**
- Додати AI-поле типу Selection (сміючий/сумний/нейтральний emoji)
- Prompt: "Based on the phone call transcript, fill this field..."
- Поле transcript → Insert → Save
- Graph view → миттєвий reporting по задоволеності клієнтів

---

## KNOWLEDGE

### Права доступу

**Sidebar Tree категорії:**
- **Private** — чернетки та особисті нотатки
- **Workspace** — статті, доступні всім внутрішнім користувачам
- **Favorites** — обрані статті
- **Shared** — статті з конкретним доступом (з'являється тільки при наявності запрошень)

**Share menu (кнопка Share на статті):**
- **Default access rights:** can edit / can read / no access
- **Visibility:** everyone (стаття видима і шукається всіма) / members (видима тільки запрошеним)

**Сценарії доступу:**

| Default rights | Visibility | Результат |
|----------------|-----------|-----------|
| can read | everyone | Всі бачать у sidebar і можуть читати |
| can read | members | Не видно у sidebar; знайти через `$` у command palette |
| no access | (будь-яке) | Тільки запрошені бачать у Shared категорії |

**Invited users:** можна задати окремі права (наприклад, can edit при default can read) — перевищують default.

**Приєднання до статті:** `$` у command palette → клік на статтю → "Join" → отримує default rights.

**Sharable URL:** Toggle "Share to web" → копіювати URL (потрібен Website app).

---

### Створення статей

**Три способи:**
1. Кнопка "New Article" → автоматично в Private
2. Hover на Private або Workspace → клік на "+" → створення в тій категорії
3. Вибір з preconfigured template

**Переміщення до Workspace:** drag статті з Private до Workspace для доступу колегам.

**Шаблони:**
- Доповнення до шаблону: ellipsis → "Add to templates" → стаття доступна у Shared Templates
- Використання шаблону при створенні нової статті

**Назва статті:** збігається з заголовком H1 (можна клікнути на "Untitled" і синхронізувати).

---

### Редагування контенту

**Cover picture:**
- Ellipsis → Add cover → автоматичний підбір за назвою
- Replace cover → пошук зображення
- Reposition cover — drag для позиціонування

**Title Emoji:** клік на іконку сторінки → emoji picker → синхронізується у sidebar і top bar.

**Slash-команди (`/`):**
- `/card` — card view для структурованих даних (проектів, каталогів)
- `/GPT` — генерація контенту через AI
- Форматування: заголовки, банери, списки, clipboard, calendar

**Card View:**
- New → додати заголовок, опис, cover
- Properties: тип Text, Number, Date, Selection тощо
- "Displayed in cards" — відображення property на картці

**Clipboard:** повторне використання блоків контенту між статтями.

**AI (Magic Wand):**
- Виділити текст → toolbar → Magic Wand → три варіанти покращення
- Кнопки: Formal, Friendly, тощо → вибір стилю

**Інтеграція з іншими додатками:**
- Knowledge іконка у CRM, Sales та інших → intelligent search → вставка кроків/інструкцій в Internal Notes
- Вставка live view (pie chart з Sales) у Knowledge статтю
- Обговорення (chat) прямо в статті → invite external collaborators

---

## EVENTS

### Основи заходів

**Settings (Configuration → Settings → Events):**
- **Schedule and Tracks** — активує управління треками; розблоковує Live Broadcast та Event Gamification
- **Online Ticketing** — продаж квитків онлайн
- **Tickets with Sales** — запис продажів квитків у Sales app
- **Booth Management** — управління стендами виставників
- **Online Exhibitors** — онлайн-спонсори/виставники
- **Barcode** — штрих-коди на квитках для сканування

**Форма події:**
- Назва, дати (start/end), timezone, language (для перекладу комунікацій; мову треба активувати в Settings)
- **Template** — автозаповнює tickets, communications, questions, notes
- Tags, Organizer, Responsible
- Venue (адреса з бази контактів)
- **Limit Registrations** — максимальна кількість учасників
- Event Badges — розмір бейджа (наприклад, A6)

**Tickets tab:**
- Типи квитків (назва, product type, ціна, Sales start/end)
- **Limit per order** (нове в Odoo 19) — обмеження кількості квитків в одному замовленні

**Communications tab:** автоматизовані листи/SMS до учасників (тригер + затримка + шаблон).

**Questions tab:** обов'язкові/необов'язкові питання при реєстрації (Text, Checkbox, Selection).

**Notes tab:** інструкції для команди та для квитків (форматований контент).

**Website preview:** Go to website → unpublished за замовчуванням.

**Recurring Events (нове в Odoo 19):**
- Checkbox "Multiple Slots" → Calendar View → додавання дат по кліку або мультивибором
- Attendees per slot — обмеження на кожен слот
- На сайті: клієнт бачить список доступних слотів і обирає

---

### Шаблони заходів

**Configuration → Event Templates:**

**Налаштування шаблону:**
- Назва шаблону
- Website submenu checkboxes: Community, Talks, Exhibitors, Booths, Track Proposals (можна вибірково вмикати/вимикати)
- Timezone, Tags
- Limit Registrations (опціонально на рівні шаблону)
- Tabs: Tickets, Communications, Booths, Questions, Notes

**Booth categories у шаблоні:**
- Add a line → Create Booth popup → назва + booth category → автозаповнення полів
- Booth categories налаштовуються: Configuration → Booth Categories

**Застосування шаблону:** при створенні події вибрати у полі Template → автоматичне заповнення всіх вкладок.

**Зміни після застосування шаблону:** будь-яке поле можна змінити вручну.

---

### Треки та доповідачі

**Що таке Track:** доповідь, лекція, демо, презентація — все, що відбувається в рамках події.

**Активація:** Settings → Schedule and Tracks (розблоковує вкладку Tracks у меню та в Events).

**Event Tracks page:** kanban по стадіях (Proposal / Confirmed / Announced / Published / Refused / Cancelled).

**Форма треку:**
- Назва, Track date, Location, Duration
- YouTube URL (якщо Live Broadcast увімкнено)
- Always wishlisted — автоматично в Favorites всіх учасників
- Responsible, Event, Tags, Agenda color, Image

**Вкладки:**
- **Speaker** — вибір з контактів або введення вручну; автозаповнення bio
- **Description** — короткий опис для учасників
- **Interactivity** — Magic Button: CTA кнопка під час стріму (title, URL, показувати через N хвилин після початку)

**Quiz (Event Gamification):**
- Кнопка "Go to Quiz" (тільки якщо Gamification увімкнено)
- Питання з відповідями для оцінки знань учасників після треку
- Allow multiple attempts

**Публікація треку:** статус Published → Go to website → зелена кнопка → видимий на сайті.

**Talk Proposals (пропозиції від учасників):**
- На сайті: підменю Talk Proposals → форма (назва, вступ, категорії, дані доповідача)
- В бекенді: потрапляє у стадію Proposal → розгляд та переміщення по стадіях
- Кастомізація форми через Website Editor

---

### Стенди виставників

**Фізичні стенди (Booth Management):**

**Налаштування:** Settings → Booth Management → Save.

**Booth Categories (Configuration → Booth Categories):**
- Цінові рівні (Standard, Premium, VIP тощо)
- Product + ціна автозаповнюються при виборі категорії

**Форма стенду:**
- Назва (наприклад, A7 — для легкої ідентифікації на плані)
- Booth Category
- Renter (вручну або автоматично з онлайн-форми)
- Статус: Available / Unavailable

**Бронювання онлайн (на сайті):**
1. Стенди опубліковані → на сайті події: "Become an Exhibitor"
2. Вибір категорії → вибір конкретного стенду → View Plan (план розміщення) → Book My Booth
3. Заповнення контактних даних → Go to Payment → оплата
4. Після оплати: стенд → Unavailable, контактні дані заповнені

**Включення підменю:** Website Editor → Style → активувати Booths submenu.

**Онлайн виставники (Online Exhibitors):**

**Активація:** Settings → Online Exhibitors → Save.

**Форма спонсора:**
- Partner (автозаповнення з контакту)
- Sponsorship level: Bronze/Silver/Gold
- Sponsor type: Online Exhibitor
- Opening hours (з timezone)
- Show on ticket — показати логотип на квитках учасників
- AI-генерований опис

**Публікація:** Go to website → Toggle Published.

**Сторінка exhibitors на сайті:** підменю Exhibitors → список + кнопка Connect для відвідувачів.

---

### Lead Generation через заходи

**Налаштування:** Configuration → Lead Generation → New.

**Параметри правила:**
- Назва
- **Create:** per attendee (окремий лід на кожного) або per order
- **When:** attendees are created / registered / attended
- **Event Template** або конкретна подія (якщо порожньо — правило для всіх подій)
- **Filters** — наприклад, ticket type = VIP
- **Default Values:** Sales Team, Salesperson, Tags

**Ліди з'являються:** смарт-кнопка Leads на формі події → redirect до CRM.

**Практика:**
- "Per attendee, when created" — лід ще до оплати (максимальне покриття)
- "Per attendee, when attended" — тільки реальні учасники (вища якість)
- Фільтр по ticket type — кваліфіковані ліди (VIP attendees)

**Інтеграція з CRM:** ліди з повними даними реєстрації (email, phone, відповіді на питання).

---

### Відвідуваність та штрих-коди

**Активація:** Settings → Events → Barcode → Save.

**Бейдж учасника:**
- Attendees → вибрати учасника → Send by Email → PDF-файл з барcode
- Учасник друкує або показує на телефоні

**Сканування на вході:**
- Registration Desk (кнопка на формі події)
- Мобільний сканер або USB-сканер (підключений до ноутбуку, ноутбук залогінений в ODoo)
- USB: потрібна сумісність із розкладкою клавіатури → сканувати country barcode

**Manual check-in:**
- Registration Desk → вибрати учасника → підтвердити
- Або список Attendees → кнопка "Mark as attending"

**Статуси учасника:** Confirmed → Attended.

**Фільтри в списку Attendees:** Confirmed / Unconfirmed / Attended.

**Multi-day scan (нове в Odoo 19):**
- При повторному скануванні того ж квитка → попередження з датою першого сканування
- Подробиці (час) в чатері учасника

---

### SEO та публікація

**Workflow:**
1. Подія у стадії Book → перевірити і кастомізувати сторінку
2. Go to website → Edit → кастомізація (текст, банер/обкладинка)
3. Toggle Published → SEO-notification
4. SEO-optimization page:
   - Title (включити ключові слова)
   - Description (залишити порожнім → пошуковик генерує сам)
   - Custom URL (зберегти як є якщо вже налаштовано)
   - Keywords (слова, по яких шукає цільова аудиторія)
   - Preview image (вибирається автоматично з банеру)
5. Save
6. Mobile preview: іконка телефону поруч із Published toggle
7. Перемістити подію до стадії Announced

**Важливо:** після публікації — SEO-notification може зникнути; toggle off → on для повторного виклику.

---

### Комунікація та управління учасниками

**Communications tab — автоматизовані комунікації:**
- Типи тригерів: after each registration, immediately, before event starts (N днів/годин), after event ends
- Канали: Email, SMS, WhatsApp (нове в Odoo 19)
- Стандартні: email reminder за 3 дні та 1 годину (автоматично)

**Налаштування комунікації:**
- Add a line → тип (mail/SMS) → шаблон → interval + unit (days/hours/immediately) → trigger

**Додавання учасника вручну:**
- Attendees → New → Event (автозаповнюється) → Contact → Ticket type → Save
- Автоматично надсилається registration confirmation якщо налаштовано

**Управління списком:**
- Mark as attending: список Attendees → кнопка праворуч → статус → Attended
- Cancel registration: вибрати учасника → Cancel → видаляється з активного списку

**Contact track speakers:** кнопка на формі події → форма email/SMS з попередньо налаштованим фільтром (всі спікери цієї події у непроскасованих треках) → 31 records автоматично.

---

### Вимірювання успіху

**Reporting:**
- **Attendees (Reporting → Attendees):** bar graph, можна перемикати (stacked/line/pie); Measures, Group by, Favorites; клік на подію → деталізована статистика
- **Revenues (Reporting → Revenues):** прибутковість події

**Нове в Odoo 19:** Dashboard в Dashboards app з KPI та графіками по events.

**Post-event Survey:**
1. Surveys app → відкрити або створити survey
2. Share → копіювати URL
3. Events app → форма події → Contact Attendees → Email → subject + body зі survey URL → Send
4. Фільтр одержувачів: автоматично "attended" учасники

**Інтеграція Survey + Marketing Automation:**
- Кампанія: Target = Event Registration, trigger = status is Attended → надіслати survey email

**Скасування події (нове в Odoo 19):**
- Зміна статусу на Cancelled → всі заплановані комунікації автоматично скасовуються → на сайті з'являється "Event Cancelled"

---

### Що нового в Events (Odoo 19)

| Функція | Деталі |
|---------|--------|
| **Multiple Slots** | Recurring events з окремими слотами; attendees per slot; calendar view для управління датами |
| **Limit per order** | Обмеження кількості квитків одного типу в одному замовленні |
| **New ticket UI** | +/− кнопки замість dropdown для вибору кількості |
| **Question Library** | Shared questions між подіями; reusable; статистика відповідей по всіх подіях |
| **Default questions** | Питання, що автоматично додаються до нових подій |
| **WhatsApp reminders** | Нагадування через WhatsApp (поряд з Email та SMS) |
| **Multi-day scan** | Попередження при повторному скануванні квитка; дата першого сканування в реєстраційному столі |
| **Auto-cancel communications** | При скасуванні події — всі заплановані комунікації скасовуються автоматично |
| **Invite button** | Відкриває Email Marketing прямо з форми події для запрошень |
| **Lead generation from attended** | Правило "when attended" → ліди тільки для реальних учасників |
