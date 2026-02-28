import React from 'react';
import { useRouteError, Link } from 'react-router-dom';

/**
 * RouteErrorBoundary
 * Displays route-level errors from loaders/actions or child component errors.
 */
function RouteErrorBoundary() {
  const error = useRouteError();
  const message = error?.message ?? error?.statusText ?? 'Something went wrong';

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
      <h2 className="text-xl font-semibold text-red-400">Error</h2>
      <p className="text-slate-300">{message}</p>
      <Link to="/" className="text-cyan-400 hover:underline">
        Return to Home
      </Link>
    </div>
  );
}

export default RouteErrorBoundary;
