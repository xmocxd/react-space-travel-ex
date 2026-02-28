import React from 'react';

/**
 * PlanetCard Component
 * 
 * Purpose: Reusable card component to display planet information.
 * 
 * Props:
 * - planet (object): Planet data to display
 * - stationedSpacecraft (array, optional): List of spacecraft at this planet
 * 
 * TODO: Implement the following features:
 * - Display planet name
 * - Display list of stationed spacecraft
 * - Display planet details (if available)
 * - Consistent styling
 */
function PlanetCard({ planet, stationedSpacecraft = [] }) {
  return (
    <div className="planet-card">
      {/* TODO: Display planet.name */}
      {/* TODO: Display count of stationed spacecraft */}
      {/* TODO: Map through stationedSpacecraft and display them */}
      {/* TODO: Add any additional planet information */}
    </div>
  );
}

export default PlanetCard;
