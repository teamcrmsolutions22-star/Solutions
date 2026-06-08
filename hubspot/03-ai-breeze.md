# HubSpot — AI-функції (Breeze AI)

> Актуально: червень 2026. Маркери: ✅ офіц. | ⚠️ потребує перевірки

## Архітектура Breeze (раніше Copilot)

| Шар | Що це | Доступність |
|-----|-------|-------------|
| **Breeze Assistant** | Розмовний AI-помічник у інтерфейсі (підсумки записів, підготовка до зустрічей, контент, побудова workflow, відповіді на питання, візуалізації даних) | **Усі продукти й плани** (за AI-settings; деякі фічі — за seat/підпискою) ✅ |
| **Breeze Agents** | Спеціалізовані автономні агенти (research, prospecting, support, data cleanup, ABM). Керування — **Breeze Studio → Agents**; встановлення з **Breeze Marketplace** | Pro/Ent хаби (за агентом) ✅ |
| **Custom Assistants** | Конфігуровані AI-workflow як асистенти/агенти; створюються в **Breeze Studio** з tools + knowledge vaults | ✅ |
| **Breeze Intelligence** | Шар збагачення даних (заповнення прогалин CRM, buyer intent, скорочення форм) | ✅ |

## Breeze Agents — типи

**Основні (документовані в офіц. KB):**

- **Customer Agent** (сервіс/підтримка):
  - Доступний з **Marketing/Sales/Service/Data/Content/Smart CRM/Commerce Hub Professional + Enterprise**. ✅
  - Джерела контенту: база знань, сторінки сайту, лендінги, блоги, завантажені файли, зовнішні URL/домени. ✅
  - Споживає **HubSpot Credits лише при вирішенні розмови** (on resolution). ✅
  - Деплой: live chat, email, WhatsApp, Facebook, calling (beta); через workflows або chatbots. ✅
  - **28 днів безлімітно безкоштовно** за наявності хоча б 1 місця Service Pro/Ent. ✅
- **Prospecting Agent** (продажі):
  - Повноцінний lifecycle: детект сигналів купівлі, mapping комітету, персоналізований outreach. ✅
  - Ціна — **$1 за рекомендований лід** (pay-per-outcome), 28-денний free trial. ✅
  - ⚠️ ChatGPT: ~1,000 credits/лід — точна кількість кредитів офіційно не вказана.
- **Data Agent** (якість даних CRM):
  - Data Management → Data Agent: детект невідповідностей, відсутніх полів, пропозиції cleanup + smart properties. ✅
  - ⚠️ ChatGPT: ~10 credits ($0.10) за відповідь — не підтверджено.

**Інші prebuilt-агенти (всі BETA ✅):** ABM landing page, blog research, **closing agent**, company research, cross-sell/upsell, **customer health agent**, deal loss agent, RFP agent, sales-to-marketing feedback agent.

## HubSpot Credits — детально

- **Концепт:** спільна **місячна** квота usage-юнітів для AI-агентів (Customer/Prospecting/Data) та інших AI/automation-фіч. ✅
- **Включено:** за **найвищим тарифом** акаунта; точні per-tier цифри — у Product & Services Catalog (в KB не публікуються). ⚠️
  - ⚠️ ChatGPT: Starter **500** / Pro **3,000** / Ent **5,000** — **не підтверджено офіц. KB** (конфлікт).
- **Reset:** щомісяця за usage-періодом; **невикористані згорають, не переносяться** (no rollover). ✅
- **Overage-моделі:** після купівлі capacity packs — **auto-upgrades** або **pay-as-you-go overages** (білінг щомісяця). ✅
- **Купівля:** Account & Billing → Usage & Limits → Add credits; capacity packs доступні одразу, білінг прорейтований. ✅
- **Governance:** Super/Billing Admins ставлять max місячний ліміт кредитів і вмикають/вимикають overage. ✅
- **Хто споживає:** лише платні місця (Core/Sales/Service/Commerce/Partner). Free + View-Only — ні. ✅
- **Міграція 2–15 червня 2025:** BI Credits 100 / 1,000 / 10,000 → HubSpot Credits **3,000 / 15,000 / 125,000**. ✅
- **Не споживають кредити:** тестування Customer Agent у preview/test, перший 28-денний trial деяких агентів. ✅
- ⚠️ Обов'язкове використання Credits для певних фіч — з 10 листопада 2025 (ChatGPT/KB).

## Вбудовані AI-функції (без/змішані credits)

- **AI email writer / templates** — генерація subject, preview, тіла листа (Sales/Marketing). ✅
- **AI blog post generator** — Content/Marketing Hub; gating ⚠️ (історично Pro+).
- **AI транскрипція + summary дзвінків** — Transcriptions API; Conversation Intelligence + Smart Deal Progression. ✅ (існує), gating ⚠️ (ймовірно Pro+/Ent).
- **Predictive lead scoring** (Likelihood to close / Contact priority) — **Marketing Hub Ent + Sales Hub Ent**. ✅
- **Conversation Intelligence** — історично Sales Hub Enterprise; поточний gating ⚠️.
- **Data enrichment** — автозаповнення полів контакту/компанії. ✅

## AI-чатбот / Chatflows

- **Customer Agent** деплоїться в live chatflow як перша лінія, з knowledge sources + правилами ескалації. ✅
- Розрізнення rule-based vs AI-bot зберігається; tier-gating (напр. Service Pro+ для кастомних ботів) ⚠️.

## Breeze Agent API / програмний доступ

- **Run Agent** (workflow-дія): запускає Breeze-агентів у workflows, повертає text/structured output для наступних дій. Ліміт **500 виконань/день на дію**. ✅
- ❌ **Окремого публічного REST API «Breeze Agent»** немає (станом на червень 2026). Оркестрація — через workflows, Breeze Studio, **HubSpot MCP Client**. ✅
- **MCP-інтеграція:** HubSpot MCP Client підключає Breeze-агентів до зовнішніх систем через Model Context Protocol; промпти конфігуруються в Breeze Studio. Spring 2026: нові конектори (G2, Gong, Amplitude). ✅

**Джерела:** knowledge.hubspot.com/ai/understand-breeze | knowledge.hubspot.com/ai-tools/use-breeze-ai | knowledge.hubspot.com/customer-agent/set-up-the-customer-agent | knowledge.hubspot.com/account-management/understand-hubspot-credits-and-billing | knowledge.hubspot.com/workflows/run-agents-using-workflows | knowledge.hubspot.com/integrations/customize-breeze-agents-with-hubspot-mcp-client | hubspot.com/company-news/spring-2026-spotlight
