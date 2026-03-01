import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Plus } from 'lucide-react';
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
    <div className="spacecrafts-page space-y-8 sm:space-y-10">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-zinc-50">
          <Rocket className="h-5 w-5 text-blue-500 shrink-0" aria-hidden />
          Spacecrafts
        </h2>
        <Link
          to="/construction"
          className="inline-flex w-full min-h-[44px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-base font-medium text-white hover:bg-blue-500 transition-colors shadow-sm shadow-blue-900/20 sm:w-auto"
        >
          <Plus className="h-4 w-4 shrink-0" aria-hidden />
          Construct New Spacecraft
        </Link>
      </div>

      {error && (
        <ErrorMessage message={error} onDismiss={clearError} />
      )}
      {loading && <Loading message="Loading spacecraft..." />}

      {!loading && !error && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3">
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
        <div className="flex flex-col items-center gap-4 rounded-xl border border-zinc-700/80 border-dashed bg-zinc-900/40 px-6 py-12 text-center sm:px-8">
          <Rocket className="h-10 w-10 text-zinc-600" aria-hidden />
          <p className="text-base text-zinc-400">No spacecraft yet. Construct one to get started.</p>
        </div>
      )}
    </div>
  );
}

export default Spacecrafts;
