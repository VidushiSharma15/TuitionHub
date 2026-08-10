-- Run this in Supabase SQL Editor after creating your project.
-- https://supabase.com/dashboard → SQL Editor → New query

-- User roles: student or tutor (extends Supabase auth.users)
create type public.user_role as enum ('student', 'tutor');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  role public.user_role not null default 'student',
  avatar_url text,
  created_at timestamptz not null default now()
);

create table public.tutor_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles (id) on delete cascade,
  subject text not null,
  bio text not null default '',
  hourly_rate numeric(10, 2) not null check (hourly_rate >= 0),
  rating numeric(3, 2) not null default 0 check (rating >= 0 and rating <= 5),
  is_available boolean not null default true,
  created_at timestamptz not null default now()
);

create type public.booking_status as enum (
  'pending',
  'confirmed',
  'cancelled',
  'completed'
);

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles (id) on delete cascade,
  tutor_id uuid not null references public.tutor_profiles (id) on delete cascade,
  scheduled_at timestamptz not null,
  status public.booking_status not null default 'pending',
  notes text,
  created_at timestamptz not null default now()
);

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.tutor_profiles enable row level security;
alter table public.bookings enable row level security;

-- Profiles: users can read all, update only their own
create policy "Profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

-- Tutor profiles: public read, tutors manage their own
create policy "Tutor profiles are viewable by everyone"
  on public.tutor_profiles for select using (true);

create policy "Tutors can manage own profile"
  on public.tutor_profiles for all using (
    auth.uid() = user_id
  );

-- Bookings: students and tutors see their own bookings
create policy "Students see own bookings"
  on public.bookings for select using (auth.uid() = student_id);

create policy "Tutors see bookings for them"
  on public.bookings for select using (
    auth.uid() = (select user_id from public.tutor_profiles where id = tutor_id)
  );

create policy "Students can create bookings"
  on public.bookings for insert with check (auth.uid() = student_id);
