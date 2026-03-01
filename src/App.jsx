import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes/AppRoutes';
import { SpacecraftProvider } from './context/SpacecraftContext';
import { PlanetProvider } from './context/PlanetContext';
import AppErrorBoundary from './components/AppErrorBoundary';


// TODO:
// fix responsive

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
