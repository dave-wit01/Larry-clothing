import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'

type SearchContextValue = {
  submitSearch: (query: string) => void
}

const SearchContext = createContext<SearchContextValue | null>(null)

type SearchProviderProps = {
  children: ReactNode
  onSubmitSearch: (query: string) => void
}

export function SearchProvider({ children, onSubmitSearch }: SearchProviderProps) {
  return (
    <SearchContext.Provider value={{ submitSearch: onSubmitSearch }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  return useContext(SearchContext)
}
