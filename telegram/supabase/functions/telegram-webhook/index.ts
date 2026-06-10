import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// === telegram-webhook Edge Function (verify_jwt = false) ===
// Deployed to Supabase project: call-analysis-bot (beoendcicsoorvipswmh)
// Validates Telegram's secret_token header (tg_config.webhook_secret). Handles:
//   - messages: welcome reply + auto-register sender (Part 1)
//   - callback_query: ✅/🕐/❌ buttons -> update task «Статус» in Notion (Part 2)
// Secrets: TELEGRAM_BOT_TOKEN (required), NOTION_TOKEN (required for buttons->Notion).
// Set the webhook via telegram-bot action set_webhook (drop_pending_updates=true).

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const TG_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN") ?? "";
const NOTION_TOKEN = Deno.env.get("NOTION_TOKEN") ?? "";
const REST = `${SUPABASE_URL}/rest/v1`;

// callback action -> Notion «Статус» select value
const STATUS_MAP: Record<string, string> = { done: "Готово", defer: "Отложено", cancel: "Отменена" };

function restHeaders(extra: Record<string, string> = {}) {
  return { "apikey": SERVICE_ROLE, "Authorization": `Bearer ${SERVICE_ROLE}`, "Content-Type": "application/json", ...extra };
}
async function tg(method: string, payload: unknown) {
  const r = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/${method}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  return await r.json();
}
async function getConfig(key: string): Promise<string | null> {
  const r = await fetch(`${REST}/tg_config?key=eq.${key}&select=value`, { headers: restHeaders() });
  const rows = await r.json();
  return Array.isArray(rows) && rows[0]?.value ? rows[0].value : null;
}
function esc(s: string) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

async function notionSetStatus(pageId: string, statusName: string) {
  const r = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    method: "PATCH",
    headers: { "Authorization": `Bearer ${NOTION_TOKEN}`, "Notion-Version": "2022-06-28", "Content-Type": "application/json" },
    body: JSON.stringify({ properties: { "Статус": { select: { name: statusName } } } }),
  });
  return { ok: r.ok, status: r.status, body: (await r.text()).slice(0, 300) };
}

Deno.serve(async (req) => {
  const secret = req.headers.get("X-Telegram-Bot-Api-Secret-Token");
  const expected = await getConfig("webhook_secret");
  if (!expected || secret !== expected) return new Response("forbidden", { status: 401 });

  let update: any = {};
  try { update = await req.json(); } catch { return Response.json({ ok: true }); }

  const msg = update.message ?? update.edited_message;
  const cb = update.callback_query;

  try {
    if (cb) {
      const data: string = cb.data ?? "";
      const idx = data.indexOf(":");
      const act = idx >= 0 ? data.slice(0, idx) : data;
      const pid = idx >= 0 ? data.slice(idx + 1) : "";
      const statusName = STATUS_MAP[act];
      if (!statusName || !pid) { await tg("answerCallbackQuery", { callback_query_id: cb.id }); return Response.json({ ok: true }); }
      if (!NOTION_TOKEN) { await tg("answerCallbackQuery", { callback_query_id: cb.id, text: "Notion-токен ещё не настроен", show_alert: true }); return Response.json({ ok: true }); }
      const res = await notionSetStatus(pid, statusName);
      if (res.ok) {
        await tg("answerCallbackQuery", { callback_query_id: cb.id, text: `Статус → ${statusName} ✅` });
        const chatId = cb.message?.chat?.id; const mid = cb.message?.message_id;
        if (chatId && mid) await tg("editMessageReplyMarkup", { chat_id: chatId, message_id: mid, reply_markup: { inline_keyboard: [[{ text: `✅ Отмечено: ${statusName}`, callback_data: "noop" }]] } });
      } else {
        await tg("answerCallbackQuery", { callback_query_id: cb.id, text: `Ошибка Notion (${res.status})`, show_alert: true });
      }
      return Response.json({ ok: true });
    }

    if (msg && msg.chat) {
      const from = msg.from ?? {};
      const chat = msg.chat;
      const name = [from.first_name, from.last_name].filter(Boolean).join(" ") || from.username || String(chat.id);
      await fetch(`${REST}/tg_seen_chats`, { method: "POST", headers: restHeaders({ "Prefer": "resolution=merge-duplicates,return=minimal" }), body: JSON.stringify({ chat_id: chat.id, name, username: from.username ?? null, last_text: msg.text ?? null, seen_at: new Date().toISOString() }) });
      await fetch(`${REST}/tg_employees`, { method: "POST", headers: restHeaders({ "Prefer": "resolution=ignore-duplicates,return=minimal" }), body: JSON.stringify({ chat_id: chat.id, name, username: from.username ?? null, is_active: true }) });
      const text = (msg.text ?? "").trim();
      if (text.startsWith("/start")) {
        await tg("sendMessage", { chat_id: chat.id, parse_mode: "HTML", text: `👋 Привет, <b>${esc(name)}</b>!\nТы подключена к боту разбора звонков — буду присылать сюда задачи со встреч. ✅` });
      } else {
        await tg("sendMessage", { chat_id: chat.id, parse_mode: "HTML", text: `✅ Принял! Я бот разбора звонков: присылаю задачи по итогам разборов. Писать сюда ничего не нужно.` });
      }
      return Response.json({ ok: true });
    }
  } catch (_e) { /* always 200 so Telegram doesn't retry-storm */ }
  return Response.json({ ok: true });
});
