-- Watchdog for the Railway worker (frames/audio jobs)
-- Project: call-analysis-bot (beoendcicsoorvipswmh)
-- The worker upserts worker_heartbeat.last_seen every loop (~POLL_SEC). A pg_cron job checks
-- staleness and enqueues a Telegram alert to the manager (tg_config.report_chat_id) once per
-- outage, so the pipeline never dies silently.

create table if not exists public.worker_heartbeat (
  worker text primary key,
  last_seen timestamptz not null default now(),
  alerted_at timestamptz
);
alter table public.worker_heartbeat enable row level security;

-- every 5 min: if a worker hasn't pinged for >10 min and we haven't already alerted for THIS
-- outage (alerted_at older than the last heartbeat), set alerted_at and enqueue one alert.
select cron.schedule(
  'worker-watchdog',
  '*/5 * * * *',
  $job$
  with stale as (
    update public.worker_heartbeat
    set alerted_at = now()
    where last_seen < now() - interval '10 minutes'
      and (alerted_at is null or alerted_at < last_seen)
    returning worker, last_seen
  )
  insert into public.tg_outbox (chat_id, text, parse_mode, status)
  select (select value::bigint from public.tg_config where key='report_chat_id'),
         '⚠️ Воркер <b>' || worker || '</b> не отвечает с '
           || to_char(last_seen, 'DD.MM HH24:MI') || ' UTC. Проверь Railway-деплой.',
         'HTML', 'pending'
  from stale;
  $job$
);
-- Remove later:  select cron.unschedule('worker-watchdog');
