import { Heart, ShoppingCart } from 'lucide-react'
import { DEFAULT_UNDERWEAR_ROW, type UnderwearItem } from '../data/underwear'
import { useState } from 'react'
import { useCart } from '../context/CartContext'

type CartProduct = {
  id: string
  name: string
  price: number
  image: string
}

type UnderwearSectionProps = {
  heading?: string
  row?: UnderwearItem[]
  onBuyNow?: (product: CartProduct) => void
}

export function UnderwearSection({
  heading = 'Underwear',
  row = DEFAULT_UNDERWEAR_ROW,
  onBuyNow,
}: UnderwearSectionProps) {
  const [favourites, setFavourites] = useState<string[]>([])
  const { addItem, hasItem, toggleItem } = useCart()

  const toggleFavourite = (id: string) => {
    setFavourites((current) =>
      current.includes(id) ? current.filter((favourite) => favourite !== id) : [...current, id]
    )
  }

  return (
    <section className="w-full bg-paper text-ink" aria-labelledby="underwear-heading">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
        <h2
          id="underwear-heading"
          className="font-display text-center text-3xl font-medium text-ink sm:text-4xl lg:text-5xl"
        >
          {heading}
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-ink/70 sm:text-base">
          Everyday essentials designed for comfort, confidence, and a perfect fit.
        </p>

        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-4 sm:mt-10 sm:gap-6 lg:grid-cols-3">
          {row.map((item) => {
            const cartProduct = { id: item.id, name: item.name, price: item.price, image: item.img }
            const isInCart = hasItem(cartProduct)
            return (
            <article
              key={item.id}
              className="relative overflow-hidden rounded-2xl bg-parchment p-3 shadow-sm transition-transform hover:-translate-y-1 hover:bg-[#ebe6d9] sm:p-4"
            >
              <button
                type="button"
                className="absolute left-3 top-3 z-10 rounded-full p-1.5 text-ink transition hover:bg-white/50"
                aria-label={`Add ${item.name} to favourites`}
                aria-pressed={favourites.includes(item.id)}
                onClick={() => toggleFavourite(item.id)}
              >
                <Heart size={19} fill={favourites.includes(item.id) ? 'currentColor' : 'none'} />
              </button>
              <button
                type="button"
                className="block w-full overflow-hidden rounded-xl"
                onClick={() => toggleItem(cartProduct)}
                aria-label={`Add ${item.name} to cart`}
              >
                <img src={item.img} alt={item.alt} className="aspect-square w-full object-cover" />
              </button>
              <h3 className="mt-3 min-h-10 text-sm font-semibold leading-tight text-ink sm:text-base">{item.name}</h3>
              <div className="mt-2 flex items-center justify-between gap-2">
                <p className="text-lg font-semibold text-ink">${item.price.toFixed(2)}</p>
              </div>
              <div className="mt-3 grid grid-cols-[auto_1fr] gap-2">
                <button type="button" className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink transition hover:bg-ink hover:text-paper ${isInCart ? 'bg-ink text-paper' : ''}`} onClick={() => toggleItem(cartProduct)} aria-label={`${isInCart ? 'Remove' : 'Add'} ${item.name} ${isInCart ? 'from' : 'to'} cart`} aria-pressed={isInCart}>
                  <ShoppingCart size={16} />
                </button>
                <button type="button" className="rounded-full bg-ink py-2 text-xs font-semibold text-paper transition hover:bg-emerald" onClick={() => {
                  addItem(cartProduct)
                  onBuyNow?.(cartProduct)
                }}>
                  Buy now
                </button>
              </div>
            </article>
          )})}
        </div>
      </div>
    </section>
  )
}
