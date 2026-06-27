import React from 'react';

export const Card = ({ children }: { children: React.ReactNode }) => {
  return <div className="bg-gray-50 dark:bg-gray-800/30 border-opacity-0 p-4 rounded-sm h-full w-full">{children}</div>;
};
