-- frame_jobs queue for the call-analysis skill
-- Project: call-analysis-bot (beoendcicsoorvipswmh)
-- Claude inserts a job (video + timestamps) via Supabase MCP; the Railway frames-worker
-- polls pending rows, cuts frames with ffmpeg, uploads to Storage bucket `frames`,
-- and writes result (array of {sec,url}) back here.

create table if not exists public.frame_jobs (
  id bigint generated always as identity primary key,
  video_url text not null,
  timestamps jsonb not null,        -- ["12","1:05",...] секунды или mm:ss
  meeting text,
  status text not null default 'pending',   -- pending -> processing -> done|error
  result jsonb,                     -- [{"sec":12,"url":"https://…/frames/jobN_000012.jpg"}, …]
  error text,
  created_at timestamptz not null default now(),
  done_at timestamptz
);
create index if not exists frame_jobs_status_idx on public.frame_jobs (status, id);

alter table public.frame_jobs enable row level security;
