import type { ComponentPropsWithoutRef } from 'react'
import suitWearHero from '../assets/Suitwear.jpg'

type CartProduct = {
  name: string
  price: number
  image: string
}

type SuitWearSectionProps = {
  heading?: string
  eyebrow?: string
  productName?: string
  description?: string
  heroImage?: string
  onSelectItem?: (product: CartProduct) => void
} & Omit<ComponentPropsWithoutRef<'section'>, 'children' | 'onSelect'>

export function SuitWearSection({
  heading = 'Suit wear',
  eyebrow = 'Icon',
  productName = 'Le Speedy',
  description = "Marking the return of the lvxtm collection, the 130th annivesary of the monogram origine.Vnm, time trunk,and monogram embleme. Blending creative spirit with timeless elegance, each collection reflects a distinct facet of CosLarry",
  heroImage = suitWearHero,
  onSelectItem,
  ...sectionProps
}: SuitWearSectionProps) {
  return (
    <section className="w-full bg-paper text-ink" {...sectionProps}>
      <div className="mx-auto max-w-6xl px-5 py-8 text-center sm:px-8 sm:py-10 lg:px-10">
        <h1 className="font-display text-2xl font-medium text-ink sm:text-3xl">{heading}</h1>
      </div>

      <button
        type="button"
        onClick={() =>
          onSelectItem?.({
            name: productName,
            price: 250,
            image: heroImage,
          })
        }
        className="group block w-full"
      >
        <img
          src={heroImage}
          alt={heading}
          className="h-[55vh] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 sm:h-[75vh]"
        />
      </button>

      <div className="mx-auto max-w-2xl px-5 py-10 text-center sm:px-8 sm:py-14">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-ink/60">{eyebrow}</p>
        <h2 className="font-display mt-3 text-2xl font-medium text-ink sm:text-3xl">
          {productName}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-ink/80 sm:text-base">{description}</p>
      </div>
    </section>
  )
}