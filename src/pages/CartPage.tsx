import { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { MenuDrawer } from '../components/MenuDrawer'
import { ServicesDrawer } from '../components/ServicesDrawer'
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react'
import FullFooter from './Footer.jsx'
import { useCart } from '../context/CartContext'

type CartPageProps = {
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
  onNavigateAbout?: () => void
  onNavigateHelp?: () => void
  onCheckout?: (items: Array<{ id: string; name: string; price: number; image: string; quantity: number; size: number }>) => void
}

const SIZES = [44, 46, 48, 50, 54, 56, 58, 60]

export function CartPage({
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
  onNavigateAbout,
  onNavigateHelp,
  onCheckout,
}: CartPageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [selectedSizes, setSelectedSizes] = useState<Record<string, number>>({})
  const { items, removeItem, setQuantity } = useCart()
  const cartItems = items
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

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
          if (link === 'Casual wear' && onNavigateCasual) onNavigateCasual()
          if (link === 'Suit wear' && onNavigateSuit) onNavigateSuit()
          if (link === 'Office wear' && onNavigateOffice) onNavigateOffice()
          if (link === 'Street wear' && onNavigateStreet) onNavigateStreet()
          if (link === 'Traditional Outfit' && onNavigateTraditional) onNavigateTraditional()
          if (link === 'Underwear' && onNavigateUnderwear) onNavigateUnderwear()
          if (link === 'Socks' && onNavigateSocks) onNavigateSocks()
          if (link === 'About CosLaary' && onNavigateAbout) onNavigateAbout()
        }}
      />

      <ServicesDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigateHome={onGoHome}
        onNavigateCasual={onNavigateCasual}
        onOpenMenu={() => setIsMenuOpen(true)}
      />

      <p className="text-center text-lg font-medium py-3">Cart</p>

      <div className="px-6 py-6">
        {cartItems.length === 0 ? <p className="py-12 text-center text-ink/70">Your cart is empty.</p> : cartItems.map((item) => (
          <section key={item.id} className="mb-8 border-b border-line pb-8">
            <div className="flex gap-4">
              <img src={item.image} alt={item.name} className="h-28 w-24 rounded-lg object-cover" />
              <div className="flex-1"><div className="flex items-start justify-between gap-3"><h1 className="text-lg font-medium">{item.name}</h1><button type="button" className="rounded-full p-2 text-ink transition hover:bg-line/60" aria-label={`Remove ${item.name} from cart`} onClick={() => removeItem(item.id)}><Trash2 size={19} strokeWidth={1.5} /></button></div><p className="mt-2 text-xl font-bold">${(item.price * item.quantity).toFixed(2)}</p><div className="mt-3 inline-flex items-center rounded-full border border-line bg-white"><button type="button" className="flex h-8 w-8 items-center justify-center rounded-l-full hover:bg-parchment" aria-label={`Decrease ${item.name} quantity`} onClick={() => setQuantity(item.id, item.quantity - 1)}><Minus size={15} /></button><span className="min-w-8 text-center text-sm font-medium" aria-label={`${item.quantity} ${item.name}`}>{item.quantity}</span><button type="button" className="flex h-8 w-8 items-center justify-center rounded-r-full hover:bg-parchment" aria-label={`Increase ${item.name} quantity`} onClick={() => setQuantity(item.id, item.quantity + 1)}><Plus size={15} /></button></div></div>
            </div>
            <p className="mt-5 text-sm text-ink/70">Choose size</p>
            <div className="mt-2 grid grid-cols-4 gap-2 max-w-sm">{SIZES.map((size) => <button key={size} type="button" onClick={() => setSelectedSizes((current) => ({ ...current, [item.id]: size }))} className={`h-10 rounded-md text-sm font-medium ${selectedSizes[item.id] === size ? 'bg-ink text-paper' : 'bg-parchment text-ink hover:bg-line/60'}`}>{size}</button>)}</div>
          </section>
        ))}
        {cartItems.length > 0 && <><div className="mb-4 flex max-w-sm justify-between text-lg font-semibold"><span>Total</span><span>${total.toFixed(2)}</span></div><button type="button" disabled={cartItems.some((item) => !selectedSizes[item.id])} onClick={() => onCheckout?.(cartItems.map((item) => ({ id: item.id, name: item.name, price: item.price, image: item.image, quantity: item.quantity, size: selectedSizes[item.id] })))} className="w-full max-w-sm mx-auto flex items-center justify-center gap-2 rounded-full bg-ink py-4 text-sm font-medium tracking-wide text-paper transition hover:bg-emerald disabled:cursor-not-allowed disabled:bg-ink/40 block">
          <ShoppingCart size={18} strokeWidth={1.5} />
          {cartItems.some((item) => !selectedSizes[item.id]) ? 'SELECT A SIZE FOR EVERY ITEM' : 'CHECKOUT'}
        </button></>}
      </div>      <FullFooter onNavigateHelp={onNavigateHelp} onOpenServices={() => setIsMenuOpen(true)} onOpenRegister={onOpenRegister} />    </div>
  )
}
