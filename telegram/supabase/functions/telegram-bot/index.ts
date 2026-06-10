import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// === telegram-bot Edge Function ===
// Deployed to Supabase project: call-analysis-bot (beoendcicsoorvipswmh)
// Actions: ping | drain | sync_updates | set_webhook | webhook_info | delete_webhook | notion_check
//        | report (mode: weekly|overdue|both)  -- дайджест по Notion-договорённостям в Telegram
// Secrets: TELEGRAM_BOT_TOKEN, NOTION_TOKEN. SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY auto-injected.

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const TG_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN") ?? "";
const NOTION_TOKEN = Deno.env.get("NOTION_TOKEN") ?? "";
const REST = `${SUPABASE_URL}/rest/v1`;
const DONE = ["Готово", "Отменена"];

function restHeaders(extra: Record<string, string> = {}) {
  return { "apikey": SERVICE_ROLE, "Authorization": `Bearer ${SERVICE_ROLE}`, "Content-Type": "application/json", ...extra };
}
async function getConfig(key: string): Promise<string | null> {
  const r = await fetch(`${REST}/tg_config?key=eq.${key}&select=value`, { headers: restHeaders() });
  const rows = await r.json();
  return Array.isArray(rows) && rows[0]?.value ? rows[0].value : null;
}
async function tgApi(method: string, payload: unknown) {
  const r = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/${method}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  return await r.json();
}

async function drain() {
  const res = await fetch(`${REST}/tg_outbox?status=eq.pending&order=id.asc&limit=20`, { headers: restHeaders() });
  const rows = await res.json();
  if (!Array.isArray(rows) || rows.length === 0) return { drained: 0, sent: 0, failed: 0 };
  if (!TG_TOKEN) return { drained: rows.length, sent: 0, failed: 0, error: "TELEGRAM_BOT_TOKEN not set" };
  let sent = 0, failed = 0;
  for (const row of rows) {
    const payload: Record<string, unknown> = { chat_id: row.chat_id, text: row.text, parse_mode: row.parse_mode ?? "HTML", disable_web_page_preview: true };
    if (row.reply_markup) payload.reply_markup = row.reply_markup;
    const j = await tgApi("sendMessage", payload);
    const attempts = (row.attempts ?? 0) + 1;
    if (j.ok) { sent++; await fetch(`${REST}/tg_outbox?id=eq.${row.id}`, { method: "PATCH", headers: restHeaders({ "Prefer": "return=minimal" }), body: JSON.stringify({ status: "sent", sent_at: new Date().toISOString(), tg_message_id: j.result?.message_id ?? null, attempts }) }); }
    else { failed++; await fetch(`${REST}/tg_outbox?id=eq.${row.id}`, { method: "PATCH", headers: restHeaders({ "Prefer": "return=minimal" }), body: JSON.stringify({ status: attempts >= 3 ? "error" : "pending", attempts, error: JSON.stringify(j).slice(0, 500) }) }); }
  }
  return { drained: rows.length, sent, failed };
}

async function syncUpdates() {
  const j = await tgApi("getUpdates", { allowed_updates: ["message", "edited_message", "callback_query"] });
  if (!j.ok) return { ok: false, error: j };
  const seen: Record<string, unknown>[] = [];
  for (const u of j.result ?? []) {
    const from = u.message?.from ?? u.edited_message?.from ?? u.callback_query?.from;
    const chat = u.message?.chat ?? u.edited_message?.chat ?? u.callback_query?.message?.chat;
    if (!from || !chat) continue;
    const name = [from.first_name, from.last_name].filter(Boolean).join(" ") || (from.username ?? String(chat.id));
    seen.push({ chat_id: chat.id, name, username: from.username ?? null, last_text: u.message?.text ?? null, seen_at: new Date().toISOString() });
  }
  if (seen.length) await fetch(`${REST}/tg_seen_chats`, { method: "POST", headers: restHeaders({ "Prefer": "resolution=merge-duplicates,return=minimal" }), body: JSON.stringify(seen) });
  return { ok: true, count: seen.length, chats: seen };
}

async function notionCheck() {
  if (!NOTION_TOKEN) return { ok: false, set: false, hint: "NOTION_TOKEN secret is empty" };
  const r = await fetch("https://api.notion.com/v1/users/me", { headers: { "Authorization": `Bearer ${NOTION_TOKEN}`, "Notion-Version": "2022-06-28" } });
  const body = await r.text();
  let botName = null; try { botName = JSON.parse(body)?.name ?? null; } catch { /*-*/ }
  return { ok: r.ok, set: true, token_len: NOTION_TOKEN.length, token_prefix: NOTION_TOKEN.slice(0, 4), trailing_space: /\s$/.test(NOTION_TOKEN), status: r.status, bot_name: botName, body: r.ok ? undefined : body.slice(0, 200) };
}

// ---------- REPORT (Notion -> Telegram) ----------
function esc(s: string) { return (s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
function plain(prop: any): string {
  if (!prop) return "";
  if (prop.type === "title") return (prop.title ?? []).map((t: any) => t.plain_text).join("");
  if (prop.type === "rich_text") return (prop.rich_text ?? []).map((t: any) => t.plain_text).join("");
  if (prop.type === "select") return prop.select?.name ?? "";
  if (prop.type === "date") return prop.date?.start ?? "";
  return "";
}
function ddmm(iso: string) { if (!iso) return ""; const d = new Date(iso); return `${String(d.getUTCDate()).padStart(2, "0")}.${String(d.getUTCMonth() + 1).padStart(2, "0")}`; }

async function notionQueryAll(dbId: string) {
  const out: any[] = [];
  let cursor: string | undefined = undefined;
  for (let i = 0; i < 20; i++) {
    const body: Record<string, unknown> = { page_size: 100 };
    if (cursor) body.start_cursor = cursor;
    const r = await fetch(`https://api.notion.com/v1/databases/${dbId}/query`, {
      method: "POST", headers: { "Authorization": `Bearer ${NOTION_TOKEN}`, "Notion-Version": "2022-06-28", "Content-Type": "application/json" }, body: JSON.stringify(body),
    });
    const j = await r.json();
    if (!r.ok) throw new Error(`notion ${r.status}: ${JSON.stringify(j).slice(0, 200)}`);
    for (const p of j.results ?? []) out.push(p);
    if (!j.has_more) break;
    cursor = j.next_cursor;
  }
  return out;
}

function rowOf(p: any) {
  const pr = p.properties ?? {};
  return {
    url: p.url, lastEdited: p.last_edited_time,
    task: plain(pr["Задача"]) || "(без названия)",
    resp: plain(pr["Ответственный"]),
    status: plain(pr["Статус"]),
    deadline: plain(pr["Дедлайн"]),
    priority: plain(pr["Приоритет"]),
    source: plain(pr["Источник встречи"]),
  };
}
function line(t: any) {
  const bits = [`• <a href="${t.url}">${esc(t.task)}</a>`];
  if (t.resp) bits.push(`— ${esc(t.resp)}`);
  if (t.deadline) bits.push(`(до ${ddmm(t.deadline)})`);
  return bits.join(" ");
}
function capList(arr: any[], n = 12) {
  const head = arr.slice(0, n).map(line).join("\n");
  const extra = arr.length > n ? `\n…и ещё ${arr.length - n}` : "";
  return head + extra;
}

async function enqueue(chatId: number | string, text: string) {
  await fetch(`${REST}/tg_outbox`, { method: "POST", headers: restHeaders({ "Prefer": "return=minimal" }), body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", status: "pending" }) });
}

async function activeEmployees() {
  const r = await fetch(`${REST}/tg_employees?is_active=eq.true&select=name,username,chat_id`, { headers: restHeaders() });
  const rows = await r.json();
  return Array.isArray(rows) ? rows : [];
}
function matchEmployee(resp: string, emps: any[]) {
  if (!resp) return null;
  const r = resp.toLowerCase().replace(/^@/, "").trim();
  return emps.find((e) => (e.username && r === e.username.toLowerCase())
    || (e.name && (r === e.name.toLowerCase() || e.name.toLowerCase().includes(r) || r.includes(e.name.toLowerCase())))) ?? null;
}

async function report(mode: string) {
  if (!NOTION_TOKEN) return { ok: false, error: "NOTION_TOKEN not set" };
  const dbId = (await getConfig("notion_db_id")) ?? "45d6a662aa624d46aea70538a5389d2a";
  const mgr = (await getConfig("report_chat_id")) ?? "164719255";
  const pages = await notionQueryAll(dbId);
  const rows = pages.map(rowOf);
  const todayStr = new Date().toISOString().slice(0, 10);
  const weekAgo = new Date(Date.now() - 7 * 864e5).toISOString();
  const in7 = new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 10);

  const open = rows.filter((t) => !DONE.includes(t.status));
  const overdue = open.filter((t) => t.deadline && t.deadline.slice(0, 10) < todayStr)
    .sort((a, b) => a.deadline.localeCompare(b.deadline));
  const dueSoon = open.filter((t) => t.deadline && t.deadline.slice(0, 10) >= todayStr && t.deadline.slice(0, 10) <= in7)
    .sort((a, b) => a.deadline.localeCompare(b.deadline));
  const noDate = open.filter((t) => !t.deadline);
  const doneWeek = rows.filter((t) => t.status === "Готово" && t.lastEdited >= weekAgo);

  let enqueued = 0;

  if (mode === "weekly" || mode === "both") {
    const parts = ["📋 <b>Еженедельный отчёт по договорённостям</b>", "<i>что обещали — что сделали</i>", ""];
    parts.push(`🔴 <b>Просрочено: ${overdue.length}</b>` + (overdue.length ? "\n" + capList(overdue) : ""), "");
    parts.push(`🟡 <b>На этой неделе: ${dueSoon.length}</b>` + (dueSoon.length ? "\n" + capList(dueSoon) : ""), "");
    parts.push(`✅ <b>Сделано за неделю: ${doneWeek.length}</b>` + (doneWeek.length ? "\n" + capList(doneWeek) : ""), "");
    parts.push(`⚪️ <b>Без дедлайна: ${noDate.length}</b>`);
    await enqueue(mgr, parts.join("\n")); enqueued++;
  }

  if (mode === "overdue" || mode === "both") {
    if (overdue.length) {
      const emps = await activeEmployees();
      const byChat = new Map<string, any[]>();
      const unmatched: any[] = [];
      for (const t of overdue) {
        const e = matchEmployee(t.resp, emps);
        if (e && String(e.chat_id) !== String(mgr)) {
          const k = String(e.chat_id); if (!byChat.has(k)) byChat.set(k, []); byChat.get(k)!.push(t);
        } else if (!e) unmatched.push(t);
      }
      for (const [chat, list] of byChat) {
        await enqueue(chat, [`⏰ <b>Напоминание: просроченные задачи (${list.length})</b>`, capList(list)].join("\n")); enqueued++;
      }
      // менеджеру — полная сводка просрочки, с пометкой нераспознанных исполнителей
      const mparts = [`⏰ <b>Просрочка по команде: ${overdue.length}</b>`, capList(overdue)];
      if (unmatched.length) {
        const names = [...new Set(unmatched.map((t) => t.resp).filter(Boolean))].join(", ");
        mparts.push(`\n<i>Без привязки к Telegram: ${esc(names) || "—"}</i>`);
      }
      await enqueue(mgr, mparts.join("\n")); enqueued++;
    }
  }
  return { ok: true, mode, totals: { open: open.length, overdue: overdue.length, dueSoon: dueSoon.length, doneWeek: doneWeek.length, noDate: noDate.length }, enqueued };
}

Deno.serve(async (req) => {
  let body: Record<string, unknown> = {};
  try { body = await req.json(); } catch { /* no body */ }
  const action = (body.action as string) ?? "ping";
  try {
    if (action === "ping") return Response.json({ ok: true, token_set: TG_TOKEN.length > 0, notion_set: NOTION_TOKEN.length > 0, ts: new Date().toISOString() });
    if (action === "drain") return Response.json({ ok: true, ...(await drain()) });
    if (action === "report") return Response.json(await report((body.mode as string) ?? "weekly"));
    if (action === "notion_check") return Response.json(await notionCheck());
    if (action === "sync_updates") { if (!TG_TOKEN) return Response.json({ ok: false, error: "TELEGRAM_BOT_TOKEN not set" }, { status: 500 }); return Response.json(await syncUpdates()); }
    if (action === "webhook_info") return Response.json(await tgApi("getWebhookInfo", {}));
    if (action === "delete_webhook") return Response.json(await tgApi("deleteWebhook", { drop_pending_updates: false }));
    if (action === "set_webhook") {
      const secret = await getConfig("webhook_secret");
      if (!secret) return Response.json({ ok: false, error: "webhook_secret missing in tg_config" }, { status: 500 });
      const url = `${SUPABASE_URL}/functions/v1/telegram-webhook`;
      const j = await tgApi("setWebhook", { url, secret_token: secret, allowed_updates: ["message", "edited_message", "callback_query"], drop_pending_updates: true });
      return Response.json({ ok: !!j.ok, webhook_url: url, result: j });
    }
    return Response.json({ ok: false, error: `unknown action: ${action}` }, { status: 400 });
  } catch (e) {
    return Response.json({ ok: false, error: String(e) }, { status: 500 });
  }
});
