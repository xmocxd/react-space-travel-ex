import React, { useState, useCallback } from 'react';
import { usePlanets } from '../context/PlanetContext';
import { useSpacecraft } from '../context/SpacecraftContext';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import PlanetCard from '../components/PlanetCard';

/**
 * Planets Page Component
 *
 * Purpose: Display all planets with stationed spacecraft and enable spacecraft dispatching.
 */
function Planets() {
  const {
    planets,
    loading,
    error,
    fetchPlanets,
    dispatchSpacecraft,
    getSpacecraftAtPlanet,
    getPlanetById,
  } = usePlanets();
  const { spacecraft, fetchSpacecraft } = useSpacecraft();

  const [selectedSpacecraftId, setSelectedSpacecraftId] = useState('');
  const [selectedDestinationId, setSelectedDestinationId] = useState('');
  const [dispatchError, setDispatchError] = useState(null);
  const [dispatching, setDispatching] = useState(false);

  const selectedSpacecraft = selectedSpacecraftId
    ? spacecraft.find((s) => s.id === selectedSpacecraftId)
    : null;
  const currentPlanetId = selectedSpacecraft?.currentLocation;

  const handleSpacecraftSelect = useCallback((e) => {
    setSelectedSpacecraftId(e.target.value || '');
    setSelectedDestinationId('');
    setDispatchError(null);
  }, []);

  const handleDestinationSelect = useCallback((e) => {
    setSelectedDestinationId(e.target.value || '');
    setDispatchError(null);
  }, []);

  const validateDispatch = useCallback(() => {
    if (!selectedSpacecraftId) return 'Select a spacecraft';
    if (!selectedDestinationId) return 'Select a destination planet';
    if (selectedDestinationId === String(currentPlanetId)) {
      return 'Destination must be different from current location';
    }
    return null;
  }, [selectedSpacecraftId, selectedDestinationId, currentPlanetId]);

  const handleDispatch = useCallback(async () => {
    const err = validateDispatch();
    if (err) {
      setDispatchError(err);
      return;
    }
    setDispatchError(null);
    setDispatching(true);
    await dispatchSpacecraft(
      selectedSpacecraftId,
      Number(selectedDestinationId)
    );
    await fetchSpacecraft();
    setDispatching(false);
    setSelectedSpacecraftId('');
    setSelectedDestinationId('');
  }, [
    selectedSpacecraftId,
    selectedDestinationId,
    validateDispatch,
    dispatchSpacecraft,
    fetchSpacecraft,
  ]);

  return (
    <div className="planets-page">
      <h2 className="text-2xl font-bold text-white mb-6">Planets</h2>

      {error && <ErrorMessage message={error} />}
      {loading && <Loading message="Loading planets..." />}

      {!loading && !error && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10">
            {planets.map((planet) => (
              <PlanetCard
                key={planet.id}
                planet={planet}
                stationedSpacecraft={getSpacecraftAtPlanet(planet.id)}
              />
            ))}
          </div>

          <section className="rounded-xl border border-slate-600 bg-slate-800/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Dispatch spacecraft
            </h3>
            <div className="flex flex-wrap gap-4 items-end">
              <div>
                <label
                  htmlFor="spacecraft-select"
                  className="block text-sm text-slate-400 mb-1"
                >
                  Spacecraft
                </label>
                <select
                  id="spacecraft-select"
                  value={selectedSpacecraftId}
                  onChange={handleSpacecraftSelect}
                  className="rounded border border-slate-600 bg-slate-800 px-3 py-2 text-white min-w-[200px]"
                >
                  <option value="">Select spacecraft</option>
                  {spacecraft.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} (at {getPlanetById(s.currentLocation)?.name ?? s.currentLocation})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="destination-select"
                  className="block text-sm text-slate-400 mb-1"
                >
                  Destination planet
                </label>
                <select
                  id="destination-select"
                  value={selectedDestinationId}
                  onChange={handleDestinationSelect}
                  className="rounded border border-slate-600 bg-slate-800 px-3 py-2 text-white min-w-[200px]"
                >
                  <option value="">Select destination</option>
                  {planets
                    .filter((p) => p.id !== currentPlanetId)
                    .map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                </select>
              </div>
              <button
                type="button"
                onClick={handleDispatch}
                disabled={dispatching || !selectedSpacecraftId || !selectedDestinationId}
                className="rounded-lg bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-500 disabled:opacity-50"
              >
                {dispatching ? 'Dispatching...' : 'Dispatch'}
              </button>
            </div>
            {dispatchError && (
              <p className="mt-3 text-sm text-red-400">{dispatchError}</p>
            )}
          </section>
        </>
      )}
    </div>
  );
}

export default Planets;
