import { DEFAULT_SOCKS_PARAGRAPH, SOCKS_FEATURE_IMAGE } from '../data/socks'

type SocksSectionProps = {
  heading?: string
  subheading?: string
  paragraph?: string
  featureImage?: string
  featureAlt?: string
}

export function SocksSection({
  heading = 'Socks',
  subheading = 'Le Speedy',
  paragraph = DEFAULT_SOCKS_PARAGRAPH,
  featureImage = SOCKS_FEATURE_IMAGE,
  featureAlt = 'Group of friends styled in colourful streetwear with a BMX and skateboard',
}: SocksSectionProps) {
  return (
    <section className="w-full bg-paper text-ink" aria-labelledby="socks-heading">
      <div className="mx-auto max-w-6xl px-5 pb-10 pt-12 text-center sm:px-8 sm:pb-14 sm:pt-16 lg:px-10">
        <h2
          id="socks-heading"
          className="font-display text-3xl font-medium text-ink sm:text-4xl lg:text-5xl"
        >
          {heading}
        </h2>
        <h3 className="font-display mt-6 text-2xl font-medium text-ink sm:mt-8 sm:text-3xl">
          {subheading}
        </h3>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink/80 sm:mt-5 sm:text-base">
          {paragraph}
        </p>
      </div>

      <div className="h-[55vh] min-h-[380px] w-full overflow-hidden sm:h-[70vh] lg:h-[85vh]">
        <img src={featureImage} alt={featureAlt} className="h-full w-full object-cover" />
      </div>
    </section>
  )
}
