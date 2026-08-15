import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { buildWhatsAppOrderLink } from '../lib/whatsapp'
import { useCart } from '../context/CartContext'

type CheckoutItem = { id: string; name: string; price: number; image: string; quantity: number; size?: number }

type CheckoutPageProps = { items?: CheckoutItem[]; onGoHome?: () => void }

export function CheckoutPage({ items = [], onGoHome }: CheckoutPageProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const { clearCart } = useCart()
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '', notes: '' })
  const [checkoutError, setCheckoutError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateCustomer = (field: keyof typeof customer, value: string) => {
    setCustomer((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const businessPhoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER

    if (!businessPhoneNumber || !supabase) {
      setCheckoutError('Checkout is not configured yet. Please contact us for help.')
      return
    }

    setCheckoutError('')
    setIsSubmitting(true)

    try {
      const { data, error } = await supabase.functions.invoke('create-order', {
        body: {
          items: items.map(({ id, quantity, size }) => ({ id, quantity, size })),
          customer,
        },
      })

      if (error) {
        const errorBody = error.context instanceof Response
          ? await error.context.json().catch(() => null)
          : null
        throw new Error(typeof errorBody?.error === 'string' ? errorBody.error : 'Could not save your order.')
      }
      if (!data?.orderId || !Array.isArray(data.items)) throw new Error(data?.error ?? 'Could not save your order.')

      const link = buildWhatsAppOrderLink({ phoneNumber: businessPhoneNumber, items: data.items, customer, orderId: data.orderId })
      clearCart()
      window.location.assign(link)
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : 'We could not save your order. Please try again before opening WhatsApp.')
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-paper px-5 py-10 text-ink sm:px-8">
      <div className="mx-auto max-w-xl">
        <button type="button" className="text-sm underline underline-offset-4" onClick={onGoHome}>Continue shopping</button>
        <h1 className="mt-8 font-display text-4xl font-medium">Checkout</h1>
        <p className="mt-2 text-sm text-ink/70">Enter your delivery details to complete your order through WhatsApp.</p>

        <div className="mt-8 rounded-2xl border border-line bg-parchment p-5" aria-label="Order summary">
          {items.map((item) => (
            <div key={item.id} className="mb-4 flex gap-4 last:mb-0">
              <img src={item.image} alt={item.name} className="h-20 w-16 rounded-lg object-cover" />
              <div><p className="font-medium">{item.name}</p><p className="text-sm text-ink/70">Quantity: {item.quantity} · Size: {item.size ?? 'Not selected'}</p><p className="mt-1 font-semibold">${(item.price * item.quantity).toFixed(2)}</p></div>
            </div>
          ))}
          <div className="my-5 border-t border-line" />
          <div className="flex justify-between font-semibold"><span>Total</span><span>${total.toFixed(2)}</span></div>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <h2 className="font-display text-2xl font-medium">Delivery details</h2>

          <div>
            <label className="mb-2 block text-sm font-medium" htmlFor="customer-name">Full name</label>
            <input id="customer-name" name="name" type="text" autoComplete="name" required value={customer.name} onChange={(event) => updateCustomer('name', event.target.value)} className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald focus:ring-2 focus:ring-emerald/20" placeholder="Your full name" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium" htmlFor="customer-phone">WhatsApp number</label>
            <input id="customer-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" required value={customer.phone} onChange={(event) => updateCustomer('phone', event.target.value)} className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald focus:ring-2 focus:ring-emerald/20" placeholder="e.g. +233 24 123 4567" />
            <p className="mt-2 text-xs text-ink/60">Use a number that can receive WhatsApp messages.</p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium" htmlFor="customer-address">Delivery address</label>
            <textarea id="customer-address" name="address" autoComplete="street-address" required rows={4} value={customer.address} onChange={(event) => updateCustomer('address', event.target.value)} className="w-full resize-y rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald focus:ring-2 focus:ring-emerald/20" placeholder="House number, street, area, city, and any landmark" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium" htmlFor="customer-notes">Order notes <span className="font-normal text-ink/60">(optional)</span></label>
            <textarea id="customer-notes" name="notes" rows={3} value={customer.notes} onChange={(event) => updateCustomer('notes', event.target.value)} className="w-full resize-y rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald focus:ring-2 focus:ring-emerald/20" placeholder="Delivery instructions, colour preference, or other requests" />
          </div>

          {checkoutError && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">{checkoutError}</p>}

          <button type="submit" disabled={items.length === 0 || isSubmitting} className="w-full rounded-full bg-ink py-4 font-medium text-paper transition hover:bg-emerald disabled:cursor-not-allowed disabled:bg-ink/40">{isSubmitting ? 'Saving order…' : 'Order via WhatsApp'}</button>
        </form>
      </div>
    </main>
  )
}
