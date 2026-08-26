import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'award' | 'accent';
  className?: string;
}

export const Badge = ({ children, variant = 'default', className = '' }: BadgeProps) => {
  if (variant === 'award') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold tracking-wide bg-amber-500/10 dark:bg-amber-400/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 dark:border-amber-400/20 ${className}`}
      >
        {children}
      </span>
    );
  }

  if (variant === 'accent') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium tracking-wide bg-sky-500/10 dark:bg-sky-400/10 text-sky-700 dark:text-sky-300 border border-sky-500/20 dark:border-sky-400/20 ${className}`}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-mono text-gray-600 dark:text-gray-400 bg-black/4 dark:bg-white/6 border border-black/6 dark:border-white/8 ${className}`}
    >
      {children}
    </span>
  );
};
