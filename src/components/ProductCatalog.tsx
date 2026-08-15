import { Heart, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../context/CartContext'

export type CatalogProduct = { id: string; name: string; price: number; image: string }

export function ProductCatalog({ title, products }: { title: string; products: CatalogProduct[] }) {
  const [favourites, setFavourites] = useState<string[]>([])
  const { buyNow, hasItem, toggleItem } = useCart()
  return <section className="bg-paper py-12 text-ink"><div className="mx-auto max-w-4xl px-5 sm:px-8"><h1 className="font-display text-center text-3xl font-medium sm:text-4xl">{title}</h1><p className="mx-auto mt-3 max-w-xl text-center text-sm text-ink/70">Explore the latest CosLarry collection.</p><div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">{products.map((product) => {
    const isInCart = hasItem(product)
    return <article key={product.id} className="relative rounded-2xl bg-parchment p-3 shadow-sm sm:p-4"><button type="button" className="absolute left-3 top-3 z-10 rounded-full p-1.5" aria-label={`Favourite ${product.name}`} onClick={() => setFavourites((current) => current.includes(product.id) ? current.filter((id) => id !== product.id) : [...current, product.id])}><Heart size={19} fill={favourites.includes(product.id) ? 'currentColor' : 'none'} /></button><img src={product.image} alt={product.name} className="aspect-square w-full rounded-xl object-cover" /><h2 className="mt-3 min-h-10 text-sm font-semibold leading-tight">{product.name}</h2><p className="mt-2 text-lg font-semibold">${product.price.toFixed(2)}</p><div className="mt-3 grid grid-cols-[auto_1fr] gap-2"><button type="button" className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink transition hover:bg-ink hover:text-paper ${isInCart ? 'bg-ink text-paper' : ''}`} onClick={() => toggleItem(product)} aria-label={`${isInCart ? 'Remove' : 'Add'} ${product.name} ${isInCart ? 'from' : 'to'} cart`} aria-pressed={isInCart}><ShoppingCart size={16} /></button><button type="button" className="rounded-full bg-ink py-2 text-xs font-semibold text-paper hover:bg-emerald" onClick={() => buyNow(product)}>Buy now</button></div></article>
  })}</div></div></section>
}
