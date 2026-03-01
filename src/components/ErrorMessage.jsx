import React from 'react';
import { AlertCircle } from 'lucide-react';
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
    <div className="error-message flex flex-wrap items-center gap-4 rounded-xl border border-red-900/60 bg-red-950/40 px-4 py-3 text-red-200 ring-1 ring-red-900/30 sm:flex-nowrap">
      <AlertCircle className="h-5 w-5 shrink-0 text-red-400" aria-hidden />
      <p className="flex-1 min-w-0 text-base">{message}</p>
      {typeof onDismiss === 'function' && (
        <button
          type="button"
          onClick={onDismiss}
          className="min-h-[44px] cursor-pointer rounded-lg border border-red-800/60 bg-red-900/30 px-3 py-2.5 text-base font-medium text-red-200 hover:bg-red-900/50 transition-colors"
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
