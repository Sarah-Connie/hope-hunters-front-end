import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import SearchBar from '../components/Searchbar';
import axios from '../api/axios';
import AuthProvider from '../components/AuthContext';

// Mock the axios module
jest.mock('../api/axios', () => ({
  get: jest.fn().mockResolvedValue({ data: [] }),
}));

describe('SearchBar Component Rendering Tests', () => {
  test('renders search bar elements', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <SearchBar onSearchResult={() => {}} />
        </AuthProvider>
      </BrowserRouter>
    );

    // Check if the input element is rendered
    const inputElement = screen.getByPlaceholderText('Search for missing persons...');
    expect(inputElement).toBeInTheDocument();

    // Check if the Search and Clear buttons are rendered
    const searchButton = screen.getByRole('button', { name: 'Search' });
    expect(searchButton).toBeInTheDocument();

    const clearButton = screen.getByRole('button', { name: 'Clear' });
    expect(clearButton).toBeInTheDocument();
  });

  test('handles search term change and API call', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <SearchBar onSearchResult={() => {}} />
        </AuthProvider>
      </BrowserRouter>
    );

    // Get the input element and change its value
    const inputElement = screen.getByPlaceholderText('Search for missing persons...');
    fireEvent.change(inputElement, { target: { value: 'John Doe' } });

    // Get the search button and click it
    const searchButton = screen.getByRole('button', { name: 'Search' });
    fireEvent.click(searchButton);

    // Check if the API call is made with the correct search term
    expect(axios.get).toHaveBeenCalledWith('/missing/search/John Doe');
  });

  test('handles clear button click', () => {
    const onSearchResultMock = jest.fn();
    const onSortChangeMock = jest.fn(); // mock the onSortChange function

    render(
      <BrowserRouter>
        <AuthProvider>
          <SearchBar
            onSearchResult={onSearchResultMock}
            onSortChange={onSortChangeMock}
          />
        </AuthProvider>
      </BrowserRouter>
    );

    // Simulate click on the clear button
    fireEvent.click(screen.getByText('Clear'));

    // Check if the onSortChange function is called with an empty string
    expect(onSortChangeMock).toHaveBeenCalledWith('');

    // Check that the API call is not made when clearing the input
    expect(axios.get).not.toHaveBeenCalled();
  });

  test('displays search error for invalid search term', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <SearchBar onSearchResult={() => {}} />
        </AuthProvider>
      </BrowserRouter>
    );

    // Simulate entering an invalid search term
    const input = screen.getByPlaceholderText('Search for missing persons...');
    fireEvent.change(input, { target: { value: '123abc' } });
    fireEvent.click(screen.getByText('Search'));

    // Check if the search error is displayed
    expect(screen.getByText('Invalid search. Please try again.')).toBeInTheDocument();
  });

  test('updates search term when typing', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <SearchBar onSearchResult={() => {}} />
        </AuthProvider>
      </BrowserRouter>
    );

    // Simulate typing in the input field
    const input = screen.getByPlaceholderText('Search for missing persons...');
    fireEvent.change(input, { target: { value: 'John Doe' } });

    // Check if the search term is updated correctly
    expect(input.value).toBe('John Doe');
  });
});

describe('Searchbar URL Handling Tests', () => {
  test('searches when pressing Enter key', async () => {
    const onSearchResultMock = jest.fn();

    render(
      <BrowserRouter>
        <AuthProvider>
          <SearchBar onSearchResult={onSearchResultMock} />
        </AuthProvider>
      </BrowserRouter>
    );

    // Get the input element and change its value
    const inputElement = screen.getByPlaceholderText('Search for missing persons...');
    fireEvent.change(inputElement, { target: { value: 'John Doe' } });

    // Press the Enter key
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 13 , target: { value: 'John Doe' }});

    // Check if the api route is being updated with the desired search query
    expect(axios.get).toHaveBeenCalledWith('/missing/search/John Doe');
  });

  test('updates URL when changing the search term', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <SearchBar onSearchResult={() => {}} />
        </AuthProvider>
      </BrowserRouter>
    );

    // Simulate typing in the input field
    const inputElement = screen.getByPlaceholderText('Search for missing persons...');
    fireEvent.change(inputElement, { target: { value: 'John Doe' } });

    // Check if the URL is updated correctly
    const searchParams = new URLSearchParams({ searchQuery: 'John Doe' });
    const newUrl = `http://localhost/?${searchParams.toString()}`;
    expect(window.location.href).toBe(newUrl);
  });

  test('updates URL when clearing the search term', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <SearchBar onSearchResult={() => {}} originalReports={[]} onSortChange={() => {}} />
        </AuthProvider>
      </BrowserRouter>
    );

    // Simulate typing in the input field
    const inputElement = screen.getByPlaceholderText('Search for missing persons...');
    fireEvent.change(inputElement, { target: { value: 'John Doe' } });

    // Simulate clicking the clear button
    const clearButton = screen.getByRole('button', { name: 'Clear' });
    fireEvent.click(clearButton);

    // Check if the URL is updated correctly
    const newUrl = 'http://localhost/';
    expect(window.location.href).toBe(newUrl);
  });

  test('attaches scroll event listener on component mount', () => {
    const originalAddEventListener = window.addEventListener;
    window.addEventListener = jest.fn();

    render(
      <BrowserRouter>
        <AuthProvider>
          <SearchBar onSearchResult={() => {}} />
        </AuthProvider>
      </BrowserRouter>
    );

    expect(window.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));

    // Restore the original addEventListener function
    window.addEventListener = originalAddEventListener;
  });

  test('removes scroll event listener on component unmount', () => {
    const originalRemoveEventListener = window.removeEventListener;
    window.removeEventListener = jest.fn();

    const { unmount } = render(
      <BrowserRouter>
        <AuthProvider>
          <SearchBar onSearchResult={() => {}} />
        </AuthProvider>
      </BrowserRouter>
    );

    unmount();

    expect(window.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));

    // Restore the original removeEventListener function
    window.removeEventListener = originalRemoveEventListener;
  });
});

describe('SearchBar Error Handling Tests', () => {
  test('clears search error when there is a sortingMenu error', () => {
    const onSearchResultMock = jest.fn();
    const onSortChangeMock = jest.fn();
    const sortErrorMock = 'Error: Invalid sort option';
    const hasSortErrorMock = true;

    render(
      <BrowserRouter>
      <AuthProvider>
          <SearchBar
            onSearchResult={onSearchResultMock}
            originalReports={[]}
            onSortChange={onSortChangeMock}
            sortError={sortErrorMock}
            hasSortError={hasSortErrorMock}
          />
        </AuthProvider>
      </BrowserRouter>
    );

    // Check if the search error is cleared when there is a sortingMenu error
    expect(screen.queryByText('Invalid search. Please try again.')).not.toBeInTheDocument();
  });

  test('displays search error for invalid search term', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <SearchBar onSearchResult={() => {}} />
        </AuthProvider>
      </BrowserRouter>
    );

    // Simulate entering an invalid search term
    const input = screen.getByPlaceholderText('Search for missing persons...');
    fireEvent.change(input, { target: { value: '12333' } });
    fireEvent.click(screen.getByText('Search'));

    // Check if the search error is displayed
    expect(screen.getByText('Invalid search. Please try again.')).toBeInTheDocument();
  });

  test('displays search error for incomplete search term', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <SearchBar onSearchResult={() => {}} />
        </AuthProvider>
      </BrowserRouter>
    );

    // Simulate entering an invalid search term
    const input = screen.getByPlaceholderText('Search for missing persons...');
    fireEvent.change(input, { target: { value: 'au' } });
    fireEvent.click(screen.getByText('Search'));

    // Check if the search error is displayed
    expect(screen.getByText('Incomplete search. Please try again.')).toBeInTheDocument();
  });

});
