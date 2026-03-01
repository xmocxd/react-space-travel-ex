import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SpacecraftCard from '../SpacecraftCard';

const craft = {
  id: 'craft-1',
  name: 'Voyager',
  capacity: 5000,
  description: 'A reliable vessel.',
  currentLocation: 2,
};

const r = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

describe('SpacecraftCard', () => {
  it('renders name and capacity', () => {
    r(<SpacecraftCard spacecraft={craft} />);
    expect(screen.getByText('Voyager')).toBeInTheDocument();
    expect(screen.getByText(/5,000/)).toBeInTheDocument();
  });

  it('renders current planet when provided', () => {
    r(<SpacecraftCard spacecraft={craft} currentPlanetName="Earth" />);
    expect(screen.getByText('Earth')).toBeInTheDocument();
  });

  it('renders planet ID when currentPlanetName missing', () => {
    r(<SpacecraftCard spacecraft={craft} />);
    expect(screen.getByText(/Planet ID 2/)).toBeInTheDocument();
  });

  it('links to detail page', () => {
    r(<SpacecraftCard spacecraft={craft} />);
    expect(screen.getByRole('link', { name: /view details/i })).toHaveAttribute('href', '/spacecrafts/craft-1');
  });

  it('calls onDecommission when Decommission clicked', () => {
    const fn = jest.fn();
    r(<SpacecraftCard spacecraft={craft} onDecommission={fn} showActions />);
    fireEvent.click(screen.getByRole('button', { name: /decommission/i }));
    expect(fn).toHaveBeenCalledWith('craft-1');
  });

  it('hides Decommission when showActions false', () => {
    r(<SpacecraftCard spacecraft={craft} showActions={false} />);
    expect(screen.queryByRole('button', { name: /decommission/i })).not.toBeInTheDocument();
  });

  it('returns null when spacecraft is null', () => {
    const { container } = r(<SpacecraftCard spacecraft={null} />);
    expect(container.firstChild).toBeNull();
  });
});
