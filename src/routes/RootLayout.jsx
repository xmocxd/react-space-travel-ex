import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';

/**
 * RootLayout Component
 *
 * Purpose: Provides the main layout structure for all routes.
 * Contains the navigation and outlet for nested routes.
 */
function RootLayout() {
  return (
    <div className="app min-h-screen flex flex-col">
      <header className="border-b border-slate-700 px-4 py-3">
        <h1 className="text-xl font-bold text-white">Space Travel</h1>
        <Navigation />
      </header>

      <main className="flex-1 px-4 py-6">
        <Outlet />
      </main>

      <footer className="border-t border-slate-700 px-4 py-3 text-center text-sm text-slate-500">
        Space Travel — Manage your fleet across the solar system
      </footer>
    </div>
  );
}

export default RootLayout;
