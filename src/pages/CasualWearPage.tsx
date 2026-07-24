import { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { MenuDrawer } from '../components/MenuDrawer'
import { CasualWearSection } from '../components/CasualWearSection'
import FullFooter from './Footer.jsx'

type CartProduct = {
  name: string
  price: number
  image: string
}

type CasualWearPageProps = {
  onOpenLogin?: () => void
  onOpenRegister?: () => void
  onGoHome?: () => void
  onNavigateSuit?: () => void
  onNavigateOffice?: () => void
  onNavigateStreet?: () => void
  onNavigateTraditional?: () => void
  onNavigateUnderwear?: () => void
  onNavigateSocks?: () => void
  onNavigateAbout?: () => void
  onOpenCart?: (product: CartProduct) => void
}

export function CasualWearPage({
  onOpenLogin,
  onOpenRegister,
  onGoHome,
  onNavigateSuit,
  onNavigateOffice,
  onNavigateStreet,
  onNavigateTraditional,
  onNavigateUnderwear,
  onNavigateSocks,
  onNavigateAbout,
  onOpenCart,
}: CasualWearPageProps) {
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
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onGoHome={onGoHome}
        onNavigate={(link) => {
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
          if (link === 'About CosLaary' && onNavigateAbout) {
            onNavigateAbout()
          }
        }}
      />
      <main>
        <CasualWearSection onSelectItem={onOpenCart} />
      </main>
      <FullFooter onNavigateAbout={onNavigateAbout} />
    </div>
  )
}