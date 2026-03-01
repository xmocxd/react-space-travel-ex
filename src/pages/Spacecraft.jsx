import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, FileText, MapPin } from 'lucide-react';
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
    <div className="spacecraft-page space-y-8 sm:space-y-10">
      <div>
        <Link
          to="/spacecrafts"
          className="inline-flex min-h-[44px] items-center gap-1.5 text-base font-medium text-blue-400 hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
          Back to Spacecrafts
        </Link>
      </div>

      {loading && <Loading message="Loading spacecraft..." />}
      {error && <ErrorMessage message={error} />}
      {showNotFound && (
        <ErrorMessage message="Spacecraft not found" />
      )}

      {!loading && !showNotFound && craft && (
        <div className="rounded-xl border border-zinc-700/80 bg-zinc-900/60 p-6 shadow-sm ring-1 ring-zinc-800/50 sm:p-7">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-50">{craft.name}</h2>
          <dl className="mt-6 space-y-5 sm:space-y-6">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-blue-400">
                <Users className="h-5 w-5" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <dt className="text-sm font-medium uppercase tracking-wider text-zinc-500">Capacity</dt>
                <dd className="mt-0.5 text-base text-zinc-100">
                  {craft.capacity?.toLocaleString() ?? '—'}
                </dd>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-blue-400">
                <FileText className="h-5 w-5" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <dt className="text-sm font-medium uppercase tracking-wider text-zinc-500">Description</dt>
                <dd className="mt-0.5 text-base text-zinc-400 leading-relaxed">{craft.description ?? '—'}</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-blue-400">
                <MapPin className="h-5 w-5" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <dt className="text-sm font-medium uppercase tracking-wider text-zinc-500">Current location</dt>
                <dd className="mt-0.5 text-base text-zinc-100">
                  {currentPlanet?.name ?? `Planet ID ${craft.currentLocation}`}
                </dd>
              </div>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
}

export default Spacecraft;
