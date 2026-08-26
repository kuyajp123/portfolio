import { FiArrowUpRight, FiChevronUp } from 'react-icons/fi';

interface AppBuildersBadgeProps {
  appName: string;
  appSlug: string;
}

export const AppBuildersBadge = ({ appName, appSlug }: AppBuildersBadgeProps) => {
  const url = `https://appbuildersph.com/apps/${appSlug}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-between gap-4 p-3 sm:p-3.5 rounded-xl border border-black/8 dark:border-white/10 bg-black/2 dark:bg-white/3 hover:bg-black/4 dark:hover:bg-white/5 hover:border-black/15 dark:hover:border-white/20 transition-all duration-200 group max-w-md w-full"
    >
      <div className="flex items-center gap-3 min-w-0">
        {/* App Builders PH Brand Mark */}
        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 dark:bg-emerald-400/10 border border-emerald-500/20 dark:border-emerald-400/20 flex flex-col items-center justify-center shrink-0">
          <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 leading-none">
            AB
          </span>
          <span className="font-mono text-[9px] text-emerald-500/80 dark:text-emerald-400/80 leading-none mt-0.5">
            PH
          </span>
        </div>

        <div className="flex flex-col min-w-0">
          <span className="font-sans text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors truncate">
            {appName}
          </span>
          <span className="font-mono text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400 truncate">
            Featured on App Builders PH
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 dark:bg-emerald-400/10 border border-emerald-500/20 dark:border-emerald-400/20 text-emerald-700 dark:text-emerald-300 font-mono text-xs font-medium group-hover:bg-emerald-500/15 transition-colors">
          <FiChevronUp size={14} className="text-emerald-600 dark:text-emerald-400" />
          <span>Upvote</span>
        </div>
        <FiArrowUpRight
          size={14}
          className="text-gray-400 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
        />
      </div>
    </a>
  );
};