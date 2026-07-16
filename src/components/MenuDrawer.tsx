import { useEffect, useRef, useState } from 'react'
import { Search, User, X } from 'lucide-react'
import { menuLinks, type MenuCategory } from '../data/navigation'
import { BrandLogo } from './BrandLogo'

type MenuDrawerProps = {
  isOpen: boolean
  onClose: () => void
}

const categories: MenuCategory[] = ['Women', 'Men']

export function MenuDrawer({ isOpen, onClose }: MenuDrawerProps) {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('Women')
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return undefined

    const originalOverflow = document.body.style.overflow
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = originalOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-paper"
      role="dialog"
      aria-modal="true"
      aria-label="Main navigation"
    >
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <div className="flex items-center gap-4 sm:gap-5">
          <button
            ref={closeButtonRef}
            className="icon-button border-transparent hover:border-transparent"
            type="button"
            aria-label="Close menu"
            onClick={onClose}
          >
            <X size={20} strokeWidth={1.5} />
          </button>
          <button
            className="hidden h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:text-emerald focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald sm:flex"
            type="button"
            aria-label="Search Larry Clothing"
          >
            <Search size={19} strokeWidth={1.5} />
          </button>
        </div>

        <a
          className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-ink sm:h-16 sm:w-16"
          href="#top"
          aria-label="Larry Clothing home"
          onClick={onClose}
        >
          <BrandLogo className="h-full w-full" />
        </a>

        <button
          className="icon-button border-transparent hover:border-transparent"
          type="button"
          aria-label="Open account"
        >
          <User size={20} strokeWidth={1.5} />
        </button>
      </header>

      <main className="mx-auto flex min-h-[calc(100vh-88px)] max-w-6xl flex-col px-7 pb-6 pt-5 sm:px-8 lg:px-10">
        <div className="w-full max-w-[30rem]">
          <div
            className="flex flex-col gap-3"
            role="group"
            aria-label="Collection category"
          >
            {categories.map((category) => {
              const isActive = activeCategory === category

              return (
                <button
                  key={category}
                  className={`rounded-full px-4 py-1.5 text-left text-xl leading-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald sm:text-2xl ${
                    isActive
                      ? 'bg-[#d3d3d3] text-ink'
                      : 'bg-[#d3d3d3] text-ink hover:bg-[#c5c5c5]'
                  }`}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              )
            })}
          </div>

          <nav className="mt-16" aria-label={`${activeCategory} collection`}>
            <ul className="space-y-9 sm:space-y-10">
              {menuLinks[activeCategory].map((link) => (
                <li key={link}>
                  <a
                    className="inline-block border-b-2 border-ink pb-1 text-lg leading-none transition-colors hover:border-emerald hover:text-emerald focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald sm:text-xl"
                    href="#creations"
                    onClick={onClose}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <a
          className="mt-auto self-center border-b border-ink/70 text-sm text-ink/70 transition-colors hover:border-ink hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald"
          href="#contact"
          onClick={onClose}
        >
          Can we help you ?
        </a>
      </main>
    </div>
  )
}
