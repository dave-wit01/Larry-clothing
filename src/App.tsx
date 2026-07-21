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

type View = 'home' | 'login' | 'register' | 'casual' | 'suit' | 'office' | 'street' | 'traditional' | 'underwear' | 'socks'

function App() {
  const [view, setView] = useState<View>('home')

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
        onNavigateUnderwear={() => setView('underwear')}
        onNavigateSocks={() => setView('socks')}
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
        onNavigateUnderwear={() => setView('underwear')}
        onNavigateSocks={() => setView('socks')}
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
        onNavigateUnderwear={() => setView('underwear')}
        onNavigateSocks={() => setView('socks')}
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
        onNavigateUnderwear={() => setView('underwear')}
        onNavigateSocks={() => setView('socks')}
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
        onNavigateSocks={() => setView('socks')}
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
      onGoHome={() => setView('home')}
    />
  )
}

export default App