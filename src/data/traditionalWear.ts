import traditionalImage1 from '../assets/traditional 1.jpg'
import traditionalImage2 from '../assets/traditional 2.jpg'
import traditionalImage3 from '../assets/traditional 3.jpg'

export type TraditionalWearMediaItem = {
  id: string
  label: string
  type: 'video' | 'image'
  src: string
  poster?: string
}

export const DEFAULT_TRADITIONAL_WEAR_ITEMS: TraditionalWearMediaItem[] = [
  {
    id: 'tw-1',
    label: 'Traditional wear',
    type: 'image',
    src: traditionalImage1,
  },
  {
    id: 'tw-2',
    label: 'Traditional wear',
    type: 'image',
    src: traditionalImage2,
  },
]

export const DEFAULT_TRADITIONAL_WEAR_PARAGRAPH =
  'Marking the return of the lvxtm collection, the 130th anniversary of the monogram origin. Vnm, time trunk, and monogram embleme. Blending creative spirit with timeless elegance, each collection reflects a distinct facet of CosLarry.'

export const DEFAULT_TRADITIONAL_WEAR_BOTTOM_IMAGE = traditionalImage3
