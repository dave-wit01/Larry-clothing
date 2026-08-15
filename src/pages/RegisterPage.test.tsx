import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { RegisterPage } from './RegisterPage';

describe('RegisterPage', () => {
  it('renders the sign up form fields and actions', () => {
    render(<RegisterPage />);

    expect(screen.getByPlaceholderText('Full name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('New password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register now/i })).toBeInTheDocument();
  });
});
