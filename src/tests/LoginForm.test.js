import React from 'react';
import { render, screen} from '@testing-library/react';
import LoginForm from '../components/LoginForm';
import { BrowserRouter as Router} from 'react-router-dom';
import AuthProvider from '../components/AuthContext';


describe ('Login Form Component Rendering', () => {
  it('renders the login form', () => {
    render(
      <Router>
        <AuthProvider>
          <LoginForm />
        </AuthProvider>
      </Router>
    );

    expect(screen.getByText('Please login below.')).toBeInTheDocument();
    expect(screen.getByText('Email:')).toBeInTheDocument();
    expect(screen.getByText('Password:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

});
