import { useRef, useState } from 'react'
import type { ReactElement } from 'react'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { ForgotPasswordPage } from './pages/ForgotPasswordPage'
import { ResetPasswordPage } from './pages/ResetPasswordPage'
import { CasualWearPage } from './pages/CasualWearPage'
import { SuitWearPage } from './pages/SuitWearPage'
import { OfficeWearPage } from './pages/OfficeWearPage'
import { StreetWearPage } from './pages/StreetWearPage'
import { UnderwearPage } from './pages/UnderwearPage'
import { SocksPage } from './pages/SocksPage'
import { TraditionalWearPage } from './pages/TraditionalWearPage'
import { AboutPage } from './pages/AboutPage'
import { CartPage } from './pages/CartPage'
import { CheckoutPage } from './pages/CheckoutPage'
import HelpPage from './pages/HelpPage'
import { SearchResultsPage } from './pages/SearchResultsPage'
import { SearchProvider } from './context/SearchContext'
import { NavigationProvider } from './context/NavigationContext'
import { CartProvider } from './context/CartContext'

type View = 'home' | 'login' | 'register' | 'forgot-password' | 'reset-password' | 'casual' | 'suit' | 'office' | 'street' | 'traditional' | 'underwear' | 'socks' | 'about' | 'help' | 'cart' | 'checkout' | 'search'

type CartProduct = {
  id: string
  name: string
  price: number
  image: string
}

type CheckoutItem = CartProduct & { size?: number; quantity: number }

function App() {
  const [view, setCurrentView] = useState<View>(() => new URLSearchParams(window.location.search).has('reset-password') ? 'reset-password' : 'home')
  const viewHistory = useRef<View[]>([])
  const setView = (nextView: View) => {
    if (view !== nextView) viewHistory.current.push(view)
    setCurrentView(nextView)
  }
  const goBack = () => {
    const previousView = viewHistory.current.pop()
    if (previousView) setCurrentView(previousView)
  }
  const [checkoutItems, setCheckoutItems] = useState<CheckoutItem[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  const openCart = () => setView('cart')

  const openSearchResults = (query: string) => {
    setSearchQuery(query)
    setView('search')
  }

  let content: ReactElement

  if (view === 'login') {
    content = <LoginPage onGoHome={() => setView('home')} onClose={() => setView('home')} onOpenRegister={() => setView('register')} onForgotPassword={() => setView('forgot-password')} />
  } else if (view === 'register') {
    content = <RegisterPage onGoHome={() => setView('home')} onClose={() => setView('home')} onOpenLogin={() => setView('login')} />
  } else if (view === 'forgot-password') {
    content = <ForgotPasswordPage onGoHome={() => setView('home')} onClose={() => setView('login')} />
  } else if (view === 'reset-password') {
    content = <ResetPasswordPage onGoHome={() => setView('home')} />
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
    )
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
    )
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
    )
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
    )
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
    )
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
    )
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
    )
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
    )
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
    )
  } else if (view === 'search') {
    content = (
      <SearchResultsPage
        query={searchQuery}
        onSubmitSearch={openSearchResults}
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
    )
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
          setCheckoutItems(items)
          setView('checkout')
        }}
      />
    )
  } else if (view === 'checkout') {
    content = <CheckoutPage items={checkoutItems} onGoHome={() => setView('home')} />
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
    )
  }

  return (
    <NavigationProvider navigate={setView} onBack={goBack}>
      <CartProvider onOpenCart={openCart} onBuyNow={openCart}>
        <SearchProvider onSubmitSearch={openSearchResults}>{content}</SearchProvider>
      </CartProvider>
    </NavigationProvider>
  )
}

export default App
