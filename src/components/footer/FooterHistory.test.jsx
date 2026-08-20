import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import FooterHistory from './FooterHistory';
import { NavigationProvider } from '../../context/NavigationContext';

describe('FooterHistory', () => {
  it('opens the men collection from Explore', async () => {
    const user = userEvent.setup();
    const navigate = vi.fn();
    render(
      <NavigationProvider navigate={navigate} onBack={vi.fn()}>
        <FooterHistory />
      </NavigationProvider>
    );

    await user.click(screen.getByRole('button', { name: 'Explore' }));

    expect(screen.getByRole('dialog', { name: 'Men collections' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Casual wear' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Jersey' }));

    expect(navigate).toHaveBeenCalledWith('jersey');
  });
});
