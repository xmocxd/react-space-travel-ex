import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, MapPin, ChevronRight, Trash2 } from 'lucide-react';
import PropTypes from 'prop-types';

/**
 * SpacecraftCard Component
 *
 * Purpose: Reusable card component to display spacecraft information in lists.
 *
 * Props:
 * - spacecraft (object): Spacecraft data to display
 * - currentPlanetName (string, optional): Name of current location planet
 * - onDecommission (function, optional): Handler for decommission action
 * - showActions (boolean, optional): Whether to show action buttons
 */
function SpacecraftCard({
  spacecraft,
  currentPlanetName,
  onDecommission,
  showActions = true,
}) {
  if (!spacecraft) return null;

  return (
    <div className="spacecraft-card rounded-xl border border-zinc-700/80 bg-zinc-900/60 p-6 shadow-sm ring-1 ring-zinc-800/30 transition-all hover:shadow-md hover:ring-zinc-700/50">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-blue-400">
          <Rocket className="h-5 w-5" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-zinc-50">{spacecraft.name}</h3>
          <p className="mt-2 text-base text-zinc-400">
            Capacity: {spacecraft.capacity?.toLocaleString() ?? '—'}
          </p>
          {spacecraft.description && (
            <p className="mt-1.5 line-clamp-2 text-base text-zinc-400">
              {spacecraft.description}
            </p>
          )}
          <p className="mt-2 flex items-center gap-1.5 text-base text-zinc-500">
            <MapPin className="h-4 w-4 shrink-0" aria-hidden />
            {currentPlanetName ?? `Planet ID ${spacecraft.currentLocation}`}
          </p>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-zinc-700/50 pt-5">
        <Link
          to={`/spacecrafts/${spacecraft.id}`}
          className="inline-flex min-h-[44px] items-center gap-1 text-base font-medium text-blue-400 hover:text-blue-300 transition-colors"
        >
          View details
          <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
        </Link>
        {showActions && typeof onDecommission === 'function' && (
          <button
            type="button"
            onClick={() => onDecommission(spacecraft.id)}
            className="inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-lg border border-red-900/60 bg-red-950/50 px-3 py-2.5 text-base font-medium text-red-300 hover:bg-red-900/50 transition-colors"
          >
            <Trash2 className="h-4 w-4 shrink-0" aria-hidden />
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
  }).isRequired,
  currentPlanetName: PropTypes.string,
  onDecommission: PropTypes.func,
  showActions: PropTypes.bool,
};

export default SpacecraftCard;
