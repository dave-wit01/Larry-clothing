import {
  DEFAULT_UNDERWEAR_PARAGRAPH,
  DEFAULT_UNDERWEAR_ROW,
  UNDERWEAR_FEATURE_IMAGE,
  type UnderwearItem,
} from '../data/underwear'

type CartProduct = {
  name: string
  price: number
  image: string
}

type UnderwearSectionProps = {
  heading?: string
  featureImage?: string
  featureAlt?: string
  subheading?: string
  paragraph?: string
  row?: UnderwearItem[]
  onSelectItem?: (product: CartProduct) => void
}

export function UnderwearSection({
  heading = 'Underwear',
  featureImage = UNDERWEAR_FEATURE_IMAGE,
  featureAlt = 'Two models in white tailoring in an industrial loft',
  subheading = 'Le Speedy',
  paragraph = DEFAULT_UNDERWEAR_PARAGRAPH,
  row = DEFAULT_UNDERWEAR_ROW,
  onSelectItem,
}: UnderwearSectionProps) {
  const price = 250

  return (
    <section className="w-full bg-paper text-ink" aria-labelledby="underwear-heading">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
        <h2
          id="underwear-heading"
          className="font-display text-center text-3xl font-medium text-ink sm:text-4xl lg:text-5xl"
        >
          {heading}
        </h2>

        <button
          type="button"
          className="group mx-auto mt-8 block w-full max-w-3xl overflow-hidden rounded-[1.5rem] bg-parchment shadow-sm sm:mt-10"
          onClick={() => onSelectItem?.({ name: subheading, price, image: featureImage })}
        >
          <img
            src={featureImage}
            alt={featureAlt}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </button>

        <div className="mx-auto mt-8 max-w-xl text-center sm:mt-10">
          <h3 className="font-display text-2xl font-medium text-ink sm:text-3xl">{subheading}</h3>
          <p className="mx-auto mt-4 text-sm leading-relaxed text-ink/80 sm:text-base">
            {paragraph}
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-3 gap-3 sm:mt-10 sm:gap-5">
          {row.map((item) => (
            <button
              key={item.id}
              type="button"
              className="group block overflow-hidden rounded-[1.25rem] bg-parchment shadow-sm"
              onClick={() => onSelectItem?.({ name: subheading, price, image: item.img })}
            >
              <img
                src={item.img}
                alt={item.alt}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}