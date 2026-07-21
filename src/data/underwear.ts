import underwearFeature from '../assets/underwear1.jpg'
import underwearCardA from '../assets/underwear2.jpg'
import underwearCardB from '../assets/underwear3.jpg'
import underwearCardC from '../assets/underwear4.jpg'

export type UnderwearItem = {
  id: string
  img: string
  alt: string
}

export const UNDERWEAR_FEATURE_IMAGE = underwearFeature

export const DEFAULT_UNDERWEAR_PARAGRAPH =
  'Marking the return of the lvxtm collection, the 130th anniversary of the monogram origin. Vnm, time trunk, and monogram embleme. Blending creative spirit with timeless elegance, each collection reflects a distinct facet of CosLarry.'

export const DEFAULT_UNDERWEAR_ROW: UnderwearItem[] = [
  {
    id: 'uw-1',
    img: underwearCardA,
    alt: 'Group in cream tailoring',
  },
  {
    id: 'uw-2',
    img: underwearCardB,
    alt: 'Minimal studio portrait with clean tailoring',
  },
  {
    id: 'uw-3',
    img: underwearCardC,
    alt: 'Two models posing in elevated underwear looks',
  },
]
