import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Spacecrafts from '../pages/Spacecrafts';
import Spacecraft from '../pages/Spacecraft';
import Construction from '../pages/Construction';
import Planets from '../pages/Planets';
import RootLayout from './RootLayout';
import RouteErrorBoundary from '../components/RouteErrorBoundary';

/**
 * Router Configuration
 *
 * Purpose: Define all application routes using createBrowserRouter.
 *
 * Routes:
 * - / : Home page
 * - /spacecrafts : List all spacecraft
 * - /spacecrafts/:id : Individual spacecraft detail page
 * - /construction : Create new spacecraft
 * - /planets : View and manage planets
 * - * : Redirect unmatched routes to homepage
 *
 * Error boundaries are set at the layout level to catch route/loader errors.
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'spacecrafts',
        element: <Spacecrafts />,
      },
      {
        path: 'spacecrafts/:id',
        element: <Spacecraft />,
      },
      {
        path: 'construction',
        element: <Construction />,
      },
      {
        path: 'planets',
        element: <Planets />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

export default router;
