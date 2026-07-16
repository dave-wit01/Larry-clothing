import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import homepageHeroImage from '../assets/Homepage1.jpg'

export function HeroSection() {
  const [isLineVisible, setIsLineVisible] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLineVisible(true), 500)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <section id="top" className="relative">
      <div className="relative h-[62vh] min-h-[420px] overflow-hidden sm:h-[74vh] lg:h-[86vh]">
        <img
          className="h-full w-full object-cover object-top"
          src={homepageHeroImage}
          alt="Two models in tailored high-summer looks on an architectural staircase"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-10 sm:px-10 sm:pb-14 lg:px-16 lg:pb-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/90">
              Women
            </p>
            <h1 className="mt-2 font-display text-4xl font-semibold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
              High Summer
            </h1>
            <a
              className="group mt-5 inline-block text-sm uppercase tracking-[0.15em] text-white/95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
              href="#creations"
            >
              <span className="flex items-center gap-2">
                Discover the Collection{' '}
                <ArrowRight
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  size={14}
                />
              </span>
              <span className="mt-2 block h-px w-40 bg-white/40 sm:w-52">
                <span
                  className={`block h-px bg-white transition-[width] duration-[1400ms] ease-out group-hover:w-full ${isLineVisible ? 'w-full' : 'w-0'}`}
                />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
