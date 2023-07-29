import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from '../api/axios';
import Home from '../pages/Home';

jest.mock('../api/axios', () => ({
    get: jest.fn((url) => {
      if (url === '/missing/') {
        // Mock the initial data fetch with an empty data array
        return Promise.resolve({ data: mockReports });
      } else if (url === '/missing/sorted/fullName') {
        return Promise.resolve({ data: mockReports });
      } else if (url === '/missing/search?query=John Doe') {
        return Promise.resolve({ data: mockReports });
      } else if (url === '/missing/amber-alerts') {
        return Promise.resolve({ data: mockAmberAlertReports });
      } else {
        return Promise.reject(new Error('Unknown API endpoint'));
      }
    }),
  }));

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
    }
]

const mockAmberAlertReports = [
    {
      _id: '2',
      fullName: 'Jane Doe',
      currentAge: [{ number: 8, type: 'years' }],
      age: [{ number: 8, type: 'years' }],
      photoURL: 'https://example.com/jane-doe.jpg',
    }
];

describe('Home Component - Rendering and Initial State Tests', () => {

    beforeEach(() => {
        // Clear mock implementations and reset state for each test
        jest.clearAllMocks();
      });

      test('renders Home component with reports on mount', async () => {
        render(
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        );
    
        // Wait for the data to be fetched and component to re-render
        await waitFor(() => {
          expect(screen.getByText('Currently Active Reports')).toBeInTheDocument();
        });
    
        // Check if reports are rendered on the screen
        expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
        expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument();
        expect(screen.getByAltText('John Doe')).toBeInTheDocument();
        expect(screen.getByAltText('Jane Doe')).toBeInTheDocument();
      });

      test('renders Home component with error state', async () => {
        axios.get.mockRejectedValueOnce(new Error('Error fetching data'));
      
        render(
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        );
      
        await waitFor(() => {
          expect(
            screen.getByText('Error fetching missing persons data. Please try again later.')
          ).toBeInTheDocument();
        });
    });
   
});

describe('Home Component - Search Functionality Tests', () => {
    test('handles search and updates reports', async () => {
      axios.get.mockResolvedValueOnce({ data: mockReports });
  
      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );
  
      // Wait for the data to be fetched and component to re-render
      await waitFor(() => {
        expect(screen.getByText('Currently Active Reports')).toBeInTheDocument();
      });
  
      // Mock the search query response
      axios.get.mockResolvedValueOnce({ data: [mockReports[0]] });
  
      const inputElement = screen.getByPlaceholderText('Search for missing persons...');
      fireEvent.change(inputElement, { target: { value: 'John Doe' } });
      fireEvent.keyDown(inputElement, { key: 'Enter', code: 13 });
  
      // Wait for the component to re-render with the search results
      await waitFor(() => {
        expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
      });
    });
  
    test('displays "No results found" message for empty search', async () => {
      axios.get.mockResolvedValueOnce({ data: mockReports });
  
      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );
  
      // Wait for the data to be fetched and component to re-render
      await waitFor(() => {
        expect(screen.getByText('Currently Active Reports')).toBeInTheDocument();
      });
  
      // Mock the search query response with an empty array
      axios.get.mockResolvedValueOnce({ data: [] });
  
      const inputElement = screen.getByPlaceholderText('Search for missing persons...');
      fireEvent.change(inputElement, { target: { value: '' } });
      fireEvent.keyDown(inputElement, { key: 'Enter', code: 13 });
  
      // Wait for the component to re-render with the empty search message
      await waitFor(() => {
        expect(screen.getByText('No missing persons reports found.')).toBeInTheDocument();
      });
    });
  });
  
  describe('Home Component - Sorting Functionality Tests', () => {
    test('sorts by Amber Alerts', async () => {
      axios.get.mockResolvedValueOnce({ data: mockReports });
  
      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );
  
      // Wait for the data to be fetched and component to re-render
      await waitFor(() => {
        expect(screen.getByText('Currently Active Reports')).toBeInTheDocument();
      });
  
      // Mock the Amber Alerts sorting response
      axios.get.mockResolvedValueOnce({ data: mockAmberAlertReports });
  
      // Wait for the component to re-render with the sorted data
      await waitFor(() => {
        expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument();
      });
    });
  });
  
  describe('Home Component - Rendering with Specific Data Tests', () => {
    test('displays the correct data for John Doe', async () => {
      axios.get.mockResolvedValueOnce({ data: mockReports });
  
      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );
  
      // Wait for the data to be fetched and component to re-render
      await waitFor(() => {
        expect(screen.getByText('Currently Active Reports')).toBeInTheDocument();
      });
  
      // Check specific details for John Doe
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
      expect(screen.getByText('Current Age: 25 years old')).toBeInTheDocument();
      expect(screen.getByAltText('John Doe').src).toBe('https://example.com/john-doe.jpg');
    });
  
    test('displays the correct data for Jane Doe', async () => {
      axios.get.mockResolvedValueOnce({ data: mockReports });
  
      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );
  
      // Wait for the data to be fetched and component to re-render
      await waitFor(() => {
        expect(screen.getByText('Currently Active Reports')).toBeInTheDocument();
      });
  
      // Check specific details for Jane Doe
      expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument();
      expect(screen.getByText('Current Age: 8 years old')).toBeInTheDocument();
      expect(screen.getByAltText('Jane Doe').src).toBe('https://example.com/jane-doe.jpg');
    });
  });
  