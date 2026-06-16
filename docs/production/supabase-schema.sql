-- Project Leadership MVP schema
-- Run this in the Supabase SQL editor after reviewing it.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_settings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  theme text not null default 'system',
  accent_color text not null default 'emerald',
  daily_training_minutes integer not null default 15,
  work_start time not null default '09:00',
  work_end time not null default '17:00',
  train_on_days_off boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id)
);

create table if not exists public.onboarding_answers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  answers jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.quick_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  people text,
  category text,
  note text not null,
  mood text,
  reflect_tonight boolean not null default true,
  transcript text,
  ai_summary jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

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

create table if not exists public.training_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  status text not null default 'active',
  plan jsonb not null default '{}'::jsonb,
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
alter table public.quick_logs enable row level security;
alter table public.evening_reflections enable row level security;
alter table public.training_plans enable row level security;
alter table public.leadership_events enable row level security;

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

create policy "Users manage own quick logs"
on public.quick_logs for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users manage own evening reflections"
on public.evening_reflections for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users manage own training plans"
on public.training_plans for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users manage own leadership events"
on public.leadership_events for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
