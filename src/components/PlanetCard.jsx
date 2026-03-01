import React from 'react';
import { Globe, Rocket, Users } from 'lucide-react';
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
    <div className="planet-card rounded-xl border border-zinc-700/80 bg-zinc-900/60 p-6 shadow-sm ring-1 ring-zinc-800/30 transition-all hover:shadow-md hover:ring-zinc-700/50">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-blue-400">
          <Globe className="h-5 w-5" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-zinc-50">{planet.name}</h3>
          <p className="mt-2 flex items-center gap-1.5 text-base text-zinc-400">
            <Rocket className="h-4 w-4 shrink-0" aria-hidden />
            {stationedSpacecraft.length} spacecraft stationed
          </p>
          {stationedSpacecraft.length > 0 && (
            <ul className="mt-3.5 space-y-2">
              {stationedSpacecraft.map((craft) => (
                <li key={craft.id} className="text-base text-zinc-400">
                  {craft.name}
                </li>
              ))}
            </ul>
          )}
          {planet.currentPopulation != null && (
            <p className="mt-2 flex items-center gap-1.5 text-sm text-zinc-500">
              <Users className="h-4 w-4 shrink-0" aria-hidden />
              Population: {planet.currentPopulation.toLocaleString()}
            </p>
          )}
        </div>
      </div>
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

export default PlanetCard;
