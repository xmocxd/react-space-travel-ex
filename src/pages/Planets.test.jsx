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

const waitForPlanets = () => screen.findAllByText('Mercury', { timeout: 3000 });

describe('Planets page', () => {
  beforeEach(() => resetSpaceTravelApiMock());

  it('renders heading, planet list, dispatch section, and container', async () => {
    const { container } = renderWithProviders(<Planets />);
    expect(screen.getByRole('heading', { name: /Planets/i })).toBeInTheDocument();
    const mercuries = await waitForPlanets();
    expect(mercuries.length).toBeGreaterThan(0);
    expect(screen.getAllByText('Earth').length).toBeGreaterThan(0);
    const expectedPlanets = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];
    for (const name of expectedPlanets) {
      expect((await screen.findAllByText(name, { timeout: 3000 })).length).toBeGreaterThan(0);
    }
    expect(screen.getByText(/Dispatch spacecraft/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Spacecraft/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Destination planet/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Dispatch/i })).toBeInTheDocument();
    expect(container.querySelector('.planets-page')).toBeInTheDocument();
  });

  it('dispatches spacecraft and updates UI', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Planets />);
    await waitForPlanets();
    await user.selectOptions(screen.getByLabelText(/Spacecraft/i), screen.getByRole('option', { name: /Prispax/ }));
    await user.selectOptions(screen.getByLabelText(/Destination planet/i), screen.getByRole('option', { name: 'Mars' }));
    await user.click(screen.getByRole('button', { name: /Dispatch/i }));
    await waitFor(() => expect(screen.getByRole('button', { name: /Dispatch/i })).toBeDisabled(), { timeout: 3000 });
  });

  it('after dispatch, spacecraft is shown at new planet and option updates', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Planets />);
    await waitForPlanets();
    await user.selectOptions(screen.getByLabelText(/Spacecraft/i), screen.getByRole('option', { name: /Prispax \(at Earth\)/ }));
    await user.selectOptions(screen.getByLabelText(/Destination planet/i), screen.getByRole('option', { name: 'Mars' }));
    await user.click(screen.getByRole('button', { name: /Dispatch/i }));
    await waitFor(() => expect(screen.getByRole('option', { name: /Prispax \(at Mars\)/ })).toBeInTheDocument(), { timeout: 3000 });
    expect(screen.queryByRole('option', { name: /Prispax \(at Earth\)/ })).not.toBeInTheDocument();
  });

  it('after dispatch, origin and destination populations update', async () => {
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
