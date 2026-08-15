import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CategoryGrid } from './CategoryGrid';

describe('CategoryGrid', () => {
  it('renders the provided category cards', () => {
    render(
      <CategoryGrid
        items={[{ id: 'cat-1', label: "Men's Suit", imageUrl: 'https://example.com/men.jpg' }]}
      />
    );

    expect(screen.getByRole('heading', { name: /shop by style/i })).toBeInTheDocument();
    expect(screen.getByAltText("Men's Suit")).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /men's suit/i })).toBeInTheDocument();
  });
});
