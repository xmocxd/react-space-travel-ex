import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Spacecrafts from '../pages/Spacecrafts';
import SpacecraftDetails from '../pages/SpacecraftDetails';
import Construction from '../pages/Construction';
import Planets from '../pages/Planets';
import RootLayout from './RootLayout';
import RouteErrors from '../components/RouteErrors';
import NotFound from '../pages/NotFound';

import { Rocket, Globe } from 'lucide-react';

// define navigation pages/links here so it can be managed in one file
// do not include /, it will be added automatically in nav component
const pages = [
  { path: "spacecrafts/", title: "Spacecrafts", longTitle: "View Spacecrafts", icon: Rocket, showInNav: true },
  { path: "planets/", title: "Planets", longTitle: "View Planets", icon: Globe, showInNav: true },
  { path: "construction/", title: "Construction", longTitle: "Construct New Spacecraft", icon: Globe, showInNav: false },
]

const router = createBrowserRouter([
  {
    path: '/',
    // main element to display the routes within -- passing pages to render the nav
    element: <RootLayout pages={pages} />,
    errorElement: <RouteErrors />,
    children: [
      { index: '/', element: <Home pages={pages} />, },
      { path: 'spacecrafts', element: <Spacecrafts />, },
      { path: 'spacecrafts/:id', element: <SpacecraftDetails />, },
      { path: 'construction', element: <Construction />, },
      { path: 'planets', element: <Planets />, },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;