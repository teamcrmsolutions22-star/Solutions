# What you get on output

When the skill finishes analyzing a corpus, you get a **`./reports/<period>/` folder** with 5 markdown
deliverables (plus an optional PDF). Here's exactly what each one is, with concrete mini-examples so
you know what to expect.

```
reports/2026-Q2/
├── 00_main_report.md          # the executive read: metrics + prioritized recommendations
├── scorecard_framework.md     # a 0-60 rubric to grade any future call
├── objection_library.md       # every objection → a ready rebuttal line
├── script_template.md         # a rewritten call script built from the findings
├── 0X_<critical_cluster>.md   # deep-dive on the single highest-value cluster
└── report.pdf                 # optional, packaged for sharing
```

---

## 1. `00_main_report.md` — the executive read (15 min)
The one document a manager/owner reads. Contains:
- **TL;DR** (6-9 bullets) — the most important findings in 1 minute
- **Corpus metrics** — volume, time-of-day/weekday, duration by outcome, Speed-to-First-Call
  percentiles, the full conversion funnel
- **Script coverage** — % of calls that mention each key element (offer, trust proof, next-step…)
- **Pains / fears / objections** — with frequency + real verbatim quotes
- **TOP-N recommendations** — split into Quick wins / Mid / High, each with an EV estimate, a horizon,
  and an owner
- **Rough financial model** + **caveats**

> Example TL;DR bullet:
> *"74% no-show on booked interviews — a process failure (no SMS + morning confirmation), not laziness.
> Fixing it ≈ +3-5 hires/month."*

## 2. `scorecard_framework.md` — grade any call 0-60
A 6-block rubric (Opening · Discovery · Trust · Offer · Objection-handling · Close), 0-10 each, plus 2
head metrics (Speed-to-First-Call, Next-Step Booking Rate) and a score→action table.

> Example row (Block 6 — Close):
> *0-3: "call me if you change your mind" · 4-6: "I'll call you" · 7-10: "Tuesday 3pm — confirm? sending
> SMS now."*

Use it weekly: the lead grades 5 random calls → instant coaching signal.

## 3. `objection_library.md` — rebuttals on tap
Every objection heard in the corpus, by category (price / documents / location / trust / "let me
think"…), each as: **real quote → ❌ current weak reply → ✅ strong rebuttal** (built on 4 principles:
agree+pivot, math-to-math, proof over promise, concrete next step).

> Example entry:
> *"You pay too little" → ❌ "that's just our rate" → ✅ "is that net or gross? … here's your math:
> [units]×[rate] minus housing minus fuel = [net]; you're at [their net] today, so we're +[delta]…"*

Becomes a one-page cheat sheet next to the rep.

## 4. `script_template.md` — a rewritten script
A full call script in 3 versions (outgoing first call / follow-up / inbound) + per-segment variants,
assembled directly from the scorecard blocks and the best rebuttals from the library. This is the
"so what do I actually say" artifact.

## 5. `0X_<critical_cluster>.md` — the money deep-dive
A focused analysis of the single highest-EV cluster the corpus revealed — usually a *losing* bucket
hiding an opportunity (e.g. an `offer_mismatch` cluster that's actually a whole un-pitched B2B/upsell
segment). This is the source of recommendation #1 and often pays for the whole exercise.

---

## What "output" means in practice

| You ask | You get back |
|---|---|
| *"Analyze my calls from last quarter"* | the 5 files above in `./reports/`, ready to read |
| *"…and make a PDF"* | + `report.pdf` (cover, KPI cards, table of contents) |
| *"What's the #1 thing to fix?"* | the top Quick-win from the report, with its EV and owner |
| *"Grade this new call"* | a 0-60 score against the scorecard + which blocks were missed |

The deliverables are **working tools, not just a read**: the scorecard drives weekly coaching, the
objection library and script go straight to the rep, and the recommendations are sequenced by impact ×
ease so you know what to ship first.
