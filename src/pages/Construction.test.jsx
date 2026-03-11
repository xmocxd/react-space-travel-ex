import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../test-utils';
import Construction from './Construction';
jest.mock('../services/SpaceTravelApi');

describe('Construction page', () => {
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
});
