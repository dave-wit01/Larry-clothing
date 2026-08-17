import { casualProducts, streetProducts } from './catalogProducts'

export type SearchProduct = {
  id: string
  name: string
  category: string
  price: number
  colors: string[]
  sizes: string[]
  image: string
  isNew?: boolean
}

export type SearchSuggestion = {
  id: string
  label: string
  type: 'product' | 'category' | 'term'
  image?: string
}

export const SEARCH_CATEGORIES = [
  'Casual wear',
  'Streetwear',
  'Jersey',
]

export const TOP_SEARCH_TERMS = [
  'Streetwear',
  'Jersey',
  'Leather goods',
  'Monogram',
  'Casual wear',
]

const QUERY_ALIASES: Record<string, string> = {
  hoody: 'hoodie',
  hoodyie: 'hoodie',
  tshirt: 't shirt',
  tee: 't shirt',
  laary: 'coslaary',
}

export const SEARCH_PRODUCTS: SearchProduct[] = [
  ...casualProducts.map((product) => ({
    ...product,
    category: 'Casual wear',
    colors: ['Black', 'Cream', 'Navy'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  })),
  ...streetProducts.map((product) => ({
    ...product,
    category: product.name === 'Signature Jersey' ? 'Jersey' : 'Streetwear',
    colors: ['Black', 'Gray', 'Navy'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isNew: product.name === 'Signature Jersey',
  })),
]

function normalizeQuery(query: string) {
  const raw = query.trim().toLowerCase()
  const alias = QUERY_ALIASES[raw]
  return alias || raw
}

function buildSearchTerms(query: string) {
  const normalized = normalizeQuery(query)
  return normalized
    .replace(/[^a-z0-9 ]/g, ' ')
    .split('\n')
    .join(' ')
    .split(' ')
    .map((term) => term.trim())
    .filter(Boolean)
}

export function searchProducts(query: string, products = SEARCH_PRODUCTS) {
  const terms = buildSearchTerms(query)

  if (!terms.length) {
    return products
  }

  return products.filter((product) => {
    const haystack = [product.name, product.category, ...product.colors].join(' ').toLowerCase()
    return terms.every((term) => haystack.includes(term))
  }).sort((a, b) => {
    const score = (product: SearchProduct) =>
      terms.reduce((sum, term) => {
        const haystack = [product.name, product.category].join(' ').toLowerCase()
        return sum + (haystack.includes(term) ? 1 : 0)
      }, 0)
    return score(b) - score(a)
  })
}

export function getSearchSuggestions(query: string) {
  const normalizedQuery = normalizeQuery(query)
  if (normalizedQuery.length < 2) {
    return []
  }

  const productMatches = SEARCH_PRODUCTS.filter((product) =>
    product.name.toLowerCase().includes(normalizedQuery) ||
    product.category.toLowerCase().includes(normalizedQuery)
  )

  const categoryMatches = SEARCH_CATEGORIES.filter((category) =>
    category.toLowerCase().includes(normalizedQuery)
  )

  const termMatches = TOP_SEARCH_TERMS.filter((term) =>
    term.toLowerCase().includes(normalizedQuery)
  )

  const productSuggestions = productMatches.slice(0, 4).map((product) => ({
    id: `suggest-${product.id}`,
    label: product.name,
    type: 'product' as const,
    image: product.image,
  }))

  const categorySuggestions = categoryMatches.map((category) => ({
    id: `suggest-cat-${category}`,
    label: category,
    type: 'category' as const,
  }))

  const termSuggestions = termMatches.map((term) => ({
    id: `suggest-term-${term}`,
    label: term,
    type: 'term' as const,
  }))

  return [...productSuggestions, ...categorySuggestions, ...termSuggestions].slice(0, 8)
}

export function getSearchFallbackTerms() {
  return TOP_SEARCH_TERMS.slice(0, 5)
}
