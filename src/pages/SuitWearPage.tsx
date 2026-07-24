import { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { MenuDrawer } from '../components/MenuDrawer'
import { SuitWearSection } from '../components/SuitWearSection'
import FullFooter from './Footer.jsx'

type SuitWearPageProps = {
  onOpenLogin?: () => void
  onOpenRegister?: () => void
  onGoHome?: () => void
  onNavigateCasual?: () => void
  onNavigateOffice?: () => void
  onNavigateStreet?: () => void
  onNavigateTraditional?: () => void
  onNavigateUnderwear?: () => void
  onNavigateSocks?: () => void
  onNavigateAbout?: () => void
  onOpenCart?: (product: { name: string; price: number; image: string }) => void
}

export function SuitWearPage({
  onOpenLogin,
  onOpenRegister,
  onGoHome,
  onNavigateCasual,
  onNavigateOffice,
  onNavigateStreet,
  onNavigateTraditional,
  onNavigateUnderwear,
  onNavigateSocks,
  onNavigateAbout,
  onOpenCart,
}: SuitWearPageProps) {
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
          if (link === 'Casual wear' && onNavigateCasual) {
            onNavigateCasual()
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
        <SuitWearSection onSelectItem={onOpenCart} />
      </main>
      <FullFooter onNavigateAbout={onNavigateAbout} />
    </div>
  )
}