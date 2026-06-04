# Odoo AI — Knowledge Base (Video Transcripts)

## Огляд AI в Odoo

### Архітектура AI в Odoo
- AI пронизує всі 70+ застосунків Odoo як горизонтальний шар
- Три основних компоненти: **AI Fields** (обчислювані поля), **AI Agents** (агенти з діями), **AI Automations** (автоматизації через Update with AI)
- Потрібні модулі: `AI` (базовий), `AI Fields`, `AI Server Actions` (для Update with AI в automations)
- Для налаштувань потрібен **developer mode**
- **SaaS**: AI включено в підписку, використовується спільний API
- **Odoo.sh / On-premise**: потрібні власні API-ключі OpenAI або Google Gemini

### Підтримувані LLM провайдери
- OpenAI (GPT-4, GPT-5 та ін.)
- Google Gemini (всі моделі)
- Вибір моделі впливає на якість результатів — рекомендується тестувати обидва
- CSV як джерело для RAG — в розробці (найближче майбутнє)
- Open-source LLM наразі не підтримуються

### Ключові метрики ефективності (з відео-матеріалів)
- Підвищення ефективності команди: до 60% (фінансова аналітика), 25-30% (HR, проекти)
- Скорочення часу на скринінг кандидатів: до 75%
- Зменшення часу маршрутизації helpdesk-тікетів: 40%, точність: 3-5x
- Зменшення часу пакування для 3PL: з 2-5 хв до 15 сек на замовлення
- Зменшення затримок обслуговування флоту: до 80%
- Точність категоризації витрат: усуває помилки ручного введення

---

## AI Fields (AI-поля)

### Що таке AI-поле
- Спеціальний тип поля в Studio: тип `AI text` або `multi-line text` з увімкненим AI
- Містить **prompt** з field selectors — AI читає значення вказаних полів і генерує результат
- Поле обчислюється за кнопкою (AI icon) або автоматично через automation
- Результат редагується вручну після генерації

### Налаштування AI-поля в Studio
1. Studio → відкрийте form view → перетягніть AI field
2. Оберіть тип: text / multi-line text
3. Введіть prompt у поле Prompt
4. Використовуйте `/` → **field selector** для вставки динамічних посилань на поля поточного запису (виділяються синім)
5. Збережіть → закрийте Studio → натисніть AI icon для обчислення

**Синтаксис prompt**:
- Статичний текст + динамічні поля: `Write a short product description based on [name]`
- Де `[name]` — field selector замість буквального слова

### Приклади AI-полів

| Застосунок | Поле | Prompt-логіка |
|-----------|------|---------------|
| Продукти (Sales) | Product description | На основі назви продукту генерує опис для e-commerce |
| CRM | Actor satisfaction | Аналізує chatter [message_ids], дає оцінку 1-5 |
| CRM | Preferred genres | На основі тегів контакта визначає жанрові вподобання |
| CRM | Lead sentiment | Аналізує тон chatter-повідомлень, класифікує як positive / neutral / negative |
| Contacts | Credit risk score | Аналізує invoice due dates та amounts due, дає оцінку 1-5 |
| Contacts | Top products | На основі sales order lines визначає топ-продукти клієнта |
| Contacts | Taste profile | Класифікує клієнта (fine wine / champagne / red / white) за purchase history |
| Contacts | Company summary | Пише короткий опис компанії на основі назви та website |
| Timesheets | Description quality | Рейтинг опису: good / needs more context / missing tag / bad |
| Maintenance | Historical risk | Аналізує попередні тікети по тому ж обладнанню, дає рекомендації |
| Fleet | Service assistant | Аналізує пробіг і дату останнього ТО, визначає ризик (low/medium/high) |
| Projects | Considerations for task | Збирає контекст із sales order, chatter, нотаток і summarizes для виконавця |
| Purchasing | Level of quality | Аналізує quality alerts по постачальнику, класифікує: excellent / acceptable / poor / critical |

### Особливості property fields
- AI-поля можна створювати як **property fields** (прив'язані до конкретного запису, не до моделі)
- Такі поля доступні через Edit property

---

## AI Agents (агенти)

### Відмінність від чат-ботів
- **Chatbot**: слідує заздалегідь написаному скрипту, виконує дії за сценарієм
- **AI Agent**: динамічно генерує відповіді на основі інструкцій, джерел та контексту; може виконувати дії в базі даних
- При наявності обох на одному каналі — **пріоритет у AI Agent**

### Компоненти AI Agent

**System Prompt**:
- "Місія" агента: роль, відповідальність, обмеження
- Структура: identity (хто агент) → general behavior (правила) → decision rules (як діяти в різних ситуаціях)
- Поради: будьте точними (`3-рядкове резюме` замість `резюме`), використовуйте роздільники (1/ 2/ 3/), давайте приклади input/output
- Різні моделі (OpenAI vs Gemini) можуть реагувати по-різному на однаковий prompt

**Topics** (теми):
- Набір інструкцій + tools для конкретного типу задач
- Без topics агент може відповідати, але не може виконувати дії в БД
- Вбудовані topics у Odoo:
  - **View Builder** — відкривати views, змінювати параметри пошуку, запускати звіти
  - **Information Retrieval** — відповідати на запити, читаючи поля та views
  - **Create Leads** (якщо встановлено CRM) — створювати leads з розмови

**Tools** (інструменти):
- Конкретні дії, які агент може виконати: відкрити view, знайти записи, створити lead
- Перетворюють агента з "того, хто відповідає" на "того, хто діє"
- Реалізовані як server actions з AI
- Набір доступних tools залежить від встановлених застосунків

**Sources** (джерела для RAG):
- PDF-файли, веб-посилання (URL), документи з Documents app, Knowledge articles
- При додаванні джерела → chunking → embedding (індексація у фоновому режимі)
- Повідомлення "Processing your sources, it might take a few minutes"
- **Restrict to sources**: якщо увімкнено — агент відповідає ЛИШЕ з наданих джерел, не фантазує
- Оптимізація: якщо файл вже проіндексований (є checksump) — повторна індексація не відбувається

**Response Style**:
- **Analytical** — точно, без дипломатії
- **Creative** — людяно, відповідь варіюється
- **Balanced** — поєднання обох (рекомендується для зовнішніх клієнтів)

### RAG архітектура (технічні деталі)

**Індексація (при додаванні джерела)**:
1. Файл/стаття/URL → chunking (розбивка на шматки)
2. Кожен chunk → embedding vector через модель провайдера (OpenAI/Gemini)
3. Векторне сховище в БД Odoo
4. При зміні LLM-провайдера — потрібна повторна індексація (re-embedding)
5. URLs: перевірка robots.txt; якщо crawling заборонено → status "failed" (кнопка Retry)

**Retrieval (при запиті)**:
1. User query → embedding vector (тою ж моделлю)
2. Similarity search по векторному сховищу (active sources цього агента)
3. Top-5 найбільш релевантних chunks
4. Chunks + system prompt + topics instructions → LLM → відповідь з посиланнями на джерела

### Вбудований агент Ask AI
- Завжди доступний у правому верхньому куті будь-якого застосунку Odoo
- Розуміє контекст поточного запису (якщо відкрито конкретний запис — відповідає у цьому контексті)
- Може генерувати графіки за запитом: "Show a bar chart of sales by product"
- Може аналізувати chatter: "Summarize the conversation with this customer"
- Підтримує природну мову: "Which employee is a consultant and speaks Arabic?"

---

## AI Workflows (асистовані процеси)

### AI-асистовані наступні кроки
- AI icon в chatter будь-якого запису → діалог для запиту рекомендацій
- Контекст: AI аналізує всі поля та chatter-повідомлення поточного запису
- Назва картки/тікета вгорі (наприклад, "Office Design Project") автоматично задає контекст без явного зазначення

**Приклади застосування**:
- **CRM**: "Suggest 2-3 next steps for this opportunity" → конкретні дії для просування угоди
- **Maintenance**: "What should I do for this ticket?" → кроки усунення несправності
- **Events**: "Based on the chatter, what should be done to finish planning?" → чеклист дій

**Бізнес-ефект**: ~25% підвищення ефективності, усунення "паралічу прийняття рішень", менше стресу у співробітників

### AI-аналіз з Ask AI по всій базі
- Доступний з будь-якого екрану (кнопка AI у верхній панелі)
- Підтримує складні запити: "Which are the sales per product — show a chart", "Total sales per month and per product"
- Може надіслати результат аналізу як email напряму з вікна AI

---

## AI для підбору персоналу

### Автоматичний скринінг кандидатів
**Ефект**: скорочення часу скринінгу до 75%, якість інтерв'ю +35%, shortlisting у 3x швидше, 6-12 годин заощаджено на рекрутера щотижня

**Налаштування**:
1. Developer mode + встановити модуль `AI fields`
2. Studio → форма заявника → додати поля: country_of_residence (M2O → Country), need_sponsorship (Selection: yes/no)
3. На сторінці вакансії (website) додати ті ж поля через Edit → mapped до полів БД
4. Studio → форма заявника → AI assessment tab → AI assessment field (prompt з інструкцією оцінки)
5. У prompt вказати критерії оцінки, важливі параметри, формат виводу (score 0-100%), field selectors для маппінгу

**Automation**:
- Тригер: On create and edit
- Domain: AI assessment is set
- Action: Update record → Update with AI → field: stage
- Prompt: якщо оцінка висока → stage = "Qualified", інакше → "Rejected"
- Потрібен модуль `AI server actions`

**Результат**: кандидати автоматично переміщуються у "Qualified" або "Rejected" після заповнення форми

---

## AI для Helpdesk та Live Chat

### Автоматична маршрутизація Helpdesk-тікетів
**Ефект**: 40% скорочення handling time, 3-5x краща точність маршрутизації

**Налаштування**:
1. Встановити: AI, Studio, AI server actions
2. Developer mode
3. Studio → Helpdesk Tickets → Automations → New
4. Тригер: On Create
5. Action: Update Record → Update with AI → field: Help desk team
6. Prompt: описати команди (Customer Care / IT Support) + приклади типових фраз клієнтів + field selector для [description]
7. Використовувати **record selector** для вставки конкретних записів команд в prompt

**Як працює**: при створенні тікета (у т.ч. з email) AI читає description і призначає правильну команду незалежно від того, на яку адресу надіслано листа

**Порада**: чим більше прикладів реальних фраз клієнтів у prompt — тим вища точність маршрутизації

### AI Agent у Live Chat
- Налаштовується у застосунку AI → вибрати Live Chat agent
- Відрізняється від chatbot: динамічні відповіді, може бути непередбачуваним
- Topics: Information Retrieval + Create Leads (стандартні)
- Sources: можна додати Knowledge articles, PDF-документи, URL
- Після налаштування: Live Chat → канал → Rules → призначити AI agent
- Якщо на каналі є і chatbot, і AI agent — пріоритет у AI agent

---

## AI для документів та OCR

### AI Document Sorting (автоматичне сортування документів)
- Налаштовується в Documents app → вибрати папку → Gear → AI Auto Sort
- Prompt визначає: як класифікувати документ, куди переміщувати, які теги додавати, коли зупинитися для ручної перевірки
- **Tools** у промпті: add tags, move to folder, link to vehicle, тощо (вибираються в нижній частині налаштувань)
- Виділені синім слова = record selector або field selector (вставляються через `/`)

**Приклад логіки сортування**:
```
1. Якщо документ багатосторінковий → додай тег "to split" → зупинись
2. Якщо це штрафний квиток → перемісти у папку Fleet → зв'яжи з відповідним транспортним засобом
3. Якщо це рахунок-фактура → перемісти у Finance
```

**Workflow**: upload / email-in → auto sort → перевірка тегованих документів людиною → підтвердження або ручне виправлення

### AI Helpdesk + Automation (Document processing)
- Автоматичне призначення виконавця тікета за темою + AI-генерація процедури усунення несправності при переміщенні тікета між стадіями

---

## AI для складу та логістики

### AI Packing Instructions для 3PL
**Задача**: генерація інструкцій з пакування на основі описів продуктів + правил сумісності

**Ефект**: скорочення часу читання правил з 2-5 хв до 15 сек, +15-20 замовлень/зміна/пакувальник, адаптація нових співробітників за 2-3 дні замість 2-3 тижнів

**Налаштування**:
1. Configuration → Operation Types → Pack → завантажити файл з правилами пакування (co-ack rules file)
2. Studio → форма операції → вкладка Additional Info → поле "Packing Instructions" (AI field)
3. Prompt: посилається на файл правил + всі продукти в sales order → класифікує handling class → визначає сумісність → генерує інструкції
4. Output структура: назва продукту, інструкція, сумісність з іншими продуктами

**Workflow**: відкрити операцію Pack → вкладка Additional Info → клацнути AI icon → отримати інструкції

### Виявлення патернів інвентаризаційних коригувань (Detect Inventory Adjustment Patterns)
**Задача**: аналіз stock moves пов'язаних з inventory adjustment location

**Приклади запитів до Ask AI**:
- "Find product with highest quantity change due to inventory adjustments in March"
- "List top 5 products with most quantity change on [date] — include current on-hand and total adjusted quantity"
- "What is total cost from quantity differences in inventory adjustment location in March?"

**Ефект**: миттєве виявлення проблемних продуктів, фінансовий вплив коригувань, замість ручного аналізу звітів

### Stock Inventory Report з конвертацією одиниць виміру
**Задача**: відображення залишків у зручних одиницях (наприклад, в відрах по 10л замість літрів)

**Налаштування**:
1. Settings → Units of Measure → налаштувати кастомні одиниці (наприклад, "bucket of 10L" з reference unit = liter, quantity = 10)
2. Studio → форма продукту → додати поле "target_uom" (M2O → Unit)
3. Studio → Reporting → Locations → додати поля target_uom та on_hand_target
4. Studio → Actions → Update Record → "Convert to target UoM" → Update with AI → поле: on_hand_target
5. Prompt: якщо target unit більше reference unit → ділити, менше → множити. Field selectors: uom, target_uom, qty_on_hand

**Workflow**: Products → Actions → Convert → отримати кількість у потрібних одиницях

---

## AI для фінансів та витрат

### Автоматична категоризація витрат
**Задача**: автоматичне присвоєння категорії витрат (і GL-рахунку) при подачі expense

**Ефект**: усунення ручного визначення GL-кодів, прискорення payroll, зменшення помилок

**Налаштування**:
1. Developer mode
2. Studio → форма Expense → Automations → New
3. Тригер: State is set to "Submitted" (не on create — щоб не запускати до подачі)
4. Domain: state = submitted
5. Action: Update Record → Update with AI → field: category
6. Prompt: список правил keyword→category. Наприклад: "якщо є слово 'road show' → Transportation and Accommodations (transient_acc)"
7. Зберегти

**Workflow**: створити expense з описом → Submit → AI автоматично встановлює категорію

**Важливо**: в prompt включати ключові слова, що реально зустрічаються в описах витрат компанії

### Аналіз аналітичних бюджетів з AI
**Задача**: швидкий аналіз виконання бюджетів без ручного перегляду

**Ефект**: до 60% ефективніша робота accounting team, точність прогнозування +30%

**Як використовувати**:
1. Accounting → Analytic Budget → відкрити бюджет
2. AI icon у верхній частині → вікно чату
3. Промпт: "Provide a brief list of insights regarding the spending from my expense budget 2025"

**AI надає**: підтвердження періоду, статус бюджету, % використання, залишок, топ постачальники, великі транзакції, рекомендовані дії

### Аналіз брухту та переробки (Scrap & Rework Rate)
**Задача**: виявлення продуктів з найбільшим відсотком браку

**Приклади запитів до Ask AI**:
- "Name and list the top 3 products with the highest scrap quantity this year"
- "Calculate average scrap quantity per manufacturing order (total scrap / number of MO done from Jan 1 to today)"
- "What are the most common reasons for scrapping components? Which products are most affected? (bullet points)"

**AI може**: підрахувати середнє (122 одиниці / 6 МО = 20.33), визначити root causes (deformed, rusty), порівняти з реальними даними scrap report

---

## AI для продажів та CRM

### Sentiment Analysis у CRM (Vibe Check)
**Задача**: автоматичний аналіз тону повідомлень клієнтів у chatter leads/opportunities

**Ефект**: скорочення часу на перегляд leads на 70%, конверсія +30%, зниження вартості залучення клієнтів до 50%

**Налаштування**:
1. Встановити `AI fields`
2. Studio → форма opportunity → AI field "Sentiment"
3. Prompt: "Ти — експерт з sentiment analysis. Класифікуй настрій клієнта: Positive / Neutral / Negative / Mixed. Включи пояснення та конкретні цитати. Аналізуй: [message_ids]"

**Workflow**: відкрити opportunity → клацнути AI icon у полі Sentiment → отримати оцінку + обгрунтування

**Застосування**: пріоритизація leads, раннє виявлення ризиків відтоку, призначення відповідних менеджерів (новачок для позитивних лідів, досвідчений для негативних)

### Target Margin Auto Pricing
**Задача**: автоматичне розрахування ціни продажу на основі собівартості та цільової маржі

**Ефект**: до 90% економії часу на ціноутворення, усунення математичних помилок

**Налаштування**:
1. Встановити `AI server actions`, developer mode
2. Studio → форма sales order → Edit List View order lines → додати Decimal field "Target Margin" (widget: percentage)
3. Automations → New:
   - Model: Sales Order Lines
   - Тригер: On Create and Edit
   - When updating: target_margin
   - Action: Update Record → Update with AI → field: unit_price
4. Prompt: "Calculate unit price = cost / (1 - target_margin). Cost: [product.cost], Target margin: [target_margin]"

**Workflow**: Sales → New → вибрати клієнта та продукт → встановити target_margin (наприклад, 20%) → зберегти → unit_price оновлюється автоматично

**Важливо**: LLM не рахує складну математику — він виконує інструкції. Для простих формул (price = cost/(1-margin)) — працює; для складної статистики — краще використовувати computed fields Odoo

### AI-аналіз торгових можливостей (автоматичне таггування)
- Automation rule: при переміщенні opportunity в стадію "Qualified" → Update with AI → поле tags
- Prompt: класифікує компанію (consulting firm, services company тощо) на основі назви та доступних даних
- **Теги потрібно створити заздалегідь** — AI обирає з існуючих, а не створює нові
- Підхід "intelligent tagging" → дозволяє агентам у майбутньому реагувати на конкретні теги

### Витягнення деталей задач із Sales Orders (Extract Task Details)
**Задача**: автоматично збирати контекст для виконавця задачі (зі sales order, chatter, нотаток, умов угоди)

**Ефект**: PM заощаджує 30 хв/день, completion rate проектів +30%

**Налаштування**: 
1. Встановити `AI fields`
2. Studio → форма Task → нова вкладка "Assignee Information" → AI text field "Considerations for task"
3. Prompt: "Summarize critical context for task assignee from: [sales_order fields], [chatter messages], [description], contract terms, site requirements"
4. Field selectors: посилатися на поля sales order, чат, контакти клієнта

---

## AI для виробництва та якості

### Оцінка ризиків обслуговування та оптимізація операцій
**Задача**: швидкий аналіз попередніх maintenance-тікетів для поточного обладнання

**Ефект**: скорочення часу прийняття рішень з 3-7 хв до 30-90 сек на тікет

**Як використовувати**:
- Maintenance app → відкрити тікет → AI icon біля поля "Historical risk and suggested operations"
- AI аналізує всі попередні тікети по тому ж активу (в in-progress та repaired stage)
- Надає: зведення попередніх проблем + рекомендовані кроки усунення

**Приклад**: тікет "paper feed misalignment" → AI знаходить попередні тікети про blurry scans та software crashes того ж сканера → рекомендує перевірити ПЗ, оптику та механізм подачі

### Моніторинг флоту через AI (Fleet Service Alerts)
**Задача**: автоматичне визначення, коли автомобіль потребує ТО на основі пробігу

**Ефект**: скорочення затримок обслуговування на 80%, зниження витрат на ремонт до 30%

**Конфігурація**:
1. Studio → поле "Service Assistant" (AI text field) → toggle AI → AI text widget
2. Prompt: перевіряє лише завершені service logs; розраховує km від останнього ТО; порівнює з порогом 5000 km; класифікує ризик: low / medium / high; дає рекомендацію
3. Input fields: vehicle model (display_name), last_service_odometer, current_odometer, service_date, previous_service
4. **Automation 1** (tag): тригер = "tag is added"; action = Update with AI → tags. Prompt: якщо risk=high → тег "Service Due ASAP"
5. **Automation 2** (stage): тригер = "tag is added"; action = Update with AI → state. Prompt: якщо тег "Service Due ASAP" → stage = "In Service/Repair", якщо risk=low → stage = "Active"

**Workflow**: технік вводить показники одометра → натискає "Run Service Assistant" → AI оновлює ризик → автоматизація додає тег → автоматизація оновлює стадію → автомобіль виводиться з активних

**Архітектурна порада**: розбивайте складні автоматизації на кілька простих — LLM потребує чітке одне завдання. Чейнування автоматизацій (перша ставить тег, друга реагує на тег) — правильний підхід

### Якість постачальників на основі Quality Alerts
**Задача**: AI-оцінка рівня якості постачальника на основі накопичених quality alerts

**Ефект**: зменшення дефектів від постачальників до 40%, скорочення витрат закупівлі до 15%

**Налаштування**:
1. Studio → контакт → нова вкладка "Quality Alerts" → M2M поле (якість-алерти) + Selection поле "Level of Quality"
2. Studio → Actions → "Categorize contacts based on level of quality" → Update with AI → field: level_of_quality
3. Prompt: чотири рівні (excellent / acceptable / poor / critical) з критеріями: кількість алертів, серйозність
4. **Важливо**: у заголовку та описі alert — детально описуйте проблему та вплив на workflow (AI визначає серйозність за текстом)
5. Додати поле level_of_quality у форму RFQ через related field: vendor → level_of_quality

**Workflow**: отримали пошкоджений товар → створити quality alert з детальним описом → зайти на контакт постачальника → Actions → "Categorize contacts" → рівень оновлено → при наступному RFQ — видно рейтинг → порівняти альтернативних постачальників у вкладці Alternatives

### Server Action Code Reviewer
**Задача**: AI-перевірка Python-коду server actions на коректність та ефективність

**Ефект**: попередження помилок до production, економія часу на debugging, впевненість у коді

**Налаштування**:
1. Developer mode
2. Studio → форма Server Action → AI field "Rate My Code"
3. Prompt структура:
   - Роль: "code assistant для бізнес-користувачів з різним рівнем програмування"
   - Перевіряти: чи запуститься код, чи ефективний, чи відповідає наміру (action name як контекст наміру)
   - Контекст Odoo: env, model, time, float_compare, UserError, log functions
   - Різниця standalone vs contextual server actions
   - Field selectors для: назва дії, код, модель

**Типові помилки, які виявляє AI**:
- Неправильна модель для методу (account.move.action_post не можна викликати на моделі contacts)
- Неефективний цикл (loop 1000 разів замість batch)
- Неправильний метод (unlink видаляє замість post)
- Несоответствие між назвою дії та кодом

---

## AI для маркетингу та веб

### Скринінг та скоринг кандидатів через AI поля
(Детально у розділі HR вище)

### Skill-Based Task Assignment
**Задача**: автоматичне призначення задачі правильному виконавцю на основі навичок

**Ефект**: продуктивність +20-30%, 20 годин/місяць заощаджено на співробітника, швидкість виконання проектів +25-30%

**Налаштування**:
1. Developer mode
2. Studio → Projects → Automations → New
3. Тригер: Stage is set to "Assign"
4. Action: Update Record → Update with AI → field: assignees
5. Prompt: список співробітників з їх навичками (record selectors) + інструкція: прочитати display_name задачі → знайти найкращого співробітника за навичками → призначити одного

**Workflow**: перетягнути задачу в стадію "Assign" → AI читає назву задачі → призначає відповідного виконавця

### Website Copy Integration
**Задача**: AI-редагування контенту сайту та блогу

**Ефект**: швидше публікування, єдиний tone of voice, покращення SEO

**Як використовувати**:
1. Переконатися у встановленому website та AI застосунку
2. AI app → Configuration → Default Prompts → "text selector" prompt (для inline редагування)
3. Можна налаштувати prompt під свій brand voice та SEO-вимоги
4. Website → Edit → виділити текст → AI icon → реwrite selected text
5. Або: ввести кастомний prompt прямо в діалозі (не використовувати default)
6. Preview результату → "Use this" → зберегти

**Примітка**: у prompt додайте "do not add additional commentary" — щоб AI не додавав зайвих фраз перед текстом

**Для блогу**: виділити весь текст → свій prompt (наприклад, "Rewrite maintaining brand voice, SEO keywords: [keywords], tone: conversational") → Apply

### Timesheets Description QC
**Задача**: автоматична перевірка якості описів у timesheets

**Ефект**: рівень помилок <2%, заощаджує 30% часу порівняно з ручним аудитом

**Налаштування**:
1. Studio → форма Timesheet → AI field "Description Quality" (додається до list view)
2. Prompt: рейтинг = good / needs more context / missing tag / bad. Критерії: наявність тегів, достатня деталізація, прив'язка до проекту/задачі

**Workflow**: Timesheets → All Timesheets → List view → поле "Description quality" → клацнути AI icon → отримати оцінку

---

## Налаштування AI (RAG, агенти)

### Налаштування власного агента (покрокова інструкція)
1. AI app → Agents → New або вибрати існуючого
2. Налаштувати: назву, модель (OpenAI/Gemini), response style
3. Написати System Prompt (identity + behavior + decision rules)
4. Додати Topics (Information Retrieval, Create Leads або кастомні)
5. Sources tab → Add a source → оберіть тип:
   - Upload file (PDF, TXT)
   - Link (URL — перевіряється robots.txt)
   - From Documents (з Documents app)
   - From Knowledge (Knowledge articles, включаючи дочірні)
6. Дочекатися індексації ("Processing your sources...")
7. Restrict to sources → увімкнути, якщо потрібні суворо підтверджені відповіді

### Підключення агента до Live Chat
1. Live Chat app → знайти канал → ... → Configure Channel
2. Rules tab → відкрити rule → поле "AI Agent" → вибрати агента → Save

### Підключення агента до Website
- Website builder → Edit → додати AI block → вибрати агента
- Можна додати кнопку "Speak to a human" для переходу до live chat оператора

### Поради щодо prompt engineering
- Чіткий опис ролі: "Ти — помічник HR, що відповідає на питання про компанію [назва]"
- Конкретність: "3-рядкове резюме" замість "резюме"
- Розділювачі для довгих prompts: 1/ 2/ 3/ або --- sections ---
- Приклади input/output підвищують якість результатів
- **Trial and error**: один і той самий prompt може давати різні результати на OpenAI vs Gemini
- Не намагайтеся вирішити все одним промптом — розбивайте на компоненти
- Починайте з малого: одне поле чи одна автоматизація → тестуйте → розширюйте

### Безпека та права доступу
- AI поважає record rules: користувач не отримає доступ до даних, до яких у нього немає прав через стандартні права Odoo
- Приклад: якщо у користувача немає доступу до HR модулю → AI не покаже зарплати
- **Restrict to sources** в агентах: агент відповідає ЛИШЕ з наданих джерел — важливо для legal/compliance
- Не додавайте конфіденційні дані (зарплати, особисті дані) до джерел агента, якщо агент доступний широкому колу користувачів
- Наразі немає групових прав доступу до агентів (планується)

### Обмеження поточної версії
- Синхронізація джерел агента та документів у реальному часі не підтримується (треба вручну оновлювати)
- Fine-tuning моделей не підтримується (тільки промпт-інжиніринг)
- Auto-reply безпосередньо в chatter — не підтримується (тільки через Live Chat канал або виклик вручну)
- CSV як RAG-джерело — в розробці

---

## Бізнес-кейси та ROI

### Odoo AI як партнерська можливість
- 95% AI-проектів не показують чіткого ROI — через відсутність зв'язку з бізнес-даними
- **Ключова перевага Odoo**: весь контекст компанії в одній платформі → AI отримує повний контекст → вища цінність
- Клієнти, що впровадили AI через Odoo, повідомляють про 500%+ ROI
- Тренд "consolidation": 50% нових корпоративних витрат на ПЗ до 2028 → застосунки з вбудованим AI
- Нова модель монетизації для партнерів: service fee + monthly recurring revenue за підтримку агентів

### Рекомендовані кейси для першого впровадження
1. **24/7 Live Chat Agent** — FAQ, відповіді з документації, збір leads поза робочими годинами
2. **Helpdesk Ticket Routing** — автоматична маршрутизація за темою (без custom rules)
3. **AI Product Descriptions** — генерація описів для e-commerce з назви продукту
4. **Lead Sentiment Analysis** — пріоритизація CRM pipeline без читання кожного chatter
5. **Expense Categorization** — автоматичне визначення GL-рахунків при подачі expense
6. **Document Sorting** — автоматична класифікація вхідних документів

### ROI розрахунки по галузях (з відео)

| Процес | До AI | Після AI | Економія |
|--------|-------|----------|----------|
| Скринінг резюме | Ручний перегляд, 100+ CV/тиждень | Автоматична оцінка | -75% часу, 6-12 год/тиждень на рекрутера |
| Helpdesk routing | Ручне або за жорсткими правилами | Автоматично за текстом | -40% handling time, 3-5x точність |
| Packing instructions (3PL) | 2-5 хв на замовлення | 15 сек | +15-20 замовлень/зміна/пакувальник |
| Budget analysis | Години ручного перегляду | Секунди | +60% ефективність accounting team |
| Fleet service alerts | Ручна перевірка | Автоматично за пробігом | -80% затримок ТО, -30% витрат на ремонт |
| Expense categorization | Ручне визначення GL | Автоматично при submit | Усунення помилок, прискорення payroll |

### Стратегія впровадження (для консультантів)
1. **Аналіз процесів клієнта** — де найбільше витрачається час на рутинні задачі?
2. **Почніть з одного процесу** — не намагайтесь впровадити AI скрізь одразу
3. **ROI calculation** перед впровадженням: (час_до - час_після) × частота × ставка > вартість_впровадження
4. **Trial and error prompts** — закладайте час на рефайн промптів (до 3-5 ітерацій)
5. **Агентська підтримка після впровадження** — нова послуга: моніторинг якості відповідей агентів, оновлення джерел, рефайн промптів
