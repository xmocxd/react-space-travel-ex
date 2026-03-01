import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, List, Wrench, Trash2, Globe, Send, Plus } from 'lucide-react';

function Home({ pages }) {
  return (
    <div className="home-page space-y-6 sm:space-y-8">
      <section className="text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20">
          <Rocket className="h-7 w-7" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-zinc-50 sm:text-2xl lg:text-3xl">
          Space Travel Manager
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-zinc-400 text-sm leading-relaxed sm:text-base">
          Manage your fleet, and explore the solar system!
        </p>
      </section>

      <section className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4 sm:p-5">
        {pages.map(({ path, title, longTitle, icon: Icon }) => (
          <div key={path}>
            <Link to={`/${path}`} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800/80 px-4 py-2.5 text-sm font-medium text-zinc-100 hover:border-blue-500/50 hover:bg-zinc-800 transition-all duration-200 sm:px-5" >
              <Icon className="h-4 w-4 shrink-0" />
              {longTitle}
            </Link>
          </div>
        ))}
      </section>

    </div>
  );
}

export default Home;
