import { useEffect, useState } from 'react'
import { CategoryGrid } from '../components/CategoryGrid'
import { CreationsSection } from '../components/CreationsSection'
import { FallWinterSection } from '../components/FallWinterSection'
import { Footer as FooterComponent } from '../components/Footer'
import SuitsGrid from '../components/men/SuitsGrid'
import LeatherGoodsGrid from '../components/women/LeatherGoodsGrid'
import FullFooter from './Footer'
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

        {/* FRONTEND1 sections included to make homepage a fullsite */}
        <SuitsGrid />
        <LeatherGoodsGrid />
      </main>

      {/* Use the fullsite Footer from the pages folder (FRONTEND1) */}
      <FullFooter />
    </div>
  )
}
