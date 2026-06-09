-- Telegram sender pipeline — schema init
-- Project: dogovora-yurii-bot (hfurrbuipqskzegqxtok)
-- Applied via Supabase MCP apply_migration.

create extension if not exists pg_net;
create extension if not exists pg_cron;

-- Registry: name (as used in commitments "responsible") -> Telegram chat_id
create table if not exists public.tg_employees (
  id bigint generated always as identity primary key,
  name text not null,
  username text,
  chat_id bigint not null unique,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists tg_employees_name_idx on public.tg_employees (lower(name));

-- Outbound queue. Claude inserts rows here (via MCP); the edge function drains them.
create table if not exists public.tg_outbox (
  id bigint generated always as identity primary key,
  chat_id bigint not null,
  text text not null,
  reply_markup jsonb,
  parse_mode text not null default 'HTML',
  status text not null default 'pending',   -- pending | sent | error
  attempts int not null default 0,
  error text,
  tg_message_id bigint,
  meeting text,
  responsible text,
  notion_page_id text,
  notion_url text,
  created_at timestamptz not null default now(),
  sent_at timestamptz
);
create index if not exists tg_outbox_status_idx on public.tg_outbox (status, id);

-- Discovered chats from getUpdates (who pressed /start). Used to register employees.
create table if not exists public.tg_seen_chats (
  chat_id bigint primary key,
  name text,
  username text,
  last_text text,
  seen_at timestamptz not null default now()
);

-- Small config table. Holds the publishable anon key used by pg_cron to call the function.
create table if not exists public.tg_config (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

-- Lock everything down: the edge function uses the service role (bypasses RLS);
-- no anon/public access.
alter table public.tg_employees  enable row level security;
alter table public.tg_outbox     enable row level security;
alter table public.tg_seen_chats enable row level security;
alter table public.tg_config     enable row level security;

-- NOTE: 'anon_key' is the project's PUBLISHABLE anon key (safe to store; protected by RLS).
insert into public.tg_config(key, value) values
  ('anon_key', '<PROJECT_ANON_KEY>'),
  ('project_ref', 'hfurrbuipqskzegqxtok'),
  ('function_url', 'https://hfurrbuipqskzegqxtok.supabase.co/functions/v1/telegram-bot')
on conflict (key) do update set value = excluded.value, updated_at = now();
