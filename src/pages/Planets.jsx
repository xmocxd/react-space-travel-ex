import React, { useState, useEffect } from 'react';
import { Globe, Loader2, Send } from 'lucide-react';
import { usePlanets } from '../context/PlanetContext';
import { useSpacecraft } from '../context/SpacecraftContext';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import PlanetCard from '../components/PlanetCard';

function Planets() {
  const { planets, loading, error, clearError, fetchPlanets, dispatchSpacecraft, getSpacecraftAtPlanet, getPlanetById } = usePlanets();
  const { spacecraft, fetchSpacecraft, getSpacecraftById } = useSpacecraft();

  const [selectedSpacecraftId, setSelectedSpacecraftId] = useState('');

  // Force refetch API data when visiting the planets page so the list is always fresh
  useEffect(() => {
    fetchPlanets();
    fetchSpacecraft();
  }, [fetchPlanets, fetchSpacecraft]);

  const [selectedSpacecraft, setSelectedSpacecraft] = useState(null);
  const [selectedDestinationId, setSelectedDestinationId] = useState('');
  const [dispatchError, setDispatchError] = useState(null);
  const [dispatching, setDispatching] = useState(false);

  function handleSpacecraftSelect(e) {
    setSelectedSpacecraftId(e.target.value || '');
    setSelectedDestinationId('');
    setSelectedSpacecraft(getSpacecraftById(e.target.value) || null);
    setDispatchError(null);
  }

  function handleDestinationSelect(e) {
    setSelectedDestinationId(e.target.value || '');
    setDispatchError(null);
  }

  async function handleDispatch() {
    if (!selectedSpacecraftId) {
      setDispatchError('Select a spacecraft');
      return;
    }
    if (!selectedDestinationId) {
      setDispatchError('Select a destination planet');
      return;
    }
    if (selectedDestinationId === String(selectedSpacecraft.currentLocation)) {
      setDispatchError('Destination must be different from current location');
      return;
    }
    setDispatchError(null);
    setDispatching(true);
    await dispatchSpacecraft(selectedSpacecraftId, Number(selectedDestinationId));
    await fetchSpacecraft();
    setDispatching(false);
    setSelectedSpacecraftId('');
    setSelectedDestinationId('');
  }

  return (
    <div className="planets-page space-y-5 sm:space-y-6">
      <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-zinc-50 sm:text-2xl">
        <Globe className="h-5 w-5 text-blue-500 shrink-0" />
        Planets
      </h2>

      {
        error ? (
          <ErrorMessage message={error} onDismiss={clearError} />
        ) : loading ? (
          <Loading message="Loading planets..." />
        ) : (

          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {planets.map((planet) => (
                <PlanetCard
                  key={planet.id}
                  planet={planet}
                  stationedSpacecraft={getSpacecraftAtPlanet(planet.id)}
                />
              ))}
            </div>

            <section className="rounded-xl border border-zinc-700/80 bg-zinc-900/60 p-4 shadow-sm ring-1 ring-zinc-800/50 sm:p-5">
              <h3 className="flex items-center gap-2 text-base font-semibold text-zinc-50 mb-4 sm:text-lg">
                <Send className="h-4 w-4 text-blue-500 shrink-0" />
                Dispatch spacecraft
              </h3>
              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
                <div className="w-full min-w-0 sm:min-w-[200px] sm:max-w-xs">
                  <label
                    htmlFor="spacecraft-select"
                    className="block text-base font-medium text-zinc-400 mb-1.5"
                  >
                    Spacecraft
                  </label>
                  <select
                    id="spacecraft-select"
                    value={selectedSpacecraftId}
                    onChange={handleSpacecraftSelect}
                    className="w-full min-h-[44px] rounded-lg border border-zinc-600 bg-zinc-800/80 px-3 py-2.5 text-base text-zinc-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-colors sm:min-w-[200px]"
                  >
                    <option value="">Select spacecraft</option>
                    {spacecraft.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} (at {getPlanetById(s.currentLocation)?.name ?? s.currentLocation})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full min-w-0 sm:min-w-[200px] sm:max-w-xs">
                  <label
                    htmlFor="destination-select"
                    className="block text-base font-medium text-zinc-400 mb-1.5"
                  >
                    Destination planet
                  </label>
                  <select
                    id="destination-select"
                    value={selectedDestinationId}
                    onChange={handleDestinationSelect}
                    className="w-full min-h-[44px] rounded-lg border border-zinc-600 bg-zinc-800/80 px-3 py-2.5 text-base text-zinc-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-colors sm:min-w-[200px]"
                  >
                    <option value="">Select destination</option>
                    {planets
                      .filter((p) => p.id !== selectedSpacecraft?.currentLocation)
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
                  className="inline-flex w-full min-h-[44px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-base font-medium text-white hover:bg-blue-500 disabled:opacity-50 transition-colors shadow-sm shadow-blue-900/20 sm:w-auto"
                >
                  {dispatching ? (
                    <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4 shrink-0" />
                  )}
                  {dispatching ? 'Dispatching...' : 'Dispatch'}
                </button>
              </div>
              {dispatchError && (
                <p className="mt-4 text-sm text-red-400">{dispatchError}</p>
              )}
            </section>
          </>

        )
      }

    </div>
  );
}

export default Planets;
