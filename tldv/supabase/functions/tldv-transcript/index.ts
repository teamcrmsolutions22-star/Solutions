import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// === tldv-transcript Edge Function ===
// Deployed to Supabase project: call-analysis-bot (beoendcicsoorvipswmh)
//
// POST { "action":"fetch", "url":"https://tldv.io/app/meetings/<id>" | "meeting_id":"<id>" }
// Fetches a tl;dv meeting transcript via the official API
//   GET https://pasta.tldv.io/v1alpha1/meetings/<id>/transcript   (header x-api-key)
// parses it into "Speaker: text" lines, stores it in public.tldv_transcripts,
// and returns a short summary (+ diagnostics on the raw shape for the first run).
//
// Secret required: TLDV_API_KEY (set in Supabase Edge Function secrets).
// The Claude Code web env can't reach tldv.io directly (host allowlist), so it
// triggers this via pg_net and reads the transcript from the table.

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const TLDV_API_KEY = Deno.env.get("TLDV_API_KEY") ?? "";
const REST = `${SUPABASE_URL}/rest/v1`;
const TLDV_BASE = "https://pasta.tldv.io/v1alpha1";

function restHeaders(extra: Record<string, string> = {}) {
  return {
    "apikey": SERVICE_ROLE,
    "Authorization": `Bearer ${SERVICE_ROLE}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

function extractMeetingId(input: string): string | null {
  if (!input) return null;
  const m = input.match(/meetings\/([0-9a-fA-F]{24})/);
  if (m) return m[1];
  const m2 = input.match(/\b([0-9a-fA-F]{24})\b/);
  if (m2) return m2[1];
  if (/^[0-9a-fA-F]{24}$/.test(input.trim())) return input.trim();
  return null;
}

function extractTextFromJson(j: unknown): string {
  const parts: string[] = [];
  const keys = new Set(["text", "content", "value", "transcript", "phrase", "word"]);
  const walk = (n: unknown) => {
    if (n == null || typeof n === "string" || typeof n === "number") return;
    if (Array.isArray(n)) { for (const x of n) walk(x); return; }
    if (typeof n === "object") {
      for (const [k, v] of Object.entries(n as Record<string, unknown>)) {
        if (typeof v === "string" && keys.has(k)) parts.push(v);
        else walk(v);
      }
    }
  };
  walk(j);
  return parts.join(" ").replace(/\s+/g, " ").trim();
}

function buildTranscript(j: any): string {
  let segs: any = null;
  if (Array.isArray(j)) segs = j;
  else if (j && typeof j === "object") {
    segs = j.data ?? j.transcript ?? j.segments ?? j.items ?? j.results ?? null;
    if (!Array.isArray(segs)) segs = null;
  }
  if (segs) {
    const lines: string[] = [];
    for (const s of segs) {
      if (typeof s === "string") { lines.push(s); continue; }
      const speaker = s?.speaker ?? s?.speakerName ?? s?.speaker_name ?? s?.name ?? null;
      const text = s?.text ?? s?.content ?? s?.value ?? s?.transcript ?? s?.phrase ?? "";
      if (text) lines.push(speaker ? `${speaker}: ${text}` : String(text));
    }
    const joined = lines.join("\n").trim();
    if (joined) return joined;
  }
  return extractTextFromJson(j);
}

async function fetchTranscript(input: string) {
  if (!TLDV_API_KEY) return { ok: false, stage: "config", error: "TLDV_API_KEY not set in function secrets" };
  const meetingId = extractMeetingId(input);
  if (!meetingId) return { ok: false, stage: "parse", error: "could not extract tl;dv meeting id (expected 24-hex in URL or id)" };

  const resp = await fetch(`${TLDV_BASE}/meetings/${meetingId}/transcript`, {
    method: "GET",
    headers: { "Accept": "application/json", "Content-Type": "application/json", "x-api-key": TLDV_API_KEY },
  });
  const bodyText = await resp.text();
  if (!resp.ok) {
    const hint = resp.status === 401 || resp.status === 403
      ? "invalid/forbidden API key (or API not enabled on plan)"
      : resp.status === 404 ? "meeting not found / wrong id"
      : resp.status === 425 || resp.status === 202 ? "transcript not ready yet" : "";
    return { ok: false, stage: "api", status: resp.status, meeting_id: meetingId, hint, error: bodyText.slice(0, 600) };
  }

  let parsed = "";
  let topKeys: string[] = [];
  try {
    const j = JSON.parse(bodyText);
    if (j && typeof j === "object" && !Array.isArray(j)) topKeys = Object.keys(j);
    parsed = buildTranscript(j);
  } catch {
    parsed = bodyText.trim(); // plain-text transcript
  }

  if (!parsed) {
    return { ok: false, stage: "empty", status: resp.status, meeting_id: meetingId, top_keys: topKeys, error: "no transcript text parsed (maybe still processing)", raw_excerpt: bodyText.slice(0, 400) };
  }

  await fetch(`${REST}/tldv_transcripts`, {
    method: "POST",
    headers: restHeaders({ "Prefer": "return=minimal" }),
    body: JSON.stringify({ meeting_id: meetingId, share_url: input, transcript: parsed, chars: parsed.length, raw_excerpt: bodyText.slice(0, 4000), status: "ok" }),
  });
  return { ok: true, meeting_id: meetingId, chars: parsed.length, top_keys: topKeys, preview: parsed.slice(0, 400) };
}

Deno.serve(async (req) => {
  let body: Record<string, unknown> = {};
  try { body = await req.json(); } catch { /* no body */ }
  const action = (body.action as string) ?? "fetch";
  try {
    if (action === "ping") return Response.json({ ok: true, key_set: TLDV_API_KEY.length > 0, ts: new Date().toISOString() });
    if (action === "fetch") {
      const input = (body.url as string) ?? (body.meeting_id as string) ?? "";
      if (!input) return Response.json({ ok: false, error: "missing url or meeting_id" }, { status: 400 });
      const res = await fetchTranscript(input);
      return Response.json(res, { status: res.ok ? 200 : 502 });
    }
    return Response.json({ ok: false, error: `unknown action: ${action}` }, { status: 400 });
  } catch (e) {
    return Response.json({ ok: false, error: String(e) }, { status: 500 });
  }
});
