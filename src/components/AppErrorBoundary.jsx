import React from 'react';
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
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-900 p-8 text-center">
          <h1 className="text-2xl font-bold text-red-400">Something went wrong</h1>
          <p className="text-slate-300">{this.state.error?.message ?? 'An unexpected error occurred.'}</p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false, error: null })}
            className="rounded-lg bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-500"
          >
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
