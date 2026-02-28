import React from 'react';

/**
 * SpacecraftCard Component
 * 
 * Purpose: Reusable card component to display spacecraft information in lists.
 * 
 * Props:
 * - spacecraft (object): Spacecraft data to display
 * - onDecommission (function, optional): Handler for decommission action
 * - showActions (boolean, optional): Whether to show action buttons
 * 
 * TODO: Implement the following features:
 * - Display spacecraft name, capacity, description
 * - Display current location/planet
 * - Link to detailed spacecraft view
 * - Optional decommission button
 * - Consistent styling
 */
function SpacecraftCard({ spacecraft, onDecommission, showActions = true }) {
  return (
    <div className="spacecraft-card">
      {/* TODO: Display spacecraft.name */}
      {/* TODO: Display spacecraft.capacity */}
      {/* TODO: Display spacecraft.description */}
      {/* TODO: Display spacecraft.currentPlanet or location */}
      {/* TODO: Add Link to spacecraft detail page */}
      {/* TODO: Conditionally render decommission button based on showActions */}
    </div>
  );
}

export default SpacecraftCard;
