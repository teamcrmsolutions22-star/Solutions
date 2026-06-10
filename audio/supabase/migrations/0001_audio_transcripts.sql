-- Audio transcript cache for the call-analysis skill
-- Project: call-analysis-bot (beoendcicsoorvipswmh)
-- The audio-transcribe edge function writes Whisper results here;
-- Claude reads them via Supabase MCP (the web env can't reach transcription APIs).

create table if not exists public.audio_transcripts (
  id bigint generated always as identity primary key,
  source_url text not null,
  provider text,            -- groq | openai
  transcript text,
  chars int,
  size_mb numeric,
  status text not null default 'ok',
  error text,
  created_at timestamptz not null default now()
);
create index if not exists audio_transcripts_created_idx on public.audio_transcripts (created_at desc);

-- Locked down; only the edge function (service role) writes/reads.
alter table public.audio_transcripts enable row level security;
