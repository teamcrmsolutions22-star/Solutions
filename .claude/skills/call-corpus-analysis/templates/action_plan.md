# Action plan — turning findings into tracked work (Phase 6)

After the 5 deliverables, the skill produces **`action_plan.md`**: every recommendation expanded into
an actionable item with subtasks, an owner, an acceptance test, and a flag for what **Claude can do
itself** vs a human. Then it **offers** (never auto-does) three routes.

## Per-action format
```
### R{n} — {imperative action}
- Owner: {role}        Horizon: {1-3 days | 1-2 wks | 2-3 mo}        EV: {short impact estimate}
- Acceptance (done = ?): {measurable check, e.g. "coverage ≥80% on next 10 calls"}
- Subtasks:
  - [ ] {step}  — 🤖 Claude can do this
  - [ ] {step}  — 👤 human ({role})
  - [ ] {step}  — 🤖/👤
```

## The offer the skill makes after writing the plan
> **"What next?**
> **A) Push these into your task manager, broken into a parent task + subtasks**
>    (Notion, Linear, Asana, ClickUp, Jira, Trello, Todoist — whatever you have connected; a Markdown
>    checklist if none),
> **B) I start implementing the ones I can do now** (draft the new script, build the math-calculator
>    sheet, write the SMS/templates, spec the CRM kanban…),
> **C) Just keep `action_plan.md`."**

**Rule:** propose, don't impose — never auto-push to a task manager or auto-implement without the user
choosing. Map one R → one **parent task**; its subtasks → **sub-items / a checklist**, so the top level
stays clean and details collapse underneath.

---

## Worked example (from a real run)

### R1 — Add a B2B branch to the call script
- Owner: rep + team lead   Horizon: 1-3 days   EV: highest — 3 calls already surfaced ≥4 workers + a ready 80€/m² rate
- Acceptance (done = ?): on the next 10 "own-brigade" calls, the rep states a rate range + asks crew size + warm-transfers to the decision-maker in ≥80% of them
- Subtasks:
  - [ ] Draft the B2B script branch: trigger phrase → rate orientation → 3 questions → live transfer — 🤖 Claude
  - [ ] Approve the quotable B2B rate range + the rule for when to transfer live — 👤 team lead
  - [ ] Create a CRM stage/kanban "Subcontract → decision-maker" with a <24h SLA — 👤 RevOps
  - [ ] Role-play 5 cases on the new branch — 👤 rep
  - [ ] Measure coverage on the next 10 B2B calls — 🤖 Claude (re-run the skill on that slice)

### R2 — Make a booked next-step mandatory at close
- Owner: rep   Horizon: 1-3 days   EV: closes the cross-basket gap (0-17% today)
- Acceptance: ≥70% of calls end with a day+time next step + SMS sent
- Subtasks:
  - [ ] Write the close-lock script lines + 2 SMS templates — 🤖 Claude
  - [ ] Wire an SMS/confirmation step in the CRM — 👤 RevOps
  - [ ] Track Next-Step Booking Rate weekly — 🤖 Claude (from the YAML headers)

---

## What "Claude can do itself" typically covers
Right inside the same session, on request: draft the rewritten **script** and **objection one-pager**,
build a **math-calculator** spreadsheet, write **SMS / email templates**, **spec** a CRM kanban/stage,
draft a **manager-coaching checklist**, or **re-run the skill** on a fresh slice to measure whether a
change worked. Human-only items (pricing decisions, hiring, approvals) stay flagged 👤 for the owner.
