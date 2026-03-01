import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Plus } from 'lucide-react';
import { useSpacecraft } from '../context/SpacecraftContext';
import { usePlanets } from '../context/PlanetContext';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import SpacecraftCard from '../components/SpacecraftCard';
import ConfirmModal from '../components/ConfirmModal';

function Spacecrafts() {
  const { spacecraft, loading, error, clearError, fetchSpacecraft, removeSpacecraft } = useSpacecraft();
  const { getPlanetById } = usePlanets();

  const [decommissionTargetId, setDecommissionTargetId] = useState(null);
  const [decommissioning, setDecommissioning] = useState(false);

  const openDecommissionModal = useCallback((id) => setDecommissionTargetId(id), []);
  const closeDecommissionModal = useCallback(() => setDecommissionTargetId(null), []);

  const handleConfirmDecommission = useCallback(
    async () => {
      if (!decommissionTargetId) return;
      setDecommissioning(true);
      const ok = await removeSpacecraft(decommissionTargetId);
      setDecommissioning(false);
      if (ok) {
        closeDecommissionModal();
        await fetchSpacecraft();
      }
    },
    [decommissionTargetId, removeSpacecraft, closeDecommissionModal, fetchSpacecraft]
  );

  const handleDecommission = useCallback((id) => openDecommissionModal(id), [openDecommissionModal]);
  
  return (
    <div className="spacecrafts-page space-y-5 sm:space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-zinc-50 sm:text-2xl">
          <Rocket className="h-5 w-5 text-blue-500 shrink-0" />
          Spacecrafts
        </h2>
        <Link
          to="/construction"
          className="inline-flex w-full min-h-[44px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-base font-medium text-white hover:bg-blue-500 transition-colors shadow-sm shadow-blue-900/20 sm:w-auto"
        >
          <Plus className="h-4 w-4 shrink-0" />
          Construct New Spacecraft
        </Link>
      </div>

    {
      error ? (
        <ErrorMessage message={error} onDismiss={clearError} />
      ) : loading ? (
        <Loading message="Loading spacecraft..." />
      ) : spacecraft.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
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
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-zinc-700/80 border-dashed bg-zinc-900/40 px-5 py-8 text-center sm:px-6">
        <Rocket className="h-10 w-10 text-zinc-600" />
        <p className="text-base text-zinc-400">No spacecraft in inventory - Click CONSTRUCT to add</p>
        </div>
      )
    }

      <ConfirmModal
        open={Boolean(decommissionTargetId)}
        onClose={closeDecommissionModal}
        onConfirm={handleConfirmDecommission}
        title="Decommission spacecraft"
        message="Decommission this spacecraft? This cannot be undone."
        confirmLabel="Decommission"
        cancelLabel="Cancel"
        variant="danger"
        loading={decommissioning}
      />
    </div>
  );
}

export default Spacecrafts;
