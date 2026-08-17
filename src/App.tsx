import { lazy, Suspense, useRef, useState } from 'react';
import type { ReactElement } from 'react';
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
  const setView = (nextView: View) => {
    if (view !== nextView) viewHistory.current.push(view);
    setCurrentView(nextView);
  };
  const goBack = () => {
    const previousView = viewHistory.current.pop();
    if (previousView) setCurrentView(previousView);
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
          <Suspense fallback={<main className="min-h-screen bg-paper" aria-busy="true" />}>
            {content}
          </Suspense>
        </SearchProvider>
      </CartProvider>
    </NavigationProvider>
  );
}

export default App;
