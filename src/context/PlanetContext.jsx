import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import SpaceTravelApi from '../services/SpaceTravelApi';

/**
 * Planet Context
 *
 * Purpose: Provide global state management for planet data across the application.
 *
 * Context Value:
 * - planets (array): List of all planets with stationed spacecraft
 * - loading (boolean): Loading state for planet operations
 * - error (string): Error message if any
 * - fetchPlanets (function): Fetch all planets from API
 * - dispatchSpacecraft (function): Send spacecraft to a planet
 * - getPlanetById (function): Get a specific planet by ID
 */

const PlanetContext = createContext();

export function usePlanets() {
  const context = useContext(PlanetContext);
  if (!context) {
    throw new Error('usePlanets must be used within a PlanetProvider');
  }
  return context;
}

export function PlanetProvider({ children }) {
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
      if (planetsRes?.isError) {
        setError(planetsRes.data?.message ?? 'Failed to fetch planets');
        return;
      }
      if (spacecraftRes?.isError) {
        setError(spacecraftRes.data?.message ?? 'Failed to fetch spacecraft');
        return;
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
        const res = await SpaceTravelApi.sendSpacecraftToPlanet({
          spacecraftId,
          targetPlanetId,
        });
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

  const getPlanetById = useCallback(
    (planetId) => {
      return planets.find((p) => p.id === planetId) ?? null;
    },
    [planets]
  );

  const getSpacecraftAtPlanet = useCallback(
    (planetId) => {
      return spacecraft.filter((s) => s.currentLocation === planetId);
    },
    [spacecraft]
  );

  const clearError = useCallback(() => setError(null), []);

  useEffect(() => {
    fetchPlanets();
  }, [fetchPlanets]);

  const value = {
    planets,
    spacecraft,
    loading,
    error,
    clearError,
    fetchPlanets,
    dispatchSpacecraft,
    getPlanetById,
    getSpacecraftAtPlanet,
  };

  return (
    <PlanetContext.Provider value={value}>
      {children}
    </PlanetContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
