-- Vidyard transcript cache for the call-analysis skill
-- Project: call-analysis-bot (beoendcicsoorvipswmh)
-- The vidyard-transcript edge function writes fetched transcripts here;
-- Claude reads them via Supabase MCP (the web env can't reach vidyard directly).

create table if not exists public.vidyard_transcripts (
  id bigint generated always as identity primary key,
  share_url text not null,
  video_uuid text,
  transcript text,
  chars int,
  raw_excerpt text,        -- first chars of the last fetched body (for parser debugging)
  status text not null default 'ok',
  error text,
  created_at timestamptz not null default now()
);
create index if not exists vidyard_transcripts_created_idx on public.vidyard_transcripts (created_at desc);

-- Locked down; only the edge function (service role) writes/reads.
alter table public.vidyard_transcripts enable row level security;
