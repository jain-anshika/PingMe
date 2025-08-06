import React from 'react';

export const Component = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-8 h-8 border-4 border-transparent border-r-violet-400 rounded-full animate-spin animation-delay-150"></div>
      </div>
      <span className="ml-3 text-sm text-gray-300">Uploading...</span>
    </div>
  );
};

export default Component;
