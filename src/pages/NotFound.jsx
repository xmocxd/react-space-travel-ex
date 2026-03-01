import { SearchX } from 'lucide-react';
import BackHomeButton from '../components/BackHomeButton';

function NotFound() {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-2xl rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5 text-center sm:p-6">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20">
          <SearchX className="h-8 w-8" />
        </div>
        <h2 className="mb-3 text-5xl font-bold tracking-tight text-zinc-50 sm:mb-4 sm:text-6xl">
          404
        </h2>
        <h3 className="mb-4 text-xl font-semibold text-zinc-300 sm:mb-6 sm:text-2xl">
          Page Not Found
        </h3>
        <p className="mb-6 text-base text-zinc-400 sm:mb-8 sm:text-lg">
          Sorry, the page you are looking for does not exist.
        </p>
        <div className="flex justify-center">
          <BackHomeButton />
        </div>
      </div>
    </div>
  );
}

export default NotFound;