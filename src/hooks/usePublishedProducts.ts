import { useEffect, useMemo, useState } from 'react';
import { SEARCH_PRODUCTS, type SearchProduct } from '../data/searchData';
import { supabase } from '../lib/supabase';

type ProductRow = {
  id: string;
  name: string;
  category: string | null;
  price: number | string;
  image_url: string | null;
  image_urls: string[] | null;
  colors: string[] | null;
  sizes: string[] | null;
  is_new: boolean | null;
};

const fallbackById = new Map(SEARCH_PRODUCTS.map((product) => [product.id, product]));

function toProduct(row: ProductRow): SearchProduct {
  const fallback = fallbackById.get(row.id);

  return {
    id: row.id,
    name: row.name,
    category: row.category || fallback?.category || 'Casual wear',
    price: Number(row.price),
    image: row.image_url || fallback?.image || '',
    images: Array.from(
      new Set(
        [row.image_url, ...(row.image_urls ?? [])].filter((image): image is string =>
          Boolean(image)
        )
      )
    ),
    colors: row.colors?.length ? row.colors : fallback?.colors || ['Black'],
    sizes: row.sizes?.length ? row.sizes : fallback?.sizes || ['S', 'M', 'L', 'XL'],
    isNew: row.is_new ?? fallback?.isNew,
  };
}

export function usePublishedProducts(categories?: string | string[]) {
  const categoryValues = categories ? (Array.isArray(categories) ? categories : [categories]) : [];
  const categoryKey = categoryValues.join('|');
  const fallbackProducts = useMemo(() => {
    const values = categoryKey ? categoryKey.split('|') : [];

    return values.length
      ? SEARCH_PRODUCTS.filter((product) => values.includes(product.category))
      : SEARCH_PRODUCTS;
  }, [categoryKey]);
  const [products, setProducts] = useState<SearchProduct[]>(fallbackProducts);
  const [isLoading, setIsLoading] = useState(Boolean(supabase));

  useEffect(() => {
    const client = supabase;
    const values = categoryKey ? categoryKey.split('|') : [];

    if (!client) {
      setProducts(fallbackProducts);
      setIsLoading(false);
      return undefined;
    }

    let isCurrent = true;

    const loadProducts = async () => {
      let query = client
        .from('products')
        .select('id, name, category, price, image_url, image_urls, colors, sizes, is_new')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (values.length === 1) query = query.eq('category', values[0]);
      if (values.length > 1) query = query.in('category', values);

      const { data, error } = await query;
      if (!isCurrent) return;

      // A missing table or an empty new project should not leave the storefront blank.
      setProducts(!error && data?.length ? data.map(toProduct) : fallbackProducts);
      setIsLoading(false);
    };

    void loadProducts();
    return () => {
      isCurrent = false;
    };
  }, [categoryKey, fallbackProducts]);

  return { products, isLoading };
}
