import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Spacecrafts from '../pages/Spacecrafts';
import Spacecraft from '../pages/Spacecraft';
import Construction from '../pages/Construction';
import Planets from '../pages/Planets';
import RootLayout from './RootLayout';

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
 * TODO: Implement the following features:
 * - Add route loaders for data fetching
 * - Add route actions for form submissions
 * - Implement error boundaries per route
 * - Add route guards if authentication is needed later
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
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
