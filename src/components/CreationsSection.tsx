import { creations } from '../data/creations'

export function CreationsSection() {
  return (
    <section
      id="creations"
      className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10"
    >
      <h2 className="mx-auto max-w-2xl text-center font-display text-2xl font-medium leading-snug sm:text-3xl lg:text-4xl">
        Explore a selection of Larry Clothing&rsquo;s Creations
      </h2>
      <div className="mt-9 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-6 lg:gap-8">
        {creations.map((creation) => (
          <a
            key={creation.id}
            className="group relative block overflow-hidden rounded-sm bg-parchment"
            href="#top"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                src={creation.imageUrl}
                alt={creation.title}
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-4 sm:px-5 sm:py-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/80 sm:text-xs">
                {creation.label}
              </p>
              <p className="font-display text-base text-white sm:text-lg">
                {creation.title}
              </p>
            </div>
          </a>
        ))}
      </div>
      <div className="mt-10 flex justify-center sm:mt-14">
        <a
          className="rounded-full border border-ink px-8 py-3 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-ink hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald"
          href="#top"
        >
          View All Creations
        </a>
      </div>
    </section>
  )
}
