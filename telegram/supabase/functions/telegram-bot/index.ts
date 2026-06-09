import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// === telegram-bot Edge Function ===
// Deployed to Supabase project: dogovora-yurii-bot (hfurrbuipqskzegqxtok)
//
// Actions (POST JSON { "action": "..." }):
//   ping         -> { ok, token_set }   (diagnostics, no token needed)
//   drain        -> send pending rows from public.tg_outbox to Telegram
//   sync_updates -> getUpdates -> upsert public.tg_seen_chats (discover chat_ids)
//
// Secrets required: TELEGRAM_BOT_TOKEN (set in Supabase Edge Function secrets).
// SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are auto-injected by the platform.
//
// Triggered internally by pg_cron + pg_net (see migrations/0002_drain_cron.sql),
// because the Claude Code web environment cannot reach api.telegram.org directly
// (network allowlist). All Telegram egress happens here, from Supabase's network.

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const TG_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN") ?? "";
const REST = `${SUPABASE_URL}/rest/v1`;

function restHeaders(extra: Record<string, string> = {}) {
  return {
    "apikey": SERVICE_ROLE,
    "Authorization": `Bearer ${SERVICE_ROLE}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

async function tgApi(method: string, payload: unknown) {
  const r = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return await r.json();
}

async function drain() {
  const res = await fetch(
    `${REST}/tg_outbox?status=eq.pending&order=id.asc&limit=20`,
    { headers: restHeaders() },
  );
  const rows = await res.json();
  if (!Array.isArray(rows) || rows.length === 0) return { drained: 0, sent: 0, failed: 0 };
  if (!TG_TOKEN) return { drained: rows.length, sent: 0, failed: 0, error: "TELEGRAM_BOT_TOKEN not set" };
  let sent = 0, failed = 0;
  for (const row of rows) {
    const payload: Record<string, unknown> = {
      chat_id: row.chat_id,
      text: row.text,
      parse_mode: row.parse_mode ?? "HTML",
      disable_web_page_preview: true,
    };
    if (row.reply_markup) payload.reply_markup = row.reply_markup;
    const j = await tgApi("sendMessage", payload);
    const attempts = (row.attempts ?? 0) + 1;
    if (j.ok) {
      sent++;
      await fetch(`${REST}/tg_outbox?id=eq.${row.id}`, {
        method: "PATCH",
        headers: restHeaders({ "Prefer": "return=minimal" }),
        body: JSON.stringify({
          status: "sent",
          sent_at: new Date().toISOString(),
          tg_message_id: j.result?.message_id ?? null,
          attempts,
        }),
      });
    } else {
      failed++;
      await fetch(`${REST}/tg_outbox?id=eq.${row.id}`, {
        method: "PATCH",
        headers: restHeaders({ "Prefer": "return=minimal" }),
        body: JSON.stringify({
          status: attempts >= 3 ? "error" : "pending",
          attempts,
          error: JSON.stringify(j).slice(0, 500),
        }),
      });
    }
  }
  return { drained: rows.length, sent, failed };
}

async function syncUpdates() {
  const j = await tgApi("getUpdates", {
    allowed_updates: ["message", "edited_message", "callback_query"],
  });
  if (!j.ok) return { ok: false, error: j };
  const seen: Record<string, unknown>[] = [];
  for (const u of j.result ?? []) {
    const from = u.message?.from ?? u.edited_message?.from ?? u.callback_query?.from;
    const chat = u.message?.chat ?? u.edited_message?.chat ?? u.callback_query?.message?.chat;
    if (!from || !chat) continue;
    const name = [from.first_name, from.last_name].filter(Boolean).join(" ") ||
      (from.username ?? String(chat.id));
    seen.push({
      chat_id: chat.id,
      name,
      username: from.username ?? null,
      last_text: u.message?.text ?? null,
      seen_at: new Date().toISOString(),
    });
  }
  if (seen.length) {
    await fetch(`${REST}/tg_seen_chats`, {
      method: "POST",
      headers: restHeaders({ "Prefer": "resolution=merge-duplicates,return=minimal" }),
      body: JSON.stringify(seen),
    });
  }
  return { ok: true, count: seen.length, chats: seen };
}

Deno.serve(async (req) => {
  let body: Record<string, unknown> = {};
  try { body = await req.json(); } catch { /* no body */ }
  const action = (body.action as string) ?? "ping";
  try {
    if (action === "ping") {
      return Response.json({ ok: true, token_set: TG_TOKEN.length > 0, ts: new Date().toISOString() });
    }
    if (action === "drain") {
      return Response.json({ ok: true, ...(await drain()) });
    }
    if (action === "sync_updates") {
      if (!TG_TOKEN) return Response.json({ ok: false, error: "TELEGRAM_BOT_TOKEN not set in function secrets" }, { status: 500 });
      return Response.json(await syncUpdates());
    }
    return Response.json({ ok: false, error: `unknown action: ${action}` }, { status: 400 });
  } catch (e) {
    return Response.json({ ok: false, error: String(e) }, { status: 500 });
  }
});
