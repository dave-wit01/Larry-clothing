import { useEffect, useState } from 'react'
import { CategoryGrid } from '../components/CategoryGrid'
import { CreationsSection } from '../components/CreationsSection'
import { FallWinterSection } from '../components/FallWinterSection'
// import SuitsGrid from '../components/men/SuitsGrid.jsx'
import FullFooter from './Footer.jsx'
import { Header } from '../components/Header'
import { HeroSection } from '../components/HeroSection'
import { MenuDrawer } from '../components/MenuDrawer'
import { ServicesDrawer } from '../components/ServicesDrawer'
// import { TraditionalWearSection } from '../components/TraditionalWearSection'

type HomePageProps = {
  onOpenLogin?: () => void
  onOpenRegister?: () => void
  onNavigateCasual?: () => void
  onNavigateSuit?: () => void
  onNavigateOffice?: () => void
  onNavigateStreet?: () => void
  onNavigateTraditional?: () => void
  onNavigateUnderwear?: () => void
  onNavigateSocks?: () => void
  onNavigateAbout?: () => void
  onGoHome?: () => void
}

export function HomePage({
  onOpenLogin,
  onOpenRegister,
  onNavigateCasual,
  onNavigateSuit,
  onNavigateOffice,
  onNavigateStreet,
  onNavigateTraditional,
  onNavigateUnderwear,
  onNavigateSocks,
  onNavigateAbout,
  onGoHome,
}: HomePageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)

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
        onMenuOpen={() => setIsServicesOpen(true)}
        onOpenLogin={onOpenLogin}
        onOpenRegister={onOpenRegister}
      />
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={(link) => {
          if (link === 'Casual wear' && onNavigateCasual) {
            onNavigateCasual()
          }
          if (link === 'Suit wear' && onNavigateSuit) {
            onNavigateSuit()
          }
          if (link === 'Office wear' && onNavigateOffice) {
            onNavigateOffice()
          }
          if (link === 'Street wear' && onNavigateStreet) {
            onNavigateStreet()
          }
          if (link === 'Traditional Outfit' && onNavigateTraditional) {
            onNavigateTraditional()
          }
          if (link === 'Underwear' && onNavigateUnderwear) {
            onNavigateUnderwear()
          }
          if (link === 'Socks' && onNavigateSocks) {
            onNavigateSocks()
          }
        }}
        onGoHome={onGoHome}
      />
      <ServicesDrawer
        isOpen={isServicesOpen}
        onClose={() => setIsServicesOpen(false)}
        onNavigateHome={onGoHome}
        onNavigateCasual={onNavigateCasual}
        onNavigateAbout={onNavigateAbout}
      />
      <main>
        <HeroSection />
        <CreationsSection />
        <CategoryGrid />
        <FallWinterSection videoOnly />
        {/* <TraditionalWearSection /> */}

        {/* FRONTEND1 sections included to make homepage a fullsite */}
        {/* <SuitsGrid /> */}
      </main>

      {/* Use the fullsite Footer from the pages folder (FRONTEND1) */}
      <FullFooter onNavigateAbout={onNavigateAbout} onOpenServices={() => setIsMenuOpen(true)} />
    </div>
  )
}