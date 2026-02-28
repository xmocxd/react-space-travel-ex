import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSpacecraft } from '../context/SpacecraftContext';
import { usePlanets } from '../context/PlanetContext';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import SpacecraftCard from '../components/SpacecraftCard';

/**
 * Spacecrafts Page Component (List View)
 *
 * Purpose: Display all spacecraft with their details and provide navigation options.
 */
function Spacecrafts() {
  const { spacecraft, loading, error, clearError, fetchSpacecraft, removeSpacecraft } =
    useSpacecraft();
  const { getPlanetById } = usePlanets();

  const handleDecommission = useCallback(
    async (id) => {
      if (!window.confirm('Decommission this spacecraft? This cannot be undone.'))
        return;
      const ok = await removeSpacecraft(id);
      if (ok) await fetchSpacecraft();
    },
    [removeSpacecraft, fetchSpacecraft]
  );

  return (
    <div className="spacecrafts-page">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Spacecrafts</h2>
        <Link
          to="/construction"
          className="rounded-lg bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-500"
        >
          Construct New Spacecraft
        </Link>
      </div>

      {error && (
        <ErrorMessage message={error} onDismiss={clearError} />
      )}
      {loading && <Loading message="Loading spacecraft..." />}

      {!loading && !error && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {spacecraft.map((craft) => (
            <SpacecraftCard
              key={craft.id}
              spacecraft={craft}
              currentPlanetName={getPlanetById(craft.currentLocation)?.name}
              onDecommission={handleDecommission}
              showActions
            />
          ))}
        </div>
      )}

      {!loading && !error && spacecraft.length === 0 && (
        <p className="text-slate-400">No spacecraft yet. Construct one to get started.</p>
      )}
    </div>
  );
}

export default Spacecrafts;
