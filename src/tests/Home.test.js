import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from '../api/axios';
import Home from '../pages/Home';
import AuthProvider from '../components/AuthContext';

jest.mock("../components/SearchBar", () => () => <div data-testid="mocked-searchbar" />);
jest.mock("../components/AmberBanner", () => () => <div data-testid="mocked-amberbanner" />);
jest.mock("../components/SocialShares", () => ({ report }) => (
  <div data-testid="mocked-socialshares">
  </div>
));
jest.mock('../api/axios', () => ({
  get: jest.fn((url) => {
    if (url === '/missing/') {
      return Promise.resolve({ data: getMockReports() });
    } else if (url === '/missing/sorted/fullName') {
      return Promise.resolve({ data: getSortedReports() });
    } else if (url === '/missing/sorted/currentAge') {
      return Promise.resolve({ data: getSortedReports('currentAge') });
    } else if (url === '/missing/sorted/ageOldest') {
      return Promise.resolve({ data: getSortedReports('ageOldest') });
    } else if (url === '/missing/sorted/dateLastSeenNewest') {
      return Promise.resolve({ data: getSortedReports('dateLastSeenNewest') });
    } else if (url === '/missing/sorted/dateLastSeenOldest') {
      return Promise.resolve({ data: getSortedReports('dateLastSeenOldest') });
    } else if (url === '/missing/sorted/lastSeen') {
      return Promise.resolve({ data: getSortedReports('lastSeen') });
    } else if (url === '/missing/amber-alerts') {
      return Promise.resolve({ data: getAmberAlertReports() });
    } else {
      return Promise.reject(new Error('Unknown API endpoint'));
    }
  }),
}));

// Helper function to generate mock reports
const getMockReports = () => [
  {
    _id: '1',
    fullName: 'John Doe',
    currentAge: [{ number: 25, type: 'years' }],
    age: [{ number: 30, type: 'years' }],
    photoURL: 'https://example.com/john-doe.jpg',
    dateLastSeen: new Date('2023-07-01').toISOString(),
    locationLastSeen: { address: '123 Main St', city: 'City', state: 'State', postcode: '12345' },
    areaSuspectedToBe: 'City X',
    height: { number: 180 },
    weight: { number: 75, measurement: ['kg'] },
    hairColour: 'Brown',
    eyeColour: 'Blue',
    complexion: ['Fair'],
    gender: 'Male',
    distinctiveFeatures: 'Tattoo on left arm',
    amberAlert: true,
  },
  {
    _id: '2',
    fullName: 'Jane Doe',
    currentAge: [{ number: 8, type: 'years' }],
    age: [{ number: 8, type: 'years' }],
    photoURL: 'https://example.com/jane-doe.jpg',
    dateLastSeen: new Date('2023-06-15').toISOString(),
    locationLastSeen: { address: '456 Elm St', city: 'City', state: 'State', postcode: '67890' },
    areaSuspectedToBe: 'City Y',
    height: { number: 120 },
    weight: { number: 30, measurement: ['kg'] },
    hairColour: 'Blonde',
    eyeColour: 'Green',
    complexion: ['Light'],
    gender: 'Female',
    distinctiveFeatures: 'Mole on right cheek',
    amberAlert: false,
  },
];

// Helper function to generate sorted reports
const getSortedReports = (sortOption) => {
  const reports = getMockReports();
  return reports.sort((a, b) => {
    if (sortOption === 'currentAge') {
      return a.currentAge[0].number - b.currentAge[0].number;
    } else if (sortOption === 'ageOldest') {
      return b.age[0].number - a.age[0].number;
    } else if (sortOption === 'dateLastSeenNewest') {
      return new Date(b.dateLastSeen) - new Date(a.dateLastSeen);
    } else if (sortOption === 'dateLastSeenOldest') {
      return new Date(a.dateLastSeen) - new Date(b.dateLastSeen);
    } else if (sortOption === 'lastSeen') {
      return a.locationLastSeen.city.localeCompare(b.locationLastSeen.city);
    } else {
      return a.fullName.localeCompare(b.fullName);
    }
  });
};

// Helper function to generate amber alert reports
const getAmberAlertReports = () => {
  const reports = getMockReports();
  return reports.filter((report) => report.amberAlert);
};

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
    axios.get.mockResolvedValueOnce({ data: getMockReports() });

    render(
      <BrowserRouter>
        <AuthProvider>
          <Home />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      // Ensure that the individual reports are displayed in the component
      const mockReports = getMockReports();
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

  test('End-to-End Test for Home component, fetch and render reports', async () => {
    // Sample data for testing
    const mockReports = [
      {
        _id: '1',
        fullName: 'John Doe',
        currentAge: [{ number: 30, type: 'years' }],
        age: [{ number: 25, type: 'years' }],
        dateLastSeen: '2023-07-01',
        locationLastSeen: {
          address: '123 Main St',
          city: 'Sydney',
          state: 'NSW',
          postcode: '2000',
        },
        areaSuspectedToBe: 'City',
        height: { number: 180, measurement: ['cm'] },
        weight: { number: 70, measurement: ['kg'] },
        hairColour: 'Black',
        eyeColour: 'Brown',
        complexion: ['Light'],
        gender: 'Male',
        distinctiveFeatures: 'Tattoo on arm',
        amberAlert: false,
        photoURL: 'https://example.com/photo.jpg',
      },
    ];

    // Mock the API response
    axios.get.mockResolvedValueOnce({ data: mockReports });

    // Render the Home component
    render(<Home />);

    // Wait for the API call to be resolved and data to be loaded
    await waitFor(() => {
      // Check if the component renders the reports correctly
      mockReports.forEach((report) => {
        expect(screen.getByText(report.fullName)).toBeInTheDocument();
        expect(screen.getByText(`Current Age: ${report.currentAge[0].number} ${report.currentAge[0].type} old`)).toBeInTheDocument();
        
        expect(screen.getByText(`Age at Reported Missing: ${report.age[0].number} ${report.age[0].type} old`)).toBeInTheDocument();

        // Check date last seen
        expect(screen.getByText(`Date Last Seen: ${report.dateLastSeen}`)).toBeInTheDocument();

        // Check location last seen
        expect(screen.getByText(`City: ${report.locationLastSeen.city}`)).toBeInTheDocument();

        // Check area suspected to be
        expect(screen.getByText(`Area Suspected To Be: ${report.areaSuspectedToBe}`)).toBeInTheDocument();

        // // Check complexion, gender, and distinctive features
        expect(screen.getByText(`Complexion: ${report.complexion[0]}`)).toBeInTheDocument();
        expect(screen.getByText(`Gender: ${report.gender}`)).toBeInTheDocument();
        expect(screen.getByText(`Distinctive Features: ${report.distinctiveFeatures}`)).toBeInTheDocument();

        // Check for image rendering
        expect(screen.getByAltText('Missing Person')).toBeInTheDocument();
      });

      // Check if there are no error messages displayed
      expect(screen.queryByText(/Error/i)).toBeNull();
    });
  });

});
