import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from '../api/axios';
import Home from '../pages/Home';
import AuthProvider from '../components/AuthContext';

jest.mock("../components/SearchBar", () => () => <div data-testid="mocked-searchbar" />);
jest.mock("../components/AmberBanner", () => () => <div data-testid="mocked-amberbanner" />);
jest.mock('../api/axios', () => ({
  get: jest.fn((url) => {
    if (url === '/missing/') {
      return Promise.resolve([]);
    } else {
      return Promise.reject(new Error('Unknown API endpoint'));
    }
  }),
}));

describe('Home Component Tests', () => {
  beforeEach(() => {
    // Clear mock implementations and reset state for each test
    jest.clearAllMocks();
  });

  test("renders Home component without errors", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Home />
        </AuthProvider>
      </BrowserRouter>
    );
  });

  test("renders SearchBar component without errors", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Home />
        </AuthProvider>
      </BrowserRouter>
    );
    const searchBar = screen.getByTestId("mocked-searchbar");
    expect(searchBar).toBeInTheDocument();
  });

  test("renders AmberAlertBanner component without errors", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Home />
        </AuthProvider>
      </BrowserRouter>
    );
    const amberBanner = screen.getByTestId("mocked-amberbanner");
    expect(amberBanner).toBeInTheDocument();
  });

  test("renders Home component and displays mock reports on mount", async () => {
    const mockReports = [
      {
        _id: '1',
        fullName: 'John Doe',
        currentAge: [{ number: 25, type: 'years' }],
        age: [{ number: 30, type: 'years' }],
        photoURL: 'https://example.com/john-doe.jpg',
      },
      {
        _id: '2',
        fullName: 'Jane Doe',
        currentAge: [{ number: 8, type: 'years' }],
        age: [{ number: 8, type: 'years' }],
        photoURL: 'https://example.com/jane-doe.jpg',
      },
    ];

    axios.get.mockResolvedValueOnce({ data: mockReports });

    render(
      <BrowserRouter>
        <AuthProvider>
          <Home />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      // Ensure that the individual reports are displayed in the component
      mockReports.forEach((report) => {
        const reportElement = screen.getByText(report.fullName);
        expect(reportElement).toBeInTheDocument();
      });
    });
  });

  test('renders Home component with error state', async () => {
    axios.get.mockRejectedValueOnce(new Error('Error fetching data'));

    render(
      <BrowserRouter>
        <AuthProvider>
          <Home />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText('Error fetching missing persons data. Please try again later.')
      ).toBeInTheDocument();
    });
  });
});
