import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { SpacecraftProvider } from './context/SpacecraftContext';
import { PlanetProvider } from './context/PlanetContext';

/**
 * Wrap UI with MemoryRouter and context providers for page tests.
 * @param {React.ReactElement} ui - Component to render
 * @param {Object} options - { initialEntries = ['/'], initialIndex = 0 }
 */
export function renderWithProviders(ui, { initialEntries = ['/'], initialIndex = 0 } = {}) {
  function Wrapper({ children }) {
    return (
      <MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
        <SpacecraftProvider>
          <PlanetProvider>{children}</PlanetProvider>
        </SpacecraftProvider>
      </MemoryRouter>
    );
  }
  return render(ui, { wrapper: Wrapper });
}

/**
 * Render a page that lives under a route with params (e.g. /spacecrafts/:id).
 */
export function renderWithRoute(PageComponent, path, initialEntries) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route
          path={path}
          element={
            <SpacecraftProvider>
              <PlanetProvider>
                <PageComponent />
              </PlanetProvider>
            </SpacecraftProvider>
          }
        />
      </Routes>
    </MemoryRouter>
  );
}

export * from '@testing-library/react';
