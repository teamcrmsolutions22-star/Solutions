import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

// === calendar Edge Function (Google Calendar) ===
// Project: call-analysis-bot (beoendcicsoorvipswmh). verify_jwt=false (OAuth-callback публичный).
// Actions (POST JSON, защищены заголовком x-fn-secret == tg_config.webhook_secret):
//   {action:'oauth_url'}                         -> {url}  ссылка для подключения Google (один клик)
//   {action:'status'}                            -> {connected, email, calendar_id}
//   {action:'set_calendar', calendar_id}         -> выбрать календарь (по умолчанию 'primary')
//   {action:'slots', days?, duration_min?, work_start?, work_end?, tz?, count?} -> {slots:[ISO,...]}
//   {action:'book', start, duration_min?, summary?, client_email?, description?, tz?} -> {htmlLink, meet}
// GET ?code=...  -> OAuth callback: меняет код на refresh_token, сохраняет в tg_config.
// Secrets (Supabase): GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET. refresh_token хранится в tg_config.

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
async function cfgSet(key: string, value: string) {
  await fetch(`${REST}/tg_config?on_conflict=key`, { method: 'POST', headers: rh({ Prefer: 'resolution=merge-duplicates,return=minimal' }), body: JSON.stringify({ key, value }) });
}

function authUrl(state: string) {
  const p = new URLSearchParams({ client_id: CLIENT_ID, redirect_uri: REDIRECT, response_type: 'code', scope: SCOPE, access_type: 'offline', prompt: 'consent', state });
  return 'https://accounts.google.com/o/oauth2/v2/auth?' + p.toString();
}
async function exchangeCode(code: string) {
  const body = new URLSearchParams({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, code, redirect_uri: REDIRECT, grant_type: 'authorization_code' });
  const r = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
  const j = await r.json();
  if (j.refresh_token) await cfgSet('google_refresh_token', j.refresh_token);
  let email: string | null = null;
  try {
    const ui = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', { headers: { Authorization: `Bearer ${j.access_token}` } });
    email = (await ui.json()).email ?? null;
    if (email) await cfgSet('google_email', email);
  } catch { /* ignore */ }
  return { ok: !!j.refresh_token, email, raw: j.refresh_token ? undefined : j };
}
async function accessToken() {
  const rt = await cfgGet('google_refresh_token');
  if (!rt) throw new Error('Google не подключён (нет refresh_token)');
  const body = new URLSearchParams({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, refresh_token: rt, grant_type: 'refresh_token' });
  const r = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
  const j = await r.json();
  if (!j.access_token) throw new Error('token refresh failed: ' + JSON.stringify(j).slice(0, 200));
  return j.access_token as string;
}

async function freebusy(token: string, timeMin: string, timeMax: string, calId: string) {
  const r = await fetch('https://www.googleapis.com/calendar/v3/freeBusy', { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ timeMin, timeMax, items: [{ id: calId }] }) });
  const j = await r.json();
  return (j.calendars?.[calId]?.busy ?? []) as { start: string; end: string }[];
}
function localParts(date: Date, tz: string) {
  const f = new Intl.DateTimeFormat('en-US', { timeZone: tz, weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false });
  const p = Object.fromEntries(f.formatToParts(date).map((x) => [x.type, x.value]));
  return { weekday: p.weekday, hour: parseInt(p.hour), minute: parseInt(p.minute) };
}
async function slots(o: any) {
  const tz = o.tz || 'Europe/Kyiv', dur = o.duration_min || 30, days = o.days || 7;
  const ws = o.work_start ?? 10, we = o.work_end ?? 19, want = o.count || 12;
  const token = await accessToken();
  const calId = o.calendar_id || (await cfgGet('google_calendar_id')) || 'primary';
  const min = new Date(Date.now() + 60 * 60 * 1000); // не раньше чем через час
  const max = new Date(Date.now() + days * 864e5);
  const busy = await freebusy(token, min.toISOString(), max.toISOString(), calId);
  const iv = busy.map((b) => [Date.parse(b.start), Date.parse(b.end)] as [number, number]);
  const out: string[] = [];
  let t = Math.ceil(min.getTime() / (dur * 60000)) * (dur * 60000);
  const endMs = max.getTime();
  while (t < endMs && out.length < want) {
    const d = new Date(t), lp = localParts(d, tz), slotEnd = t + dur * 60000;
    const wkOk = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(lp.weekday);
    const hourOk = lp.hour >= ws && lp.hour < we;
    const overlap = iv.some(([bs, be]) => t < be && slotEnd > bs);
    if (wkOk && hourOk && !overlap) out.push(new Date(t).toISOString());
    t += dur * 60000;
  }
  return { slots: out, tz, duration_min: dur, calendar_id: calId };
}
async function book(o: any) {
  const token = await accessToken();
  const calId = o.calendar_id || (await cfgGet('google_calendar_id')) || 'primary';
  const dur = o.duration_min || 30, tz = o.tz || 'Europe/Kyiv';
  const start = new Date(o.start), end = new Date(start.getTime() + dur * 60000);
  const event: any = {
    summary: o.summary || 'Консультація CRM Solutions',
    description: o.description || '',
    start: { dateTime: start.toISOString(), timeZone: tz },
    end: { dateTime: end.toISOString(), timeZone: tz },
    attendees: o.client_email ? [{ email: o.client_email }] : [],
    conferenceData: { createRequest: { requestId: 'crm-' + Date.now(), conferenceSolutionKey: { type: 'hangoutsMeet' } } },
    reminders: { useDefault: true },
  };
  const r = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calId)}/events?sendUpdates=all&conferenceDataVersion=1`, { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(event) });
  const j = await r.json();
  if (!r.ok) return { ok: false, error: JSON.stringify(j).slice(0, 300) };
  const meet = j.hangoutLink || j.conferenceData?.entryPoints?.find((e: any) => e.entryPointType === 'video')?.uri || null;
  return { ok: true, htmlLink: j.htmlLink, meet, id: j.id, start: j.start?.dateTime, end: j.end?.dateTime };
}

Deno.serve(async (req) => {
  const url = new URL(req.url);
  if (req.method === 'GET' && url.searchParams.get('code')) {
    const res = await exchangeCode(url.searchParams.get('code')!);
    const html = res.ok
      ? `<html><body style="font-family:sans-serif"><h2>✅ Google Calendar подключён${res.email ? ': ' + res.email : ''}</h2><p>Можно закрыть вкладку.</p></body></html>`
      : `<html><body style="font-family:sans-serif"><h2>⚠️ Не удалось подключить</h2><pre>${JSON.stringify(res.raw)}</pre></body></html>`;
    return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }
  let body: any = {};
  try { body = await req.json(); } catch { /* none */ }
  const action = body.action || url.searchParams.get('action') || 'status';
  const secret = await cfgGet('webhook_secret');
  try {
    if (action === 'oauth_url') {
      if (!CLIENT_ID) return Response.json({ ok: false, error: 'GOOGLE_CLIENT_ID not set' }, { status: 500 });
      return Response.json({ ok: true, url: authUrl(secret || 'state'), redirect_uri: REDIRECT });
    }
    if (['slots', 'book', 'status', 'set_calendar'].includes(action)) {
      if (secret && req.headers.get('x-fn-secret') !== secret) return Response.json({ ok: false, error: 'forbidden' }, { status: 403 });
    }
    if (action === 'status') return Response.json({ ok: true, connected: !!(await cfgGet('google_refresh_token')), email: await cfgGet('google_email'), calendar_id: (await cfgGet('google_calendar_id')) || 'primary' });
    if (action === 'set_calendar') { await cfgSet('google_calendar_id', body.calendar_id || 'primary'); return Response.json({ ok: true, calendar_id: body.calendar_id || 'primary' }); }
    if (action === 'slots') return Response.json({ ok: true, ...(await slots(body)) });
    if (action === 'book') return Response.json(await book(body));
    return Response.json({ ok: false, error: 'unknown action: ' + action }, { status: 400 });
  } catch (e) {
    return Response.json({ ok: false, error: String(e) }, { status: 500 });
  }
});
