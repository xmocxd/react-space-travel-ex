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
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders heading and form', () => {
    renderWithProviders(<Construction />);
    expect(screen.getByRole('heading', { name: /Construct New Spacecraft/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Capacity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Construct/i })).toBeInTheDocument();
  });

  it('renders Back button', () => {
    renderWithProviders(<Construction />);
    expect(screen.getByRole('button', { name: /Back/i })).toBeInTheDocument();
  });

  it('renders construction page container', () => {
    const { container } = renderWithProviders(<Construction />);
    expect(container.querySelector('.construction-page')).toBeInTheDocument();
  });

  it('successfully constructs a spaceship with valid inputs for all fields', async () => {
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

  it('shows capacity error when capacity is not a positive integer', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Construction />);
    await user.type(screen.getByLabelText(/Name/i), 'Ship');
    await user.type(screen.getByLabelText(/Capacity/i), '-1');
    await user.type(screen.getByLabelText(/Description/i), 'Desc');
    await user.click(screen.getByRole('button', { name: /Construct/i }));
    expect(screen.getByText('A whole, positive number is required')).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('shows capacity error for non-numeric capacity', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Construction />);
    await user.type(screen.getByLabelText(/Name/i), 'Ship');
    await user.type(screen.getByLabelText(/Capacity/i), 'abc');
    await user.type(screen.getByLabelText(/Description/i), 'Desc');
    await user.click(screen.getByRole('button', { name: /Construct/i }));
    expect(screen.getByText('A whole, positive number is required')).toBeInTheDocument();
  });

  it('shows capacity error for decimal capacity', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Construction />);
    await user.type(screen.getByLabelText(/Name/i), 'Ship');
    await user.type(screen.getByLabelText(/Capacity/i), '1.5');
    await user.type(screen.getByLabelText(/Description/i), 'Desc');
    await user.click(screen.getByRole('button', { name: /Construct/i }));
    expect(screen.getByText('A whole, positive number is required')).toBeInTheDocument();
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

  it('does not create spaceship with negative capacity', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Construction />);
    await user.type(screen.getByLabelText(/Name/i), 'BadShip');
    await user.type(screen.getByLabelText(/Capacity/i), '-10');
    await user.type(screen.getByLabelText(/Description/i), 'Invalid capacity');
    await user.click(screen.getByRole('button', { name: /Construct/i }));
    expect(screen.getByText('A whole, positive number is required')).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('does not create spaceship with invalid capacity', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Construction />);
    await user.type(screen.getByLabelText(/Name/i), 'BadShip');
    await user.type(screen.getByLabelText(/Capacity/i), 'zero');
    await user.type(screen.getByLabelText(/Description/i), 'Invalid');
    await user.click(screen.getByRole('button', { name: /Construct/i }));
    expect(screen.getByText('A whole, positive number is required')).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
