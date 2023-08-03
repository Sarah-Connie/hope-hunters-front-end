import { render, screen, waitFor } from '@testing-library/react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import EmailVerification from '../components/SignupVerification';
import { useParams } from 'react-router-dom';

jest.mock('react-responsive', () => ({
  useMediaQuery: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock('../api/axios', () => ({
  put: jest.fn(),
}));

describe('EmailVerification Component tests', () => {
  const mockApiResponse = (status) => {
    axios.put.mockResolvedValueOnce({ status });
  };

  test('navigates to "/report" if the API call is successful and screen size is md or larger', async () => {
    useMediaQuery.mockReturnValueOnce(true);

    // Mock the useParams hook to return a valid userEmail
    const validUserEmail = 'test@police.nsw.gov.au';
    require('react-router-dom').useParams.mockReturnValue({ userEmail: validUserEmail });

    // Mock useNavigate to return a function that can be called with the navigation argument
    const navigate = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(navigate);

    mockApiResponse(200);

    render(<EmailVerification />);

    // Wait for the asynchronous operations to complete
    await waitFor(() => {
      expect(navigate).toHaveBeenCalledTimes(1);
      
    }, { timeout: 3000 });
    expect(navigate).toHaveBeenCalledWith('/report');
  });

  test('navigates to "/login" if the API call is successful and screen size is smaller than md', async () => {
    // Mock the media query result to be false (smaller than md)
    useMediaQuery.mockReturnValueOnce(false);

    // Mock the useParams hook to return a valid userEmail
    const validUserEmail = 'test@police.nsw.gov.au';
    require('react-router-dom').useParams.mockReturnValue({ userEmail: validUserEmail });
 
    // Mock useNavigate to return a function that can be called with the navigation argument
    const navigate = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(navigate);

    // Mock a successful API response
    mockApiResponse(200);

    // Render the component
    render(<EmailVerification />);

    // Wait for the asynchronous operations to complete
    await waitFor(() => {
        expect(navigate).toHaveBeenCalledTimes(1);
        
    }, { timeout: 3000 }); 
    expect(navigate).toHaveBeenCalledWith('/login');
    });

});