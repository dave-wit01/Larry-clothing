import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { CreationsMenu } from './CreationsMenu';
import { CreationsSection } from './CreationsSection';

describe('Creations collection menu', () => {
  it('opens from the creations button and navigates from a category', async () => {
    const user = userEvent.setup();
    const onOpenCollection = vi.fn();
    const onNavigate = vi.fn();

    const { rerender } = render(<CreationsSection onOpenCollection={onOpenCollection} />);

    await user.click(screen.getByRole('button', { name: 'View All Creations' }));
    expect(onOpenCollection).toHaveBeenCalledOnce();

    rerender(<CreationsMenu isOpen onClose={vi.fn()} onNavigate={onNavigate} />);

    expect(screen.getByRole('button', { name: 'Casual wear' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Casual wear' }));

    expect(onNavigate).toHaveBeenCalledWith('Casual wear');
  });
});
