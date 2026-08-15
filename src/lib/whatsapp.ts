type WhatsAppOrderItem = {
  name: string
  price: number
  quantity: number
  size?: number
}

type WhatsAppCustomer = {
  name: string
  phone: string
  address: string
  notes?: string
}

export function buildWhatsAppOrderLink({
  phoneNumber,
  items,
  customer,
  orderId,
}: {
  phoneNumber: string
  items: WhatsAppOrderItem[]
  customer: WhatsAppCustomer
  orderId: string
}) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const orderItems = items.map(
    (item) => `- ${item.quantity}x ${item.name}${item.size ? ` (Size ${item.size})` : ''} - $${(item.price * item.quantity).toFixed(2)}`
  )
  const lines = [
    `New order: ${orderId}`,
    `Name: ${customer.name}`,
    `Phone: ${customer.phone}`,
    `Delivery address: ${customer.address}`,
    ...(customer.notes ? [`Notes: ${customer.notes}`] : []),
    '',
    'Items:',
    ...orderItems,
    '',
    `Total: $${total.toFixed(2)}`,
  ]

  return `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(lines.join('\n'))}`
}
