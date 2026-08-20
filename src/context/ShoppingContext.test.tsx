import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ProductCatalog } from '../components/ProductCatalog';
import { UnderwearSection } from '../components/UnderwearSection';
import { CartPage } from '../pages/CartPage';
import { CartProvider } from './CartContext';
import { ShoppingContextProvider, useShoppingContext } from './ShoppingContext';

function CategoryContextLabel() {
  const { categoryContext } = useShoppingContext();

  return <output data-testid="category-context">{categoryContext}</output>;
}

function SetCategoryContextButton() {
  const { setCategoryContext } = useShoppingContext();

  return (
    <button type="button" onClick={() => setCategoryContext('Suit wear')}>
      Set cart context
    </button>
  );
}

function renderCatalog(title: string) {
  return render(
    <ShoppingContextProvider>
      <CartProvider onOpenCart={vi.fn()} onBuyNow={vi.fn()}>
        <ProductCatalog
          title={title}
          products={[{ id: title, name: `${title} product`, price: 35, image: '/product.jpg' }]}
        />
        <CategoryContextLabel />
      </CartProvider>
    </ShoppingContextProvider>
  );
}

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe('shopping category context', () => {
  it.each([
    ['Casual wear', 'Casual Wear'],
    ['Suit wear', 'Suit Wear'],
    ['Office wear', 'Office Wear'],
    ['Streetwear', 'Street Wear'],
    ['Traditional outfit', 'Traditional Wear'],
    ['Socks', 'Socks'],
    ['Jersey', 'Jersey'],
  ])('keeps %s as the latest cart context', async (title, expectedContext) => {
    const user = userEvent.setup();
    renderCatalog(title);

    await user.click(screen.getByRole('button', { name: 'Buy now' }));

    expect(screen.getByTestId('category-context')).toHaveTextContent(expectedContext);
  });

  it('sets Underwear as the latest cart context', async () => {
    const user = userEvent.setup();
    render(
      <ShoppingContextProvider>
        <CartProvider onOpenCart={vi.fn()} onBuyNow={vi.fn()}>
          <UnderwearSection
            row={[
              {
                id: 'underwear-1',
                name: 'Boxer Briefs',
                price: 35,
                img: '/product.jpg',
                alt: 'Boxer briefs',
                tone: 'bg-parchment',
              },
            ]}
          />
          <CategoryContextLabel />
        </CartProvider>
      </ShoppingContextProvider>
    );

    await user.click(screen.getByRole('button', { name: 'Buy now' }));

    expect(screen.getByTestId('category-context')).toHaveTextContent('Underwear');
  });

  it('shows the latest category in the cart context label', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <ShoppingContextProvider>
          <CartProvider onOpenCart={vi.fn()} onBuyNow={vi.fn()}>
            <SetCategoryContextButton />
            <CartPage />
          </CartProvider>
        </ShoppingContextProvider>
      </BrowserRouter>
    );

    await user.click(screen.getByRole('button', { name: 'Set cart context' }));

    expect(await screen.findByText('From Suit Wear')).toBeInTheDocument();
    expect(screen.queryByText('Shopping bag')).not.toBeInTheDocument();
  });
});
