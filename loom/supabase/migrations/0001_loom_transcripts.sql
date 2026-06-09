-- Loom transcript cache for the call-analysis skill
-- Project: call-analysis-bot (beoendcicsoorvipswmh)
-- The loom-transcript edge function writes fetched transcripts here;
-- Claude reads them via Supabase MCP (the web env can't reach loom.com directly).

create table if not exists public.loom_transcripts (
  id bigint generated always as identity primary key,
  share_url text not null,
  video_id text,
  transcript text,
  chars int,
  status text not null default 'ok',
  error text,
  created_at timestamptz not null default now()
);
create index if not exists loom_transcripts_created_idx on public.loom_transcripts (created_at desc);

-- Locked down; only the edge function (service role) writes/reads.
alter table public.loom_transcripts enable row level security;
