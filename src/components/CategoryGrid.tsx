import type { ComponentPropsWithoutRef } from 'react'
import menSuitImage from '../assets/men suit 2.jpg'

type CategoryItem = {
  id: string
  label: string
  imageUrl: string
}

type CategoryGridProps = {
  items?: CategoryItem[]
  heading?: string
  subheading?: string
} & Omit<ComponentPropsWithoutRef<'section'>, 'children'>

const defaultItems: CategoryItem[] = [
  {
    id: 'cat-1',
    label: "Men's Suit",
    imageUrl: menSuitImage,
  },
  {
    id: 'cat-2',
    label: "Women's Suit",
    imageUrl: 'https://picsum.photos/id/1027/800/1000',
  },
  {
    id: 'cat-3',
    label: "Men's Suit",
    imageUrl: 'https://picsum.photos/id/1074/800/1000',
  },
  {
    id: 'cat-4',
    label: "Women's Suit",
    imageUrl: 'https://picsum.photos/id/1011/800/1000',
  },
  {
    id: 'cat-5',
    label: "Men's Suit",
    imageUrl: 'https://picsum.photos/id/1080/800/1000',
  },
  {
    id: 'cat-6',
    label: "Women's Suit",
    imageUrl: 'https://picsum.photos/id/1062/800/1000',
  },
]

export function CategoryGrid({
  items = defaultItems,
  heading = 'Featured Categories',
  subheading = 'Curated tailoring and elevated staples for every moment.',
  ...sectionProps
}: CategoryGridProps) {
  return (
    <section
      id="categories"
      className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10"
      {...sectionProps}
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-emerald">
          Shop by style
        </p>
        <h2 className="mt-3 font-display text-2xl font-medium leading-snug text-ink sm:text-3xl lg:text-4xl">
          {heading}
        </h2>
        <p className="mt-3 text-sm text-ink/70 sm:text-base">{subheading}</p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-8">
        {items.map((item) => (
          <a key={item.id} href="#top" className="group block">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-sm bg-parchment">
              <img
                src={item.imageUrl}
                alt={item.label}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <p className="mt-3 text-center text-sm text-ink sm:text-base">{item.label}</p>
          </a>
        ))}
      </div>
    </section>
  )
}
