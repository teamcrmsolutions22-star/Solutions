# HubSpot — AI-функції (Breeze AI)

> Актуально: червень 2026 (Deep Research). Маркери: ✅ офіц. | ⚠️ вторинне/PST | ❌ застаріло
> Ренейми: Copilot → **Breeze Assistant**; Operations Hub → **Data Hub**; CMS Hub → **Content Hub**.

## Архітектура Breeze

| Шар | Що це | Доступність |
|-----|-------|-------------|
| **Breeze Assistant** | Розмовний AI з повним доступом до CRM: генерує/рефайнить контент, готує до зустрічей, підсумовує записи, будує workflow, відповідає на питання, **візуалізації даних** | «Усі продукти й плани» (деякі фічі — за seat/підпискою; free-tier ⚠️) ✅ |
| **Breeze Agents** | Автономні «AI-teammates» для об'ємних задач; керування в **Breeze Studio**, встановлення з **Breeze Marketplace** | Pro/Ent (за агентом) ✅ |
| **Custom Assistants** | Конфігуровані AI у Breeze Studio: інструкції + **tools** + **knowledge vaults** | ✅ |
| **Breeze Intelligence** | Збагачення даних (40+ атрибутів), buyer intent (4 типи сигналів), скорочення форм; **200M+ профілів** | Starter/Pro/Ent ✅ |

- **Knowledge vaults:** до **50** одночасно (Breeze → Knowledge). ✅
- **Breeze Assistant rate limit:** генерація **30/хв і 1,000/день**. ✅
- HubSpot маркетить **«20+ Breeze Agents and Assistants»**. ✅

## Breeze Agents

**GA (загальнодоступні):**
- **Customer Agent** — підтримка 24/7, «вирішує до 70% розмов». Pro/Ent (Marketing/Sales/Service/Content/Data/Commerce/Smart CRM). Джерела: KB, сторінки сайту, лендінги, блоги, файли, зовнішні URL. Канали: live chat, email, WhatsApp, Facebook, calling (BETA). ✅
- **Prospecting Agent** — повний lifecycle: сигнали купівлі → списки → персональний outreach на рев'ю. Sales Pro/Ent. ⚠️ позиціюється як «public beta»/повне рішення. ✅
- **Data Agent** — research-спеціаліст: відповідає по CRM-даних, розмовах, документах і вебу в реальному часі. ✅

**BETA (Marketplace/KB):** Company Research, Customer Health, Deal Loss, Cross-sell/Upsell, Knowledge Base Agent (private beta), Content Agent, Social Post, Brand Assistant, Shopify Store Performance, Audit Analyzer, ABM/landing, blog research, RFP, sales-to-marketing feedback. ✅/⚠️
- [Spring 2026] **Multi-brand Customer Agent** (свій агент на бренд) — public beta. ✅

## Breeze Credits

- **Споживають:** Customer/Prospecting/Data Agents, AI-дії в workflows, Data Studio syncs, Buyer Intent — зі **спільного пулу**. ✅
- **1 credit = $0.01.** ✅
- **Pay-per-outcome (з 14.04.2026):**
  - **Customer Agent: 50 cr = $0.50 за вирішену розмову** (resolution = агент допоміг і не передав людині 72 год). Включено **60/міс Pro, 100/міс Ent**, далі $0.50 кожна. ✅
  - **Prospecting Agent: 100 cr = $1 за рекомендований лід** (покриває research + лист + моніторинг/follow-up 30 днів). Sales Pro/Ent. ✅
  - **Data Agent / Run Agent: ~10 cr (~$0.10)** за відповідь/виконання ⚠️ (вторинне, узгоджено з $0.01).
- **Включена квота/міс (за найвищим tier):** Starter **500** / Pro **3,000** / Ent **5,000**; не сумуються між підписками. ✅
- **No rollover** — невикористане згорає в кінці періоду; reset щомісяця за датою підписки. ✅
- **Докупівля:** capacity packs **$10/1,000/міс** (locked на термін) або **pay-as-you-go**; адмін ставить spending caps, паузи, алерти. ✅
- **28-денний free trial** Customer Agent і Prospecting Agent (кожен). ✅
- **Хто:** платні seats; data enrichment **не** споживає credits (Starter/Pro/Ent), buyer intent **споживає** (усі крім Commerce). ✅
- Міграція BI Credits → HubSpot Credits: **2–15 червня 2025**. Обов'язкове використання для Prospecting/AI-workflows/Data Studio — з **10.11.2025**. ✅

## Вбудований AI (Hub + Tier)

- **Predictive Lead Scoring** (Likelihood to close % за 90 днів + Contact priority tiers) — **Marketing Hub Ent + Sales Hub Ent ТІЛЬКИ**. ✅
- **Conversation Intelligence** (транскрипція, AI-summary дзвінків, tracked terms, coaching) — **Sales/Service Hub Pro І Ent** (потрібен seat); працює для HubSpot Calling, Zoom, Google Meet. ✅ *(не Ent-only)*
- **AI email/content writer** (subject, preview, тіло) — Sales/Marketing. ✅
- **AI blog/landing/website generator** — Content/Marketing; tier ⚠️ (історично Pro+).
- **AI data enrichment / smart properties** — Breeze Intelligence + Data Agent. ✅

## Chatflows / чатботи

- **Rule-based bot** (скриптові питання) vs **Customer Agent** (Breeze-AI). ✅
- **Custom conditions на ботах + Customer Agent — Pro/Ent**; **Concierge bot — Service Pro/Ent**. ✅
- Customer Agent у live chat = перша лінія; відповідає з KB/сторінок/блогів. Канали: Facebook, WhatsApp, calling (BETA), live chat, email. ✅
- **Human handoff:** тригери (агент не може / запит людини / агент на паузі); режими **Live** або **Async**. ✅

## Breeze Agent API / програмний доступ

- **Run Agent** (workflow-дія): запуск агентів, повертає text/structured output; **ліміт 500 виконань/день/дія**. ✅
- ❌ Окремого публічного REST API «Breeze Agent» немає — оркестрація через workflows, Breeze Studio, MCP.
- **HubSpot MCP Client** (у Breeze Studio): підключає агентів до зовнішніх систем (Model Context Protocol). Конектори: **Notion, Atlassian (Jira/Confluence), Asana, Zapier, G2, Linear, Gong**. ⚠️ Amplitude — лише маркетинг-копі (немає в KB-списку). ✅
- **Remote MCP Server (для розробників):** public beta з 01.09.2025 → **GA** (2026); Self-Service MCP Auth Apps (OAuth 2.1) — beta з 13.01.2026. ✅

## Виправлення vs попередня база
- Credits **500/3,000/5,000 — тепер ✅** (підтверджено 2 джерелами); міграційні **3k/15k/125k** = старі BI-credits, **не плутати** з місячною квотою.
- Customer Agent **50 cr/$0.50** + включено **60/100**; Prospecting **100 cr/$1**.
- **CI = Sales/Service Pro І Ent** (не Ent-only).
- MCP-конектори: конкретний список (не «G2/Gong/Amplitude»).

**Джерела:** knowledge.hubspot.com/ai/* , /ai-tools/* , /customer-agent/* , /prospecting/* , /data-management/use-data-agent | knowledge.hubspot.com/account-management/understand-hubspot-credits-and-billing | hubspot.com/company-news/hubspots-customer-agent-and-prospecting-agent-now-you-pay-when-the-task-is-complete | knowledge.hubspot.com/workflows/run-agents-using-workflows | knowledge.hubspot.com/integrations/customize-breeze-agents-with-hubspot-mcp-client | developers.hubspot.com/changelog/mcp-server-beta
