import React from 'react';
import PropTypes from 'prop-types';

/**
 * ErrorMessage Component
 *
 * Purpose: Display error messages consistently across the application.
 *
 * Props:
 * - message (string): Error message to display
 * - onDismiss (function, optional): Handler to dismiss the error
 */
function ErrorMessage({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div className="error-message flex items-center gap-3 rounded-lg border border-red-500/50 bg-red-950/30 px-4 py-3 text-red-200">
      <span className="text-red-400" aria-hidden>
        ⚠
      </span>
      <p className="flex-1">{message}</p>
      {typeof onDismiss === 'function' && (
        <button
          type="button"
          onClick={onDismiss}
          className="rounded px-3 py-1 text-sm font-medium text-red-300 hover:bg-red-500/20"
        >
          Dismiss
        </button>
      )}
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onDismiss: PropTypes.func,
};

export default ErrorMessage;
