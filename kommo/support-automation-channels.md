# Kommo — Автоматизація, канали, інтеграції

## 5. SALESBOT & AUTOMATION

### How to Create a Salesbot
**Source:** https://www.kommo.com/support/crm/how-to-create-a-salesbot/

**Plan availability: Advanced and Enterprise**

**Steps:**
1. Go to the Leads section
2. Click "Automate" (top right corner)
3. Select a pipeline stage
4. Click "Add Trigger"
5. Choose "Salesbot"
6. Select "Create a new bot"
7. Choose a standard template OR create a new bot from scratch
8. Add steps and actions
9. Configure triggers
10. Optionally add tag conditions
11. Set active time schedule
12. Save and activate

---

### Salesbot Step & Action Types
**Source:** https://www.kommo.com/support/crm/salesbot-step-and-action-types/

| Action Type | Description |
|-------------|-------------|
| **Message** | Send a text message to the client's chat |
| **Buttons (Show handler)** | Send message with button options for client to tap; specify message text and button labels |
| **Notes** | Add a note to the lead's card; select entity type; enter note text |
| **Tasks** | Assign a task; set deadline, responsible user, task type, and comments |
| **Conditions** | Filter step; set conditions that chat messages or contact fields must meet before proceeding |
| **Round Robin** | Distribute messages/actions evenly across multiple options (up to 100); sequential distribution |
| **Voice Messages** | Send audio/voice messages via Salesbot |

---

### Salesbot Triggers
**Source:** https://www.kommo.com/support/crm/salesbot-triggers/

**4 Trigger Types:**

1. **Pipeline Triggers**
   - Launch when a new lead is created in a specific stage
   - Launch when a lead is moved to a specific stage
   - Launch after a specified time interval
   - Launch when the responsible user is changed

2. **Scheduled Triggers**
   - Launch at a specific date and time (useful for newsletters or promotions)

3. **Conversational Triggers**
   - Activates based on new messages in specified channels
   - Set a cooldown period to prevent overwhelming customers

4. **Keyword Triggers**
   - Trigger based on specific keywords in a client's message

**Tag conditions:** Restrict triggers to fire only for leads with specific tags

**Time configuration:** Set active hours during which the bot operates (e.g., only when staff is offline)

---

### Round Robin
**Source:** https://www.kommo.com/support/crm/introducing-round-robin-in-salesbot/

- Distributes actions evenly across multiple options
- Add up to **100 different options**
- At least **2 options** required; cannot delete one until a third is added
- Sequence **resets** if you add/edit/delete an action

---

### Salesbot Templates
**Source:** https://www.kommo.com/support/crm/salesbot-templates/

**Available templates:**
- Chat Routing — Auto-assign questions to the right team member
- Offline Hours Handling — Inform clients of business hours
- Keyword-Based Responses — Respond dynamically to specific keywords
- **6 industry-specific templates (free):** Beauty salons, Real estate, Restaurants, Travel agencies, Fitness centers

---

### Digital Pipeline Automation
**Source:** https://www.kommo.com/support/crm/pipeline-triggers/

**Available automation triggers:**
1. **Task Creation** — Auto-create tasks based on rules
2. **Lead Owner Change** — Automatically change the responsible user
3. **Field Editing** — Mass edit fields for selected leads
4. **Salesbot Integration** — Trigger Salesbot on stage/event
5. **Lead Stage Progression** — Auto-progress leads when conditions are met
6. **Website Visit Trigger** — Uses Pixel script; creates a task or moves lead when client visits website

---

### Broadcasting
**Sources:**
- Overview: https://www.kommo.com/support/crm/broadcasting/
- Settings: https://www.kommo.com/support/crm/broadcasting-settings/
- Stats: https://www.kommo.com/support/crm/broadcasting-stats/
- WhatsApp compliance: https://www.kommo.com/support/crm/whatsapp-broadcasts/

**Plan availability: Advanced and Enterprise (or active 14-day trial)**

**How to set up a broadcast:**
1. Go to Broadcasting section
2. Create or select a segment (audience)
3. In advanced settings:
   - Review your audience
   - Select a connected channel
   - Choose or create a message template
   - Set launch time (immediately or scheduled)
4. Optionally configure bot automation for automatic replies
5. Optionally set "Only send to phone numbers with existing chats"
6. Launch or schedule

**Statistics tracked:**
| Metric | Description |
|--------|-------------|
| Sent | Total messages sent to contacts with valid phone/social profile |
| Delivered | Messages that reached recipient's device |
| Read | Messages opened (if channel supports read receipts) |
| Failed | Could not be sent/delivered |
| Replied | Number of recipients who replied (only FIRST reply counts) |

**WhatsApp Broadcasting Limits:**
- Initial limit: **250 conversations/day**
- Raising limit: Send twice your current limit within 7 days to auto-upgrade
- Verified businesses: Can raise from 250 to 1,000 via Meta's official verification
- Only **delivered** messages count toward the threshold
- Duplicate contacts: Kommo automatically removes repeated contacts; if multiple leads share one phone number, message sent only once

---

## 6. MESSAGING CHANNELS

### WhatsApp
**Sources:**
- Connect: https://www.kommo.com/support/messenger-apps/whatsapp-cloud-api-how-to-connect/
- Templates: https://www.kommo.com/support/messenger-apps/whatsapp-cloud-api-message-templates/
- Marketing Messages API: https://www.kommo.com/support/messenger-apps/marketing-messages-api/
- Pricing: https://www.kommo.com/support/messenger-apps/whatsapp-pricing/

**Type:** Native via Meta WhatsApp Cloud API (no extra third-party fees)

**How to connect:**
1. Settings → Integrations → "WhatsApp Business" → "Install"
2. Authenticate with Facebook account
3. Set up WhatsApp Business profile
4. Connect phone number

**Features:** Interactive messages, message templates, Salesbot, broadcasting, Marketing Messages API

**WhatsApp Conversation Pricing (Meta-charged):**
- Free conversations within 24-hour customer service window
- Free conversations from CTA button ads (click to WhatsApp)
- Payment threshold: **$20** (charged when usage reaches $20)
- Template types: Marketing, Utility, Authentication
- Pricing calculator: https://www.kommo.com/whatsapp-pricing-calculator/

**Marketing Messages API:**
- Dedicated feature for large-scale marketing campaigns
- Template validity period: **12 hours to 30 days**
- Used exclusively for marketing messages
- Once enabled, all eligible WhatsApp Business accounts in your Meta account auto-connect
- No extra setup — Kommo handles routing

**Template rules:**
- Must be approved by Meta
- Templates with ONLY placeholders and no additional text will be **rejected**
- Types: Marketing, Utility, Authentication

**Third-party WhatsApp options (via integrations):** Twilio, Wazzup, Zenvia, Gupshup, WhatsApp by WhatCRM/Telphin, E-chat

---

### Instagram
**Sources:**
- Connect: https://www.kommo.com/support/messenger-apps/instagram/
- Overview: https://www.kommo.com/support/messenger-apps/instagram-overview/
- Comment Automation: https://kommo.com/support/kb/instagram-comments-automation

**Prerequisites:**
- Instagram Business account linked to a Facebook Business Page
- Must verify email after adding Facebook account

**How to connect:**
1. Marketplace in Kommo → search "Instagram" → "Install"
2. Choose the Instagram Business account
3. Settings → Integrations → Instagram → Verify email

**Features:** DM messaging, story mentions automation, comment automation, Salesbot, quick reply buttons

---

### Telegram
**Source:** https://www.kommo.com/support/kb/telegram/

**How to connect:**
1. Create a Telegram Bot via BotFather
2. Copy the bot's API token
3. Paste the API token in Kommo settings

**Alternative (via E-chat):**
1. Settings → Integrations → "Viber & Telegram & WA via E-chat" → Install
2. In E-chat cabinet: scan QR code → get API key
3. Enter phone number and API key in Kommo → Save

**Features:** All Telegram messages create leads in Kommo; Salesbot for automatic replies; accept or delete Telegram leads

---

### TikTok
**Source:** https://www.kommo.com/support/messenger-apps/tiktok/

Connect TikTok Business Account to instantly convert messages into leads and automate replies with Salesbot.

**How to connect:** Settings → Integrations → TikTok → Install → authenticate TikTok Business Account

---

### Facebook Messenger
**Source:** https://www.kommo.com/support/kb/facebook-messenger-integration/

**Important:** Only business pages can be connected; personal pages cannot.

**How to connect:**
1. Leads section → "Automate" button → click login icon → Connect Facebook account

---

### Apple Messages for Business
**Source:** https://www.kommo.com/support/messenger-apps/apple-messages-for-business/

**Requirements:** Business Apple ID (use corporate email only) OR corporate-managed Apple ID; accept Apple Messages for Business and Apple Business Register terms

---

### Viber
**Source:** https://www.kommo.com/support/kb/viber/

**Method 1:** Create bot in Viber Partner portal → copy API token → paste in Kommo

**Method 2 (via E-chat):** Settings → "Viber & Telegram & WA via E-chat" → scan QR code → enter phone + API key → Save

---

### Unified Inbox Channels
WhatsApp, Instagram, Telegram, Facebook Messenger, Viber, Skype, WeChat, Apple Messages for Business, Google Business Messages, SMS, Phone/VoIP calls, Email

---

## 7. LEAD GENERATION TOOLS

### Webforms
**Source:** https://www.kommo.com/support/lead-generation/webforms/

**How to create:**
1. Lead section → "Setup" → "Add source" → "Webform"
2. "Edit fields" tab: configure fields and map to lead card
3. "Form setting" tab: set pipeline stage, add tags, configure notifications
4. "Form placement" tab: get embed code or shareable link

**Placement options:** Embed on website (HTML code), share via link

---

### Chat Button (Website)
**Sources:**
- Create/install: https://www.kommo.com/support/lead-generation/website-chat-button-how-to-create-and-install-it/
- Live chat: https://www.kommo.com/support/lead-generation/chat-button-live-chat/
- Customize: https://www.kommo.com/support/lead-generation/website-chat-button-how-to-customize-it/

**Supported channels in chat button:** Apple Messages, Telegram, Instagram, WhatsApp, Facebook Messenger, Live Chat (built-in), WeChat, Viber, Skype

**Installation methods:**
1. Copy code snippet → paste into website HTML
2. WordPress plugin
3. Shopify integration
4. Google Tag Manager template

**Customization:** Animated or static button; position (left/right); visible or faded; mobile/desktop preview

---

### Lead Scraper
**Source:** https://www.kommo.com/support/lead-generation/amocrm-lead-scraper/

Chrome browser extension. Navigate to any website → point and click data → new lead created in Kommo automatically.

---

### Website Visitor Tracking
**Source:** https://www.kommo.com/support/lead-generation/visited-website/

Digital Pipeline trigger "When selected website is visited." Install a Pixel script on website → Pixel registers when tracked lead visits → triggers configured automation.

---

### Email Parsing
**Source:** https://www.kommo.com/support/lead-generation/email-parsing/

Automatically extracts and organizes information from incoming emails and creates leads in Kommo.

---

### Facebook Lead Ads
**Source:** https://www.kommo.com/support/lead-generation/facebook-form/

Automatically imports leads from Facebook Lead Ads forms directly into your Kommo pipeline.

---

### LinkedIn Lead Gen Forms
**Source:** https://www.kommo.com/support/lead-generation/linkedin-lead-gen/

**How to set up:**
1. Integrations → search "LinkedIn" → Install
2. Click "Sign in to LinkedIn" and authorize
3. Choose tools: "Lead Gen forms" and/or "Lead Parser"
4. Map LinkedIn form fields to Kommo lead card fields

**Limitations:**
- Messaging LinkedIn leads from Kommo is **not available** — must return to LinkedIn for DMs
- Changes to LinkedIn forms require re-mapping in Kommo
- Included in all plans at no additional cost

---

## 8. INTEGRATIONS CATALOG

| Integration | Setup URL | Category | Notes |
|-------------|-----------|----------|-------|
| WhatsApp Business (Cloud API) | kommo.com/support/messenger-apps/whatsapp-cloud-api-how-to-connect/ | Messaging | Native Meta Cloud API |
| Telegram | kommo.com/support/kb/telegram/ | Messaging | Via bot token |
| Instagram | kommo.com/support/messenger-apps/instagram/ | Messaging | Requires Business Account + FB Page |
| Facebook Messenger | kommo.com/support/kb/facebook-messenger-integration/ | Messaging | Business pages only |
| TikTok | kommo.com/support/messenger-apps/tiktok/ | Messaging | Business Account |
| Apple Messages for Business | kommo.com/support/messenger-apps/apple-messages-for-business/ | Messaging | Corporate Apple ID required |
| Viber | kommo.com/support/kb/viber/ | Messaging | Bot API or E-chat |
| WeChat | kommo.com/integrations/ | Messaging | — |
| E-chat (Viber+Telegram+WA) | kommo.com/integrations/e-chat/ | Messaging | Multi-channel via E-chat |
| Shopify | kommo.com/support/integrations/shopify-how-to-connect-with-kommo/ | E-commerce | Syncs products, orders, contacts |
| WooCommerce | kommo.com/integrations/ | E-commerce | Order and customer sync |
| Mercado Libre | kommo.com/integrations/ | E-commerce | — |
| Lazada | kommo.com/integrations/ | E-commerce | — |
| Bling | kommo.com/integrations/ | E-commerce | Import products, manage orders |
| Zapier | kommo.com/support/integrations/zapier/ | Automation | Connects 8,000+ apps |
| Make (Integromat) | kommo.com/integrations/ | Automation | — |
| Pluga | kommo.com/integrations/ | Automation | — |
| Google Sheets | kommo.com/support/integrations/google-sheets/ | Productivity | Auto-create leads from sheet entries |
| Google Calendar | kommo.com/support/integrations/google-calendar-usage/ | Productivity | Two-way sync |
| Gmail | kommo.com/integrations/gmail/ | Email | — |
| Mailchimp | kommo.com/support/integrations/mailchimp/ | Email Marketing | — |
| Stripe | kommo.com/support/integrations/stripe/ | Payments | — |
| PayPal | kommo.com/integrations/paypal/ | Payments | — |
| Mercado Pago | kommo.com/integrations/ | Payments | — |
| Ebury | kommo.com/integrations/ | Payments | Card payments for Kommo billing |
| Calendly | kommo.com/support/integrations/calendly/ | Scheduling | Auto-creates lead + task on booking |
| Zoom | kommo.com/integrations/ | Video | — |
| Twilio | kommo.com/integrations/ | VoIP/SMS | Alternative WhatsApp |
| RingCentral | kommo.com/integrations/ | VoIP | — |
| GoTo Connect | kommo.com/support/integrations/goto-connect/ | VoIP | — |
| Nvoip | kommo.com/integrations/nvoip/ | VoIP | — |
| Voximplant Kit | kommo.com/integrations/ | VoIP | — |
| Facebook Lead Ads | kommo.com/support/lead-generation/facebook-form/ | Lead Gen | — |
| LinkedIn Lead Gen | kommo.com/support/lead-generation/linkedin-lead-gen/ | Lead Gen | — |
| TikTok Ads Manager | kommo.com/integrations/tiktok-ads-manager/ | Ads | — |
| TikTok Instant Messaging Ads | kommo.com/support/integrations/tiktok-instant-messaging/ | Ads | — |
| Typeform | kommo.com/integrations/ | Forms | — |
| Zillow | kommo.com/integrations/ | Real Estate | Import property leads |
| Dropbox | kommo.com/integrations/ | Storage | — |
| Looker Studio | kommo.com/integrations/lookerstudio/ | Analytics | Via Zapier |
| Wazzup | kommo.com/integrations/ | WhatsApp (3rd party) | — |
| Zenvia | kommo.com/integrations/ | WhatsApp (3rd party) | — |
| Gupshup | kommo.com/integrations/ | WhatsApp (3rd party) | — |
| WhatCRM | kommo.com/integrations/whatsapp/ | WhatsApp (3rd party) | — |

**Shopify integration details:**
1. Settings → Integrations → "Shopify" → Install
2. Authorize connection
3. Kommo creates a dedicated pipeline named after your Shopify store
4. Products, orders, contacts, and transactions sync automatically
5. **Note:** Synced data is read-only — updates must be made in Shopify then resynced
6. Shopify AI Agent available: handles real-time customer inquiries using your store data

---


---

## Salesbot — Повна документація (YouTube)

> Джерело: `kommo/source-files/How_to_build_a_chatbot*`, `The_Power_of_Salesbot_*`, `Boost_conversions_*`, `How_to_set_chatbot_*`, `How_to_use_a_document_generator_bot_*`

### Де створити Salesbot
1. **Leads → Automate** (з Digital Pipeline)
2. **Settings → Communication Tools → Create a new bot**
3. **З Inbox** (з листування)

### Типи тригерів Salesbot

#### Pipeline-тригери
- Коли новий лід створено
- Коли лід переміщено до наступного етапу
- Коли лід переміщено АБО створено на певному етапі
- Коли змінився відповідальний користувач

#### Scheduled-тригери
- Один раз на тиждень у конкретний день і час
- Один раз на місяць / на рік

#### Behavior-based тригери
- Коли лід подав веб-форму
- Коли лід надіслав email
- Коли лід зателефонував

#### Conversational тригери
- Коли розмова почалась (incoming message)
- Коли лід пише вперше за день у будь-якому каналі
- Коли вхідне повідомлення отримано
- Коли вихідне повідомлення прочитано (Read Receipts)
- Коли розмова закрита (через N хвилин/годин)

#### Фільтр "For all leads with"
Tags, pipeline stage, бюджет (range), відповідальний користувач, джерело ліда / UTM

#### "Active hours"
Бот активний лише у визначений проміжок. Приклад: offline-бот активний з 17:00 до 09:00.

### Блоки (кроки) у конструкторі

| Тип блоку | Що робить |
|---|---|
| Message | Текст, файл, кнопки-відповіді з синонімами |
| Condition | Гілкування if/else |
| Pause | Зупинка на час або до події |
| Action | Зміна відповідального, статусу, поля |
| Task | Створення задачі для менеджера |
| Validation | Перевірка телефону, email, числа |
| Generate form/document | Генерація форми або документа через widget |
| Widget (Custom) | Виклик стороннього коду або інтеграції |
| Stop bot | Завершення сценарію |
| Internal message | Повідомлення команді всередині CRM |
| Start another bot | Запуск іншого salesbot |
| Change responsible user | Зміна відповідального |
| Change lead stage | Переміщення ліда на інший етап |

### Умови (Conditions) — типи

**if-поле:** Client message, Chat code, Active chat messenger, Lead source, Conversation status, Answer status, Interaction status, Lead contact, Company, Talk NPS fields

**Оператори:** equals, does not equal, contains

**Значення:** Random string, Bot parameters, Manual input, Lead/Contact/Company fields, Current talk ID, Kommo username/phone/time

### Аналітика Salesbot

**Загальні метрики (список ботів):**
- Conversion rate — % лідів, що виконали цільову дію
- Total launches — загальна кількість запусків
- Active sessions — поточні незакриті розмови

**На рівні кожного кроку:**
- Launches — скільки разів крок запущено
- Conversion rate — % конверсії кроку

**Для блоку Message:** Sent / Read / Clicked

**Для блоку Pause:** Off timer resume — кількість відновлень до закінчення таймера

### Готові шаблони Salesbot

| Шаблон | Призначення |
|---|---|
| Respond to incoming messages | Автовідповідач на вхідні |
| Auto-close conversations 5 days | Автозакриття через 120 годин після останнього повідомлення |
| Generate new conversations from comments | DM у відповідь на коментар Instagram/Facebook |
| Assign conversation based on client's answer | Chat routing — маршрутизація до менеджера |
| Set up actions based on words | Keyword triggers |
| Measure how satisfied clients are (emojis) | CSAT бот |
| Follow up when client stops responding 3 days | Автоматичний follow-up |
| Let customers know when you'll be back online | Offline chatbot |
| Add opt-out tag when clients want to unsubscribe | Обробка відписки |
| Get alert when client reads your message | Read Receipts сповіщення |
| NPS bot | Net Promoter Score (Advanced та Enterprise тільки) |

### Power of Salesbot — конкретні use cases

**Auto-close chats (120 годин):** тригер після останнього повідомлення. Приклад: Instagram-кампанія з сотнями нових чатів → автоматичне закриття без ручної роботи. Налаштування: вибрати шаблон → Save → задати канал і час → Done (менше хвилини).

**Auto-comment reply:** тригер "conversation starts" + джерело "Facebook comments/Instagram" → автоматичний DM з промо-кодом після коментаря під постом.

**Chat routing:** питання → відповідь ліда → призначення менеджера (Product expert / Billing / Technical support). Налаштування до 5 хвилин.

**Keyword Triggers:** `if client message contains "delivered"` — рекомендується додавати 4 варіанти написання (регістр, пробіл) для надійного спрацювання. Активується через DM і через коментар.

**CSAT:** тригер "1 хвилина після закриття розмови" → emoji-кнопки → тег у картці ліда → при негативній відповіді internal message менеджеру.

**NPS bot:** лише Advanced та Enterprise; при відсутності відповіді 24 год — розмова закривається автоматично; дашборд: середній NPS, promoters/passives/detractors.

**Offline chatbot:** активний 17:00–09:00; тригер "when a lead starts chatting for the first time that day"; toggle "leave messages unread" — залишає непрочитаним для наступного робочого дня.

**Opt-out:** keyword → тег opt-out. Законодавча вимога в більшості країн.

**Read Receipts:** тригер "when an outgoing message is seen" → internal message менеджеру.

### Document Generator Bot

- Потребує: шаблон у Google Docs (з унікальними placeholders), кастомні поля, підключений Google Drive
- Формати: PDF (незмінний) або Google Docs (редагується після генерації)
- Запуск: у чаті ввести `/` → вибрати salesbot зі списку
- Посилання на документ зберігається у кастомному полі картки ліда
- **Обмеження:** плейсхолдери мають бути унікальними; після збереження шаблон не можна редагувати (починати заново)
- Видалити: будь-який користувач; редагувати: тільки автор
- Приклади: інвойси, контракти, офертні листи, страхові заявки, реєстрації

### Обмеження Salesbot

- CSAT і NPS не можна використовувати одночасно
- NPS — лише Advanced та Enterprise
- Document generator потребує Google Drive та шаблону в Google Docs

---

## Digital Pipeline — Повна документація (YouTube)

> Джерело: `kommo/source-files/How_to_automate_your_sales_process_*`, `Trigger_*`

### Структура воронки

- **Incoming leads** — обов'язковий, не видаляється
- **Closed won** — обов'язковий, не видаляється
- **Closed lost** — обов'язковий; причини відмови: No answer, Expensive, No longer interested, Decision postponed
- Всі інші — кастомні (drag-and-drop, кольори, rename, delete)
- Можна створювати кілька паралельних воронок

### Тригер: Add Task

Параметри: умова (source, tag тощо), час виконання (when moved to / created on stage), відповідальний, дедлайн (напр. "end of today"), тип задачі (Follow-up / Meeting / Email / Call / Custom), текст задачі.

Трюк: тригер можна копіювати (іконка copy) та вставити на інший етап.

Приклад: Stage "Invoice sent" → задача бухгалтеру (Кевін): надіслати інвойс + підтвердити оплату, дедлайн: end of today.

### Тригер: Change Field

Заповнює або перезаписує кастомне поле ліда при виконанні умови. Якщо поле порожнє — заповнює; якщо є дані — перезаписує.

Приклад: Лід → "Closed one" → поле "Discount" = "20%".

### Тригер: Change Lead's User

Передає лід іншому менеджеру при умові. Checkbox: "Change responsible user for linked contacts, companies and other data".

Приклад 3-ступеневий: Initial contact → Аманда → Offer sent (when email received) → Серхіо → Closed one → Тетяна (customer service).

### Тригер: Change Lead Stage

Переміщує лід між етапами або між воронками.

Execute options: When moved to this stage / When an email is received / When the responsible user is changed / N minutes/hours after conversation is closed.

Приклад: "5 minutes after conversation is closed" → переміщення до "Closed one".

### Тригер: Send Email

Надсилає email від імені менеджера при умові. Потребує підключеного email і шаблону (Mail → Settings → Templates).

Приклад: Stage "Invoice paid" → автоматичний email "Your invoice has been successfully paid".

### Тригер: Generate Form

Два типи:
- **Individual form** — лід заповнює → дані оновлюються в існуючій картці
- **Referral form** — лід заповнює → створюється новий лід і контакт з inviter_id

Конструктор форми: шаблони, CSS-кастомізація, drag-and-drop полів, redirect після submit (URL + таймер), Submit button (кастомний колір).

Приклад (піцерія): Stage "Delivered today" → тригер "after 1 day" → форма зворотного зв'язку → посилання зберігається в картці → менеджер відправляє в WhatsApp.

### Умови тригерів

Будь-який тригер обмежується умовами: Tags, Responsible user, Lead source (WhatsApp, Instagram, Facebook тощо), UTM-параметри.

---

## Інтеграції — детально (YouTube)

> Джерело: `kommo/source-files/Calendly_*`, `Make_your_sales_*`, `How_to_use_Telegram_*`, `Email_Parsing_*`, `Email_as_a_lead_source_*`, `Webforms_*`, `Engagement_page*`, `Setting_up_a_Website_Chat_Button*`, `Everything_you_need_to_know_about_Kommo_Lead_Scrapper*`, `Tracking_Pixel*`, `What_is_Lead_Scoring*`

### Calendly

- Нові бронювання → автоматично в **Incoming Leads** як новий лід
- Якщо клієнт вже є в CRM → задача "Meeting" в картці ліда
- Синхронізація з Google Calendar; поєднання з Zoom (автогенерація лінку)
- Налаштування: Calendly Dashboard → Integrations → API key → у Kommo: Settings → Integrations → Calendly → вставити API key → вибрати тип задачі
- **Безкоштовно на всіх тарифах**

### Zoom

- Кнопка "Create a meeting" у картці ліда → Zoom-лінк зберігається в полі картки
- Запис конференції автоматично зберігається в картці після завершення
- Відправка через шаблон з маркером `{zoom_link}` у будь-якому каналі
- **Обмеження:** один акаунт Zoom = один адміністратор Kommo; тільки той, хто створив конференцію, може її ініціювати
- **Безкоштовно**

### Telegram

- Вхідні → Incoming Leads; повна історія чату з файлами, картинками, стікерами
- Bulk messaging: фільтр → вибрати всіх → масова відправка
- Підтримка Salesbot (сценарії, кнопки, розклад)
- **Обмеження:** лише chatbot (не особиста сторінка); лише direct messages (не групові); один Telegram-бот на один pipeline
- Налаштування: @BotFather → `/start` → API key → Kommo: Leads → Setup → Lead Sources → Telegram → вставити API key

### Email Parsing

- Вбудована функція; парсить структуровані листи → ліди з заповненими полями
- Типові джерела: Bark, Houzz, HomeAdvisor, власні форми
- Налаштування (4 кроки): (1) Підготувати кастомні поля → (2) Leads → Setup → Email Parsing → вибрати провайдер → (3) Налаштувати forwarding у Gmail → (4) Вибрати шаблон листа, виділити частини тексту, прив'язати до полів

| Тип inbox | Хто бачить | Автоматизація |
|---|---|---|
| Personal inbox | Тільки власник (опціонально адмін) | Недоступна |
| Shared inbox | Всі користувачі | Доступна |

Рекомендація: для автоматизації — `contact@company.com`, не іменні адреси.

### Webforms (Веб-форми)

- **Безкоштовно на всіх тарифах**
- Leads → Setup → Add Source → amoCRM Web Form
- Edit Fields: колір, тема, шрифт, фон, поля (Leads/Contacts/Companies/Additional), drag-and-drop
- Form Settings: назва, теги, stage pipeline, повідомлення після відправки, redirect + затримка
- Google Analytics: при переміщенні ліда в "Closed Won" → подія в GA; підтримуються цілі `amocrm_form` і `amocrm_payment`
- UTM-теги → нередаговані поля в картці ліда + дані в GA
- Розміщення: HTML-код, WordPress shortcode, кнопка з pop-up, окрема сторінка (для Instagram bio, WhatsApp)

### Engagement Page

- Міні-лендінг без сайту: логотип, опис, кнопки месенджерів, текстові блоки, зображення, веб-форма
- Канал повинен бути вже підключений як lead source у тому ж pipeline
- Tracking: IP, місто, країна, кількість кліків у статистиці картки ліда
- Key Actions: умови (час, scroll %, відвідані сторінки, webhook) → реакції (popup форми, задача, тег, поле, відповідальний, webhook). Частота: кожен візит / раз на сесію / раз на день / раз на ліда
- Генерується URL + QR-код

### Website Chat Button

Підтримувані канали: WhatsApp, Instagram, Facebook Messenger, Telegram, Apple Messages, WeChat, Viber, Skype, Live Chat

| Метод встановлення | Деталі |
|---|---|
| HTML/JS | Вставити у код сайту (trusted URL в https) |
| Google Tag Manager | Авторизація Google → Publish — без розробника |
| WordPress plugin | Kommo в WordPress Marketplace |
| Wix plugin | Аналогічно |
| Shopify | Kommo → Add to Shopify store |

Зовнішній вигляд: анімація (static/waves/tremble/shake), позиція, розмір, колір, welcome popup.

Key Actions: умови (час, scroll %) → реакції (анімація, popup, задача, webhook, тег/поле).

Salesbot через кнопку: потрібен увімкнений popup messages у General Settings. До 50 pipeline.

### Lead Scraper (Chrome Extension)

- Парсить контактні дані з будь-якого сайту (насамперед LinkedIn) → ліди в Kommo
- Встановлення: Chrome Web Store → "Lead Scraper" або Settings → Integrations
- Налаштування вручну: клік на секції сторінки → прив'язати до полів; або Presets (готові шаблони маппінгу)
- Офіційні пресети від amoCRM: для LinkedIn-профілів; завантажити на сайті amoCRM → Google Drive (2 файли)
- Record tool: для даних у pop-up вікнах — позначити точки кліків
- Застосування: рекрутинг, B2B-проспектинг, пошук спікерів

### Tracking Pixel

- Метод дублікат-контролю на основі cookie
- При першому контакті відвідувачу присвоюється унікальний tracking code
- Якщо той самий відвідувач пише через інший канал → автоматичне об'єднання в одну картку
- **Обмеження:** не працює з лідами через веб-форму; лише через CRM Plugin та Engagement Page
- Активація: Settings → Duplicate Control → увімкнути Tracking Pixel

### Lead Scoring

- **Тільки Enterprise план**
- Числовий score = ймовірність угоди; розраховується динамічно
- Налаштування: Leads → Setup → Scoring → Setup → визначити шкалу (0–100) → призначити значення кожній стадії → додати кастомні поля → задати формулу (напр. `A + B`)
- Коли потрібно: довгий цикл продажу, великий потік лідів, висококваліфіковані спеціалісти

---

## WhatsApp — Детальна документація (YouTube)

### WhatsApp Business App vs API — порівняння

| Параметр | WhatsApp Business App | WhatsApp Business API (WABA) |
|---|---|---|
| Цільова аудиторія | Соло-підприємці, малий бізнес | Середній та великий бізнес |
| Вартість | Безкоштовна | Платна (Meta + BSP) |
| Пристрої | 1 телефон + 4 додаткові (5 всього) | Необмежено |
| Номери | 1 | До 20 після верифікації |
| Масові розсилки | До 256 контактів | До 10 000+ (необмежено) |
| Чат-боти | Не підтримуються | Підтримуються |
| Інтерфейс | Мобільний застосунок | Відсутній — потрібен BSP або розробник |
| Мультиагент | WhatsApp Premium до 10 пристроїв | Необмежена кількість агентів |

**WhatsApp Premium** (платна підписка до Business App):
- Мультиагентна підтримка до 10 пристроїв
- Кастомне посилання WhatsApp (змінюється кожні 90 днів)
- Веб-сторінка WhatsApp

**3 хостингові варіанти WhatsApp Business API:**
1. **Cloud API** — на серверах Meta, оновлення автоматично
2. **On-Premise** — власне серверне обладнання, для великих підприємств зі строгими вимогами
3. **Business Management API** — на серверах BSP, лише керування налаштуваннями WABA, шаблонами, номерами

---

### WhatsApp Business API — ціни та категорії розмов

**Модель оплати:** за 24-годинну розмову (conversation), не за окреме повідомлення.

**4 категорії розмов:**

| Категорія | Ініціатор | Шаблон | Типовий сценарій |
|---|---|---|---|
| **Marketing** | Бізнес | Обов'язковий | Акції, оффери, промо-розсилки |
| **Utility** | Бізнес | Обов'язковий | Post-purchase нотифікації, нагадування про оплату |
| **Authentication** | Бізнес | Обов'язковий | OTP-коди, реєстрація |
| **Service** | Користувач | Не потрібний (free-form) | Відповіді на запити клієнта |

**Вартість (бізнес-ініційовані розмови):** від $0.005 до $0.15 за розмову.

**Безкоштовні розмови:**
- **1 000 сервісних (user-initiated) розмов на місяць** — безкоштовно на кожен WABA-акаунт
- Розмови через **Click-to-WhatsApp ads** або **CTA-кнопку на Facebook-сторінці** — **безкоштовні протягом 72 годин**

**Важливе правило вікна:**
- Якщо бізнес не відповів протягом 24 годин → потрібен pre-approved шаблон (платно)
- Якщо під час сесії надіслати шаблон іншої категорії → відкривається **нова платна розмова**

**BSP-fees (поверх Meta-тарифів):**
- Markup per message
- Markup per conversation
- Monthly flat fee

**Kommo як BSP:** додає **$0.002** за кожне надіслане або отримане повідомлення. Надає **$1** для тестування новим клієнтам.

---

### WABA-акаунти — типи та ліміти

**2 типи акаунтів:**

1. **Regular WhatsApp Business Account** (unverified/verified)
   - Unverified: лише номер телефону, обмеження до **250 розмов** за 24 год, лише до **2 зареєстрованих номерів**
   - Verified: показує назву бізнесу, до **20 номерів** на Facebook Business Manager

2. **Official WhatsApp Business Account** — зелена галочка (green check mark); лише для великих відомих брендів

**Messaging limits зростають:** 1 000 → 10 000 → 100 000 → unlimited (залежно від якості номера та частоти ініційованих розмов).

**Phone number quality states:**
- **High / Medium / Low** — залежить від блокувань та скарг за останні 7 днів
- **Connected** — стандартний активний стан
- **Flagged** — якість впала; якщо не покращиться за 7 днів → downgrade ліміту
- **Restricted** — надсилання заблоковано

**Максимум шаблонів:** **250** message templates на кожен WABA.

**Статуси шаблонів:** pending → approved / rejected → flagged → paused (3 або 6 годин) → disabled.

**Що потрібно для запуску WABA через Kommo:**
1. Офіційний вебсайт бізнесу
2. Бізнес-email
3. Новий номер телефону (не прив'язаний до WhatsApp)
4. Facebook Business Manager акаунт
5. WhatsApp Business Account

---

### WhatsApp Link — формати та застосування

**Формати:**
- Без pre-filled: `https://wa.me/[номер]`
- З pre-filled: `https://wa.me/[номер]?text=[encoded_message]`

**Де розміщувати:**

| Платформа | Способи |
|---|---|
| YouTube | Опис каналу, розділ Links, опис відео |
| LinkedIn | Публікація, розділ About, Featured section |
| Instagram | Bio, CTA-кнопка, Stories |
| Facebook | CTA-кнопка на сторінці, Boost post |
| Email signature | Gmail, Outlook, Yahoo — гіперпосилання |
| Вебсайт | Текстове посилання, chat widget, QR-код |

**Типові помилки:**
- Номер з `007` або `+380` замість чистого коду
- Надсилання URL у Instagram Direct більше 5 разів на день → блокування профілю

---

### WhatsApp Ads (Click-to-WhatsApp)

**Click-to-WhatsApp ads** — рекламні оголошення на Facebook або Instagram з CTA-кнопкою "Send WhatsApp message".

**Доступні цілі кампанії:** Traffic, Engagement, Sales (потребує Meta Pixel). ⛔ Не можна: Lead Generation або App Installs.

**Безкоштовне вікно з реклами:** 72 години після кліку на Click-to-WhatsApp ad.

**Відстеження джерела лідів з WhatsApp Ads у Kommo:**
1. Для кожної кампанії — унікальне pre-filled повідомлення у WhatsApp link
2. Salesbot з умовою `if client message equals [pre-filled message]` → тегування ліда
3. Результат: теги в pipeline Kommo + порівняння ROI різних кампаній

**Click-to-Message Ads:**
- Перенаправляють до WhatsApp, Instagram Direct або Facebook Messenger
- До **3 автоматичних повідомлень** після кліку
- Якщо у аудиторії немає потрібного застосунку → Meta автоматично перенаправляє на інший

---

### WhatsApp QR-коди

**3 способи генерації:**
1. Kommo QR Code Generator
2. WhatsApp (особистий): Settings → QR-іконка
3. WhatsApp Business App: Settings → Business Tools → Short Link → QR Code

**Галузеві сценарії:**
- Retail: на чеках, упаковці, вітринах → замовлення, loyalty-картки
- Ресторани: QR на столиках → замовлення, відстеження
- Hospitality: QR у лобі, номерах → онлайн check-in, бронювання

**Як QR-код потрапляє до Kommo:**
- Клієнт сканує → pre-filled message → у pipeline Kommo автоматично створюється lead card з ім'ям, номером телефону, фото профілю

---

## Instagram — Детальна документація (YouTube)

### Типи реклами Instagram

**9 типів рекламних оголошень:**
1. Click-to-Website ad — CTA → сайт
2. App Install ad — кнопка "Install Now"
3. Click-to-Message ad — кнопка → WhatsApp / Facebook Messenger / Instagram Direct
4. Instagram Lead Generation ad — форма всередині Instagram
5. Collection ad — основне зображення + 3 допоміжних у сітці (для e-commerce)
6. Partnership ad — спільна реклама з інфлюенсерами
7. Multi-Advertiser ad — поруч із схожими брендами
8. Reminder ad — промо майбутніх подій
9. AR ad — augmented reality

**Цілі кампаній:** Awareness, Traffic, Engagement, App Installs, Lead generation, Sales.

**Мінімальний бюджет:** від $5 на день для тестування.

**Best practices:**
- UGC → на 35% кращий запам'ятовуваність, на 20% більший вплив
- Відповідь протягом 5 хвилин → конверсії зростають на 50%+

---

### Click-to-Instagram Direct Ads

**6 плейсментів:** Instagram Feed, Instagram Explore, Instagram Explore Home, Instagram Story, Instagram Reels, Instream Instagram Reels.

**Покроково через Ads Manager:**
1. Objective: **Engagement** → Ad Set: Conversion location → **Messaging Apps**; Destination → **Instagram**
2. Custom Audience з engagement за 365 днів: Create New → Custom Audience → Instagram account → "Everyone who engaged" → 365 days retention
3. Personalized message template: greeting + до **5 питань** з автоматичними відповідями

**Інтеграція з Kommo Salesbot:**
- Keyword routing: `buy` → sales; `support` → customer support
- Quick-reply driven surveys для кваліфікації лідів
- NPS-опитування через emoji після закриття угоди

---

### Facebook Lead Ads Form

**Два типи Instant Form:**
- **More Volume** — швидка форма для мобільних (менше кроків)
- **Higher Intent** — додатковий крок підтвердження перед відправкою

**Обмеження форми:**
- До **15 питань**
- Реклама недоступна для аудиторії **молодше 18 років**
- Після публікації Instant Form **не можна редагувати**

**Підключення до Kommo:**
1. Lead Sources → Add Source → Facebook Lead Ads Form
2. Вибрати Business Page та конкретну форму
3. Зіставити поля форми з полями Kommo
4. Вибрати pipeline stage + теги → Save

---

### Facebook 24-hour Rule (вікно 24 год)

**Правило:** бізнес має лише **24 години** для відповіді на повідомлення клієнта у Facebook Messenger та Instagram Direct.

**Рішення в Kommo — готовий шаблон бота:**
Бот надсилає сповіщення sales-команді через **23 години** після останнього повідомлення клієнта.

Налаштування:
1. Settings → Communication Tools → Create a new bot
2. Шаблон: "Get notified when it will be 24 hours since a client replied"
3. Умова: `if answer status equals unanswered`
4. Тригер: `23 hours after last message received`
5. Канал: конкретний або "Any" → Save

**Instagram Human Agent Tag:**
- Продовжує вікно до **7 днів** (від 1 до 7 днів після першого контакту)
- Застосовується автоматично до lead cards між 1-7 днями після першого контакту
- Для запитів >7 днів — необхідно використовувати інший канал

---

### Instagram CRM — ключові факти

**Три типи inbox-рішень:**

| Тип | Для кого | Ключові можливості |
|---|---|---|
| Instagram App inbox | Мікробізнес | Низький обсяг, до 4 автоматичних відповідей, Quick replies |
| Meta Business Suite inbox | Малий бізнес | Автоматизація за ключовими словами; **не можна** ініціювати розмови |
| Instagram DM API (Kommo) | Середній/великий бізнес | Великий обсяг, story mentions, private replies; **не можна** ініціювати |

**Ключове обмеження:** бізнес **не може ініціювати розмови** — лише відповідати.

**Як обійти (стратегії залучення):**
- ig.me link: `ig.me/m/[username]`
- Instagram Widget на сайті
- Click-to-Instagram Direct Ads
- Коментарі під постами → автоматична обробка
- Instagram Story Mentions (доступні 24 год)

**Kommo Instagram Integration:**
- Безкоштовна нативна інтеграція (Instagram DM API)
- Доступна на **всіх планах** Kommo
- Необхідно: Instagram Business Account + Facebook Business Page + "Allow access to messages"
- Якщо використовується Facebook integration → логінитися в Instagram через **той самий** Facebook профіль

**Icebreakers:** до **4** кнопок-підказок для нових розмов; до **80 символів** кожна.

**Quick Reply Buttons у Salesbot:** до **13 кнопок**; до **20 символів** кожна.

**Story Mentions:** якщо користувач згадує бізнес у своїй Instagram Story → з'являється як лід у Kommo на **24 години**.

**Статистика (для продажників):**
- ~90% користувачів Instagram підписані на хоча б один бізнес-акаунт
- Instagram: ~1.4 млрд щомісячних активних користувачів
- Відповідь протягом 5 хвилин → +50% до конверсій

**Kommo** — офіційний Meta Business Partner з підтвердженою компетенцією в Instagram, WhatsApp та Facebook Messenger інтеграціях.
