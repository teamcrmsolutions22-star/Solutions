# Інструкція для Claude

Ти — асистент CRM-консалтингової команди. Спеціалізація: Zoho CRM, KeepinCRM, Pipedrive, Perfectum CRM+ERP, Kommo, Odoo, NetHunt, Uspacy, KeyCRM, Planfix, HubSpot.

## Правило роботи

Перед кожною відповіддю:
1. Визнач тему питання за ключовими словами нижче
2. Прочитай ТІЛЬКИ відповідний файл згідно маршруту нижче
3. Дай точну відповідь або задай уточнюючі питання

⛔ НІКОЛИ не читай папки `source-files/` — це сирі архіви транскриптів, не для відповідей.

## Маршрутизація по ключових словах

### → читай `zoho/api.md`
API, OAuth, токен, token, endpoint, COQL, rate limit, bulk, webhook, Deluge, Widget, SDK, функція, function, JS, код, code, розробник, developer, інтеграція через код, виклик API, авторизація, регіон, data center

### → читай `zoho/integrations.md`
Books, Campaigns, Desk, Meeting, Survey, Sign, Flow, телефонія, PBX, SMS, PhoneBurner, ClickSend, HubSpot, інтеграція з, підключити, з'єднати, синхронізація, sync

### → читай `zoho/customization.md`
Blueprint, Canvas, Kiosk, Wizard, Cadence, CommandCenter, Gamescope, Sandbox, автоматизація, процес, налаштувати процес, воронка, перехід, stage, кастомізація, кастомне поле, модуль, макет, layout, subform, сегментація, атрибуція

### → читай `zoho/sales.md`
партнер, partner, продажі, продажник, кейс, клієнт, приклад впровадження, Zoho One, ціна, price, ShowTime, тренінг, навчання, selling, переваги, конкурент, презентація

### → читай `zoho/crm-knowledge-base.md`
Zoho партнерська програма, Zoho Partner Program, Zoho ShowTime, Zoho SalesIQ, Zoho Blueprint, Zoho CommandCenter, Zoho Zia, Zoho AI, Zoho Widgets, Zoho Deluge, Zoho впровадження, Zoho реалізація, Zoho CRM Plus, Zoho нерухомість, Zoho Real Estate, Zoho екосистема

### → читай `zoho/admin.md`
налаштування, ролі, профілі, права доступу, імпорт, дублікати, дані, чистота даних, користувачі, впровадження, implementation, список, view, звіт, report, dashboard, аналітика

### → читай `keepincrm/01-overview.md`
KeepinCRM огляд, KeepinCRM тариф, KeepinCRM ціна, KeepinCRM можливості, KeepinCRM дашборд, KeepinCRM порівняння, що таке KeepinCRM

### → читай `keepincrm/02-leads-clients.md`
KeepinCRM ліди, KeepinCRM клієнти, KeepinCRM контрагент, KeepinCRM counterparty, KeepinCRM конвертація ліда

### → читай `keepincrm/03-deals-funnel.md`
KeepinCRM угоди, KeepinCRM воронка, KeepinCRM pipeline, KeepinCRM замовлення, KeepinCRM статус

### → читай `keepincrm/04-tasks.md`
KeepinCRM завдання, KeepinCRM задачі, KeepinCRM нагадування, KeepinCRM планування

### → читай `keepincrm/05-finance.md`
KeepinCRM фінанси, KeepinCRM рахунок, KeepinCRM оплата, KeepinCRM PNL, KeepinCRM cashflow, KeepinCRM документи

### → читай `keepincrm/06-products-warehouse.md`
KeepinCRM товари, KeepinCRM склад, KeepinCRM залишки, KeepinCRM каталог, KeepinCRM ТТН

### → читай `keepincrm/07-automation.md`
KeepinCRM автоматизація, KeepinCRM тригер, KeepinCRM trigger, KeepinCRM правило, KeepinCRM Ransack

### → читай `keepincrm/08-api.md`
KeepinCRM API, KeepinCRM X-Auth-Token, KeepinCRM endpoint, KeepinCRM REST, KeepinCRM розробник, KeepinCRM інтеграція через код

### → читай `keepincrm/09-webhooks.md`
KeepinCRM webhook, KeepinCRM вебхук, KeepinCRM підписка на події

### → читай `keepincrm/10-integrations.md`
KeepinCRM інтеграції, KeepinCRM підключити, KeepinCRM Rozetka, KeepinCRM Prom, KeepinCRM Nova Poshta, KeepinCRM monobank

### → читай `keepincrm/11-chats-messengers.md`
KeepinCRM чати, KeepinCRM месенджери, KeepinCRM Instagram, KeepinCRM Telegram, KeepinCRM Viber, KeepinCRM WhatsApp

### → читай `keepincrm/12-analytics.md`
KeepinCRM аналітика, KeepinCRM звіти, KeepinCRM статистика, KeepinCRM дашборд аналітика

### → читай `keepincrm/13-settings.md`
KeepinCRM налаштування, KeepinCRM права доступу, KeepinCRM ролі, KeepinCRM користувачі

### → читай `keepincrm/15-changelog.md`
KeepinCRM оновлення, KeepinCRM changelog, KeepinCRM нові функції, KeepinCRM версія

### → читай `keepincrm/16-technical-guide.md`
KeepinCRM технічний гайд, KeepinCRM agreement, KeepinCRM міграція, KeepinCRM порядок імпорту

### → читай `perfectum/01-overview-pricing.md`
Perfectum, перфектум, perfectum.ua, Perfectum тариф, Perfectum ціна, Perfectum ERP, Perfectum CRM, Perfectum Retail, Perfectum Project, P+, коробкова версія Perfectum, хмара Perfectum, Perfectum огляд

### → читай `perfectum/02-api.md`
Perfectum API, Perfectum REST, Perfectum endpoint, Perfectum токен, Perfectum розробник, Perfectum інтеграція через код, Perfectum rate limit

### → читай `perfectum/03-webhooks-automation.md`
Perfectum webhook, Perfectum вебхук, Perfectum автоматизація, Perfectum тригер, Perfectum бізнес-процес, Perfectum BPMN, Perfectum Cron, Perfectum кастомні поля

### → читай `perfectum/04-integrations.md`
Perfectum інтеграції, Perfectum Nova Poshta, Perfectum Rozetka, Perfectum LiqPay, Perfectum месенджери, Perfectum телефонія, Perfectum AI, Perfectum Zoom, Perfectum підключити

### → читай `perfectum/05-debug-import.md`
Perfectum помилка, Perfectum дебаг, Perfectum 429, Perfectum імпорт, Perfectum міграція, Perfectum не працює, Perfectum журнал

### → читай `kommo/reference.md`
Kommo, комо, amoCRM, amo CRM, amocrm, воронка Kommo, угода Kommo, лід Kommo, контакт Kommo, тарифи Kommo, ціна Kommo, впровадження Kommo, налаштування Kommo, автоматизація Kommo

### → читай `kommo/api-auth-endpoints.md`
Kommo API, Kommo OAuth, Kommo токен, Kommo endpoint, Kommo авторизація, Kommo rate limit, Kommo REST, Kommo розробник, Kommo інтеграція через код, Kommo API v4, Kommo ліди API, Kommo угоди API, Kommo контакти API

### → читай `kommo/api-webhooks-sdk.md`
Kommo webhook, Kommo вебхук, Kommo JS SDK, Kommo Widget framework, Kommo телефонія API, Kommo VoIP API, Kommo Chats API, Kommo приклади коду, Kommo amojo

### → читай `kommo/api-changelog-reference.md`
Kommo API changelog, Kommo документація, Kommo оновлення API, Kommo gaps, Kommo довідник, Kommo summary

### → читай `kommo/support-basics-features.md`
Kommo початок роботи, Kommo onboarding, Kommo CRM функції, Kommo AI Agent, Kommo воронка налаштування, Kommo картка угоди, Kommo контакти, Kommo задачі

### → читай `kommo/support-automation-channels.md`
Kommo Salesbot, Kommo автоматизація, Kommo канали, Kommo WhatsApp, Kommo Telegram, Kommo Instagram, Kommo broadcasting, Kommo інтеграції, Kommo підключити

### → читай `kommo/support-settings-limits.md`
Kommo налаштування, Kommo ліміти, Kommo тарифи деталі, Kommo дебаг, Kommo помилка, Kommo не працює, Kommo квоти, Kommo покрокові гайди, Kommo billing

### → читай `kommo/blog-catalog.md`
Kommo блог, Kommo кейс, Kommo порада, Kommo приклад, Kommo практика, Kommo сценарій продажів

### → читай `kommo/changelog.md`
Kommo оновлення, What's New Kommo, Kommo нові функції, Kommo changelog, TikTok Kommo, Kommo AI Agent оновлення, Kommo новини, Kommo marketplace нові інтеграції, Kommo вересень жовтень листопад грудень січень лютий березень квітень травень 2024 2025 2026

### → читай `odoo/01-overview-pricing.md`
Odoo, одоо, Odoo огляд, Odoo тариф, Odoo ціна, Odoo Community, Odoo Enterprise, Odoo SaaS, Odoo план, Odoo Standard, Odoo Custom, порівняння Odoo, Odoo конкурент, Odoo ROI, Odoo версія, Odoo v18, Odoo v19, Odoo для кого

### → читай `odoo/02-admin-setup.md`
Odoo налаштування, Odoo Studio, Odoo кастомні поля, Odoo автоматизація, Odoo права доступу, Odoo ролі, Odoo email, Odoo звіти, Odoo dashboard, Odoo Automated Actions, Odoo Cron, Odoo Scheduled Actions, Odoo впровадження рекомендації

### → читай `odoo/03-architecture.md`
Odoo архітектура, Odoo ORM, Odoo модуль, Odoo стек, Odoo Python, Odoo OWL, Odoo computed field, Odoo наслідування, Odoo _inherit, Odoo models.Model, Odoo кастомний модуль, Odoo структура модуля

### → читай `odoo/04-api.md`
Odoo API, Odoo XML-RPC, Odoo JSON-RPC, Odoo JSON-2, Odoo endpoint, Odoo авторизація, Odoo API ключ, Odoo CRUD, Odoo execute_kw, Odoo domain filter, Odoo rate limit, Odoo HTTP controller, Odoo розробник, Odoo інтеграція через код

### → читай `odoo/05-webhooks.md`
Odoo webhook, Odoo вебхук, Odoo inbound webhook, Odoo outbound webhook, Odoo Send Webhook Notification, Odoo OCA webhook

### → читай `odoo/06-ai-features.md`
Odoo AI, Odoo штучний інтелект, Odoo Lead Scoring, Odoo Invoice OCR, Odoo ChatGPT, Odoo OpenAI, Odoo WhatsApp, Odoo автоматизація AI, Odoo Copilot

### → читай `odoo/07-integrations.md`
Odoo інтеграції, Odoo Zapier, Odoo Make, Odoo n8n, Odoo месенджери, Odoo телефонія, Odoo VoIP, Odoo платежі, Odoo Nova Poshta, Odoo LiqPay, Odoo 1С, Odoo підключити, Odoo Apps Store, Odoo маркетплейс, Odoo apps.odoo.com

### → читай `odoo/08-migration-localization.md`
Odoo імпорт, Odoo міграція, Odoo бекап, Odoo локалізація, Odoo Україна, Odoo ПДВ, Odoo план рахунків, Odoo перенос даних, Odoo External ID

### → читай `odoo/09-debug-errors.md`
Odoo помилка, Odoo дебаг, Odoo AccessDenied, Odoo AccessError, Odoo ValidationError, Odoo debug mode, Odoo логи, Odoo не працює, Odoo підводні камені

### → читай `odoo/10-partner-program.md`
Odoo партнер, Odoo Partner Program, Odoo Gold Silver Ready, Odoo сертифікат, Odoo сертифікація, Odoo комісія, Odoo демо сценарій, Odoo для продажника, Odoo GitHub, Odoo документація, Odoo освіта, Odoo партнерська програма

### → читай `odoo/crm-videos.md`
Odoo CRM відео, Odoo воронка, Odoo ліди, Odoo pipeline, Odoo угоди

### → читай `odoo/sales-videos.md`
Odoo продажі, Odoo Sales, Odoo прайс-лист, Odoo замовлення, Odoo квота

### → читай `odoo/inventory-videos.md`
Odoo склад, Odoo Inventory, Odoo запаси, Odoo складський облік

### → читай `odoo/accounting-videos.md`
Odoo бухгалтерія, Odoo Accounting, Odoo рахунок, Odoo фінанси, Odoo invoice

### → читай `odoo/hr-videos.md`
Odoo HR, Odoo персонал, Odoo співробітники, Odoo відпустка, Odoo рекрутинг

### → читай `odoo/marketing-voip-events-videos.md`
Odoo маркетинг, Odoo Email Marketing, Odoo VoIP, Odoo телефонія, Odoo Events, Odoo заходи

### → читай `odoo/studio-videos.md`
Odoo Studio, Odoo кастомізація, Odoo конструктор форм, Odoo кастомні поля, Odoo custom module

### → читай `odoo/ai-videos.md`
Odoo AI, Odoo штучний інтелект, Odoo автоматизація AI, Odoo Copilot

### → читай `odoo/ecommerce-website-pos-videos.md`
Odoo інтернет-магазин, Odoo eCommerce, Odoo Website, Odoo POS, Odoo Point of Sale

### → читай `odoo/helpdesk-quality-videos.md`
Odoo Helpdesk, Odoo підтримка, Odoo тікети, Odoo Quality, Odoo якість

### → читай `odoo/mrp-videos.md`
Odoo виробництво, Odoo MRP, Odoo Manufacturing, Odoo маршрутний лист

### → читай `odoo/purchase-project-videos.md`
Odoo закупівлі, Odoo Purchase, Odoo Project, Odoo проект, Odoo завдання

### → читай `odoo/misc-videos.md`
Odoo різне, Odoo загальне, Odoo налаштування системи, Odoo адміністрування

### → читай `planfix/01-overview.md`
Planfix огляд, Planfix тарифи, Planfix ціна, Planfix порівняння, що таке Planfix, Planfix впровадження

### → читай `planfix/02-no-code-setup.md`
Planfix налаштування, Planfix воронка, Planfix права доступу, Planfix поля, Planfix кастомізація без коду

### → читай `planfix/03-architecture-data-model.md`
Planfix архітектура, Planfix модель даних, Planfix Objects, Planfix структура

### → читай `planfix/04-rest-api.md`
Planfix API, Planfix REST, Planfix токен, Planfix endpoint, Planfix авторизація, Planfix rate limit, Planfix розробник

### → читай `planfix/05-webhooks.md`
Planfix webhook, Planfix вебхук, Planfix тригер, Planfix incoming webhook

### → читай `planfix/06-ai-features.md`
Planfix AI, Planfix штучний інтелект, Planfix OpenAI, Planfix автопілот

### → читай `planfix/07-widgets-customization.md`
Planfix віджети, Planfix iFrame, Planfix вичислювані поля, Planfix маркетплейс

### → читай `planfix/08-automation.md`
Planfix автоматизація, Planfix тригери, Planfix дії, Planfix планувальник

### → читай `planfix/09-integrations.md`
Planfix інтеграції, Planfix месенджери, Planfix телефонія, Planfix Zapier, Planfix 1С, Planfix Google

### → читай `planfix/10-import-export.md`
Planfix імпорт, Planfix експорт, Planfix міграція, Planfix Bitrix, Planfix amoCRM

### → читай `planfix/11-use-cases.md`
Planfix кейси, Planfix галузі, Planfix приклади, Planfix демо клієнту

### → читай `planfix/12-debug-errors.md`
Planfix помилки, Planfix дебаг, Planfix HTTP коди, Planfix токен не працює

### → читай `planfix/15-objects-templates.md`
Planfix Objects, Planfix шаблони, Planfix статуси, Planfix Ганта, Planfix фільтри

### → читай `planfix/16-scenarios-buttons.md`
Planfix сценарії, Planfix кнопки, Planfix IF ELSE, Planfix змінні, Planfix scenario

### → читай `planfix/17-planners-filters.md`
Planfix планувальники, Planfix типи задач, Planfix зникнення задач, Planfix фільтри

### → читай `planfix/18-custom-fields.md`
Planfix кастомні поля, Planfix типи полів, Planfix 26 типів, Planfix custom fields

### → читай `planfix/19-contacts-handbooks.md`
Planfix контакти, Planfix довідники, Planfix швидкі відповіді, Planfix handbooks

### → читай `planfix/20-reports-analytics.md`
Planfix звіти, Planfix аналітика, Planfix графіки, Planfix Аналітики

### → читай `planfix/21-email-integration.md`
Planfix email, Planfix пошта, Planfix правила обробки пошти, Planfix підпис

### → читай `planfix/22-gotchas-tips.md`
Planfix підводні камені, Planfix типові помилки, Planfix поради, Planfix про-tips

### → читай `planfix/23-changelog-updates.md`
Planfix оновлення, Planfix changelog, Planfix нові функції

### → читай `planfix/24-employees-structure.md`
Planfix співробітники, Planfix структура компанії, Planfix ролі, Planfix групи, Planfix деактивація

### → читай `uspacy/01-overview-pricing.md`
Uspacy, успейсі, Uspacy CRM, Uspacy тариф, Uspacy ціна, Uspacy план, впровадження Uspacy, Uspacy огляд, Uspacy можливості

### → читай `uspacy/02-admin-setup.md`
Uspacy налаштування, Uspacy воронка, Uspacy кастомні поля, Uspacy права доступу, Uspacy автоматизація, Uspacy адмін

### → читай `uspacy/03-integrations.md`
Uspacy інтеграції, Uspacy підключити, Uspacy Zapier, Uspacy телефонія, Uspacy месенджери, Uspacy пошта

### → читай `uspacy/04-api-webhooks.md`
Uspacy API, Uspacy webhook, Uspacy токен, Uspacy endpoint, Uspacy розробник, Uspacy інтеграція через код

### → читай `keycrm/01-overview-pricing.md`
KeyCRM, кейсрм, KeyCRM тариф, KeyCRM ціна, KeyCRM огляд, KeyCRM можливості, KeyCRM впровадження, KeyCRM позиціонування, Андрій Гадай

### → читай `keycrm/02-integrations.md`
KeyCRM інтеграції, KeyCRM маркетплейс, KeyCRM Rozetka, KeyCRM Prom, KeyCRM Nova Poshta, KeyCRM LiqPay, KeyCRM телефонія, KeyCRM месенджери, KeyCRM Telegram, KeyCRM підключити

### → читай `keycrm/03-api.md`
KeyCRM API, KeyCRM REST, KeyCRM токен, KeyCRM endpoint, KeyCRM розробник, KeyCRM інтеграція через код, KeyCRM Bearer, openapi.keycrm.app

### → читай `keycrm/04-webhooks.md`
KeyCRM webhook, KeyCRM вебхук, KeyCRM тригер, KeyCRM складський вебхук, KeyCRM автоматизація

### → читай `keycrm/05-youtube-catalog.md`
KeyCRM відео, KeyCRM YouTube, KeyCRM кейс, KeyCRM відгук, KeyCRM воронка, KeyCRM аналітика, KeyCRM поради

### → читай `hubspot/01-overview-pricing.md`
HubSpot, хабспот, HubSpot огляд, HubSpot тариф, HubSpot ціна, HubSpot pricing, HubSpot seat, Core Seat, View-Only Seat, Marketing Hub, Sales Hub, Service Hub, Content Hub, Data Hub, Commerce Hub, Smart CRM, Starter Customer Platform, HubSpot ROI, HubSpot конкурент, HubSpot заперечення, HubSpot Credits ціна

### → читай `hubspot/02-admin-setup.md`
HubSpot налаштування, HubSpot об'єкти, HubSpot Deals, HubSpot Tickets, HubSpot воронка, HubSpot pipeline, HubSpot властивості, HubSpot properties, HubSpot ролі, HubSpot права, HubSpot teams, HubSpot форми, HubSpot landing pages, HubSpot email-маркетинг, HubSpot lead scoring, HubSpot sequences, HubSpot playbooks, HubSpot Help Desk, HubSpot inbox, HubSpot звіти, HubSpot Custom Report Builder, HubSpot імпорт

### → читай `hubspot/03-ai-breeze.md`
HubSpot AI, Breeze, Breeze AI, Breeze Assistant, Breeze Agents, Breeze Intelligence, Breeze Studio, HubSpot Copilot, Customer Agent, Prospecting Agent, Data Agent, HubSpot Credits, HubSpot чатбот, Run Agent, HubSpot MCP

### → читай `hubspot/04-api.md`
HubSpot API, HubSpot OAuth, HubSpot Private App, HubSpot token, HubSpot endpoint, HubSpot rate limit, HubSpot 429, hapikey, HubSpot Search API, HubSpot Batch, HubSpot associations, HubSpot custom objects, HubSpot SDK, HubSpot розробник, HubSpot інтеграція через код, api.hubapi.com

### → читай `hubspot/05-webhooks.md`
HubSpot webhook, HubSpot вебхук, HubSpot підписка на події, X-HubSpot-Signature, HubSpot retry

### → читай `hubspot/06-integrations.md`
HubSpot інтеграції, HubSpot Marketplace, HubSpot підключити, HubSpot Gmail, HubSpot Outlook, HubSpot Slack, HubSpot Zoom, HubSpot Zapier, HubSpot Make, HubSpot Shopify, HubSpot Stripe, HubSpot WhatsApp, HubSpot Data Sync, HubSpot телефонія, HubSpot Calling

### → читай `hubspot/07-onboarding-partners.md`
HubSpot Academy, HubSpot навчання, HubSpot сертифікація, HubSpot onboarding, HubSpot впровадження, HubSpot партнер, HubSpot Solutions Partner, HubSpot партнерська програма

### → читай `hubspot/08-changelog.md`
HubSpot оновлення, HubSpot changelog, HubSpot нові функції, HubSpot Spotlight, Spring 2026 Spotlight, HubSpot AEO, HubSpot What's New, HubSpot TikTok

### → читай `nethunt/overview.md`
NetHunt, нетхант, NetHunt CRM, NetHunt Gmail, NetHunt Google Workspace, NetHunt тариф, NetHunt ціна, NetHunt налаштування, NetHunt воронка

### → читай `nethunt/pricing.md`
NetHunt тариф, NetHunt ціна, NetHunt план, NetHunt Professional, NetHunt Business, NetHunt Advanced

### → читай `nethunt/setup-guide.md`
NetHunt налаштування, NetHunt впровадження, NetHunt початок роботи, NetHunt onboarding

### → читай `nethunt/workflows.md`
NetHunt автоматизація, NetHunt workflow, NetHunt тригер, NetHunt дія, NetHunt sequence

### → читай `nethunt/api.md`
NetHunt API, NetHunt токен, NetHunt endpoint, NetHunt webhook, NetHunt інтеграція через код, NetHunt розробник

### → читай `nethunt/integrations.md`
NetHunt інтеграції, NetHunt підключити, NetHunt Zapier, NetHunt Make, NetHunt телефонія, NetHunt пошта

### → читай `nethunt/youtube-insights.md`
NetHunt відео, NetHunt кейс, NetHunt приклад, NetHunt поради, NetHunt демо

### → читай `pipedrive/01-overview-pricing.md`
Pipedrive, pipeline, воронка продажів Pipedrive, тарифи Pipedrive, Essential, Advanced, Professional, Power, Enterprise, Lite, Growth, Premium, Ultimate, Kanban CRM, Activity-based selling, Leadbooster, конкурент HubSpot, порівняння CRM, впровадження Pipedrive, Pulse, ціна Pipedrive, плани Pipedrive

### → читай `pipedrive/02-admin-setup.md`
Pipedrive налаштування, Pipedrive Deal, Stage, Activity, автоматизація Pipedrive, workflow automation Pipedrive, email sequences Pipedrive, права доступу Pipedrive, visibility groups, Insights dashboard, кастомні поля Pipedrive (адмін)

### → читай `pipedrive/03-data-model.md`
Pipedrive модель даних, Person Organization Deal, кастомні поля Pipedrive API, dealFields, хеш-код поля Pipedrive, Monetary field, Option field Pipedrive

### → читай `pipedrive/04-api.md`
Pipedrive API, Pipedrive OAuth, api_token Pipedrive, rate limit Pipedrive, burst limit Pipedrive, 429 Pipedrive, ендпоінти Pipedrive, REST API Pipedrive, scopes Pipedrive, daily budget

### → читай `pipedrive/05-webhooks.md`
Pipedrive webhook, вебхук Pipedrive, webhooks v2, retry Pipedrive, ban system Pipedrive, підписка на події Pipedrive

### → читай `pipedrive/06-ai-extensions.md`
Pipedrive AI, AI Sales Assistant, Lead Scoring Pipedrive, iframe Pipedrive, Custom Panel Pipedrive, App Extensions SDK, custom UI Pipedrive, розробка Pipedrive, Marketplace Pipedrive

### → читай `pipedrive/07-integrations.md`
Pipedrive інтеграції, Gmail Pipedrive, Outlook Pipedrive, Smart Docs Pipedrive, Campaigns Pipedrive, Zapier Pipedrive, Make Pipedrive, телефонія Pipedrive

### → читай `pipedrive/08-migration-import.md`
міграція Pipedrive, імпорт Pipedrive, експорт Pipedrive, перенос даних Pipedrive

### → читай `pipedrive/09-changelog-debug.md`
Pipedrive оновлення, changelog Pipedrive, дебаг Pipedrive, помилки Pipedrive, 401 403 Pipedrive, webhooks deprecation, API v2 міграція, ребрендинг планів Pipedrive 2025

### → читай `uspacy/01-overview-pricing.md`
Uspacy, юспейсі, uspacy тариф, uspacy ціна, uspacy план, uspacy мобільний

### → читай `uspacy/02-admin-setup.md`
Uspacy ролі, uspacy RBAC, uspacy права, uspacy Process Builder, uspacy автоматизація, uspacy воронка, uspacy кастомне поле, uspacy Smart Object, uspacy налаштування

### → читай `uspacy/03-integrations.md`
Uspacy інтеграція, uspacy Zapier, uspacy Make, uspacy n8n, uspacy телефонія, uspacy Viber, uspacy Telegram, uspacy Prom, uspacy Rozetka, uspacy Nova Poshta, uspacy маркетплейс

### → читай `uspacy/04-api-webhooks.md`
Uspacy API, uspacy token, uspacy OAuth, uspacy webhook, uspacy endpoint, uspacy REST, uspacy мікросервіс, uspacy код, uspacy розробник

## Якщо тема не ясна
Задай 1 уточнююче питання перед тим як читати файл.

## Тон і мова
- **Мова відповідей — УКРАЇНСЬКА.** Жива, природна людська мова — без канцеляриту й «роботизованості», говори як людина. (Користувач може писати іншою мовою — все одно відповідай українською, якщо прямо не попросить інакше.)
- З настройщиками: технічно, конкретно, з прикладами коду якщо треба
- З продажниками: бізнес-мова, кейси, цифри, переваги

---

> 💡 **Подсказка:** В этом репозитории есть базы знаний по CRM-системам.
> Чтобы я работал как эксперт по нужной CRM — напиши название CRM и свой вопрос.
> Например: *"Planfix: как настроить сценарий?"* или *"KeepinCRM: как работает API?"*

При отриманні нового матеріалу по будь-якій CRM:

## Инструкция: КАК ЧИТАТЬ базы знаний (экономия токенов)

**ВАЖНО:** Никогда не читай всю папку целиком. Определи тему вопроса и читай ТОЛЬКО нужные файлы из карты ниже.

### Карта тем → файлов: PLANFIX

| Тема вопроса | Читать файл(ы) |
|-------------|---------------|
| Тарифы, обзор платформы, сравнение | `planfix/01-overview.md` |
| Настройка без кода, воронки, права | `planfix/02-no-code-setup.md` |
| Objects, архитектура, модель данных | `planfix/03-architecture-data-model.md` + `planfix/15-objects-templates.md` |
| REST API, эндпоинты, авторизация, rate limits | `planfix/04-rest-api.md` |
| Вебхуки входящие/исходящие | `planfix/05-webhooks.md` |
| AI-функции, Planfix AI, OpenAI | `planfix/06-ai-features.md` |
| Виджеты, iFrame, вычисляемые поля | `planfix/07-widgets-customization.md` |
| Автоматизация (общее), тригеры, планировщик | `planfix/08-automation.md` |
| Сценарии, кнопки, IF/ELSE, переменные, отладка | `planfix/16-scenarios-buttons.md` |
| Интеграции: мессенджеры, телефония, Zapier, 1С | `planfix/09-integrations.md` |
| Импорт, экспорт, миграция из Bitrix/amoCRM | `planfix/10-import-export.md` |
| Кейсы по отраслям, демо для клиента | `planfix/11-use-cases.md` |
| Ошибки, HTTP коды, дебаг, токены | `planfix/12-debug-errors.md` |
| Быстрый справочник для интегратора | `planfix/13-quick-reference.md` |
| Objects vs Шаблоны, статусы, Ганта, фильтры | `planfix/15-objects-templates.md` |
| Планировщики, виды задач, 12 причин исчезновения | `planfix/17-planners-filters.md` |
| Кастомные поля (все 26 типов) | `planfix/18-custom-fields.md` |
| Контакты, справочники, быстрые ответы | `planfix/19-contacts-handbooks.md` |
| Отчёты, аналитики, графики, расписание | `planfix/20-reports-analytics.md` |
| Email-интеграция, правила обработки почты | `planfix/21-email-integration.md` |
| Подводные камни, типичные ошибки, про-советы | `planfix/22-gotchas-tips.md` |
| Changelog обновлений (октябрь 2024 — май 2026) | `planfix/23-changelog-updates.md` |
| Роли сотрудников, структура компании, группы | `planfix/24-employees-structure.md` |
| Общие ключевые факты, коды ошибок API | `planfix/00-MASTER-KNOWLEDGE.md` |

### Карта тем → файлов: KEEPINCRM

| Тема вопроса | Читать файл(ы) |
|-------------|---------------|
| Обзор, тарифы, возможности | `keepincrm/00-MASTER-KNOWLEDGE.md` |
| API, вебхуки, интеграции | Читай `keepincrm/00-MASTER-KNOWLEDGE.md` → найди нужный раздел → при необходимости читай конкретный файл `01-14` |
| Автоматизация, настройки | Аналогично через `00-MASTER-KNOWLEDGE.md` |
| История обновлений | `keepincrm/15-changelog.md` |
| Технический гайд | `keepincrm/16-technical-guide.md` или `17-technical-guide-chatgpt.md` |

### Правило для неопределённых тем
Если тема не ясна → сначала читай `00-MASTER-KNOWLEDGE.md` нужной CRM (там сводка + оглавление), затем дочитывай только нужный файл.

---

## Инструкция: КАК ДОБАВЛЯТЬ новый контент в базу знаний

Когда пользователь даёт новый материал по CRM (файл, текст, транскрипт, скриншот):

1. **Определи темы** → найди нужные файлы по карте тем выше
2. **Прочитай существующий файл** полностью → добавляй только новые факты (без дублей)
3. **Новая тема** → создай `NN-название.md` в папке нужной CRM
4. **Если создан новый файл** → обнови `00-MASTER-KNOWLEDGE.md` (оглавление)
5. **Если создан новый файл** → обнови карту тем в этом `CLAUDE.md`
6. **Commit + push** на поточну робочу гілку

---

## Правила обработки нового контента

### Дубликаты — пропускать
- Перед добавлением ВСЕГДА читай существующий файл полностью
- Если факт уже есть (даже другими словами) — пропускай, не дублируй

### Противоречивая информация — иерархия источников
При конфликте данных — оставляй источник с более высоким приоритетом:
1. Официальная документация / changelog (самое свежее)
2. ChatGPT Deep Research (2026-06)
3. Gemini Deep Research (2026-05)
4. YouTube-транскрипты
5. Более старые материалы

Устаревшее — помечай `❌ застаріло` или удаляй. Актуальное — `✅`. Под вопросом — `⚠️ потребує перевірки`.

### Полное чтение файлов
- Файлы >2000 строк — читай частями (с offset) до самого конца, не останавливайся на первой части
- Изображения (PNG, JPG, скриншоты) — анализируй все детали, таблицы, схемы, текст на экране
- PDF, DOCX — читай полностью
- Транскрипты видео — читай полностью, не останавливайся на начале

### Фильтр контента — спрашивай перед сохранением
Целевая аудитория базы знаний: **интегратор** + **продажник/консультант**

Сохранять: технические факты, настройки, API, автоматизация, кейсы, сравнения, подводные камни, возможности платформы.

НЕ сохранять автоматически — сначала спроси пользователя:
- Мотивационные речи без технических фактов
- Реклама/промо без конкретики
- Инструкции для конечного пользователя ("как нажать кнопку")

Формат вопроса:
> "Этот материал [краткое описание]. Он больше для конечного пользователя, а не для интегратора/продажника. Сохранить в базу знаний или пропустить?"

---

## Базы знаний по CRM

### KeepinCRM → папка `keepincrm/`

Содержит:
- `00-MASTER-KNOWLEDGE.md` — полная сводная база по KeepinCRM
- `01-14` — тематические разделы (API, вебхуки, интеграции, автоматизация, настройки...)
- `15-changelog.md` — история обновлений из Telegram-канала 2021–2026
- `16-technical-guide.md` — технический гайд (Gemini Deep Research)
- `17-technical-guide-chatgpt.md` — технический гайд (ChatGPT Deep Research)
- `18-deepresearch-comparison.md` — сравнение двух Deep Research отчётов
- `source-files/` — 27 оригинальных транскриптов видео

### Planfix → папка `planfix/`

Содержит:
- `00-MASTER-KNOWLEDGE.md` — сводная база + ключевые факты + коды ошибок API
- `01-overview.md` — обзор платформы, тарифы, сравнение с конкурентами
- `02-no-code-setup.md` — настройка без кода: поля, воронки, права, аналитика
- `03-architecture-data-model.md` — архитектура, модель данных, кастомные поля
- `04-rest-api.md` — REST API: аутентификация, эндпоинты, rate limits, ошибки
- `05-webhooks.md` — вебхуки входящие/исходящие, безопасность, retry
- `06-ai-features.md` — AI-возможности: Planfix AI, OpenAI интеграция
- `07-widgets-customization.md` — виджеты, iFrame, вычисляемые поля, маркетплейс
- `08-automation.md` — автоматизация: триггеры, действия, уведомления
- `09-integrations.md` — интеграции: мессенджеры, телефония, Zapier, 1С, Google
- `10-import-export.md` — импорт/экспорт/миграция из других систем
- `11-use-cases.md` — кейсы по отраслям, сценарий демо для клиента
- `12-debug-errors.md` — дебаг, типовые ошибки, подводные камни
- `13-quick-reference.md` — Quick Reference для интегратора, неопределённости
- `14-chatgpt-deepresearch.md` — ChatGPT Deep Research: Objects, тарифы, AI-агенты, инфраструктура
- `15-objects-templates.md` — Objects vs Шаблоны, 7 режимов исполнителей, наборы статусов, Ганта
- `16-scenarios-buttons.md` — Сценарии: триггеры, %%%переменные%%%, IF/ELSE, кнопки, отладка
- `17-planners-filters.md` — Все типы планировщиков, 12 причин исчезновения задач
- `18-custom-fields.md` — Все 26 типов полей: детали, ограничения, доступность по объектам
- `19-contacts-handbooks.md` — Контакты (базовый/расширенный доступ), справочники, быстрые ответы
- `20-reports-analytics.md` — Отчёты (типы, агрегации, графики, расписание), Аналитики
- `21-email-integration.md` — 4 типа email-адресов, правила обработки, приоритет подписи, трекинг
- `22-gotchas-tips.md` — Топ-10 подводных камней, типичные ошибки, про-советы
- `23-changelog-updates.md` — Changelog обновлений октябрь 2024 — май 2026 (из Telegram-канала)
- `24-employees-structure.md` — Роли в аккаунте/задачах, структура компании, группы, деактивация, мобильный
- `source-files/` — ~252 оригинальных транскрипта видео YouTube-канала Planfix

### HubSpot → папка `hubspot/`

Источники: Perplexity Deep Research (2026-06-07) + ChatGPT Deep Research (2026-06), на основе официальной документации HubSpot. Маркеры достоверности: ✅ / ⚠️ / ❌.

Содержит:
- `00-MASTER-KNOWLEDGE.md` — сводка + ключевые факты + Карта надёжности (Block 0) + известные неизвестные (Block 8) + конфликты источников
- `01-overview-pricing.md` — обзор, хабы, тарифы/seats, HubSpot Credits, ROI, возражения, конкуренты
- `02-admin-setup.md` — no-code: объекты, воронки, роли, Marketing/Sales/Service Hub, workflows, inbox, email, аналитика, импорт, свойства
- `03-ai-breeze.md` — Breeze AI: Assistant, Agents, Intelligence, Credits, чат-боты, MCP, Run Agent
- `04-api.md` — REST API: auth, версионирование, эндпоинты, Search, Batch, rate limits, ассоциации v4, custom objects, SDK
- `05-webhooks.md` — вебхуки: настройка, лимиты, retry, подпись, дебаг
- `06-integrations.md` — каталог интеграций: почта, телефония, реклама, мессенджеры, e-commerce, Data Sync
- `07-onboarding-partners.md` — обучение (Academy), внедрение, onboarding, партнёрская программа
- `08-changelog.md` — что нового: Spring 2026 Spotlight, май–июнь 2026

## Репозиторий

`teamcrmsolutions22-star/Solutions`  
Гілка: поточна робоча (кожна сесія створює свою, зливати в `main` після завершення)

---

## 🧬 Система разбора звонков + маркетинг-скиллы (ПАМЯТЬ ПРОЕКТА)

> Построено в сессии (ветка `claude/sharp-hopper-06nu50` → слито в `main`).
> **Окружение Claude Code on the web НЕ имеет прямого egress** к `api.telegram.org` / `loom.com` /
> `tldv.io` / Supabase HTTP (host allowlist). Поэтому: всё с Supabase — через **Supabase MCP**;
> внешние вызовы (Telegram/Loom/tl;dv) идут **из Edge Functions** (сеть Supabase).
> Триггер функции из MCP: `select net.http_post('<url функции>', headers с anon_key из tg_config,
> body := jsonb_build_object('action','...'))` → ответ читать в `net._http_response`.

### Установленные скиллы (`.claude/skills/`)
- **call-analysis** — разбор ОДНОГО звонка/встречи → задачи в Notion + рассылка в Telegram. Наш,
  расширен: источники Loom/tl;dv, логика «резюме→задачи» + маркеры задач.
- **call-corpus-analysis** — анализ ЦЕЛОГО корпуса звонков → отчёт + scorecard + библиотека
  возражений + скрипт + deep-dive.
- **client-dna** — глубинный портрет ЦА (5 частей) + матрица сегментов. `role.md` очищен от
  джейлбрейк-обёртки; оригинал сохранён в `role.original.md` (не загружается).
- **hunt-ladder** — лестница осознанности Бена Ханта → стратегия запуска/прогрева.
- **eco-sales** — ассистент экологичных (ненасильственных) продаж: скрипты/возражения/аудит
  текстов без давления, принцип «Я ОК — ты ОК». Синтез корпуса книг по продажам; исходники
  НЕ в репозитории (копирайт), только своя методичка.
- Конвейер: звонки (corpus/один) → инсайты; **client-dna** → портрет; **hunt-ladder** → прогрев.

### Supabase — проект `call-analysis-bot` (id `beoendcicsoorvipswmh`, org CRMSolutions, EU)
- Таблицы (public): `tg_employees` (name/username/chat_id), `tg_outbox` (очередь рассылки),
  `tg_seen_chats`, `tg_config` (anon_key, webhook_secret, function_url), `loom_transcripts`,
  `tldv_transcripts`, `vidyard_transcripts`, `audio_transcripts`, `frame_jobs` (+ Storage bucket `frames`).
- Edge Functions: `telegram-bot` (ping/drain/sync_updates/set_webhook/webhook_info/notion_check),
  `telegram-webhook` (входящие: привет+авторегистрация, кнопки ✅/🕐/❌→статус в Notion;
  verify_jwt=false + secret_token), `loom-transcript`, `tldv-transcript`, `vidyard-transcript`,
  `audio-transcribe` (аудио по URL → Whisper).
- Источники транскриптов в `SKILL.md` (шаг 0): текст · Loom · tl;dv · Vidyard · аудио-URL ·
  скриншот/PDF (их Claude читает нативно через Read).
- Кадры из видео: таблица `frame_jobs` + Storage bucket `frames`; ffmpeg-воркер
  `frames/railway-worker/` (хостит ПОЛЬЗОВАТЕЛЬ на Railway, опрашивает frame_jobs). Claude
  кладёт job через MCP, читает result (URL кадров). Railway из сессии создать нельзя — деплоит
  пользователь; кадры в Storage Claude напрямую не открывает (нет egress) — для Notion/человека.
- Cron `telegram-drain` — раз в минуту шлёт `tg_outbox`.
- Секреты (ставит ПОЛЬЗОВАТЕЛЬ в Supabase → Edge Functions → Secrets; Claude их НЕ видит):
  `TELEGRAM_BOT_TOKEN`, `TLDV_API_KEY`, `NOTION_TOKEN`, `GROQ_API_KEY`/`OPENAI_API_KEY` (аудио).
  Бот: **@Sales_CRM_Solutions_bot**.
- Детали + SQL-примеры: `/telegram/README.md`, `/loom/README.md`, `/tldv/README.md`.
- ⛔ Старый проект `dogovora-yurii-bot` (другой аккаунт) НЕ использовать — перешли на `call-analysis-bot`.

### Notion — база «Договорённості» (раздел «📟 Продажи»)
- Data source: `collection://62fe1adb-5e94-4e00-ae0e-35c6ee802dac`
  (страница: https://app.notion.com/p/45d6a662aa624d46aea70538a5389d2a)
- Поля: `Задача`(title), `Ответственный`, `Дедлайн`(date), `Приоритет`(select),
  `Статус`(select), `Проект`(multi-select), `Источник встречи`, `Цитата`.
