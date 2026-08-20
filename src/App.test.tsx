import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import App from './App.tsx';

afterEach(cleanup);

async function openCollection(label: 'Casual wear' | 'Streetwear' | 'Jersey') {
  const user = userEvent.setup();
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  await user.click(screen.getByRole('button', { name: 'Open menu' }));
  await user.click(screen.getByRole('button', { name: 'Men' }));
  await user.click(screen.getByRole('button', { name: label }));
}

describe('collection navigation', () => {
  it('opens Casual wear instead of the shopping bag', async () => {
    await openCollection('Casual wear');
    expect(await screen.findByRole('heading', { name: 'Casual wear' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Shopping bag' })).not.toBeInTheDocument();
  });

  it('opens Streetwear', async () => {
    await openCollection('Streetwear');
    expect(await screen.findByRole('heading', { name: 'Streetwear' })).toBeInTheDocument();
  });

  it('opens Jersey', async () => {
    await openCollection('Jersey');
    expect(await screen.findByRole('heading', { name: 'Jersey' })).toBeInTheDocument();
  });
});
