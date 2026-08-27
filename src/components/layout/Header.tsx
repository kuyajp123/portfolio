import { useIsScrolled } from '@/hooks/useIsScrolled';
import { ThemeToggle } from '@/components/button/Theme';
import { FiDownload } from 'react-icons/fi';
import { HiMenuAlt3 } from 'react-icons/hi';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onOpenDrawer: () => void;
}

export const Header = ({ onOpenDrawer }: HeaderProps) => {
  const isScrolled = useIsScrolled(20);

  return (
    <header className="sticky top-0 z-40 w-full py-4 sm:py-5 pointer-events-none">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 flex items-center justify-between pointer-events-auto">
        {/* Left: Wordmark */}
        <Link
          to="/"
          className={
            isScrolled
              ? 'liquid-glass-pill group inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full cursor-pointer focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-hidden transition-all duration-200'
              : 'group inline-flex items-center gap-2 py-1 cursor-pointer focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-hidden'
          }
        >
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
          <span className="font-mono text-sm font-semibold tracking-tight text-gray-900 dark:text-gray-100 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
            johnpaul.dev
          </span>
        </Link>

        {/* Right: Action Controls */}
        {isScrolled ? (
          <div className="liquid-glass-pill inline-flex items-center gap-1 p-1 rounded-full transition-all duration-200">
            <a
              href="/resume.pdf"
              download
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-hidden"
            >
              <span>CV</span>
              <FiDownload size={12} />
            </a>

            <div className="hidden sm:block w-px h-3.5 bg-black/10 dark:bg-white/15 mx-0.5" />

            <ThemeToggle />

            <div className="w-px h-3.5 bg-black/10 dark:bg-white/15 mx-0.5" />

            {/* Navigation drawer trigger */}
            <button
              type="button"
              onClick={onOpenDrawer}
              className="inline-flex items-center justify-center w-7 h-7 rounded-full text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-hidden"
              aria-label="Open directory menu"
            >
              <HiMenuAlt3 size={15} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <a
              href="/resume.pdf"
              download
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-black/8 dark:border-white/10 text-xs font-mono text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-hidden"
            >
              <span>CV</span>
              <FiDownload size={13} />
            </a>

            <ThemeToggle />

            {/* Navigation drawer trigger */}
            <button
              type="button"
              onClick={onOpenDrawer}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-black/5 dark:bg-white/8 hover:bg-black/10 dark:hover:bg-white/12 text-gray-900 dark:text-gray-100 text-xs font-mono tracking-wide transition-all active:scale-[0.98] cursor-pointer focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-hidden"
              aria-label="Open directory menu"
            >
              <HiMenuAlt3 size={15} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};