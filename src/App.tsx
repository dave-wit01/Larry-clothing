import { useState } from 'react'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { CasualWearPage } from './pages/CasualWearPage'
import { SuitWearPage } from './pages/SuitWearPage'
import { OfficeWearPage } from './pages/OfficeWearPage'
import { StreetWearPage } from './pages/StreetWearPage'
import { UnderwearPage } from './pages/UnderwearPage'
import { SocksPage } from './pages/SocksPage'
import { TraditionalWearPage } from './pages/TraditionalWearPage'
import { AboutPage } from './pages/AboutPage'
import { CartPage } from './pages/CartPage'
import HelpPage from './pages/HelpPage'
import { SearchResultsPage } from './pages/SearchResultsPage'
import { SearchProvider } from './context/SearchContext'

type View = 'home' | 'login' | 'register' | 'casual' | 'suit' | 'office' | 'street' | 'traditional' | 'underwear' | 'socks' | 'about' | 'help' | 'cart' | 'search'

type CartProduct = {
  name: string
  price: number
  image: string
}

function App() {
  const [view, setView] = useState<View>('home')
  const [cartProduct, setCartProduct] = useState<CartProduct | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const openCart = (product: CartProduct) => {
    setCartProduct(product)
    setView('cart')
  }

  const openSearchResults = (query: string) => {
    setSearchQuery(query)
    setView('search')
  }

  let content: JSX.Element

  if (view === 'login') {
    content = <LoginPage onGoHome={() => setView('home')} onClose={() => setView('home')} />
  } else if (view === 'register') {
    content = <RegisterPage onGoHome={() => setView('home')} onClose={() => setView('home')} />
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
        onOpenCart={openCart}
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
        onOpenCart={openCart}
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
        onNavigateHelp={() => setView('help')}
        onOpenCart={openCart}
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
        onNavigateHelp={() => setView('help')}
        onOpenCart={openCart}
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
        onNavigateHelp={() => setView('help')}
        onOpenCart={openCart}
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
        onNavigateHelp={() => setView('help')}
        onOpenCart={openCart}
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
        onNavigateHelp={() => setView('help')}
        onOpenCart={openCart}
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
        productName={cartProduct?.name}
        productPrice={cartProduct?.price}
        productImage={cartProduct?.image}
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
      />
    )
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

  return <SearchProvider onSubmitSearch={openSearchResults}>{content}</SearchProvider>
}

export default App