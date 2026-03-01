import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';

function RouteErrors() {
  const error = useRouteError();
  const message = error?.message ?? error?.statusText ?? 'Something went wrong';

  return (
    <div className="flex flex-col items-center justify-center gap-5 rounded-xl border border-zinc-800 bg-zinc-900/60 p-8 text-center ring-1 ring-zinc-800/50">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-950/50 text-red-400">
        <AlertTriangle className="h-6 w-6" />
      </div>
      <h2 className="text-2xl font-semibold text-red-400">Error</h2>
      <p className="max-w-sm text-base text-zinc-400">{message}</p>
      <Link
        to="/"
        className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-base font-medium text-white hover:bg-blue-500 transition-colors shadow-sm shadow-blue-900/20"
      >
        <Home className="h-4 w-4 shrink-0" />
        Return to Home
      </Link>
    </div>
  );
}

export default RouteErrors;
