-- Report crons for the call-analysis pipeline
-- Project: call-analysis-bot (beoendcicsoorvipswmh)
--
-- telegram-bot `report` action queries Notion («Договорённости») via NOTION_TOKEN and
-- enqueues a digest into tg_outbox; telegram-drain delivers it. Two schedules (UTC):
--   • report-weekly   — Mon 07:00 UTC (10:00 Kyiv): «что обещали — что сделали» к менеджеру.
--   • report-overdue  — Пн–Пт 06:30 UTC (09:30 Kyiv): пинг по просрочке каждому ответственному
--                       (матч Notion «Ответственный» -> tg_employees) + полная сводка менеджеру.
-- Recipient/manager: tg_config.report_chat_id; Notion DB: tg_config.notion_db_id.

select cron.schedule(
  'report-weekly',
  '0 7 * * 1',
  $job$
  select net.http_post(
    url := 'https://beoendcicsoorvipswmh.supabase.co/functions/v1/telegram-bot',
    headers := jsonb_build_object(
      'Content-Type','application/json',
      'Authorization','Bearer ' || (select value from public.tg_config where key='anon_key'),
      'apikey', (select value from public.tg_config where key='anon_key')
    ),
    body := jsonb_build_object('action','report','mode','weekly')
  );
  $job$
);

select cron.schedule(
  'report-overdue',
  '30 6 * * 1-5',
  $job$
  select net.http_post(
    url := 'https://beoendcicsoorvipswmh.supabase.co/functions/v1/telegram-bot',
    headers := jsonb_build_object(
      'Content-Type','application/json',
      'Authorization','Bearer ' || (select value from public.tg_config where key='anon_key'),
      'apikey', (select value from public.tg_config where key='anon_key')
    ),
    body := jsonb_build_object('action','report','mode','overdue')
  );
  $job$
);
-- Remove later:  select cron.unschedule('report-weekly'); select cron.unschedule('report-overdue');
-- Config rows (set once):
--   insert into tg_config(key,value) values ('notion_db_id','45d6a662aa624d46aea70538a5389d2a'),
--     ('report_chat_id','164719255') on conflict (key) do update set value=excluded.value;
