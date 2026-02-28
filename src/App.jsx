import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes/AppRoutes';
import { SpacecraftProvider } from './context/SpacecraftContext';
import { PlanetProvider } from './context/PlanetContext';
import AppErrorBoundary from './components/AppErrorBoundary';

/**
 * Main App Component
 *
 * Purpose: Root component that sets up routing and global context providers.
 *
 * Structure:
 * - AppErrorBoundary: Catches render errors and shows fallback UI
 * - Context Providers: Wrap the app to provide global state
 * - RouterProvider: Provides the router created with createBrowserRouter
 */
function App() {
  return (
    <AppErrorBoundary>
      <SpacecraftProvider>
        <PlanetProvider>
          <RouterProvider router={router} />
        </PlanetProvider>
      </SpacecraftProvider>
    </AppErrorBoundary>
  );
}

export default App;
