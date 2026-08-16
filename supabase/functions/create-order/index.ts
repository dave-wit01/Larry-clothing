import { createClient } from 'npm:@supabase/supabase-js@2'

type RequestedItem = { id: string; quantity: number; size: number }
type Customer = { name: string; phone: string; address: string; notes?: string }
type Product = { id: string; name: string; price: number | string; sizes: number[]; is_active: boolean }

const json = (body: unknown, status = 200, origin = '') => new Response(JSON.stringify(body), {
  status,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Vary': 'Origin',
  },
})

const isNonEmptyString = (value: unknown, maxLength: number) => typeof value === 'string' && value.trim().length > 0 && value.trim().length <= maxLength

async function hash(value: string) {
  const bytes = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

Deno.serve(async (request) => {
  const allowedOrigins = (Deno.env.get('ALLOWED_ORIGIN') ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)
  const origin = request.headers.get('origin') ?? ''
  const responseOrigin = allowedOrigins.includes(origin) ? origin : ''

  if (request.method === 'OPTIONS') return new Response(null, { headers: { 'Access-Control-Allow-Origin': responseOrigin, 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Vary': 'Origin' } })
  if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405, responseOrigin)
  if (allowedOrigins.length === 0 || !responseOrigin) return json({ error: 'Origin not allowed.' }, 403, responseOrigin)

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  const rateLimitSalt = Deno.env.get('RATE_LIMIT_SALT')
  if (!supabaseUrl || !serviceRoleKey || !rateLimitSalt) return json({ error: 'Order service is not configured.' }, 503, responseOrigin)

  const forwardedFor = request.headers.get('cf-connecting-ip') ?? request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  if (!forwardedFor) return json({ error: 'Could not identify this request.' }, 400, responseOrigin)

  const admin = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } })
  const { data: withinLimit, error: rateLimitError } = await admin.rpc('consume_order_rate_limit', {
    p_key_hash: await hash(`${rateLimitSalt}:${forwardedFor}`),
  })
  if (rateLimitError) return json({ error: 'Could not process your order. Please try again.' }, 500, responseOrigin)
  if (!withinLimit) return json({ error: 'Too many order attempts. Please wait 15 minutes and try again.' }, 429, responseOrigin)

  let payload: { items?: unknown; customer?: unknown }
  try {
    payload = await request.json()
  } catch {
    return json({ error: 'Invalid order request.' }, 400, responseOrigin)
  }

  const { items, customer } = payload
  if (!Array.isArray(items) || items.length === 0 || items.length > 20) return json({ error: 'Your cart must contain between 1 and 20 items.' }, 400, responseOrigin)
  if (!customer || typeof customer !== 'object') return json({ error: 'Delivery details are required.' }, 400, responseOrigin)

  const requestedItems = items as RequestedItem[]
  const validItems = requestedItems.every((item) => (
    typeof item?.id === 'string'
    && item.id.length <= 100
    && Number.isInteger(item.quantity) && item.quantity >= 1 && item.quantity <= 10
    && Number.isInteger(item.size)
  ))
  if (!validItems || new Set(requestedItems.map((item) => item.id)).size !== requestedItems.length) return json({ error: 'Your cart contains invalid items.' }, 400, responseOrigin)

  const details = customer as Customer
  if (!isNonEmptyString(details.name, 100) || !isNonEmptyString(details.address, 500) || !isNonEmptyString(details.phone, 30) || !/^[0-9+()\s-]{7,30}$/.test(details.phone.trim()) || (details.notes !== undefined && typeof details.notes !== 'string') || (details.notes?.trim().length ?? 0) > 500) {
    return json({ error: 'Please check your delivery details.' }, 400, responseOrigin)
  }

  const productIds = requestedItems.map((item) => item.id)
  const { data: products, error: productsError } = await admin.from('products').select('id, name, price, sizes, is_active').in('id', productIds).eq('is_active', true)
  if (productsError || !products || products.length !== productIds.length) return json({ error: 'One or more products are no longer available.' }, 400, responseOrigin)

  const productsById = new Map((products as Product[]).map((product) => [product.id, product]))
  const orderItems: Array<{ id: string; name: string; price: number; quantity: number; size: number }> = []
  for (const item of requestedItems) {
    const product = productsById.get(item.id)!
    if (!product.sizes.includes(item.size)) return json({ error: 'Please choose an available size for every item.' }, 400, responseOrigin)
    const price = Number(product.price)
    orderItems.push({ id: product.id, name: product.name, price, quantity: item.quantity, size: item.size })
  }

  const total = Math.round(orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0) * 100) / 100
  const orderId = crypto.randomUUID()
  const { error: insertError } = await admin.from('orders').insert({
    id: orderId,
    items: orderItems,
    customer: { name: details.name.trim(), phone: details.phone.trim(), address: details.address.trim(), notes: details.notes?.trim() || undefined },
    total,
    status: 'pending',
  })
  if (insertError) return json({ error: 'Could not save your order. Please try again.' }, 500, responseOrigin)

  return json({ orderId, items: orderItems, total }, 201, responseOrigin)
})
