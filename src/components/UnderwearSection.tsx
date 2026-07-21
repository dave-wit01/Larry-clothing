import {
  DEFAULT_UNDERWEAR_PARAGRAPH,
  DEFAULT_UNDERWEAR_ROW,
  UNDERWEAR_FEATURE_IMAGE,
  type UnderwearItem,
} from '../data/underwear'

type UnderwearSectionProps = {
  heading?: string
  featureImage?: string
  featureAlt?: string
  subheading?: string
  paragraph?: string
  row?: UnderwearItem[]
}

export function UnderwearSection({
  heading = 'Underwear',
  featureImage = UNDERWEAR_FEATURE_IMAGE,
  featureAlt = 'Two models in white tailoring in an industrial loft',
  subheading = 'Le Speedy',
  paragraph = DEFAULT_UNDERWEAR_PARAGRAPH,
  row = DEFAULT_UNDERWEAR_ROW,
}: UnderwearSectionProps) {
  return (
    <section className="w-full bg-paper text-ink" aria-labelledby="underwear-heading">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
        <h2
          id="underwear-heading"
          className="font-display text-center text-3xl font-medium text-ink sm:text-4xl lg:text-5xl"
        >
          {heading}
        </h2>

        <div className="mx-auto mt-8 w-full max-w-3xl overflow-hidden rounded-[1.5rem] bg-parchment shadow-sm sm:mt-10">
          <img src={featureImage} alt={featureAlt} className="h-full w-full object-cover" />
        </div>

        <div className="mx-auto mt-8 max-w-xl text-center sm:mt-10">
          <h3 className="font-display text-2xl font-medium text-ink sm:text-3xl">{subheading}</h3>
          <p className="mx-auto mt-4 text-sm leading-relaxed text-ink/80 sm:text-base">
            {paragraph}
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-3 gap-3 sm:mt-10 sm:gap-5">
          {row.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-[1.25rem] bg-parchment shadow-sm">
              <img
                src={item.img}
                alt={item.alt}
                className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
