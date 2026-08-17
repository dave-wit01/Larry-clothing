import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import FooterHistory from './FooterHistory';

describe('FooterHistory', () => {
  it('opens the men collection from Explore', async () => {
    const user = userEvent.setup();
    render(<FooterHistory />);

    await user.click(screen.getByRole('button', { name: 'Explore' }));

    expect(screen.getByRole('dialog', { name: 'Men collections' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Casual wear' })).toBeInTheDocument();
  });
});
