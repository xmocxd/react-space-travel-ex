import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import SpaceTravelApi from '../services/SpaceTravelApi';

const SpacecraftContext = createContext();

const errMsg = (res, fallback) => res?.data?.message ?? res?.message ?? fallback;

export function useSpacecraft() {
  const context = useContext(SpacecraftContext);
  if (!context) throw new Error('useSpacecraft must be used within a SpacecraftProvider');
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
        setError(errMsg(res, 'Failed to fetch spacecraft'));
        return;
      }
      setSpacecraft(res?.data ?? []);
    } catch (err) {
      setError(errMsg(err, 'Failed to fetch spacecraft'));
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
        setError(errMsg(res, 'Failed to create spacecraft'));
        return { success: false };
      }
      await fetchSpacecraft();
      return { success: true };
    } catch (err) {
      setError(errMsg(err, 'Failed to create spacecraft'));
      return { success: false };
    }
  }, [fetchSpacecraft]);

  const removeSpacecraft = useCallback(async (id) => {
    setError(null);
    try {
      const res = await SpaceTravelApi.destroySpacecraftById({ id });
      if (res?.isError) {
        setError(errMsg(res, 'Failed to decommission spacecraft'));
        return false;
      }
      setSpacecraft((prev) => prev.filter((s) => s.id !== id));
      return true;
    } catch (err) {
      setError(errMsg(err, 'Failed to decommission spacecraft'));
      return false;
    }
  }, []);

  const getSpacecraftById = useCallback((id) => spacecraft.find((s) => s.id === id) ?? null, [spacecraft]);
  const clearError = useCallback(() => setError(null), []);

  useEffect(() => { fetchSpacecraft(); }, [fetchSpacecraft]);

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

  return <SpacecraftContext.Provider value={value}>{children}</SpacecraftContext.Provider>;
}

SpacecraftProvider.propTypes = { children: PropTypes.node.isRequired };
