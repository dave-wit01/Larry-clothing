import { Home, Mail, X } from 'lucide-react'
import { useState } from 'react'
import { supabase } from '../lib/supabase'

export function ForgotPasswordPage({ onGoHome, onClose }: { onGoHome?: () => void; onClose?: () => void }) {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!supabase) return setError('Password reset is not configured yet.')
    setError(''); setMessage(''); setIsSubmitting(true)
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}?reset-password=true` })
    setIsSubmitting(false)
    if (resetError) return setError(resetError.message)
    setMessage('If an account exists for this email, we sent password-reset instructions.')
  }
  return <main className="min-h-screen bg-paper px-5 py-4 text-ink"><div className="mx-auto flex max-w-md items-center justify-between"><button type="button" onClick={onGoHome} aria-label="Go to homepage" className="rounded-full bg-ink p-3 text-paper"><Home size={18} /></button><button type="button" onClick={onClose} aria-label="Close"><X size={22} /></button></div><form className="mx-auto mt-28 max-w-md space-y-5" onSubmit={handleSubmit}><h1 className="font-display text-4xl">Reset password</h1><p className="text-sm text-ink/70">Enter your email and we will send a secure reset link.</p><label className="flex items-center gap-3 rounded-full bg-line px-5 py-4"><Mail size={19} /><input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" className="w-full bg-transparent focus:outline-none" /></label>{error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">{error}</p>}{message && <p className="rounded-xl bg-emerald/10 px-4 py-3 text-sm" role="status">{message}</p>}<button type="submit" disabled={isSubmitting} className="w-full rounded-full bg-ink py-4 font-medium text-paper disabled:opacity-50">{isSubmitting ? 'Sending…' : 'Send reset link'}</button></form></main>
}
