import React from 'react';
import { Loader2 } from 'lucide-react';
import PropTypes from 'prop-types';

function Loading({ message = 'Loading...' }) {
  return (
    <div className="loading-component flex flex-col items-center justify-center gap-4 py-8 sm:py-10">
      <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
      <p className="text-base text-zinc-400">{message}</p>
    </div>
  );
}

Loading.propTypes = {
  message: PropTypes.string,
};

export default Loading;
