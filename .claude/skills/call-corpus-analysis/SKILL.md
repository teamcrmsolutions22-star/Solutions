---
name: call-corpus-analysis
description: "Systematically analyze a WHOLE CORPUS of recorded calls (dozens-to-hundreds of transcripts) and turn it into structured deliverables: a main report with metrics and prioritized recommendations, a 6-block call scorecard, an objection library with rebuttal lines, a call-script template, and a deep-dive on the most critical cluster. Methodology: parse transcript metadata (quant layer) → sample by outcome baskets → fan out parallel sub-agents (15-90 files each) → synthesize. Works on top of any transcript corpus from any CRM/telephony/meeting source. Triggers (en): analyze all my calls, call corpus analysis, call scorecard, build an objection library, manager call review, what do prospects/candidates say, conversation mining, quarterly call review, sales-call audit, find patterns across calls. Triggers (uk/ru): проаналізуй всі дзвінки, аналіз корпусу дзвінків, scorecard по дзвінках, бібліотека заперечень, звіт по дзвінках менеджера, проанализируй все звонки. NOT for: breaking down a SINGLE call/meeting (use a single-call skill), transcribing audio→text (use a transcription skill), or pulling plain CRM numbers without call content."
metadata:
  author: "Ihor Vashchenko (Ігор Ващенко)"
  contact: "skill shared by Ihor Vashchenko"
  version: "1.2.0"
  license: "Share freely with attribution"
---

# Call Corpus Analysis

> **A skill by Ihor Vashchenko (Ігор Ващенко).**
> Battle-tested methodology for turning a *whole corpus* of call transcripts into decisions —
> where the rep loses deals, which objections go unhandled, what to rewrite in the script,
> and which lead cluster is most underexploited.

This is **not** single-call note-taking and **not** transcription. It is the analytical layer
**on top of** an already-transcribed corpus. Source-agnostic: works with calls from any CRM /
telephony / Zoom / Gong / Fireflies export, in any domain (sales, support, hiring, research,
success), in any language Whisper handles (incl. under-served UA/RU/PL).

> ⚠️ **About the agents.** The corpus is analyzed by **generic built-in sub-agents**
> (general-purpose / read-only explorers) — there are no special "call agents." The value lives
> in the **prompts** and **methodology** below, not in bespoke agents. Each agent gets the same
> structured brief and reads its own basket of files.

## When to use

- "Analyze all my calls from last month/quarter" / "mine our call corpus"
- "Build me a scorecard / objection library / script from our calls"
- "Where is the rep losing deals?" / "What do prospects say most?"
- Quarterly call-quality review (recommended cadence below)
- Before rewriting a sales/recruiting script — so it rests on data, not intuition

## When NOT to use

- A single call/meeting → use a single-call breakdown skill (extract decisions + tasks)
- Turning audio into text → use a transcription skill
- Plain CRM counts (how many leads/deals) → query the CRM directly
- No corpus yet → first collect + transcribe (see Prerequisites)

## Setup — ask the user to choose a mode FIRST

On the **first invocation**, before doing anything else, ask the user one question and route
accordingly (details + CRM adapters in `ADAPTERS.md`):

> **"How do you want to run this?**
> **A) Connect my CRM (and optionally Google Drive) and automate the whole pipeline, or**
> **B) I already have transcripts — just analyze them."**

### 🅰️ Mode A — connect CRM (+ optional Drive) and automate
Help the user stand up the upstream pipeline once, then it runs on a schedule:
1. **Collect** — reach their calls via whatever they have: a CRM **MCP connector**, a **direct API**
   (write a small fetch script), or a **manual CSV export**. (HubSpot, Pipedrive, Close, Salesforce,
   Gong, Fireflies, Zoom, Aircall… — see `ADAPTERS.md`.)
2. **Transcribe** — any Whisper engine; drop `<60s` files. (Gong/Fireflies/Zoom-VTT already give text —
   skip Whisper.)
3. **Enrich** — map their CRM fields onto the YAML header (`examples/enrich_from_csv.py` is the
   reference adapter).
4. **Store** — local `./transcripts/`. *Optional sink:* also push to Google Drive / S3 **only if they
   ask** — it is never required.
5. **Schedule** — wire a recurring job (the `schedule` skill / cron / launchd): collect→transcribe→
   enrich daily/weekly; full analysis monthly or on demand.

### 🅱️ Mode B — analyze existing transcripts
Point the skill at a folder. If files already carry the YAML header → go to Phase 1. If they're plain
text / VTT / a CSV export → run `examples/enrich_from_csv.py` once to stamp the header, then Phase 1.
No CRM, no Drive, no scheduling.

> **Google Drive is optional, not a dependency.** Storage is a local folder; the analysis runs fully
> offline with zero API keys for the skill itself. A cloud sink only matters if a team needs the output.

## Prerequisites — the stack this sits on

| Layer | What it does | Typical tool |
|---|---|---|
| Collect recordings | Pull call audio from your source | CRM/telephony API, Zoom/Gong export |
| Transcribe | audio → text | Whisper (mlx-whisper / faster-whisper / Groq / OpenAI API) |
| Enrich | add YAML frontmatter from CRM (outcome, stage, speed, segment, source) | a small enrich script |
| **Analyze the corpus** | **this skill** | report + scorecard + objection library + script |
| Package | pretty PDF for the team | any markdown→PDF tool |

The corpus should be `.txt` files with a **YAML header** per call (see `templates/`). Without
metadata the quant layer (Phase 1) is impossible — you get content analysis only.

Minimal YAML header expected:
```yaml
---
call_id: "..."          # unique id
call_date: "2026-04-15"
call_duration_sec: 287
direction: outgoing       # or incoming
manager_id: "..."         # who ran the call
contact_id: "..."
result_class: "thinking"  # the outcome bucket — DRIVES basket sampling
source: "..."             # lead source / campaign
segment: "..."            # domain-specific: profession / plan / persona
language_detected: "uk"
---
[transcript body]
```

---

## Methodology — 7 phases

### Phase 0 — Prepare the corpus
Make sure transcripts are collected and enriched. Drop the junk:
- recordings < 60s = missed calls / dead air → exclude (saves 60-70% of volume on call-center data)
- duplicates by contact/phone → flag (auto-lead connectors often create one deal per submission)

Record **size and completeness** (file count, months, full vs partial sample). A partial month →
flag it in the report's caveats; don't extrapolate a trend from it.

### Phase 1 — Parse metadata (quant layer, NO agents)
With a script (Python / grep over YAML) compute across the whole corpus:
1. **Distribution by month** + outgoing/incoming split
2. **Time-of-day & weekday** — under-served contact windows
3. **Duration by outcome** (median + avg) — note: *length ≠ quality* (the longest calls are often
   no-show false positives)
4. **Speed-to-First-Call** (lead created → first call): median, avg, p25/p75/p90, %same-day, %>30d
5. **Conversion funnel** — `result_class` distribution from intake to won/hired
6. **Script coverage** — % of calls mentioning each key element (company name, the offer/rate,
   trust proof, legitimacy markers, a concrete next-step). This is a grep over the bodies against
   a glossary of terms.

This is the **foundation** — most insights are born here, and it needs no agents.

### Phase 2 — Sample by outcome baskets
Split the corpus into **baskets by `result_class`**. A generic sales/recruiting set:
`won/placed` · `thinking` · `not_now/passive` · `offer_mismatch` (price/location/terms) ·
`funnel_drop` (no-show, no-answer) · `disqualified`.

From each basket take **15-90 files** (bigger basket → bigger sample); read the critical/largest
baskets (almost) fully.

> 🔑 **Field lesson:** the most valuable insight is rarely in "won" — it hides in an
> under-rated *losing* basket (e.g. an `offer_mismatch` cluster concealing a whole B2B/upsell
> segment nobody pitched). **Always assign one agent to the most suspicious/largest losing
> basket** — that's where the EV is.

### Phase 3 — Fan out parallel agents
Launch **N parallel `general-purpose` agents**, one per basket (15-90 files each). Prompt template:
`templates/fanout_agent_prompt.md`. Each agent returns a **structured report** for its basket:
- top fears/pains with frequency + 3-5 verbatim quotes
- top objections with frequency + whether the rep handled them
- what the rep does well / where they bleed the deal
- 1-2 non-obvious patterns or opportunities visible only in this basket

Launch all agents **in one message** (parallel), not sequentially. For a very large corpus, batch.

### Phase 4 — Synthesize into 5 deliverables
Fold the metrics (P1) + agent reports (P3) into the canonical set
(outline: `templates/synthesis_report_outline.md`):

| # | Deliverable | Contents |
|---|---|---|
| 1 | **`00_main_report.md`** | TL;DR, corpus metrics, script coverage, pains/objections, TOP-N recommendations (prioritized by impact×ease, each with horizon + owner), rough financial model, caveats |
| 2 | **`scorecard_framework.md`** | 6-block call rubric (0-10 each) + 2 head metrics + score→action |
| 3 | **`objection_library.md`** | 20+ objections (real quotes) → ready rebuttal lines (4 principles) |
| 4 | **`script_template.md`** | full script (3 versions: outgoing / follow-up / incoming) + per-segment variants |
| 5 | **`0X_<critical>.md`** | deep-dive on the highest-EV cluster (the source of recommendation #1) |

### Phase 5 — Package + cadence
- Build a PDF (cover + KPI cards + TOC) with any markdown→PDF tool.
- Hand the rep the scorecard + objection library + script as working tools.
- Cadence: weekly the lead grades 5 random calls against the scorecard; full re-analysis quarterly
  on a fresh corpus.

### Phase 6 — Activation (turn findings into tracked work)
Analysis without follow-through is a report in a drawer. ALWAYS finish by producing
**`action_plan.md`** (template: `templates/action_plan.md`): expand each recommendation into
Action + Owner + Horizon + EV + an **acceptance test** + 3-6 **subtasks**, flagging which subtasks
**Claude can do itself** (🤖) vs a human (👤).

Then **offer the user three routes** (ask which — propose, don't impose):
- **A) Push to your task manager**, broken into a **parent task + subtasks** — using whatever they have
  connected (Notion, Linear, Asana, ClickUp, Jira, Trello, Todoist; or a Markdown checklist if none).
  One recommendation → one parent; its subtasks → sub-items, so the top level stays clean.
- **B) Start implementing the doable ones now** — Claude drafts the rewritten script, builds the
  math-calculator sheet, writes SMS/email templates, specs the CRM kanban, or re-runs the skill on a
  fresh slice to verify a change worked.
- **C) Keep just `action_plan.md`.**

> Never auto-create tasks or auto-implement without the user choosing.

---

## The 6-block Scorecard (core of the method)

Each block 0-10; sum 0-60 → action. Full rubric: `templates/scorecard_framework.md`.

1. **Opening + Identity** — company / name / source in the first 10s + a personal hook
2. **Discovery** (most important) — the segment's must-ask questions *before* pitching the offer
3. **Trust + Anti-Fraud** (under-rated) — concrete proof points, not "we're reliable"
4. **Offer Presentation** — not just the price, but a **math calc** of earnings/value + terms breakdown
5. **Objection Handling** — every unhandled objection = −2
6. **Close + Next Step** — a concrete day+time next step with confirmation, not "I'll call you"

| Score | Action |
|---|---|
| 50-60 A+ | add to the training library |
| 40-49 A | tighten blocks 3 & 5 |
| 30-39 B | the lead calls the prospect back if it's hot |
| 20-29 C | coaching on the 2 missed blocks |
| <20 F | "how not to" example for the weekly review |

**2 head metrics to track weekly:** Speed-to-First-Call (target ≤4h) and Next-Step Booking Rate
(target ≥70%).

## Objection library — 4 rebuttal principles

1. **Agree + pivot** ("I understand, that's why…") — not defense ("No, that's wrong")
2. **Math to math** — answer a number with your number and a full breakdown
3. **Proof over promise** — "here's a person who does this" beats "we're trustworthy"
4. **Concrete next step** — not "think about it" but "let me set up X for tomorrow"

Each entry: real quote → ❌ current weak rebuttal → ✅ strong rebuttal. Template:
`templates/objection_library.md`.

## Gotchas (from real runs)

1. **No diarization** — "who said what" is inferred from context, not exact. Verify critical quotes
   by hand.
2. **Transcription errors** on proper nouns (company/brand names) — run a domain-vocab fix-up regex
   and grep for variants before analyzing.
3. **Single rep** — if one person runs ~all calls, it's not an A/B test; don't conclude "who's better."
4. **Partial month** in the sample → flag it in caveats; don't extrapolate a trend.
5. **Duplicate deals** from auto-lead connectors → count unique people by phone, not by deal count.
6. **Length ≠ quality** — the longest calls are often no-show false positives.
7. **Don't hardcode rates/prices** in the deliverables — pull current numbers from your source of
   truth each run; a corpus is a snapshot in time.

## Templates in this package

- `templates/yaml_frontmatter.md` — the enrichment header the corpus needs
- `templates/fanout_agent_prompt.md` — the per-basket agent brief
- `templates/scorecard_framework.md` — the 6-block rubric (generic, parametrized)
- `templates/objection_library.md` — objection→rebuttal structure + how to build it
- `templates/synthesis_report_outline.md` — the main-report skeleton
- `templates/action_plan.md` — Phase 6: recommendations → actions + subtasks + the task-manager offer

## Also in this package
- `ADAPTERS.md` — wiring to any CRM + the two run modes + automation blueprint
- `OUTPUTS.md` — exactly what you get on output (the 5 deliverables, with examples)
- `examples/enrich_from_csv.py` — reference adapter: CSV export → enriched YAML+text (stdlib, no deps)

---

## Author

Created and shared by **Ihor Vashchenko (Ігор Ващенко)**. The methodology was distilled from a
real production run analyzing 600+ recruiting calls. Generic, de-identified version — free to use
and share **with attribution**. If it helps you, keep the author credit in `metadata`.
