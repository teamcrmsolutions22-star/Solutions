-- Telegram sender pipeline — autonomous drain via pg_cron + pg_net
-- Project: dogovora-yurii-bot (hfurrbuipqskzegqxtok)
--
-- Every minute, pg_cron asks the edge function to drain the outbox.
-- The call stays inside Supabase's network (pg_net -> edge function -> Telegram),
-- so it works even though the Claude Code web environment cannot reach Telegram.
-- Auth: the function has verify_jwt=true; we pass the publishable anon JWT.

select cron.schedule(
  'telegram-drain',
  '* * * * *',
  $job$
  select net.http_post(
    url := 'https://hfurrbuipqskzegqxtok.supabase.co/functions/v1/telegram-bot',
    headers := jsonb_build_object(
      'Content-Type','application/json',
      'Authorization','Bearer ' || (select value from public.tg_config where key='anon_key'),
      'apikey', (select value from public.tg_config where key='anon_key')
    ),
    body := jsonb_build_object('action','drain')
  );
  $job$
);

-- To remove later:  select cron.unschedule('telegram-drain');
