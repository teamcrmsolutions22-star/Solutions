# Zoho CRM — Кастомізація та Автоматизація

## Blueprint

**Основи:**
- Візуальний дизайнер процесів; кожен transition: Before → Action → After
- Дії в transition: email, task, field update, webhook, function call
- Обов'язкові поля перед переходом; ліміт кількості переходів

**Blueprint 3.0:**
- **Parallel transitions:** кілька шляхів активні одночасно
- **Multiple transitions:** запис має кілька активних transitions одночасно
- **Sub-processes:** Blueprint всередині Blueprint

**Blueprint + CommandCenter:**
- Blueprint = внутрішні кроки всередині стадії
- CommandCenter = end-to-end journey через модулі
- Використовуй обидва: Blueprint для чеклісту, CommandCenter для оркестрації

---

## CommandCenter / Orchestration

- Крос-модульна оркестрація: Leads → Contacts → Potentials → Tickets
- Умови, затримки, дії через будь-які модулі
- Entry: будь-який тригер в будь-якому модулі
- Дії: email, webhook, Deluge function, assignment rule
- Аналітика: drop-off rates, bottleneck identification
- Налаштування: CRM → Setup → Process Management → CommandCenter

---

## Canvas View

- No-code UI редактор для картки запису
- Імпорт по ключу з community
- AI створює canvas з референсного зображення
- Canvas List View: `ZDKPage.getListData()`, `ZDKWebClient.updateRecord()`

---

## Kiosk Studio

- Покрокові guided flows для частих операцій
- Налаштування: CRM → Setup → Process Automation → Kiosk Studio

---

## CPQ (Configure Price Quote)

- Guided конфігурація продукту/ціни
- Прив'язаний до модуля Potentials → генерує quotes

---

## Wizards

- Multi-step форми створення записів з розгалуженням
- Налаштування: Setup → Process Management → Wizards

---

## Cadences

- Послідовні автоматичні дії (emails, calls, tasks) по розкладу
- Відстеження: на якому кроці кожен лід
- Вихід: відповідь або запланована зустріч
- Потрібен: Enterprise або Ultimate план
- Налаштування: CRM → Cadences

---

## SalesInbox / Email Intelligence

- Підключити Gmail або Outlook → CRM контекст поряд з email
- Налаштування: Setup → Email → Email Settings
- **Email Intelligence:**
  - Sentiment analysis
  - 7 типів емоцій
  - Custom intent (мін. 25 прикладів для навчання)
  - Витягування активностей з email
  - Переклад (34 мови)

---

## Sandbox

- Enterprise+: множинні sandboxes
- Тестування конфігурацій перед production
- Можливість ділитися конфігами між sandboxes

---

## Segmentation & Marketing Attribution

- Сегментація контактів/лідів по поведінці і полях
- Attribution: перший дотик / останній дотик / multi-touch
- Відслідковує вплив кампаній на угоди по кожній стадії

---

## Gamescope

- Гейміфікація для sales teams
- Змагання, KPI-scoring, leaderboards, badges в CRM

---

## Zia / AI Features

**Zia Assistant:**
- Голосові запити: "Do we have 10 servers in stock?"
- Голосове планування: "Schedule delivery of 10 servers..."
- Smart Prompt: природна мова → створення модуля/workflow
- Вибір LLM: Zia/Qwen (internal) або OpenAI (external)

**Call Intelligence:**
- Транскрипція; satisfaction score; politeness score

**AI Scoring (тільки Enterprise+):**
1. Health Score
2. Engagement Score
3. Follow-up Score
4. Conversion Score
5. Field Attribute Score

**Prediction Builder:**
- Кастомні передбачення на будь-якому модулі
- Churn Prediction потребує: модуль клієнта + модуль оплат + поріг неактивності

**Recommendations:** рекомендації продуктів/послуг на основі минулих угод

---

## SalesIQ — Website Visitor Engagement

- Real-time tracking: rings/circles (ближче = більше часу на сайті)
- Відомі відвідувачі: CRM account, owner, visit history, chat transcripts
- Chat transcripts авто-зберігаються як PDF до записів CRM
- Доступний у CRM Plus

**Zobot (AI Chatbot):**
- Обробляє 70–75% chat volume автоматично
- Мін. 1,000 чатів для авто-навчання; ручне: завантажити Q&A CSV
- Free: 1,000 bot messages/місяць; далі $0.03/message
- Налаштування: SalesIQ → Settings → Integrations → Sundown AI

**FAQ Widget:**
- Увімкнути "Allow visitors to access articles from chat window"
- Статті: Templates → Articles
