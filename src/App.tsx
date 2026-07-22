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

type View = 'home' | 'login' | 'register' | 'casual' | 'suit' | 'office' | 'street' | 'traditional' | 'underwear' | 'socks' | 'about' | 'cart'

type CartProduct = {
  name: string
  price: number
  image: string
}

function App() {
  const [view, setView] = useState<View>('home')
  const [cartProduct, setCartProduct] = useState<CartProduct | null>(null)

  const openCart = (product: CartProduct) => {
    setCartProduct(product)
    setView('cart')
  }

  if (view === 'login') {
    return <LoginPage onGoHome={() => setView('home')} onClose={() => setView('home')} />
  }

  if (view === 'register') {
    return <RegisterPage onGoHome={() => setView('home')} onClose={() => setView('home')} />
  }

if (view === 'casual') {
    return (
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
        onOpenCart={openCart}
      />
    )
  }

if (view === 'suit') {
    return (
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
        onOpenCart={openCart}
      />
    )
  }

if (view === 'office') {
    return (
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
        onOpenCart={openCart}
      />
    )
  }

  if (view === 'street') {
    return (
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
  onOpenCart={openCart}
/>
    )
  }

  if (view === 'traditional') {
    return (
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
        onOpenCart={openCart}
      />
    )
  }

 if (view === 'underwear') {
    return (
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
        onOpenCart={openCart}
      />
    )
  }

 if (view === 'socks') {
    return (
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
        onOpenCart={openCart}
      />
    )
  }

  if (view === 'about') {
    return (
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
      />
    )
  }

  if (view === 'cart') {
    return (
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
  }

  return (
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
      onGoHome={() => setView('home')}
    />
  )
}

export default App