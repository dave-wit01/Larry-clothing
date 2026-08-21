import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { MenuDrawer } from '../components/MenuDrawer';
import { ServicesDrawer } from '../components/ServicesDrawer';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import FullFooter from './Footer.jsx';
import { useCart } from '../context/CartContext';
import { useShoppingContext } from '../context/ShoppingContext';
import { formatPrice } from '../lib/currency';

type CartPageProps = {
  onOpenLogin?: () => void;
  onOpenRegister?: () => void;
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
  onCheckout?: (
    items: Array<{
      id: string;
      name: string;
      price: number;
      image: string;
      quantity: number;
      size: string;
    }>
  ) => void;
};

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export function CartPage({
  onOpenLogin,
  onOpenRegister,
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
  onCheckout,
}: CartPageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [selectedImages, setSelectedImages] = useState<Record<string, string>>({});
  const { items, removeItem, setQuantity } = useCart();
  const { categoryContext } = useShoppingContext();
  const cartItems = items;
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header
        isScrolled={isScrolled}
        onMenuOpen={() => setIsMenuOpen(true)}
        onOpenLogin={onOpenLogin}
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
      <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
        <div className="mb-8 text-center sm:mb-10">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-emerald">
            {categoryContext ? `From ${categoryContext}` : 'Your selection'}
          </p>
        </div>
        {cartItems.length === 0 ? (
          <div className="mx-auto max-w-md rounded-2xl border border-line bg-parchment px-6 py-14 text-center shadow-sm">
            <p className="font-display text-2xl font-medium">Your cart is empty.</p>
            <button
              type="button"
              onClick={onGoHome}
              className="mt-5 text-sm font-medium underline underline-offset-4 transition hover:text-emerald"
            >
              Continue shopping
            </button>
          </div>
        ) : (
          cartItems.map((item) => {
            // Supabase images are the source of truth. This also corrects carts
            // saved before the catalogue stopped using local fallback photos.
            const uploadedImages = item.images?.filter(Boolean) ?? [];
            const galleryImages = Array.from(
              new Set(uploadedImages.length ? uploadedImages : [item.image])
            ).slice(0, 3);
            const selectedImage = selectedImages[item.id] ?? galleryImages[0];

            return (
              <section
                key={item.id}
                className="mx-auto mb-12 max-w-5xl border-b border-line pb-12 last:mb-0 sm:mb-16 sm:pb-16"
              >
                <div className="grid gap-8 sm:grid-cols-[minmax(220px,0.8fr)_minmax(0,1fr)] sm:gap-10 lg:grid-cols-[minmax(300px,0.85fr)_minmax(0,1fr)] lg:gap-14">
                  <div>
                    <div className="overflow-hidden rounded-2xl bg-parchment shadow-sm">
                      <img
                        src={selectedImage}
                        alt={item.name}
                        className="aspect-[4/5] h-full w-full object-cover"
                      />
                    </div>
                    {galleryImages.length > 1 && (
                      <div className="mt-3 flex gap-2" aria-label={`${item.name} image gallery`}>
                        {galleryImages.map((image, index) => (
                          <button
                            key={image}
                            type="button"
                            onClick={() =>
                              setSelectedImages((current) => ({ ...current, [item.id]: image }))
                            }
                            aria-label={`View ${item.name} image ${index + 1}`}
                            aria-pressed={selectedImage === image}
                            className={`h-14 w-12 overflow-hidden rounded-xl border-2 transition sm:h-16 sm:w-14 ${selectedImage === image ? 'border-emerald shadow-sm' : 'border-transparent opacity-65 hover:opacity-100'}`}
                          >
                            <img src={image} alt="" className="h-full w-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 self-center py-1 sm:py-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.25em] text-ink/55">
                          In your bag
                        </p>
                        <h2 className="mt-3 font-display text-3xl font-medium leading-tight sm:text-4xl">
                          {item.name}
                        </h2>
                      </div>
                      <button
                        type="button"
                        className="shrink-0 rounded-full p-2 text-ink transition hover:bg-line/60 hover:text-emerald"
                        aria-label={`Remove ${item.name} from cart`}
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 size={19} strokeWidth={1.5} />
                      </button>
                    </div>
                    <p className="mt-4 text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
                      {formatPrice(item.price)}
                    </p>
                    <p className="mt-4 max-w-md text-sm leading-6 text-ink/70">
                      A considered CosLaary piece, selected for its material, shape, and everyday
                      wearability.
                    </p>
                    <div className="mt-7">
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-ink/60">
                        Size: {selectedSizes[item.id] ?? 'Select a size'}
                      </p>
                      <div className="mt-3 grid max-w-sm grid-cols-3 gap-2">
                        {SIZES.map((size) => (
                          <button
                            key={size}
                            type="button"
                            aria-pressed={selectedSizes[item.id] === size}
                            onClick={() =>
                              setSelectedSizes((current) => ({ ...current, [item.id]: size }))
                            }
                            className={`h-10 rounded-full border text-xs font-medium tracking-wide transition sm:h-11 sm:text-sm ${selectedSizes[item.id] === size ? 'border-emerald bg-emerald/5 text-emerald' : 'border-line bg-white text-ink hover:border-ink'}`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mt-7 flex flex-wrap items-end gap-4">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-ink/60">
                          Quantity
                        </p>
                        <div className="mt-3 inline-flex items-center rounded-full border border-line bg-white shadow-sm">
                          <button
                            type="button"
                            className="flex h-10 w-10 items-center justify-center rounded-l-full transition hover:bg-parchment"
                            aria-label={`Decrease ${item.name} quantity`}
                            onClick={() => setQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus size={16} />
                          </button>
                          <span
                            className="min-w-10 text-center text-sm font-medium"
                            aria-label={`${item.quantity} ${item.name}`}
                          >
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            className="flex h-10 w-10 items-center justify-center rounded-r-full transition hover:bg-parchment"
                            aria-label={`Increase ${item.name} quantity`}
                            onClick={() => setQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                      <p className="pb-2 text-lg font-semibold tracking-[-0.02em]">
                        Item total: {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            );
          })
        )}
        {cartItems.length > 0 && (
          <>
            <section className="mx-auto mt-12 max-w-5xl border-t border-ink pt-6 sm:mt-16">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-ink/60">
                    Order total
                  </p>
                  <p className="mt-2 font-display text-3xl font-medium tracking-[-0.025em] sm:text-4xl">
                    {formatPrice(total)}
                  </p>
                </div>
                <button
                  type="button"
                  disabled={cartItems.some((item) => !selectedSizes[item.id])}
                  onClick={() =>
                    onCheckout?.(
                      cartItems.map((item) => ({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.images?.find(Boolean) ?? item.image,
                        quantity: item.quantity,
                        size: selectedSizes[item.id],
                      }))
                    )
                  }
                  className="flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-ink px-8 text-sm font-semibold uppercase tracking-[0.1em] text-paper transition hover:bg-emerald disabled:cursor-not-allowed disabled:bg-ink/40 sm:w-auto"
                >
                  <ShoppingCart size={18} strokeWidth={1.5} />
                  {cartItems.some((item) => !selectedSizes[item.id])
                    ? 'SELECT A SIZE FOR EVERY ITEM'
                    : 'CHECKOUT'}
                </button>
              </div>
            </section>
          </>
        )}
      </main>{' '}
      <FullFooter
        onNavigateAbout={onNavigateAbout}
        onNavigateHelp={onNavigateHelp}
        onOpenServices={() => setIsMenuOpen(true)}
        onOpenRegister={onOpenRegister}
      />{' '}
    </div>
  );
}
