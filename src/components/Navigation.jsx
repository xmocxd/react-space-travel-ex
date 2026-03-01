import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Rocket, Globe } from 'lucide-react';

/**
 * Navigation Component
 *
 * Purpose: Provide consistent navigation across all pages.
 */
function Navigation() {
  const linkClass = ({ isActive }) =>
    `navigation-link min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
      isActive
        ? 'bg-blue-600 text-white shadow-sm shadow-blue-900/20'
        : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100'
    }`;

  return (
    <nav className="navigation flex flex-wrap gap-3" aria-label="Main navigation">
      <NavLink to="/" end className={linkClass}>
        <Home className="h-4 w-4 shrink-0" aria-hidden />
        Home
      </NavLink>
      <NavLink to="/spacecrafts" className={linkClass}>
        <Rocket className="h-4 w-4 shrink-0" aria-hidden />
        Spacecrafts
      </NavLink>
      <NavLink to="/planets" className={linkClass}>
        <Globe className="h-4 w-4 shrink-0" aria-hidden />
        Planets
      </NavLink>
    </nav>
  );
}

export default Navigation;
