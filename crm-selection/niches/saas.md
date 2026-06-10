# CRM для SaaS / продуктових software-компаній (UA-команди, 2025–2026)

> **Джерела:** 10+ веб-пошуків, 15+ джерел 2025–2026: SaaStr, G2, Vendr, офіційні сайти, Capterra, The CS Cafe, Knowlee, Mixpanel blog, Oliv.ai.
> **Дата дослідження:** червень 2026.

---

## ВСТУП: SaaS — це стек, а не один продукт

У SaaS/software-компаніях **CRM — лише один шар із чотирьох**. Ніхто не закриє всі потреби одним інструментом:

| Шар | Що покриває | Приклади систем |
|-----|-------------|-----------------|
| **CRM** | Воронка, угоди, контакти, pipeline, звіти | HubSpot, Salesforce, Attio, Pipedrive, Close |
| **Білінг** | Підписки, MRR/ARR, dunning, invoice | Stripe, Paddle, Chargebee |
| **Product Analytics / CDP** | Usage events, retention, PQL | Mixpanel, Amplitude, Segment, June.so |
| **Customer Success (CS)** | Health score, renewals, onboarding, NRR | Gainsight, Vitally, ChurnZero, Planhat |
| **Sales Engagement** | Email sequences, cadences, LinkedIn outreach | Outreach, Salesloft |
| **Conversation Intelligence** | Запис дзвінків, coaching, forecast | Gong, Chorus (ZoomInfo) |

> ⚠️ **Головна помилка при виборі CRM для SaaS:** чекати, що одна система закриє всі шари. Правильне питання: *«Який є мій основний стек і що потрібно інтегрувати?»*

---

## СЕГМЕНТИ БІЗНЕСУ

- **A. B2B SaaS:** продажі за підпискою, MRR/ARR, inbound + outbound
- **B. PLG SaaS:** product-led, self-serve, trial→paid, freemium
- **C. Sales-led / Enterprise SaaS:** демо, довгий цикл, AE/SDR, buying committee
- **D. Мобільний / B2C SaaS-застосунок:** підписки, churn, великий обсяг
- **E. Software product company / стартап:** змішана модель

---

## ТАБЛИЦЯ ПОРІВНЯННЯ: CRM-СИСТЕМИ

> Позначки: ✅ нативно | 🔌 через інтеграцію | ⚠️ частково/лише старші тарифи | ❌ відсутнє | 💰 платний add-on

### Клас: CRM (основний шар — pipeline, угоди, контакти)

| Критерій | **HubSpot Sales Hub** | **Salesforce Sales Cloud** | **Attio** | **Close** | **Pipedrive** |
|---|---|---|---|---|---|
| **Клас системи** | CRM + Marketing + CS lite | CRM + AI Agents ecosystem | CRM (data-first, API-first) | CRM + Sales Engagement | CRM (pipeline-focused) |
| **B2B воронка inbound+outbound** | ✅ повна | ✅ повна | ✅ + custom objects | ✅ (фокус на outbound) | ✅ |
| **MRR/ARR-облік** | 🔌 custom properties + Stripe/Chargebee | ✅ Revenue Cloud (add-on) | 🔌 custom fields + API | ❌ | ❌ |
| **PLG / PQL тригери** | ⚠️ через Operations Hub | ⚠️ через Einstein + Segment | ✅ API-first, custom objects | ❌ | ❌ |
| **CS / Health Score** | ⚠️ Service Hub (окремий продукт) | ⚠️ Service Cloud (окремий) | ❌ | ❌ | ❌ |
| **Outbound sequences** | ✅ Professional+ | 💰 потрібен Outreach/Salesloft | ❌ нативно | ✅ (сильна сторона) | ⚠️ Growth+ |
| **Email + LinkedIn** | ✅ email; 🔌 LinkedIn Sales Nav | 🔌 LinkedIn Sales Nav | 🔌 enrichment | ✅ email + 🔌 LinkedIn | ✅ email + 🔌 |
| **Buying committee / stakeholders** | ✅ Contacts per deal | ✅ Opportunity Contact Roles | ✅ custom relationships | ⚠️ базово | ⚠️ |
| **Stripe/Chargebee/Paddle** | ✅ native integrations | ✅ глибока інтеграція | 🔌 API/Zapier | 🔌 | 🔌 |
| **Mixpanel/Amplitude/Segment** | 🔌 Operations Hub | 🔌 Salesforce Connector | 🔌 API-first | ❌ | ❌ |
| **Мультивалюта USD/EUR** | ✅ Professional+ | ✅ | ✅ | ✅ | ✅ Growth+ |
| **MRR-аналітика в CRM** | ⚠️ через custom reports + інтеграцію | ✅ Revenue Intelligence | ⚠️ custom reports | ❌ | ❌ |
| **Conversation Intelligence** | 🔌 Gong/Chorus | 🔌 Gong/Chorus/Clari | 🔌 | ✅ built-in call recording | 🔌 |
| **AI: lead scoring / forecast** | ✅ Breeze AI (Pro+) | ✅ Agentforce, Einstein | ✅ AI Attributes (Plus+) | ⚠️ AI Email (Growth+) | ⚠️ AI (Premium+) |
| **Мобільний застосунок** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Ціна (per seat/міс, annual billing)** | $15–$150 | $25–$350 | Free–$86+ | $19–$149 | $14–$79 |
| **Англомовний інтерфейс** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Українська мова** | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Складність впровадження** | Середня–висока | Висока (потрібен RevOps) | Низька–середня | Низька | Низька |
| **Юрисдикція** | США ✅ | США ✅ | Великобританія ✅ | США ✅ | Естонія/США ✅ |

---

### Деталі цін CRM (станом на 2025–2026, annual billing)

**HubSpot Sales Hub:**
- Free: безкоштовно (обмежений функціонал)
- Starter: ~$15–20/seat/міс
- Professional: ~$100/seat/міс + обов'язковий onboarding $1,500
- Enterprise: ~$150/seat/міс + onboarding $3,500
- Джерело: HubSpot blog + Kixie, травень 2026

**Salesforce Sales Cloud:**
- Starter Suite: $25/seat/міс
- Pro Suite: $100/seat/міс
- Enterprise: ~$175/seat/міс (після підвищення 01.08.2025 +6%)
- Unlimited: ~$350/seat/міс
- ⚠️ API доступ лише з Enterprise+
- Джерело: Salesforce pricing update announcement, 2025

**Attio:**
- Free: 3 users, 50,000 records, 250 AI credits/міс
- Plus: ~$36/seat/міс, 1,500 AI credits/міс
- Pro: ~$86/seat/міс, custom objects, advanced permissions, 10,000 AI credits/міс
- Enterprise: custom
- ⚠️ Оновлення цін: липень 2025
- Джерело: Attio Help Center (plan-pricing-changes-april-2025)

**Close CRM:**
- Solo: $19/seat/міс
- Essentials: $49/seat/міс
- Growth: $109/seat/міс (email sequences + Power Dialer + AI Email)
- Scale: $149/seat/міс (predictive dialing, call coaching, roles)
- -35% при annual billing
- Джерело: Close.com pricing PDF, G2, 2025

**Pipedrive (ребрендинг кінець 2025):**
- Нові назви: Lite ($14) → Growth ($39) → Premium ($59) → Ultimate ($79)
- Старі назви: Essential → Advanced → Professional/Power → Enterprise
- Немає free tier; 14-денний trial
- Джерело: Pipedrive Knowledge Base "new-pipedrive-plans", 2025

**Folk CRM:**
- Standard: $24/seat/міс (annual) / $30 monthly
- Premium: $48/seat/міс (annual) / $60 monthly — sequences, deals, dashboard
- Custom: від $80/seat/міс
- Немає free tier; 14-денний trial
- Джерело: Folk pricing page, G2, 2026

---

## ТАБЛИЦЯ ПОРІВНЯННЯ: CUSTOMER SUCCESS ПЛАТФОРМИ

| Критерій | **Gainsight** | **Vitally** | **ChurnZero** | **Planhat** |
|---|---|---|---|---|
| **Клас** | CS платформа | CS платформа | CS платформа | CS + Revenue платформа |
| **Для кого** | 1000+ клієнтів, Enterprise | 100–1000 клієнтів, mid-market SaaS | Retention-first, renewals | NRR-focused, гнучка дата |
| **Health Score** | ✅ найпотужніший | ✅ + PLG integrations | ✅ ChurnScore (ML-алгоритм) | ✅ гнучкий |
| **Renewals / expansion** | ✅ | ✅ | ✅ (фокус на churn prevention) | ✅ (фокус на NRR) |
| **Segment / Mixpanel / Amplitude** | 🔌 | ✅ нативно | 🔌 | 🔌 |
| **PLG-friendly** | ⚠️ складно | ✅ найкраще | ⚠️ | ✅ |
| **AI функції** | ✅ Copilot, AI Success Plans | ✅ AI health signals | ✅ ChurnScore ML | ⚠️ |
| **Час впровадження** | 2–6 місяців | 1–4 тижні | 4–8 тижнів | 2–6 місяців |
| **Ціна (орієнтовно)** | $60K+/рік | $18K–$45K/рік | $20K–$40K/рік | Enterprise (quote only) |
| **NRR impact** | ✅ | ✅ | ✅ | ✅ |

> **Дані:** 2025 Customer Revenue Leadership Study: CS-платформи дають NRR ~100% vs 94% без них.
> Покупці часто отримують 20–35% знижку від початкових прайсів Vitally.

---

## ТАБЛИЦЯ ПОРІВНЯННЯ: БІЛІНГ-СИСТЕМИ

| Критерій | **Stripe Billing** | **Chargebee** | **Paddle** |
|---|---|---|---|
| **Клас** | Payment processor + billing | Subscription management | Merchant of Record |
| **MRR/ARR tracking** | 🔌 потрібен ChartMogul/webhook | ✅ нативно | ✅ |
| **Dunning** | ✅ basic | ✅ розширений | ✅ |
| **CRM інтеграція** | 🔌 webhooks/Zapier | ✅ глибока (HubSpot/Salesforce) | 🔌 |
| **VAT/податки глобально** | ❌ ваша відповідальність | ❌ ваша відповідальність | ✅ бере на себе |
| **Ціна** | 0.5–0.8% від транзакцій | $249/міс (до $100K MRR) | ~5% + $0.50 per transaction |
| **Рекомендовано при** | До $50K MRR | $50K+ MRR | Глобальні продажі без юр. особи |
| **UA-специфіка** | ⚠️ потрібен non-UA бізнес-акаунт | ✅ глобально | ✅ особливо для EU/US продажів |

---

## ТАБЛИЦЯ ПОРІВНЯННЯ: PRODUCT ANALYTICS / CDP

| Критерій | **Segment (Twilio)** | **Mixpanel** | **Amplitude** | **June.so** |
|---|---|---|---|---|
| **Роль у стеку** | CDP / «сантехніка» PLG | Product Analytics | Product Analytics | PLG Analytics B2B SaaS |
| **CRM ↔ product sync** | ✅ двосторонній | 🔌 через Segment | 🔌 через Segment | ✅ company-level |
| **PQL scoring** | ✅ через Personas | ⚠️ custom setup | ⚠️ custom setup | ✅ built-in |
| **Slack alerts на PQL** | 🔌 | 🔌 | 🔌 | ✅ 2 кліки |
| **Ціна** | Free (до 1K users) → $120+/міс | Free → $28/міс → Enterprise | Free → $61/міс → Enterprise | Free → $149+/міс |
| **Для кого** | Будь-який PLG стек | SaaS з product-centric аналітикою | SaaS з behavioral analytics | B2B SaaS early-stage PLG |

---

## ТОП-3 РЕКОМЕНДАЦІЇ ПО СЕГМЕНТАХ

### A. B2B SaaS ($1M–$10M ARR, inbound + outbound)

| # | Система | Чому |
|---|---------|------|
| 🥇 | **HubSpot Sales Hub Pro** + Chargebee | Стандарт для SaaS $1M–$10M ARR. Одна платформа для marketing + sales. Chargebee дає нативний MRR sync. Breeze AI для scoring і forecast. Onboarding $1,500. |
| 🥈 | **Attio Pro** + Stripe + Vitally | Сучасний вибір для tech-savvy команд. API-first, custom objects під SaaS-метрики. Легке впровадження. Популярний у AI-native компаній (Lovable, Granola, Modal, Replicate). |
| 🥉 | **Pipedrive Premium** + Stripe + ChartMogul | Бюджетний варіант. Хороша воронка, мультивалюта. Без нативного MRR — ChartMogul дає dashboard поверх Stripe. |

### B. PLG SaaS (self-serve, trial→paid, freemium)

| # | Система | Чому |
|---|---------|------|
| 🥇 | **HubSpot + Segment + Mixpanel** | Operations Hub синхронізує product events як тригери для CRM workflows. PQL → sales handoff через lifecycle stages. |
| 🥈 | **Attio + Segment + June.so** | API-first для custom PLG pipeline. June.so дає company-level analytics без складного налаштування. Attio Free для старту. |
| 🥉 | **Salesforce + Amplitude + Gainsight** | Для PLG-компаній $10M+ ARR. Складно і дорого, але найпотужніше. |

### C. Sales-led / Enterprise SaaS (довгий цикл, AE/SDR, buying committee)

| # | Система | Чому |
|---|---------|------|
| 🥇 | **Salesforce Enterprise** + Outreach + Gong | Enterprise-стандарт. Agentforce AI. Opportunity Contact Roles для buying committee. Найширша GTM-агентська екосистема (Qualified, Artisan, Momentum, Agentforce). |
| 🥈 | **HubSpot Sales Hub Enterprise** + Salesloft + Gong | Уникнути складності Salesforce. Sequences + CI через інтеграції. $150/seat/міс. |
| 🥉 | **Close Growth** + HubSpot Marketing | Inside sales команди. Вбудований диалер, sequences, SMS. Дешевше за Outreach. |

### D. Мобільний / B2C SaaS-застосунок (підписки, high-volume churn)

| # | Система | Чому |
|---|---------|------|
| 🥇 | **Chargebee** (центр) + **Amplitude** + HubSpot | Chargebee закриває billing + dunning. Amplitude дає retention cohorts і behavioral analytics. HubSpot для lifecycle marketing automation. |
| 🥈 | **Paddle** (merchant of record) + Mixpanel | Paddle бере на себе VAT і compliance по всьому світу. Ідеально для B2C з глобальними підписками. |
| 🥉 | **Stripe** + ChartMogul + HubSpot | Мінімальний стек для стартапу. ChartMogul дає MRR dashboard поверх Stripe. |

### E. Software product company / стартап (до $1M ARR, mixed model)

| # | Система | Чому |
|---|---------|------|
| 🥇 | **Attio Free→Plus** + Stripe + June.so | Нульова вартість на старті. Free: 3 users, 50K records. June.so PLG analytics без складного налаштування. |
| 🥈 | **HubSpot Free** → Professional | Найщедріший free tier. Масштабується. Знімає ризик ранньої інвестиції. |
| 🥉 | **Close Essentials** ($49/seat) + Stripe | Якщо фокус — outbound sales. Вбудований диалер, sequences, SMS з коробки. |

---

## БЛОК: ПІДПИСКИ / MRR / RENEWALS / EXPANSION

### Що закриває CRM, а що — суміжні системи

```
STRIPE/CHARGEBEE/PADDLE        CRM (HubSpot/Salesforce/Attio)
  ├── MRR розрахунок     ←→    ├── pipeline stage
  ├── dunning                  ├── renewal deal  
  ├── invoice/receipt          ├── upsell opportunity
  ├── upgrade/downgrade        ├── customer contact
  └── churn event       ←→    └── trigger → CS handoff
                ↕
         (двостороння синхронізація)
```

### Схема трекінгу MRR у CRM

- **Chargebee → HubSpot:** нативний коннектор. Синхронізує: new MRR, expansion MRR, contraction MRR, churned MRR → custom properties на контакті та угоді. **Найглибша інтеграція.**
- **Stripe → HubSpot/Salesforce:** через webhooks або Zapier/Make. Потрібен custom setup або ChartMogul як проміжний шар. MRR Dashboard Stripe — не нативний, потрібен ChartMogul/Baremetrics.
- **Paddle:** merchant of record — бере на себе VAT і compliance. Інтеграція через API/webhooks.
- **Chargebee:** $249/міс для MRR до $100K → рекомендований при $50K+ MRR.

### Renewals у CRM

- **HubSpot:** renewal deal stage у pipeline → automation trigger за 90 днів до закінчення → задача для CSM
- **Salesforce:** Opportunity з типом "Renewal" → рольова модель для CSM
- **Attio:** custom renewal object → workflow trigger

### Expansion revenue (upsell/cross-sell)

- Жодна CRM не трекає expansion автоматично без інтеграції з білінгом
- Правильна архітектура: `Chargebee subscription upgrade event` → CRM update → CS-платформа (Vitally/ChurnZero) = health score оновлення + CSM alert

---

## БЛОК: PLG (PQL, product-usage тригери) + ІНТЕГРАЦІЯ З PRODUCT ANALYTICS

### PLG-конверсія, стан 2025

- PQLs конвертують на **25–30%** (проти ~2–3% для MQL) — 2–3x покращення
- **Тільки 24–25% PLG-компаній** реально впровадили PQL-фреймворк
- AI-driven PQL моделі дають **+35% ефективності** sales при фокусі на high-intent behaviors
- Джерело: Salespanel blog "What is PLG 2025", Optifai PLG Guide

### Типова PLG-архітектура стеку

```
Продукт (usage events)
       ↓
  Segment (CDP) — "сантехніка PLG"
  ├── → Mixpanel/Amplitude (product analytics)
  ├── → HubSpot/Attio (CRM — PQL trigger)
  ├── → Customer.io/Braze (lifecycle comms)
  └── → Snowflake/BigQuery (data warehouse)
```

### High-intent PQL-сигнали (що трекати)

- Генерація API ключа
- Запрошення члена команди
- Встановлення інтеграції
- Перевищення usage threshold
- Повторні логіни протягом 7 днів
- Активація ключової фічі

### CRM + PLG по платформах

| CRM | PLG підтримка | Деталі |
|-----|--------------|--------|
| **HubSpot + Operations Hub** | ✅ | Segment → HubSpot через native connector → workflow на basis of custom event property |
| **Attio** | ✅ найкраще для стартапів | API-first = будь-який product event через REST API → trigger automation. Custom objects під PLG pipeline |
| **Salesforce + Einstein** | ✅ але дорого | Для $5M+ ARR PLG. Segment Connector. Складно налаштувати |
| **June.so** | ✅ спеціалізований | B2B SaaS PLG analytics. Company-level metrics з коробки. Slack alerts за 2 кліки. Free → $149+/міс |
| **Pipedrive / Close** | ❌ | Немає PLG-підтримки |

---

## БЛОК: OUTBOUND SEQUENCES + CONVERSATION INTELLIGENCE

### Sales Engagement платформи (НЕ CRM, окремий шар)

**Стандартний GTM-стек enterprise SaaS:**
- **Top-of-funnel:** Outreach — outbound sequences, SDR workflow, meeting booking
- **Mid/Bottom-funnel:** Gong — call recording, deal inspection, forecast

#### Outreach vs Salesloft (2025–2026)

| | **Outreach** | **Salesloft (Clari Group)** |
|---|---|---|
| Email sequences | ✅ | ✅ |
| AI агенти | ✅ Omni (квітень 2026): Meeting Prep Agent, Knowledge beta, Sequential Dialing | ✅ 26 AI-агентів Rhythm (травень 2025); AI Email Assistant (травень 2026) |
| MCP ecosystem | ✅ Anthropic MCP (лютий 2026), ISO/IEC 42001 (липень 2025) | ✅ MCP Server + Agentic add-on (квітень 2026) |
| Вбудована CI | ✅ Kaia | ✅ через Drift Conversation IQ (придбано лютий 2024) |
| Ціна (estimate) | ~$100–150/seat/міс | ~$75–125/seat/міс |
| Краще для | SDR/AE enterprise workflows | Retention + renewal plays |

### Conversation Intelligence

#### Gong (станом на 2025–2026)

- Лідер ринку revenue intelligence
- Записує, транскрибує та аналізує дзвінки, email, зустрічі
- AI: deal risk signals, rep coaching, forecast accuracy на базі conversational data

**Ціна (нова модульна структура, березень 2025):**
- Foundations: ~$1,600/seat/рік + **обов'язковий platform fee**
  - Small teams (<50 users): $5K–$10K/рік platform fee
  - Mid-market (50–250 users): $15K–$30K/рік
  - Enterprise: $30K–$50K+/рік
- Bundled (з Engage + Forecast): ~$2,880–$3,000/seat/рік

> ⚠️ **Підводний камінь:** Platform fee зріс з $10K до $50K для enterprise у березні 2025. Реальна вартість для команди 10 осіб ≈ $16K/рік seats + $5–10K platform = **$21–26K/рік**.

#### Chorus (ZoomInfo Copilot)
- Інтегрований у ZoomInfo Copilot з 2024
- Доступний як частина ZoomInfo Enterprise
- Альтернатива Gong для тих, хто вже використовує ZoomInfo для enrichment

---

## БЛОК: AI-ФУНКЦІЇ — ЩО РЕАЛЬНО ПРАЦЮЄ 2025–2026

### HubSpot Breeze AI ✅ реально, включено в Professional+

- **Breeze Copilot:** генерація email, summary угод, підготовка до дзвінків
- **Breeze Agents:** Prospecting Agent (автоматична персоналізація outbound), Customer Agent (підтримка), Data Agent
- **Breeze Intelligence:** data enrichment, buyer intent на базі web activity
- **Lead scoring:** поведінковий + demographic scoring на Professional+
- Breeze Credits: окрема оплата для агентів понад включений ліміт

### Salesforce Agentforce ✅ найпотужніший AI-стек 2025–2026

- **Agentforce 1 Sales:** AI sales agents, autonomous prospecting
- **Einstein Lead Scoring:** ML-score на базі historical win rates
- **Revenue Intelligence:** MRR/ARR forecasting
- **GTM Agent Ecosystem:** Qualified, Artisan, Momentum, Clari, Agentforce — найширша екосистема
- Ціна: $2/conversation або Enterprise bundle
- Джерело: SaaStr "Which CRM 2026–2027: Follow the Agents"

### Attio AI Attributes ✅ корисна інновація

- Custom AI-поля на будь-якому об'єкті (people, companies, deals, custom objects)
- Автоматично заповнюються через AI на базі контексту
- Доступно з Plus ($36/seat)
- Для SaaS: поля "ICP score", "churn risk", "expansion signal", "PQL score" — AI заповнює автоматично

### Gong AI ✅ зрілий продукт

- Автоматичне визначення deal risk зі сигналів розмов
- Coaching recommendations per rep
- Forecast accuracy на базі conversational signals
- Identify next best action по угоді

### CS-платформи AI ✅ практичний NRR-захист

- **ChurnScore (ChurnZero):** ML-алгоритм health score — найнастроюваніший у класі після Gainsight
- **Gainsight Copilot:** AI-генерація Success Plans, automated playbooks
- **Vitally:** AI health signal detection, automated Slack alerts

### PLG AI: що реально 2025

- **PQL scoring через Madkudu/Clearbit:** реально працює, +35% ефективності sales
- **Predictive churn через Amplitude/Mixpanel:** early warning signals для CS
- **June.so:** автоматичні Slack alerts при PQL-сигналах, company-level scoring

---

## РЕКОМЕНДОВАНИЙ МІНІМАЛЬНИЙ СТЕК ПО СТАДІЯХ

### Seed (до $500K ARR)
```
CRM:       Attio Free/Plus або HubSpot Free
Billing:   Stripe (+ ChartMogul free tier)
Analytics: June.so free
CS:        Немає — засновник сам веде CS
Бюджет:    ~$0–150/міс
```

### Early ($500K–$2M ARR)
```
CRM:       HubSpot Sales Hub Starter/Pro або Attio Pro
Billing:   Chargebee ($249/міс)
Analytics: Mixpanel Growth + Segment
CS:        Vitally Starter або відсутня
Бюджет:    ~$800–2,500/міс
```

### Growth ($2M–$10M ARR)
```
CRM:              HubSpot Sales Hub Pro або Salesforce Pro
Billing:          Chargebee
Analytics:        Amplitude + Segment
CS:               Vitally або ChurnZero
Sales Engagement: Outreach або Salesloft
Бюджет:           ~$5,000–15,000/міс
```

### Scale ($10M+ ARR)
```
CRM:              Salesforce Enterprise
Billing:          Chargebee або Stripe Custom
Analytics:        Amplitude Enterprise + Segment
CS:               Gainsight або Planhat
Sales Engagement: Outreach
Conv. Intelligence: Gong
RevOps:           виділена роль обов'язково
Бюджет:           $20,000+/міс
```

---

## ПІДВОДНІ КАМЕНІ + ЗАСТЕРЕЖЕННЯ

### ⚠️ Топ-7 підводних каменів

**1. «CRM закриє все» — найдорожча помилка**
MRR/ARR — це в білінгу (Stripe/Chargebee), не в CRM. Health score — це в CS-платформі (Vitally/ChurnZero), не в CRM. PQL — це product analytics (Segment/Mixpanel) + CRM тригер. CRM = лише один шар.

**2. HubSpot Professional: прихований onboarding fee**
Обов'язковий одноразовий onboarding: Professional $1,500, Enterprise $3,500. Не включений у ціну на сайті.

**3. Gong: прихований platform fee**
Після березня 2025 platform fee зріс до $50K/рік для enterprise. Для малих команд — $5–10K. Порахуй реальний TCO до підпису. Команда 10 осіб = $21–26K/рік реально.

**4. Salesforce: «мертва зона» без RevOps**
Enterprise потребує виділеного Salesforce Admin/RevOps. Без нього система деградує в «дорогу адресну книгу». API доступ лише з Enterprise ($175/seat).

**5. Attio: відсутність native sequences**
Attio — data-first CRM без вбудованих email sequences. Для outbound потрібен Outreach/Close/Salesloft поверх.

**6. Vitally/Gainsight: бюджет на CS-платформу недооцінюють**
Vitally від $18K/рік — це не CRM add-on, це окремий бюджетний рядок. Потрібен виділений CS lead для впровадження.

**7. Stripe як єдине джерело MRR-правди — пастка**
Stripe не дає MRR dashboard з коробки. Потрібен ChartMogul, Baremetrics або Chargebee поверх для нормальної SaaS-аналітики.

---

## УКРАЇНСЬКІ СИСТЕМИ: РЕАЛЬНА ОЦІНКА ПІД SAAS

| Система | Висновок |
|---------|----------|
| **NetHunt CRM** | Хороший CRM для Gmail-команд. **Але:** без нативного MRR/ARR трекінгу, без PLG-підтримки, без sequences для SaaS sales. Підходить для pre-seed як cheap starting point. Масштабувати складно. |
| **KeyCRM** | Орієнтований на e-commerce/ритейл. Не підходить для SaaS-метрик. |
| **Uspacy** | Молода платформа, UAH-pricing. Для SaaS-метрик: немає нічого. Для внутрішньої команди: можливо. |

> **Рекомендація для UA SaaS-команд:** основний стек — глобальний (HubSpot/Attio/Salesforce). UA-системи — лише для внутрішнього helpdesk або додаткові канали. SaaS-продукт продається глобально → CRM також має бути глобальним.

---

## 🚫 ЗАСТЕРЕЖЕННЯ ЩОДО РОСІЙСЬКОГО ПЗ

| Система | Статус | Чому не рекомендувати |
|---------|--------|----------------------|
| **Bitrix24** 🚫🇷🇺 | Заборонено в Україні | Санкції РНБО 2024 до 2033, ФСБ-доступ, дані на серверах РФ |
| **amoCRM / Kommo** 🚫🇷🇺 | Не рекомендується | VK Group (держ. структура РФ) = власник. Законопроект ВРУ 19.08.2024 про заборону. |

Усі рекомендовані системи у цьому звіті — американська або EU-юрисдикція. ✅

---

## ДЖЕРЕЛА

- [SaaStr: Which CRM to use 2026–2027](https://www.saastr.com/which-crm-should-you-use-in-2026-2027-follow-the-agents/)
- [Attio pricing changes July 2025](https://attio.com/help/reference/workspace-settings-billing/plan-pricing-changes-april-2025)
- [Close CRM Plans & Pricing PDF](https://resource-downloads.close.com/website/Close-Plans-Pricing.pdf)
- [Salesforce pricing update August 2025](https://www.salesforce.com/news/stories/pricing-update-2025/)
- [Gong pricing guide 2026 – Oliv.ai](https://oliv.ai/blog/gong-io-pricing)
- [Vitally vs ChurnZero vs Planhat](https://www.vitally.io/post/vitally-vs-churnzero-vs-planhat)
- [PLG metrics guide – Mixpanel blog](https://mixpanel.com/blog/product-led-growth/)
- [Stripe vs Paddle vs Chargebee 2026 – Automaiva](https://automaiva.com/stripe-vs-paddle-vs-chargebee-vs-recurly-saas-2026/)
- [Outreach vs Gong 2026 – Knowlee](https://www.knowlee.ai/compare/outreach-vs-gong)
- [CS platforms comparison 2026 – The CS Cafe](https://www.thecscafe.com/p/best-customer-success-platforms)
- [Gong vs Salesloft 2026 – CirrusInsight](https://www.cirrusinsight.com/blog/gong-vs-salesloft)
- [NetHunt CRM for SaaS](https://nethunt.com/industries/saas-crm)
- [HubSpot Sales Hub pricing](https://blog.hubspot.com/sales/hubspot-sales-hub-pricing)
- [Pipedrive new plans 2025](https://support.pipedrive.com/en/article/new-pipedrive-plans)
- [Folk CRM pricing](https://www.folk.app/pricing)
- [Salespanel: What is PLG 2025](https://salespanel.io/blog/marketing/what-is-product-led-growth/)
- [ChurnZero: CS platform increase NRR](https://churnzero.com/blog/customer-success-platform-increase-nrr/)
- [Best CRM for SaaS 2026 – DesignRevision](https://designrevision.com/blog/crm-for-saas-companies)
