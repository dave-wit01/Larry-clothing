import { BrandLogo } from './BrandLogo'

export function Footer() {
  return (
    <footer className="border-t border-line bg-parchment">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-10 sm:px-8 lg:px-10">
        <BrandLogo className="h-10 w-10" />
        <p className="text-xs uppercase tracking-[0.25em] text-ink/70">
          &copy; {new Date().getFullYear()} Larry Clothing. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
