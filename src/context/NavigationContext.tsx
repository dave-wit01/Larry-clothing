import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'

export type NavigationTarget =
  | 'home'
  | 'casual'
  | 'suit'
  | 'office'
  | 'street'
  | 'traditional'
  | 'underwear'
  | 'socks'
  | 'about'
  | 'help'

const NavigationContext = createContext<((target: NavigationTarget) => void) | null>(null)
const BackNavigationContext = createContext<(() => void) | null>(null)

export function NavigationProvider({ children, navigate, onBack }: { children: ReactNode; navigate: (target: NavigationTarget) => void; onBack: () => void }) {
  return <NavigationContext.Provider value={navigate}><BackNavigationContext.Provider value={onBack}>{children}</BackNavigationContext.Provider></NavigationContext.Provider>
}

export function useNavigation() {
  return useContext(NavigationContext)
}

export function useBackNavigation() {
  return useContext(BackNavigationContext)
}
