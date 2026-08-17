import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { MenuDrawer } from './MenuDrawer'

describe('MenuDrawer', () => {
  it('navigates to an available Men collection and marks unpublished collections as coming soon', async () => {
    const user = userEvent.setup()
    const onNavigate = vi.fn()

    render(<MenuDrawer isOpen onClose={() => {}} onNavigate={onNavigate} />)

    await user.click(screen.getByRole('button', { name: /men/i }))
    await user.click(screen.getByRole('button', { name: /casual wear/i }))

    expect(onNavigate).toHaveBeenCalledWith('Casual wear')
    expect(screen.getByText('Outerwear')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /outerwear/i })).not.toBeInTheDocument()
  })
})
