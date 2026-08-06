import streetImage1 from '../assets/Streetwear3.jpg'
import streetImage2 from '../assets/Streetwear4.jpg'
import officeImage1 from '../assets/Officewear1.jpg'
import officeImage2 from '../assets/Officewear2.jpg'
import suitImage1 from '../assets/menSuitCategory.jpg'
import suitImage2 from '../assets/menSuitCategory2.jpg'
import traditionImage1 from '../assets/traditional 1.jpg'
import underwearImage1 from '../assets/underwear2.jpg'
import socksImage1 from '../assets/socks1.jpg'
import leatherImage from '../assets/women suit 1.jpg'

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
  'Office wear',
  'Suit wear',
  'Street wear',
  'Traditional Outfit',
  'Underwear',
  'Socks',
]

export const TOP_SEARCH_TERMS = [
  'Monogram jacket',
  'Tailored suit',
  'Leather goods',
  'Luxury hoodie',
  'Dress shirt',
  'Travel bag',
  'Evening wear',
]

const QUERY_ALIASES: Record<string, string> = {
  hoody: 'hoodie',
  hoodyie: 'hoodie',
  hoodie: 'hoodie',
  tshirt: 'tee',
  shirt: 'shirt',
  laary: 'coslaary',
}

export const SEARCH_PRODUCTS: SearchProduct[] = [
  {
    id: 'prod-1',
    name: 'Monogram Jacket',
    category: 'Suit wear',
    price: 420,
    colors: ['Black', 'Navy', 'Cream'],
    sizes: ['44', '46', '48', '50', '52'],
    image: suitImage1,
    isNew: true,
  },
  {
    id: 'prod-2',
    name: 'Tailored Suit',
    category: 'Suit wear',
    price: 560,
    colors: ['Charcoal', 'Navy'],
    sizes: ['46', '48', '50', '52'],
    image: suitImage2,
  },
  {
    id: 'prod-3',
    name: 'Leather Tote',
    category: 'Casual wear',
    price: 320,
    colors: ['Brown', 'Black'],
    sizes: ['One size'],
    image: leatherImage,
  },
  {
    id: 'prod-4',
    name: 'Street Hoodie',
    category: 'Street wear',
    price: 250,
    colors: ['Black', 'Gray', 'Navy'],
    sizes: ['M', 'L', 'XL'],
    image: streetImage1,
    isNew: true,
  },
  {
    id: 'prod-5',
    name: 'Street Tee',
    category: 'Street wear',
    price: 120,
    colors: ['White', 'Black'],
    sizes: ['M', 'L', 'XL'],
    image: streetImage2,
  },
  {
    id: 'prod-6',
    name: 'Classic Office Shirt',
    category: 'Office wear',
    price: 180,
    colors: ['White', 'Blue'],
    sizes: ['M', 'L', 'XL'],
    image: officeImage1,
  },
  {
    id: 'prod-7',
    name: 'Work Trousers',
    category: 'Office wear',
    price: 220,
    colors: ['Gray', 'Navy'],
    sizes: ['46', '48', '50', '52'],
    image: officeImage2,
  },
  {
    id: 'prod-8',
    name: 'Traditional Kilt',
    category: 'Traditional Outfit',
    price: 410,
    colors: ['Cream', 'Olive'],
    sizes: ['S', 'M', 'L'],
    image: traditionImage1,
  },
  {
    id: 'prod-9',
    name: 'Cotton Brief Pack',
    category: 'Underwear',
    price: 95,
    colors: ['White', 'Black'],
    sizes: ['S', 'M', 'L'],
    image: underwearImage1,
  },
  {
    id: 'prod-10',
    name: 'Travel Socks',
    category: 'Socks',
    price: 40,
    colors: ['Navy', 'Cream'],
    sizes: ['One size'],
    image: socksImage1,
  },
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

export function searchProducts(query: string) {
  const terms = buildSearchTerms(query)

  if (!terms.length) {
    return SEARCH_PRODUCTS
  }

  return SEARCH_PRODUCTS.filter((product) => {
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
