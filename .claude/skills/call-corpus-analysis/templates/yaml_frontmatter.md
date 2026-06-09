# YAML frontmatter the corpus needs

Each transcript = one `.txt` with this header, then the body. The header drives the quant layer
(Phase 1) and basket sampling (Phase 2). Fill what your CRM/source can provide; the more, the better.

```yaml
---
# --- identity ---
call_id: "12345"
source: "telephony | zoom | gong | fireflies | local-upload"

# --- temporal (drives time-of-day + speed metrics) ---
call_date: "2026-04-15"
call_time: "14:32:10"
call_duration_sec: 287

# --- participants ---
direction: outgoing          # outgoing | incoming
manager_id: "527"            # who ran the call (rep)
manager_name: "..."
contact_id: "9876"
contact_phone: "+..."        # use for dedup of auto-created duplicate deals

# --- CRM context (drives funnel + baskets) ---
deal_id: "13245"
deal_stage: "..."
deal_source: "..."           # lead source / campaign
result_class: "thinking"     # THE outcome bucket — the single most important field
result_label: "free-form human note"

# --- domain-specific (parametrize per project) ---
segment: "..."               # profession / plan tier / persona / product line
language_detected: "uk"
quality_score: 0.92          # optional: transcription confidence proxy
---
[transcript body here]
```

## Why a single YAML+text file (not a separate JSON)

- An LLM reads header + content in one prompt
- grep/ripgrep-able: `rg 'result_class: "no_show"' transcripts/`
- works in Obsidian / static site generators / Notion markdown
- one artifact = one source of truth, clean git diffs

## `result_class` is the spine

Define 5-7 mutually-exclusive outcome buckets up front, e.g.:
`won` · `thinking` · `not_now` · `offer_mismatch` · `no_show` · `disqualified`.
Everything downstream (baskets, agents, funnel) keys off this field — invest in getting it right.
