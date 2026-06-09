-- tl;dv transcript cache for the call-analysis skill
-- Project: call-analysis-bot (beoendcicsoorvipswmh)
-- The tldv-transcript edge function writes fetched transcripts here;
-- Claude reads them via Supabase MCP (the web env can't reach tldv.io directly).

create table if not exists public.tldv_transcripts (
  id bigint generated always as identity primary key,
  meeting_id text,
  share_url text,
  transcript text,
  chars int,
  raw_excerpt text,        -- first chars of the raw API response (for parser debugging)
  status text not null default 'ok',
  error text,
  created_at timestamptz not null default now()
);
create index if not exists tldv_transcripts_created_idx on public.tldv_transcripts (created_at desc);

-- Locked down; only the edge function (service role) writes/reads.
alter table public.tldv_transcripts enable row level security;
