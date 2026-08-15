import { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { MenuDrawer } from '../components/MenuDrawer'
import { ServicesDrawer } from '../components/ServicesDrawer'
import { ProductCatalog } from '../components/ProductCatalog'
import { socksProducts } from '../data/catalogProducts'
import FullFooter from './Footer.jsx'

type SocksPageProps = {
  onOpenLogin?: () => void
  onOpenRegister?: () => void
  onGoHome?: () => void
  onNavigateCasual?: () => void
  onNavigateSuit?: () => void
  onNavigateOffice?: () => void
  onNavigateStreet?: () => void
  onNavigateUnderwear?: () => void
  onNavigateTraditional?: () => void
  onNavigateHelp?: () => void
  onNavigateAbout?: () => void
  onOpenCart?: (product: { name: string; price: number; image: string }) => void
}

export function SocksPage({
  onOpenLogin,
  onOpenRegister,
  onGoHome,
  onNavigateCasual,
  onNavigateSuit,
  onNavigateOffice,
  onNavigateStreet,
  onNavigateUnderwear,
  onNavigateTraditional,
  onNavigateHelp,
  onNavigateAbout,
}: SocksPageProps) {
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
          if (link === 'Underwear' && onNavigateUnderwear) {
            onNavigateUnderwear()
          }
          if (link === 'Traditional Outfit' && onNavigateTraditional) {
            onNavigateTraditional()
          }
          if (link === 'About CosLaary' && onNavigateAbout) {
            onNavigateAbout()
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
      <main>
        <ProductCatalog title="Socks" products={socksProducts} />
      </main>
      <FullFooter onNavigateHelp={onNavigateHelp} onOpenServices={() => setIsMenuOpen(true)} onOpenRegister={onOpenRegister} />
    </div>
  )
}
