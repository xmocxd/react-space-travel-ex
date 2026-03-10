import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes/AppRoutes';
import { SpacecraftProvider } from './context/SpacecraftContext';
import { PlanetProvider } from './context/PlanetContext';
import AppErrors from './components/AppErrors';


// REVIEW current
//
// OTHER


// m

// BUG - cannot construct ship - giving validation error
// show spacecraft images attached to the planet
// fix main page links styles
// add error message to each field of form
// figure out ship file names and update so they arent junky
// check population of planets

// check tests

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