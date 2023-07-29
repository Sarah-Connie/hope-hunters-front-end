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
      locationLastSeen: {
        address: "123 Elm Street",
        city: "Somewhere",
        state: ["CA"],
        postcode: "12345"
      },
      height: {
        number: 120,
        measurement: ["centimeters"]
      },
      weight: {
        number: 30,
        measurement: ["kilograms"]
      },
      dateLastSeen: "2023-07-27T04:12:31.042Z",
      areaSuspectedToBe: "Unknown",
      hairColour: "Blonde",
      eyeColour: "Blue",
      complexion: ["fair"],
      gender: "female",
      amberAlert: true,
      addedBy: [],
      dateAdded: "2023-07-27T04:12:30.928Z",
      __v: 0
    }
];

describe('Home Component - Rendering and Initial State', () => {
    beforeEach(() => {
        // Clear mock implementations and reset state for each test
        jest.clearAllMocks();
      });

    test('renders Home component with error state', async () => {
        axios.get.mockRejectedValueOnce(new Error('Error fetching data'));
    
        render(
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        );
    
        await waitFor(() => {
          expect(screen.getByText('Error fetching missing persons data. Please try again later.')).toBeInTheDocument();
        });
      });
    
      test('renders Home component with reports on mount', async () => {
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

        axios.get.mockResolvedValueOnce({ data: mockReports });
    
        render(
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        );
    
        await waitFor(() => {
          expect(screen.getByText('Currently Active Reports')).toBeInTheDocument();
        });

        // Check if the names of the reports are rendered
        expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
        expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument();

        expect(screen.getByText('Current Age: 25 years old')).toBeInTheDocument();
        expect(screen.getByText('Current Age: 8 years old')).toBeInTheDocument();

        const johnDoeImage = screen.getByAltText('John Doe');
        expect(johnDoeImage).toBeInTheDocument();
        expect(johnDoeImage.src).toBe('https://example.com/john-doe.jpg');
    
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
  
      axios.get.mockResolvedValueOnce({ data: mockReports });
  
      const inputElement = screen.getByPlaceholderText('Search for missing persons...');
      fireEvent.change(inputElement, { target: { value: 'John Doe' } });
      fireEvent.keyDown(inputElement, { key: 'Enter', code: 13 });
  
      await waitFor(() => {
        expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
      });

    });
  
  });
  
  describe('Home Component - Sorting Functionality Tests', () => {
    test('sorts by Amber Alerts', async () => {
      axios.get.mockResolvedValueOnce({ data: mockAmberAlertReports });
  
      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );
  
      // Wait for the data to be fetched and component to re-render
      await waitFor(() => {
        expect(screen.getByText('Currently Active Reports')).toBeInTheDocument();
      });
  
      axios.get.mockResolvedValueOnce({ data: mockAmberAlertReports });

      await waitFor(() => {
        expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument();
      });
    });
  
  });
  