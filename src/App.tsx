import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import type { ReactElement, TouchEvent } from 'react';
import { HomePage } from './pages/HomePage';
import { SearchProvider } from './context/SearchContext';
import { NavigationProvider } from './context/NavigationContext';
import { CartProvider } from './context/CartContext';
import type { SearchProduct } from './data/searchData';

// Keep the first visit focused on the homepage. Other screens are fetched only
// when a visitor opens them, so their code and image URLs do not delay first paint.
const LoginPage = lazy(() =>
  import('./pages/LoginPage').then((module) => ({ default: module.LoginPage }))
);
const RegisterPage = lazy(() =>
  import('./pages/RegisterPage').then((module) => ({ default: module.RegisterPage }))
);
const ForgotPasswordPage = lazy(() =>
  import('./pages/ForgotPasswordPage').then((module) => ({ default: module.ForgotPasswordPage }))
);
const ResetPasswordPage = lazy(() =>
  import('./pages/ResetPasswordPage').then((module) => ({ default: module.ResetPasswordPage }))
);
const CasualWearPage = lazy(() =>
  import('./pages/CasualWearPage').then((module) => ({ default: module.CasualWearPage }))
);
const SuitWearPage = lazy(() =>
  import('./pages/SuitWearPage').then((module) => ({ default: module.SuitWearPage }))
);
const OfficeWearPage = lazy(() =>
  import('./pages/OfficeWearPage').then((module) => ({ default: module.OfficeWearPage }))
);
const StreetWearPage = lazy(() =>
  import('./pages/StreetWearPage').then((module) => ({ default: module.StreetWearPage }))
);
const UnderwearPage = lazy(() =>
  import('./pages/UnderwearPage').then((module) => ({ default: module.UnderwearPage }))
);
const SocksPage = lazy(() =>
  import('./pages/SocksPage').then((module) => ({ default: module.SocksPage }))
);
const TraditionalWearPage = lazy(() =>
  import('./pages/TraditionalWearPage').then((module) => ({ default: module.TraditionalWearPage }))
);
const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((module) => ({ default: module.AboutPage }))
);
const CartPage = lazy(() =>
  import('./pages/CartPage').then((module) => ({ default: module.CartPage }))
);
const CheckoutPage = lazy(() =>
  import('./pages/CheckoutPage').then((module) => ({ default: module.CheckoutPage }))
);
const HelpPage = lazy(() => import('./pages/HelpPage'));
const SearchResultsPage = lazy(() =>
  import('./pages/SearchResultsPage').then((module) => ({ default: module.SearchResultsPage }))
);
const ProductDetailPage = lazy(() =>
  import('./pages/ProductDetailPage').then((module) => ({ default: module.ProductDetailPage }))
);

type View =
  | 'home'
  | 'login'
  | 'register'
  | 'forgot-password'
  | 'reset-password'
  | 'casual'
  | 'suit'
  | 'office'
  | 'street'
  | 'jersey'
  | 'traditional'
  | 'underwear'
  | 'socks'
  | 'about'
  | 'help'
  | 'cart'
  | 'checkout'
  | 'search'
  | 'product';

type CartProduct = {
  id: string;
  name: string;
  price: number;
  image: string;
};

type CheckoutItem = CartProduct & { size?: string; quantity: number };

function App() {
  const [view, setCurrentView] = useState<View>(() =>
    new URLSearchParams(window.location.search).has('reset-password') ? 'reset-password' : 'home'
  );
  const viewHistory = useRef<View[]>([]);
  const pageContainerRef = useRef<HTMLDivElement | null>(null);
  const swipeStart = useRef<{ x: number; y: number; isEligible: boolean } | null>(null);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const setView = (nextView: View) => {
    if (view !== nextView) viewHistory.current.push(view);
    setCurrentView(nextView);
  };
  const goBack = () => {
    const previousView = viewHistory.current.pop();
    if (previousView) setCurrentView(previousView);
  };
  const goBackFromSwipe = () => {
    if (viewHistory.current.length > 0) {
      goBack();
      return;
    }
    setCurrentView('home');
  };
  const [checkoutItems, setCheckoutItems] = useState<CheckoutItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<SearchProduct | null>(null);

  const openCart = () => setView('cart');

  const openSearchResults = (query: string) => {
    setSearchQuery(query);
    setView('search');
  };

  const openProduct = (product: SearchProduct) => {
    setSelectedProduct(product);
    setView('product');
  };

  useEffect(() => {
    const container = pageContainerRef.current;
    if (!container || !('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8%', threshold: 0.08 }
    );

    const observeSections = () => {
      container
        .querySelectorAll<HTMLElement>('main > *, main section, footer')
        .forEach((element) => {
          if (!element.classList.contains('reveal-on-scroll')) {
            element.classList.add('reveal-on-scroll');
            observer.observe(element);
          }
        });
    };

    observeSections();
    const mutationObserver = new MutationObserver(observeSections);
    mutationObserver.observe(container, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, [view]);

  const isSwipeIgnored = (target: EventTarget | null) => {
    if (!(target instanceof Element)) return false;
    return Boolean(
      target.closest(
        'button, a, input, textarea, select, [role="dialog"], [data-swipe-back-ignore]'
      )
    );
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    if (!touch) return;

    swipeStart.current = {
      x: touch.clientX,
      y: touch.clientY,
      isEligible: view !== 'home' && touch.clientX <= 28 && !isSwipeIgnored(event.target),
    };
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    const start = swipeStart.current;
    const touch = event.touches[0];
    if (!start?.isEligible || !touch) return;

    const horizontalDistance = touch.clientX - start.x;
    const verticalDistance = touch.clientY - start.y;
    if (horizontalDistance <= 0 || Math.abs(verticalDistance) > Math.abs(horizontalDistance)) {
      swipeStart.current = null;
      setSwipeOffset(0);
      setIsSwiping(false);
      return;
    }

    setIsSwiping(true);
    setSwipeOffset(Math.min(horizontalDistance * 0.55, 120));
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = swipeStart.current;
    const touch = event.changedTouches[0];
    const horizontalDistance = touch ? touch.clientX - (start?.x ?? touch.clientX) : 0;
    const verticalDistance = touch ? touch.clientY - (start?.y ?? touch.clientY) : 0;
    const shouldGoBack = Boolean(
      start?.isEligible &&
      horizontalDistance >= 72 &&
      horizontalDistance > Math.abs(verticalDistance) * 1.25
    );

    swipeStart.current = null;
    setIsSwiping(false);
    setSwipeOffset(0);
    if (shouldGoBack) goBackFromSwipe();
  };

  let content: ReactElement;

  if (view === 'login') {
    content = (
      <LoginPage
        onGoHome={() => setView('home')}
        onClose={() => setView('home')}
        onOpenRegister={() => setView('register')}
        onForgotPassword={() => setView('forgot-password')}
      />
    );
  } else if (view === 'register') {
    content = (
      <RegisterPage
        onGoHome={() => setView('home')}
        onClose={() => setView('home')}
        onOpenLogin={() => setView('login')}
      />
    );
  } else if (view === 'forgot-password') {
    content = (
      <ForgotPasswordPage onGoHome={() => setView('home')} onClose={() => setView('login')} />
    );
  } else if (view === 'reset-password') {
    content = <ResetPasswordPage onGoHome={() => setView('home')} />;
  } else if (view === 'casual') {
    content = (
      <CasualWearPage
        onOpenLogin={() => setView('login')}
        onOpenRegister={() => setView('register')}
        onGoHome={() => setView('home')}
        onNavigateSuit={() => setView('suit')}
        onNavigateOffice={() => setView('office')}
        onNavigateStreet={() => setView('street')}
        onNavigateTraditional={() => setView('traditional')}
        onNavigateUnderwear={() => setView('underwear')}
        onNavigateSocks={() => setView('socks')}
        onNavigateAbout={() => setView('about')}
        onNavigateHelp={() => setView('help')}
      />
    );
  } else if (view === 'suit') {
    content = (
      <SuitWearPage
        onOpenLogin={() => setView('login')}
        onOpenRegister={() => setView('register')}
        onGoHome={() => setView('home')}
        onNavigateCasual={() => setView('casual')}
        onNavigateOffice={() => setView('office')}
        onNavigateStreet={() => setView('street')}
        onNavigateTraditional={() => setView('traditional')}
        onNavigateUnderwear={() => setView('underwear')}
        onNavigateSocks={() => setView('socks')}
        onNavigateAbout={() => setView('about')}
        onNavigateHelp={() => setView('help')}
      />
    );
  } else if (view === 'office') {
    content = (
      <OfficeWearPage
        onOpenLogin={() => setView('login')}
        onOpenRegister={() => setView('register')}
        onGoHome={() => setView('home')}
        onNavigateCasual={() => setView('casual')}
        onNavigateSuit={() => setView('suit')}
        onNavigateStreet={() => setView('street')}
        onNavigateTraditional={() => setView('traditional')}
        onNavigateUnderwear={() => setView('underwear')}
        onNavigateSocks={() => setView('socks')}
        onNavigateAbout={() => setView('about')}
        onNavigateHelp={() => setView('help')}
      />
    );
  } else if (view === 'street') {
    content = (
      <StreetWearPage
        onOpenLogin={() => setView('login')}
        onOpenRegister={() => setView('register')}
        onGoHome={() => setView('home')}
        onNavigateCasual={() => setView('casual')}
        onNavigateSuit={() => setView('suit')}
        onNavigateOffice={() => setView('office')}
        onNavigateTraditional={() => setView('traditional')}
        onNavigateUnderwear={() => setView('underwear')}
        onNavigateSocks={() => setView('socks')}
        onNavigateAbout={() => setView('about')}
        onNavigateHelp={() => setView('help')}
      />
    );
  } else if (view === 'jersey') {
    content = (
      <StreetWearPage
        collectionName="Jersey"
        onOpenLogin={() => setView('login')}
        onOpenRegister={() => setView('register')}
        onGoHome={() => setView('home')}
        onNavigateCasual={() => setView('casual')}
        onNavigateSuit={() => setView('suit')}
        onNavigateOffice={() => setView('office')}
        onNavigateTraditional={() => setView('traditional')}
        onNavigateUnderwear={() => setView('underwear')}
        onNavigateSocks={() => setView('socks')}
        onNavigateAbout={() => setView('about')}
        onNavigateHelp={() => setView('help')}
      />
    );
  } else if (view === 'traditional') {
    content = (
      <TraditionalWearPage
        onOpenLogin={() => setView('login')}
        onOpenRegister={() => setView('register')}
        onGoHome={() => setView('home')}
        onNavigateCasual={() => setView('casual')}
        onNavigateSuit={() => setView('suit')}
        onNavigateOffice={() => setView('office')}
        onNavigateStreet={() => setView('street')}
        onNavigateUnderwear={() => setView('underwear')}
        onNavigateSocks={() => setView('socks')}
        onNavigateAbout={() => setView('about')}
        onNavigateHelp={() => setView('help')}
      />
    );
  } else if (view === 'underwear') {
    content = (
      <UnderwearPage
        onOpenLogin={() => setView('login')}
        onOpenRegister={() => setView('register')}
        onGoHome={() => setView('home')}
        onNavigateCasual={() => setView('casual')}
        onNavigateSuit={() => setView('suit')}
        onNavigateOffice={() => setView('office')}
        onNavigateStreet={() => setView('street')}
        onNavigateTraditional={() => setView('traditional')}
        onNavigateSocks={() => setView('socks')}
        onNavigateAbout={() => setView('about')}
        onNavigateHelp={() => setView('help')}
        onCheckout={openCart}
      />
    );
  } else if (view === 'socks') {
    content = (
      <SocksPage
        onOpenLogin={() => setView('login')}
        onOpenRegister={() => setView('register')}
        onGoHome={() => setView('home')}
        onNavigateCasual={() => setView('casual')}
        onNavigateSuit={() => setView('suit')}
        onNavigateOffice={() => setView('office')}
        onNavigateStreet={() => setView('street')}
        onNavigateUnderwear={() => setView('underwear')}
        onNavigateTraditional={() => setView('traditional')}
        onNavigateAbout={() => setView('about')}
        onNavigateHelp={() => setView('help')}
      />
    );
  } else if (view === 'about') {
    content = (
      <AboutPage
        onOpenLogin={() => setView('login')}
        onOpenRegister={() => setView('register')}
        onGoHome={() => setView('home')}
        onNavigateCasual={() => setView('casual')}
        onNavigateSuit={() => setView('suit')}
        onNavigateOffice={() => setView('office')}
        onNavigateStreet={() => setView('street')}
        onNavigateTraditional={() => setView('traditional')}
        onNavigateUnderwear={() => setView('underwear')}
        onNavigateSocks={() => setView('socks')}
        onNavigateHelp={() => setView('help')}
      />
    );
  } else if (view === 'help') {
    content = (
      <HelpPage
        onOpenLogin={() => setView('login')}
        onOpenRegister={() => setView('register')}
        onGoHome={() => setView('home')}
        onNavigateCasual={() => setView('casual')}
        onNavigateSuit={() => setView('suit')}
        onNavigateOffice={() => setView('office')}
        onNavigateStreet={() => setView('street')}
        onNavigateTraditional={() => setView('traditional')}
        onNavigateUnderwear={() => setView('underwear')}
        onNavigateSocks={() => setView('socks')}
        onNavigateAbout={() => setView('about')}
        onNavigateHelp={() => setView('help')}
      />
    );
  } else if (view === 'search') {
    content = (
      <SearchResultsPage
        query={searchQuery}
        onSubmitSearch={openSearchResults}
        onOpenProduct={openProduct}
        onGoHome={() => setView('home')}
        onNavigateCasual={() => setView('casual')}
        onNavigateSuit={() => setView('suit')}
        onNavigateOffice={() => setView('office')}
        onNavigateStreet={() => setView('street')}
        onNavigateTraditional={() => setView('traditional')}
        onNavigateUnderwear={() => setView('underwear')}
        onNavigateSocks={() => setView('socks')}
        onNavigateAbout={() => setView('about')}
        onNavigateHelp={() => setView('help')}
        onOpenRegister={() => setView('register')}
      />
    );
  } else if (view === 'product' && selectedProduct) {
    content = (
      <ProductDetailPage
        product={selectedProduct}
        onGoHome={() => setView('home')}
        onNavigateCasual={() => setView('casual')}
        onNavigateSuit={() => setView('suit')}
        onNavigateOffice={() => setView('office')}
        onNavigateStreet={() => setView('street')}
        onNavigateTraditional={() => setView('traditional')}
        onNavigateUnderwear={() => setView('underwear')}
        onNavigateSocks={() => setView('socks')}
        onNavigateAbout={() => setView('about')}
        onNavigateHelp={() => setView('help')}
        onOpenRegister={() => setView('register')}
      />
    );
  } else if (view === 'cart') {
    content = (
      <CartPage
        onOpenLogin={() => setView('login')}
        onOpenRegister={() => setView('register')}
        onGoHome={() => setView('home')}
        onNavigateCasual={() => setView('casual')}
        onNavigateSuit={() => setView('suit')}
        onNavigateOffice={() => setView('office')}
        onNavigateStreet={() => setView('street')}
        onNavigateTraditional={() => setView('traditional')}
        onNavigateUnderwear={() => setView('underwear')}
        onNavigateSocks={() => setView('socks')}
        onCheckout={(items) => {
          setCheckoutItems(items);
          setView('checkout');
        }}
      />
    );
  } else if (view === 'checkout') {
    content = <CheckoutPage items={checkoutItems} onGoHome={() => setView('home')} />;
  } else {
    content = (
      <HomePage
        onOpenLogin={() => setView('login')}
        onOpenRegister={() => setView('register')}
        onNavigateCasual={() => setView('casual')}
        onNavigateSuit={() => setView('suit')}
        onNavigateOffice={() => setView('office')}
        onNavigateStreet={() => setView('street')}
        onNavigateJersey={() => setView('jersey')}
        onNavigateTraditional={() => setView('traditional')}
        onNavigateUnderwear={() => setView('underwear')}
        onNavigateSocks={() => setView('socks')}
        onNavigateAbout={() => setView('about')}
        onNavigateHelp={() => setView('help')}
        onGoHome={() => setView('home')}
      />
    );
  }

  return (
    <NavigationProvider navigate={setView} onBack={goBack}>
      <CartProvider onOpenCart={openCart} onBuyNow={openCart}>
        <SearchProvider onSubmitSearch={openSearchResults}>
          <div
            ref={pageContainerRef}
            className={`app-shell${isSwiping ? ' is-swiping' : ''}`}
            style={{ transform: `translateX(${swipeOffset}px)` }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
          >
            <Suspense fallback={<main className="min-h-screen bg-paper" aria-busy="true" />}>
              <div key={view} className="view-transition">
                {content}
              </div>
            </Suspense>
          </div>
        </SearchProvider>
      </CartProvider>
    </NavigationProvider>
  );
}

export default App;
