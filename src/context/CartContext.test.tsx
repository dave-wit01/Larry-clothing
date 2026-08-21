import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CartProvider, useCart } from './CartContext';

const firstProduct = {
  id: 'first-product',
  name: 'First product',
  price: 35,
  image: 'https://project.supabase.co/storage/v1/object/public/product-images/first.jpg',
};

const secondProduct = {
  id: 'second-product',
  name: 'Second product',
  price: 43,
  image: 'https://project.supabase.co/storage/v1/object/public/product-images/second.jpg',
};

function CartOrderProbe() {
  const { addItem, items } = useCart();

  return (
    <>
      <button type="button" onClick={() => addItem(firstProduct)}>
        Add first
      </button>
      <button type="button" onClick={() => addItem(secondProduct)}>
        Add second
      </button>
      <output data-testid="cart-order">{items.map((item) => item.id).join(',')}</output>
    </>
  );
}

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe('cart ordering', () => {
  it('places the most recently selected item first', async () => {
    const user = userEvent.setup();

    render(
      <CartProvider onOpenCart={vi.fn()} onBuyNow={vi.fn()}>
        <CartOrderProbe />
      </CartProvider>
    );

    await user.click(screen.getByRole('button', { name: 'Add first' }));
    await user.click(screen.getByRole('button', { name: 'Add second' }));
    expect(screen.getByTestId('cart-order')).toHaveTextContent('second-product,first-product');

    await user.click(screen.getByRole('button', { name: 'Add first' }));
    expect(screen.getByTestId('cart-order')).toHaveTextContent('first-product,second-product');
  });
});
