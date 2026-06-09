# Fan-out agent prompt (one basket)

Launch one `general-purpose` agent per basket. Send all agents **in a single message** (parallel).
Substitute every `{{...}}`.

---

```
You are analyzing the call basket "{{BASKET_NAME}}" (result_class = {{RESULT_CLASS}}) from a corpus
of {{COMPANY/TEAM}} calls.

FILES (read ALL of them, one by one):
{{LIST_OF_TXT_PATHS}}

Each file is a call transcript with a YAML header (deal_stage, result_class, speed, segment, source,
duration). Domain context: {{1-2 sentences: who calls whom, what we sell/hire for}}.

Return a STRUCTURED markdown report, EXACTLY these sections:

1. SCOPE: how many files you read, average duration, the typical contact profile in this basket.

2. TOP FEARS / PAINS (with frequency): each one — how many times it appeared + 2-3 VERBATIM quotes
   from the prospect (with name if present in the header). Quote, don't paraphrase.

3. TOP OBJECTIONS (with frequency): the objection wording + how the rep reacted + whether handled.

4. WHAT THE REP DOES WELL / WHERE THEY BLEED THE DEAL: concrete patterns (opening, discovery, trust,
   offer, objection, close). Where a lead is lost — cite the file.

5. NON-OBVIOUS: 1-2 patterns or OPPORTUNITIES visible only in this basket (a hidden segment, an
   under-rated motive, a repeated request). This is the most valuable part — look for what nobody asked.

6. COVERAGE: do the key script elements ({{LIST_KEY_ELEMENTS: company name, trust proof, the offer,
   a math calc, a concrete next-step}}) show up — approximate % in this basket.

RULES:
- Only what is actually in the files. Invent no numbers. No data → write "insufficient data".
- Quotes verbatim, in quotation marks.
- No diarization: if unsure who spoke (rep vs contact), mark "(?)".
- Return ONLY the report (this is your result for synthesis, not a message to a human).
```

---

## Allocating baskets to agents

- 1 basket = 1 agent. A huge basket (>90 files) → split across 2 agents over a sub-sample.
- Give the largest + most suspicious *losing* basket its own agent reading (almost) fully — EV lives there.
- 5-7 agents per run is normal. >10 → batch to stay under the concurrency cap.
