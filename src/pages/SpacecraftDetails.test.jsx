import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRoute } from '../test-utils';
import SpacecraftDetails from './SpacecraftDetails';

jest.mock('../services/SpaceTravelApi');

describe('SpacecraftDetails page', () => {
  it('renders spacecraft details and Back link for valid id', async () => {
    renderWithRoute(SpacecraftDetails, '/spacecrafts/:id', ['/spacecrafts/prispax']);
    expect(await screen.findByRole('heading', { name: 'Prispax' }, { timeout: 5000 })).toBeInTheDocument();
    expect(screen.getByText(/Capacity/i)).toBeInTheDocument();
    expect(screen.getByText(/Description/i)).toBeInTheDocument();
    expect(screen.getByText(/Current location/i)).toBeInTheDocument();
    expect(screen.getByText('10000')).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /Back to Spacecrafts/i });
    expect(link).toHaveAttribute('href', '/spacecrafts');
  });

  it('shows error for unknown spacecraft id', async () => {
    renderWithRoute(SpacecraftDetails, '/spacecrafts/:id', ['/spacecrafts/unknown-id']);
    expect(await screen.findByText(/Spacecraft not found/i, { timeout: 5000 })).toBeInTheDocument();
  });
});
