import { useMemo } from 'react'
import {
  DEFAULT_TRADITIONAL_WEAR_BOTTOM_IMAGE,
  DEFAULT_TRADITIONAL_WEAR_ITEMS,
  DEFAULT_TRADITIONAL_WEAR_PARAGRAPH,
  type TraditionalWearMediaItem,
} from '../data/traditionalWear'

type TraditionalWearSectionProps = {
  heading?: string
  items?: TraditionalWearMediaItem[]
  paragraph?: string
  bottomImage?: string
  bottomImageAlt?: string
}

export function TraditionalWearSection({
  heading = 'Traditional wear',
  items = DEFAULT_TRADITIONAL_WEAR_ITEMS,
  paragraph = DEFAULT_TRADITIONAL_WEAR_PARAGRAPH,
  bottomImage = DEFAULT_TRADITIONAL_WEAR_BOTTOM_IMAGE,
  bottomImageAlt = 'Group wearing traditional-inspired streetwear on a highway overpass',
}: TraditionalWearSectionProps) {
  const mediaItems = useMemo(() => items.slice(0, 2), [items])

  return (
    <section className="w-full bg-paper text-ink" aria-labelledby="traditional-wear-heading">
      <div className="mx-auto max-w-6xl px-5 pb-14 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:px-10">
        <h2
          id="traditional-wear-heading"
          className="font-display text-center text-3xl font-medium text-ink sm:text-4xl lg:text-5xl"
        >
          {heading}
        </h2>

        <div className="mx-auto mt-10 grid max-w-md grid-cols-2 gap-6 sm:mt-14 sm:max-w-xl sm:gap-10 lg:max-w-2xl">
          {mediaItems.map((item) => (
            <div key={item.id} className="flex flex-col items-center gap-4">
              <div className="aspect-square w-full overflow-hidden rounded-[50%] border border-line bg-parchment shadow-sm">
                {item.type === 'video' ? (
                  <video
                    className="h-full w-full object-cover"
                    src={item.src}
                    poster={item.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-label={item.label}
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={item.label}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <p className="text-sm font-medium uppercase tracking-[0.12em] text-ink sm:text-base">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-xl text-center text-sm leading-relaxed text-ink/80 sm:mt-10 sm:text-base">
          {paragraph}
        </p>
      </div>

      <div className="h-[42vh] min-h-[280px] w-full overflow-hidden sm:h-[56vh] lg:h-[70vh]">
        <img
          src={bottomImage}
          alt={bottomImageAlt}
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  )
}
