import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

// === audio-transcribe Edge Function ===
// Deployed to Supabase project: call-analysis-bot (beoendcicsoorvipswmh)
// POST { action:'fetch', url:'<audio url>', language?:'ru' }
// Downloads audio by URL -> Whisper API (Groq or OpenAI, auto by available key)
// -> stores text in public.audio_transcripts. Claude reads it via Supabase MCP.
// Secret: GROQ_API_KEY (recommended) OR OPENAI_API_KEY. Whisper file limit ~25MB.

const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
const GROQ = Deno.env.get('GROQ_API_KEY') || '';
const OPENAI = Deno.env.get('OPENAI_API_KEY') || '';
const REST = `${SUPABASE_URL}/rest/v1`;

function restHeaders(extra = {}) {
  return { apikey: SERVICE_ROLE, Authorization: `Bearer ${SERVICE_ROLE}`, 'Content-Type': 'application/json', ...extra };
}

function pickProvider() {
  if (GROQ) return { name: 'groq', url: 'https://api.groq.com/openai/v1/audio/transcriptions', model: 'whisper-large-v3', key: GROQ };
  if (OPENAI) return { name: 'openai', url: 'https://api.openai.com/v1/audio/transcriptions', model: 'whisper-1', key: OPENAI };
  return null;
}

async function transcribe(url, lang) {
  const p = pickProvider();
  if (!p) return { ok: false, stage: 'config', error: 'set GROQ_API_KEY or OPENAI_API_KEY in Edge Function secrets' };
  let a;
  try { a = await fetch(url); } catch (e) { return { ok: false, stage: 'download', error: String(e) }; }
  if (!a.ok) return { ok: false, stage: 'download', status: a.status, error: 'cannot fetch audio url' };
  const buf = await a.arrayBuffer();
  const sizeMb = Math.round((buf.byteLength / 1048576) * 10) / 10;
  if (buf.byteLength > 25 * 1048576) return { ok: false, stage: 'too_large', size_mb: sizeMb, error: 'audio > 25MB (Whisper limit) — сожми/нарежь файл' };
  const fname = (url.split('?')[0].split('/').pop() || 'audio.mp3');
  const fd = new FormData();
  fd.append('file', new Blob([buf]), fname);
  fd.append('model', p.model);
  fd.append('response_format', 'text');
  if (lang) fd.append('language', lang);
  const r = await fetch(p.url, { method: 'POST', headers: { Authorization: `Bearer ${p.key}` }, body: fd });
  const body = await r.text();
  if (!r.ok) return { ok: false, stage: 'transcribe', provider: p.name, status: r.status, error: body.slice(0, 400) };
  const transcript = body.trim();
  if (!transcript) return { ok: false, stage: 'empty', provider: p.name };
  await fetch(`${REST}/audio_transcripts`, {
    method: 'POST',
    headers: restHeaders({ Prefer: 'return=minimal' }),
    body: JSON.stringify({ source_url: url, provider: p.name, transcript, chars: transcript.length, size_mb: sizeMb, status: 'ok' }),
  });
  return { ok: true, provider: p.name, size_mb: sizeMb, chars: transcript.length, preview: transcript.slice(0, 400) };
}

Deno.serve(async (req) => {
  let body = {};
  try { body = await req.json(); } catch { /* none */ }
  const action = body.action || 'fetch';
  try {
    if (action === 'ping') return Response.json({ ok: true, groq_set: GROQ.length > 0, openai_set: OPENAI.length > 0, ts: new Date().toISOString() });
    if (action === 'fetch' || action === 'transcribe') {
      const url = body.url;
      if (!url) return Response.json({ ok: false, error: 'missing url' }, { status: 400 });
      const res = await transcribe(url, body.language);
      return Response.json(res, { status: res.ok ? 200 : 502 });
    }
    return Response.json({ ok: false, error: `unknown action: ${action}` }, { status: 400 });
  } catch (e) {
    return Response.json({ ok: false, error: String(e) }, { status: 500 });
  }
});
