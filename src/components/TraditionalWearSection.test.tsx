import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TraditionalWearSection } from './TraditionalWearSection'

describe('TraditionalWearSection', () => {
  it('renders the heading, supporting copy, and featured image', () => {
    render(
      <TraditionalWearSection
        heading="Traditional outfit"
        paragraph="Crafted for heritage, shaped for modern presence."
      />,
    )

    expect(screen.getByRole('heading', { name: /traditional outfit/i })).toBeInTheDocument()
    expect(screen.getByText(/crafted for heritage/i)).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /traditional wear/i })).toBeInTheDocument()
  })
})
