import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import SpaceTravelApi from '../services/SpaceTravelApi';

/**
 * Spacecraft Context
 *
 * Purpose: Provide global state management for spacecraft data across the application.
 *
 * Context Value:
 * - spacecraft (array): List of all spacecraft
 * - loading (boolean): Loading state for spacecraft operations
 * - error (string): Error message if any
 * - fetchSpacecraft (function): Fetch all spacecraft from API
 * - addSpacecraft (function): Create a new spacecraft
 * - removeSpacecraft (function): Decommission a spacecraft
 * - getSpacecraftById (function): Get a specific spacecraft by ID
 */

const SpacecraftContext = createContext();

export function useSpacecraft() {
  const context = useContext(SpacecraftContext);
  if (!context) {
    throw new Error('useSpacecraft must be used within a SpacecraftProvider');
  }
  return context;
}

export function SpacecraftProvider({ children }) {
  const [spacecraft, setSpacecraft] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSpacecraft = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await SpaceTravelApi.getSpacecrafts();
      if (res?.isError) {
        setError(res.data?.message ?? 'Failed to fetch spacecraft');
        return;
      }
      setSpacecraft(res?.data ?? []);
    } catch (err) {
      setError(err?.message ?? 'Failed to fetch spacecraft');
    } finally {
      setLoading(false);
    }
  }, []);

  const addSpacecraft = useCallback(async (data) => {
    setError(null);
    try {
      const res = await SpaceTravelApi.buildSpacecraft({
        name: data.name,
        capacity: Number(data.capacity),
        description: data.description,
        pictureUrl: data.pictureUrl,
      });
      if (res?.isError) {
        setError(res.data?.message ?? 'Failed to create spacecraft');
        return { success: false };
      }
      await fetchSpacecraft();
      return { success: true };
    } catch (err) {
      setError(err?.message ?? 'Failed to create spacecraft');
      return { success: false };
    }
  }, [fetchSpacecraft]);

  const removeSpacecraft = useCallback(
    async (id) => {
      setError(null);
      try {
        const res = await SpaceTravelApi.destroySpacecraftById({ id });
        if (res?.isError) {
          setError(res.data?.message ?? 'Failed to decommission spacecraft');
          return false;
        }
        setSpacecraft((prev) => prev.filter((s) => s.id !== id));
        return true;
      } catch (err) {
        setError(err?.message ?? 'Failed to decommission spacecraft');
        return false;
      }
    },
    []
  );

  const getSpacecraftById = useCallback(
    (id) => {
      return spacecraft.find((s) => s.id === id) ?? null;
    },
    [spacecraft]
  );

  useEffect(() => {
    fetchSpacecraft();
  }, [fetchSpacecraft]);

  const clearError = useCallback(() => setError(null), []);

  const value = {
    spacecraft,
    loading,
    error,
    clearError,
    fetchSpacecraft,
    addSpacecraft,
    removeSpacecraft,
    getSpacecraftById,
  };

  return (
    <SpacecraftContext.Provider value={value}>
      {children}
    </SpacecraftContext.Provider>
  );
}
