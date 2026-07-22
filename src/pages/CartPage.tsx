import { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { MenuDrawer } from '../components/MenuDrawer'
import { Heart, ShoppingCart } from 'lucide-react'

type CartPageProps = {
  productName?: string
  productPrice?: number
  productImage?: string
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
}

const SIZES = [44, 46, 48, 50, 54, 56, 58, 60]

export function CartPage({
  productName = 'Double-breasted Tailored Jacket',
  productPrice = 250,
  productImage,
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
}: CartPageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [selectedSize, setSelectedSize] = useState(50)

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
          if (link === 'Casual wear' && onNavigateCasual) onNavigateCasual()
          if (link === 'Suit wear' && onNavigateSuit) onNavigateSuit()
          if (link === 'Office wear' && onNavigateOffice) onNavigateOffice()
          if (link === 'Street wear' && onNavigateStreet) onNavigateStreet()
          if (link === 'Traditional Outfit' && onNavigateTraditional) onNavigateTraditional()
          if (link === 'Underwear' && onNavigateUnderwear) onNavigateUnderwear()
          if (link === 'Socks' && onNavigateSocks) onNavigateSocks()
        }}
      />

      <p className="text-center text-lg font-medium py-3">Cart</p>

      {productImage && (
        <div className="w-full aspect-[4/3] overflow-hidden">
          <img src={productImage} alt={productName} className="h-full w-full object-cover" />
        </div>
      )}

      <div className="px-6 py-6">
        <div className="flex items-start justify-between">
          <h1 className="text-lg font-medium max-w-[70%]">{productName}</h1>
          <Heart size={20} strokeWidth={1.5} />
        </div>
        <p className="text-2xl font-bold mt-2">$ {productPrice}</p>

        <p className="text-sm text-ink/70 mt-6">Sizes....</p>
        <div className="border-t border-line mt-2 mb-4" />

        <div className="grid grid-cols-4 gap-3 max-w-sm">
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`h-12 rounded-md text-sm font-medium transition-colors ${
                selectedSize === size
                  ? 'bg-ink text-paper'
                  : 'bg-parchment text-ink hover:bg-line/60'
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        <button className="mt-10 w-full max-w-sm mx-auto flex items-center justify-center gap-2 rounded-full bg-parchment py-4 text-sm font-medium tracking-wide text-ink/70 block">
          <ShoppingCart size={18} strokeWidth={1.5} />
          BUY NOW
        </button>
      </div>
    </div>
  )
}