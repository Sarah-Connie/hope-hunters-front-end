import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import Footer from '../components/Footer';

describe('Footer Component Render Tests', () => {
  test('renders emergency message', () => {
    render(
      <Router>
        <Footer />
      </Router>
      );
    const emergencyMessage = screen.getByText(/If this is an emergency, please call 000 immediately/i);
    expect(emergencyMessage).toBeInTheDocument();
  });

  test('renders logo', () => {
    render(
    <Router>
      <Footer />
    </Router>
    );
    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();
  });

  test('renders copyright information', () => {
    render(
    <Router>
      <Footer />
    </Router>
    );
    const copyrightText = screen.getByText(/Sarah Landis and Connie Jacques 2023. All rights reserved./i);
    expect(copyrightText).toBeInTheDocument();
  });

});