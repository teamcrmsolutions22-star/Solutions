# HubSpot — No-code налаштування (для адміністратора)

> Актуально: червень 2026. Маркери: ✅ офіц. | ⚠️ потребує перевірки

## Перші кроки після створення акаунта

> Єдиного універсального чек-листа на всі хаби HubSpot не публікує. ⚠️ Рекомендований порядок:
1. **Account settings** — мова, регіон/часовий пояс, валюта, фіскальний рік. ✅
2. **Підключити домени** для маркетингових ресурсів (сайт, лендінги, email) у Content/Marketing Hub. ✅
3. Налаштувати хаб-специфіку: воронки, властивості, користувачі/команди, інтеграції.

## CRM-об'єкти та зв'язки

| Об'єкт | Опис | Доступність |
|--------|------|-------------|
| **Contacts** | Люди: email, ім'я, lifecycle stage, телефон; predictive-властивості (Likelihood to close, Contact priority) на Enterprise | Усі ✅ |
| **Companies** | Організації: name, domain; зв'язані з контактами/угодами/тікетами | Усі ✅ |
| **Deals** | Угоди: воронки, стадії, сума, дата закриття | Усі ✅ |
| **Tickets** | Сервісні звернення: pipeline, status, category, priority | Усі ✅ |
| **Products & Line Items** | Каталог товарів + позиції в угодах/quotes (кількість, ціна) | Усі ✅ |
| **Custom Objects** | Бізнес-специфічні сутності | **Enterprise only** ✅ |

**Асоціації (v4):** many-to-many між більшістю об'єктів; дефолтні + кастомні типи зв'язків і мітки (labels). ✅

## Воронки (Pipelines) та прогноз

- **Воронки угод і тікетів:** кілька воронок зі стадіями; API доступний на всіх хабах (за наявності доступу до об'єкта). ✅
  - ⚠️ Ліміти воронок (ChatGPT, історично): Starter **2**, Pro **15**, Ent **100** — потребує перевірки в PST.
  - Тікети: `hs_pipeline` + `hs_pipeline_stage`.
- **Lead scoring:** predictive через властивості **Likelihood to close** + **Contact priority** — лише **Marketing Hub Enterprise + Sales Hub Enterprise**. ✅
- **Цілі та прогнози:** CRM Forecasts + Forecast Types API; потребують Professional/Enterprise. ✅

## Ролі, права, команди

- **Seats vs permissions:** тип місця (Core/Sales/Service/Commerce/Partner) визначає доступ до edit-функцій і credit-фіч; далі object-level і tool-level права контролюють read/write. ✅
- **Super Admin** — повний доступ. Інші ролі обмежуються по об'єктах/інструментах. ⚠️ (детальні матриці — у PST)
- **Teams:** команди + вкладена ієрархія; доступ часто за командою.
- **Обмеження менеджера «тільки свої угоди»:** через object permissions (owned vs team vs all). ✅ (можливість), ⚠️ (точні кроки UI)

## Marketing Hub (no-code)

- **Форми:** embedded / standalone / pop-up; GDPR-згоди. На Free/Starter — обмеження брендингу/автоматизації. ✅
- **Landing Pages:** конструктор + AI-генерація контенту. A/B-тести історично Pro/Ent ⚠️ (точний gating — у PST).
- **Email-маркетинг:** платні плани Marketing Hub; ліміти відправки за контактним рівнем. ⚠️ (точні per-tier ліміти — у PST). Антиспам — стандартно.
- **Workflows (автоматизація):** доступні для **Professional + Enterprise**. ✅
- **Списки:** активні + статичні, потужна сегментація. ✅
- **Реклама:** Facebook/Instagram, Google Ads, LinkedIn (Lead Gen Forms), **TikTok Ads + TikTok social** (Spring 2026). ✅ (gating ⚠️, зазвичай Starter+/Pro+)

## Sales Hub (no-code)

- **Sequences:** автоматичні послідовності лист+дзвінок — **Sales Hub Pro/Enterprise** (за APIs-by-tier). ✅. Ліміт ⚠️ до 1,000 контактів у списку (ChatGPT).
- **Meeting Scheduler:** запис на зустрічі (Google/Outlook); Free/Starter — базово, round-robin/ротація — вище. ✅/⚠️
- **Templates & snippets:** прискорення продажів; per-tier ліміти ⚠️.
- **Playbooks:** скрипти/чек-листи в картці — **Sales Pro+**. ✅
- **Quotes/CPQ:** Quotes + Deal Splits API; розширений CPQ/approvals — Commerce Hub Pro/Ent. ✅ (існує), ⚠️ (gating Sales vs Commerce)

## Service Hub (no-code)

- **Help Desk / Ticket Inbox:** ліміти місткості тікетів на користувача, авто-роутинг. ✅
- **База знань (Knowledge Base):** історично **Service Hub Pro+** ⚠️ (не підтверджено напряму в завантажених доках). ChatGPT: ліміт статей Pro 25 / Ent 100 ⚠️.
- **Customer Portal:** історично **Enterprise only** ⚠️.
- **SLA + опитування (CSAT/NPS/CES):** є; gating — у PST. ⚠️ (ChatGPT: Service Pro+)

## Workflows та автоматизація

- Доступні для Marketing, Sales, Service, Data, Smart CRM, Commerce — на **Professional + Enterprise**. ✅
  - ⚠️ ChatGPT наводить ліміти кількості workflow Free 20 / Pro 50 / Ent 100 — конфлікт із офіц. (повноцінні Workflows = Pro+), потребує перевірки.
- **Тригери:** record-based (створення/зміна), date-based, event-based, **«Based on a schedule»**. ✅
- **Дії:** оновлення властивостей, створення задачі/сповіщення, webhook/HTTP, паузи/затримки, if/then ветвлення, split-тести, AI-дія **Run Agent**. ✅
  - **Run Agent:** ліміт **500 виконань/день на дію**. ✅
- **Логи/історія:** історія enrollment зберігається **6 місяців**; **ліміт 100,000 успішних логів виконання/день** на workflow. ✅

## Inbox та Conversations

- **Shared Inbox канали:** Email, Live Chat, Facebook Messenger, WhatsApp, кастомні канали. ✅
- **WhatsApp:**
  - До **25 номерів телефону** на один WhatsApp Business Account; синхронізуються лише нові повідомлення після підключення. ✅
  - Ліміт **1,000 template-повідомлень/місяць** на акаунт/канал. ✅
- **Live Chat:** поведінка при max-місткості (wait-повідомлення, приховування лаунчера). ✅
- **Дзвінки:** вбудований calling через CRM-активності; точний tier-gating (Starter vs Pro vs Ent) — у PST. ⚠️ (ChatGPT: Sales/Service Starter+, 2 номери)

## Інтеграція пошти (Gmail/Outlook)

- Gmail + Outlook/Microsoft 365: логування й трекінг листів; email tracking + templates — у Free/Starter. ✅
- Двостороння синхронізація через BCC-адресу + браузерні/десктоп add-ins. ✅ (існує), ⚠️ (детальний tier-gating)

## Аналітика та звіти

- **Стандартні звіти:** по контактах, угодах, тікетах, кастомних об'єктах. ✅
- **Custom Report Builder:** single-object звіти — **Marketing/Sales/Service/Data/Commerce Hub Professional + Enterprise**. ✅
- **Attribution reports:** історично **Enterprise** ⚠️ (формально — PST).
- ⚠️ ChatGPT: дашборди Starter 10 / Pro 75 / Ent 100 — потребує перевірки.

## Імпорт / Експорт

- Об'єкти: contacts, companies, deals, tickets, products тощо. ✅
- ⚠️ Точні per-file ліміти рядків і правила дедуплікації (match по email / record ID) — у окремому import KB (не завантажено).

## Властивості (кастомні поля)

- Properties API визначає поля per object type з типами й валідаціями. ✅
- ⚠️ Ліміти кастомних властивостей (max на об'єкт, per tier) — technical limits у PST (не задокументовано в переглянутих сторінках). ChatGPT: ~1,000 на об'єкт, +500 за $220/міс (Ent) — ⚠️.

**Джерела:** knowledge.hubspot.com (reports, workflows, help-desk, inbox, properties, manage-seats) | knowledge.hubspot.com/properties/determine-likelihood-to-close-with-predictive-lead-scoring | developers.hubspot.com/docs/developer-tooling/platform/apis-by-tier
