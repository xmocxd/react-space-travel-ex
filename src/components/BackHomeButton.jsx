import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

function BackHomeButton() {
  return (
    <Link
      to="/"
      className="inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-base font-medium text-white shadow-sm shadow-blue-900/20 transition-colors hover:bg-blue-500"
    >
      <Home className="h-4 w-4 shrink-0" />
      Back to Home
    </Link>
  );
}

export default BackHomeButton;