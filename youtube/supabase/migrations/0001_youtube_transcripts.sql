-- youtube_transcripts cache for the call-analysis skill
-- Project: call-analysis-bot (beoendcicsoorvipswmh)
-- The youtube-transcript edge function pulls captions (InnerTube ANDROID/WEB -> timedtext json3)
-- and writes them here; Claude reads via Supabase MCP. Caption-less videos fall back to the
-- audio_jobs route (video -> audio -> Whisper) handled by the Railway worker.

create table if not exists public.youtube_transcripts (
  id bigint generated always as identity primary key,
  video_id text not null,
  url text,
  lang text,
  transcript text,
  chars int,
  status text not null default 'ok',
  error text,
  created_at timestamptz not null default now()
);
create index if not exists youtube_transcripts_created_idx on public.youtube_transcripts (created_at desc);
create index if not exists youtube_transcripts_video_idx on public.youtube_transcripts (video_id);

-- Locked down; only the edge function (service role) writes/reads.
alter table public.youtube_transcripts enable row level security;
