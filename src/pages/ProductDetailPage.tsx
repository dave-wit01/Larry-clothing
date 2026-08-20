import { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Header } from '../components/Header';
import { MenuDrawer } from '../components/MenuDrawer';
import { ServicesDrawer } from '../components/ServicesDrawer';
import { useCart } from '../context/CartContext';
import type { SearchProduct } from '../data/searchData';
import FullFooter from './Footer.jsx';
import { formatPrice } from '../lib/currency';

type ProductDetailPageProps = {
  product: SearchProduct;
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

export function ProductDetailPage({
  product,
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
}: ProductDetailPageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const { addItem, buyNow, hasItem } = useCart();

  useEffect(() => {
    setSelectedColor(product.colors[0]);
    setSelectedSize(product.sizes[0]);
  }, [product]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartProduct = {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    images: product.images,
  };
  const isInBag = hasItem(cartProduct);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header
        isScrolled={isScrolled}
        onMenuOpen={() => setIsMenuOpen(true)}
        onOpenRegister={onOpenRegister}
        onGoHome={onGoHome}
      />
      <MenuDrawer
        isOpen={isMenuOpen}
        isVisible={false}
        onClose={() => setIsMenuOpen(false)}
        onGoHome={onGoHome}
        onNavigate={(link) => {
          if (link === 'Casual wear') onNavigateCasual?.();
          if (link === 'Suit wear') onNavigateSuit?.();
          if (link === 'Office wear') onNavigateOffice?.();
          if (link === 'Street wear') onNavigateStreet?.();
          if (link === 'Traditional Outfit') onNavigateTraditional?.();
          if (link === 'Underwear') onNavigateUnderwear?.();
          if (link === 'Socks') onNavigateSocks?.();
          if (link === 'About CosLaary') onNavigateAbout?.();
        }}
      />
      <ServicesDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigateHome={onGoHome}
        onNavigateCasual={onNavigateCasual}
        onOpenMenu={() => setIsMenuOpen(true)}
      />

      <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="overflow-hidden rounded-2xl bg-parchment shadow-sm">
            <img
              src={product.image}
              alt={product.name}
              className="aspect-[4/5] h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center py-2 lg:py-8">
            <p className="text-xs uppercase tracking-[0.25em] text-ink/60">{product.category}</p>
            <h1 className="mt-3 font-display text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
              {product.name}
            </h1>
            <p className="mt-5 text-2xl font-semibold tracking-[-0.025em]">
              {formatPrice(product.price)}
            </p>
            <p className="mt-5 max-w-md text-sm leading-6 text-ink/70 sm:text-base">
              A considered CosLaary piece, selected for its material, shape, and everyday
              wearability.
            </p>

            <div className="mt-8">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-ink/60">
                Color: {selectedColor}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    aria-pressed={selectedColor === color}
                    onClick={() => setSelectedColor(color)}
                    className={`min-h-10 rounded-full border px-4 text-sm transition ${selectedColor === color ? 'border-emerald bg-emerald/5 text-emerald' : 'border-ink/10 bg-white hover:border-ink/30'}`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-7">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-ink/60">
                Size: {selectedSize}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    aria-pressed={selectedSize === size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-h-10 min-w-12 rounded-full border px-4 text-sm transition ${selectedSize === size ? 'border-emerald bg-emerald/5 text-emerald' : 'border-ink/10 bg-white hover:border-ink/30'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => addItem(cartProduct)}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink px-5 text-sm font-semibold uppercase tracking-[0.1em] transition hover:border-emerald hover:text-emerald"
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
                {isInBag ? 'ADD ANOTHER TO BAG' : 'ADD TO BAG'}
              </button>
              <button
                type="button"
                onClick={() => buyNow(cartProduct)}
                className="min-h-12 rounded-full bg-ink px-5 text-sm font-semibold uppercase tracking-[0.1em] text-paper transition hover:bg-emerald"
              >
                BUY NOW
              </button>
            </div>
          </div>
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
