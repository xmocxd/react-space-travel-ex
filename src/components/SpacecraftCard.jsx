import React from 'react';
import { Link } from 'react-router-dom';
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
    <div className="spacecraft-card rounded-xl border border-slate-600 bg-slate-800/50 p-5 shadow-lg">
      <h3 className="text-lg font-semibold text-white">{spacecraft.name}</h3>
      <p className="mt-1 text-sm text-slate-400">
        Capacity: {spacecraft.capacity?.toLocaleString() ?? '—'}
      </p>
      {spacecraft.description && (
        <p className="mt-2 line-clamp-2 text-sm text-slate-300">
          {spacecraft.description}
        </p>
      )}
      <p className="mt-2 text-sm text-slate-400">
        Location: {currentPlanetName ?? `Planet ID ${spacecraft.currentLocation}`}
      </p>
      <div className="mt-4 flex items-center gap-3">
        <Link
          to={`/spacecrafts/${spacecraft.id}`}
          className="text-cyan-400 hover:underline"
        >
          View details
        </Link>
        {showActions && typeof onDecommission === 'function' && (
          <button
            type="button"
            onClick={() => onDecommission(spacecraft.id)}
            className="rounded bg-red-600/80 px-3 py-1 text-sm text-white hover:bg-red-600"
          >
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

SpacecraftCard.defaultProps = {
  currentPlanetName: undefined,
  onDecommission: undefined,
  showActions: true,
};

export default SpacecraftCard;
