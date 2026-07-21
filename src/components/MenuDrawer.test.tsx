import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { MenuDrawer } from './MenuDrawer'

describe('MenuDrawer', () => {
  it('calls onNavigate for Traditional Outfit selections', async () => {
    const user = userEvent.setup()
    const onNavigate = vi.fn()

    render(<MenuDrawer isOpen onClose={() => {}} onNavigate={onNavigate} />)

    await user.click(screen.getByRole('link', { name: /traditional outfit/i }))

    expect(onNavigate).toHaveBeenCalledWith('Traditional Outfit')
  })
})
