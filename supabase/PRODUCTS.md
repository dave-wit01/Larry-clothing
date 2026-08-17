# Managing products

Run the `20260817_products_and_storage.sql` migration in Supabase before managing products. It creates the `product-images` bucket and extends the existing `products` table.

## Add a product

1. In **Storage**, open `product-images` and upload a JPG, PNG, or WebP image (up to 5 MB).
2. Copy the image's public URL.
3. In **Table Editor**, open `products` and insert a row with these values:

| Field | Example |
| --- | --- |
| `id` | `jersey-black-01` |
| `name` | `Signature Black Jersey` |
| `category` | `Jersey` |
| `price` | `250` (USD) |
| `image_url` | The public URL copied from Storage |
| `colors` | `{Black}` |
| `sizes` | `{S,M,L,XL,XXL}` |
| `status` | `published` |
| `is_active` | `true` |
| `is_new` | `true` or `false` |

Products with `status = published` and `is_active = true` appear automatically in the storefront and search. Use `draft` while preparing a product or `coming_soon` to keep it hidden from shoppers.

## Edit or remove a product

Update the row in Table Editor. To hide a product without deleting it, set `status` to `draft` or `coming_soon`, or set `is_active` to `false`.

## Image permissions

The migration makes product images publicly readable, which is required for storefront images. Upload, replacement, and deletion are restricted to users whose Supabase `app_metadata.role` is `admin`. Project owners can still upload files directly through the Supabase Dashboard.
