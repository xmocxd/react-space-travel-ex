import React from 'react';

/**
 * Loading Component
 *
 * Purpose: Manage and display loading states during API response times.
 *
 * Props:
 * - message (string, optional): Custom loading message to display
 */
function Loading({ message = 'Loading...' }) {
  return (
    <div className="loading-component flex flex-col items-center justify-center gap-4 py-12">
      <div
        className="h-12 w-12 animate-spin rounded-full border-4 border-slate-500 border-t-cyan-400"
        aria-hidden
      />
      <p className="text-slate-300">{message}</p>
    </div>
  );
}

export default Loading;
