import { Link } from 'react-router-dom';
import { Rocket, MapPin, ChevronRight, Trash2 } from 'lucide-react';
import PropTypes from 'prop-types';
import { getShipImageSrc } from '../constants/shipImages';

const cardClass =
  'rounded-xl border border-zinc-700/80 bg-zinc-900/60 p-4 shadow-sm ring-1 ring-zinc-800/30 transition-all hover:shadow-md hover:ring-zinc-700/50 sm:p-5';

function SpacecraftCard({ spacecraft, currentPlanetName, onDecommission, showActions = true }) {
  if (!spacecraft) return null;

  const imgSrc = getShipImageSrc(spacecraft.pictureUrl);
  const location = currentPlanetName ?? `Planet ID ${spacecraft.currentLocation}`;

  return (
    <div className={`spacecraft-card ${cardClass}`}>
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-zinc-800 text-blue-400 ring-1 ring-zinc-700/50">
          {imgSrc ? <img src={imgSrc} alt="" className="h-full w-full object-cover" /> : <Rocket className="h-6 w-6" />}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-zinc-50 sm:text-lg">{spacecraft.name}</h3>
          <p className="mt-1.5 text-sm text-zinc-400">Capacity: {spacecraft.capacity?.toLocaleString() ?? '—'}</p>
          {spacecraft.description && (
            <p className="mt-1.5 line-clamp-2 text-base text-zinc-400">{spacecraft.description}</p>
          )}
          <p className="mt-2 flex items-center gap-1.5 text-base text-zinc-500">
            <MapPin className="h-4 w-4 shrink-0" />
            {location}
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-zinc-700/50 pt-4">
        <Link
          to={`/spacecrafts/${spacecraft.id}`}
          className="inline-flex min-h-[44px] items-center gap-1 text-base font-medium text-blue-400 transition-colors hover:text-blue-300"
        >
          View details
          <ChevronRight className="h-4 w-4 shrink-0" />
        </Link>
        {showActions && onDecommission && (
          <button
            type="button"
            onClick={() => onDecommission(spacecraft.id)}
            className="inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-lg border border-red-900/60 bg-red-950/50 px-3 py-2.5 text-base font-medium text-red-300 transition-colors hover:bg-red-900/50"
          >
            <Trash2 className="h-4 w-4 shrink-0" />
            Decommission
          </button>
        )}
      </div>
    </div>
  );
}

SpacecraftCard.propTypes = {
  spacecraft: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    capacity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    currentLocation: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    pictureUrl: PropTypes.string,
  }).isRequired,
  currentPlanetName: PropTypes.string,
  onDecommission: PropTypes.func,
  showActions: PropTypes.bool,
};

export default SpacecraftCard;
