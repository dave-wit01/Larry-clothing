import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { CartProvider } from '../context/CartContext';
import { NavigationProvider } from '../context/NavigationContext';
import { SearchProvider } from '../context/SearchContext';
import { formatPrice } from '../lib/currency';
import { SearchResultsPage } from './SearchResultsPage';

function renderSearchResults() {
  const onOpenProduct = vi.fn();

  const result = render(
    <BrowserRouter>
      <NavigationProvider navigate={vi.fn()} onBack={vi.fn()}>
        <CartProvider onOpenCart={vi.fn()} onBuyNow={vi.fn()}>
          <SearchProvider onSubmitSearch={vi.fn()}>
            <SearchResultsPage query="" onSubmitSearch={vi.fn()} onOpenProduct={onOpenProduct} />
          </SearchProvider>
        </CartProvider>
      </NavigationProvider>
    </BrowserRouter>
  );

  return { ...result, onOpenProduct };
}

describe('SearchResultsPage', () => {
  it('filters products, clears filters, sorts results, and toggles the filter panel', async () => {
    const user = userEvent.setup();
    renderSearchResults();

    await user.click(screen.getByRole('button', { name: 'Casual wear' }));

    expect(screen.getByRole('button', { name: 'Monogram T-Shirt' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Show all Casual wear' }));

    expect(screen.getAllByText('Monogram T-Shirt')).toHaveLength(2);
    expect(screen.queryByText('Signature Jersey')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Clear all' }));

    expect(screen.getByText('Signature Jersey')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Price: low-high' }));

    const expectedPrices = [
      formatPrice(35),
      formatPrice(35),
      formatPrice(43),
      formatPrice(43),
      formatPrice(51),
      formatPrice(51),
      formatPrice(59),
      formatPrice(59),
      formatPrice(67),
    ];
    const prices = screen
      .getAllByText((content) => expectedPrices.includes(content))
      .map((price) => price.textContent);

    expect(prices).toEqual(expectedPrices);

    await user.click(screen.getByRole('button', { name: 'Close filters' }));

    expect(screen.queryByRole('heading', { name: 'Filters' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Refine results' }));

    expect(screen.getByRole('heading', { name: 'Filters' })).toBeInTheDocument();
  });

  it('opens the selected product when a search result card is clicked', async () => {
    const user = userEvent.setup();
    const { container, onOpenProduct } = renderSearchResults();

    await user.click(within(container).getByRole('button', { name: /signature jersey/i }));

    expect(onOpenProduct).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'street-4', name: 'Signature Jersey' })
    );
  });
});
