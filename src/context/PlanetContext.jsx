import React, { createContext, useContext, useState, useEffect } from 'react';

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
 * 
 * TODO: Implement the following features:
 * - State management for planets list
 * - Loading and error states
 * - Fetch planets with stationed spacecraft
 * - Dispatch spacecraft to planets
 * - Integration with SpaceTravelApi service
 * - Error handling
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
  // TODO: Add state for planets list
  // TODO: Add state for loading status
  // TODO: Add state for errors

  // TODO: Implement fetchPlanets function
  // - Call API to get all planets
  // - Include stationed spacecraft for each planet
  // - Update state with results
  // - Handle loading and errors

  // TODO: Implement dispatchSpacecraft function
  // - Accept spacecraft ID and destination planet ID
  // - Validate that destination differs from current location
  // - Call API to dispatch spacecraft
  // - Refresh planets data on success
  // - Handle errors

  // TODO: Implement getPlanetById function
  // - Accept planet ID
  // - Return planet from state
  // - Handle errors

  // TODO: Fetch planets on mount

  const value = {
    // TODO: Expose state and functions
  };

  return (
    <PlanetContext.Provider value={value}>
      {children}
    </PlanetContext.Provider>
  );
}
