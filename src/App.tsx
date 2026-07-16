import { useState } from 'react'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'

function App() {
  const [view, setView] = useState<'home' | 'login' | 'register'>('home')

  if (view === 'login') {
    return <LoginPage onGoHome={() => setView('home')} onClose={() => setView('home')} />
  }

  if (view === 'register') {
    return <RegisterPage onGoHome={() => setView('home')} onClose={() => setView('home')} />
  }

  return <HomePage onOpenLogin={() => setView('login')} onOpenRegister={() => setView('register')} />
}

export default App
