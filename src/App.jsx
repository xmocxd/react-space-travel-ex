import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes/AppRoutes';
import { SpacecraftProvider } from './context/SpacecraftContext';
import { PlanetProvider } from './context/PlanetContext';

/**
 * Main App Component
 * 
 * Purpose: Root component that sets up routing and global context providers.
 * 
 * Structure:
 * - RouterProvider: Provides the router created with createBrowserRouter
 * - Context Providers: Wrap the app to provide global state
 *   - SpacecraftProvider: Manages spacecraft data
 *   - PlanetProvider: Manages planet data
 * 
 * TODO: Complete the following integrations:
 * - Ensure context providers wrap the router
 * - Add any additional global providers (auth, theme, etc.)
 * - Add error boundaries for better error handling
 */
function App() {
  return (
    <SpacecraftProvider>
      <PlanetProvider>
        <RouterProvider router={router} />
      </PlanetProvider>
    </SpacecraftProvider>
  );
}

export default App;
