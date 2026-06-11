import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

// === telegram-webhook Edge Function (verify_jwt = false) ===
// - ОНБОРДИНГ: 6 обязательных вопросов профиля (реквизиты для КП) + подключение Google-календаря.
//   Пока профиль не заполнен — бот не пускает дальше. Данные ложатся в tg_employees (Supabase),
//   их использует сервер-агент (Railway) и генератор КП.
// - сообщения после онбординга: ack (умный режим задач — позже, server-agent).
// - callback_query: ✅/🕐/❌ -> статус задачи в Notion.
// Secrets: TELEGRAM_BOT_TOKEN, NOTION_TOKEN (кнопки), GOOGLE_CLIENT_ID (ссылка календаря).

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const TG_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN') ?? '';
const NOTION_TOKEN = Deno.env.get('NOTION_TOKEN') ?? '';
const CLIENT_ID = Deno.env.get('GOOGLE_CLIENT_ID') ?? '';
const REST = `${SUPABASE_URL}/rest/v1`;

const STATUS_MAP: Record<string, string> = { done: 'Готово', defer: 'Отложено', cancel: 'Отменена' };

// шаги онбординга (поля tg_employees) и вопросы
const ORDER = ['full_name_uk', 'position_uk', 'phone', 'email', 'role', 'photo'];
const Q: Record<string, string> = {
  full_name_uk: '1/6 — Напиши своє <b>ПІБ українською</b> (для підпису в КП):',
  position_uk: '2/6 — Твоя <b>посада українською</b> (як показати клієнту в КП):',
  phone: '3/6 — Твій <b>телефон</b>:',
  email: '4/6 — <b>Email</b> для КП:',
  role: '5/6 — Твоя <b>роль</b> (продажник / інтегратор / маркетолог …):',
  photo: '6/6 — Надішли своє <b>фото</b> (картинкою) — воно піде в КП:',
};

function restHeaders(extra: Record<string, string> = {}) {
  return { apikey: SERVICE_ROLE, Authorization: `Bearer ${SERVICE_ROLE}`, 'Content-Type': 'application/json', ...extra };
}
async function tg(method: string, payload: unknown) {
  const r = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/${method}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  return await r.json();
}
async function getConfig(key: string) {
  const r = await fetch(`${REST}/tg_config?key=eq.${key}&select=value`, { headers: restHeaders() });
  const rows = await r.json();
  return Array.isArray(rows) && rows[0]?.value ? rows[0].value : null;
}
function esc(s: string) { return (s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
async function send(chatId: number | string, text: string) {
  await tg('sendMessage', { chat_id: chatId, parse_mode: 'HTML', disable_web_page_preview: true, text });
}
async function getEmp(chatId: number | string) {
  const r = await fetch(`${REST}/tg_employees?chat_id=eq.${chatId}&select=onboarding_step&limit=1`, { headers: restHeaders() });
  const j = await r.json();
  return Array.isArray(j) && j[0] ? j[0] : null;
}
async function patchEmp(chatId: number | string, patch: Record<string, unknown>) {
  await fetch(`${REST}/tg_employees?chat_id=eq.${chatId}`, { method: 'PATCH', headers: restHeaders({ Prefer: 'return=minimal' }), body: JSON.stringify(patch) });
}
function calConnectUrl(chatId: number | string) {
  const p = new URLSearchParams({ client_id: CLIENT_ID, redirect_uri: `${SUPABASE_URL}/functions/v1/calendar`, response_type: 'code', scope: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.email', access_type: 'offline', prompt: 'consent', state: String(chatId) });
  return 'https://accounts.google.com/o/oauth2/v2/auth?' + p.toString();
}
async function savePhoto(fileId: string, chatId: number | string) {
  const gf = await tg('getFile', { file_id: fileId });
  const path = gf.result?.file_path;
  if (!path) return null;
  const bytes = new Uint8Array(await (await fetch(`https://api.telegram.org/file/bot${TG_TOKEN}/${path}`)).arrayBuffer());
  const obj = `${chatId}.jpg`;
  await fetch(`${SUPABASE_URL}/storage/v1/object/avatars/${obj}`, { method: 'POST', headers: { apikey: SERVICE_ROLE, Authorization: `Bearer ${SERVICE_ROLE}`, 'Content-Type': 'image/jpeg', 'x-upsert': 'true' }, body: bytes });
  return `${SUPABASE_URL}/storage/v1/object/public/avatars/${obj}`;
}
async function notionSetStatus(pageId: string, statusName: string) {
  const r = await fetch(`https://api.notion.com/v1/pages/${pageId}`, { method: 'PATCH', headers: { Authorization: `Bearer ${NOTION_TOKEN}`, 'Notion-Version': '2022-06-28', 'Content-Type': 'application/json' }, body: JSON.stringify({ properties: { 'Статус': { select: { name: statusName } } } }) });
  return { ok: r.ok, status: r.status };
}
async function getProfile(chatId: number | string) {
  const r = await fetch(`${REST}/tg_employees?chat_id=eq.${chatId}&select=name,username,full_name_uk,position_uk,phone,email,role,photo_url,birthday,google_email&limit=1`, { headers: restHeaders() });
  const j = await r.json();
  return Array.isArray(j) && j[0] ? j[0] : null;
}
// личная карточка менеджера в Notion (база «Менеджери»), эмодзи-иконка + фото
async function createManagerPage(chatId: number | string, p: any) {
  const dbId = await getConfig('managers_db_id');
  const emoji = (await getConfig('manager_emoji')) || '🧑‍💼';
  if (!dbId || !NOTION_TOKEN) return null;
  const rt = (v: string) => [{ text: { content: v || '' } }];
  const props: any = {
    'Менеджер': { title: [{ text: { content: p.full_name_uk || p.name || String(chatId) } }] },
    'Роль': { rich_text: rt(p.role) },
    'Посада': { rich_text: rt(p.position_uk) },
    'Телефон': { phone_number: p.phone || null },
    'Email': { email: p.email || null },
    'Telegram': { rich_text: rt(p.username ? '@' + p.username : String(chatId)) },
    'Фото': { url: p.photo_url || null },
    'Календар': { email: p.google_email || null },
  };
  if (p.birthday) props['ДР'] = { date: { start: p.birthday } };
  const children = (p.photo_url && String(p.photo_url).startsWith('http')) ? [{ object: 'block', type: 'image', image: { type: 'external', external: { url: p.photo_url } } }] : [];
  const r = await fetch('https://api.notion.com/v1/pages', { method: 'POST', headers: { Authorization: `Bearer ${NOTION_TOKEN}`, 'Notion-Version': '2022-06-28', 'Content-Type': 'application/json' }, body: JSON.stringify({ parent: { database_id: dbId }, icon: { type: 'emoji', emoji }, properties: props, children }) });
  const j = await r.json();
  return r.ok ? (j.url || null) : null;
}
async function startOnboarding(chatId: number | string, name: string) {
  await patchEmp(chatId, { onboarding_step: 'full_name_uk' });
  await send(chatId, `👋 Привіт, <b>${esc(name)}</b>! Я бот-помічник CRM Solutions.
Щоб почати — заповнимо твій профіль (піде в реквізити КП). Усі 6 питань обовʼязкові.

${Q.full_name_uk}`);
}

Deno.serve(async (req) => {
  const secret = req.headers.get('X-Telegram-Bot-Api-Secret-Token');
  const expected = await getConfig('webhook_secret');
  if (!expected || secret !== expected) return new Response('forbidden', { status: 401 });

  let update: any = {};
  try { update = await req.json(); } catch { return Response.json({ ok: true }); }
  const msg = update.message ?? update.edited_message;
  const cb = update.callback_query;

  try {
    if (cb) {
      const data: string = cb.data ?? '';
      const idx = data.indexOf(':');
      const act = idx >= 0 ? data.slice(0, idx) : data;
      const pid = idx >= 0 ? data.slice(idx + 1) : '';
      const statusName = STATUS_MAP[act];
      if (!statusName || !pid) { await tg('answerCallbackQuery', { callback_query_id: cb.id }); return Response.json({ ok: true }); }
      if (!NOTION_TOKEN) { await tg('answerCallbackQuery', { callback_query_id: cb.id, text: 'Notion-токен ещё не настроен', show_alert: true }); return Response.json({ ok: true }); }
      const res = await notionSetStatus(pid, statusName);
      if (res.ok) {
        await tg('answerCallbackQuery', { callback_query_id: cb.id, text: `Статус → ${statusName} ✅` });
        const chatId = cb.message?.chat?.id; const mid = cb.message?.message_id;
        if (chatId && mid) await tg('editMessageReplyMarkup', { chat_id: chatId, message_id: mid, reply_markup: { inline_keyboard: [[{ text: `✅ Отмечено: ${statusName}`, callback_data: 'noop' }]] } });
      } else {
        await tg('answerCallbackQuery', { callback_query_id: cb.id, text: `Ошибка Notion (${res.status})`, show_alert: true });
      }
      return Response.json({ ok: true });
    }

    if (msg && msg.chat) {
      const from = msg.from ?? {};
      const chat = msg.chat;
      const name = [from.first_name, from.last_name].filter(Boolean).join(' ') || from.username || String(chat.id);
      await fetch(`${REST}/tg_seen_chats`, { method: 'POST', headers: restHeaders({ Prefer: 'resolution=merge-duplicates,return=minimal' }), body: JSON.stringify({ chat_id: chat.id, name, username: from.username ?? null, last_text: msg.text ?? null, seen_at: new Date().toISOString() }) });
      await fetch(`${REST}/tg_employees`, { method: 'POST', headers: restHeaders({ Prefer: 'resolution=ignore-duplicates,return=minimal' }), body: JSON.stringify({ chat_id: chat.id, name, username: from.username ?? null, is_active: true }) });

      const text = (msg.text ?? '').trim();
      const emp = await getEmp(chat.id);
      const step = emp?.onboarding_step ?? null;

      if (text === '/profile') { await startOnboarding(chat.id, name); return Response.json({ ok: true }); }
      if (text === '/start') {
        if (step === 'done') { await send(chat.id, `👋 Привіт, <b>${esc(name)}</b>! Профіль уже заповнений. Можеш давати задачі. (/profile — оновити дані)`); return Response.json({ ok: true }); }
        await startOnboarding(chat.id, name); return Response.json({ ok: true });
      }
      if (!step) { await startOnboarding(chat.id, name); return Response.json({ ok: true }); }
      if (step === 'done') { await send(chat.id, '✅ Профіль заповнений. Скоро зможу брати задачі тут. (/profile — оновити дані)'); return Response.json({ ok: true }); }

      // --- mid-onboarding ---
      if (step === 'photo') {
        let photoUrl: string | null = null;
        if (Array.isArray(msg.photo) && msg.photo.length) photoUrl = await savePhoto(msg.photo[msg.photo.length - 1].file_id, chat.id);
        else if (text.startsWith('http')) photoUrl = text;
        if (!photoUrl) { await send(chat.id, 'Будь ласка, надішли <b>фото картинкою</b> або посилання (http…). Це обовʼязково:'); return Response.json({ ok: true }); }
        await patchEmp(chat.id, { photo_url: photoUrl, onboarding_step: 'done', onboarded_at: new Date().toISOString() });
        // зеркалим профиль в Notion (личная карточка менеджера)
        let notionUrl: string | null = null;
        try {
          const prof = await getProfile(chat.id);
          if (prof) { notionUrl = await createManagerPage(chat.id, prof); if (notionUrl) await patchEmp(chat.id, { notion_url: notionUrl }); }
        } catch (_e) { /* не критично для онбординга */ }
        const cardLine = notionUrl ? `
🗂 Твоя картка: ${notionUrl}` : '';
        await send(chat.id, `✅ Профіль заповнений, дякую!${cardLine}

Останнє — підключи свій <b>Google-календар</b> (для бронювання консультацій):
${calConnectUrl(chat.id)}

Після цього зможеш давати мені задачі.`);
        return Response.json({ ok: true });
      }

      // text field step
      if (!text) { await send(chat.id, `Це поле обовʼязкове.
${Q[step] ?? ''}`); return Response.json({ ok: true }); }
      if (step === 'email' && !text.includes('@')) { await send(chat.id, 'Схоже, це не email. Спробуй ще раз:'); return Response.json({ ok: true }); }
      const next = ORDER[ORDER.indexOf(step) + 1];
      await patchEmp(chat.id, { [step]: text, onboarding_step: next });
      await send(chat.id, Q[next]);
      return Response.json({ ok: true });
    }
  } catch (_e) { /* always 200 so Telegram doesn't retry-storm */ }
  return Response.json({ ok: true });
});
