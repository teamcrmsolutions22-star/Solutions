# Zoho CRM — Інтеграції

## Campaigns + CRM

**Налаштування:**
1. Campaigns → Contacts → Sync Contacts → Zoho CRM
2. Ввести email CRM admin; взяти Zoho Service Communication Key (CRM Setup)
3. Створити sync: модуль (leads або contacts), view, mailing list
4. Замапити поля
5. Налаштувати: opt-out propagation, deleted records, converted leads

**Результати в CRM:**
- На картці контакту/ліда: які кампанії отримав, відкрив, клікнув
- Статистика: recipients, open rate, click rate, bounces, unsubscribes
- "Create Change Campaign" — наступна кампанія тільки для тих хто відкрив

---

## Books + CRM

**Що синхронізується (двостороннє):**
- Accounts ↔ Customers; Contacts ↔ Contacts; Products ↔ Items
- Estimates і Invoices: створюються з CRM → Books; статус повертається назад

**Налаштування (з Books):**
1. Books → Settings → Integrations → Zoho Apps → Zoho CRM
2. Ввести CRM email + ZS Key (CRM Developer settings)
3. Налаштувати напрямок sync і тригери:
   - Варіант A: Нова угода → estimate; closed-won → approve; closed-lost → decline
   - Варіант B: Closed-won → invoice; closed-lost → void

**Sync:** кожні 2 години; instant sync доступний у Books Settings

**Флоу:** Потенціал CRM → estimate в Books → клієнт приймає в Client Portal → invoice → оплата → "Paid" в обох системах

**Дозволи:** CRM admin налаштовує Books permissions по профілях користувачів

**Важливо:** 2 Books + 1 CRM = тільки one-way sync (contacts); estimates/invoices з CRM недоступні

---

## Zoho Meeting + CRM

**Налаштування:** CRM → Setup → Marketplace → Zoho → Zoho Meeting → Setup Now
**Вартість:** $3/user/month; безкоштовно під час trial

**Можливості:**
- До 100 учасників
- Screen sharing: весь екран або вікно застосунку (Chrome only для вікна)
- Запис авто-завантажується до активності в CRM після зустрічі
- Надіслати запис: тільки учасникам / тим хто не прийшов / всім запрошеним

**Планування з CRM:** Lead/Contact → More Actions → "Meet Now" або "Schedule Online Meeting"

**Webinar:**
- Paid edition: $19+/user/month; від 25 до max 250 учасників
- Тільки Enterprise і Ultimate CRM
- Нові реєстранти → авто-ліди або контакти в CRM
- Статус: Invited → Registered → Attended
- Запис як MP4 прикріплюється до кампанії

---

## Zoho Survey + CRM

**Функції:**
- 25+ типів питань; 80+ мов
- Skip logic, piping, carry-forward logic
- Офлайн збір (авто-sync при підключенні)
- Розповсюдження: email, SMS, соціальні мережі, embed

**Типи звітів:** summary, filter, cross-tab, word cloud, sentiment analysis

**Best practices (нерухомість):**
- Один топік на опитування
- Надіслати одразу після перегляду об'єкта
- Нейтральне формулювання питань; подякувати

---

## Zoho Sign + CRM
- Створює запити підпису прямо з CRM записів

---

## Zoho Desk (Support) + CRM
- Двосторонній sync; Handshake Mode (сортування тікетів по stage угоди)
- Round-robin assignment; SLA + multi-level escalation
- Failure Log: 7 днів
- AI Agents (beta): Support Specialist, Resolution Expert

---

## Zoho Flow + CRM
- No-code інтеграції; decisions + delays
- 500+ app connectors
- Підходить для складних multi-step flows між системами

---

## Телефонія / PBX
- **PhoneBurner:** 200 → 400 дзвінків/день
- **ClickSend SMS:** 98% open rate, середній час читання 3 хвилини
- **PBX системи:** авто-логування дзвінків в CRM; screen pop з даними CRM при вхідному дзвінку

---

## HubSpot + CRM (через Bedrock Data)
4 ключові use cases:
1. MQL авто-пушаться з HubSpot → Zoho (без дублів)
2. HubSpot engagement (відкриття emails, форми, кліки) → поля в CRM
3. Custom CRM поля → HubSpot Smart Lists; owner → списки по продавцям
4. Closed deals → атрибуція маркетингового каналу

Bedrock Data: no-code, двосторонній, sync за хвилини. Підтримує: HubSpot, Marketo, Pardot, Act-On, Infusionsoft.

---

## CRM Plus — 360° Customer Journey

Сьюта: Campaigns + SalesIQ + Social + CRM + Projects + Reports + Survey + Desk

1. **Attract:** SalesIQ real-time tracking → proactive chat
2. **Nurture:** Chat → CRM contact → Campaigns sends segmented follow-up
3. **Close:** Potential in CRM
4. **Deliver:** Zoho Projects from Potential; client portal; milestones, time, expenses
5. **Support:** Desk tickets visible in CRM contact record
6. **Feedback:** Survey after ticket closure; ratings in CRM
7. **Analyze:** Zoho Analytics; pre-built dashboards
