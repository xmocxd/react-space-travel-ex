import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../test-utils';
import Spacecrafts from './Spacecrafts';
jest.mock('../services/SpaceTravelApi');

describe('Spacecrafts page', () => {
  it('renders page heading and Construct link', async () => {
    renderWithProviders(<Spacecrafts />);
    expect(screen.getByRole('heading', { name: /Spacecrafts/i })).toBeInTheDocument();
    const constructLink = screen.getByRole('link', { name: /Construct New Spacecraft/i });
    expect(constructLink).toBeInTheDocument();
    expect(constructLink).toHaveAttribute('href', '/construction');
  });

  it('shows spacecraft list after load', async () => {
    renderWithProviders(<Spacecrafts />);
    const name = await screen.findByText('Prispax', { timeout: 3000 });
    expect(name).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Spacecrafts/i })).toBeInTheDocument();
  });

  it('renders spacecrafts page container', async () => {
    const { container } = renderWithProviders(<Spacecrafts />);
    await screen.findByText('Prispax', { timeout: 3000 });
    expect(container.querySelector('.spacecrafts-page')).toBeInTheDocument();
  });
});
