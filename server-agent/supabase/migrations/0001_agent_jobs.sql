-- agent_jobs queue for the always-on server-agent (Claude Agent SDK)
-- Project: call-analysis-bot (beoendcicsoorvipswmh)
-- Anything (a person, a cron, a Telegram trigger, another function) enqueues a task;
-- the server-agent polls pending rows, runs query() with the repo brain (skills + CLAUDE.md)
-- and Supabase MCP, then writes the final text back. Same decoupled pattern as frame/audio jobs.

create table if not exists public.agent_jobs (
  id bigint generated always as identity primary key,
  prompt text not null,            -- задача агенту на естественном языке
  context text,                    -- опц. доп. контекст (источник, ссылки)
  status text not null default 'pending',  -- pending -> processing -> done|error
  result text,
  error text,
  created_at timestamptz not null default now(),
  done_at timestamptz
);
create index if not exists agent_jobs_status_idx on public.agent_jobs (status, id);

alter table public.agent_jobs enable row level security;
