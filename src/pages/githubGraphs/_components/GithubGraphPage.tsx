import { useState, useEffect } from 'react';
import { Footer } from '@/components/footer/Footer';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ThemeToggle } from '@/components/button/Theme';
import { useTheme } from 'next-themes';
import { GitHubCalendar } from 'react-github-calendar';
import 'react-github-calendar/tooltips.css';
import { FaGithub } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';
import { IoChevronBackOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import {
  achievements,
  ACTIVITY_BASE_URL,
  STATS_BASE_URL,
  USERNAME,
  topLanguages,
} from './constant';

const calendarTheme = {
  light: ['#ebedf0', '#c6c9ce', '#9ea3ab', '#5a6069', '#1a1d23'],
  dark: ['#161b22', '#2d333b', '#444c56', '#768390', '#cdd9e5'],
};

const graphTheme = {
  activityLight: 'bg_color=f6f7f9&color=111827&line=4b5563&point=111827&area_color=e5e7eb&area=true&hide_border=true',
  activityDark: 'bg_color=0e1116&color=f3f4f6&line=9ca3af&point=e5e7eb&area_color=1f2937&area=true&hide_border=true',
  statsLight: 'bg_color=f6f7f9&text_color=111827&title_color=111827&icon_color=4b5563&hide_border=true',
  statsDark: 'bg_color=0e1116&text_color=f3f4f6&title_color=f3f4f6&icon_color=9ca3af&hide_border=true',
};

const activityGraphLight = `${ACTIVITY_BASE_URL}?username=${USERNAME}&${graphTheme.activityLight}`;
const activityGraphDark = `${ACTIVITY_BASE_URL}?username=${USERNAME}&${graphTheme.activityDark}`;
const statsOptions = `username=${USERNAME}&show_icons=true&include_all_commits=true&show=prs_merged,prs_merged_percentage`;
const statsLight = `${STATS_BASE_URL}/api?${statsOptions}&${graphTheme.statsLight}`;
const statsDark = `${STATS_BASE_URL}/api?${statsOptions}&${graphTheme.statsDark}`;

const panelClass =
  'overflow-hidden rounded-xl border border-black/8 dark:border-white/10 bg-black/2 dark:bg-white/3 transition-colors';

export const GithubGraphPage = () => {
  const { resolvedTheme } = useTheme();

  const [isActivityAvailable, setIsActivityAvailable] = useState(false);
  const [isStatsAvailable, setIsStatsAvailable] = useState(false);

  // Validate third-party SVG endpoints based on status codes and content
  useEffect(() => {
    let isCancelled = false;

    const validateActivity = async () => {
      try {
        const url = resolvedTheme === 'dark' ? activityGraphDark : activityGraphLight;
        const res = await fetch(url);
        if (res.status === 200) {
          const text = await res.text();
          if (
            text.includes('<svg') &&
            !text.includes('DEPLOYMENT_DISABLED') &&
            !text.includes('Payment required')
          ) {
            if (!isCancelled) setIsActivityAvailable(true);
            return;
          }
        }
        if (!isCancelled) setIsActivityAvailable(false);
      } catch {
        if (!isCancelled) setIsActivityAvailable(false);
      }
    };

    const validateStats = async () => {
      try {
        const url = resolvedTheme === 'dark' ? statsDark : statsLight;
        const res = await fetch(url);
        if (res.status === 200) {
          const text = await res.text();
          if (
            text.includes('<svg') &&
            !text.includes('Something went wrong') &&
            !text.includes('Resource not accessible')
          ) {
            if (!isCancelled) setIsStatsAvailable(true);
            return;
          }
        }
        if (!isCancelled) setIsStatsAvailable(false);
      } catch {
        if (!isCancelled) setIsStatsAvailable(false);
      }
    };

    void validateActivity();
    void validateStats();

    return () => {
      isCancelled = true;
    };
  }, [resolvedTheme]);

  return (
    <div className="min-h-[100dvh] bg-grid-pattern flex flex-col items-center">
      {/* Top Bar */}
      <header className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <IoChevronBackOutline size={15} />
          <span>Back</span>
        </Link>

        <div className="flex items-center gap-4">
          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <FaGithub size={13} />
            <span>github/{USERNAME}</span>
            <FiArrowUpRight size={12} />
          </a>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-3xl px-4 sm:px-6 py-4 flex-1 flex flex-col gap-8">
        <SectionHeader
          number="05"
          title="Developer Activity"
          subtitle="Real-time contribution frequency, commit metrics, and language distribution across public repositories."
        />

        {/* 365 Days Calendar Card */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
            Annual Contributions
          </span>
          <div className={`${panelClass} p-4 overflow-x-auto`}>
            <GitHubCalendar
              username={USERNAME}
              colorScheme={resolvedTheme === 'dark' ? 'dark' : 'light'}
              theme={calendarTheme}
              tooltips={{
                activity: { text: activity => `${String(activity.count)} contributions on ${activity.date}` },
              }}
            />
          </div>
        </div>

        {/* 31 Days Activity Graph - Only rendered if endpoint status is 200 and valid */}
        {isActivityAvailable && (
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
              Recent Trajectory (31 Days)
            </span>
            <div className={`${panelClass} p-2 flex items-center justify-center`}>
              <img
                src={activityGraphLight}
                alt="GitHub 31 Days Activity"
                className="block w-full select-none dark:hidden"
                draggable={false}
              />
              <img
                src={activityGraphDark}
                alt="GitHub 31 Days Activity"
                className="hidden w-full select-none dark:block"
                draggable={false}
              />
            </div>
          </div>
        )}

        {/* Account Overview (if valid) and Native Language Share */}
        <div
          className={`grid gap-4 ${
            isStatsAvailable ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'
          }`}
        >
          {/* Account Overview - Only rendered if endpoint is valid */}
          {isStatsAvailable && (
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                Account Overview
              </span>
              <div className={`${panelClass} p-2 flex items-center justify-center`}>
                <img
                  src={statsLight}
                  alt="GitHub Stats"
                  className="block w-full select-none dark:hidden"
                  draggable={false}
                />
                <img
                  src={statsDark}
                  alt="GitHub Stats"
                  className="hidden w-full select-none dark:block"
                  draggable={false}
                />
              </div>
            </div>
          )}

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