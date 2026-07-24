import resortImage from '../assets/homepage2.jpg'
import tailoringImage from '../assets/homepage3.jpg'

export type Creation = {
  id: string
  label: string
  title: string
  imageUrl: string
}

export const creations: Creation[] = [
  {
    id: 'resort',
    label: 'EXAMINE NOW',
    title: 'Minimal + lifestyle',
    imageUrl: resortImage,
  },
  {
    id: 'tailoring',
    label: 'Apres-Midi',
    title: 'Tailored Colour',
    imageUrl: tailoringImage,
  },
]
