import React, { createContext, useContext, useState, useEffect } from 'react';

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
 * 
 * TODO: Implement the following features:
 * - State management for spacecraft list
 * - Loading and error states
 * - CRUD operations for spacecraft
 * - Integration with SpaceTravelApi service
 * - Error handling
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
  // TODO: Add state for spacecraft list
  // TODO: Add state for loading status
  // TODO: Add state for errors

  // TODO: Implement fetchSpacecraft function
  // - Call API to get all spacecraft
  // - Update state with results
  // - Handle loading and errors

  // TODO: Implement addSpacecraft function
  // - Accept spacecraft data (name, capacity, description)
  // - Call API to create spacecraft
  // - Update local state on success
  // - Handle errors

  // TODO: Implement removeSpacecraft function
  // - Accept spacecraft ID
  // - Call API to decommission spacecraft
  // - Update local state on success
  // - Handle errors

  // TODO: Implement getSpacecraftById function
  // - Accept spacecraft ID
  // - Return spacecraft from state or fetch from API
  // - Handle errors

  // TODO: Fetch spacecraft on mount

  const value = {
    // TODO: Expose state and functions
  };

  return (
    <SpacecraftContext.Provider value={value}>
      {children}
    </SpacecraftContext.Provider>
  );
}
