-- Adds optional supporting product photography for the storefront bag gallery.
-- Keep image_url as the primary image so existing product records continue to work.
alter table public.products
  add column if not exists image_urls text[] not null default '{}';
