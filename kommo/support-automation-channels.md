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

