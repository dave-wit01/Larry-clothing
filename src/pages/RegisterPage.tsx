import { Eye, EyeOff, Home, Mail, User, X } from 'lucide-react'
import { useState } from 'react'
import logogImage from '../assets/logog.jpg'
import { supabase } from '../lib/supabase'

type RegisterPageProps = { onGoHome?: () => void; onClose?: () => void; onOpenLogin?: () => void }

export function RegisterPage({ onGoHome, onClose, onOpenLogin }: RegisterPageProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!supabase) return setError('Registration is not configured yet.')
    if (password.length < 8) return setError('Use a password with at least 8 characters.')
    if (password !== confirmPassword) return setError('Passwords do not match.')

    setError('')
    setMessage('')
    setIsSubmitting(true)
    const { data, error: signUpError } = await supabase.auth.signUp({ email: email.trim(), password, options: { data: { full_name: name.trim() }, emailRedirectTo: window.location.origin } })
    setIsSubmitting(false)
    if (signUpError) return setError(signUpError.message)
    if (data.session) return onGoHome?.()
    setMessage('Check your email to confirm your account, then sign in.')
  }

  return <div className="min-h-screen bg-paper text-ink"><div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-4 sm:px-8 lg:px-10"><div className="flex items-center justify-between"><button type="button" aria-label="Go to homepage" onClick={onGoHome} className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-paper"><Home size={18} /></button><button type="button" aria-label="Close" onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full text-ink"><X size={22} /></button></div><div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-2 py-8 sm:max-w-md sm:px-0"><div className="flex justify-center"><span className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-ink"><img src={logogImage} alt="Larry Clothing logo" className="h-full w-full object-cover" /></span></div><form className="mt-10 flex flex-col gap-4" onSubmit={handleSubmit}><label className="flex items-center gap-3 rounded-full bg-line px-5 py-4"><User size={19} /><input type="text" autoComplete="name" required value={name} onChange={(event) => setName(event.target.value)} placeholder="Full name" className="w-full bg-transparent text-base focus:outline-none" /></label><label className="flex items-center gap-3 rounded-full bg-line px-5 py-4"><Mail size={19} /><input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" className="w-full bg-transparent text-base focus:outline-none" /></label><label className="flex items-center gap-3 rounded-full bg-line px-5 py-4"><button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((value) => !value)}>{showPassword ? <Eye size={19} /> : <EyeOff size={19} />}</button><input type={showPassword ? 'text' : 'password'} autoComplete="new-password" required minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="New password" className="w-full bg-transparent text-base focus:outline-none" /></label><label className="flex items-center gap-3 rounded-full bg-line px-5 py-4"><button type="button" aria-label={showConfirm ? 'Hide password' : 'Show password'} onClick={() => setShowConfirm((value) => !value)}>{showConfirm ? <Eye size={19} /> : <EyeOff size={19} />}</button><input type={showConfirm ? 'text' : 'password'} autoComplete="new-password" required minLength={8} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirm password" className="w-full bg-transparent text-base focus:outline-none" /></label>{error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">{error}</p>}{message && <p className="rounded-xl bg-emerald/10 px-4 py-3 text-sm text-ink" role="status">{message}</p>}<button type="submit" disabled={isSubmitting} className="mt-4 w-full rounded-full bg-ink py-4 text-base font-medium text-paper disabled:opacity-50">{isSubmitting ? 'Creating account…' : 'Register now'}</button><button type="button" onClick={onOpenLogin} className="w-fit text-xs text-ink underline underline-offset-2 hover:text-emerald">I already have an account</button></form></div></div></div>
}
