import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

// === calendar Edge Function (Google Calendar, мульти-менеджер) ===
// Project: call-analysis-bot (beoendcicsoorvipswmh). verify_jwt=false (OAuth-callback публичный).
// У каждого менеджера — свой календарь: токены лежат в tg_employees (google_refresh_token/email/calendar_id).
// Менеджер определяется по Telegram chat_id. Booking идёт в календарь конкретного менеджера.
//
// Actions (POST JSON, защита x-fn-secret == tg_config.webhook_secret):
//   {action:'oauth_url', manager:<chat_id>}   -> {url} персональная ссылка подключения Google для менеджера
//   {action:'connect_links'}                  -> ссылки подключения для всех активных менеджеров + статус
//   {action:'status', manager?}               -> подключение(я)
//   {action:'set_calendar', manager, calendar_id}
//   {action:'slots', manager, days?, duration_min?, work_start?, work_end?, tz?, count?} -> {slots:[ISO,...]}
//   {action:'book', manager, start, duration_min?, summary?, client_email?, description?, tz?} -> {htmlLink, meet}
// GET ?code=...&state=<chat_id> -> OAuth callback: меняет код на refresh_token, кладёт менеджеру.

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const CLIENT_ID = Deno.env.get('GOOGLE_CLIENT_ID') ?? '';
const CLIENT_SECRET = Deno.env.get('GOOGLE_CLIENT_SECRET') ?? '';
const REST = `${SUPABASE_URL}/rest/v1`;
const REDIRECT = `${SUPABASE_URL}/functions/v1/calendar`;
const SCOPE = 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.email';

function rh(extra: Record<string, string> = {}) {
  return { apikey: SERVICE_ROLE, Authorization: `Bearer ${SERVICE_ROLE}`, 'Content-Type': 'application/json', ...extra };
}
async function cfgGet(key: string): Promise<string | null> {
  const r = await fetch(`${REST}/tg_config?key=eq.${key}&select=value`, { headers: rh() });
  const j = await r.json();
  return Array.isArray(j) && j[0]?.value ? j[0].value : null;
}

const EMP_SEL = 'select=name,username,chat_id,google_email,google_refresh_token,google_calendar_id';
async function empBy(manager: string) {
  const m = String(manager).replace(/^@/, '').trim();
  let url = /^\d+$/.test(m)
    ? `${REST}/tg_employees?chat_id=eq.${m}&${EMP_SEL}`
    : `${REST}/tg_employees?username=ilike.${encodeURIComponent(m)}&${EMP_SEL}&limit=1`;
  let j = await (await fetch(url, { headers: rh() })).json();
  if ((!Array.isArray(j) || !j.length) && !/^\d+$/.test(m)) {
    j = await (await fetch(`${REST}/tg_employees?name=ilike.${encodeURIComponent('*' + m + '*')}&${EMP_SEL}&limit=1`, { headers: rh() })).json();
  }
  return Array.isArray(j) && j[0] ? j[0] : null;
}
async function patchEmp(chatId: string, patch: Record<string, unknown>) {
  await fetch(`${REST}/tg_employees?chat_id=eq.${chatId}`, { method: 'PATCH', headers: rh({ Prefer: 'return=minimal' }), body: JSON.stringify(patch) });
}
async function activeEmps() {
  const j = await (await fetch(`${REST}/tg_employees?is_active=eq.true&${EMP_SEL}&order=name`, { headers: rh() })).json();
  return Array.isArray(j) ? j : [];
}

function authUrl(state: string) {
  const p = new URLSearchParams({ client_id: CLIENT_ID, redirect_uri: REDIRECT, response_type: 'code', scope: SCOPE, access_type: 'offline', prompt: 'consent', state });
  return 'https://accounts.google.com/o/oauth2/v2/auth?' + p.toString();
}
async function exchangeCode(code: string) {
  const body = new URLSearchParams({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, code, redirect_uri: REDIRECT, grant_type: 'authorization_code' });
  const j = await (await fetch('https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body })).json();
  let email: string | null = null;
  try { email = (await (await fetch('https://www.googleapis.com/oauth2/v2/userinfo', { headers: { Authorization: `Bearer ${j.access_token}` } })).json()).email ?? null; } catch { /* ignore */ }
  return { refresh_token: j.refresh_token ?? null, email, raw: j.refresh_token ? undefined : j };
}
async function accessTokenFor(rt: string) {
  const body = new URLSearchParams({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, refresh_token: rt, grant_type: 'refresh_token' });
  const j = await (await fetch('https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body })).json();
  if (!j.access_token) throw new Error('token refresh failed: ' + JSON.stringify(j).slice(0, 200));
  return j.access_token as string;
}
async function resolve(o: any) {
  if (!o.manager) throw new Error('нужен manager (chat_id/имя менеджера)');
  const e = await empBy(o.manager);
  if (!e) throw new Error('менеджер не найден: ' + o.manager);
  if (!e.google_refresh_token) throw new Error(`менеджер ${e.name} ещё не подключил Google Calendar`);
  return { rt: e.google_refresh_token as string, cal: (e.google_calendar_id || 'primary') as string, name: e.name as string };
}

async function freebusy(token: string, timeMin: string, timeMax: string, calId: string) {
  const j = await (await fetch('https://www.googleapis.com/calendar/v3/freeBusy', { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ timeMin, timeMax, items: [{ id: calId }] }) })).json();
  return (j.calendars?.[calId]?.busy ?? []) as { start: string; end: string }[];
}
function localParts(date: Date, tz: string) {
  const f = new Intl.DateTimeFormat('en-US', { timeZone: tz, weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false });
  const p = Object.fromEntries(f.formatToParts(date).map((x) => [x.type, x.value]));
  return { weekday: p.weekday, hour: parseInt(p.hour), minute: parseInt(p.minute) };
}
async function slots(o: any) {
  const { rt, cal, name } = await resolve(o);
  const tz = o.tz || 'Europe/Kyiv', dur = o.duration_min || 30, days = o.days || 7;
  const ws = o.work_start ?? 10, we = o.work_end ?? 19, want = o.count || 12;
  const token = await accessTokenFor(rt);
  const min = new Date(Date.now() + 60 * 60 * 1000), max = new Date(Date.now() + days * 864e5);
  const busy = await freebusy(token, min.toISOString(), max.toISOString(), cal);
  const iv = busy.map((b) => [Date.parse(b.start), Date.parse(b.end)] as [number, number]);
  const out: string[] = [];
  let t = Math.ceil(min.getTime() / (dur * 60000)) * (dur * 60000);
  const endMs = max.getTime();
  while (t < endMs && out.length < want) {
    const lp = localParts(new Date(t), tz), slotEnd = t + dur * 60000;
    const ok = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(lp.weekday) && lp.hour >= ws && lp.hour < we
      && !iv.some(([bs, be]) => t < be && slotEnd > bs);
    if (ok) out.push(new Date(t).toISOString());
    t += dur * 60000;
  }
  return { slots: out, tz, duration_min: dur, manager: name, calendar_id: cal };
}
async function book(o: any) {
  const { rt, cal, name } = await resolve(o);
  const token = await accessTokenFor(rt);
  const dur = o.duration_min || 30, tz = o.tz || 'Europe/Kyiv';
  const start = new Date(o.start), end = new Date(start.getTime() + dur * 60000);
  const event: any = {
    summary: o.summary || `Консультація CRM Solutions${name ? ' — ' + name : ''}`,
    description: o.description || '',
    start: { dateTime: start.toISOString(), timeZone: tz },
    end: { dateTime: end.toISOString(), timeZone: tz },
    attendees: o.client_email ? [{ email: o.client_email }] : [],
    conferenceData: { createRequest: { requestId: 'crm-' + Date.now(), conferenceSolutionKey: { type: 'hangoutsMeet' } } },
    reminders: { useDefault: true },
  };
  const r = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(cal)}/events?sendUpdates=all&conferenceDataVersion=1`, { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(event) });
  const j = await r.json();
  if (!r.ok) return { ok: false, error: JSON.stringify(j).slice(0, 300) };
  const meet = j.hangoutLink || j.conferenceData?.entryPoints?.find((e: any) => e.entryPointType === 'video')?.uri || null;
  return { ok: true, manager: name, htmlLink: j.htmlLink, meet, id: j.id, start: j.start?.dateTime, end: j.end?.dateTime };
}

Deno.serve(async (req) => {
  const url = new URL(req.url);
  if (req.method === 'GET' && url.searchParams.get('code')) {
    const state = url.searchParams.get('state') || '';
    const res = await exchangeCode(url.searchParams.get('code')!);
    let who = '';
    if (res.refresh_token && /^\d+$/.test(state)) {
      const e = await empBy(state);
      await patchEmp(state, { google_refresh_token: res.refresh_token, google_email: res.email });
      who = e?.name ? ' (' + e.name + ')' : '';
    }
    const html = res.refresh_token
      ? `<html><body style="font-family:sans-serif"><h2>✅ Google Calendar подключён${res.email ? ': ' + res.email : ''}${who}</h2><p>Можно закрыть вкладку.</p></body></html>`
      : `<html><body style="font-family:sans-serif"><h2>⚠️ Не удалось подключить</h2><pre>${JSON.stringify(res.raw)}</pre></body></html>`;
    return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }
  let body: any = {};
  try { body = await req.json(); } catch { /* none */ }
  const action = body.action || url.searchParams.get('action') || 'status';
  const secret = await cfgGet('webhook_secret');
  if (secret && req.headers.get('x-fn-secret') !== secret) return Response.json({ ok: false, error: 'forbidden' }, { status: 403 });
  try {
    if (!CLIENT_ID) return Response.json({ ok: false, error: 'GOOGLE_CLIENT_ID not set' }, { status: 500 });
    if (action === 'oauth_url') {
      if (!body.manager) return Response.json({ ok: false, error: 'нужен manager (chat_id)' }, { status: 400 });
      return Response.json({ ok: true, url: authUrl(String(body.manager)), redirect_uri: REDIRECT });
    }
    if (action === 'connect_links') {
      const emps = await activeEmps();
      return Response.json({ ok: true, managers: emps.map((e: any) => ({ name: e.name, chat_id: e.chat_id, connected: !!e.google_refresh_token, url: authUrl(String(e.chat_id)) })) });
    }
    if (action === 'status') {
      if (body.manager) { const e = await empBy(body.manager); return Response.json({ ok: true, manager: e?.name, connected: !!e?.google_refresh_token, email: e?.google_email, calendar_id: e?.google_calendar_id || 'primary' }); }
      const emps = await activeEmps();
      return Response.json({ ok: true, managers: emps.map((e: any) => ({ name: e.name, connected: !!e.google_refresh_token, email: e.google_email })) });
    }
    if (action === 'set_calendar') { if (!body.manager) return Response.json({ ok: false, error: 'нужен manager' }, { status: 400 }); const e = await empBy(body.manager); if (e) await patchEmp(String(e.chat_id), { google_calendar_id: body.calendar_id || 'primary' }); return Response.json({ ok: true, manager: e?.name, calendar_id: body.calendar_id || 'primary' }); }
    if (action === 'slots') return Response.json({ ok: true, ...(await slots(body)) });
    if (action === 'book') return Response.json(await book(body));
    return Response.json({ ok: false, error: 'unknown action: ' + action }, { status: 400 });
  } catch (e) {
    return Response.json({ ok: false, error: String(e) }, { status: 500 });
  }
});
