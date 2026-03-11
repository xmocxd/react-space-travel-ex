import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

const mockPages = [
  { path: 'spacecrafts/', title: 'Spacecrafts', longTitle: 'View Spacecrafts', icon: () => null, showInNav: true },
  { path: 'planets/', title: 'Planets', longTitle: 'View Planets', icon: () => null, showInNav: true },
];

function renderHome(pages = mockPages) {
  return render(
    <MemoryRouter>
      <Home pages={pages} />
    </MemoryRouter>
  );
}

describe('Home page', () => {
  it('renders heading, tagline, nav links, and container', () => {
    const { container } = renderHome();
    expect(screen.getByRole('heading', { name: /Space Travel Manager/i })).toBeInTheDocument();
    expect(screen.getByText(/Manage your fleet/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /View Spacecrafts/i })).toHaveAttribute('href', '/spacecrafts/');
    expect(screen.getByRole('link', { name: /View Planets/i })).toHaveAttribute('href', '/planets/');
    expect(container.querySelector('.home-page')).toBeInTheDocument();
  });
});
