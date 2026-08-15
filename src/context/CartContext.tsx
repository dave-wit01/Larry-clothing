import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

const CART_STORAGE_KEY = 'coslarry-cart'

export type CartProduct = { id: string; name: string; price: number; image: string }
export type CartItem = CartProduct & { quantity: number }

type CartContextValue = {
  items: CartItem[]
  addItem: (item: CartProduct) => void
  removeItem: (id: string) => void
  setQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  toggleItem: (item: CartProduct) => void
  hasItem: (item: CartProduct) => boolean
  openCart: () => void
  buyNow: (item: CartProduct) => void
}

const CartContext = createContext<CartContextValue | null>(null)

function getStoredCart(): CartItem[] {
  if (typeof window === 'undefined') return []

  try {
    const storedCart = JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) ?? '[]')
    return Array.isArray(storedCart)
      ? storedCart.filter((item): item is CartItem => (
        typeof item?.id === 'string'
        && typeof item?.name === 'string'
        && typeof item?.price === 'number'
        && typeof item?.image === 'string'
        && Number.isInteger(item?.quantity)
        && item.quantity > 0
      ))
      : []
  } catch {
    return []
  }
}

export function CartProvider({ children, onOpenCart, onBuyNow }: { children: ReactNode; onOpenCart: () => void; onBuyNow: (item: CartProduct) => void }) {
  const [items, setItems] = useState<CartItem[]>(getStoredCart)

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = (item: CartProduct) => {
    setItems((current) => {
      const existingItem = current.find((cartItem) => cartItem.id === item.id)
      return existingItem
        ? current.map((cartItem) => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
        : [...current, { ...item, quantity: 1 }]
    })
  }

  const removeItem = (id: string) => setItems((current) => current.filter((item) => item.id !== id))

  const setQuantity = (id: string, quantity: number) => {
    const nextQuantity = Math.floor(quantity)
    setItems((current) => nextQuantity < 1
      ? current.filter((item) => item.id !== id)
      : current.map((item) => item.id === id ? { ...item, quantity: nextQuantity } : item))
  }

  const clearCart = () => {
    window.localStorage.removeItem(CART_STORAGE_KEY)
    setItems([])
  }
  const hasItem = (item: CartProduct) => items.some((cartItem) => cartItem.id === item.id)

  const toggleItem = (item: CartProduct) => hasItem(item) ? removeItem(item.id) : addItem(item)

  const buyNow = (item: CartProduct) => {
    addItem(item)
    onBuyNow(item)
  }

  return <CartContext.Provider value={{ items, addItem, removeItem, setQuantity, clearCart, toggleItem, hasItem, openCart: onOpenCart, buyNow }}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
