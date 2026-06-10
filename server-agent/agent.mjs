// server-agent — постоянный агент на Claude Agent SDK с тем же «мозгом», что и Claude в этом репо.
//
// Общий мозг = этот git-репозиторий (знания CRM + .claude/skills + CLAUDE.md) + Supabase
// (оперативные данные: tg_*, *_transcripts, frame_jobs/audio_jobs, Notion-конвейер).
// Скиллы и инструкции подхватываются автоматически через settingSources:['project'] при cwd=корень репо.
//
// Паттерн работы — тот же decoupled-конвейер, что у Railway-воркера: агент опрашивает очередь
// public.agent_jobs в Supabase, на каждую задачу запускает query() Agent SDK (с доступом к
// Supabase MCP → Notion/Telegram/транскрипты), результат пишет обратно в строку.
//
// ENV: ANTHROPIC_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY,
//      SUPABASE_ACCESS_TOKEN (для Supabase MCP), [REPO_ROOT], [AGENT_MODEL], [POLL_SEC]

import { query } from '@anthropic-ai/claude-agent-sdk';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const SUPABASE_URL = process.env.SUPABASE_URL.replace(/\/$/, '');
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const REPO_ROOT = process.env.REPO_ROOT || resolve(dirname(fileURLToPath(import.meta.url)), '..');
const MODEL = process.env.AGENT_MODEL || 'claude-opus-4-8';
const POLL = parseInt(process.env.POLL_SEC || '15', 10);

async function sb(method, path, body, prefer = 'return=representation') {
  const r = await fetch(`${SUPABASE_URL}${path}`, {
    method,
    headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json', Prefer: prefer },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await r.text();
  try { return JSON.parse(text); } catch { return text; }
}

async function heartbeat() {
  try {
    await sb('POST', '/rest/v1/worker_heartbeat?on_conflict=worker',
      { worker: 'server-agent', last_seen: new Date().toISOString() },
      'resolution=merge-duplicates,return=minimal');
  } catch (e) { console.log(`heartbeat failed: ${e}`); }
}

async function claim() {
  const rows = await sb('GET', '/rest/v1/agent_jobs?status=eq.pending&order=id.asc&limit=1');
  if (!Array.isArray(rows) || !rows.length) return null;
  const job = rows[0];
  await sb('PATCH', `/rest/v1/agent_jobs?id=eq.${job.id}&status=eq.pending`, { status: 'processing' });
  return job;
}

// Один прогон агента над задачей. Скиллы/CLAUDE.md грузятся из репо (settingSources:['project']).
async function runJob(job) {
  const mcpServers = {};
  if (process.env.SUPABASE_ACCESS_TOKEN) {
    mcpServers.supabase = {
      command: 'npx',
      args: ['-y', '@supabase/mcp-server-supabase@latest', '--access-token', process.env.SUPABASE_ACCESS_TOKEN],
    };
  }

  const response = query({
    prompt: job.prompt,
    options: {
      cwd: REPO_ROOT,                       // чтобы подхватились .claude/skills + CLAUDE.md
      model: MODEL,
      settingSources: ['project'],          // проектные инструкции и скиллы из репо
      systemPrompt: { type: 'preset', preset: 'claude_code' },
      mcpServers,
      // Сервер работает автономно — но даём ограниченный набор инструментов.
      allowedTools: ['Read', 'Grep', 'Glob', 'Bash', 'Edit', 'Write', 'WebFetch', 'mcp__supabase'],
      permissionMode: 'bypassPermissions', // без интерактивных подтверждений (это сервер)
      maxTurns: 40,
    },
  });

  let finalText = '';
  for await (const message of response) {
    if (message.type === 'result') finalText = message.result ?? finalText;
    // (можно стримить message.type==='assistant' в лог при отладке)
  }
  return finalText;
}

async function main() {
  console.log(`server-agent up. repo=${REPO_ROOT} model=${MODEL} poll=${POLL}s`);
  for (;;) {
    try {
      await heartbeat();
      const job = await claim();
      if (!job) { await new Promise((r) => setTimeout(r, POLL * 1000)); continue; }
      console.log(`agent job ${job.id}: ${String(job.prompt).slice(0, 80)}`);
      try {
        const result = await runJob(job);
        await sb('PATCH', `/rest/v1/agent_jobs?id=eq.${job.id}`, { status: 'done', result, done_at: new Date().toISOString() });
        console.log(`agent job ${job.id} done (${result.length} chars)`);
      } catch (e) {
        await sb('PATCH', `/rest/v1/agent_jobs?id=eq.${job.id}`, { status: 'error', error: String(e).slice(0, 800) });
        console.log(`agent job ${job.id} error: ${e}`);
      }
    } catch (e) {
      console.log(`loop error: ${e}`);
      await new Promise((r) => setTimeout(r, POLL * 1000));
    }
  }
}

main();
