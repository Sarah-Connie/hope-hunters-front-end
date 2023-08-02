import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from '../api/axios';
import { act } from 'react-dom/test-utils';
import AmberAlertBanner from '../components/AmberBanner';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from '../components/AuthContext';

jest.mock('../api/axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
}));

describe('AmberAlert Banner Component Tests', () => {
  test('displays "No Active Amber Alerts" when there are no alerts', async () => {
    const mockAmberAlerts = [];

    axios.get.mockResolvedValueOnce({ data: mockAmberAlerts });
    render(
    <BrowserRouter>
      <AuthProvider>
        <AmberAlertBanner />
      </AuthProvider>
    </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('No Active Amber Alerts')).toBeInTheDocument();
    });
  });

  test('displays "Amber Alerts currently unavailable" when API call fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('API error'));

    render(
    <BrowserRouter>
      <AuthProvider>
        <AmberAlertBanner />
      </AuthProvider>
    </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Amber Alerts currently unavailable')).toBeInTheDocument();
    });
  });

  test('displays "Active Amber Alerts" heading and animation starts', async () => {
    const mockAmberAlerts = [
      {
        _id: '1',
        fullName: 'John Doe',
        currentAge: [{ number: 10, type: 'years' }],
        locationLastSeen: { city: 'City 1', state: 'State 1' },
      },
      {
        _id: '2',
        fullName: 'Jane Smith',
        currentAge: [{ number: 7, type: 'years' }],
        locationLastSeen: { city: 'City 2', state: 'State 2' },
      },
    ];

    axios.get.mockResolvedValueOnce({ data: mockAmberAlerts });

    render(
    <BrowserRouter>
      <AuthProvider>
        <AmberAlertBanner />
      </AuthProvider>
    </BrowserRouter>
    );

    // Wait for the animation to start (2s delay)
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    });

    // Ensure that "Active Amber Alerts" heading is displayed
    expect(screen.getByText('Active Amber Alerts')).toBeInTheDocument();

    // Ensure that the alert details are displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('10 years old')).toBeInTheDocument();
    expect(screen.getByText('City 1')).toBeInTheDocument();
    expect(screen.getByText('State 1')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('7 years old')).toBeInTheDocument();
    expect(screen.getByText('City 2')).toBeInTheDocument();
    expect(screen.getByText('State 2')).toBeInTheDocument();
  });
});
