-- The browser may display product data, but it must never be trusted to price an order.
create table if not exists public.products (
  id text primary key,
  name text not null,
  price numeric(12, 2) not null check (price >= 0),
  sizes smallint[] not null default '{44,46,48,50,54,56,58,60}',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

insert into public.products (id, name, price) values
  ('casual-0', 'Monogram T-Shirt', 35), ('casual-1', 'Weekend Overshirt', 43), ('casual-2', 'Relaxed Cotton Trouser', 51), ('casual-3', 'Signature Casual Jacket', 59),
  ('office-0', 'Executive Blazer', 35), ('office-1', 'Tailored Office Trouser', 43), ('office-2', 'Classic Work Shirt', 51), ('office-3', 'Professional Vest', 59),
  ('suit-0', 'Modern Two-Piece Suit', 35), ('suit-1', 'Double Breasted Suit', 43), ('suit-2', 'Evening Tailored Jacket', 51), ('suit-3', 'Formal Suit Trouser', 59),
  ('street-0', 'Graphic Street Jacket', 35), ('street-1', 'Relaxed Cargo Trouser', 43), ('street-2', 'Streetwear Overshirt', 51), ('street-3', 'Urban Layered Set', 59),
  ('traditional-0', 'Traditional Kaftan Set', 35), ('traditional-1', 'Heritage Tunic', 43), ('traditional-2', 'Classic Traditional Set', 51), ('traditional-3', 'Tailored Native Wear', 59),
  ('socks-0', 'Everyday Cotton Socks', 35), ('socks-1', 'Ribbed Comfort Socks', 43), ('socks-2', 'Classic Logo Socks', 51), ('socks-3', 'Premium Dress Socks', 59),
  ('uw-1', 'Essential Cotton Brief', 29.99), ('uw-2', 'Signature Comfort Boxer', 34.99), ('uw-3', 'Everyday Ribbed Trunk', 27.99),
  ('uw-4', 'Classic Stretch Boxer Brief', 39.99), ('uw-5', 'Soft Modal Brief', 31.99), ('uw-6', 'Premium Everyday Trunk', 36.99)
on conflict (id) do update set name = excluded.name, price = excluded.price;

alter table public.products enable row level security;
-- Products are intentionally readable by shoppers, but only the server can change them.
drop policy if exists "Products are publicly readable" on public.products;
create policy "Products are publicly readable" on public.products for select to anon using (is_active);

drop policy if exists "Public can create pending orders" on public.orders;
revoke insert, update, delete on public.orders from anon, authenticated;

create table if not exists public.order_rate_limits (
  key_hash text primary key,
  window_started_at timestamptz not null default now(),
  request_count integer not null default 0 check (request_count >= 0)
);

-- This is only callable by the Edge Function's service-role client. The conditional
-- upsert makes the limit safe when several requests arrive simultaneously.
alter table public.order_rate_limits enable row level security;

create or replace function public.consume_order_rate_limit(
  p_key_hash text,
  p_limit integer default 5,
  p_window interval default interval '15 minutes'
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  allowed boolean;
begin
  with attempted as (
    insert into public.order_rate_limits (key_hash, window_started_at, request_count)
    values (p_key_hash, now(), 1)
    on conflict (key_hash) do update
      set window_started_at = case
            when order_rate_limits.window_started_at <= now() - p_window then now()
            else order_rate_limits.window_started_at
          end,
          request_count = case
            when order_rate_limits.window_started_at <= now() - p_window then 1
            else order_rate_limits.request_count + 1
          end
      where order_rate_limits.window_started_at <= now() - p_window
         or order_rate_limits.request_count < p_limit
    returning 1
  )
  select exists (select 1 from attempted) into allowed;

  return allowed;
end;
$$;

revoke all on table public.order_rate_limits from public, anon, authenticated;
revoke all on function public.consume_order_rate_limit(text, integer, interval) from public, anon, authenticated;
grant select on public.products to service_role;
grant insert on public.orders to service_role;
grant select, insert, update on public.order_rate_limits to service_role;
grant execute on function public.consume_order_rate_limit(text, integer, interval) to service_role;
