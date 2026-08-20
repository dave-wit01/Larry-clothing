import { Heart, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useShoppingContext } from '../context/ShoppingContext';
import { formatPrice } from '../lib/currency';

export type CatalogProduct = { id: string; name: string; price: number; image: string };

export function ProductCatalog({ title, products }: { title: string; products: CatalogProduct[] }) {
  const [favourites, setFavourites] = useState<string[]>([]);
  const { buyNow, hasItem, toggleItem } = useCart();
  const { setCategoryContext } = useShoppingContext();
  return (
    <section className="bg-paper py-14 text-ink sm:py-20">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <h1 className="font-display text-center text-3xl font-medium leading-tight sm:text-4xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-6 text-ink/70">
          Explore the latest CosLaary collection.
        </p>
        <div className="mt-9 grid grid-cols-2 gap-4 sm:mt-10 sm:gap-6 lg:grid-cols-3">
          {products.map((product) => {
            const isInCart = hasItem(product);
            return (
              <article
                key={product.id}
                className="relative rounded-2xl bg-parchment p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-4"
              >
                <button
                  type="button"
                  className="absolute left-3 top-3 z-10 rounded-full p-1.5 transition-colors hover:bg-white/70"
                  aria-label={`Favourite ${product.name}`}
                  onClick={() =>
                    setFavourites((current) =>
                      current.includes(product.id)
                        ? current.filter((id) => id !== product.id)
                        : [...current, product.id]
                    )
                  }
                >
                  <Heart
                    size={19}
                    fill={favourites.includes(product.id) ? 'currentColor' : 'none'}
                  />
                </button>
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                  className="aspect-square w-full rounded-2xl object-cover"
                />
                <h2 className="mt-4 min-h-10 text-sm font-semibold leading-5 tracking-[-0.01em] sm:text-base">
                  {product.name}
                </h2>
                <p className="mt-2 text-lg font-semibold tracking-[-0.02em]">
                  {formatPrice(product.price)}
                </p>
                <div className="mt-4 grid grid-cols-[auto_1fr] gap-2">
                  <button
                    type="button"
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink transition hover:bg-ink hover:text-paper ${isInCart ? 'bg-ink text-paper' : ''}`}
                    onClick={() => {
                      setCategoryContext(title);
                      toggleItem(product);
                    }}
                    aria-label={`${isInCart ? 'Remove' : 'Add'} ${product.name} ${isInCart ? 'from' : 'to'} cart`}
                    aria-pressed={isInCart}
                  >
                    <ShoppingCart size={16} />
                  </button>
                  <button
                    type="button"
                    className="min-h-10 rounded-full bg-ink px-3 text-xs font-semibold uppercase tracking-[0.12em] text-paper hover:bg-emerald"
                    onClick={() => {
                      setCategoryContext(title);
                      buyNow(product);
                    }}
                  >
                    Buy now
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
