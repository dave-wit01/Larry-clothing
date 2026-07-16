import { useEffect, useState } from 'react'
import { CategoryGrid } from '../components/CategoryGrid'
import { CreationsSection } from '../components/CreationsSection'
import { FallWinterSection } from '../components/FallWinterSection'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { HeroSection } from '../components/HeroSection'
import { MenuDrawer } from '../components/MenuDrawer'

type HomePageProps = {
  onOpenLogin?: () => void
  onOpenRegister?: () => void
}

export function HomePage({ onOpenLogin, onOpenRegister }: HomePageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header
        isScrolled={isScrolled}
        onMenuOpen={() => setIsMenuOpen(true)}
        onOpenLogin={onOpenLogin}
        onOpenRegister={onOpenRegister}
      />
      <MenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <main>
        <HeroSection />
        <CreationsSection />
        <CategoryGrid />
        <FallWinterSection />
      </main>
      <Footer />
    </div>
  )
}
