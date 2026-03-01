import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SpacecraftCard from '../SpacecraftCard';

const mockSpacecraft = {
  id: 'craft-1',
  name: 'Voyager',
  capacity: 5000,
  description: 'A reliable vessel.',
  currentLocation: 2,
};

function renderWithRouter(ui) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('SpacecraftCard', () => {
  it('renders spacecraft name and capacity', () => {
    renderWithRouter(<SpacecraftCard spacecraft={mockSpacecraft} />);
    expect(screen.getByText('Voyager')).toBeInTheDocument();
    expect(screen.getByText(/5,000/)).toBeInTheDocument();
  });

  it('renders current planet name when provided', () => {
    renderWithRouter(
      <SpacecraftCard spacecraft={mockSpacecraft} currentPlanetName="Earth" />
    );
    expect(screen.getByText(/Location: Earth/)).toBeInTheDocument();
  });

  it('renders planet ID when currentPlanetName is not provided', () => {
    renderWithRouter(<SpacecraftCard spacecraft={mockSpacecraft} />);
    expect(screen.getByText(/Location: Planet ID 2/)).toBeInTheDocument();
  });

  it('links to spacecraft detail page', () => {
    renderWithRouter(<SpacecraftCard spacecraft={mockSpacecraft} />);
    const link = screen.getByRole('link', { name: /view details/i });
    expect(link).toHaveAttribute('href', '/spacecrafts/craft-1');
  });

  it('calls onDecommission when Decommission is clicked', () => {
    const onDecommission = jest.fn();
    renderWithRouter(
      <SpacecraftCard
        spacecraft={mockSpacecraft}
        onDecommission={onDecommission}
        showActions
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /decommission/i }));
    expect(onDecommission).toHaveBeenCalledWith('craft-1');
  });

  it('does not render Decommission button when showActions is false', () => {
    renderWithRouter(
      <SpacecraftCard spacecraft={mockSpacecraft} showActions={false} />
    );
    expect(screen.queryByRole('button', { name: /decommission/i })).not.toBeInTheDocument();
  });

  it('returns null when spacecraft is null', () => {
    const { container } = renderWithRouter(<SpacecraftCard spacecraft={null} />);
    expect(container.firstChild).toBeNull();
  });
});
