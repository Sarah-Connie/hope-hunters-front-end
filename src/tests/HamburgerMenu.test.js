import HamburgerMenu from "../components/HamburgerMenu";
import { BrowserRouter as Router } from "react-router-dom";
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthProvider from "../components/AuthContext";

// Test suite to ensure all links routing to correct path from Hamburger Menu
// Tests on small screens only as only small screens render Hamburger Menu

describe('Hamburger Menu Component Link to Path Tests', () => {

    test('navigates to login route when clicking login link', () => {
    render(
    <Router>
      <AuthProvider>
        <HamburgerMenu/>
      </AuthProvider>
    </Router>
    );
  
    const link = screen.getByText(/login/i);
    userEvent.click(link);
  
    expect(window.location.pathname).toBe("/login");
  });

  test('navigates to signup route when clicking signup link', () => {
    render(
    <Router>
      <AuthProvider>
        <HamburgerMenu/>
      </AuthProvider>
    </Router>
    );
  
    const link = screen.getByText(/sign up/i);
    userEvent.click(link);
  
    expect(window.location.pathname).toBe("/signup");
  });

  test('navigates to home route when clicking home link', () => {
    render(
    <Router>
      <AuthProvider>
        <HamburgerMenu/>
      </AuthProvider>
    </Router>
    );
  
    const link = screen.getByText(/home/i);
    userEvent.click(link);
  
    expect(window.location.pathname).toBe("/");
  });

  test('navigates to dashboard route when clicking dashboard link', () => {
    render(
    <Router>
      <AuthProvider>
        <HamburgerMenu isLoggedIn={true}/>
      </AuthProvider>
    </Router>
    );
  
    const link = screen.getByText(/dashboard/i);
    userEvent.click(link);
  
    expect(window.location.pathname).toBe("/dashboard");
  });

  test('navigates to home route when clicking logout link', () => {
    render(
    <Router>
      <AuthProvider>
        <HamburgerMenu isLoggedIn={true}/>
      </AuthProvider>
    </Router>
    );
  
    const link = screen.getByText(/logout/i);
    userEvent.click(link);
  
    expect(window.location.pathname).toBe("/");
  });

});