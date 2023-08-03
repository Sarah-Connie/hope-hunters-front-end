import { render, screen, fireEvent } from '@testing-library/react';
import axios from '../api/axios'; // Import the mock of axios
import SignupForm from '../components/SignupForm';
import { waitFor } from '@testing-library/react';

jest.mock('../api/axios', () => ({
  post: jest.fn(),
}));

test('End-to-End Test, SignupForm submission and verification message', async () => {
  axios.post.mockResolvedValueOnce({ status: 200, data: { message: 'Signup successful' } });

  render(<SignupForm />);
  
  // Fill out the form
  const fullNameInput = screen.getByLabelText('Name:');
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const confirmPasswordInput = screen.getByLabelText('Confirm Password:');
  const policeRadio = screen.getByLabelText('No');
  const submitButton = screen.getByText('Sign Up');

  fireEvent.change(fullNameInput, { target: { value: 'John Doe' } });
  fireEvent.change(emailInput, { target: { value: 'johndoe@police.nsw.gov.au' } });
  fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
  fireEvent.change(confirmPasswordInput, { target: { value: 'testpassword' } });
  fireEvent.click(policeRadio);
  fireEvent.click(submitButton);

  await waitFor(() => {
    // Check if the verification message is displayed
    expect(screen.getByText('A verification link has been sent to your email! Please confirm to verify your account.')).toBeInTheDocument();
  });
});
