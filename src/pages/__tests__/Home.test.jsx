import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../Home';

const r = () => render(<MemoryRouter><Home /></MemoryRouter>);

describe('Home', () => {
  it('renders welcome heading and description', () => {
    r();
    expect(screen.getByRole('heading', { level: 2, name: /Welcome to Space Travel/i })).toBeInTheDocument();
    expect(screen.getByText(/Manage your fleet/)).toBeInTheDocument();
  });

  it('renders Features section', () => {
    r();
    expect(screen.getByRole('heading', { level: 3, name: /Features/i })).toBeInTheDocument();
    expect(screen.getByText(/View all spacecraft and their details/)).toBeInTheDocument();
    expect(screen.getByText(/Construct new spacecraft/)).toBeInTheDocument();
    expect(screen.getByText(/Decommission spacecraft/)).toBeInTheDocument();
    expect(screen.getByText(/View planets and stationed spacecraft/)).toBeInTheDocument();
    expect(screen.getByText(/Dispatch spacecraft from one planet to another/)).toBeInTheDocument();
  });

  it('renders nav links', () => {
    r();
    expect(screen.getByRole('link', { name: /View Spacecrafts/i })).toHaveAttribute('href', '/spacecrafts');
    expect(screen.getByRole('link', { name: /View Planets/i })).toHaveAttribute('href', '/planets');
    expect(screen.getByRole('link', { name: /Construct New Spacecraft/i })).toHaveAttribute('href', '/construction');
  });
});
