# HubSpot — YouTube Insights (офіційний канал)

> Джерело: 152 транскрипти офіційного YouTube HubSpot (+ «How to HubSpot»/training), зібрані червень 2026. Сирі тексти — у `source-files/`.
> Маркери: ✅ чітко сказано у відео | ⚠️ розпливчасто/маркетинг/можливо застаріло | 🆕 сигнал нової фічі (2026)
> ⚠️ **Кав'ят свіжості:** відео змішані 2023–2026. Туторіали 2024 показують стару назву/UI; курси 2026 — актуальні. При конфлікті — пріоритет 2026 + офіц. доки (`00-08`).

## §0 Ренейми та версійні сигнали (read first)

| Старе | Нове (актуальне) | Джерело |
|-------|------------------|---------|
| **ChatSpot** (standalone chatspot.ai, beta) | **Breeze Assistant** (Copilot у застосунку) | ChatSpot = попередник; Breeze = поточний |
| **Lists** | **Segments** (перейменовано) | 2026 курси 🆕 |
| Operations Hub | **Data Hub** | усі 2026 |
| CMS Hub | **Content Hub** | усі 2026 |
| Content/Image/Social/Reporting/Support **Assistant** | під парасолькою **Breeze** | legacy-назви |
| Chrome-розширення Gmail **+ Outlook** (2024) | **лише Gmail** (2026) | конфлікт → 2026 ✅ |

> ❌ Старі ціни у відео ($20/міс, $3.56/контакт, «1,000 контактів/2 users») — ілюстративні/застарілі; джерело істини — `01-overview-pricing.md`.

## §1 Безкоштовні ліміти (зі скрінкастів — корисно для продажу/демо)

| Ліміт Free | Значення | Джерело |
|------------|----------|---------|
| Користувачів | **2** | ✅ |
| Воронок угод | **1** | ✅ |
| Дашбордів | **3** | ✅ |
| Snippets | **5** | ✅ |
| Marketing emails/міс | **2,000** | ✅ |
| Active Lists / Static Lists | **10 / 1,000** | ✅ |
| Free-автоматизація | 3 точки: списки + **1 дія після email** + **1 email після форми** | ✅ |
| Teams (групи прав) | ❌ Free → **Pro/Ent** | ✅ |
| Workflows (повноцінні) | ❌ Free → **Pro/Ent** | ✅ |

> Free CRM — **назавжди, без картки**; система в контексті показує, який tier розблоковує заблоковану фічу.

## §2 CRM-ядро (об'єкти, властивості, воронки, задачі, імпорт)

- **Об'єкти:** Contacts, Companies, Deals, Tickets + 🆕 **Orders** (e-commerce: Open→Processed→Shipped→Delivered→Cancelled; не sales-order), 🆕 **Projects** (група задач: Planning/On track/Review/Completed/On hold/Cancelled, авто-асоціація з Deal), активності (Calls/Meetings/Tasks), **Segments** (ex-Lists), Playbooks, Templates, Snippets.
- **Авто-асоціація:** контакт з email-доменом авто-створює+лінкує Company (можна вимкнути). **Association labels** («employed by» vs «board member») — **платно**. ✅
- **Властивості:** тип поля — найважливіший вибір; **dropdown-select > вільний текст** для чистої сегментації; деякі дефолти read-only (Create date, first-seen). 💡 **Зберігай дані як властивості, не як нотатки** — лише властивості живлять сегменти/workflow/звіти/персоналізацію. 🆕 створення властивостей через Breeze + **smart properties** (Data Agent).
- **Lifecycle:** Subscriber → Lead → MQL → SQL → Opportunity → Customer → Evangelist (+Other); авто-перехід: створення Deal → Opportunity; Closed Won → Customer. Best practice: **4–7 стадій**. BANT для кваліфікації.
- **Воронки угод:** стадії = колонки; 💡 називай стадії **минулим часом** («Contract sent»). Probability/стадія → forecasting (бери % з **Deal Funnel report**: 2 стадії → conversion rate). 🆕 **Stage properties** — поля спливають і стають **обов'язковими** при перетягуванні в стадію (реп не просуне без заповнення). **Playbooks** авто-заповнюють властивості угоди.
- **Tasks:** ручні (Free) vs авто через Workflows (платно); типи Call/To-Do/Email (авто за назвою); **queues** проти context-switching; дефолт — **3 робочі дні, 8:00**.
- **Імпорт (гочі):** кожна властивість в окремій колонці (не «Ім'я+Прізвище» разом!); 1 чи кілька об'єктів; для зв'язку об'єктів — експортуй з **Record ID** і встав у дочірній файл; «**Don't overwrite**» захищає поля; обов'язковий consent-чекбокс; не імпортуй холодні/куплені бази. 🆕 **Smart Transfer** з Salesforce/Pardot зі збереженням зв'язків (потребує Data Hub).
- 🆕 **Sensitive data** (settings): типи personal/financial/**medical**; medical → декларація HIPAA-covered-entity/BAA; помічене поле = додаткове шифрування + доступ лише авторизованим.

## §3 Breeze AI та ChatSpot

**Архітектура:** Breeze Assistant (розмовний, stateful між інструментами — пам'ятає контекст контакт→контент→редактор; «build a workflow for you») + Breeze Agents (Content=Content Hub, Social=Marketing, Prospecting=Sales, Customer=Service) + Breeze Intelligence (enrich/buyer-intent/form-shortening) + Breeze Studio (білд агентів). Багато фіч **у Free**. ✅

**Breeze Customer Agent (deep dive):** Service Hub **Pro/Ent**; ~15 хв сетап; джерела — файли (PDF/txt) + HubSpot-контент + **публічні URL (авто-оновлення щотижня)**; handoff за **ключовими фразами** («pricing», «cancel», «billing»); канали — live chat, WhatsApp, FB Messenger, calling, email; 🆕 **Actions** — кастомні задачі через API («статус замовлення?», «скинути пароль») = до **50% звернень**; **~60% resolution rate**; performance-таб + **knowledge-gap** (питання без відповіді → додати short answers).

**ChatSpot (legacy, chatspot.ai):** ~40 інтентів; джерела — CRM + Semrush + funding + news + YouTube; admin вмикає/вимикає доступ і обмежує до шаблонів/категорій; ліміти: **no memory**, найкраще **англійською**; SOC 2, дані не тренують моделі. Розділи: Prospecting (discover companies за industry/location/tech/size/age + Add to HubSpot), Company Insights (competitors/tech/funding/profile), News (підписка → email при новині), CRM command line (add/update contact, deal, ticket), Summaries (contact/company/YouTube/podcast), Charts (bar лише для contacts), SEO/PPC keywords, **Ask HubSpot Academy** (6,000+ відео/600+ год → BANT тощо), Bios, Writing Styles (аналіз тону з зразка), Images (**Stable Diffusion XL**, 4 зображення, стилі anime/comic/photoreal…).

**Безкоштовні standalone AI-інструменти** (сильний пітч — «free, anyone in the world»):

| Інструмент | Що робить | URL/нота |
|-----------|-----------|----------|
| **Campaign Assistant** | копірайт для LP/email/Google/FB/LinkedIn ads (тема + меседжі + CTA + 3 стиль-слова) | hubspot.com/campaign-assistant |
| **Brand Kit Generator** | лого, іконки, палітра (PNG/SVG/WebP + PDF бренд-аркуш) | |
| **Clip Creator** | AI-відео з тексту, Shutterstock-стоки → MP4 чи на LP | |
| **Guide Creator** | Chrome-розширення: покрокові гайди зі скрінами кліків (HubSpot/Asana/Jira/Notion) | приватно або «anybody with link» |
| **AI Search Grader** | видимість бренду в LLM = Sentiment + Share of Voice (vs конкуренти) | попередник AEO |
| **AI Website Generator** | сайт + CMS з промпта (стиль) | SSL/CDN/WAF |
| **AI Blog/Content/Email Writer** | Semrush-метрики, inline rewrite/expand/shorten/tone | |

**Платні AI:** Text-to-Speech + Podcasts (**Content Hub Pro**, голоси Alloy/Echo/Fable/Shimmer/Onyx, RSS), Content Remix (платні), Reporting Assistant + AI Forecasting (Sales, super-admin), GPT-чатбот + Support Assistant (Service).

> ⚠️ **Кредити Breeze у цих відео НЕ згадуються** (фрейм free-vs-paid). Точні кредити — лише з офіц. доків (`03-ai-breeze.md`).

## §4 Приклади промптів (ChatSpot / Breeze) — зберегти

**Prospecting:** `find SaaS companies in Massachusetts` · `find media companies founded in 2021 with less than 50 employees` · `companies in Seattle using WordPress and MailChimp` · `companies with less than 50 employees who use HubSpot CRM` · `at least 10 years old and 250+ employees`
**SEO/PPC:** `what keywords does teamwork.com rank for` · `who are the competitors to teamwork.com for SEO` · `what questions do people search about Gantt charts`
**CRM command line:** `create a contact for Derek Jeter at playerstribune.com` · `update Derek's email to …@yankees.com` · `assign Derek's contact to me`
**Контент/блог (паттерн company+topic+CTA):** `create a blog for HubSpot on the value of a connected CRM across customer-facing teams, with a CTA to try HubSpot CRM free`
**Ask Academy:** `best channel for brand awareness when first developing a social strategy?` → Facebook · `how should I coach my team on evaluating budgets?` → BANT
**YouTube→соц (ланцюг):** `summarize this in 60 characters or less, starting with "How to"` → `create a video description … 50 words` → `create three one-word hashtags`
**Breeze Copilot:** `how many deals have I created?` · `write a first draft following up about a trade show` · `make this shorter` · `create a workflow: contact-sales form submitted → send welcome email`
**In-editor (slash):** `/generate paragraph` «engaging invitation to my webinar…» · highlight → «change the tone to more friendly»

## §5 Marketing Hub (тактики + ліміти)

- **Email:** 3 типи — Regular / **Automated** (єдиний доступний у workflow/journey) / Blog-RSS. Метрики: open=opened/delivered, click=clicked/delivered; **HTML click map** (heatmap). ⚠️ ROI «$36–40 на $1» (vendor).
- **Forms:** 5 типів; Embedded vs Standalone; 💡 **гоча дедуплікації** — на повторному сабміті HubSpot перевіряє **cookie перед email** і підставляє відомі поля; увімкнення «**always create contact for new email**» ключується по email → **поля НЕ підставляться** (рекомендовано ON). Payment links прямо на формі.
- **Landing Pages:** Free; Smart Content + A/B (50/50) + custom templates = **Pro/Ent**; **Adaptive test (до 5 варіацій) = Enterprise**; **Hotjar** (free app) — heatmaps/recordings/NPS прямо в контакт-record.
- **CTAs:** pop-up/banner/slide-in/embedded; тригери — клік, скрол, **exit-intent**, час/неактивність.
- **Lists/Segments:** Active (авто join/leave) vs Static (снапшот); обидва — усі tier; **Free 10 active / 1,000 static**. 🆕 **Random samples** (Actions → N чи % → static list для тестів).
- **Marketing Contacts** (білінг з жовт. 2020): платиш лише за marketing-контакти; решта — free storage до 15M; лише marketing можуть отримувати email/SMS/WhatsApp і синкатись у ads; 💡 перемикання в non-marketing застосовується **раз на місяць** на дату оновлення → workflow (bounce/unsub → set non-marketing) звільняє оплачуваний tier.
- **Lead nurture:** journey 3 стадії (Awareness: ebooks/blogs → Consideration: case studies/webinars → Decision: trial/demo/coupon). Приклад workflow: форма → email1 → delay 7д → email2 → delay 4д → email3(coupon) + Goal (lifecycle=Customer). ⚠️ «+41% qualified leads» (vendor). **Make My Persona** — free генератор персон.
- 🆕 **Journey Automation = Marketing Hub Enterprise**: візуальний canvas, green=happy path / red=re-engagement, stage-звіти.

## §6 Канали + Content Hub

- **SEO** (Content→SEO, free): авто-рекомендації, **Topics/pillar-cluster** (MSV + difficulty), **Google Search Console** інтеграція, авто-sitemap; вибір тайтлу показує **MSV + difficulty + intent**.
- **SMS** (Marketing Pro/Ent add-on): реєстрація бізнесу для номера (схвалюють **оператори, не HubSpot**) + явний opt-in; **<300 символів**; **Compare до 10 повідомлень**. ⚠️ стат: 70% відкривають за 5 хв.
- **Ads** (free tool; Google/Meta/LinkedIn/TikTok однаково): 🎁 **новий Google Ads через HubSpot → $500 кредит**. ⚠️ стати: Google +31% лідів/90д, **+25% конверсій**, −12% CPL.
  - **Meta CAPI** (Marketing Pro/Ent): pixel + lead-sync; тригер = lifecycle change або form submission; **consent-property gating** (немає → не шле); event-matching (email+ім'я+phone); ліміт conversion-events (докупити +50). ⚠️ −15% CPL, +19% purchase events.
  - **LinkedIn CAPI:** offline↔online, cookieless; value = deal amount (fallback фікс); → LinkedIn Campaign Manager. ⚠️ **17% більше конверсій** (Enhanced).
- **Social:** FB/IG/X/LinkedIn; Monitor (mentions) + Analyze; cross-post з показом перевищення ліміту символів по мережах.
- **Content Hub:** **Brand Voice** (тон з зразка, per-channel), **Content Remix** (1 ассет → 6 типів, save&reuse «Hub & Spoke»), **Content Agent** (будує цілу LP з формою з ICP), **Podcasts** (AI-голоси + RSS + артворк), **blog narration** (6 голосів), **переклади**, **Approvals**, **Smart Content** (відомі <5% трафіку → персоналізуй решту 95%), **A/B vs Adaptive** (5 варіацій), **HubDB** (1 рядок=1 сторінка, dev для сетапу), **Content Embed у WordPress**, business units, hosting (CDN/SSL/WAF). 🆕 **Members Blog** — cookieless lead-capture (прев'ю до «Read More», повний текст лише залогіненим; проти deprecation cookies + AI-скрейпінгу).
- **Membership** (платно): Access Groups static/dynamic; **SSO через Facebook/Google**; applies до сторінок/блогів/KB/порталу; audit log 90 днів.
- **Commerce/Invoices:** конвертація Deal→invoice; ACH + картка; **HubSpot Payments** чи **Stripe**; workflow (прострочено >10д → email власнику); 🆕 **Credit memos**, **Subscriptions**, **2-way QuickBooks Online sync**.

## §7 Sales Hub

- **Prospecting Workspace:** задачі + sequences + leads + календар + **guided actions** (CRM-intent → пріоритети).
- **Leads** (окремий об'єкт): New→Attempting→Connected→Qualified (авто-перехід по активності); Qualify → **авто-створює deal**; disqualify → причина. **Lead tags** (кольорові), pipeline rules, lead-form routing → авто-enroll у sequence.
- **Sequences** (Pro/Ent): таймовані email + ручні кроки (call/LinkedIn); **до 5,000 sequences**, **500 email/день**, **макс 5 авто-email/sequence**; A/B + step-level аналітика (incl. meeting rate); авто-unenroll при reply/booking. 💡 sequence дозволяє правити перед відправкою, workflow — ні.
- **3 рівні автоматизації:** Templates → Sequences → Workflows (**300+ дій**; rotate/round-robin, email+WhatsApp, enroll у sequence, create deal).
- **Deal:** **Deal score** 0–100 (AI likelihood); deal insights/inspection; **approvals** (до **3 approvers**); per-stage automation (task/internal email).
- **Quotes** (free): branded, trackable URL, expiration, e-sign, HubSpot Payments/Stripe, line items. **Sales Documents** (trackable links). **Playbooks** (Pro/Ent) авто-в CRM.
- **Forecasting:** by Deal Stage vs Forecast Category; для появи юзера — **sales seat + team + forecast-permissions**; Weighted pipeline = open+won × probability; **AI forecast** (most likely + upper + lower, accuracy 1/7/14/21д). ⚠️ Gartner: топ-BDR ~16 дотиків до зустрічі.
- **Meetings:** 1:1 / Group / Round-Robin; платно — **без брендингу + вікно до 11 тижнів** (free = цей+наступний тиждень); Google/O365 sync; AI meeting-prep + follow-up card.
- **Conversation Intelligence:** track terms (competitor/pricing/next steps), talk ratio, longest monologue, pace; **coaching playlists** (кліпи 30с–1хв, @-tag, 1.5×); Breeze «summarize call».
- **Scoring:** HubSpot Score (редаговане ±бали) vs Predictive (не редаговане) vs Likelihood to close (90 днів). ABM: workflow визначає ICP-tiers → tier-specific email.

## §8 Service Hub + чатботи

- **Help Desk:** канали (chat/email/форми/calling/Messenger) → авто-тікет; авто-статус (клієнт пише → «Waiting on us», реп → «Waiting on customer»); кілька воронок + черг навіть на **Starter**; AI tone/expand/summarize.
- **SLA** (Pro/Ent): working hours чи 24/7, по **priority**, SLA-дашборд.
- **Routing:** **capacity-based** (round-robin) vs **skills-based** (теги навичок → лише оснащені репи).
- **KB** (Pro/Ent), **Customer Portal** (Pro/Ent), **Feedback** (Pro/Ent: CSAT 0–2, NPS 0–10, CES 1–7).
- **Chatbots/Chatflows:** Website чи FB Messenger; шаблони — Concierge, **Qualify Leads**, Meeting (лінк має існувати), Tickets, **KB/Support bot (Service Pro/Ent)**, Offline. **Starter** = лише ticket/lead-qual/meeting боти. Блоки: welcome, if/then, **quick replies** (зберігають у CRM-property → стандартизація), send-to-team round-robin. KB-search у чаті = Service **Pro/Ent + ≥3 опубліковані статті**. Live chat (incl. боти) — **free**.

## §9 Workflows + Data (ex-Operations) Hub

- **Workflows = Pro/Ent.** Тригери: event (form), criteria, **schedule** (щопн 8:30), date-anchored. **Re-enrollment** default off → opt-in. Дії: send email (enrolled чи всі associated), delay, if/then, create task, set property. Виконання: вікно + часовий пояс контакта + **blackout dates**. **Goals** (% досягнення). Suppression-lists. **Workflow Alerts** (точна причина помилки → сигнал чистки даних). **Test** mode (відправка лише собі). **Changes** = аудит-лог. Партнерські дії: Zoom/Slack/Asana.
- Object-тригери за tier: ticket/feedback = Service Pro/Ent; quote = Sales Pro/Ent; **custom-object = Enterprise**.
- **Data Hub Pro+:** **Schedule workflows**, **Custom code (Node.js/Python)**, **Data Quality Automation**, **Format Data** (формули; патерн — Copy property назад у джерело для стандартизації), **Webhooks**, **Data Sync** (двостороння, 100+ застосунків).
- **Data Hub Starter:** Property insights (Unused/No data/Duplicates, % fill), record-level format/dup issues, **AI duplicate detection** (review/merge), Data Sync health.
- 🆕 **Buyer intent:** tracking code → Visitors (reverse-IP), Research, Signals → тригери workflow / lead scoring. **Custom events = Marketing Hub Enterprise.**

## §10 Reports & Dashboards

- **120+ шаблонних звітів** на кожному tier (Free→Ent); drill-down, сортовані колонки, фільтри, **leaderboards** (десятки). Named: deal velocity (avg time in stage), win-rate (deals by create date+status), chat avg first-response by rep, ad clicks by network (free CRM + connected ads). **Custom Report Builder = Pro/Ent**; **Goals** (об'єкт + cadence + targets). 💡 funnel-report на marketing-дашборд.
- **Advanced gating:** угода не просунеться в стадію без «Meets Qualification Criteria» (workflow ставить, поле private-to-me → лише workflow редагує, required у стадії).

## §11 Каталог інтеграцій (sync / призначення / стат / tier)

| Інтеграція | Що дає | Стат/нота |
|-----------|--------|-----------|
| **Aircall** | авто-лог дзвінків/SMS, power dialer, тригер по тегу | Marketplace 1,000+ |
| **Gong** | **2-way sync**: правки угод з Gong → назад у HubSpot; транскрипти, coaching | no double entry |
| **Dropbox Sign / PandaDoc** | e-sign, статус у timeline, autofill з CRM | сер. 7 апів; >25% ставлять >10 |
| **Typeform** | conversational forms → contact/deal, lead-scoring правила | Brand Kit = Enterprise |
| **Wistia** | форма у відео, % перегляду в record | **+21% click-throughs** |
| **LinkedIn Sales Navigator** | картка на record, InMail у CRM | **Sales Hub Pro**; warm intro +50% |
| **Sprout Social** | соц-профілі ↔ контакти, тікети з inbox | 2-way |
| **ZoomInfo** | enrich за email/доменом | |
| **QuotaPath / Deal Hub** | комісії / quote-to-revenue + deal room | App Cards |
| **Zoom / On24** | webinar-дані на timeline | |
| **Salesforce / Segment / Supermetrics** | sync лідів/скорів / clean data / дані в Sheets | no-dev |
| **Intercom** | авто-створення контактів, транскрипти як активності, тригер «Intercom conversations» | |
| **WordPress / Webflow** | форми/чат/аналітика, content embed | Content Hub |
| **Google Ads Audiences** | CRM-список → Google аудиторія | список **≥1,000 контактів**, не куплений, marketing; sync **24–48 год** |

🆕 **App Cards** — marketplace-апи прямо на records (QuotaPath, PandaDoc, Arrows-онбординг, Sendoso-гіфтинг) без перемикання вкладок.

## §12 Spring 2026 Spotlight + партнерські кейси

**Spotlight (детальні walkthrough'и):**
- **Build (AEO):** видимість бренду в AI-відповідях + *чому* (які джерела цитують vs ні); приклад 15%→45% присутності. **Loop Marketing** + Breeze пише контент у джерела, що AI вже цитує.
- **Grow (Prospecting Agent):** ловить buying signals (напр. 25-річчя компанії) → buying committee → enrich CRM → персональні email → бронює demo. **Smart Deal Progression:** після дзвінка пропонує апдейти угоди (напр. бюджет $30k), **кожна пропозиція цитує транскрипт**, draft follow-up.
- **Scale (Customer Agent):** 24/7, draft з docs на рев'ю, ескалація складного (bug/billing/злий клієнт), graduated autonomy 10%→25%→40% нічного об'єму. ⚠️ стати: «142 off-hours requests, 89 drafts до 10:00», «+25% тікетів», «до **65%** автоматично», 28-дн trial.

**Партнерські кейси (⚠️ vendor-цифри):** Avidly — AI-агент клієнта зекономив **~22 FTE** + став cross-sell; чистка даних «**мінімум 10×**» швидше. Cargas — ~20% US propane-доставки на їхньому ERP. Manobyte — крос-платформ агенти, 5 апів на маркетплейсі, «agents are the new apps». Fuelius — лондонський івент: **14 → 12 клієнтів HubSpot за 3 міс**; GDPR блокує де-анонімізацію сайту (на відміну від US). **IDC: екосистема HubSpot = $30B можливість до 2028** (~$10B — AI-послуги).

## §13 Каталог відео (152, згруповано)

**CRM-ядро (15):** What Is HubSpot CRM · Smart CRM & Free Tools · 4 Types of CRM · CRM FULL Beginners Tutorial 2026 · CRM Tutorial for Beginners 2026 (Step-by-Step) · CRM Tutorial Complete Training Course · Set Up CRM for Small Business · Organize Customer Data · Set Up A Company · Customize Deal Pipeline (L1) · Manage Deals Pipeline (Properties & Playbooks) · HubSpot Tasks · Is HubSpot Actually Free · Store Sensitive Data

**Breeze/ChatSpot/AI (37):** Official Breeze AI Tutorial · Breeze Customer Agent · Meet ChatSpot (INBOUND 2023) · Most Popular ChatSpot Prompts · ChatSpot: Content Summaries / Bios / Images / Growth Charts / Adding Records / Update Records & Owners · Company & Market Research · Find New Prospects · SEO & PPC Keyword Research · Get Answers From 600 Hours Academy · Summarize contacts/YouTube/podcasts · Generate on-brand blog/email · Writing A Blog Post · Supercharge Blogging · How HubSpot's AI tools boost MSS · Business Reinvention · Boosting Customer Service Productivity · Unlocking Sales & Marketing Insights · Revolutionize Marketing Campaigns · Campaign Assistant · Brand Kit Generator · Clip Creator · Guide Creator · AI Search Grader · Create A Website in Minutes with AI · 10 AI Content Marketing Tools · FREE AI Content Writing Tool · Generate AI Images (Website) · How To AI-Generate YouTube Descriptions · Create 4 Blog Posts in 1 Hour · Text-To-Speech · How to use AI to Write an Email

**Marketing-ядро (26):** Official Marketing Hub Tutorial · Marketing Hub Beginners (2024) · Marketing Hub Starter · Starter Customer Platform · Email Marketing Tutorial/Explained/Master · Cold Emails · Email Signature · Landing Page (High-Converting / FREE Builder / Hotjar / Advanced Features) · Build a Form in 5 Steps · Active Lists / List Segmentation · Marketing Contacts & Lists · Lead Generation (2024 / Master) · Lead Management (Free CRM / 2024) · Lead Nurturing (Works / with Automation) · Marketing Automation (Free / Complete Guide) · Journey Automation

**Канали+Content (24):** Official Content Hub Tutorial · Content Hub Walkthrough · CMS Tutorial · Free Website Builder · Free Business Website · Membership Sites · SEO with HubSpot · SMS (Tutorial / Increase Conversions) · Ads Management · Structure Ad Campaign · Google Ads (Boost 25%) · Meta Ads (Reach Higher Quality / Form Data) · LinkedIn Conversions API · Social Media Management · Blogging (Start 2024 / Zero Experience / Ideas Generator / AI for Blogging) · Create Forms (Free) · Import Contacts · Ecommerce Email Marketing · Invoices (Commerce Hub)

**Sales+Інтеграції+Spotlight (36):** Official Sales Hub Tutorial · Sales Hub Beginners / Starter · 18 New Sales Hub Features · Sales Automation · Consistent Sales Process · Sales Forecasts · Manage Leads & Prospecting · Your Sales Funnel Strategy · Meeting Tool Advanced / Save Hours Scheduling · Time-Saving Sales Training · Secret to Sales-Marketing Email Automation · Automate Marketing-Sales Alignment · Gong · Integrations: Aircall / Dropbox Sign / PandaDoc / Typeform (×2) / Sprout Social / Wistia / LinkedIn Sales Navigator · Essential Apps (Marketers/Sales/Content) · App Cards · Google Ads (First-Party Data / Enhanced Tracking 17%) · Spring 2026 Spotlight (Build/Grow/Scale) · Partners: Cargas / Manobyte / Avidly / Fuelius

**Service+Reports+Automation (14):** AI-Powered Customer Service · Service Hub Overview / Starter · Live Chat (Increase Conversions / Set Up in 5 min) · Chatbot (FREE Tool / Make Your Own) · Reports & Dashboards · Workflows COMPLETE Guide · Operations Hub Starter · Workflows with Ops Hub · Advanced Pipeline Management · Intercom · Essential Apps for Service

**Джерела:** офіційний YouTube-канал HubSpot + HubSpot Academy (152 транскрипти у `source-files/`). Verbatim-стати — vendor-цитати ⚠️. Технічні факти/ліміти — ✅, але звіряй tier/UI з `00-08` і офіц. доками при конфлікті версій.
