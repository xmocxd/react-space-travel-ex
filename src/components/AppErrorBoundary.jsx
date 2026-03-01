import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import PropTypes from 'prop-types';

/**
 * AppErrorBoundary
 * Catches JavaScript errors in the component tree and shows a fallback UI.
 */
class AppErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('AppErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-950 p-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-950/50 text-red-400">
            <AlertTriangle className="h-7 w-7" aria-hidden />
          </div>
          <h1 className="text-2xl font-bold text-red-400">Something went wrong</h1>
          <p className="max-w-md text-base text-zinc-400">{this.state.error?.message ?? 'An unexpected error occurred.'}</p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false, error: null })}
            className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-base font-medium text-white hover:bg-blue-500 transition-colors shadow-sm shadow-blue-900/20"
          >
            <RotateCcw className="h-4 w-4 shrink-0" aria-hidden />
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

AppErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppErrorBoundary;
