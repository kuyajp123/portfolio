import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import 'react-github-calendar/tooltips.css';

// ─────────────────────────────────────────────────────────────────────────────
// 🎨 THEME SWITCH — set to `true` for green, `false` for black & white
const USE_GREEN_THEME = false;
// ─────────────────────────────────────────────────────────────────────────────

const THEMES = {
  green: {
    calendar: {
      light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
      dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    },
    hover: 'hover:border-emerald-300 dark:hover:border-emerald-500/50',
    activityLight: 'bg_color=f9fafb&color=1f2937&line=10b981&point=10b981&area_color=bbf7d0&area=true&hide_border=true',
    activityDark: 'bg_color=111827&color=f3f4f6&line=10b981&point=10b981&area_color=14532d&area=true&hide_border=true',
    statsLight: 'bg_color=f9fafb&text_color=1f2937&title_color=10b981&icon_color=10b981&hide_border=true',
    statsDark: 'bg_color=111827&text_color=f3f4f6&title_color=10b981&icon_color=10b981&hide_border=true',
  },
  mono: {
    calendar: {
      light: ['#ebedf0', '#c6c9ce', '#9ea3ab', '#5a6069', '#1a1d23'],
      dark: ['#161b22', '#2d333b', '#444c56', '#768390', '#cdd9e5'],
    },
    hover: 'hover:border-gray-400 dark:hover:border-gray-500',
    activityLight: 'bg_color=f9fafb&color=1f2937&line=4b5563&point=1f2937&area_color=d1d5db&area=true&hide_border=true',
    activityDark: 'bg_color=111827&color=f3f4f6&line=9ca3af&point=e5e7eb&area_color=374151&area=true&hide_border=true',
    statsLight: 'bg_color=f9fafb&text_color=1f2937&title_color=1f2937&icon_color=4b5563&hide_border=true',
    statsDark: 'bg_color=111827&text_color=f3f4f6&title_color=f3f4f6&icon_color=9ca3af&hide_border=true',
  },
};

const t = USE_GREEN_THEME ? THEMES.green : THEMES.mono;
const baseCard = `rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-white/10 shadow-sm`;

export const GithubGraphs = () => {
  const { resolvedTheme } = useTheme();
  const contributionGraphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contributionGraphRef.current;
    if (!el) return;

    const scrollToRight = () => {
      if (el.scrollWidth > el.clientWidth) {
        el.scrollLeft = el.scrollWidth;
      }
    };

    scrollToRight();

    const observer = new MutationObserver(() => {
      setTimeout(() => scrollToRight(), 50);
    });

    observer.observe(el, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {/* ── Contribution Graph ── */}
      <a href="https://github.com/kuyajp123" target="_blank" rel="noopener noreferrer" className={`${baseCard} block`}>
        <div ref={contributionGraphRef} className="p-4 overflow-x-auto">
          <GitHubCalendar
            username="kuyajp123"
            colorScheme={resolvedTheme === 'dark' ? 'dark' : 'light'}
            theme={t.calendar}
            tooltips={{
              activity: { text: activity => `${activity.count} contributions on ${activity.date}` },
            }}
          />
        </div>
      </a>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* ── 31 Days Activity Graph ── */}
        <div className={`${baseCard} overflow-hidden flex items-center justify-center`}>
          <img
            src={`https://github-readme-activity-graph.vercel.app/graph?username=kuyajp123&${t.activityLight}`}
            alt="GitHub 31 Days Activity"
            className="w-full block dark:hidden select-none no-drag"
            draggable="false"
            onDragStart={e => e.preventDefault()}
          />
          <img
            src={`https://github-readme-activity-graph.vercel.app/graph?username=kuyajp123&${t.activityDark}`}
            alt="GitHub 31 Days Activity"
            className="w-full hidden dark:block select-none no-drag"
            draggable="false"
            onDragStart={e => e.preventDefault()}
          />
        </div>

        {/* ── GitHub Stats ── */}
        <div className={`${baseCard} overflow-hidden flex items-center justify-center`}>
          <img
            src={`https://github-readme-stats-gamma-blush-51.vercel.app/api?username=kuyajp123&show_icons=true&${t.statsLight}`}
            alt="GitHub Stats"
            className="w-full block dark:hidden select-none no-drag"
            draggable="false"
            onDragStart={e => e.preventDefault()}
          />
          <img
            src={`https://github-readme-stats-gamma-blush-51.vercel.app/api?username=kuyajp123&show_icons=true&${t.statsDark}`}
            alt="GitHub Stats"
            className="w-full hidden dark:block select-none no-drag"
            draggable="false"
            onDragStart={e => e.preventDefault()}
          />
        </div>
      </div>
    </div>
  );
};
