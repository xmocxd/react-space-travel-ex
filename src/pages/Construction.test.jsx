import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../test-utils';
import Construction from './Construction';

const mockNavigate = jest.fn();
jest.mock('../services/SpaceTravelApi');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Construction page', () => {
  beforeEach(() => mockNavigate.mockClear());

  it('renders heading, form, Back button, and container', () => {
    const { container } = renderWithProviders(<Construction />);
    expect(screen.getByRole('heading', { name: /Construct New Spacecraft/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Capacity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Construct/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Back/i })).toBeInTheDocument();
    expect(container.querySelector('.construction-page')).toBeInTheDocument();
  });

  it('constructs spacecraft with valid inputs and navigates', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Construction />);
    await user.type(screen.getByLabelText(/Name/i), 'ValidShip');
    await user.type(screen.getByLabelText(/Capacity/i), '500');
    await user.type(screen.getByLabelText(/Description/i), 'A valid description');
    await user.click(screen.getByRole('button', { name: /Construct/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/spacecrafts');
  });

  it('shows Name is required when name is empty', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Construction />);
    await user.type(screen.getByLabelText(/Capacity/i), '100');
    await user.type(screen.getByLabelText(/Description/i), 'Some description');
    await user.click(screen.getByRole('button', { name: /Construct/i }));
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('shows capacity error for invalid capacity (negative, non-numeric, or decimal)', async () => {
    const user = userEvent.setup();
    const msg = 'A whole, positive number is required';
    for (const capacity of ['-1', 'abc', '1.5']) {
      mockNavigate.mockClear();
      const { unmount } = renderWithProviders(<Construction />);
      await user.type(screen.getByLabelText(/Name/i), 'Ship');
      await user.type(screen.getByLabelText(/Capacity/i), capacity);
      await user.type(screen.getByLabelText(/Description/i), 'Desc');
      await user.click(screen.getByRole('button', { name: /Construct/i }));
      expect(screen.getByText(msg)).toBeInTheDocument();
      expect(mockNavigate).not.toHaveBeenCalled();
      unmount();
    }
  });

  it('shows Description is required when description is empty', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Construction />);
    await user.type(screen.getByLabelText(/Name/i), 'Ship');
    await user.type(screen.getByLabelText(/Capacity/i), '100');
    await user.click(screen.getByRole('button', { name: /Construct/i }));
    expect(screen.getByText('Description is required')).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
