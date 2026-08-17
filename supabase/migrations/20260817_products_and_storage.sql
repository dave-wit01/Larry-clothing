-- Product catalogue fields. Values are stored in US dollars.
alter table public.products
  add column if not exists category text not null default 'Casual wear',
  add column if not exists image_url text,
  add column if not exists colors text[] not null default array['Black'],
  add column if not exists status text not null default 'published',
  add column if not exists is_new boolean not null default false;

alter table public.products
  drop constraint if exists products_status_check;

alter table public.products
  add constraint products_status_check check (status in ('published', 'coming_soon', 'draft'));

alter table public.products
  alter column sizes drop default,
  alter column sizes type text[] using sizes::text[],
  alter column sizes set default array['S', 'M', 'L', 'XL'];

-- Only the three live collections are visible to shoppers. Existing products remain
-- in the database as coming soon, ready to be published later.
update public.products set status = 'coming_soon';

insert into public.products (id, name, price, category, colors, sizes, status, is_new) values
  ('casual-0', 'Monogram T-Shirt', 35, 'Casual wear', array['Black', 'Cream', 'Navy'], array['S', 'M', 'L', 'XL', 'XXL'], 'published', false),
  ('casual-1', 'Weekend Overshirt', 43, 'Casual wear', array['Black', 'Cream', 'Navy'], array['S', 'M', 'L', 'XL', 'XXL'], 'published', false),
  ('casual-2', 'Relaxed Cotton Trouser', 51, 'Casual wear', array['Black', 'Cream', 'Navy'], array['S', 'M', 'L', 'XL', 'XXL'], 'published', false),
  ('casual-3', 'Signature Casual Jacket', 59, 'Casual wear', array['Black', 'Cream', 'Navy'], array['S', 'M', 'L', 'XL', 'XXL'], 'published', false),
  ('street-0', 'Graphic Street Jacket', 35, 'Streetwear', array['Black', 'Gray', 'Navy'], array['S', 'M', 'L', 'XL', 'XXL'], 'published', false),
  ('street-1', 'Relaxed Cargo Trouser', 43, 'Streetwear', array['Black', 'Gray', 'Navy'], array['S', 'M', 'L', 'XL', 'XXL'], 'published', false),
  ('street-2', 'Streetwear Overshirt', 51, 'Streetwear', array['Black', 'Gray', 'Navy'], array['S', 'M', 'L', 'XL', 'XXL'], 'published', false),
  ('street-3', 'Urban Layered Set', 59, 'Streetwear', array['Black', 'Gray', 'Navy'], array['S', 'M', 'L', 'XL', 'XXL'], 'published', false),
  ('street-4', 'Signature Jersey', 67, 'Jersey', array['Black', 'Gray', 'Navy'], array['S', 'M', 'L', 'XL', 'XXL'], 'published', true)
on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  category = excluded.category,
  colors = excluded.colors,
  sizes = excluded.sizes,
  status = excluded.status,
  is_new = excluded.is_new;

drop policy if exists "Products are publicly readable" on public.products;
create policy "Published products are publicly readable"
  on public.products for select to anon, authenticated
  using (is_active and status = 'published');

-- Store product photography outside the database. Public access is appropriate for
-- storefront images; upload, edit, and deletion require an admin app_metadata role.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-images', 'product-images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set public = true, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Admins can upload product images" on storage.objects;
create policy "Admins can upload product images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'product-images' and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins can update product images" on storage.objects;
create policy "Admins can update product images"
  on storage.objects for update to authenticated
  using (bucket_id = 'product-images' and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check (bucket_id = 'product-images' and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins can delete product images" on storage.objects;
create policy "Admins can delete product images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'product-images' and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
