import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';

/**
 * RootLayout Component
 * 
 * Purpose: Provides the main layout structure for all routes.
 * Contains the navigation and outlet for nested routes.
 * 
 * TODO: Implement the following features:
 * - Add global error boundary
 * - Add layout-level loading states
 * - Add any persistent UI elements (header, footer)
 */
function RootLayout() {
  return (
    <div className="app">
      <header>
        <h1>Space Travel</h1>
        <Navigation />
      </header>
      
      <main>
        {/* Outlet renders the matched child route */}
        <Outlet />
      </main>
      
      <footer>
        {/* TODO: Add footer content if needed */}
      </footer>
    </div>
  );
}

export default RootLayout;
