-- web_fetches cache for the call-analysis skill
-- Project: call-analysis-bot (beoendcicsoorvipswmh)
-- The fetch-url edge function resolves a URL (redirects, Google Docs/Sheets/Slides export,
-- or generic HTML->text) and writes the extracted text here; Claude reads it via Supabase MCP
-- (the web env can't reach arbitrary URLs / Google Docs directly — egress is open on Supabase).

create table if not exists public.web_fetches (
  id bigint generated always as identity primary key,
  url text not null,
  final_url text,           -- URL after following redirects (shr.name / t.ly / …)
  kind text,                -- gdoc | gsheet | gslides | html | text
  text text,
  chars int,
  status text not null default 'ok',
  error text,
  created_at timestamptz not null default now()
);
create index if not exists web_fetches_created_idx on public.web_fetches (created_at desc);

-- Locked down; only the edge function (service role) writes/reads.
alter table public.web_fetches enable row level security;
