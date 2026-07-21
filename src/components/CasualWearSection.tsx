import type { ComponentPropsWithoutRef } from 'react'
import monogram1 from '../assets/CasualMonogram1.jpg'
import monogram2 from '../assets/CasualMonogram2.jpg'
import lvMurakami from '../assets/CasualLVMurakami.jpg'
import vvnTimeTrunk from '../assets/CasualVVN&TimeTrunk.jpg'
import heroImage from '../assets/CasualpageFrame.jpg'

type CasualCategoryItem = {
  id: string
  label: string
  imageUrl: string
}

type CasualWearSectionProps = {
  heading?: string
  description?: string
  categories?: CasualCategoryItem[]
} & Omit<ComponentPropsWithoutRef<'section'>, 'children'>

const defaultCategories: CasualCategoryItem[] = [
  { id: 'casual-1', label: 'Monogram', imageUrl: monogram1 },
  { id: 'casual-2', label: 'Monogram', imageUrl: monogram2 },
  { id: 'casual-3', label: 'LV Murakami', imageUrl: lvMurakami },
  { id: 'casual-4', label: 'VVN &Time Trunk', imageUrl: vvnTimeTrunk },
]

export function CasualWearSection({
  heading = 'Casual wear',
  description = "Marking the return of the lvxtm collection, the 130th annivesary of the monogram origine.Vnm, time trunk,and monogram embleme. Blending creative spirit with timeless elegance, each collection reflects a distinct facet of CosLarry",
  categories = defaultCategories,
  ...sectionProps
}: CasualWearSectionProps) {
  return (
    <section className="w-full bg-paper text-ink" {...sectionProps}>
      <div className="mx-auto max-w-6xl px-5 py-10 text-center sm:px-8 sm:py-14 lg:px-10">
        <h1 className="font-display text-2xl font-medium text-ink sm:text-3xl">{heading}</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-ink/80 sm:text-base">{description}</p>
      </div>

      <div className="mx-auto flex max-w-6xl justify-center gap-6 px-5 sm:gap-10 sm:px-8 lg:px-10">
        {categories.map((item) => (
          <a key={item.id} href="#top" className="group block text-center">
            <div className="h-16 w-16 overflow-hidden rounded-full bg-parchment sm:h-24 sm:w-24">
              <img
                src={item.imageUrl}
                alt={item.label}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <p className="mt-2 text-xs text-ink sm:text-sm">{item.label}</p>
          </a>
        ))}
      </div>

      <div className="mt-10 w-full">
        <img src={heroImage} alt="Casual wear" className="h-[60vh] w-full object-cover sm:h-[80vh]" />
      </div>
    </section>
  )
}