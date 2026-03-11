import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../test-utils';
import Planets from './Planets';
import { resetSpaceTravelApiMock } from '../services/SpaceTravelApi';

jest.mock('../services/SpaceTravelApi');
jest.mock('../components/PlanetCard', () => function MockPlanetCard({ planet, stationedSpacecraft = [] }) {
  return (
    <div data-testid="planet-card">
      <span>{planet?.name}</span>
      {planet?.currentPopulation != null && <span data-testid="planet-population">Population: {planet.currentPopulation}</span>}
      <span>{stationedSpacecraft?.length ?? 0} spacecraft stationed</span>
    </div>
  );
});

describe('Planets page', () => {
  beforeEach(() => {
    resetSpaceTravelApiMock();
  });

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

  it('displays all expected planets on the planets page', async () => {
    const expectedPlanets = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];
    renderWithProviders(<Planets />);
    for (const name of expectedPlanets) {
      const elements = await screen.findAllByText(name, { timeout: 3000 });
      expect(elements.length).toBeGreaterThan(0);
    }
  });

  it('can dispatch a spaceship to a new planet', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Planets />);
    await screen.findAllByText('Mercury', { timeout: 3000 });
    await user.selectOptions(screen.getByLabelText(/Spacecraft/i), screen.getByRole('option', { name: /Prispax/ }));
    await user.selectOptions(screen.getByLabelText(/Destination planet/i), screen.getByRole('option', { name: 'Mars' }));
    await user.click(screen.getByRole('button', { name: /Dispatch/i }));
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Dispatch/i })).toBeDisabled();
    }, { timeout: 3000 });
  });

  it('after dispatch, the selected spaceship is shown as attached to the new planet', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Planets />);
    await screen.findAllByText('Mercury', { timeout: 3000 });
    const spacecraftSelect = screen.getByLabelText(/Spacecraft/i);
    await user.selectOptions(spacecraftSelect, screen.getByRole('option', { name: /Prispax \(at Earth\)/ }));
    await user.selectOptions(screen.getByLabelText(/Destination planet/i), screen.getByRole('option', { name: 'Mars' }));
    await user.click(screen.getByRole('button', { name: /Dispatch/i }));
    await waitFor(() => {
      expect(screen.getByRole('option', { name: /Prispax \(at Mars\)/ })).toBeInTheDocument();
    }, { timeout: 3000 });
    expect(screen.queryByRole('option', { name: /Prispax \(at Earth\)/ })).not.toBeInTheDocument();
  });

  it('after dispatch, origin planet population is reduced by capacity and destination is increased', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Planets />);
    await screen.findByText('Population: 100000', {}, { timeout: 3000 });
    await user.selectOptions(screen.getByLabelText(/Spacecraft/i), screen.getByRole('option', { name: /Prispax \(at Earth\)/ }));
    await user.selectOptions(screen.getByLabelText(/Destination planet/i), screen.getByRole('option', { name: 'Mars' }));
    await user.click(screen.getByRole('button', { name: /Dispatch/i }));
    await waitFor(() => {
      expect(screen.getByText('Population: 90000')).toBeInTheDocument();
      expect(screen.getByText('Population: 10000')).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
