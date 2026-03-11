import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes/AppRoutes';
import { SpacecraftProvider } from './context/SpacecraftContext';
import { PlanetProvider } from './context/PlanetContext';
import AppErrors from './components/AppErrors';

function App() {
  return (
    <AppErrors>
      <SpacecraftProvider>
        <PlanetProvider>
          <RouterProvider router={router} />
        </PlanetProvider>
      </SpacecraftProvider>
    </AppErrors>
  );
}

export default App;