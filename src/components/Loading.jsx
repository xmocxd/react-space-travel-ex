import React from 'react';

/**
 * Loading Component
 * 
 * Purpose: Manage and display loading states during API response times.
 * 
 * Props:
 * - message (string, optional): Custom loading message to display
 * 
 * TODO: Implement the following features:
 * - Display a loading spinner or animation
 * - Show customizable loading message
 * - Style appropriately for visibility
 * - Consider adding animation for better UX
 */
function Loading({ message = 'Loading...' }) {
  return (
    <div className="loading-component">
      {/* TODO: Add loading spinner/animation */}
      {/* TODO: Add loading icon or graphic */}
      <p>{message}</p>
    </div>
  );
}

export default Loading;
