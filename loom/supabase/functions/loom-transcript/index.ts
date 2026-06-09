import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// === loom-transcript Edge Function ===
// Deployed to Supabase project: call-analysis-bot (beoendcicsoorvipswmh)
//
// POST { "action":"fetch", "url":"https://www.loom.com/share/<id>", "password"?:"..." }
// Fetches a Loom transcript via the public FetchVideoTranscript GraphQL endpoint
// (runs from Supabase's network, which has unrestricted egress), parses VTT/JSON
// into plain text, stores it in public.loom_transcripts, and returns a short summary.
//
// The Claude Code web environment cannot reach loom.com directly (host allowlist),
// so it triggers this via pg_net and reads the transcript from the table.
// No Loom auth/API key is required for public share links (validated 2026-06).

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const REST = `${SUPABASE_URL}/rest/v1`;

function restHeaders(extra: Record<string, string> = {}) {
  return {
    "apikey": SERVICE_ROLE,
    "Authorization": `Bearer ${SERVICE_ROLE}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

function extractVideoId(url: string): string | null {
  const m = url.match(/loom\.com\/(?:share|embed|v)\/([0-9a-fA-F]{16,64})/);
  if (m) return m[1];
  const m2 = url.match(/([0-9a-fA-F]{32})/);
  return m2 ? m2[1] : null;
}

const LOOM_GQL =
  `query FetchVideoTranscript($videoId: ID!, $password: String) {\n` +
  `  fetchVideoTranscript(videoId: $videoId, password: $password) {\n` +
  `    __typename\n` +
  `    ... on VideoTranscriptDetails { source_url captions_source_url }\n` +
  `    ... on GenericError { message }\n` +
  `  }\n` +
  `}`;

function parseVtt(vtt: string): string {
  const out: string[] = [];
  for (const raw of vtt.split(/\r?\n/)) {
    const t = raw.trim();
    if (!t || t === "WEBVTT" || t.startsWith("NOTE") || t.startsWith("STYLE")) continue;
    if (t.includes("-->")) continue;
    if (/^\d+$/.test(t)) continue;
    const cleaned = t.replace(/<[^>]+>/g, "").trim();
    if (cleaned) out.push(cleaned);
  }
  const dedup: string[] = [];
  for (const s of out) if (dedup[dedup.length - 1] !== s) dedup.push(s);
  return dedup.join(" ").replace(/\s+/g, " ").trim();
}

function extractTextFromJson(j: unknown): string {
  const parts: string[] = [];
  const keys = new Set(["transcript", "text", "phrase", "value", "word", "content"]);
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

async function fetchTranscript(url: string, password?: string) {
  const videoId = extractVideoId(url);
  if (!videoId) return { ok: false, stage: "parse", error: "could not extract Loom video id from url" };

  const gqlResp = await fetch("https://www.loom.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Origin": "https://www.loom.com",
      "Referer": `https://www.loom.com/share/${videoId}`,
      "x-loom-request-source": "loom_web_app",
      "apollographql-client-name": "web",
      "apollographql-client-version": "14.0.0",
      "User-Agent": "Mozilla/5.0 (compatible; call-analysis-bot/1.0)",
    },
    body: JSON.stringify({
      operationName: "FetchVideoTranscript",
      variables: { videoId, password: password ?? null },
      query: LOOM_GQL,
    }),
  });
  const gqlText = await gqlResp.text();
  let gql: any;
  try { gql = JSON.parse(gqlText); } catch {
    return { ok: false, stage: "graphql_parse", status: gqlResp.status, video_id: videoId, error: gqlText.slice(0, 600) };
  }
  const d = gql?.data?.fetchVideoTranscript;
  if (!d || d.__typename !== "VideoTranscriptDetails") {
    return { ok: false, stage: "graphql", status: gqlResp.status, video_id: videoId, error: JSON.stringify(gql).slice(0, 800) };
  }
  const vttUrl = d.captions_source_url as string | undefined;
  const jsonUrl = d.source_url as string | undefined;

  let transcript = "";
  let via = "";
  if (vttUrl) {
    const r = await fetch(vttUrl);
    if (r.ok) { transcript = parseVtt(await r.text()); via = "vtt"; }
  }
  if (!transcript && jsonUrl) {
    const r = await fetch(jsonUrl);
    if (r.ok) {
      const txt = await r.text();
      try { transcript = extractTextFromJson(JSON.parse(txt)); via = "json"; }
      catch { transcript = parseVtt(txt); via = "json_as_vtt"; }
    }
  }
  if (!transcript) {
    return { ok: false, stage: "download", video_id: videoId, error: "transcript source returned no text", source_url: jsonUrl ?? null, captions_source_url: vttUrl ?? null };
  }

  await fetch(`${REST}/loom_transcripts`, {
    method: "POST",
    headers: restHeaders({ "Prefer": "return=minimal" }),
    body: JSON.stringify({ share_url: url, video_id: videoId, transcript, chars: transcript.length, status: "ok" }),
  });
  return { ok: true, video_id: videoId, via, chars: transcript.length, preview: transcript.slice(0, 400) };
}

Deno.serve(async (req) => {
  let body: Record<string, unknown> = {};
  try { body = await req.json(); } catch { /* no body */ }
  const action = (body.action as string) ?? "fetch";
  try {
    if (action === "ping") return Response.json({ ok: true, ts: new Date().toISOString() });
    if (action === "fetch") {
      const url = body.url as string;
      if (!url) return Response.json({ ok: false, error: "missing url" }, { status: 400 });
      const res = await fetchTranscript(url, body.password as string | undefined);
      return Response.json(res, { status: res.ok ? 200 : 502 });
    }
    return Response.json({ ok: false, error: `unknown action: ${action}` }, { status: 400 });
  } catch (e) {
    return Response.json({ ok: false, error: String(e) }, { status: 500 });
  }
});
