import {render, screen} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import userEvent from '@testing-library/user-event';
import Nav from '../components/Nav';

jest.mock('react-responsive', () => ({
    useMediaQuery: jest.fn(),
  }));


// test suite for the nav component - testing navlinks are rendering as required
// checking against screensize and against route, independently
describe('Nav Component Rendering Tests', () => {
    test('renders login, sign up, and home links on small screens only', () => {
        render(
        <MemoryRouter>
            <Nav />
        </MemoryRouter>
        );
    
        const loginLink = screen.getByText('Login');
        const signUpLink = screen.getByText('Sign Up');
        const homeLink = screen.queryByText('Home');
    
        expect(loginLink).toBeInTheDocument();
        expect(signUpLink).toBeInTheDocument();
        expect(homeLink).toBeInTheDocument();
        });
    
    // the report a missing person link is only meant to show on md/lg screens -
    test('renders report missing link on medium screens or larger', () => {
        useMediaQuery.mockReturnValueOnce(true); 
        
        render(
        <MemoryRouter initialEntries={['/']}>
            <Nav />
        </MemoryRouter>
        );
    
        const reportLink = screen.getByText(/report a missing person/i);
        const loginLink = screen.queryByText('Login');
        const signUpLink = screen.queryByText('Sign Up');
    
        expect(reportLink).toBeInTheDocument();
        expect(loginLink).not.toBeInTheDocument();
        expect(signUpLink).not.toBeInTheDocument();
    });
    
    test('renders home link when not on home page (applicable to md/lg screens only)', () => {
        render(
            <MemoryRouter initialEntries={["/other"]}>
              <Nav />
            </MemoryRouter>
          );
        
          const homeLink = screen.getByText("Home");
          expect(homeLink).toBeInTheDocument();
    });

    // for md/lg screens only - 
    test('renders dashboard and logout when logged in (md/lg screens)', () => {
        useMediaQuery.mockReturnValueOnce(true); 

        render(
            <MemoryRouter>
              <Nav isLoggedIn={true}/>
            </MemoryRouter>
          );
        
          const dashLink = screen.getByText("Dashboard");
          const logoutLink = screen.getByText("Logout");
          expect(dashLink).toBeInTheDocument();
          expect(logoutLink).toBeInTheDocument();
    });
    
    // for small screens only - 
    test('renders login and signup links when user is not logged in', () => {
        useMediaQuery.mockReturnValueOnce(true); 

        render(
        <MemoryRouter>
            <Nav isLoggedIn={false} />
        </MemoryRouter>
        );
        const loginLink = screen.getByRole('link', { href: '/login' });
        expect(loginLink).toBeInTheDocument();
    
        const signupLink = screen.getByRole('link', { href: '/signup' });
        expect(signupLink).toBeInTheDocument();
      });
    
    // for small screens only
    test('does not render login and signup links when user is logged in', () => {
        useMediaQuery.mockReturnValueOnce(true); 

        render(
        <MemoryRouter>
            <Nav isLoggedIn={true} />
        </MemoryRouter>
        );
    
        const loginLink = screen.queryByText("Login");
        const signUpLink = screen.queryByText("Sign Up");
    
        expect(loginLink).not.toBeInTheDocument();
        expect(signUpLink).not.toBeInTheDocument();
    });

});

// Test suite to ensure all links routing to correct path
describe('Nav Component Link to Path Tests', () => {
    
    //md to large screens only
    test('navigates to the report route when clicking report a missing person link', () => {
        useMediaQuery.mockReturnValueOnce(true); 

        render(
        <Router>
          <Nav />
        </Router>
        );
      
        const link = screen.getByText(/report a missing person/i);
        userEvent.click(link);
      
        expect(window.location.pathname).toBe("/report");
      });

      test('navigates to the home route when clicking logout link', () => {
        useMediaQuery.mockReturnValueOnce(true); 

        render(
        <Router>
          <Nav isLoggedIn={true}/>
        </Router>
        );
      
        const link = screen.getByText(/logout/i);
        userEvent.click(link);
      
        expect(window.location.pathname).toBe("/");
      });

      test('navigates to the dashboard route when clicking dashboard link', () => {
        useMediaQuery.mockReturnValueOnce(true); 

        render(
        <Router>
          <Nav isLoggedIn={true}/>
        </Router>
        );
      
        const link = screen.getByText(/dashboard/i);
        userEvent.click(link);
      
        expect(window.location.pathname).toBe("/dashboard");
      });

      


})