import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

// === fetch-url Edge Function ===
// POST { action:'fetch', url:'<любой URL>' }
// Резолвит редиректы (shr.name/t.ly), для Google Docs/Sheets/Slides тянет export
// (txt/csv), иначе HTML->текст. Кладёт в public.web_fetches. Egress открыт у Supabase.

const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
const REST = `${SUPABASE_URL}/rest/v1`;
const UA = { 'User-Agent': 'Mozilla/5.0 (compatible; call-analysis-bot/1.0)', 'Accept': '*/*', 'Cookie': 'CONSENT=YES+1' };

function restHeaders(extra = {}) {
  return { apikey: SERVICE_ROLE, Authorization: `Bearer ${SERVICE_ROLE}`, 'Content-Type': 'application/json', ...extra };
}

function gid(url, seg) {
  const marker = `/${seg}/d/`;
  const i = url.indexOf(marker);
  if (i < 0) return null;
  const rest = url.slice(i + marker.length).split('/')[0].split('?')[0].split('#')[0];
  return rest || null;
}

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/[ \t]+/g, ' ')
    .trim();
}

async function fetchUrl(url) {
  let r;
  try { r = await fetch(url, { headers: UA, redirect: 'follow' }); }
  catch (e) { return { ok: false, stage: 'fetch', error: String(e) }; }
  const finalUrl = r.url || url;
  const docId = gid(finalUrl, 'document');
  const sheetId = gid(finalUrl, 'spreadsheets');
  const slideId = gid(finalUrl, 'presentation');
  let kind = 'html';
  let exportUrl = null;
  if (docId) { kind = 'gdoc'; exportUrl = `https://docs.google.com/document/d/${docId}/export?format=txt`; }
  else if (sheetId) { kind = 'gsheet'; exportUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`; }
  else if (slideId) { kind = 'gslides'; exportUrl = `https://docs.google.com/presentation/d/${slideId}/export/txt`; }

  let text = '';
  if (exportUrl) {
    const er = await fetch(exportUrl, { headers: UA });
    const ct = er.headers.get('content-type') || '';
    const body = await er.text();
    if (!er.ok || ct.indexOf('text/html') >= 0) {
      return { ok: false, stage: 'gdoc', kind, status: er.status, final_url: finalUrl, error: 'документ не публичный или нет доступа (нужно «доступ по ссылке: любой»)' };
    }
    text = body.trim();
  } else {
    const ct = r.headers.get('content-type') || '';
    const body = await r.text();
    if (ct.indexOf('html') >= 0) { text = stripHtml(body); kind = 'html'; }
    else { text = body.trim(); kind = 'text'; }
  }

  if (!text) return { ok: false, stage: 'empty', kind, final_url: finalUrl, error: 'no text extracted' };
  await fetch(`${REST}/web_fetches`, {
    method: 'POST', headers: restHeaders({ Prefer: 'return=minimal' }),
    body: JSON.stringify({ url, final_url: finalUrl, kind, text, chars: text.length }),
  });
  return { ok: true, kind, final_url: finalUrl, chars: text.length, preview: text.slice(0, 400) };
}

Deno.serve(async (req) => {
  let body = {};
  try { body = await req.json(); } catch { /* none */ }
  const action = body.action || 'fetch';
  try {
    if (action === 'ping') return Response.json({ ok: true, ts: new Date().toISOString() });
    if (action === 'fetch') {
      const url = body.url;
      if (!url) return Response.json({ ok: false, error: 'missing url' }, { status: 400 });
      const res = await fetchUrl(url);
      return Response.json(res, { status: res.ok ? 200 : 502 });
    }
    return Response.json({ ok: false, error: `unknown action: ${action}` }, { status: 400 });
  } catch (e) {
    return Response.json({ ok: false, error: String(e) }, { status: 500 });
  }
});
