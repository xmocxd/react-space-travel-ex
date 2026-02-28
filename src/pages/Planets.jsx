import React from 'react';

/**
 * Planets Page Component
 * 
 * Purpose: Display all planets with stationed spacecraft and enable spacecraft dispatching.
 * 
 * TODO: Implement the following features:
 * - Fetch and display all planets from API
 * - Show spacecraft stationed at each planet
 * - Provide UI for selecting a spacecraft to dispatch
 * - Provide UI for selecting destination planet
 * - Validate that destination differs from current location
 * - Submit dispatch action via API
 * - Handle loading states during fetching and dispatching
 * - Handle errors gracefully
 * - Refresh data after successful dispatch
 */
function Planets() {
  // TODO: Add state for planets list
  // TODO: Add state for selected spacecraft (for dispatching)
  // TODO: Add state for selected destination planet
  // TODO: Add state for loading status
  // TODO: Add state for errors

  // TODO: Fetch planets data on component mount

  // TODO: Implement spacecraft selection handler

  // TODO: Implement destination planet selection handler

  // TODO: Implement dispatch validation
  // - Ensure spacecraft is selected
  // - Ensure destination planet is selected
  // - Ensure destination differs from current location

  // TODO: Implement dispatch submit handler
  // - Validate dispatch request
  // - Call API to dispatch spacecraft
  // - Refresh planets data on success
  // - Show errors on failure

  return (
    <div className="planets-page">
      <h2>Planets</h2>
      {/* TODO: Add loading component */}
      {/* TODO: Add error display */}
      {/* TODO: Display planets list with:
          - Planet name
          - List of stationed spacecraft
          - Selection controls for dispatching
      */}
      {/* TODO: Add dispatch form/controls:
          - Spacecraft selector
          - Destination planet selector
          - Dispatch button
          - Validation error messages
      */}
    </div>
  );
}

export default Planets;
