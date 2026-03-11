import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../test-utils';
import Spacecrafts from './Spacecrafts';

jest.mock('../services/SpaceTravelApi');

describe('Spacecrafts page', () => {
  it('renders heading, Construct link, list after load, and container', async () => {
    const { container } = renderWithProviders(<Spacecrafts />);
    expect(screen.getByRole('heading', { name: /Spacecrafts/i })).toBeInTheDocument();
    const constructLink = screen.getByRole('link', { name: /Construct New Spacecraft/i });
    expect(constructLink).toHaveAttribute('href', '/construction');
    expect(await screen.findByText('Prispax', { timeout: 3000 })).toBeInTheDocument();
    expect(container.querySelector('.spacecrafts-page')).toBeInTheDocument();
  });
});
