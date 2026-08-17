import { useEffect, useState } from 'react'
import { SEARCH_PRODUCTS, type SearchProduct } from '../data/searchData'
import { supabase } from '../lib/supabase'

type ProductRow = {
  id: string
  name: string
  category: string | null
  price: number | string
  image_url: string | null
  colors: string[] | null
  sizes: string[] | null
  is_new: boolean | null
}

const fallbackById = new Map(SEARCH_PRODUCTS.map((product) => [product.id, product]))

function toProduct(row: ProductRow): SearchProduct {
  const fallback = fallbackById.get(row.id)

  return {
    id: row.id,
    name: row.name,
    category: row.category || fallback?.category || 'Casual wear',
    price: Number(row.price),
    image: row.image_url || fallback?.image || '',
    colors: row.colors?.length ? row.colors : fallback?.colors || ['Black'],
    sizes: row.sizes?.length ? row.sizes : fallback?.sizes || ['S', 'M', 'L', 'XL'],
    isNew: row.is_new ?? fallback?.isNew,
  }
}

export function usePublishedProducts(categories?: string | string[]) {
  const categoryValues = categories ? (Array.isArray(categories) ? categories : [categories]) : []
  const categoryKey = categoryValues.join('|')
  const fallbackProducts = categoryValues.length
    ? SEARCH_PRODUCTS.filter((product) => categoryValues.includes(product.category))
    : SEARCH_PRODUCTS
  const [products, setProducts] = useState<SearchProduct[]>(fallbackProducts)
  const [isLoading, setIsLoading] = useState(Boolean(supabase))

  useEffect(() => {
    const client = supabase
    if (!client) {
      setProducts(fallbackProducts)
      setIsLoading(false)
      return undefined
    }

    let isCurrent = true

    const loadProducts = async () => {
      let query = client
        .from('products')
        .select('id, name, category, price, image_url, colors, sizes, is_new')
        .eq('status', 'published')
        .order('created_at', { ascending: false })

      if (categoryValues.length === 1) query = query.eq('category', categoryValues[0])
      if (categoryValues.length > 1) query = query.in('category', categoryValues)

      const { data, error } = await query
      if (!isCurrent) return

      // A missing table or an empty new project should not leave the storefront blank.
      setProducts(!error && data?.length ? data.map(toProduct) : fallbackProducts)
      setIsLoading(false)
    }

    void loadProducts()
    return () => {
      isCurrent = false
    }
  }, [categoryKey])

  return { products, isLoading }
}
