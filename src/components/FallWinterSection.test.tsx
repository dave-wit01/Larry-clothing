import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FallWinterSection } from './FallWinterSection'

describe('FallWinterSection', () => {
  it('renders the section heading and feature cards', () => {
    render(<FallWinterSection />)

    expect(screen.getByRole('heading', { name: /fall-winter 2026/i })).toBeInTheDocument()
    expect(screen.getAllByRole('link')).toHaveLength(2)
  })
})
