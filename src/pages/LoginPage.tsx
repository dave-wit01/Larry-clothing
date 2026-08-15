import { Eye, EyeOff, Home, Mail, X } from 'lucide-react'
import { useState } from 'react'
import logogImage from '../assets/logog.jpg'
import { supabase } from '../lib/supabase'

type LoginPageProps = {
  onGoHome?: () => void
  onClose?: () => void
  onOpenRegister?: () => void
  onForgotPassword?: () => void
}

export function LoginPage({ onGoHome, onClose, onOpenRegister, onForgotPassword }: LoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!supabase) return setError('Sign in is not configured yet.')

    setError('')
    setIsSubmitting(true)
    const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
    setIsSubmitting(false)
    if (signInError) return setError(signInError.message)
    onGoHome?.()
  }

  return <div className="min-h-screen bg-paper text-ink"><div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-4 sm:px-8 lg:px-10"><div className="flex items-center justify-between"><button type="button" aria-label="Go to homepage" onClick={onGoHome} className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-paper"><Home size={18} /></button><button type="button" aria-label="Close" onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full text-ink"><X size={22} /></button></div><div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-2 py-8 sm:max-w-md sm:px-0"><div className="flex justify-center"><span className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-ink"><img src={logogImage} alt="Larry Clothing logo" className="h-full w-full object-cover" /></span></div><form className="mt-10 flex flex-col gap-4" onSubmit={handleSubmit}><label className="flex items-center gap-3 rounded-full bg-line px-5 py-4"><Mail size={19} /><input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" className="w-full bg-transparent text-base focus:outline-none" /></label><label className="flex items-center gap-3 rounded-full bg-line px-5 py-4"><button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((value) => !value)}>{showPassword ? <Eye size={19} /> : <EyeOff size={19} />}</button><input type={showPassword ? 'text' : 'password'} autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" className="w-full bg-transparent text-base focus:outline-none" /></label><button type="button" onClick={onForgotPassword} className="-mt-1 w-fit text-xs text-ink underline underline-offset-2 hover:text-emerald">Forgot your password?</button>{error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">{error}</p>}<button type="submit" disabled={isSubmitting} className="mt-4 w-full rounded-full bg-ink py-4 text-base font-medium text-paper disabled:opacity-50">{isSubmitting ? 'Signing in…' : 'Sign in'}</button><button type="button" onClick={onOpenRegister} className="w-fit text-xs text-ink underline underline-offset-2 hover:text-emerald">I don&apos;t have an account</button></form></div></div></div>
}
