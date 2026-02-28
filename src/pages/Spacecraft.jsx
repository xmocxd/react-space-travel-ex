import React from 'react';
import { useParams } from 'react-router-dom';

/**
 * Spacecraft Page Component (Detail View)
 * 
 * Purpose: Present comprehensive information about a particular spacecraft.
 * 
 * TODO: Implement the following features:
 * - Extract spacecraft ID from URL params
 * - Fetch detailed spacecraft data from API
 * - Display all spacecraft information (name, capacity, description, current planet)
 * - Add navigation to return to spacecrafts list
 * - Show stationed planet information
 * - Handle loading states
 * - Handle errors (e.g., spacecraft not found)
 */
function Spacecraft() {
  // TODO: Get spacecraft ID from URL params using useParams
  const { id } = useParams();

  // TODO: Add state for spacecraft data
  // TODO: Add state for loading status
  // TODO: Add state for errors

  // TODO: Fetch spacecraft details on component mount or when ID changes

  return (
    <div className="spacecraft-page">
      <h2>Spacecraft Details</h2>
      {/* TODO: Add loading component */}
      {/* TODO: Add error display */}
      {/* TODO: Add back navigation button */}
      {/* TODO: Display comprehensive spacecraft information:
          - Name
          - Capacity
          - Description
          - Current planet/location
          - Any other relevant details
      */}
    </div>
  );
}

export default Spacecraft;
