import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home } from 'lucide-react';

function NavBar({ pages }) {
  // style links based on whether they are active
  const linkClass = ({ isActive }) =>
    `navigation-link min-h-[40px] min-w-[40px] inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
    ${
      isActive
      ? 'bg-blue-600 text-white shadow-sm shadow-blue-900/20'
      : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100'
    }
    `;

  return (
    <nav className="navigation flex flex-wrap gap-2">
      <NavLink to="/" end className={linkClass}>
        <Home className="h-4 w-4 shrink-0" />
        Home
      </NavLink>

      {pages.map((page) => 
        page.showInNav ? (
        <NavLink key={page.path} to={page.path} className={linkClass}>
          <page.icon className="h-4 w-4 shrink-0" />
          {page.title}
        </NavLink>
        ) : null
      )}
    </nav>
  );
}

export default NavBar;
