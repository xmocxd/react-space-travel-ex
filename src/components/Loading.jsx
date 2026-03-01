import React from 'react';
import { Loader2 } from 'lucide-react';
import PropTypes from 'prop-types';

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
    <div className="loading-component flex flex-col items-center justify-center gap-4 py-12 sm:py-16">
      <Loader2
        className="h-10 w-10 animate-spin text-blue-500"
        aria-hidden
      />
      <p className="text-base text-zinc-400">{message}</p>
    </div>
  );
}

Loading.propTypes = {
  message: PropTypes.string,
};

export default Loading;
