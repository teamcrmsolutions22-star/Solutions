# Adapters & Automation — wiring this skill to YOUR stack

The skill itself is **source-agnostic**: it only ever reads local `.txt` files with a YAML header
(see `templates/yaml_frontmatter.md`). Everything *upstream* of that — your CRM, your telephony,
where recordings live, whether anything goes to the cloud — is an **adapter** that lives outside the
skill. This file explains how to wire it, and the two ways to run.

```
[ your CRM / telephony ]  →  [ collect ]  →  [ transcribe ]  →  [ enrich ]  →  ./transcripts/*.txt  →  [ SKILL ]
   HubSpot, Close, Gong,        adapter        Whisper          add YAML        the stable contract
   Pipedrive, Aircall, Zoom…   (per stack)     (any engine)     header
```

> **Google Drive is NOT required.** Storage is a plain local folder (`./transcripts/`). A cloud sink
> (Drive / S3) is optional — only if you *want* to share results with a team. The analysis runs fully
> offline, with zero API keys for the skill itself.

---

## On first run, the skill asks you ONE question — pick a mode

### 🅰️ Mode A — "Connect my CRM (+ optional Drive) and automate it"
You want the whole pipeline: pull calls from your CRM automatically, transcribe them, store the
transcripts (locally and/or on Drive), and analyze on a cadence.

What Claude sets up *with you* (one-time):
1. **Collect adapter** — Claude uses whatever you already have to reach your calls:
   - an **MCP connector** for your CRM (HubSpot, Close, Pipedrive, Salesforce, Gong, Fireflies…), or
   - a **direct API** call (Claude writes a tiny fetch script), or
   - a **manual export** (CSV + a folder of recordings) if you have no API.
2. **Transcribe** — any Whisper engine (mlx-whisper on Mac, faster-whisper on GPU, or Groq/OpenAI API
   for cloud). Drop `< 60s` files (dead air).
3. **Enrich** — map your CRM fields onto the YAML header (`examples/enrich_from_csv.py` is the
   reference). This is the only "glue" that's specific to you.
4. **Store** — `./transcripts/YYYY-MM/*.txt`. *Optional sink:* also push to Google Drive / S3 if you
   asked for it.
5. **Schedule** — Claude wires a recurring job (its `schedule` skill / cron / launchd) to run
   collect→transcribe→enrich daily or weekly, and the full **analysis** monthly (or on demand).

After setup, you just say *"run the call analysis for last month"* (or it runs on the schedule) and
the 5 deliverables appear in `./reports/`.

### 🅱️ Mode B — "I already have transcripts, just analyze them"
You point the skill at a folder of transcripts. Two sub-cases:
- **They already have a YAML header** → skip straight to Phase 1 (metrics).
- **They're plain text / VTT / a CSV export** → run `examples/enrich_from_csv.py` once to stamp the
  YAML header, then Phase 1.

No CRM, no Drive, no scheduling. Fastest path to a report.

---

## CRM adapter cheat-sheet (the "collect" step)

You don't pre-write these — your Claude builds the one you need from what you have. This is just the
map of how each source typically yields calls + recordings:

| Source | How to reach calls | Recording → text |
|---|---|---|
| **HubSpot** | Calls API / MCP connector → call engagements + `recordingUrl` | download mp3 → Whisper |
| **Pipedrive** | Activities API (type=call) + attached files | download → Whisper |
| **Close** | `/activity/call/` API → `recording_url` | download → Whisper |
| **Salesforce** | Task/VoiceCall objects + ContentVersion (audio) | download → Whisper |
| **Gong** | Gong API → transcript endpoint (already transcribed!) | map transcript directly |
| **Fireflies** | GraphQL API → `transcript.sentences` (already transcribed!) | map transcript directly |
| **Zoom Phone / Meetings** | Recordings API → audio + (sometimes) VTT | VTT if present, else Whisper |
| **Aircall / RingCentral / Twilio** | Calls API → `recording` url | download → Whisper |
| **Generic / no API** | manual CSV export + a folder of mp3/txt | `enrich_from_csv.py` |

**Key shortcut:** Gong, Fireflies, Zoom-with-VTT already give you text — you skip Whisper entirely and
go straight to enrich.

---

## The only field that matters to get right: `result_class`

The whole analysis keys off the **outcome bucket** of each call. Map your CRM's deal stage / call
disposition onto 5-7 buckets, e.g.:

| Your CRM concept | → bucket |
|---|---|
| Won / Closed-won / Placed / Hired | `won` |
| Nurture / Follow-up / "thinking" | `thinking` |
| Not now / Future / Passive | `not_now` |
| Lost-price / Lost-terms / Lost-location | `offer_mismatch` |
| No-show / No-answer / Unreachable | `funnel_drop` |
| Disqualified / Not a fit / Spam | `disqualified` |

Everything else in the YAML header is bonus context — `result_class` is the spine.

---

## Minimal turnkey path (no CRM API at all)

1. Export your calls to a **CSV** (id, date, duration, outcome, source, segment, and either a
   `transcript` column or a `transcript_file` path).
2. Put any transcript text files in a folder (named `<id>.txt`), if not inline in the CSV.
3. Run: `python3 examples/enrich_from_csv.py --csv calls.csv --transcripts-dir ./raw --out-dir ./transcripts`
4. Invoke the skill → *"analyze the transcripts in ./transcripts"* → Mode B.

That's the floor: a spreadsheet + a folder, no integrations.
