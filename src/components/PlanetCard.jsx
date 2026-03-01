import React from 'react';
import { Globe, Rocket, Users } from 'lucide-react';
import PropTypes from 'prop-types';
import { getShipImageSrc } from '../constants/shipImages';

const planetModules = import.meta.glob('../img/planets/*.jpg', { eager: true, import: 'default' });
const PLANET_IMAGES = Object.fromEntries(
  Object.entries(planetModules).map(([path, src]) => [path.replace(/.*\/(\w+)\.jpg$/, '$1'), src])
);

function PlanetCard({ planet, stationedSpacecraft = [] }) {
  if (!planet) return null;

  const planetImage = PLANET_IMAGES[planet.name?.toLowerCase()];

  return (
    <div className="planet-card rounded-xl border border-zinc-700/80 bg-zinc-900/60 p-4 shadow-sm ring-1 ring-zinc-800/30 transition-all hover:shadow-md hover:ring-zinc-700/50 overflow-hidden sm:p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-zinc-800 text-blue-400 ring-1 ring-zinc-700/50">
          {planetImage ? <img src={planetImage} alt={planet.name} className="h-full w-full object-cover" /> : <Globe className="h-6 w-6" />}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-zinc-50 sm:text-lg">{planet.name}</h3>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-zinc-400">
            <Rocket className="h-4 w-4 shrink-0" />
            {stationedSpacecraft.length} spacecraft stationed
          </p>
          {stationedSpacecraft.length > 0 && (
            <ul className="mt-2.5 space-y-1.5">
              {stationedSpacecraft.map((craft) => {
                const src = getShipImageSrc(craft.pictureUrl);
                return (
                  <li key={craft.id} className="flex items-center gap-2.5 text-base text-zinc-400">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-zinc-800 ring-1 ring-zinc-700/50">
                      {src ? <img src={src} alt="" className="h-full w-full object-cover" /> : <Rocket className="h-4 w-4 text-blue-400" />}
                    </div>
                    <span>{craft.name}</span>
                  </li>
                );
              })}
            </ul>
          )}
          {planet.currentPopulation != null && (
            <p className="mt-2 flex items-center gap-1.5 text-sm text-zinc-500">
              <Users className="h-4 w-4 shrink-0" />
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
      pictureUrl: PropTypes.string,
    })
  ),
};

export default PlanetCard;
