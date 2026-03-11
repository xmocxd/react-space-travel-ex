import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../test-utils';
import Planets from './Planets';

jest.mock('../services/SpaceTravelApi');
jest.mock('../components/PlanetCard', () => function MockPlanetCard({ planet }) {
  return <div data-testid="planet-card">{planet?.name}</div>;
});

describe('Planets page', () => {
  it('renders page heading', async () => {
    renderWithProviders(<Planets />);
    expect(screen.getByRole('heading', { name: /Planets/i })).toBeInTheDocument();
  });

  it('shows planet list after load', async () => {
    renderWithProviders(<Planets />);
    const mercuries = await screen.findAllByText('Mercury', { timeout: 3000 });
    expect(mercuries.length).toBeGreaterThan(0);
    expect(screen.getAllByText('Earth').length).toBeGreaterThan(0);
  });

  it('renders Dispatch spacecraft section', async () => {
    renderWithProviders(<Planets />);
    await screen.findAllByText('Mercury', { timeout: 3000 });
    expect(screen.getByText(/Dispatch spacecraft/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Spacecraft/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Destination planet/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Dispatch/i })).toBeInTheDocument();
  });

  it('renders planets page container', async () => {
    const { container } = renderWithProviders(<Planets />);
    await screen.findAllByText('Earth', { timeout: 3000 });
    expect(container.querySelector('.planets-page')).toBeInTheDocument();
  });
});
