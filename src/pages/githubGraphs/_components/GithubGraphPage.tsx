import { Footer } from '@/components/footer/Footer';
import { SubpageHeader } from '@/components/layout/SubpageHeader';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FaGithub } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';
import { GithubRecentGraph } from '@/components/github/GithubRecentGraph';
import {
  achievements,
  USERNAME,
  topLanguages,
} from './constant';

const panelClass =
  'overflow-hidden rounded-xl border border-black/8 dark:border-white/10 bg-black/2 dark:bg-white/3 transition-colors';

export const GithubGraphPage = () => {
  return (
    <div className="min-h-[100dvh] bg-grid-pattern flex flex-col items-center overflow-x-clip">
      {/* Top Sticky Liquid Glass Header */}
      <SubpageHeader
        rightContent={
          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-hidden rounded-md"
          >
            <FaGithub size={13} />
            <span>github/{USERNAME}</span>
            <FiArrowUpRight size={12} />
          </a>
        }
      />

      {/* Main Content */}
      <main className="w-full max-w-3xl px-4 sm:px-6 py-4 flex-1 flex flex-col gap-8">
        <SectionHeader
          number="05"
          title="Developer Activity"
          subtitle="Real-time contribution frequency, commit metrics, and language distribution across public repositories."
        />

        {/* Contributions Graph */}
        <GithubRecentGraph />

        {/* Bespoke Native Language Share Component */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
              Language Share
            </span>
            <span className="font-mono text-xs text-gray-400 dark:text-gray-500">
              {topLanguages.length} Languages
            </span>
          </div>

          <div className={`${panelClass} p-4 sm:p-5 flex flex-col gap-4`}>
            {/* Multi-Segment Horizontal Distribution Bar */}
            <div
              className="h-3 w-full rounded-full flex overflow-hidden bg-black/6 dark:bg-white/6 border border-black/8 dark:border-white/10"
              role="progressbar"
              aria-label="Language distribution"
            >
              {topLanguages.map(lang => (
                <div
                  key={lang.name}
                  style={{
                    width: `${String(lang.percentage)}%`,
                    backgroundColor: lang.color,
                  }}
                  className="h-full transition-all duration-500 hover:opacity-90"
                  title={`${lang.name}: ${String(lang.percentage)}%`}
                />
              ))}
            </div>

            {/* Language Breakdown Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {topLanguages.map(lang => (
                <div
                  key={lang.name}
                  className="flex items-center justify-between p-2 rounded-lg border border-black/6 dark:border-white/8 bg-black/2 dark:bg-white/2 hover:bg-black/4 dark:hover:bg-white/4 transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: lang.color }}
                      aria-hidden="true"
                    />
                    <span className="font-sans text-xs font-medium text-gray-800 dark:text-gray-200 truncate">
                      {lang.name}
                    </span>
                  </div>

                  <span className="font-mono text-[11px] text-gray-500 dark:text-gray-400 ml-1 shrink-0">
                    {lang.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Earned Achievements */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
            Earned Badges
          </span>
          <div className="flex flex-wrap gap-4 pt-1">
            {achievements.map(ach => (
              <a
                key={ach.name}
                href={`https://github.com/${USERNAME}?tab=achievements&achievement=${ach.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl border border-black/8 dark:border-white/10 bg-black/2 dark:bg-white/3 hover:bg-black/5 dark:hover:bg-white/6 transition-colors group"
              >
                <img
                  src={ach.image}
                  alt={ach.name}
                  className="w-10 h-10 object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
                />
                <div className="flex flex-col">
                  <span className="font-sans text-xs font-semibold text-gray-900 dark:text-gray-100">
                    {ach.name}
                  </span>
                  {ach.badge && (
                    <span className="font-mono text-[10px] text-gray-400 dark:text-gray-500">
                      {ach.badge}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};