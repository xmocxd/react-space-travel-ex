import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, FileText, MapPin, Rocket } from 'lucide-react';
import { useSpacecraft } from '../context/SpacecraftContext';
import { usePlanets } from '../context/PlanetContext';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { getShipImageSrc } from '../constants/shipImages';

function SpacecraftDetails() {
  const { id } = useParams(); // get the spacecraft ID from the URL
  const { getSpacecraftById, loading, error } = useSpacecraft();
  const { getPlanetById } = usePlanets();

  const craft = id ? getSpacecraftById(id) : null;

  const backHTML = (
    <Link
      to="/spacecrafts"
      className="inline-flex min-h-[44px] items-center gap-1.5 text-base font-medium text-blue-400 hover:text-blue-300 transition-colors"
    >
      <ArrowLeft className="h-4 w-4 shrink-0" />
      Back to Spacecrafts
    </Link>
  );

  if (!craft) {
    // quit if no id or craft is not found by getSpacecraftById
    return (
      <div className="spacecraft-page space-y-5 sm:space-y-6">
        <div>
          { backHTML }

          <ErrorMessage message="Spacecraft not found" />
        </div>
      </div>
    );
  }
  
  if (error) {
    // quit on error
    return (
      <div className="spacecraft-page space-y-5 sm:space-y-6">
        <div>
          { backHTML }

          <ErrorMessage message={error} />
        </div>
      </div>
    );
  } 

  const currentPlanet = getPlanetById(craft.currentLocation);
  const shipImageSrc = getShipImageSrc(craft.pictureUrl);

  return (
    <div className="spacecraft-page space-y-8 sm:space-y-10">
      <div>
        {backHTML}
        {loading ? (<Loading message="Loading spacecraft..." />) :
          (
            <div className="rounded-xl border border-zinc-700/80 bg-zinc-900/60 p-4 shadow-sm ring-1 ring-zinc-800/50 sm:p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-70 w-70 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-zinc-800 text-blue-400 ring-1 ring-zinc-700/50">
                  {shipImageSrc ? (
                    <img src={shipImageSrc} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <Rocket className="h-16 w-16" />
                  )}
                </div>
                <h2 className="text-xl font-bold tracking-tight text-zinc-50 pt-1 sm:text-2xl">{craft.name}</h2>
              </div>
              <dl className="mt-4 space-y-4 sm:space-y-5">
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-blue-400">
                    <Users className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <dt className="text-sm font-medium uppercase tracking-wider text-zinc-500">Capacity</dt>
                    <dd className="mt-0.5 text-base text-zinc-100">
                      {craft.capacity?.toString() ?? '—'}
                    </dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-blue-400">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <dt className="text-sm font-medium uppercase tracking-wider text-zinc-500">Description</dt>
                    <dd className="mt-0.5 text-base text-zinc-400 leading-relaxed">{craft.description ?? '—'}</dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-blue-400">
                    <MapPin className="h-5 w-5" />
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
          )
        }
      </div>
    </div>
  );
}

export default SpacecraftDetails;
