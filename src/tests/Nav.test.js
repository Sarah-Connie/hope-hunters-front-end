import {render, screen} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Nav from '../components/Nav';

// test suite for the nav component - testing navlinks are rendering as required
// checking against screensize and against route, independently
describe('Nav Component Rendering Tests', () => {
    test('renders login and sign up links on small screens only', () => {
        render(
        <MemoryRouter>
            <Nav />
        </MemoryRouter>
        );
    
        const loginLink = screen.getByText('Login');
        const signUpLink = screen.getByText('Sign Up');
        // const homeLink = screen.queryByText('Home');
    
        expect(loginLink).toBeInTheDocument();
        expect(signUpLink).toBeInTheDocument();
        // expect(homeLink).not.toBeInTheDocument();
        });
    
    // this test is currently failing 
    // the report a missing person link is only meant to show on md screens -
    test('renders report missing link on medium screens or larger', () => {
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
    
    test('renders home link when not on home page', () => {
        render(
        <MemoryRouter initialEntries={['/some-page']}>
            <Nav />
        </MemoryRouter>
        );
    
        const homeLink = screen.getByText('Home');
    
        expect(homeLink).toBeInTheDocument();
    });
});