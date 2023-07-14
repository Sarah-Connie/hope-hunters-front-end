import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../components/LoginForm';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';


describe ('Login Form Component Rendering', () => {
  it('renders the login form', () => {
    render(
      <Router>
        <LoginForm />
      </Router>
    );

    expect(screen.getByText('Login Below')).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

});
