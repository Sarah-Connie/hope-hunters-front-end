import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../components/LoginForm';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider, { useAuth } from '../components/AuthContext';

jest.mock("../components/AuthContext");

describe('Login Form Component', () => {
  it('renders the login form', () => {
    render(
      <Router>
        <AuthProvider>
          <LoginForm />
        </AuthProvider>
      </Router>
    );

    expect(screen.getByText('Please login below')).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('displays validation error messages when form is submitted with empty fields', () => {
    render(
      <Router>
        <AuthProvider>
          <LoginForm />
        </AuthProvider>
      </Router>
    );

    const submitButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(submitButton);

    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

  it('displays error message when login fails due to invalid credentials', async () => {
    // Mock the login function to reject with an error message
    useAuth.mockReturnValue({
      login: jest.fn().mockRejectedValue(new Error('Invalid credentials')),
      refreshAuthToken: jest.fn(),
      user: null,
    });

    render(
      <Router>
        <AuthProvider>
          <LoginForm />
        </AuthProvider>
      </Router>
    );

    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const submitButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('An error occurred during login. Please try again.')).toBeInTheDocument();
    });
  });
});