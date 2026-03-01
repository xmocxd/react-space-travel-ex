import React from 'react';
import PropTypes from 'prop-types';

/**
 * PlanetCard Component
 *
 * Purpose: Reusable card component to display planet information.
 *
 * Props:
 * - planet (object): Planet data to display
 * - stationedSpacecraft (array, optional): List of spacecraft at this planet
 */
function PlanetCard({ planet, stationedSpacecraft = [] }) {
  if (!planet) return null;

  return (
    <div className="planet-card rounded-xl border border-slate-600 bg-slate-800/50 p-5 shadow-lg">
      <h3 className="text-xl font-semibold text-white">{planet.name}</h3>
      <p className="mt-1 text-sm text-slate-400">
        {stationedSpacecraft.length} spacecraft stationed
      </p>
      {stationedSpacecraft.length > 0 && (
        <ul className="mt-3 space-y-1">
          {stationedSpacecraft.map((craft) => (
            <li key={craft.id} className="text-sm text-slate-300">
              {craft.name}
            </li>
          ))}
        </ul>
      )}
      {planet.currentPopulation != null && (
        <p className="mt-2 text-xs text-slate-500">
          Population: {planet.currentPopulation.toLocaleString()}
        </p>
      )}
    </div>
  );
}

PlanetCard.propTypes = {
  planet: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    currentPopulation: PropTypes.number,
  }).isRequired,
  stationedSpacecraft: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
    })
  ),
};

PlanetCard.defaultProps = {
  stationedSpacecraft: [],
};

export default PlanetCard;
