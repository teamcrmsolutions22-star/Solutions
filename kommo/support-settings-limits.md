# Kommo — Налаштування, ліміти, покрокові гайди

## 9. ACCOUNT SETTINGS & BILLING

### Subscription Plans

*New pricing rates effective March 3, 2026 (apply to new subscriptions only)*

| Feature | Base | Advanced | Enterprise |
|---------|------|----------|-----------|
| **Price** | ~$15/user/month | ~$25/user/month | ~$45/user/month |
| **Contacts** | 12,500 | 25,000 | 50,000 |
| **Active Leads** | 2,500 | 5,000 | 10,000 |
| **Custom Fields** | 100 | 200 | 400 |
| **File Storage** | 100 MB | 200 MB | 400 MB |
| **AI Credits** | 750 | 1,250 | 2,250 |
| **Kommo AI (writing, summaries, copilot)** | ✓ | ✓ | ✓ |
| **Salesbot** | — | ✓ | ✓ |
| **Broadcasting** | — | ✓ | ✓ |
| **NPS** | — | ✓ | ✓ |
| **Webhooks API** | — | ✓ | ✓ |
| **AI Power-Up (NLP)** | — | — | ✓ |
| **SSO** | — | — | ✓ |
| **Enhanced security** | — | — | ✓ |
| **Priority data processing + SLA** | — | — | ✓ |
| **Scheduled backups** | — | — | ✓ |
| **Dedicated account manager** | — | — | ✓ |
| **White-glove support** | — | — | ✓ |

**AI Agent:** Paid add-on on ANY plan (free during trial)

---

### Billing FAQ (Exact Q&A Pairs)

**Q: How does billing work?**
A: Your Kommo subscription applies to your entire account; all users must have the same subscription plan. Billing is per user per month.

**Q: What currency is billing in?**
A: Kommo bills in USD. You can also pay in Brazilian Reals (BRL), or find an official partner for other currencies.

**Q: What payment methods are accepted?**
A: Credit/debit cards (via Stripe and Ebury), PayPal (USD only, not available in Brazil).

**Q: How does auto-renewal work?**
A: Three days before subscription ends, an automatic renewal order is created. If payment is successful, subscription is renewed. Recurring payments auto-enabled after successful payment via PayPal, Stripe, or Ebury.

**Q: Can I renew manually?**
A: Manual renewal is unavailable if recurring payments are enabled. To renew manually, first disable recurring payments in the Billing section.

**Q: What is the refund policy?**
A: Kommo services are generally non-refundable (plan charges, WhatsApp Conversation Credits, add-ons, third-party integrations, one-time chatbot development). You CAN request a refund for unused periods by contacting support@kommo.com or via live chat — upon confirmation, account will be deactivated.

**Q: What about unauthorized charges?**
A: Contact Kommo support immediately; if verified as unauthorized/fraudulent, a full refund will be issued.

**Q: What is the minimum subscription period?**
A: 6 months. Discounts available for 9, 12, and 24-month periods.

**Source:** https://www.kommo.com/support/account-settings/billing-faqs/ and https://www.kommo.com/refund-policy/

---

### User Management

**Adding users:** Settings → Users → Invite

**User Roles:**
- **Administrator:** Full account access; can add/edit/disable/remove users; assign roles; set permissions; no limit on admins; first user is auto-set as Administrator
- **Custom roles:** Create roles with specific access levels

**Permission Types:**
- "If Responsible" — users can only access leads assigned to them
- Stage-specific permissions
- Field-level access control
- Shared inbox access
- Media message access

**User Groups:** Settings → Users → three-dot menu → "Group settings"

---

## 10. FEATURE LIMITATIONS TABLE

| Feature | Limit | Plan | Source URL |
|---------|-------|------|------------|
| Active Leads | 2,500 | Base | kommo.com/support/account-settings/subscription-plans/ |
| Active Leads | 5,000 | Advanced | kommo.com/support/account-settings/subscription-plans/ |
| Active Leads | 10,000 | Enterprise | kommo.com/support/account-settings/subscription-plans/ |
| Contacts | 12,500 | Base | kommo.com/support/account-settings/subscription-plans/ |
| Contacts | 25,000 | Advanced | kommo.com/support/account-settings/subscription-plans/ |
| Contacts | 50,000 | Enterprise | kommo.com/support/account-settings/subscription-plans/ |
| Custom Fields | 100 | Base | kommo.com/support/crm/fields/ |
| Custom Fields | 200 | Advanced | kommo.com/support/crm/fields/ |
| Custom Fields | 400 | Enterprise | kommo.com/support/crm/fields/ |
| File Storage | 100 MB | Base | kommo.com/support/account-settings/subscription-plans/ |
| File Storage | 200 MB | Advanced | kommo.com/support/account-settings/subscription-plans/ |
| File Storage | 400 MB | Enterprise | kommo.com/support/account-settings/subscription-plans/ |
| AI Credits | 750/period | Base | kommo.com/support/crm/kommo-ai-overview/ |
| AI Credits | 1,250/period | Advanced | kommo.com/support/crm/kommo-ai-overview/ |
| AI Credits | 2,250/period | Enterprise | kommo.com/support/crm/kommo-ai-overview/ |
| AI Credits reset | Every 30 days from purchase | All | kommo.com/support/crm/ai-agent-packages/ |
| AI Credits rollover | None — unused credits expire | All | kommo.com/support/crm/ai-agent-packages/ |
| AI agent Knowledge Sources | Up to 10 | Trial | kommo.com/support/crm/ai-agent-automatic-setup/ |
| AI agent Knowledge Sources | Up to 100 | Paid plans | kommo.com/support/crm/ai-agent-manual-setup/ |
| AI agent first response time | 3–8 seconds | All | kommo.com/support/crm/kommo-ai-agent/ |
| Broadcasting | Not available | Base | kommo.com/support/crm/broadcasting/ |
| Broadcasting | Available | Advanced + Enterprise | kommo.com/support/crm/broadcasting/ |
| WhatsApp broadcast initial daily limit | 250 conversations/day | All | kommo.com/support/crm/whatsapp-broadcasts/ |
| WhatsApp broadcast raised limit | 1,000/day after Meta verification | All | kommo.com/support/crm/whatsapp-broadcasts/ |
| WhatsApp payment threshold | $20 (Meta charges) | All | kommo.com/support/messenger-apps/whatsapp-pricing/ |
| WhatsApp Marketing Template validity | 12 hours to 30 days | All | kommo.com/support/messenger-apps/marketing-messages-api/ |
| Round Robin max options | 100 | All | kommo.com/support/crm/introducing-round-robin-in-salesbot/ |
| Round Robin min options | 2 | All | kommo.com/support/crm/introducing-round-robin-in-salesbot/ |
| Export file size | 500 records per file | All | kommo.com/support/crm/export/ |
| Salesbot | Not available | Base | kommo.com/support/account-settings/subscription-plans/ |
| Salesbot | Available | Advanced + Enterprise | kommo.com/support/account-settings/subscription-plans/ |
| NPS feature | Not available | Base | kommo.com/support/crm/net-promoter-score/ |
| NPS feature | Available | Advanced + Enterprise | kommo.com/support/crm/net-promoter-score/ |
| AI Power-Up (NLP) | Not available | Base + Advanced | kommo.com/support/crm/ai-power-up/ |
| AI Power-Up (NLP) | Available | Enterprise only | kommo.com/support/crm/ai-power-up/ |
| Webhooks API | Not available | Base | kommo.com/support/crm/webhooks/ |
| Webhooks API | Available | Advanced + Enterprise | kommo.com/support/crm/webhooks/ |
| Webhook response window | 2 seconds | All | kommo.com/support/crm/webhooks/ |
| Trial storage | 10 GB media storage | Trial | kommo.com/support/getting-started/ |
| Trial duration | 14 days | N/A | kommo.com/support/getting-started/ |
| Minimum subscription period | 6 months | All | kommo.com/support/account-settings/billing-faqs/ |
| Free users access | Shared card view/chat only | All | kommo.com/support/account-settings/free-users/ |
| AI agent auto setup | Trial only | Trial | kommo.com/support/crm/ai-agent-automatic-setup/ |
| LinkedIn messaging from CRM | Not available | All | kommo.com/support/lead-generation/linkedin-lead-gen/ |
| Custom field type change | Cannot be changed after creation | All | kommo.com/support/crm/fields/ |

---

## 11. ALL STEP-BY-STEP GUIDES

### Guide 1: Create a Salesbot
*Source: https://www.kommo.com/support/crm/how-to-create-a-salesbot/*

1. Go to the Leads section
2. Click "Automate" (top right corner)
3. Select a pipeline stage
4. Click "Add Trigger" → Choose "Salesbot"
5. Select "Create a new bot"
6. Choose template OR create from scratch
7. Add steps and actions (messages, buttons, notes, tasks, conditions, round robin)
8. Configure triggers (pipeline, scheduled, conversational, keyword)
9. Optionally add tag conditions
10. Set active time schedule
11. Save and activate

---

### Guide 2: Set Up Pipeline
*Source: https://www.kommo.com/support/crm/setting-up-a-pipeline/*

1. Go to Leads section
2. Click three-dot button (upper right)
3. Select "Edit pipeline"
4. Click existing stage to rename, change color, or delete (click "x")
5. Drag stages to reorder
6. For multiple pipelines: Leads → Automate → click pipeline name (upper left) → add/edit/delete pipelines

---

### Guide 3: Connect WhatsApp Business
*Source: https://www.kommo.com/support/messenger-apps/whatsapp-cloud-api-how-to-connect/*

1. Settings → Integrations
2. Select "WhatsApp Business" → "Install"
3. Authenticate with Facebook account
4. Set up WhatsApp Business profile
5. Connect phone number

---

### Guide 4: Connect Instagram
*Source: https://www.kommo.com/support/messenger-apps/instagram/*

1. Marketplace in Kommo → search "Instagram" → "Install"
2. Choose the Instagram Business account
3. Settings → Integrations → Instagram
4. Verify your email (required before Facebook account can be connected)

---

### Guide 5: Create a Webform
*Source: https://www.kommo.com/support/lead-generation/webforms/*

1. Lead section → "Setup" → "Add source" → "Webform"
2. "Edit fields" tab: configure fields and map to lead card
3. "Form setting" tab: set pipeline stage, add tags, configure notifications
4. "Form placement" tab: get embed code or shareable link
5. Paste code into website HTML or share the link

---

### Guide 6: Connect Shopify
*Source: https://www.kommo.com/support/integrations/shopify-how-to-connect-with-kommo/*

1. Settings → Integrations → search "Shopify" → "Install"
2. Redirected to Kommo's Shopify page
3. Authorize connection
4. Products, orders, contacts, and transactions sync automatically

---

### Guide 7: Connect Telegram
*Source: https://www.kommo.com/support/kb/telegram/*

1. Create a Telegram Bot via BotFather
2. Copy the bot's API token
3. Settings → Integrations → find Telegram integration
4. Paste the API token
5. Save settings

---

### Guide 8: Set Up Webhooks
*Source: https://www.kommo.com/support/crm/webhooks/*

**Via Settings:**
1. Settings → Integrations → "Web hooks"
2. Enter the WebHook URL
3. Select events to subscribe to

**Via Digital Pipeline:**
1. In a pipeline stage: select "API: + Send webhook"
2. Select trigger event
3. Enter webhook URL

---

### Guide 9: Import Data
*Source: https://www.kommo.com/support/crm/how-to-import/*

1. Leads section → three-dot menu → "Import"
2. Drag and drop file OR click "Load file" (CSV or XLS)
3. Match Kommo fields to your file's columns
4. Optionally save field mapping as a template
5. Complete import — email notification sent on completion

**Requirements:**
- Leads: must include Lead title column
- Contacts/Companies: must include Contact/Company name column
- Files with date fields: convert to CSV format

---

### Guide 10: Create AI Agent (Manual Setup)
*Source: https://www.kommo.com/support/crm/ai-agent-manual-setup/*

1. Settings → AI agent
2. Choose "Create from scratch" or select a template
3. Configure Persona (role, name, tone, style)
4. Add Knowledge Sources (upload TXT/PDF/DOC, paste text, or import URL)
5. Set up Actions (what agent does for specific detected messages)
6. Connect Integrations (e.g., Shopify for real-time data)
7. Connect to messaging channels
8. Test the agent
9. Launch

---

### Guide 11: Create a Broadcast
*Source: https://www.kommo.com/support/crm/broadcasting-settings/*

1. Go to Broadcasting section
2. Create or select a segment (audience)
3. In advanced settings:
   - Review audience
   - Select a connected channel
   - Choose or create a message template
   - Set launch time (immediately or schedule)
4. Optionally configure bot automation for automatic replies
5. Optionally set "Only send to phone numbers with existing chats"
6. Launch or schedule

---

### Guide 12: Set Up Chat Button
*Source: https://www.kommo.com/support/lead-generation/website-chat-button-how-to-create-and-install-it/*

1. Lead section → Setup → Add source → Chat Button
2. Configure which channels to include
3. Customize appearance (animation, position, visibility)
4. Preview on mobile and desktop
5. Install via: copy code snippet → paste into website HTML, OR WordPress plugin, OR Shopify, OR Google Tag Manager

---

### Guide 13: Export Data
*Source: https://www.kommo.com/support/crm/export/*

1. Open the Leads section (apply filters if needed)
2. Click three-dot menu → "Export"
3. Choose CSV or XLS format
4. For contacts/companies: Lists → three-dot menu → Export (also has vCard option)
5. Files over 500 records are automatically split

---

### Guide 14: Connect LinkedIn
*Source: https://www.kommo.com/support/lead-generation/linkedin-lead-gen/*

1. Integrations → search "LinkedIn" → "Install"
2. Click "Sign in to LinkedIn" and authorize Kommo
3. Connect tool: "Lead Gen forms" and/or "Lead Parser"
4. Map LinkedIn form fields to Kommo lead card fields

---

### Guide 15: Connect Mailbox
*Source: https://www.kommo.com/support/crm/mail/*

1. Mail section → "Settings" (upper right) → "Add email"
2. Enter the email address (system auto-detects provider)
3. Enter password OR click "Continue" to authenticate via email client page
4. Specify Personal or Shared mailbox type
5. Complete connection

---

## 12. COMPLETE FEATURE TABLE

| Feature | Description | Plan | Source URL |
|---------|-------------|------|------------|
| Leads | Sales opportunity tracking with visual pipeline | All | kommo.com/support/crm/leads/ |
| Contacts | Individual person profiles | All | kommo.com/support/crm/ |
| Companies | Business entity profiles | All | kommo.com/support/crm/ |
| Pipeline | Visual Kanban sales stages | All | kommo.com/support/crm/setting-up-a-pipeline/ |
| Multiple Pipelines | Multiple sales strategies/stages | All | kommo.com/support/crm/setting-up-a-pipeline/ |
| Custom Fields | Business-specific data fields (10+ types) | All | kommo.com/support/crm/fields/ |
| Dynamic Fields | Auto-populate lead data in messages | All | kommo.com/support/crm/dynamic-fields/ |
| Tags | Flexible contact/lead classification | All | kommo.com/support/crm/tags/ |
| Lists/Catalogs | Product/service catalogs linked to leads | All | kommo.com/support/crm/lists/ |
| Dashboard | Real-time KPI/analytics visualization | All | kommo.com/support/crm/dashboard/ |
| Win-Loss Report | Won/lost analysis, lifecycle, response time | All | kommo.com/support/crm/stats/ |
| Activity Log | Full account change history | All | kommo.com/support/crm/stats/ |
| Tasks | Deadline-driven assignments | All | kommo.com/support/crm/ |
| Notes | Lead/contact annotations with pinning | All | kommo.com/support/crm/ |
| Email Integration | Personal + shared mailbox, templates, parsing | All | kommo.com/support/crm/mail/ |
| Import (CSV/XLS) | Bulk data import with field mapping | All | kommo.com/support/crm/how-to-import/ |
| Export (CSV/XLS) | Bulk data export with filters | All | kommo.com/support/crm/export/ |
| Unified Inbox | All messaging channels in one inbox | All | kommo.com/unified-inbox/ |
| Chat Routing | Assign conversations to team members | All | kommo.com/support/crm/chat-section/ |
| Mobile App (iOS/Android) | Full CRM access, business card scanner, push notifications | All | kommo.com/support/crm/mobile-app/ |
| Business Card Scanner | Auto-create lead from scanned business card | All | kommo.com/tour/mobile_application/ |
| VoIP/Telephony | Click-to-call, call recording, call logging | All | kommo.com/tour/telecom/ |
| Digital Pipeline | Pipeline automation triggers and actions | All | kommo.com/support/crm/pipeline-triggers/ |
| Salesbot | Automated chatbot for sales/support | Advanced + Enterprise | kommo.com/support/crm/how-to-create-a-salesbot/ |
| Salesbot Templates | Pre-built bot flows for various industries | Advanced + Enterprise | kommo.com/support/crm/salesbot-templates/ |
| Round Robin | Even distribution of messages/actions in Salesbot | Advanced + Enterprise | kommo.com/support/crm/introducing-round-robin-in-salesbot/ |
| Broadcasting | Bulk messaging to contact segments | Advanced + Enterprise | kommo.com/support/crm/broadcasting/ |
| NPS | Net Promoter Score via chatbot | Advanced + Enterprise | kommo.com/support/crm/net-promoter-score/ |
| Webhooks | Event notifications to external URLs | Advanced + Enterprise | kommo.com/support/crm/webhooks/ |
| AI Writing Tools | Rewriter, suggestions, summaries, suggested replies | All (free) | kommo.com/support/crm/kommo-ai-overview/ |
| Kommo Copilot | AI assistant for lead data and workspace queries | All (free) | kommo.com/support/crm/copilot-ai/ |
| Kommo AI Agent | 24/7 automated customer conversation handling | Paid add-on (any plan) | kommo.com/support/crm/kommo-ai-agent/ |
| AI Agent — Knowledge Sources | Upload docs/URLs for agent to reference | Add-on | kommo.com/support/crm/ai-agent-manual-setup/ |
| AI Agent — Actions | Define what agent does per detected intent | Add-on | kommo.com/support/crm/ai-agent-manual-setup/ |
| AI Agent — Persona | Define agent tone, role, style | Add-on | kommo.com/support/crm/ai-agent-manual-setup/ |
| AI Agent — After-Hours | Auto-handle conversations outside business hours | Add-on | kommo.com/support/crm/ai-agent-after-hours-support/ |
| AI Agent — Appointment Scheduling | AI books appointments automatically | Add-on | kommo.com/support/crm/appointment-scheduling-ai-agent/ |
| AI Power-Up (NLP) | NLP-based Salesbot intent detection | Enterprise only | kommo.com/support/crm/ai-power-up/ |
| Appointment Scheduling | Built-in scheduling with availability rules | All | kommo.com/support/crm/appointment-scheduling/ |
| Webforms | Lead capture forms for website | All | kommo.com/support/lead-generation/webforms/ |
| Chat Button | Website chat widget with all channels | All | kommo.com/support/lead-generation/website-chat-button-how-to-create-and-install-it/ |
| Live Chat | Real-time website visitor chat | All | kommo.com/support/lead-generation/chat-button-live-chat/ |
| Lead Scraper (Chrome ext.) | Scrape contact info from any website | All | kommo.com/support/lead-generation/amocrm-lead-scraper/ |
| Website Visitor Tracking | Pixel-based pipeline trigger when lead visits site | All | kommo.com/support/lead-generation/visited-website/ |
| Email Parsing | Auto-extract leads from incoming emails | All | kommo.com/support/lead-generation/email-parsing/ |
| Facebook Lead Ads | Import Facebook form leads automatically | All | kommo.com/support/lead-generation/facebook-form/ |
| LinkedIn Lead Gen | Import LinkedIn form leads automatically | All | kommo.com/support/lead-generation/linkedin-lead-gen/ |
| WhatsApp Business | Native Cloud API messaging | All | kommo.com/support/messenger-apps/whatsapp-cloud-api-how-to-connect/ |
| WhatsApp Templates | Meta-approved message templates | All | kommo.com/support/messenger-apps/whatsapp-cloud-api-message-templates/ |
| WhatsApp Marketing Messages API | Large-scale marketing campaign messaging | All | kommo.com/support/messenger-apps/marketing-messages-api/ |
| Instagram Messaging | DM, story mentions, comment automation | All | kommo.com/support/messenger-apps/instagram/ |
| Telegram | Bot-based messaging channel | All | kommo.com/support/kb/telegram/ |
| TikTok Messaging | TikTok Business Message management | All | kommo.com/support/messenger-apps/tiktok/ |
| Facebook Messenger | Business page messaging | All | kommo.com/support/kb/facebook-messenger-integration/ |
| Apple Messages for Business | iMessage for Business integration | All | kommo.com/support/messenger-apps/apple-messages-for-business/ |
| Viber | Bot or E-chat messaging | All | kommo.com/support/kb/viber/ |
| Shopify Integration | E-commerce sync (products, orders, contacts) | All | kommo.com/support/integrations/shopify-how-to-connect-with-kommo/ |
| Zapier Integration | Connect 8,000+ apps | All | kommo.com/support/integrations/zapier/ |
| Google Sheets | Auto-create leads from sheet entries | All | kommo.com/support/integrations/google-sheets/ |
| Google Calendar | Two-way calendar sync | All | kommo.com/support/integrations/google-calendar-usage/ |
| Calendly | Auto-create leads + tasks from bookings | All | kommo.com/support/integrations/calendly/ |
| Free Users | Limited read/chat access to shared cards | All | kommo.com/support/account-settings/free-users/ |
| User Roles & Permissions | Custom roles, field-level, stage-level permissions | All | kommo.com/support/account-settings/user-permissions/ |
| User Groups | Department-based permission sets | All | kommo.com/support/account-settings/user-permissions/ |
| SSO (Single Sign-On) | Enterprise identity management | Enterprise only | kommo.com/support/account-settings/subscription-plans/ |
| Partner Program | Resell Kommo, earn commissions | N/A | kommo.com/support/getting-started/partners-program/ |

---

## 13. GAPS & UNKNOWNS

### Pages Returning HTTP 403 (All Direct Fetches)
All direct WebFetch attempts to `kommo.com/support/*` returned HTTP 403. Content was retrieved exclusively through Google/Bing search engine indexing and cached snippets.

### Pages with Limited Data Retrieved
- `kommo.com/support/crm/mobile-app/` — general mobile app features found via product tour pages
- `kommo.com/support/crm/kommo-ai-setting-up/` — URL found; detailed setup steps not retrieved
- WeChat detailed setup — Integration confirmed to exist; specific setup steps not publicly indexed

### Expected Documentation That May Exist But Wasn't Retrieved
- Detailed Kommo AI setting-up steps
- Internal chat / team mentions documentation
- WhatsApp Sidebar / Small Business (legacy) documentation (referenced as being sunset)
- Specific pricing for AI agent credit packages (USD amounts not found)
- Account deletion process steps
- Make/Integromat integration setup steps
- WooCommerce setup guide
- Google Business Messages setup

### Discrepancies / Notes
- "PRO" plan referenced in some AI credits context (2,250 credits for "PRO"); current plan lineup is **Base / Advanced / Enterprise** — "PRO" may be an older name for Enterprise or a distinct fourth tier; not confirmed
- New pricing rates effective **March 3, 2026** apply only to new subscriptions; existing subscribers may be on older pricing
- File Storage: some sources state Enterprise = 800 MB, other sources say 400 MB — the 400 MB figure appears in more recent support documentation; **verify directly with Kommo**

---

## Duplicate Control — Повна документація (YouTube)

### Overview / 5 методів виявлення дублікатів

Kommo CRM має вбудований інструмент автоматичного контролю дублікатів. Налаштування знаходиться: **Leads → Setup (верхній правий кут) → Duplicate Control**.

**5 методів виявлення дублікатів:**

1. **Big Data** — власний алгоритм машинного навчання Kommo; найбільш автономний метод
2. **Tracking Pixel** — перевірка "відбитку" пікселя в лідах
3. **Email** — пошук збігів по email-адресі в картці контакту
4. **Phone** — пошук збігів по номеру телефону в основному контакті
5. **Custom Field** — пошук збігів по заданому кастомному полю (текстовому або числовому)

**Де налаштовується:**
- Вкладка **Lead Sources** — вибір каналів для скринінгу дублікатів
- Вкладка **Duplicate Control Rules** — вибір методів, пайплайнів, стадій, правил поведінки при конфлікті

**Важлива особливість джерел:**
- **Джерела з повною підтримкою** — можна увімкнути/вимкнути/налаштувати будь-яке правило окремо
- **Джерела з обмеженою підтримкою** — можуть використовувати ТІЛЬКИ метод Big Data; якщо хоча б одне таке джерело увімкнено, всі інші джерела мають працювати за тими ж обмеженими правилами
- Якщо джерело не вибрано — для кожного вхідного ліда з нього буде створено новий лід, навіть якщо дублікат є

---

### Big Data метод

**Принцип роботи:**
- Використовує власні алгоритми машинного навчання Kommo
- Аналізує дані нового ліда: місцезнаходження (lead location) + усі надані дані
- Підтримує виявлення дублікатів у вхідних лідах з чатів (месенджерів)

**Ключові технічні особливості:**
- **Асинхронний метод** — злиття дублікатів може відбутися після того, як новий лід потрапив у пайплайн, не обов'язково миттєво
- Злиття спрацьовує, коли чат-бот отримує нові дані від користувача (наприклад, номер телефону)
- **Умова для спрацювання:** один із лідів має бути на стадії **Incoming Lead**
- Після злиття старий лід містить і нові, і старі дані

**Обмеження:**
- Перевірка на дублікат відбувається тільки якщо лід перебуває на стадії Incoming Lead
- Єдиний доступний метод для "джерел з обмеженою підтримкою"

---

### Tracking Pixel метод

- Система перевіряє "відбиток пікселя" (pixel footprint) у вхідному ліді
- Шукає схожий відбиток серед існуючих лідів у системі
- Корисний для ідентифікації повторних звернень з веб-форм або лендінгів, де встановлений піксель відстеження

---

### Email та Phone матчинг

**Принцип роботи:**
- **Email:** система перевіряє email-адресу в картці контакту нового ліда та шукає схожий email у контактах інших лідів
- **Phone:** аналогічно email, але по номеру телефону в основному контакті

**Підтримувані джерела лідів:** Facebook Lead Ads, Intercom, Calendly, стандартні месенджери, API

**Додаткові сценарії автоматичного злиття:**
- Якщо заповнити email або телефон в існуючому ліді і є вхідний лід з таким самим значенням — злиття спрацює
- Злиття відбувається навіть якщо збіг лише по одному полю (тільки email або тільки phone)
- Нові дані додаються до старішого ліда в системі

**Важливий виняток:**
- Якщо email або номер телефону знаходиться у публічних базах/директоріях — злиття НЕ відбудеться; замість цього буде створено новий вхідний лід (захист від помилкових збігів)

---

### Custom Field матчинг

**Принцип роботи:**
- Вибирається одне або кілька кастомних полів ліда або контакту
- **Тип поля:** тільки **текстовий** або **числовий**
- Вхідні ліди скануються на збіг даних у цьому полі з існуючими лідами

**Правило для полів контакту:** дублікатом вважаються тільки ліди, у яких **основний контакт** має збіг у цьому полі.

**Налаштування:**
1. Leads → відкрити будь-який лід → Settings → **Add a field** → задати назву (напр. "Loyalty Card ID")
2. Leads → **Setup** → Duplicate Control Settings → **Add field** → вибрати потрібне поле → зберегти

---

### Rules (Conflict handling)

При виявленні дубліката і конфліктуючих даних:

**1. Update the existing lead with new data** — дані з нового вхідного ліда переносяться в існуючий лід; поля phone та email оновлюються автоматично.

**2. Do not change the data in the existing lead** — оригінальний лід НЕ оновлюється; новий лід залишається в системі для ручного розбору.

---

### 2+ leads match — 3 варіанти обробки

Якщо знаходиться 2 і більше лідів, що збігаються з новим вхідним:

**Варіант 1: Update all leads** — кожен лід-дублікат оновлюється новими даними.

**Варіант 2: Update the latest existing lead** — тільки найсвіжіший із існуючих лідів отримає нові дані.

**Варіант 3: Create a new lead** — вхідний лід НЕ зливається; автоматично переміщується на ту ж стадію пайплайну, де знаходяться дублікати.

---

### After Merging rule

**Призначення:** автоматичне створення завдання після злиття лідів-дублікатів.

**Де налаштовується:** Leads → Setup → Duplicate Control → вкладка **After Merging** → **Add a task**

**Параметри завдання:** назва, дедлайн (напр. end of day), відповідальний (напр. lead creator), тип завдання, текст.

**Обмеження:** якщо знайдено **більше 3 дублікатів** — це правило ігнорується, завдання не створюється.

---

### Manual merge procedure

#### Де знайти дублікати:

**1. Картка ліда** — ліди-підозрювані позначені **рожевим тегом "duplicate"**; натиснути тег → порівняння пліч-о-пліч.

**2. Пайплайн** → іконка **"..."** (ellipsis) → **Find Duplicates**

#### Вікно злиття:
- **Ліва/центральна панелі** — ліди-дублікати з полями (поля виділені білим = вибрано для результату)
- **Права панель** — превью фінального результату
- **Кнопка Ignore** — більше не питати про цю пару
- **Кнопка Merge** — виконати злиття

#### Кроки у Find Duplicates:
1. Вибрати дату створення ліда
2. Вибрати, зберігати чи ні теги та деталі замовлення
3. Вибрати, які номери телефонів залишити (можна залишити обидва)
4. **Skip this duplicate** / **Cancel** / **Merge**

---

### Unmerging leads

Злиття лідів залишає **нотатку (note) про злиття** у фіді картки ліда.

**Процедура скасування (1 крок):** відкрити картку злитого ліда → знайти у фіді нотатку про злиття → натиснути кнопку **Cancel** всередині нотатки.

---

## Типові помилки та дебаг (ChatGPT Deep Research, червень 2026)

### HTTP помилки API

| Код | Причина | Рішення |
|-----|---------|---------|
| **401 Unauthorized** | Access token прострочений або не відповідає субдомену | Оновити токен через refresh token |
| **403 Forbidden** | Інтеграція/користувач не має прав на дію | Перевірити scopes токена та права інтеграції |
| **404 Not Found** | Запис не існує або видалений (soft delete) | Для пошуку видаленого: `with=all` або `with=deleted` |
| **429 Too Many Requests** | Перевищення ліміту 7 req/sec | Exponential backoff між запитами |

### Вебхук не приходить

1. Перевірити, чи увімкнено вебхук у UI (Webhooks → статус Active)
2. URL повинен бути **HTTPS** на порту **80** або **443**
3. Сервер повинен відповідати протягом **10 секунд** (інакше timeout)
4. Перевірити лог вебхуків: Налаштування → Інтеграції → Webhooks → Історія

### Автоматизація не спрацювала

1. Перевірити, чи активний тригер (увімкнений)
2. Перевірити правильність умов (пайплайн, етап, поля)
3. Перевірити права доступу для менеджера, на якого призначено дію
4. Іноді допомагає перезберегти угоду або звернутись до підтримки для скидання черги

### Sandbox

Kommo **не має публічного sandbox-середовища**. Використовуйте **trial-акаунт (14 днів)** як тестове середовище. Для тестування вебхуків локально — **ngrok** або аналоги для тимчасового HTTPS.

Ліди автоматично розливаються. Функція доступна будь-коли після злиття.
