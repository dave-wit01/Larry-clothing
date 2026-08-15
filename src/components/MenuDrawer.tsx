import { useEffect, useRef, useState } from 'react'
import { Home, Search, User, X } from 'lucide-react'
import { menuLinks } from '../data/navigation'
import { BrandLogo } from './BrandLogo'

type MenuDrawerProps = {
  isOpen: boolean
  isVisible?: boolean
  onClose: () => void
  onNavigate?: (link: string) => void
  onGoHome?: () => void
}

export function MenuDrawer({ isOpen, isVisible = true, onClose, onNavigate, onGoHome }: MenuDrawerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [isMenOpen, setIsMenOpen] = useState(false)

  useEffect(() => {
    if (!isOpen || !isVisible) return undefined

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
  }, [isOpen, isVisible, onClose])

  if (!isOpen || !isVisible) return null

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-paper"
      role="dialog"
      aria-modal="true"
      aria-label="Main navigation"
    >
      <header className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-5 py-4 sm:px-8 lg:px-10">
        <div className="flex items-center gap-1 justify-self-start sm:gap-2">
          <button
            ref={closeButtonRef}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-all duration-150 hover:bg-ink/5 hover:text-emerald active:scale-90 active:bg-ink/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald"
            onClick={onClose}
          >
            <X size={20} strokeWidth={1.5} />
          </button>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-all duration-150 hover:bg-ink/5 hover:text-emerald active:scale-90 active:bg-ink/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald"
            type="button"
            aria-label="Search Larry Clothing"
          >
            <Search size={19} strokeWidth={1.5} />
          </button>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-all duration-150 hover:bg-ink/5 hover:text-emerald active:scale-90 active:bg-ink/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald"
            type="button"
            aria-label="Go to home page"
            onClick={() => {
              if (onGoHome) onGoHome()
              onClose()
            }}
          >
            <Home size={19} strokeWidth={1.5} />
          </button>
        </div>

        <a
          className="flex h-14 w-14 items-center justify-center justify-self-center overflow-hidden rounded-full bg-ink transition-transform duration-150 active:scale-95 sm:h-16 sm:w-16"
          href="#top"
          aria-label="Larry Clothing home"
          onClick={(event) => {
            event.preventDefault()
            onGoHome?.()
            onClose()
          }}
        >
          <BrandLogo className="h-full w-full" />
        </a>

        <button
          className="flex h-10 w-10 items-center justify-center justify-self-end rounded-full text-ink transition-all duration-150 hover:bg-ink/5 hover:text-emerald active:scale-90 active:bg-ink/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald"
          type="button"
          aria-label="Open account"
        >
          <User size={20} strokeWidth={1.5} />
        </button>
      </header>

      <main className="mx-auto flex min-h-[calc(100vh-88px)] max-w-6xl flex-col px-7 pb-6 pt-5 sm:px-8 lg:px-10">
        <div className="w-full max-w-[30rem]">
          <button
            type="button"
            className="inline-flex items-center rounded-full bg-[#d3d3d3] px-5 py-2 text-lg font-medium leading-none text-ink shadow-sm transition hover:bg-[#c3c3c3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald sm:text-xl"
            aria-expanded={isMenOpen}
            aria-controls="men-collection"
            onClick={() => setIsMenOpen((open) => !open)}
          >
            Men <span className="ml-2 text-sm" aria-hidden="true">{isMenOpen ? '−' : '+'}</span>
          </button>

          {isMenOpen && (
            <nav id="men-collection" className="mt-14 sm:mt-16" aria-label="Men collection">
              <ul className="space-y-9 sm:space-y-10">
                {menuLinks.Men.map((link) => (
                  <li key={link}>
                    <button
                      type="button"
                      className="inline-block border-b-2 border-transparent pb-1 text-left text-lg leading-none transition-all duration-150 hover:border-emerald hover:text-emerald active:scale-[0.97] active:text-emerald active:border-emerald focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald sm:text-xl"
                      onClick={() => {
                        onNavigate?.(link)
                        onClose()
                      }}
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}

        </div>
        <a
          className="mt-auto self-center border-b border-ink/70 text-sm text-ink/70 transition-all duration-150 hover:border-ink hover:text-ink active:scale-95 active:text-emerald active:border-emerald focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald"
          href="#contact"
          onClick={onClose}
        >
          Can we help you ?
        </a>
      </main>
    </div>
  )
}
