import { Eye, EyeOff, Home, User, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import logogImage from '../assets/logog.jpg'

type LoginPageProps = {
  onGoHome?: () => void
  onClose?: () => void
}

export function LoginPage({ onGoHome, onClose }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onClose) {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-4 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between">
          <button
            type="button"
            aria-label="Go to homepage"
            onClick={onGoHome}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-paper transition-opacity hover:opacity-80"
          >
            <Home size={18} strokeWidth={1.5} />
          </button>

          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:text-emerald focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald"
          >
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>

        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-2 py-8 sm:max-w-md sm:px-0 sm:py-10 lg:max-w-lg">
          <div className="flex justify-center">
            <span className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-ink text-paper sm:h-28 sm:w-28">
              <img src={logogImage} alt="Larry Clothing logo" className="h-full w-full object-cover" />
            </span>
          </div>

          <form className="mt-10 flex flex-col gap-4 sm:mt-14" onSubmit={(event) => event.preventDefault()}>
            <label className="flex items-center gap-3 rounded-full bg-line px-5 py-4 shadow-sm ring-1 ring-transparent focus-within:ring-2 focus-within:ring-emerald">
              <User size={19} strokeWidth={1.5} className="shrink-0 text-ink" />
              <input
                type="text"
                placeholder="Login"
                className="w-full bg-transparent text-base text-ink placeholder:text-ink/70 focus:outline-none"
              />
            </label>

            <label className="flex items-center gap-3 rounded-full bg-line px-5 py-4 shadow-sm ring-1 ring-transparent focus-within:ring-2 focus-within:ring-emerald">
              <button
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword((value) => !value)}
                className="shrink-0 text-ink"
              >
                {showPassword ? <Eye size={19} strokeWidth={1.5} /> : <EyeOff size={19} strokeWidth={1.5} />}
              </button>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="w-full bg-transparent text-base text-ink placeholder:text-ink/70 focus:outline-none"
              />
            </label>

            <a
              href="#"
              className="-mt-1 w-fit text-xs text-ink underline underline-offset-2 transition-colors hover:text-emerald"
            >
              Forgot your password ?
            </a>

            <button
              type="submit"
              className="mt-4 w-full rounded-full bg-ink py-4 text-base font-medium text-paper transition-opacity hover:opacity-90"
            >
              Sign in
            </button>

            <a
              href="#"
              className="w-fit text-xs text-ink underline underline-offset-2 transition-colors hover:text-emerald"
            >
              I don&rsquo;t have an account
            </a>
          </form>

          <div className="mt-10 text-center sm:mt-14">
            <a
              href="#"
              className="text-sm italic text-ink underline underline-offset-4 transition-colors hover:text-emerald"
            >
              Can we help you ?
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
