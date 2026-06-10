import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

// === youtube-transcript Edge Function ===
// POST { action:'fetch', url|id, lang?:'ru' }
// Стратегия: InnerTube player (ANDROID/WEB) -> captionTracks.baseUrl -> timedtext json3.
// Fallback: scrape watch-страницы. Кладёт в public.youtube_transcripts.
// Если субтитров нет (0 tracks) -> вернёт no_captions; такие видео идут через audio_jobs (Whisper).

const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
const REST = `${SUPABASE_URL}/rest/v1`;

function restHeaders(extra = {}) {
  return { apikey: SERVICE_ROLE, Authorization: `Bearer ${SERVICE_ROLE}`, 'Content-Type': 'application/json', ...extra };
}

function videoId(input) {
  if (/^[A-Za-z0-9_-]{11}$/.test(input)) return input;
  const m = input.match(/(?:v=|youtu\.be\/|\/embed\/|\/shorts\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

function decodeEntities(s) {
  return s.replace(/&amp;/g, '&').replace(/&#39;/g, String.fromCharCode(39)).replace(/&quot;/g, String.fromCharCode(34)).replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

function jsonToText(s) {
  try {
    const j = JSON.parse(s);
    const parts = [];
    for (const e of (j.events || [])) {
      if (!e.segs) continue;
      for (const seg of e.segs) if (seg.utf8) parts.push(seg.utf8);
    }
    return parts.join('').replace(/\s+/g, ' ').trim();
  } catch (_) { return ''; }
}

function stripTags(s) {
  return decodeEntities(s.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

// ---- InnerTube player: вернуть список captionTracks [{baseUrl, languageCode, kind}] ----
async function innertubeTracks(id, client) {
  const clients = {
    ANDROID: { ctx: { clientName: 'ANDROID', clientVersion: '20.10.38', androidSdkVersion: 30, hl: 'en', gl: 'US' }, ua: 'com.google.android.youtube/20.10.38 (Linux; U; Android 11) gzip' },
    WEB: { ctx: { clientName: 'WEB', clientVersion: '2.20240620.05.00', hl: 'en', gl: 'US' }, ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
  };
  const c = clients[client];
  const r = await fetch('https://www.youtube.com/youtubei/v1/player?prettyPrint=false', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'User-Agent': c.ua, 'Accept-Language': 'en' },
    body: JSON.stringify({ context: { client: c.ctx }, videoId: id, contentCheckOk: true, racyCheckOk: true }),
  });
  const j = await r.json().catch(() => ({}));
  const tracks = j?.captions?.playerCaptionsTracklistRenderer?.captionTracks || [];
  return tracks.map((t) => ({ baseUrl: t.baseUrl, lang: t.languageCode, kind: t.kind || '' }));
}

// ---- scrape watch-страницы (fallback) ----
async function scrapeTracks(id) {
  const r = await fetch(`https://www.youtube.com/watch?v=${id}&hl=en`, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; call-analysis-bot/1.0)', 'Accept-Language': 'en', 'Cookie': 'CONSENT=YES+1' } });
  const html = await r.text();
  return [...html.matchAll(/"baseUrl":"([^"]+timedtext[^"]+)"/g)].map((x) => { let u; try { u = JSON.parse('"' + x[1] + '"'); } catch { u = x[1]; } const lm = u.match(/[?&]lang=([^&]+)/); return { baseUrl: u, lang: lm ? lm[1] : '', kind: u.indexOf('kind=asr') >= 0 ? 'asr' : '' }; });
}

async function timedtextToText(baseUrl) {
  const url = baseUrl.replace(/&fmt=[^&]*/g, '') + '&fmt=json3';
  let t = jsonToText(await (await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0', 'Accept-Language': 'en' } })).text());
  if (!t) t = stripTags(await (await fetch(baseUrl.replace(/&fmt=[^&]*/g, ''), { headers: { 'User-Agent': 'Mozilla/5.0' } })).text());
  return t;
}

function pickTrack(tracks, langPref) {
  if (!tracks.length) return null;
  if (langPref) {
    const exact = tracks.find((t) => t.lang === langPref && t.kind !== 'asr') || tracks.find((t) => t.lang === langPref);
    if (exact) return exact;
    const pref = tracks.find((t) => (t.lang || '').startsWith(langPref));
    if (pref) return pref;
  }
  return tracks.find((t) => t.kind !== 'asr') || tracks[0];
}

async function fetchYt(input, langPref) {
  const id = videoId(input);
  if (!id) return { ok: false, stage: 'parse', error: 'no youtube video id' };
  const attempts = [];
  let tracks = [];
  for (const src of ['ANDROID', 'WEB', 'scrape']) {
    try {
      tracks = src === 'scrape' ? await scrapeTracks(id) : await innertubeTracks(id, src);
    } catch (e) { attempts.push(`${src}:err`); continue; }
    if (!tracks.length) { attempts.push(`${src}:0tracks`); continue; }
    const track = pickTrack(tracks, langPref);
    const text = await timedtextToText(track.baseUrl);
    if (text) {
      await fetch(`${REST}/youtube_transcripts`, { method: 'POST', headers: restHeaders({ Prefer: 'return=minimal' }), body: JSON.stringify({ video_id: id, url: 'https://youtu.be/' + id, lang: track.lang || langPref || null, transcript: text, chars: text.length }) });
      return { ok: true, video_id: id, via: src, lang: track.lang, chars: text.length, langs: tracks.map((t) => t.lang + (t.kind === 'asr' ? '(asr)' : '')), preview: text.slice(0, 300) };
    }
    attempts.push(`${src}:empty(${tracks.length}tr)`);
  }
  return { ok: false, stage: tracks.length ? 'empty' : 'no_captions', video_id: id, attempts, error: 'не удалось получить timedtext' };
}

Deno.serve(async (req) => {
  let body = {};
  try { body = await req.json(); } catch { /* none */ }
  const action = body.action || 'fetch';
  try {
    if (action === 'ping') return Response.json({ ok: true, ts: new Date().toISOString() });
    if (action === 'fetch') {
      const input = body.url || body.id || '';
      if (!input) return Response.json({ ok: false, error: 'missing url or id' }, { status: 400 });
      const res = await fetchYt(input, body.lang);
      return Response.json(res, { status: res.ok ? 200 : 502 });
    }
    return Response.json({ ok: false, error: 'unknown action: ' + action }, { status: 400 });
  } catch (e) {
    return Response.json({ ok: false, error: String(e) }, { status: 500 });
  }
});
