# HubSpot — No-code налаштування (адміністратор)

> Актуально: червень 2026 (Deep Research). Маркери: ✅ офіц. | ⚠️ число у PST/вторинне | ❌ застаріло. Завжди вказано Hub + Tier.

## Перші кроки

Налаштувати Account settings (мова, регіон/часовий пояс, валюта, фіскальний рік) → підключити домени (Content/Marketing) → воронки, властивості, користувачі/команди → інтеграції. ⚠️ Єдиного офіц. чек-листа немає; in-app guided setup існує.

## CRM-об'єкти та зв'язки

| Об'єкт | Доступність |
|--------|-------------|
| Contacts, Companies, Deals, Tickets, Products, Line Items | Free+ ✅ |
| **Custom Objects** | **Enterprise** ✅ |

- **Lifecycle stages** (порядок): Subscriber → Lead → MQL → SQL → Opportunity → Customer → Evangelist → Other. ✅
- Перша асоційована компанія = **primary** за замовч.; єдина асоціація контакт-компанія має бути primary. ✅
- Мітку **«Primary»** мають усі акаунти; **кастомні association labels — Pro/Ent** ✅ (працюють для всіх об'єктів, у т.ч. custom).
- [Pro/Ent] Lifecycle stage компанії може авто-синкатись на пов'язані контакти. ✅

## Воронки та прогноз

- Нову воронку можна створити на **Starter/Pro/Ent** (не Free). ✅
- **Ліміт воронок/акаунт:** Free/Starter **2**, Pro **15**, Ent **100**. ⚠️ (PST-сніпет)
- [Enterprise] правила воронок для custom objects; [Pro/Ent] обмеження доступу до воронок. ✅
- **Lead scoring:**
  - **HubSpot score** (traditional, ручні критерії) — **Marketing Hub Pro/Ent**. ✅
  - **Predictive** (Likelihood to close + Contact priority) — **Marketing Hub Ent + Sales Hub Ent**. ✅
  - ❌ Стара «Predictive Lead Score / Lead rating» не оновлюється з 21.12.2018.
- **Forecast tool:** лише **Sales/Service Hub Pro/Ent**. ✅
- **Goals:** Starter — лише Revenue; Pro/Ent додають Deals created, Calls made, Meetings booked. ✅

## Ролі та права

- **Super Admin** — Users & Teams → Make Super Admin. ✅
- **Permission sets** (повторювані набори) — **Pro/Ent**. ✅
- **Team hierarchy** (вкладені/parent-команди) — **Enterprise**; parent бачить усе нижче, nested не бачать parent. ✅
- **«Тільки свої записи»:** object permission «owned by user»; «team they own» розширює на команду. ✅

## Marketing Hub (no-code)

- **Форми:** є GDPR-секція (notice & consent); форма як канал Conversations. ✅
- **Landing Pages A/B:** split-URL 50/50 + adaptive — **Pro+** ⚠️.
- **Списки:** Active (авто) vs Static (фіксовані) — Free+. ✅
- **Email send limit:** Starter **5×** контактного tier, Pro **10×** ⚠️ (вторинне). Кожен одержувач = 1 send; скидається щомісяця. ✅
- **Реклама:** Facebook/Instagram, LinkedIn, Google, **TikTok** — Marketing усі рівні (вкл. Free); Starter+ додає lookalike-аудиторії. ✅

## Sales Hub (no-code)

- **Sequences:** потрібен **Sales seat**; **10 шаблонів листів/sequence** (task-нагадування безліміт); bulk-enroll ≤3 листи/хв; **денний send: Pro 500/день, Ent 1,000/день** (rolling 24h). ✅
- **Meetings:** round-robin/командні сторінки — **Sales/Service Starter+**. ✅
- **Playbooks:** **Sales/Service Pro/Ent** (+seat & permissions). ✅
- **Quotes / CPQ:** ⚠️ **МІГРОВАНО** — нове **AI-CPQ потребує Commerce Hub Pro/Ent**; advanced approvals — Commerce Ent. Legacy Sales-quotes лише для старих акаунтів. ✅
- Templates/snippets числові ліміти — ⚠️ PST.

## Service Hub (no-code)

- **Help Desk / Ticket inbox** — ✅.
- **Knowledge Base:** **Pro = 1 KB, 2,000 статей**; **Ent = 25 KB, 10,000 статей**. ✅ *(прежнє «25/100» ❌)*
- **Customer Portal** — потребує Service paid (tier ⚠️). ✅
- **Feedback survey:** потрібен Service seat; **NPS (0–10), CSAT (0–2), CES (1–7)**. ✅
- [Ent] кілька health scores у Customer Success workspace. ✅
- SLA — точний tier ⚠️ (PST).

## Workflows / автоматизація

- **Ліміт workflow/акаунт:** **Pro 300, Ent 1,000** ✅ *(не 50/100)*; **+100 за Brands add-on**; при кількох підписках = найвищий ліміт (не сумується). ✅
- **Тригери:** record / event / **schedule-based**, date-based enrollment. ✅
- **Дії:** send email, create task, update property, webhook, **Run Agent** (Breeze), затримки, if/then ветвлення, A/B-гілки. ✅
- **Run Agent:** ліміт **500 виконань/день/дія**. ✅
- **Історія:** enrollment-історія **6 міс**; **100,000 успішних логів/день/workflow**. ✅
- ⚠️ Per-workflow enrollment cap — не задокументовано.

## Inbox & Conversations

- **Канали:** team email, live chat, форми, Facebook Messenger (Free+); **WhatsApp — Marketing/Service Pro+**. ✅
- **WhatsApp:** **1,000 template-повідомлень/міс** (спільно на всі WABA; деякі сторінки KB кажуть «conversations» ⚠️); reset за датою першої Pro/Ent покупки; **25 номерів/WABA**; відповідь контакта відкриває 24-год сесію. ✅
- **Calling (хвилини/міс):** Free **15/user**; Starter **500** (+1 номер); Pro **3,000** (+3 номери); Ent **12,000**. ✅
  - Запис + транскрипція on by default (можна вимкнути; у деяких країнах off для compliance); потрібен Sales/Service paid seat; toll-free не надаються. ✅

## Email-інтеграція

- **BCC/forwarding-адреса** логує лист на контакт (без трекінгу при ручному). ✅
- **Open tracking — безкоштовно** (1px); **click tracking потребує Sales paid seat**. ✅
- Розширення: Chrome (Gmail), Office 365 add-in (Outlook); сайдбар «Show Contact Profiles»; двостороннє логування. ✅

## Аналітика та звіти

- **Custom Report Builder — Pro/Ent**. ✅
- **Attribution reports — Marketing & Content Hub Pro/Ent**. ✅
- Перф-ліміти: non-table звіт ≤**1,000 унікальних рядків**; breakdown ≤99 значень; event reporting **Pro 10M / Ent 100M** подій (до 10 років). ✅
- Дашборди: ліміт за найвищим tier; точні # — ⚠️ PST.

## Імпорт / Експорт

- **Free:** файл ≤**20 MB**, ≤**50 імпортів/день**, ≤**500,000 рядків/день**. ✅
- **Starter/Pro/Ent:** файл ≤**512 MB**, ≤**500/день**, ≤**10,000,000 рядків/день**, max **1,048,576 рядків/файл**. ✅
- Формати: `.csv/.xlsx/.xls` (один аркуш, header row, <1,000 колонок). ✅
- **Дедуп:** Email / Company domain / Record ID оновлюють існуючі; без них — дублі. ✅
- Експорт CSV/XLSX б'ється на файли понад 1,000,000 рядків. ✅

## Властивості

- **Типи:** single/multi-line text, number, single checkbox (boolean), multiple checkboxes, dropdown, radio, date, phone, **calculation**, **rollup**, HubSpot user тощо. ✅
- **Calculation + Rollup — Pro/Ent**. ✅
- Property groups організовують поля; required-властивості форсуються. ✅
- ⚠️ Точні # кастомних властивостей/об'єкт per tier — у PST.

**Джерела:** knowledge.hubspot.com (records, properties, workflows, sequences, meetings, calling, import-and-export, reports, knowledge-base, customer-feedback, forecast) | knowledge.hubspot.com/cpq/getting-started-with-hubspot-cpq | knowledge.hubspot.com/properties/determine-likelihood-to-close-with-predictive-lead-scoring
