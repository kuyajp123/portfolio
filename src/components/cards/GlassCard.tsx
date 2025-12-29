import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'min-w-[80px] min-h-[60px] p-3',
  md: 'min-w-[170px] min-h-[100px] p-6',
  lg: 'min-w-[160px] min-h-[100px] p-8',
};

const GlassCard: React.FC<GlassCardProps> = ({ children, size = 'md', className = '' }) => {
  const baseClasses = [
    'backdrop-blur-sm',
    'bg-black/25',
    'dark:bg-black/8',
    'border',
    'border-white/20',
    'dark:border-gray-700',
    'rounded-xl',
    'shadow-lg',
    'text-white',
    'dark:text-text-dark',
    'drop-shadow-md',
  ].join(' ');

  return (
    <div
      className={`${baseClasses} ${sizeClasses[size]} ${className}`}
      style={{
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      }}
    >
      {children}
    </div>
  );
};

export default GlassCard;
