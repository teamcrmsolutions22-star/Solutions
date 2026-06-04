# Zoho CRM Knowledge Base — CRM Consulting Team Reference

Sources: 470+ Zoho YouTube transcripts, Zoholics sessions, Focus Group webinars, Partner Program interviews, Zoho Deep Research (Ukrainian + API v8).

---

## 1. PARTNER PROGRAM

**Oscillosoft (Ash Ibrahim) — Australia:** Partner since 2009; grew 2→32 staff, 200%+ growth. Sales pitch: "Value for money — nothing comes close."

**ion8 / George Easton — Australia:** Process-first approach. Only Zoho benchmarks every activity against revenue. YoY growth 20%→30%→40%.

**CRM Zone / Charlotte Buhl — Denmark:** 6 years as partner. Plug-and-play for simple, fully customizable for enterprise.

**Salesbridge / Karl Odent — Belgium:** Sales-centric consulting. Benefits: direct escalation, early roadmap access, competitive intelligence.

**A2Z Cloud / Lucy Beck — UK:** Since 2012. Cloud market $300B, <1% through partners. Built "YourBid" vertical product.

**FWRD / Frances Blackie — Perth:** 100% remote. Targets 1–20 user businesses globally.

**Creative Analysis / Paula Atherill:** 85% Zoho-based. Distributed team: France, Ireland, India.

**Cornerstone Solutions / Susan Clark — Houston:** 20+ years CRM consulting. Expanded CRM → Campaigns, Forms, Surveys, Projects, Books, Support.

**Generaction / Francois Nanquette — Paris:** Zoho-only firm. "Every business must go digital — Zoho One is the most competitive answer."

### Partner Program Benefits
- Direct escalation to Zoho support
- Early access to product roadmap and new feature previews
- Annual summits: Inspire/Zoholics in Chennai, Mumbai, Austin
- Zoho marketing and pre-sales support
- Training and certification programs
- Sell/resell entire Zoho One suite

---

## 2. SHOWTIME / TRAINING PLATFORM

- Per-session analytics: engagement pie chart, avg rating, questions (with upvotes), polls, feedback per participant
- Export as CSV or Google Sheet
- On-demand (self-paced) courses; custom domain (Digital Campus)
- Password-protected sessions
- CRM integration: attendees become leads/contacts
- Assessments: Polls (live), Quiz (end of session), Evaluation Forms
- Paid training: Stripe/PayPal, ticket pricing, refund policy
- Contact: support@zohoshowtime.com

---

## 3. CUSTOMER CASE STUDIES

### Ecomark Solar (Ian Melchior) — Colorado
Products: CRM, Reports, Creator, Campaigns, SalesIQ, Support.
- Daily sales dashboard: appointments, calls by hour, closed deals, "Red Light" stale pipeline reports
- **Technique 1:** Formula field for filtering reports → update once, all reports update
- **Technique 2:** Update converted leads via Creator (workaround for edit restriction)
- **Technique 3:** Write Deluge in Sublime Text (C++ syntax) before pasting into Zoho

### Constructa — France (~55 years, 200K active clients)
- Zoho = "a revolution" for sales teams
- Shifted from quantitative to qualitative management via CRM benchmarks
- CRM used by all departments from GM to field sales

### Joho (Bill Goulet) — Financial Intelligence for Banks
- Zoho CRM + HubSpot via Bedrock Data
- HubSpot engagement synced as CRM fields; MQLs auto-pushed to Zoho (deduplicated)

---

## 4. CRM ANALYTICS / REPORTS

### Report Types
| Type | Charts? | Grouping |
|------|---------|----------|
| Tabular | No | No |
| Summary | **Yes (only this)** | Up to 3 levels |
| Matrix | No | X / Y axis |

### Report Construction
1. Primary module (max 1) + up to 3 related
2. Type → columns → grouping → calculations (sum/avg/min/max)
3. Date filters (relative: current fiscal year, last 3 quarters, etc.)
4. Advanced filters; AND/OR logic
5. Save to folder (sharing: public/private/group/role/territory)
6. Chart → Dashboard

### Dashboards
- Old UI: max 6 components; New UI: max 10
- Drill-down on chart → launches underlying report
- Report Scheduler: send to non-Zoho emails; hide Reports module from reps

### Zoho Analytics (Advanced)
- Enable: CRM → Advanced Analytics add-on
- Syncs all modules; 20+ pre-built dashboards
- Drill: quarter → month → week → day
- Pivot with period-over-period % comparison
- Data blending: join CRM + external spreadsheets
- Sharing: per-user permissions, filter criteria, iframe embed, CRM Web Tab embed
- Schedule email delivery (HTML or PDF)

---

## 5. SALESIQ — WEBSITE VISITOR ENGAGEMENT

- Real-time tracking: rings display (closer = more time on site)
- Recognized visitors: shows CRM account, owner, visit history, chat transcripts
- Chat transcripts auto-saved as PDF to CRM records
- Available in CRM Plus

### Zobot (AI Chatbot)
- Handles 70–75% of chat volume automatically
- Min 1,000 chats for auto-training; manual: upload Q&A CSV
- Free: 1,000 bot messages/month; then $0.03/message

---

## 6. CRM INTEGRATIONS

### Campaigns + CRM
- Setup: Campaigns → Sync Contacts → Zoho CRM; use Zoho Service Communication Key
- Sync: opt-out propagation, deleted record handling, converted lead handling
- Results in CRM: per-contact campaign opens/clicks; "Create Change Campaign" for openers only

### Books + CRM
- Two-way sync: Accounts↔Customers, Contacts↔Contacts, Products↔Items
- Setup from Books: Settings → Integrations → Zoho Apps → CRM
- Triggers: new potential → estimate; closed-won → invoice
- Sync every 2 hours; instant sync available

### Meeting + CRM
- Setup: CRM → Marketplace → Zoho Meeting. Cost: $3/user/month
- 100 participants; recording auto-to-CRM activity record
- Webinar: $19+/user/month; Enterprise/Ultimate only; max 250 attendees

### Survey + CRM
- 25+ question types; 80+ languages; skip logic, piping
- Reports: summary, filter, cross-tab, word cloud, sentiment analysis

### Desk (Support)
- Two-way sync with CRM; Handshake Mode (sort tickets by CRM deal stage)
- Round-robin assignment, SLA + multi-level escalation; Failure Log: 7 days

### Flow + CRM
- No-code integrations; decisions + delays; 500+ app connectors

### Phone / PBX
- PhoneBurner: 200→400 calls/day; ClickSend SMS: 98% open rate
- PBX: auto-log calls; screen pop with CRM data on incoming call

---

## 7. USER MANAGEMENT & DATA SHARING

**Roles = What data user SEEs:** CEO → all; Manager → own + reports'; Exec → own only

**Profiles = What user can DO:** Admin / Standard / Custom (restrict import, export, reports)

**Data Sharing:** Default = private. Start restrictive, expand as needed.

---

## 8. DATA QUALITY & IMPORT

| Format | Max Records |
|--------|-------------|
| Excel / VCF | 5,000 |
| CSV Standard | 5,000 |
| CSV Enterprise | 20,000 |
| File size | 5 MB |

- Date: MM/DD/YYYY; currency: no symbols or commas
- Duplicate options: Clone / Skip (keep existing) / Overwrite (imported wins)
- Cleanup: Tools → Deduplicate; DO NOT just delete (loses notes/activities/history)
- Use pick lists for Country, State, Industry, Lead Source, Lead Status

---

## 9. SALESFORCE AUTOMATION

- Lead conversion creates: Contact + Account + (optional) Potential
- **Custom field transfer mapping required** — configure before going live
- Assignment Rules: round-robin; by geography, product, department
- Stage History: tracks days in each stage → duration reports
- Expected Revenue = Amount × Probability %
- RouteIQ: geographic routing for field sales
- Email: validate domain + SPF + DKIM DNS records

---

## 10. CRM CUSTOMIZATION

- **Canvas:** No-code UI editor; AI creates from reference image
- **Kiosk Studio:** Guided process flows; Setup → Process Automation → Kiosk Studio
- **CPQ:** Configure Price Quote; tied to Potentials
- **Wizards:** Multi-step record creation with branching
- **Cadences:** Sequential actions (emails, calls, tasks) on schedule; exit on reply; Enterprise+
- **SalesInbox:** Gmail/Outlook context; email sentiment, 7 emotion types, custom intent (min 25 examples)
- **Sandbox:** Enterprise+; test before production
- **Gamescope:** Competitions, KPI scoring, leaderboards

---

## 11. BLUEPRINT

- Visual process designer; each transition: Before → Action → After
- Actions: email, task, field update, webhook, function call

### Blueprint 3.0
- Parallel transitions; multiple simultaneous active transitions per record
- Sub-processes (Blueprint within Blueprint)
- Transition validations; max number of times taken

---

## 12. COMMANDCENTER

- Cross-module journey: Leads → Contacts → Potentials → Tickets
- Conditions, delays, actions across modules
- Analytics: drop-off rates, bottleneck identification
- Setup: CRM → Setup → Process Management → CommandCenter

---

## 13. ZIA / AI

- Voice query/scheduling/order creation
- Smart Prompt: natural language → module/workflow creation
- LLM choice: Zia/Qwen (internal) or OpenAI (external)
- **Email Intelligence:** sentiment, 7 emotions, custom intent (min 25 examples), translation (34 languages)
- **Call Intelligence:** transcription, satisfaction score, politeness score
- **AI Scoring (Enterprise+):** Health, Engagement, Follow-up, Conversion, Field Attribute
- **Prediction Builder:** Churn = client + payment + inactive threshold
- **Recommendations:** product/service suggestions from past deals

---

## 14. WIDGETS & DELUGE

### Timeouts
| Context | Timeout |
|---------|---------|
| Button / API | 10s |
| Workflow | 30s |
| Schedule | 15min |
| UI display | 5min (backend: 15min) |

### Deluge CRM Functions
```
zoho.crm.getRecordById(module, id)
zoho.crm.updateRecord(module, id, map)
zoho.crm.searchRecords(module, criteria)
zoho.crm.createRecord(module, map)
```
Connection object required for cross-product calls.

### Client Script (JS)
```javascript
ZDKPage.getInput({fields: [...]})        // pseudo-fields popup
ZDKPage.getFieldValue()                   // UI value (unsaved)
ZDKPage.getServerFieldValue()             // DB value (saved)
ZDKPage.setSubformRows("Name", [{...}])  // set subform
```
Commands: 30/org limit; keyboard shortcuts disabled by default.

### Widget SDK Gotcha
- Default SDK = API V2 — no custom subform fields
- Use `ZOHO.CRM.CONNECTION.invoke` for v7/v8 custom fields

### Widget Types: Popup (modal) / Flyout (sidebar) / Callout (field-attached)

---

## 15. IMPLEMENTATION — 6 KEYS (Susan Clark)

1. **Vision first** — plan reports before configuration
2. **User-friendly design** — consistent field order; first column = clickable; last = owner
3. **Custom Views:** All Open Potentials; Past Due Potentials; Past Due Activities; Today's Activities (OR logic)
4. **Free features:** templates, mobile apps, Report Scheduler, mail merge
5. **Add apps:** Campaigns first, then Projects, Support, Books
6. **Train team:** carrot not stick; 5 things max/session; CRM champion; cheat sheets

---

## 16. CRM PLUS — 360°

Suite: Campaigns + SalesIQ + Social + CRM + Projects + Reports + Survey + Desk

Journey: Attract → Nurture → Close → Deliver (Projects) → Support (Desk) → Feedback (Survey) → Analyze

---

## 17. KEY SELLING POINTS

1. **Zoho One** — 35+ products, one login, one bill. #1 differentiator.
2. **Open architecture** — API-first; HubSpot, Marketo, Google, external DBs
3. **Scalability** — 1-person to enterprise
4. **Partner value** — human relationships prevent SaaS churn
5. **CRM as backbone** — marketing + sales + projects + support + feedback
6. **Analytics** — multi-source blending, %, drill-downs
7. **AI** — Zia voice + Zobot 70% chat deflection + AI scoring
8. **Verticals** — partners build industry solutions on top of Zoho

---

## 18. ECOSYSTEM

- **Zoho One:** ~$30-45/user/month; 35+ apps
- **CRM Plus:** 8-app customer lifecycle suite
- **Bigin:** Entry-level pipeline CRM
- **Creator:** Low-code; custom portals, field apps
- **Catalyst:** Serverless; AutoML, OCR, Face, Text Analytics
- **Agent Studio:** Multi-agent builder; Digital Employees
- **Zoho MCP:** Open protocol for multi-vendor agentic systems

---

## 19. REAL ESTATE VERTICAL

- Pipeline: Inquiry → Viewing → Offer → Under Contract → Closed
- Survey after every viewing (send immediately; neutral framing)
- Constructa (France): 200K clients, quality-based management
- RouteIQ for field agent routing; Campaigns for neighborhood marketing

---

*Last updated: 2026-06-01 | Sources: YouTube Archive 1 (207), Archive 2 (263), Archive 3 (698 files), Zoho API v8 Research, Ukrainian CRM Reference (14 blocks)*
