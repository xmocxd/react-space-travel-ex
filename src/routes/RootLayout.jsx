import React from 'react';
import { Outlet } from 'react-router-dom';
import { Rocket } from 'lucide-react';
import NavBar from '../components/Navigation';

function RootLayout({ pages }) {
  return (
    <div className="app app-bg min-h-screen flex flex-col bg-zinc-950">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col min-h-screen px-4 sm:px-6 lg:px-8">
        <header className="sticky top-0 z-10 -mx-4 border-b border-zinc-800/80 bg-zinc-900/95 backdrop-blur-md px-4 py-3 sm:-mx-6 sm:px-6 sm:py-3.5 lg:-mx-8 lg:px-8 lg:py-4">
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-zinc-50 sm:text-xl">
              <Rocket className="h-5 w-5 text-blue-500 shrink-0" />
              Space Travel Manager
            </h1>
            <NavBar pages={pages} />
          </div>
        </header>

        <main className="flex-1 w-full py-5 sm:py-6 lg:py-8">
          <Outlet />
        </main>

        <footer className="-mx-4 border-t border-zinc-800 bg-zinc-900/50 px-4 py-3 text-center text-sm text-zinc-500 sm:-mx-6 sm:px-6 sm:py-4 lg:-mx-8 lg:px-8">
          Space Travel Manager
        </footer>
      </div>
    </div>
  );
}

export default RootLayout;