import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { RegisterPage } from './RegisterPage'

describe('RegisterPage', () => {
  it('renders the sign up form fields and actions', () => {
    render(<RegisterPage />)

    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Mail')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('New Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /register now/i })).toBeInTheDocument()
  })
})
