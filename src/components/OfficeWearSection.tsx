import type { ComponentPropsWithoutRef } from 'react'
import officeWearTop from '../assets/Officewear1.jpg'
import officeWearBottom from '../assets/Officewear2.jpg'

type CartProduct = {
  name: string
  price: number
  image: string
}

type OfficeWearSectionProps = {
  heading?: string
  productName?: string
  description?: string
  topImage?: string
  bottomImage?: string
  onSelectItem?: (product: CartProduct) => void
} & Omit<ComponentPropsWithoutRef<'section'>, 'children' | 'onSelect'>

export function OfficeWearSection({
  heading = 'Office wear',
  productName = 'Le Speedy',
  description = "Marking the return of the lvxtm collection, the 130th annivesary of the monogram origine.Vnm, time trunk,and monogram embleme. Blending creative spirit with timeless elegance, each collection reflects a distinct facet of CosLarry",
  topImage = officeWearTop,
  bottomImage = officeWearBottom,
  onSelectItem,
  ...sectionProps
}: OfficeWearSectionProps) {
  return (
    <section className="w-full bg-paper text-ink" {...sectionProps}>
      <div className="mx-auto max-w-6xl px-5 py-8 text-center sm:px-8 sm:py-10 lg:px-10">
        <h1 className="font-display text-2xl font-medium text-ink sm:text-3xl">{heading}</h1>
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <button
          type="button"
          onClick={() =>
            onSelectItem?.({
              name: productName,
              price: 250,
              image: topImage,
            })
          }
          className="group block w-full"
        >
          <img
            src={topImage}
            alt={heading}
            className="h-[28vh] w-full rounded-2xl object-cover transition-transform duration-700 ease-out group-hover:scale-105 sm:h-[38vh]"
          />
        </button>
      </div>

      <div className="mx-auto max-w-2xl px-5 py-10 text-center sm:px-8 sm:py-14">
        <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">{productName}</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-ink/80 sm:text-base">{description}</p>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-10 sm:px-8 lg:px-10">
        <button
          type="button"
          onClick={() =>
            onSelectItem?.({
              name: productName,
              price: 250,
              image: bottomImage,
            })
          }
          className="group block w-full"
        >
          <img
            src={bottomImage}
            alt={`${heading} detail`}
            className="h-[55vh] w-full rounded-2xl object-cover transition-transform duration-700 ease-out group-hover:scale-105 sm:h-[75vh]"
          />
        </button>
      </div>
    </section>
  )
}