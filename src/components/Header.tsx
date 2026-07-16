import { useEffect, useState } from 'react'
import { Menu, Search, User } from 'lucide-react'
import { AccountMenu } from './AccountMenu'
import { BrandLogo } from './BrandLogo'

type HeaderProps = {
  isScrolled: boolean
  onMenuOpen: () => void
  onOpenLogin?: () => void
  onOpenRegister?: () => void
}

export function Header({ isScrolled, onMenuOpen, onOpenLogin, onOpenRegister }: HeaderProps) {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)

  useEffect(() => {
    if (!isAccountMenuOpen) return undefined

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsAccountMenuOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isAccountMenuOpen])

  return (
    <header
      className={`sticky top-0 z-40 bg-paper/90 backdrop-blur transition-shadow duration-300 ${
        isScrolled ? 'shadow-[0_1px_0_0_#E4DFD1]' : ''
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <button
          className="icon-button"
          type="button"
          aria-label="Open menu"
          onClick={onMenuOpen}
        >
          <Menu size={18} strokeWidth={1.5} />
        </button>

        <a
          className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-ink sm:h-16 sm:w-16"
          href="#top"
          aria-label="Larry Clothing home"
        >
          <BrandLogo className="h-full w-full" />
        </a>

        <button
          className="icon-button border-transparent hover:border-transparent"
          type="button"
          aria-label="Open account"
          aria-expanded={isAccountMenuOpen}
          aria-controls="account-menu"
          onClick={() => setIsAccountMenuOpen((isOpen) => !isOpen)}
        >
          <User size={20} strokeWidth={1.5} />
        </button>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-5 sm:px-8 lg:px-10">
        <label className="group flex items-center gap-3 rounded-full border border-ink/80 px-5 py-3 transition-colors focus-within:border-emerald sm:max-w-md">
          <span className="sr-only">Search Larry Clothing</span>
          <input
            className="w-full bg-transparent text-sm tracking-wide placeholder:text-ink/60 focus:outline-none"
            type="search"
            placeholder="Search here"
          />
          <Search
            className="shrink-0"
            size={18}
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </label>
      </div>

      {isAccountMenuOpen && (
        <button
          className="fixed inset-0 z-40 cursor-default bg-transparent"
          type="button"
          aria-label="Close account menu"
          onClick={() => setIsAccountMenuOpen(false)}
        />
      )}
      <AccountMenu
        isOpen={isAccountMenuOpen}
        onClose={() => setIsAccountMenuOpen(false)}
        onOpenLogin={onOpenLogin}
        onOpenRegister={onOpenRegister}
      />
    </header>
  )
}
