import React from 'react';

export const Card = ({ children }: { children: React.ReactNode }) => {
  return <main className="w-full rounded-sm bg-gray-50 p-4 dark:bg-gray-800/30">{children}</main>;
};
