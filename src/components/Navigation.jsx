import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Navigation Component
 *
 * Purpose: Provide consistent navigation across all pages.
 */
function Navigation() {
  const linkClass = ({ isActive }) =>
    `navigation-link px-4 py-2 rounded-md font-medium transition-colors ${
      isActive
        ? 'bg-cyan-600 text-white'
        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
    }`;

  return (
    <nav className="navigation flex gap-2">
      <NavLink to="/" end className={linkClass}>
        Home
      </NavLink>
      <NavLink to="/spacecrafts" className={linkClass}>
        Spacecrafts
      </NavLink>
      <NavLink to="/planets" className={linkClass}>
        Planets
      </NavLink>
    </nav>
  );
}

export default Navigation;
