import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from '../api/axios';
import Home from '../pages/Home';


jest.mock("../components/SearchBar", () => () => <div data-testid="mocked-searchbar" />);
jest.mock("../components/AmberBanner", () => () => <div data-testid="mocked-amberbanner" />);

jest.mock('../api/axios', () => ({
    get: jest.fn((url) => {
      if (url === '/missing/') {
        return Promise.resolve({ data: mockReports });
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


describe('Home Component - Rendering and Initial State Tests', () => {

    beforeEach(() => {
        // Clear mock implementations and reset state for each test
        jest.clearAllMocks();
    });

    test("renders Home component and displays mock reports on mount", async () => {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );
    
        // Ensure that the API call was made
        expect(axios.get).toHaveBeenCalledWith("/missing/");
    
        // Wait for the component to render with the mock reports
        
        // Check if the mock reports are displayed
        const mockReport1 = screen.getByText("John Doe");
        const mockReport2 = screen.getByText("Jane Doe");
        console.log("Mock Report 1:", mockReport1);
        console.log("Mock Report 2:", mockReport2);
    
        // Log the Axios mock calls and responses
        console.log("Mock Axios calls:", axios.get.mock.calls);
        axios.get.mock.calls.forEach((call) => {
            console.log("Mock Axios call URL:", call[0]);
            console.log("Mock Axios call response:", call[1]);
        });
    
        expect(mockReport1).toBeInTheDocument();
        expect(mockReport2).toBeInTheDocument();
        
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

describe('Home Component Basic Rendering Tests', () => {
    test("renders Home component without errors", () => {
        render( 
        <BrowserRouter>
            <Home />
        </BrowserRouter>);
    });

    // Renders SearchBar component without any errors
    test("renders SearchBar component without errors", () => {
        render(<Home />);
        const searchBar = screen.getByTestId("mocked-searchbar");
        expect(searchBar).toBeInTheDocument();
    });


    // Renders AmberAlertBanner component without any errors
    test("renders AmberAlertBanner component without errors", () => {
        render(<Home />);
        const amberBanner = screen.getByTestId("mocked-amberbanner");
        expect(amberBanner).toBeInTheDocument();
    });

});