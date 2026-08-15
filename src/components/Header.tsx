import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { AccountMenu } from './AccountMenu'
import { BrandLogo } from './BrandLogo'
import { getSearchSuggestions } from '../data/searchData'
import { useSearch } from '../context/SearchContext'
import { useCart } from '../context/CartContext'
import { useBackNavigation } from '../context/NavigationContext'

type HeaderProps = {
  isScrolled: boolean
  onMenuOpen: () => void
  onOpenLogin?: () => void
  onOpenRegister?: () => void
  onGoHome?: () => void
}

export function Header({ isScrolled, onMenuOpen, onOpenLogin, onOpenRegister, onGoHome }: HeaderProps) {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const searchContainerRef = useRef<HTMLDivElement | null>(null)
  const searchContext = useSearch()
  const { items, openCart } = useCart()
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0)
  const goBack = useBackNavigation()

  const suggestions = useMemo(
    () => (debouncedQuery.length >= 2 ? getSearchSuggestions(debouncedQuery) : []),
    [debouncedQuery]
  )

  const recentDisplay = recentSearches.slice(0, 5)

  useEffect(() => {
    const saved = window.localStorage.getItem('clothingSearchHistory')
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved))
      } catch {
        setRecentSearches([])
      }
    }
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(searchQuery.trim())
    }, 300)

    return () => window.clearTimeout(timer)
  }, [searchQuery])

  useEffect(() => {
    if (!isSearchOpen) return undefined

    const handleDocumentClick = (event: MouseEvent) => {
      if (!searchContainerRef.current?.contains(event.target as Node)) {
        setIsSearchOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener('mousedown', handleDocumentClick)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isSearchOpen])

  useEffect(() => {
    if (!isAccountMenuOpen) return undefined

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsAccountMenuOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isAccountMenuOpen])

  const saveSearch = (query: string) => {
    if (!query.trim()) return

    const nextHistory = [query, ...recentSearches.filter((item) => item !== query)].slice(0, 5)
    setRecentSearches(nextHistory)
    window.localStorage.setItem('clothingSearchHistory', JSON.stringify(nextHistory))
  }

  const handleSubmitSearch = (query = searchQuery) => {
    const trimmed = query.trim()
    if (!trimmed) return

    saveSearch(trimmed)
    setIsSearchOpen(false)
    searchContext?.submitSearch(trimmed)
  }

  const openSearch = () => {
    setIsSearchOpen(true)
    window.requestAnimationFrame(() => inputRef.current?.focus())
  }

  const handleSearchSelect = (item: string) => {
    setSearchQuery(item)
    handleSubmitSearch(item)
    inputRef.current?.blur()
  }

  const handleClearSearch = () => {
    setSearchQuery('')
    setDebouncedQuery('')
    setIsSearchOpen(true)
    window.requestAnimationFrame(() => inputRef.current?.focus())
  }

  const showRecentHistory = isSearchOpen && searchQuery.trim().length === 0
  const showSuggestions = isSearchOpen && searchQuery.trim().length >= 2

  return (
    <header
      className={`sticky top-0 z-40 bg-paper/90 backdrop-blur transition-shadow duration-300 ${
        isScrolled ? 'shadow-[0_1px_0_0_#E4DFD1]' : ''
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <div className="flex items-center gap-1">
          <button
            className="icon-button"
            type="button"
            aria-label="Go back to the previous page"
            onClick={goBack ?? undefined}
            disabled={!goBack}
          >
            <ArrowLeft size={18} strokeWidth={1.5} />
          </button>
          <button
            className="icon-button"
            type="button"
            aria-label="Open menu"
            onClick={onMenuOpen}
          >
            <Menu size={18} strokeWidth={1.5} />
          </button>
        </div>

        <a
          className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-ink sm:h-16 sm:w-16"
          href="#top"
          aria-label="Larry Clothing home"
          onClick={(event) => {
            event.preventDefault()
            onGoHome?.()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <BrandLogo className="h-full w-full" />
        </a>

        <div className="flex items-center gap-1">
          <button className="icon-button relative border-transparent hover:border-transparent" type="button" aria-label={`Open cart, ${cartItemCount} items`} onClick={openCart}>
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cartItemCount > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald px-1 text-[10px] text-paper">{cartItemCount}</span>}
          </button>
          <button
            className="icon-button border-transparent hover:border-transparent"
            type="button"
            aria-label="Open account"
            aria-expanded={isAccountMenuOpen}
            aria-controls="account-menu"
            onClick={() => setIsAccountMenuOpen((isOpen) => !isOpen)}
          >
            <User size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-5 sm:px-8 lg:px-10">
        <div className="relative sm:max-w-md" ref={searchContainerRef}>
          <label className="group relative flex items-center gap-3 rounded-full border border-ink/80 bg-paper px-5 py-3 transition-colors focus-within:border-emerald">
            <span className="sr-only">Search Larry Clothing</span>
            <input
              ref={inputRef}
              className="w-full bg-transparent text-sm tracking-wide placeholder:text-ink/60 focus:outline-none"
              type="search"
              placeholder="Search here"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              onFocus={() => setIsSearchOpen(true)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  handleSubmitSearch()
                }
              }}
            />
            {searchQuery.trim().length > 0 && (
              <button
                type="button"
                className="absolute right-11 text-ink"
                aria-label="Clear search"
                onClick={handleClearSearch}
              >
                <X size={16} strokeWidth={2} />
              </button>
            )}
          </label>

          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-ink"
            aria-label={searchQuery.trim() ? 'Search' : 'Open search'}
            onClick={() => {
              if (searchQuery.trim().length > 0) {
                handleSubmitSearch()
              } else {
                openSearch()
              }
            }}
          >
            <Search size={18} strokeWidth={1.5} />
          </button>

          {isSearchOpen && (
            <div className="absolute left-0 right-0 top-full z-10 mt-2 rounded-3xl border border-ink/10 bg-paper shadow-lg">
              <div className="max-h-72 overflow-y-auto px-4 py-3">
                {showRecentHistory ? (
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.25em] text-ink/60">Recent searches</p>
                    {recentDisplay.length > 0 ? (
                      recentDisplay.map((item) => (
                        <button
                          key={item}
                          type="button"
                          className="block w-full rounded-2xl px-3 py-3 text-left text-sm text-ink transition hover:bg-ink/5"
                          onClick={() => handleSearchSelect(item)}
                        >
                          {item}
                        </button>
                      ))
                    ) : (
                      <p className="rounded-2xl px-3 py-3 text-sm text-ink/60">
                        Start typing to see search suggestions.
                      </p>
                    )}
                  </div>
                ) : showSuggestions ? (
                  suggestions.length > 0 ? (
                    suggestions.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm text-ink transition hover:bg-ink/5"
                        onClick={() => handleSearchSelect(item.label)}
                      >
                        {item.type === 'product' ? (
                          <img
                            src={item.image}
                            alt={item.label}
                            className="h-10 w-10 rounded-2xl object-cover"
                          />
                        ) : (
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-ink/5 text-xs uppercase tracking-[0.15em] text-ink/70">
                            {item.type}
                          </span>
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-sm text-ink">{item.label}</p>
                          <p className="text-xs text-ink/60">{item.type === 'product' ? 'Product' : item.type === 'category' ? 'Category' : 'Top search'}</p>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="rounded-2xl bg-paper px-3 py-3 text-sm text-ink/60">
                      No results found. Press Enter to search anyway.
                    </div>
                  )
                ) : (
                  <p className="rounded-2xl px-3 py-3 text-sm text-ink/60">
                    Type 2 or more characters to see suggestions.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {isAccountMenuOpen && (
        <button
          className="fixed inset-0 z-40 cursor-default bg-transparent"
          type="button"
          aria-label="Close account menu"
          onClick={() => setIsAccountMenuOpen(false)}
        />
      )}
      <AccountMenu
        isOpen={isAccountMenuOpen}
        onClose={() => setIsAccountMenuOpen(false)}
        onOpenLogin={onOpenLogin}
        onOpenRegister={onOpenRegister}
      />
    </header>
  )
}
