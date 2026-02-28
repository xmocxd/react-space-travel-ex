import React from 'react';

/**
 * ErrorMessage Component
 * 
 * Purpose: Display error messages consistently across the application.
 * 
 * Props:
 * - message (string): Error message to display
 * - onDismiss (function, optional): Handler to dismiss the error
 * 
 * TODO: Implement the following features:
 * - Display error message prominently
 * - Optional dismiss button
 * - Error styling (red/warning colors)
 * - Icon for visual indication
 */
function ErrorMessage({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div className="error-message">
      {/* TODO: Add error icon */}
      <p>{message}</p>
      {/* TODO: Conditionally render dismiss button if onDismiss is provided */}
    </div>
  );
}

export default ErrorMessage;
