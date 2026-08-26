import { ThemeToggle } from '@/components/button/Theme';
import { FiDownload } from 'react-icons/fi';
import { HiMenuAlt3 } from 'react-icons/hi';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onOpenDrawer: () => void;
}

export const Header = ({ onOpenDrawer }: HeaderProps) => {
  return (
    <header className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
      {/* Wordmark */}
      <Link to="/" className="flex items-center gap-2 group">
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
        <span className="font-mono text-sm font-semibold tracking-tight text-gray-900 dark:text-gray-100 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
          johnpaul.dev
        </span>
      </Link>

      {/* Action controls */}
      <div className="flex items-center gap-3">
        <a
          href="/resume.pdf"
          download
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-black/8 dark:border-white/10 text-xs font-mono text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        >
          <span>CV</span>
          <FiDownload size={13} />
        </a>

        <ThemeToggle />

        {/* Navigation drawer trigger */}
        <button
          type="button"
          onClick={onOpenDrawer}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-black/5 dark:bg-white/8 hover:bg-black/10 dark:hover:bg-white/12 text-gray-900 dark:text-gray-100 text-xs font-mono tracking-wide transition-all active:scale-[0.98] cursor-pointer"
          aria-label="Open directory menu"
        >
          <HiMenuAlt3 size={15} />
          <span>Menu</span>
        </button>
      </div>
    </header>
  );
};
