import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

// === vidyard-transcript Edge Function ===
// Deployed to Supabase project: call-analysis-bot (beoendcicsoorvipswmh)
// POST { action:'fetch', url:'https://share.vidyard.com/watch/<id>' }
// Public path: fetch Vidyard player JSON -> find caption .vtt url(s) -> parse to text.
// Stores in public.vidyard_transcripts; Claude reads it via Supabase MCP
// (web env has no egress to vidyard). Rich diagnostics on failure.
// Validated 2026-06 on a public share video (via VTT, no API key).

const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
const REST = `${SUPABASE_URL}/rest/v1`;
const UA = { 'User-Agent': 'Mozilla/5.0 (compatible; call-analysis-bot/1.0)', 'Accept': '*/*' };

function restHeaders(extra = {}) {
  return { apikey: SERVICE_ROLE, Authorization: `Bearer ${SERVICE_ROLE}`, 'Content-Type': 'application/json', ...extra };
}

function idsFromUrl(url) {
  const clean = url.split('?')[0].split('#')[0];
  const parts = clean.split('/').filter(Boolean);
  const cand = [];
  for (let i = parts.length - 1; i >= 0 && cand.length < 3; i--) {
    const p = parts[i];
    if (/^[A-Za-z0-9_-]{6,}$/.test(p) && p.indexOf('.') < 0) cand.push(p);
  }
  return cand;
}

function allStrings(obj, acc) {
  if (obj == null) return;
  if (Array.isArray(obj)) { for (const x of obj) allStrings(x, acc); return; }
  if (typeof obj === 'object') { for (const k in obj) allStrings(obj[k], acc); return; }
  if (typeof obj === 'string') acc.push(obj);
}

function deepFindKeys(obj, keys, acc) {
  if (obj == null) return;
  if (Array.isArray(obj)) { for (const x of obj) deepFindKeys(x, keys, acc); return; }
  if (typeof obj === 'object') {
    for (const k in obj) {
      const v = obj[k];
      if (typeof v === 'string' && keys.includes(k)) acc.push(v);
      else deepFindKeys(v, keys, acc);
    }
  }
}

function parseVtt(vtt) {
  const out = [];
  for (const raw of vtt.split('\n')) {
    let t = raw.split('\r').join('').trim();
    if (!t || t === 'WEBVTT' || t.startsWith('NOTE') || t.startsWith('STYLE')) continue;
    if (t.indexOf('-->') >= 0) continue;
    if (/^[0-9]+$/.test(t)) continue;
    t = t.replace(/<[^>]+>/g, '').trim();
    if (t) out.push(t);
  }
  const dedup = [];
  for (const s of out) if (dedup[dedup.length - 1] !== s) dedup.push(s);
  return dedup.join(' ').split('  ').join(' ').trim();
}

async function getText(u, headers) {
  try { const r = await fetch(u, { headers }); return { ok: r.ok, status: r.status, text: await r.text() }; }
  catch (e) { return { ok: false, status: 0, text: String(e) }; }
}

async function fetchTranscript(url) {
  const ids = idsFromUrl(url);
  if (!ids.length) return { ok: false, stage: 'parse', error: 'no id in url' };
  const tried = [];
  let vttUrls = [];
  let directText = '';
  let usedId = null;
  let lastBody = '';
  for (const id of ids) {
    for (const ep of [`https://play.vidyard.com/player/${id}.json`, `https://play.vidyard.com/${id}.json`]) {
      const r = await getText(ep, { ...UA, Accept: 'application/json' });
      tried.push({ url: ep, status: r.status });
      lastBody = r.text;
      if (!r.ok) continue;
      let j; try { j = JSON.parse(r.text); } catch { continue; }
      const strs = []; allStrings(j, strs);
      vttUrls = strs.filter((s) => s.indexOf('.vtt') >= 0);
      const txtAcc = []; deepFindKeys(j, ['plain_text', 'formatted_text', 'transcript'], txtAcc);
      directText = txtAcc.filter((x) => x && x.length > 40).join('\n').trim();
      usedId = id;
      if (vttUrls.length || directText) break;
    }
    if (vttUrls.length || directText) break;
  }

  let transcript = '';
  let via = '';
  if (vttUrls.length) {
    const v = await getText(vttUrls[0], UA);
    tried.push({ url: vttUrls[0], status: v.status });
    if (v.ok) { transcript = parseVtt(v.text); via = 'vtt'; }
  }
  if (!transcript && directText) { transcript = directText; via = 'player_text'; }

  if (!transcript) {
    return { ok: false, stage: 'no_captions', ids, tried, error: 'no caption .vtt / transcript found (видео без субтитров/транскрипта, или закрытое — нужен API-ключ владельца)', raw_excerpt: (lastBody || '').slice(0, 500) };
  }

  await fetch(`${REST}/vidyard_transcripts`, {
    method: 'POST',
    headers: restHeaders({ Prefer: 'return=minimal' }),
    body: JSON.stringify({ share_url: url, video_uuid: usedId, transcript, chars: transcript.length, status: 'ok' }),
  });
  return { ok: true, video_uuid: usedId, via, vtt_count: vttUrls.length, chars: transcript.length, preview: transcript.slice(0, 400) };
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
      const res = await fetchTranscript(url);
      return Response.json(res, { status: res.ok ? 200 : 502 });
    }
    return Response.json({ ok: false, error: `unknown action: ${action}` }, { status: 400 });
  } catch (e) {
    return Response.json({ ok: false, error: String(e) }, { status: 500 });
  }
});
