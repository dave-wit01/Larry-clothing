import { useState } from 'react'
import { supabase } from '../lib/supabase'

export function ResetPasswordPage({ onGoHome }: { onGoHome?: () => void }) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!supabase) return setError('Password reset is not configured yet.')
    if (password.length < 8) return setError('Use a password with at least 8 characters.')
    if (password !== confirmPassword) return setError('Passwords do not match.')
    setError(''); setIsSubmitting(true)
    const { error: updateError } = await supabase.auth.updateUser({ password })
    setIsSubmitting(false)
    if (updateError) return setError('This reset link is invalid or has expired. Request a new one.')
    window.history.replaceState({}, '', window.location.pathname)
    setMessage('Your password has been updated. You can now continue shopping.')
  }
  return <main className="min-h-screen bg-paper px-5 py-20 text-ink"><form className="mx-auto max-w-md space-y-5" onSubmit={handleSubmit}><h1 className="font-display text-4xl">Choose a new password</h1><input type="password" autoComplete="new-password" required minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="New password" className="w-full rounded-full bg-line px-5 py-4 focus:outline-none" /><input type="password" autoComplete="new-password" required minLength={8} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirm new password" className="w-full rounded-full bg-line px-5 py-4 focus:outline-none" />{error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">{error}</p>}{message && <p className="rounded-xl bg-emerald/10 px-4 py-3 text-sm" role="status">{message}</p>}<button type="submit" disabled={isSubmitting} className="w-full rounded-full bg-ink py-4 font-medium text-paper disabled:opacity-50">{isSubmitting ? 'Updating…' : 'Update password'}</button>{message && <button type="button" onClick={onGoHome} className="w-full text-sm underline">Continue shopping</button>}</form></main>
}
