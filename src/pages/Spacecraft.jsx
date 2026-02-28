import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSpacecraft } from '../context/SpacecraftContext';
import { usePlanets } from '../context/PlanetContext';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

/**
 * Spacecraft Page Component (Detail View)
 *
 * Purpose: Present comprehensive information about a particular spacecraft.
 */
function Spacecraft() {
  const { id } = useParams();
  const { getSpacecraftById, loading, error } = useSpacecraft();
  const { getPlanetById } = usePlanets();

  const craft = id ? getSpacecraftById(id) : null;
  const currentPlanet = craft ? getPlanetById(craft.currentLocation) : null;
  const showNotFound = !loading && !error && id && !craft;

  return (
    <div className="spacecraft-page">
      <div className="mb-4">
        <Link to="/spacecrafts" className="text-cyan-400 hover:underline">
          ← Back to Spacecrafts
        </Link>
      </div>

      {loading && <Loading message="Loading spacecraft..." />}
      {error && <ErrorMessage message={error} />}
      {showNotFound && (
        <ErrorMessage message="Spacecraft not found" />
      )}

      {!loading && !showNotFound && craft && (
        <div className="rounded-xl border border-slate-600 bg-slate-800/50 p-6">
          <h2 className="text-2xl font-bold text-white">{craft.name}</h2>
          <dl className="mt-4 space-y-2">
            <div>
              <dt className="text-sm text-slate-400">Capacity</dt>
              <dd className="text-white">
                {craft.capacity?.toLocaleString() ?? '—'}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-slate-400">Description</dt>
              <dd className="text-slate-300">{craft.description ?? '—'}</dd>
            </div>
            <div>
              <dt className="text-sm text-slate-400">Current location</dt>
              <dd className="text-white">
                {currentPlanet?.name ?? `Planet ID ${craft.currentLocation}`}
              </dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
}

export default Spacecraft;
