import { useState, useEffect, useRef, useMemo } from 'react';
import { useTheme } from 'next-themes';
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import { getSessionCache, setSessionCache } from '@/utils/sessionCache';

const USERNAME = 'kuyajp123';
const BLOCK_SIZE = 10;
const BLOCK_MARGIN = 3;
const CELL_STEP = BLOCK_SIZE + BLOCK_MARGIN; // 13px per column/row

interface Activity {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface GithubContributionsApiResponse {
  contributions?: Activity[];
}

interface GithubRecentGraphProps {
  title?: string;
  showSubpageLink?: boolean;
  className?: string;
}

const COLOR_SCALE = {
  light: [
    'rgba(0, 0, 0, 0.06)', // Level 0
    '#d1d5db',             // Level 1 (gray-300)
    '#9ca3af',             // Level 2 (gray-400)
    '#4b5563',             // Level 3 (gray-600)
    '#111827',             // Level 4 (gray-900)
  ],
  dark: [
    'rgba(255, 255, 255, 0.06)', // Level 0
    '#374151',                   // Level 1 (gray-700)
    '#6b7280',                   // Level 2 (gray-500)
    '#9ca3af',                   // Level 3 (gray-400)
    '#f3f4f6',                   // Level 4 (gray-100)
  ],
};

export const GithubRecentGraph = ({
  title = 'GitHub',
  showSubpageLink = false,
  className = 'flex flex-col gap-3',
}: GithubRecentGraphProps) => {
  const { resolvedTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const [calendarData, setCalendarData] = useState<Activity[] | null>(() => {
    return (getSessionCache(`jp_github_calendar_${USERNAME}`) as Activity[] | null) ?? null;
  });

  // Measure container width to fit the exact maximum number of columns without overflow
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setContainerWidth(entry.contentRect.width);
        }
      }
    });

    observer.observe(el);
    setContainerWidth(el.clientWidth);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Fetch and cache GitHub contribution data in sessionStorage
  useEffect(() => {
    let isCancelled = false;
    const cacheKey = `jp_github_calendar_${USERNAME}`;
    const cached = getSessionCache(cacheKey) as Activity[] | null;

    if (cached && cached.length > 0) {
      setCalendarData(cached);
      return;
    }

    const fetchContributions = async () => {
      try {
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`);
        if (res.ok) {
          const json = (await res.json()) as GithubContributionsApiResponse;
          if (json.contributions && !isCancelled) {
            setCalendarData(json.contributions);
            setSessionCache(cacheKey, json.contributions);
          }
        }
      } catch {
        // Fallback gracefully
      }
    };

    void fetchContributions();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Compute number of week columns that fit without any overflow
  const maxWeeks = useMemo(() => {
    if (containerWidth <= 0) return 24;
    const count = Math.floor(containerWidth / CELL_STEP);
    return Math.min(52, Math.max(10, count));
  }, [containerWidth]);

  // Group latest data into 7-day columns
  const weeks = useMemo(() => {
    if (!calendarData || calendarData.length === 0) return [];
    const totalDays = maxWeeks * 7;
    const sliced = calendarData.slice(-totalDays);

    const cols: Activity[][] = [];
    for (let i = 0; i < sliced.length; i += 7) {
      cols.push(sliced.slice(i, i + 7));
    }
    return cols;
  }, [calendarData, maxWeeks]);

  const isDark = resolvedTheme === 'dark';
  const colors = isDark ? COLOR_SCALE.dark : COLOR_SCALE.light;

  const svgWidth = weeks.length > 0 ? weeks.length * CELL_STEP - BLOCK_MARGIN : 0;
  const svgHeight = 7 * CELL_STEP - BLOCK_MARGIN; // 7 rows = 88px

  return (
    <div className={className}>
      {(title || showSubpageLink) && (
        <div className="flex items-center justify-between">
          {title && (
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
              {title}
            </h4>
          )}
          {showSubpageLink && (
            <Link
              to="/github-graphs"
              className="inline-flex items-center gap-1 font-mono text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <span>View GitHub Activity & Statistics</span>
              <FiArrowUpRight size={13} />
            </Link>
          )}
        </div>
      )}

      <div
        ref={containerRef}
        className="w-full overflow-hidden flex justify-start sm:justify-center select-none py-1"
        style={{ overflowX: 'hidden', overflowY: 'hidden' }}
      >
        {weeks.length > 0 ? (
          <svg
            width={svgWidth}
            height={svgHeight}
            viewBox={`0 0 ${String(svgWidth)} ${String(svgHeight)}`}
            className="block overflow-hidden"
            style={{ maxWidth: '100%' }}
          >
            {weeks.map((week, colIdx) => (
              <g key={colIdx} transform={`translate(${String(colIdx * CELL_STEP)}, 0)`}>
                {week.map((day, rowIdx) => {
                  const levelIndex = Math.min(4, Math.max(0, day.level));
                  const fillColor = colors[levelIndex] ?? colors[0];
                  return (
                    <rect
                      key={day.date}
                      x={0}
                      y={rowIdx * CELL_STEP}
                      width={BLOCK_SIZE}
                      height={BLOCK_SIZE}
                      rx={2}
                      ry={2}
                      fill={fillColor}
                    />
                  );
                })}
              </g>
            ))}
          </svg>
        ) : (
          <div className="h-[88px] w-full flex items-center justify-center font-mono text-xs text-gray-400 dark:text-gray-500 animate-pulse">
            Loading contributions...
          </div>
        )}
      </div>
    </div>
  );
};
