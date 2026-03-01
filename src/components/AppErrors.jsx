import React from 'react';
import { AlertTriangle } from 'lucide-react';
import PropTypes from 'prop-types';

class AppErrors extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('AppErrors caught an error:', error, errorInfo);
  }

  render() {
    const { hasError, error } = this.state;
    const { children } = this.props;

    if (!hasError) return children;

    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-950 p-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-950/50 text-red-400">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <h1 className="text-2xl font-bold text-red-400">Something went wrong</h1>
        <p className="max-w-md text-base text-zinc-400">{error?.message ?? 'An unexpected error occurred.'}</p>
      </div>
    );
  }
}

AppErrors.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppErrors;
