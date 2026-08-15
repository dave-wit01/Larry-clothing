import { useEffect, useMemo, useState } from 'react'
import { ChevronDown, Filter, X } from 'lucide-react'
import { Header } from '../components/Header'
import { MenuDrawer } from '../components/MenuDrawer'
import { ServicesDrawer } from '../components/ServicesDrawer'
import FullFooter from './Footer.jsx'
import { searchProducts, SEARCH_CATEGORIES, getSearchFallbackTerms } from '../data/searchData'

type SearchResultsPageProps = {
  query: string
  onSubmitSearch: (query: string) => void
  onGoHome?: () => void
  onNavigateCasual?: () => void
  onNavigateSuit?: () => void
  onNavigateOffice?: () => void
  onNavigateStreet?: () => void
  onNavigateTraditional?: () => void
  onNavigateUnderwear?: () => void
  onNavigateSocks?: () => void
  onNavigateAbout?: () => void
  onNavigateHelp?: () => void
  onOpenRegister?: () => void
}

const FILTERS = {
  sizes: ['S', 'M', 'L', 'XL'],
  colors: ['Black', 'White', 'Navy', 'Gray', 'Brown', 'Cream'],
  categories: SEARCH_CATEGORIES,
}

export function SearchResultsPage({
  query,
  onSubmitSearch,
  onGoHome,
  onNavigateCasual,
  onNavigateSuit,
  onNavigateOffice,
  onNavigateStreet,
  onNavigateTraditional,
  onNavigateUnderwear,
  onNavigateSocks,
  onNavigateAbout,
  onNavigateHelp,
  onOpenRegister,
}: SearchResultsPageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const results = useMemo(() => searchProducts(query), [query])

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header
        isScrolled={isScrolled}
        onMenuOpen={() => setIsMenuOpen(true)}
        onOpenLogin={undefined}
        onOpenRegister={onOpenRegister}
        onGoHome={onGoHome}
      />
      <MenuDrawer
        isOpen={isMenuOpen}
        isVisible={false}
        onClose={() => setIsMenuOpen(false)}
        onGoHome={onGoHome}
        onNavigate={(link) => {
          if (link === 'Casual wear' && onNavigateCasual) onNavigateCasual()
          if (link === 'Suit wear' && onNavigateSuit) onNavigateSuit()
          if (link === 'Office wear' && onNavigateOffice) onNavigateOffice()
          if (link === 'Street wear' && onNavigateStreet) onNavigateStreet()
          if (link === 'Traditional Outfit' && onNavigateTraditional) onNavigateTraditional()
          if (link === 'Underwear' && onNavigateUnderwear) onNavigateUnderwear()
          if (link === 'Socks' && onNavigateSocks) onNavigateSocks()
          if (link === 'About CosLaary' && onNavigateAbout) onNavigateAbout()
        }}
      />

      <ServicesDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigateHome={onGoHome}
        onNavigateCasual={onNavigateCasual}
        onOpenMenu={() => setIsMenuOpen(true)}
      />

      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-ink/60">Search results for</p>
            <h1 className="mt-2 text-3xl font-semibold text-ink">{query || 'all products'}</h1>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-paper px-4 py-2 text-sm font-medium text-ink transition hover:border-ink/20"
            onClick={() => onSubmitSearch(query)}
          >
            <Filter size={16} />
            Refine results
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="rounded-3xl border border-ink/10 bg-paper p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-ink/70">Filters</h2>
              <button type="button" className="text-ink/60 hover:text-ink">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.25em] text-ink/70">Category</p>
                <div className="space-y-2">
                  {FILTERS.categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      className="flex w-full items-center justify-between rounded-2xl border border-ink/10 bg-white px-3 py-2 text-left text-sm text-ink transition hover:border-ink/20"
                    >
                      <span>{category}</span>
                      <ChevronDown size={14} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.25em] text-ink/70">Color</p>
                <div className="grid grid-cols-3 gap-2">
                  {FILTERS.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className="rounded-full border border-ink/10 bg-white px-3 py-2 text-xs text-ink transition hover:border-ink/20"
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.25em] text-ink/70">Size</p>
                <div className="grid grid-cols-3 gap-2">
                  {FILTERS.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className="rounded-full border border-ink/10 bg-white px-3 py-2 text-xs text-ink transition hover:border-ink/20"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.25em] text-ink/70">Price range</p>
                <div className="space-y-2 text-sm text-ink/80">
                  <p>$0 - $199</p>
                  <p>$200 - $399</p>
                  <p>$400+</p>
                </div>
              </div>
            </div>
          </aside>

          <section className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-ink/10 bg-paper p-4 shadow-sm">
              <p className="text-sm text-ink/70">Sort by</p>
              <div className="flex flex-wrap items-center gap-2">
                {['Relevance', 'Price: low-high', 'Price: high-low', 'Newest'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    className="rounded-full border border-ink/10 bg-white px-3 py-2 text-sm text-ink transition hover:border-ink/20"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {results.length === 0 ? (
              <div className="rounded-3xl border border-ink/10 bg-paper p-8 text-center shadow-sm">
                <p className="text-sm uppercase tracking-[0.25em] text-ink/60">No results found</p>
                <h2 className="mt-4 text-2xl font-semibold text-ink">Try a different search</h2>
                <p className="mt-3 text-sm text-ink/70">Did you mean one of these?</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {getSearchFallbackTerms().map((term) => (
                    <button
                      key={term}
                      type="button"
                      className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink text-left transition hover:border-ink/20"
                      onClick={() => onSubmitSearch(term)}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {results.map((item) => (
                  <article key={item.id} className="overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-sm">
                    <img src={item.image} alt={item.name} className="h-52 w-full object-cover" />
                    <div className="p-4">
                      <p className="text-xs uppercase tracking-[0.25em] text-ink/60">{item.category}</p>
                      <h3 className="mt-2 text-lg font-semibold text-ink">{item.name}</h3>
                      <p className="mt-2 text-sm text-ink/70">{item.colors.join(', ')}</p>
                      <div className="mt-4 flex items-center justify-between text-sm font-semibold text-ink">
                        <span>${item.price}</span>
                        {item.isNew && <span className="rounded-full bg-emerald/10 px-3 py-1 text-emerald">New</span>}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <FullFooter
        onNavigateAbout={onNavigateAbout}
        onNavigateHelp={onNavigateHelp}
        onOpenServices={() => setIsMenuOpen(true)}
        onOpenRegister={onOpenRegister}
      />
    </div>
  )
}
