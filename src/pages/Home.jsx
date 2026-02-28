import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Home Page Component
 *
 * Purpose: Design a welcoming home page that outlines the application's functionality.
 */
function Home() {
  return (
    <div className="home-page">
      <section className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-white">Welcome to Space Travel</h2>
        <p className="mt-4 max-w-2xl mx-auto text-slate-300">
          Manage your fleet, dispatch spacecraft across the solar system, and
          explore planets with stationed vessels.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-xl font-semibold text-white mb-4">Features</h3>
        <ul className="grid gap-3 text-slate-300">
          <li>View all spacecraft and their details</li>
          <li>Construct new spacecraft (name, capacity, description)</li>
          <li>Decommission spacecraft</li>
          <li>View planets and stationed spacecraft</li>
          <li>Dispatch spacecraft from one planet to another</li>
        </ul>
      </section>

      <section className="flex flex-wrap gap-4">
        <Link
          to="/spacecrafts"
          className="rounded-xl border border-cyan-600 bg-cyan-600/20 px-6 py-4 text-cyan-300 hover:bg-cyan-600/40 transition-colors"
        >
          View Spacecrafts
        </Link>
        <Link
          to="/planets"
          className="rounded-xl border border-slate-600 bg-slate-700/50 px-6 py-4 text-slate-200 hover:bg-slate-600 transition-colors"
        >
          View Planets
        </Link>
        <Link
          to="/construction"
          className="rounded-xl border border-emerald-600 bg-emerald-600/20 px-6 py-4 text-emerald-300 hover:bg-emerald-600/40 transition-colors"
        >
          Construct New Spacecraft
        </Link>
      </section>
    </div>
  );
}

export default Home;
