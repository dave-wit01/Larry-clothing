import { useEffect, useRef, useState, type ComponentPropsWithoutRef } from 'react'
import homepageVideo from '../assets/homepage-video.mp4'
import homepagePoster from '../assets/Homepage1.jpg'

type FeatureItem = {
  id: string
  label: string
  imageUrl: string
}

type FallWinterSectionProps = {
  eyebrow?: string
  heading?: string
  videoSrc?: string
  poster?: string
  features?: FeatureItem[]
  videoOnly?: boolean
} & Omit<ComponentPropsWithoutRef<'section'>, 'children'>

import mensuitImage from '../assets/mensuit0.1.jpg'

const defaultFeatures: FeatureItem[] = [
  {
    id: 'fw-1',
    label: "Men's Suit",
    imageUrl: mensuitImage,
  },
  {
    id: 'fw-2',
    label: "Men's Suit",
    imageUrl: 'https://picsum.photos/id/1074/700/1000',
  },
]

export function FallWinterSection({
  eyebrow = 'Men',
  heading = 'Fall-Winter 2026',
  videoSrc = homepageVideo,
  poster = homepagePoster,
  features = defaultFeatures,
  videoOnly = false,
  ...sectionProps
}: FallWinterSectionProps) {
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)

  useEffect(() => {
    const container = videoContainerRef.current
    if (!container) return

    // Older browsers and the test DOM do not provide this API; in that case
    // preserve the previous autoplay behaviour instead of leaving a blank video.
    if (!('IntersectionObserver' in window)) {
      setShouldLoadVideo(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideo(true)
          observer.disconnect()
        }
      },
      { rootMargin: '500px 0px' },
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      className="w-full bg-paper text-ink"
      style={{ fontFamily: "'Inter', sans-serif" }}
      {...sectionProps}
    >
      <div className="pb-14 sm:pb-20">
        <div ref={videoContainerRef} className="relative h-[46vh] min-h-[320px] w-full overflow-hidden sm:h-[60vh] lg:h-[78vh]">
          <video
            className="h-full w-full object-cover"
            src={shouldLoadVideo ? videoSrc : undefined}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            aria-label={`${eyebrow} ${heading} runway film`}
          />
        </div>

        {!videoOnly && (
          <>
            <div className="mx-auto max-w-6xl px-5 pt-10 text-center sm:px-8 sm:pt-14 lg:px-10">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-ink/70">{eyebrow}</p>
              <h2 className="font-display mt-2 text-3xl font-medium text-ink sm:text-4xl lg:text-5xl">
                {heading}
              </h2>
            </div>

            <div className="mx-auto mt-8 grid max-w-6xl grid-cols-[2fr_1fr] gap-3 px-5 sm:mt-12 sm:gap-6 sm:px-8 lg:px-10">
              {features.map((item) => (
                <a key={item.id} href="#top" className="group block">
                  <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-parchment">
                    <img
                      src={item.imageUrl}
                      alt={item.label}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-3 text-center text-sm text-ink sm:text-base">{item.label}</p>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
