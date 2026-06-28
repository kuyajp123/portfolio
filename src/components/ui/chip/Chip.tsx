import React from 'react';

export const Chip = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="border border-gray-500/50 w-fit px-3 py-1 rounded text-sm font-medium hover:bg-gray-200 hover:dark:bg-gray-600">
      {children}
    </main>
  );
};
