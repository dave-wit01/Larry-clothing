type AccountMenuProps = {
  isOpen: boolean
  onClose: () => void
  onOpenLogin?: () => void
  onOpenRegister?: () => void
}

export function AccountMenu({ isOpen, onClose, onOpenLogin, onOpenRegister }: AccountMenuProps) {
  if (!isOpen) return null

  return (
    <div
      id="account-menu"
      className="absolute right-5 top-16 z-50 w-48 rounded-lg border border-line bg-paper p-3 shadow-lg sm:right-8 lg:right-10"
      role="menu"
      aria-label="Account options"
    >
      <button
        className="w-full rounded-full border border-ink px-4 py-2.5 text-sm font-medium transition-colors hover:bg-parchment focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald"
        type="button"
        role="menuitem"
        onClick={() => {
          onClose()
          onOpenLogin?.()
        }}
      >
        Log in
      </button>
      <button
        className="mt-2 w-full rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-emerald focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald"
        type="button"
        role="menuitem"
        onClick={() => {
          onClose()
          onOpenRegister?.()
        }}
      >
        Sign Up
      </button>
    </div>
  )
}
