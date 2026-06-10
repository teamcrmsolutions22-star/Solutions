-- audio_jobs queue for the call-analysis skill
-- Project: call-analysis-bot (beoendcicsoorvipswmh)
-- Path for videos WITHOUT captions: Claude inserts a job (video_url) via Supabase MCP;
-- the Railway worker pulls the audio track (yt-dlp + ffmpeg -vn -> mono 16k), uploads to
-- Storage bucket `audio`, calls Edge Function `audio-transcribe` (Whisper), and writes the
-- transcript back here.

create table if not exists public.audio_jobs (
  id bigint generated always as identity primary key,
  video_url text not null,
  meeting text,
  status text not null default 'pending',   -- pending -> processing -> transcribing -> done|error
  audio_url text,
  transcript text,
  chars int,
  size_mb numeric,
  error text,
  created_at timestamptz not null default now(),
  done_at timestamptz
);
create index if not exists audio_jobs_status_idx on public.audio_jobs (status, id);

alter table public.audio_jobs enable row level security;
