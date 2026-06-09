# Call Corpus Analysis — a Claude Code skill

**By Ihor Vashchenko (Ігор Ващенко).** Free to use and share **with attribution.**

Turn a *whole corpus* of call transcripts (dozens-to-hundreds) into structured decisions:
a metrics-backed main report, a 6-block call scorecard, an objection library with rebuttal lines,
a call-script template, and a deep-dive on your highest-EV cluster.

Source-agnostic (any CRM / telephony / Zoom / Gong / Fireflies), domain-agnostic
(sales / recruiting / success / support), language-agnostic (anything Whisper handles).

## What's inside
```
call-corpus-analysis-skill/
├── SKILL.md                              # the skill (methodology, 7 phases + setup modes)
├── README.md                             # this file
├── ADAPTERS.md                           # wire to ANY CRM + the two run modes + automation
├── OUTPUTS.md                            # exactly what you get on output (the 5 deliverables)
├── examples/
│   └── enrich_from_csv.py                # reference adapter: CSV export → enriched YAML+text (stdlib)
└── templates/
    ├── yaml_frontmatter.md               # the enrichment header your corpus needs
    ├── fanout_agent_prompt.md            # the per-basket sub-agent brief
    ├── scorecard_framework.md            # 6-block rubric (parametrized)
    ├── objection_library.md              # objection → rebuttal structure
    ├── synthesis_report_outline.md       # main-report skeleton
    └── action_plan.md                    # Phase 6: actions + subtasks + task-manager / implement offer
```

## Two ways to run (the skill asks you on first use)
- **🅰️ Connect my CRM (+ optional Google Drive) and automate** — pull calls automatically,
  transcribe, enrich, store, analyze on a schedule. See `ADAPTERS.md`.
- **🅱️ I already have transcripts — just analyze them** — point it at a folder, get the report.

> **Google Drive is optional, not required.** Storage is a local folder; the analysis runs fully
> offline with zero API keys for the skill itself.

## Install
Copy the folder into your Claude Code skills directory:
```bash
cp -r call-corpus-analysis-skill ~/.claude/skills/call-corpus-analysis
# restart the session so the skill registers, then it triggers on
# "analyze all my calls", "build a call scorecard", "objection library", etc.
```

## The big idea
This is **not** single-call note-taking and **not** transcription — it's the analytical layer
*on top of* an already-transcribed corpus. You bring the transcripts (with a small YAML header per
call); the skill runs a 6-phase method:

0. prepare corpus → 1. parse metadata (quant) → 2. sample by outcome baskets →
3. fan out parallel agents → 4. synthesize 5 deliverables → 5. package + cadence →
6. **activation** (recommendations → actions + subtasks → push to your task manager / implement now).

The agents are **generic built-in sub-agents** — the value is in the prompts and the method, both
shipped here as templates.

## Prerequisites (not included — bring your own)
- a way to **collect** recordings from your source (CRM/telephony API, Zoom/Gong export)
- a **transcription** step (Whisper: mlx-whisper / faster-whisper / Groq / OpenAI API)
- a small **enrich** script that writes the YAML header from your CRM

## Credit
If this skill helps you, please keep the `author` field in `SKILL.md` and a line of credit to
**Ihor Vashchenko**. That's the only ask.
