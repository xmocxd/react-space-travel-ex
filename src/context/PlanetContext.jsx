import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import SpaceTravelApi from '../services/SpaceTravelApi';

const PlanetContext = createContext();

export function usePlanets() {
  const context = useContext(PlanetContext);
  if (!context) throw new Error('usePlanets must be used within a PlanetProvider');
  return context;
}

function PlanetProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [spacecraft, setSpacecraft] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPlanets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [planetsRes, spacecraftRes] = await Promise.all([
        SpaceTravelApi.getPlanets(),
        SpaceTravelApi.getSpacecrafts(),
      ]);
      const checks = [
        [planetsRes, 'Failed to fetch planets'],
        [spacecraftRes, 'Failed to fetch spacecraft'],
      ];
      for (const [res, msg] of checks) {
        if (res?.isError) {
          setError(res.data?.message ?? msg);
          return;
        }
      }
      setPlanets(planetsRes?.data ?? []);
      setSpacecraft(spacecraftRes?.data ?? []);
    } catch (err) {
      setError(err?.message ?? 'Failed to fetch planets');
    } finally {
      setLoading(false);
    }
  }, []);

  const dispatchSpacecraft = useCallback(
    async (spacecraftId, targetPlanetId) => {
      setError(null);
      try {
        const res = await SpaceTravelApi.sendSpacecraftToPlanet({ spacecraftId, targetPlanetId });
        if (res?.isError) {
          setError(res.data?.message ?? 'Failed to dispatch spacecraft');
          return;
        }
        await fetchPlanets();
      } catch (err) {
        setError(err?.message ?? 'Failed to dispatch spacecraft');
      }
    },
    [fetchPlanets]
  );

  const getPlanetById = useCallback((planetId) => planets.find((p) => p.id === planetId) ?? null, [planets]);
  const getSpacecraftAtPlanet = useCallback(
    (planetId) => spacecraft.filter((s) => s.currentLocation === planetId),
    [spacecraft]
  );

  useEffect(() => {
    fetchPlanets();
  }, [fetchPlanets]);

  const value = {
    planets,
    spacecraft,
    loading,
    error,
    clearError: () => setError(null),
    fetchPlanets,
    dispatchSpacecraft,
    getPlanetById,
    getSpacecraftAtPlanet,
  };

  return <PlanetContext.Provider value={value}>{children}</PlanetContext.Provider>;
}

PlanetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { PlanetProvider };
