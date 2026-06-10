import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// === telegram-bot Edge Function ===
// Deployed to Supabase project: call-analysis-bot (beoendcicsoorvipswmh)
// Actions: ping | drain | sync_updates | set_webhook | webhook_info | delete_webhook | notion_check
// Secrets: TELEGRAM_BOT_TOKEN, NOTION_TOKEN. SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY auto-injected.

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const TG_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN") ?? "";
const NOTION_TOKEN = Deno.env.get("NOTION_TOKEN") ?? "";
const REST = `${SUPABASE_URL}/rest/v1`;

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

Deno.serve(async (req) => {
  let body: Record<string, unknown> = {};
  try { body = await req.json(); } catch { /* no body */ }
  const action = (body.action as string) ?? "ping";
  try {
    if (action === "ping") return Response.json({ ok: true, token_set: TG_TOKEN.length > 0, notion_set: NOTION_TOKEN.length > 0, ts: new Date().toISOString() });
    if (action === "drain") return Response.json({ ok: true, ...(await drain()) });
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
