import { useState } from 'react'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { CasualWearPage } from './pages/CasualWearPage'
import { SuitWearPage } from './pages/SuitWearPage'
import { OfficeWearPage } from './pages/OfficeWearPage'
import { StreetWearPage } from './pages/StreetWearPage'

type View = 'home' | 'login' | 'register' | 'casual' | 'suit' | 'office' | 'street'

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
      onGoHome={() => setView('home')}
    />
  )
}

export default App