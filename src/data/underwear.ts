import underwearFeature from '../assets/underwear1.jpg'
import underwearCardA from '../assets/underwear2.jpg'
import underwearCardB from '../assets/underwear3.jpg'
import underwearCardC from '../assets/underwear4.jpg'

export type UnderwearItem = {
  id: string
  img: string
  alt: string
  name: string
  price: number
  tone: string
}

export const UNDERWEAR_FEATURE_IMAGE = underwearFeature

export const DEFAULT_UNDERWEAR_PARAGRAPH =
  'Marking the return of the lvxtm collection, the 130th anniversary of the monogram origin. Vnm, time trunk, and monogram embleme. Blending creative spirit with timeless elegance, each collection reflects a distinct facet of CosLarry.'

export const DEFAULT_UNDERWEAR_ROW: UnderwearItem[] = [
  {
    id: 'uw-1',
    img: underwearCardA,
    alt: 'Group in cream tailoring',
    name: 'Essential Cotton Brief',
    price: 29.99,
    tone: 'bg-[#ffd1d1]',
  },
  {
    id: 'uw-2',
    img: underwearCardB,
    alt: 'Minimal studio portrait with clean tailoring',
    name: 'Signature Comfort Boxer',
    price: 34.99,
    tone: 'bg-[#dbe8ff]',
  },
  {
    id: 'uw-3',
    img: underwearCardC,
    alt: 'Two models posing in elevated underwear looks',
    name: 'Everyday Ribbed Trunk',
    price: 27.99,
    tone: 'bg-[#f1d4ef]',
  },
  {
    id: 'uw-4',
    img: underwearFeature,
    alt: 'Models wearing neutral underwear styles',
    name: 'Classic Stretch Boxer Brief',
    price: 39.99,
    tone: 'bg-[#d4ebe0]',
  },
  {
    id: 'uw-5',
    img: underwearCardB,
    alt: 'Minimal studio portrait with clean tailoring',
    name: 'Soft Modal Brief',
    price: 31.99,
    tone: 'bg-[#ffe2c0]',
  },
  {
    id: 'uw-6',
    img: underwearCardA,
    alt: 'Group in cream tailoring',
    name: 'Premium Everyday Trunk',
    price: 36.99,
    tone: 'bg-[#d7dcf7]',
  },
]
