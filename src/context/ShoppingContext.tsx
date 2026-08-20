import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

type ShoppingContextValue = {
  categoryContext: string | null;
  setCategoryContext: (category: string) => void;
};

const categoryLabels: Record<string, string> = {
  'Casual wear': 'Casual Wear',
  'Suit wear': 'Suit Wear',
  'Office wear': 'Office Wear',
  Streetwear: 'Street Wear',
  'Street wear': 'Street Wear',
  'Traditional outfit': 'Traditional Wear',
  'Traditional Outfit': 'Traditional Wear',
  Underwear: 'Underwear',
  Socks: 'Socks',
  Jersey: 'Jersey',
};

const ShoppingContext = createContext<ShoppingContextValue | null>(null);

export function ShoppingContextProvider({ children }: { children: ReactNode }) {
  const [categoryContext, setCategory] = useState<string | null>(null);
  const value = useMemo(
    () => ({
      categoryContext,
      setCategoryContext: (category: string) => setCategory(categoryLabels[category] ?? category),
    }),
    [categoryContext]
  );

  return <ShoppingContext.Provider value={value}>{children}</ShoppingContext.Provider>;
}

export function useShoppingContext() {
  const context = useContext(ShoppingContext);
  if (!context) throw new Error('useShoppingContext must be used within ShoppingContextProvider');
  return context;
}
