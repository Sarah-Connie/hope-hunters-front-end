import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SortMenu from '../components/SortingMenu';

// Mock the axios module
jest.mock('../api/axios', () => ({
    get: jest.fn().mockResolvedValue({ data: [] }),
  }));

describe('SortMenu Component Tests', () => {
  test('renders SortMenu component with default selected option', () => {
    // Render the SortMenu with default selectedOption as an empty string
    render(<SortMenu onSortChange={() => {}} selectedOption="" />);

    // Check if the "Select" option is rendered as the default selected option
    const selectElement = screen.getByLabelText('Sort By:');
    expect(selectElement.value).toBe('');

    // Check if all the sorting options are rendered
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(8); // There should be 8 sorting options including the default "Select" option
  });

  test('calls onSortChange when a new option is selected', () => {
    // Mock the onSortChange function
    const mockOnSortChange = jest.fn();

    // Render the SortMenu with a selected option
    render(<SortMenu onSortChange={mockOnSortChange} selectedOption="ageAsc" />);

    // Change the selected option
    const selectElement = screen.getByLabelText('Sort By:');
    fireEvent.change(selectElement, { target: { value: 'dateLastSeenDesc' } });

    // Check if the onSortChange function is called with the correct value
    expect(mockOnSortChange).toHaveBeenCalledWith('dateLastSeenDesc');
  });
  
});
