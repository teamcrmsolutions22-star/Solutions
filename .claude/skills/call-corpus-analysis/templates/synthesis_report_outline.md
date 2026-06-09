# Synthesis — main report skeleton

Fold Phase 1 (metrics) + Phase 3 (agent reports) into this. Each numbered file is a separate `.md`.

## `00_main_report.md`
```
# Call Analysis — {{COMPANY/TEAM}} — {{PERIOD}}
Corpus / Method / Rep / Conversion (one line each)

## TL;DR  (6-9 bullets — the most important things in 1 minute)
## TOP-N levers (prioritized by EV)

## 1. Corpus metrics
   1.1 By month + outgoing/incoming
   1.2 Time-of-day / weekday (under-served windows)
   1.3 Duration by outcome (median+avg; length ≠ quality)
   1.4 Speed-to-First-Call (median/avg/p25/p75/p90)
   1.5 Conversion funnel (intake → won/hired)

## 2. Script — what works / what doesn't
   2.1 Coverage of key elements (% mentioned)
   2.2 How they open / 2.3 Questions they ask / 2.4 What they DON'T do / 2.5 How they close

## 3. Pains, fears, objections (frequency + real quotes)

## 4. TOP-N recommendations
   Quick wins (1-2 wks) / Mid (1 mo) / High (2-3 mo)
   each: impact (EV) + horizon + owner

## 5. Financial model (rough effect estimate)
## 6. Who owns what (table: R# → owner → horizon)
## 7. Analysis caveats (partial sample, no diarization, single rep, transcription errors…)
```

## Companion files
- `scorecard_framework.md` — 6 blocks × 0-10 + 2 head metrics + score→action + edge-case rules
- `objection_library.md` — objections by category → ready rebuttals (4 principles)
- `script_template.md` — 3 versions (outgoing / follow-up / inbound) + per-segment variants,
  built straight from the scorecard blocks + best rebuttals from the library
- `0X_<critical_cluster>.md` — deep-dive on the highest-EV cluster (the source of recommendation #1)

## Packaging
- All `.md` → PDF (cover + KPI cards + TOC) with any markdown→PDF tool.
- `README.md` in the report folder — navigation + TL;DR + next-run cadence.

## Prioritization rule for recommendations
Rank by **impact × ease**. Always separate:
- **Quick wins** (≤2 weeks, often a script line) — ship first
- **Mid** (process / automation / content)
- **High** (hiring, pricing decisions, structural)
Tie each to an **owner** and a **horizon**, and give a rough EV so the reader can sequence them.
