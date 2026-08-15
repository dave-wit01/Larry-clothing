create extension if not exists pgcrypto;

create table if not exists public.orders (
  id uuid primary key,
  items jsonb not null,
  customer jsonb not null,
  total numeric(12, 2) not null check (total >= 0),
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'fulfilled', 'cancelled')),
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;

drop policy if exists "Public can create pending orders" on public.orders;
create policy "Public can create pending orders"
  on public.orders
  for insert
  to anon
  with check (status = 'pending');

-- Do not add public select, update, or delete policies. Review and manage
-- orders through Supabase Studio or an authenticated admin-only application.
