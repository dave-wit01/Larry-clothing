import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

type AccountMenuProps = { isOpen: boolean; onClose: () => void; onOpenLogin?: () => void; onOpenRegister?: () => void }

export function AccountMenu({ isOpen, onClose, onOpenLogin, onOpenRegister }: AccountMenuProps) {
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    if (!supabase) return
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null))
    return () => listener.subscription.unsubscribe()
  }, [])
  if (!isOpen) return null
  const signOut = async () => { await supabase?.auth.signOut(); onClose() }
  return <div id="account-menu" className="absolute right-5 top-16 z-50 w-52 rounded-lg border border-line bg-paper p-3 shadow-lg sm:right-8 lg:right-10" role="menu" aria-label="Account options">{user ? <><p className="mb-3 truncate px-2 text-xs text-ink/70">{user.email}</p><button className="w-full rounded-full border border-ink px-4 py-2.5 text-sm font-medium hover:bg-parchment" type="button" role="menuitem" onClick={signOut}>Log out</button></> : <><button className="w-full rounded-full border border-ink px-4 py-2.5 text-sm font-medium hover:bg-parchment" type="button" role="menuitem" onClick={() => { onClose(); onOpenLogin?.() }}>Log in</button><button className="mt-2 w-full rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-paper hover:bg-emerald" type="button" role="menuitem" onClick={() => { onClose(); onOpenRegister?.() }}>Sign Up</button></>}</div>
}
