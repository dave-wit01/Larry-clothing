import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, Filter, X } from 'lucide-react';
import { Header } from '../components/Header';
import { MenuDrawer } from '../components/MenuDrawer';
import { ServicesDrawer } from '../components/ServicesDrawer';
import FullFooter from './Footer.jsx';
import { formatPrice } from '../lib/currency';
import { usePublishedProducts } from '../hooks/usePublishedProducts';
import {
  getSearchFallbackTerms,
  type SearchProduct,
  searchProducts,
} from '../data/searchData';

type SearchResultsPageProps = {
  query: string;
  onSubmitSearch: (query: string) => void;
  onOpenProduct: (product: SearchProduct) => void;
  onGoHome?: () => void;
  onNavigateCasual?: () => void;
  onNavigateSuit?: () => void;
  onNavigateOffice?: () => void;
  onNavigateStreet?: () => void;
  onNavigateTraditional?: () => void;
  onNavigateUnderwear?: () => void;
  onNavigateSocks?: () => void;
  onNavigateAbout?: () => void;
  onNavigateHelp?: () => void;
  onOpenRegister?: () => void;
};

const FILTERS = {
  sizes: ['S', 'M', 'L', 'XL'],
  colors: ['Black', 'White', 'Navy', 'Gray', 'Brown', 'Cream'],
};

const PRICE_RANGES = [
  { label: `${formatPrice(0)} – ${formatPrice(199)}`, min: 0, max: 199 },
  { label: `${formatPrice(200)} – ${formatPrice(399)}`, min: 200, max: 399 },
  { label: `${formatPrice(400)}+`, min: 400, max: Number.POSITIVE_INFINITY },
];

const SORT_OPTIONS = {
  relevance: 'Relevance',
  priceAscending: 'Price: low-high',
  priceDescending: 'Price: high-low',
  newest: 'Newest',
} as const;

type SortOption = keyof typeof SORT_OPTIONS;

export function SearchResultsPage({
  query,
  onSubmitSearch,
  onOpenProduct,
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('relevance');
  const { products } = usePublishedProducts();
  const filterCategories = useMemo(
    () => [...new Set(products.map((product) => product.category))],
    [products]
  );
  const filterColors = useMemo(
    () => [...new Set(products.flatMap((product) => product.colors))],
    [products]
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const results = useMemo(() => searchProducts(query, products), [query, products]);
  const filteredResults = useMemo(() => {
    const selectedRange = PRICE_RANGES.find((range) => range.label === selectedPriceRange);
    const matchingProducts = results.filter((product) => {
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesColor =
        selectedColors.length === 0 ||
        selectedColors.some((color) => product.colors.includes(color));
      const matchesSize =
        selectedSizes.length === 0 || selectedSizes.some((size) => product.sizes.includes(size));
      const matchesPrice =
        !selectedRange ||
        (product.price >= selectedRange.min && product.price <= selectedRange.max);

      return matchesCategory && matchesColor && matchesSize && matchesPrice;
    });

    if (sortOption === 'priceAscending')
      return [...matchingProducts].sort((a, b) => a.price - b.price);
    if (sortOption === 'priceDescending')
      return [...matchingProducts].sort((a, b) => b.price - a.price);
    if (sortOption === 'newest')
      return [...matchingProducts].sort(
        (a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew))
      );

    return matchingProducts;
  }, [results, selectedCategories, selectedColors, selectedPriceRange, selectedSizes, sortOption]);

  const toggleFilter = (
    value: string,
    selectedValues: string[],
    setSelectedValues: (values: string[]) => void
  ) => {
    setSelectedValues(
      selectedValues.includes(value)
        ? selectedValues.filter((item) => item !== value)
        : [...selectedValues, value]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedPriceRange(null);
  };

  const activeFilterCount =
    selectedCategories.length +
    selectedColors.length +
    selectedSizes.length +
    Number(Boolean(selectedPriceRange));

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
          if (link === 'Casual wear' && onNavigateCasual) onNavigateCasual();
          if (link === 'Suit wear' && onNavigateSuit) onNavigateSuit();
          if (link === 'Office wear' && onNavigateOffice) onNavigateOffice();
          if (link === 'Street wear' && onNavigateStreet) onNavigateStreet();
          if (link === 'Traditional Outfit' && onNavigateTraditional) onNavigateTraditional();
          if (link === 'Underwear' && onNavigateUnderwear) onNavigateUnderwear();
          if (link === 'Socks' && onNavigateSocks) onNavigateSocks();
          if (link === 'About CosLaary' && onNavigateAbout) onNavigateAbout();
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
            aria-expanded={isFiltersOpen}
            aria-controls="search-filters"
            onClick={() => setIsFiltersOpen((isOpen) => !isOpen)}
          >
            <Filter size={16} />
            Refine results
          </button>
        </div>

        <div className={`grid gap-6 ${isFiltersOpen ? 'lg:grid-cols-[280px_1fr]' : ''}`}>
          {isFiltersOpen && (
            <aside
              id="search-filters"
              className="rounded-3xl border border-ink/10 bg-paper p-6 shadow-sm"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-ink/70">
                  Filters
                </h2>
                <div className="flex items-center gap-3">
                  {activeFilterCount > 0 && (
                    <button
                      type="button"
                      className="text-sm text-emerald hover:text-ink"
                      onClick={clearFilters}
                    >
                      Clear all
                    </button>
                  )}
                  <button
                    type="button"
                    className="text-ink/60 hover:text-ink"
                    aria-label="Close filters"
                    onClick={() => setIsFiltersOpen(false)}
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="mb-2 text-xs uppercase tracking-[0.25em] text-ink/70">Category</p>
                  <div className="space-y-2">
                    {filterCategories.map((category) => {
                      const isExpanded = expandedCategory === category;
                      const categoryProducts = products.filter(
                        (product) => product.category === category
                      );

                      return (
                        <div key={category}>
                          <button
                            type="button"
                            aria-expanded={isExpanded}
                            aria-controls={`category-${category.replaceAll(' ', '-').toLowerCase()}`}
                            onClick={() =>
                              setExpandedCategory((expanded) =>
                                expanded === category ? null : category
                              )
                            }
                            className={`flex w-full items-center justify-between rounded-2xl border bg-white px-3 py-2 text-left text-sm text-ink transition hover:border-ink/20 ${isExpanded ? 'border-emerald' : 'border-ink/10'}`}
                          >
                            <span>{category}</span>
                            <ChevronDown size={14} className={isExpanded ? 'rotate-180' : ''} />
                          </button>
                          {isExpanded && (
                            <div
                              id={`category-${category.replaceAll(' ', '-').toLowerCase()}`}
                              className="mt-2 space-y-1 border-l border-emerald/30 pl-3"
                            >
                              <button
                                type="button"
                                aria-pressed={selectedCategories.includes(category)}
                                onClick={() =>
                                  toggleFilter(category, selectedCategories, setSelectedCategories)
                                }
                                className={`block w-full rounded-lg px-2 py-1.5 text-left text-xs font-medium transition hover:bg-emerald/5 ${selectedCategories.includes(category) ? 'bg-emerald/10 text-emerald' : 'text-ink/70'}`}
                              >
                                {selectedCategories.includes(category)
                                  ? `Showing ${category}`
                                  : `Show all ${category}`}
                              </button>
                              {categoryProducts.map((product) => (
                                <button
                                  key={product.id}
                                  type="button"
                                  className="block w-full rounded-lg px-2 py-1.5 text-left text-xs text-ink/70 transition hover:bg-ink/5 hover:text-ink"
                                  onClick={() => onSubmitSearch(product.name)}
                                >
                                  {product.name}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-xs uppercase tracking-[0.25em] text-ink/70">Color</p>
                  <div className="grid grid-cols-3 gap-2">
                    {filterColors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        aria-pressed={selectedColors.includes(color)}
                        onClick={() => toggleFilter(color, selectedColors, setSelectedColors)}
                        className={`rounded-full border bg-white px-3 py-2 text-xs text-ink transition hover:border-ink/20 ${selectedColors.includes(color) ? 'border-emerald bg-emerald/5' : 'border-ink/10'}`}
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
                        aria-pressed={selectedSizes.includes(size)}
                        onClick={() => toggleFilter(size, selectedSizes, setSelectedSizes)}
                        className={`rounded-full border bg-white px-3 py-2 text-xs text-ink transition hover:border-ink/20 ${selectedSizes.includes(size) ? 'border-emerald bg-emerald/5' : 'border-ink/10'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-xs uppercase tracking-[0.25em] text-ink/70">
                    Price range
                  </p>
                  <div className="space-y-2 text-sm text-ink/80">
                    {PRICE_RANGES.map((range) => (
                      <button
                        key={range.label}
                        type="button"
                        aria-pressed={selectedPriceRange === range.label}
                        onClick={() =>
                          setSelectedPriceRange((selected) =>
                            selected === range.label ? null : range.label
                          )
                        }
                        className={`block text-left transition hover:text-emerald ${selectedPriceRange === range.label ? 'font-semibold text-emerald' : ''}`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          )}

          <section className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-ink/10 bg-paper p-4 shadow-sm">
              <p className="text-sm text-ink/70">Sort by</p>
              <div className="flex flex-wrap items-center gap-2">
                {(Object.entries(SORT_OPTIONS) as [SortOption, string][]).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={sortOption === value}
                    onClick={() => setSortOption(value)}
                    className={`rounded-full border bg-white px-3 py-2 text-sm text-ink transition hover:border-ink/20 ${sortOption === value ? 'border-emerald bg-emerald/5 font-medium' : 'border-ink/10'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {filteredResults.length === 0 ? (
              <div className="rounded-3xl border border-ink/10 bg-paper p-8 text-center shadow-sm">
                <p className="text-sm uppercase tracking-[0.25em] text-ink/60">No results found</p>
                {results.length > 0 ? (
                  <>
                    <h2 className="mt-4 text-2xl font-semibold text-ink">
                      No products match these filters
                    </h2>
                    <button
                      type="button"
                      className="mt-5 text-sm font-medium text-emerald hover:text-ink"
                      onClick={clearFilters}
                    >
                      Clear filters
                    </button>
                  </>
                ) : (
                  <>
                    <h2 className="mt-4 text-2xl font-semibold text-ink">Try a different search</h2>
                    <p className="mt-3 text-sm text-ink/70">Did you mean one of these?</p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {getSearchFallbackTerms().map((term) => (
                        <button
                          key={term}
                          type="button"
                          className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-left text-sm text-ink transition hover:border-ink/20"
                          onClick={() => onSubmitSearch(term)}
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {filteredResults.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onOpenProduct(item)}
                    className="overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-sm"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      className="h-52 w-full object-cover"
                    />
                    <div className="p-4 text-left">
                      <p className="text-xs uppercase tracking-[0.25em] text-ink/60">
                        {item.category}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold text-ink">{item.name}</h3>
                      <p className="mt-2 text-sm text-ink/70">{item.colors.join(', ')}</p>
                      <div className="mt-4 flex items-center justify-between text-sm font-semibold text-ink">
                        <span>{formatPrice(item.price)}</span>
                        {item.isNew && (
                          <span className="rounded-full bg-emerald/10 px-3 py-1 text-emerald">
                            New
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
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
  );
}
