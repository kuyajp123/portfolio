import type { ReactNode } from 'react';
import { useIsScrolled } from '@/hooks/useIsScrolled';
import { ThemeToggle } from '@/components/button/Theme';
import { Link } from 'react-router-dom';
import { IoChevronBackOutline } from 'react-icons/io5';

interface SubpageHeaderProps {
  rightContent?: ReactNode;
}

export const SubpageHeader = ({ rightContent }: SubpageHeaderProps) => {
  const isScrolled = useIsScrolled(20);

  return (
    <header className="sticky top-0 z-40 w-full py-4 sm:py-5 pointer-events-none">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 flex items-center justify-between pointer-events-auto">
        {/* Left: Back button */}
        <Link
          to="/"
          className={
            isScrolled
              ? 'liquid-glass-pill inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-hidden'
              : 'inline-flex items-center gap-1.5 py-1 text-xs font-mono text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-hidden rounded-md'
          }
        >
          <IoChevronBackOutline size={14} />
          <span>Back</span>
        </Link>

        {/* Right: Brand / Actions */}
        {isScrolled ? (
          <div className="liquid-glass-pill inline-flex items-center gap-2 px-3 py-1 rounded-full transition-all duration-200">
            {rightContent ?? (
              <Link
                to="/"
                className="font-mono text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-hidden"
              >
                johnpaul.dev
              </Link>
            )}
            <div className="w-px h-3.5 bg-black/10 dark:bg-white/15" />
            <ThemeToggle />
          </div>
        ) : (
          <div className="flex items-center gap-4">
            {rightContent ?? (
              <Link
                to="/"
                className="font-mono text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-hidden rounded-md"
              >
                johnpaul.dev
              </Link>
            )}
            <ThemeToggle />
          </div>
        )}
      </div>
    </header>
  );
};