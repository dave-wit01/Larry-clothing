import { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { MenuDrawer } from '../components/MenuDrawer'
import { ServicesDrawer } from '../components/ServicesDrawer'
import FullFooter from './Footer.jsx'

type AboutPageProps = {
  onOpenLogin?: () => void
  onOpenRegister?: () => void
  onGoHome?: () => void
  onNavigateCasual?: () => void
  onNavigateSuit?: () => void
  onNavigateOffice?: () => void
  onNavigateStreet?: () => void
  onNavigateTraditional?: () => void
  onNavigateUnderwear?: () => void
  onNavigateSocks?: () => void
  onNavigateHelp?: () => void
}

export function AboutPage({
  onOpenLogin,
  onOpenRegister,
  onGoHome,
  onNavigateCasual,
  onNavigateSuit,
  onNavigateOffice,
  onNavigateStreet,
  onNavigateTraditional,
  onNavigateUnderwear,
  onNavigateSocks,
  onNavigateHelp,
}: AboutPageProps) {
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
        onGoHome={onGoHome}
      />
      <MenuDrawer
        isOpen={isMenuOpen}
        isVisible={false}
        onClose={() => setIsMenuOpen(false)}
        onGoHome={onGoHome}
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
      />

      <ServicesDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigateHome={onGoHome}
        onNavigateCasual={onNavigateCasual}
        onOpenMenu={() => setIsMenuOpen(true)}
      />

      <main className="flex flex-col items-center px-6 py-10 text-center">
        <h1 className="text-2xl font-medium tracking-wide mb-10">About COSLAARY</h1>

        <section className="max-w-md mb-10">
          <h2 className="text-sm font-medium tracking-widest mb-4">About Us</h2>
          <p className="text-sm leading-relaxed text-ink/80">
            COSLAARY is a premium men's clothing brand founded in 2024.
            We focus on quiet quality — pieces built with weight, structure, and
            details that matter. No loud branding, no trends for the sake of trends.
            The name and eagle stand for strength, clarity, and intention. Every
            item is made for men who value craftsmanship over hype. Subtle,
            intentional, and made to last.
          </p>
        </section>

        <section className="max-w-md mb-10">
          <h2 className="text-sm font-medium tracking-widest mb-4">MISSION</h2>
          <p className="text-sm leading-relaxed text-ink/80">
            COSLAARY exists to create premium clothing that speaks in details.
            We believe a man's style should be felt before it's seen.
            Our mission is to deliver pieces built with real weight, clean structure,
            and intentional craftsmanship - so every man who wears CosLaary
            feels confident, comfortable, and remembered for quality, not logos.
          </p>
        </section>

        <section className="max-w-md mb-12">
          <h2 className="text-sm font-medium tracking-widest mb-4">EYESIGHT</h2>
          <p className="text-sm leading-relaxed text-ink/80">
            We envision a world where men choose intention over impulse.
            COSLAARY aims to be recognized globally as the brand that proved
            "less is more" - where quality, weight, and detail replace loud branding.
            Our goal is to build a wardrobe of essentials that men wear for years,
            not seasons. Clothing that carries connotation, confidence, and craft.
          </p>
        </section>
      </main>

      <FullFooter onNavigateHelp={onNavigateHelp} onOpenServices={() => setIsMenuOpen(true)} onOpenRegister={onOpenRegister} />
    </div>
  )
}
