-- Employee profile + onboarding state (AI-продажник, Этап А)
-- Project: call-analysis-bot (beoendcicsoorvipswmh)
-- Эти поля заполняются менеджером через онбординг-анкету бота (telegram-webhook) и идут
-- в реквизиты КП. google_* — подключение личного календаря (calendar edge fn).

alter table public.tg_employees
  -- календарь (per-manager Google)
  add column if not exists google_email text,
  add column if not exists google_refresh_token text,
  add column if not exists google_calendar_id text,
  -- реквизиты для КП
  add column if not exists role text,
  add column if not exists full_name_uk text,
  add column if not exists position_uk text,
  add column if not exists phone text,
  add column if not exists email text,
  add column if not exists photo_url text,
  add column if not exists birthday date,
  -- состояние онбординга: null=не начат, 'done'=завершён, иначе текущий шаг
  add column if not exists onboarding_step text,
  add column if not exists onboarded_at timestamptz;

-- публичный бакет для фото менеджеров (идёт в КП)
insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true)
on conflict (id) do nothing;
