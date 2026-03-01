import React from 'react';
import { Outlet } from 'react-router-dom';
import { Rocket } from 'lucide-react';
import Navigation from '../components/Navigation';

/**
 * RootLayout Component
 *
 * Purpose: Provides the main layout structure for all routes.
 * Contains the navigation and outlet for nested routes.
 */
function RootLayout() {
  return (
    <div className="app app-bg min-h-screen flex flex-col bg-zinc-950">
      {/* Centered wrapper: optimal reading width (max 72rem) at larger screens */}
      <div className="mx-auto flex w-full max-w-[72rem] flex-1 flex-col min-h-screen px-6 sm:px-8 lg:px-10">
        <header className="sticky top-0 z-10 -mx-6 border-b border-zinc-800/80 bg-zinc-900/95 backdrop-blur-md px-6 py-4 sm:-mx-8 sm:px-8 sm:py-5 lg:-mx-10 lg:px-10 lg:py-5">
          <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="flex items-center gap-2 text-xl font-semibold tracking-tight text-zinc-50 sm:text-xl">
              <Rocket className="h-5 w-5 text-blue-500 shrink-0" aria-hidden />
              Space Travel
            </h1>
            <Navigation />
          </div>
        </header>

        <main className="flex-1 w-full py-8 sm:py-10 lg:py-12">
          <Outlet />
        </main>

        <footer className="-mx-6 border-t border-zinc-800 bg-zinc-900/50 px-6 py-5 text-center text-base text-zinc-500 sm:-mx-8 sm:px-8 sm:py-6 lg:-mx-10 lg:px-10 lg:py-6">
          Space Travel — Manage your fleet across the solar system
        </footer>
      </div>
    </div>
  );
}

export default RootLayout;
