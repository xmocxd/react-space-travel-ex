import React from 'react';

/**
 * Spacecrafts Page Component (List View)
 * 
 * Purpose: Display all spacecraft with their details and provide navigation options.
 * 
 * TODO: Implement the following features:
 * - Fetch and display all spacecraft from the API
 * - Show spacecraft details (name, capacity, description, current location)
 * - Add navigation link to view individual spacecraft details
 * - Add button to navigate to construction page for creating new spacecraft
 * - Add decommission functionality for existing spacecraft
 * - Handle loading states while fetching data
 * - Handle errors gracefully
 */
function Spacecrafts() {
  // TODO: Add state for spacecraft list
  // TODO: Add state for loading status
  // TODO: Add state for errors

  // TODO: Fetch spacecraft data on component mount

  // TODO: Implement decommission handler function

  return (
    <div className="spacecrafts-page">
      <h2>Spacecrafts</h2>
      {/* TODO: Add loading component */}
      {/* TODO: Add error display */}
      {/* TODO: Add button to navigate to construction page */}
      {/* TODO: Map through spacecraft and display cards/list items */}
      {/* TODO: Each spacecraft should have:
          - Display of details
          - Link to individual spacecraft page
          - Decommission button
      */}
    </div>
  );
}

export default Spacecrafts;
