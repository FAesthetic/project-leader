-- Leaderjournal MVP schema
-- Run this in the Supabase SQL editor after reviewing it.
-- API keys are never stored in Supabase.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  name text,
  age integer,
  role text,
  industry_context text,
  team_size integer,
  leadership_experience text,
  main_development_goal text,
  current_challenges text,
  strengths text,
  development_fields text,
  stress_triggers text,
  coaching_style text not null default 'klar-direkt',
  training_minutes_per_day integer not null default 10,
  training_days text[] not null default array['monday','tuesday','wednesday','thursday','friday'],
  reflection_reminder_time time not null default '18:00',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles
  add column if not exists email text,
  add column if not exists display_name text,
  add column if not exists name text,
  add column if not exists age integer,
  add column if not exists role text,
  add column if not exists industry_context text,
  add column if not exists team_size integer,
  add column if not exists leadership_experience text,
  add column if not exists main_development_goal text,
  add column if not exists current_challenges text,
  add column if not exists strengths text,
  add column if not exists development_fields text,
  add column if not exists stress_triggers text,
  add column if not exists coaching_style text not null default 'klar-direkt',
  add column if not exists training_minutes_per_day integer not null default 10,
  add column if not exists training_days text[] not null default array['monday','tuesday','wednesday','thursday','friday'],
  add column if not exists reflection_reminder_time time not null default '18:00',
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

create table if not exists public.user_settings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  theme text not null default 'system',
  accent_color text not null default 'emerald',
  daily_training_minutes integer not null default 10,
  reflection_reminder_enabled boolean not null default true,
  reflection_reminder_time time not null default '18:00',
  training_days text[] not null default array['monday','tuesday','wednesday','thursday','friday'],
  train_on_days_off boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id)
);

alter table public.user_settings
  add column if not exists reflection_reminder_enabled boolean not null default true,
  add column if not exists reflection_reminder_time time not null default '18:00',
  add column if not exists training_days text[] not null default array['monday','tuesday','wednesday','thursday','friday'];

create table if not exists public.onboarding_answers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  answers jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.employees (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  role text,
  team text,
  context_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.quick_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text,
  raw_text text,
  transcript text,
  structured_summary text,
  category text,
  urgency text not null default 'Nur festhalten',
  emotion text,
  status text not null default 'neu',
  employee_id uuid references public.employees(id) on delete set null,
  ai_analysis jsonb,
  follow_up_date date,
  people text,
  note text,
  mood text,
  reflect_tonight boolean not null default true,
  ai_summary jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.quick_logs
  add column if not exists raw_text text,
  add column if not exists structured_summary text,
  add column if not exists urgency text not null default 'Nur festhalten',
  add column if not exists emotion text,
  add column if not exists status text not null default 'neu',
  add column if not exists employee_id uuid references public.employees(id) on delete set null,
  add column if not exists ai_analysis jsonb,
  add column if not exists follow_up_date date;

create table if not exists public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  date date not null default current_date,
  main_situation text,
  what_went_well text,
  what_was_unclear_or_bad text,
  tomorrow_impulse text,
  rating integer check (rating between 1 and 10),
  behavior_checks jsonb,
  ai_analysis jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Backward-compatible table from the first MVP iteration.
create table if not exists public.evening_reflections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  date date not null default current_date,
  implemented text,
  not_implemented text,
  rating integer check (rating between 1 and 10),
  important_situation text,
  blockers text,
  learning_for_tomorrow text,
  transcript text,
  ai_summary jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.employee_conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  employee_id uuid not null references public.employees(id) on delete cascade,
  date date not null default current_date,
  type text not null,
  leadership_goal text,
  summary text not null,
  perceived_effect text,
  open_points text,
  next_step text,
  linked_quick_log_id uuid references public.quick_logs(id) on delete set null,
  linked_journal_entry_id uuid references public.journal_entries(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.employee_perception_snapshots (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  employee_id uuid not null references public.employees(id) on delete cascade,
  date date not null default current_date,
  expectation_clarity text,
  trust_working_relationship text,
  autonomy text,
  energy_load text,
  reliability text,
  development_need text,
  communication_need text,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.commitments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  employee_id uuid references public.employees(id) on delete set null,
  source_type text,
  source_id uuid,
  title text not null,
  description text,
  type text not null default 'Follow-up',
  due_date date,
  status text not null default 'offen',
  priority text,
  created_at timestamptz not null default now(),
  completed_at timestamptz,
  updated_at timestamptz not null default now()
);

create table if not exists public.training_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  status text not null default 'active',
  plan jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.training_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  date date,
  model text,
  exercise text,
  status text not null default 'offen',
  linked_quick_log_id uuid references public.quick_logs(id) on delete set null,
  linked_journal_entry_id uuid references public.journal_entries(id) on delete set null,
  reflection text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.training_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  training_id uuid references public.training_items(id) on delete cascade,
  date date not null default current_date,
  status text not null default 'offen',
  linked_quick_log_id uuid references public.quick_logs(id) on delete set null,
  linked_journal_entry_id uuid references public.journal_entries(id) on delete set null,
  reflection text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.model_library (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,
  situations text[] not null default '{}',
  when_to_use text,
  when_not_to_use text,
  three_minute_application text,
  typical_mistake text,
  example_sentence text,
  linked_training text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.leadership_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  event_type text not null,
  starts_at timestamptz,
  focus text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.user_settings enable row level security;
alter table public.onboarding_answers enable row level security;
alter table public.employees enable row level security;
alter table public.quick_logs enable row level security;
alter table public.journal_entries enable row level security;
alter table public.evening_reflections enable row level security;
alter table public.employee_conversations enable row level security;
alter table public.employee_perception_snapshots enable row level security;
alter table public.commitments enable row level security;
alter table public.training_plans enable row level security;
alter table public.training_items enable row level security;
alter table public.training_progress enable row level security;
alter table public.model_library enable row level security;
alter table public.leadership_events enable row level security;

drop policy if exists "Users can read own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Users can insert own profile" on public.profiles;
drop policy if exists "Users manage own settings" on public.user_settings;
drop policy if exists "Users manage own onboarding" on public.onboarding_answers;
drop policy if exists "Users manage own employees" on public.employees;
drop policy if exists "Users manage own quick logs" on public.quick_logs;
drop policy if exists "Users manage own journal entries" on public.journal_entries;
drop policy if exists "Users manage own evening reflections" on public.evening_reflections;
drop policy if exists "Users manage own employee conversations" on public.employee_conversations;
drop policy if exists "Users manage own employee perception snapshots" on public.employee_perception_snapshots;
drop policy if exists "Users manage own commitments" on public.commitments;
drop policy if exists "Users manage own training plans" on public.training_plans;
drop policy if exists "Users manage own training items" on public.training_items;
drop policy if exists "Users manage own training progress" on public.training_progress;
drop policy if exists "Everyone can read model library" on public.model_library;
drop policy if exists "Users manage own leadership events" on public.leadership_events;

create policy "Users can read own profile"
on public.profiles for select
using (auth.uid() = id);

create policy "Users can update own profile"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Users can insert own profile"
on public.profiles for insert
with check (auth.uid() = id);

create policy "Users manage own settings"
on public.user_settings for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users manage own onboarding"
on public.onboarding_answers for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users manage own employees"
on public.employees for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users manage own quick logs"
on public.quick_logs for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users manage own journal entries"
on public.journal_entries for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users manage own evening reflections"
on public.evening_reflections for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users manage own employee conversations"
on public.employee_conversations for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users manage own employee perception snapshots"
on public.employee_perception_snapshots for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users manage own commitments"
on public.commitments for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users manage own training plans"
on public.training_plans for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users manage own training items"
on public.training_items for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users manage own training progress"
on public.training_progress for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Everyone can read model library"
on public.model_library for select
using (true);

create policy "Users manage own leadership events"
on public.leadership_events for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
