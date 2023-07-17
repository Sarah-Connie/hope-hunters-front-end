import React from 'react';
import { render, screen} from '@testing-library/react';
import LoginForm from '../components/LoginForm';
import { BrowserRouter as Router} from 'react-router-dom';


describe ('Login Form Component Rendering', () => {
  it('renders the login form', () => {
    render(
      <Router>
        <LoginForm />
      </Router>
    );

    expect(screen.getByText('Please login below.')).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

});
