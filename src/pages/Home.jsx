import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, List, Wrench, Trash2, Globe, Send, Plus } from 'lucide-react';

/**
 * Home Page Component
 *
 * Purpose: Design a welcoming home page that outlines the application's functionality.
 */
function Home() {
  return (
    <div className="home-page space-y-10 sm:space-y-12 lg:space-y-14">
      <section className="text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20">
          <Rocket className="h-8 w-8" aria-hidden />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-50 sm:text-3xl lg:text-4xl">
          Welcome to Space Travel
        </h2>
        <p className="mt-5 max-w-2xl mx-auto text-zinc-400 text-base leading-relaxed sm:text-lg">
          Manage your fleet, dispatch spacecraft across the solar system, and
          explore planets with stationed vessels.
        </p>
      </section>

      <section className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-6 sm:p-7">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-zinc-100 mb-5">
          <List className="h-4 w-4 text-blue-500 shrink-0" aria-hidden />
          Features
        </h3>
        <ul className="space-y-4 text-zinc-400">
          {[
            { icon: List, text: 'View all spacecraft and their details' },
            { icon: Wrench, text: 'Construct new spacecraft (name, capacity, description)' },
            { icon: Trash2, text: 'Decommission spacecraft' },
            { icon: Globe, text: 'View planets and stationed spacecraft' },
            { icon: Send, text: 'Dispatch spacecraft from one planet to another' },
          ].map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-start gap-3 sm:items-center">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-zinc-800 text-blue-400 sm:mt-0" aria-hidden>
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-base">{text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-4">
        <Link
          to="/spacecrafts"
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800/80 px-5 py-3.5 text-base font-medium text-zinc-100 hover:border-blue-500/50 hover:bg-zinc-800 transition-all duration-200 sm:px-6"
        >
          <Rocket className="h-4 w-4 shrink-0" aria-hidden />
          View Spacecrafts
        </Link>
        <Link
          to="/planets"
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800/80 px-5 py-3.5 text-base font-medium text-zinc-100 hover:border-blue-500/50 hover:bg-zinc-800 transition-all duration-200 sm:px-6"
        >
          <Globe className="h-4 w-4 shrink-0" aria-hidden />
          View Planets
        </Link>
        <Link
          to="/construction"
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-base font-medium text-white hover:bg-blue-500 transition-all duration-200 shadow-sm shadow-blue-900/25 sm:px-6"
        >
          <Plus className="h-4 w-4 shrink-0" aria-hidden />
          Construct New Spacecraft
        </Link>
      </section>
    </div>
  );
}

export default Home;
