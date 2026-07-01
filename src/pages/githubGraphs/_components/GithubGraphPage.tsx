import { Footer } from '@/components/footer/Footer';
import { useTheme } from 'next-themes';
import { GitHubCalendar } from 'react-github-calendar';
import 'react-github-calendar/tooltips.css';
import { FaGithub } from 'react-icons/fa';
import { HiArrowTopRightOnSquare } from 'react-icons/hi2';
import { IoChevronBackOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { achievements, ACTIVITY_BASE_URL, STATS_BASE_URL, USERNAME } from './constant';

const calendarTheme = {
  light: ['#ebedf0', '#c6c9ce', '#9ea3ab', '#5a6069', '#1a1d23'],
  dark: ['#161b22', '#2d333b', '#444c56', '#768390', '#cdd9e5'],
};

const graphTheme = {
  activityLight: 'bg_color=f9fafb&color=1f2937&line=4b5563&point=1f2937&area_color=d1d5db&area=true&hide_border=true',
  activityDark: 'bg_color=111827&color=f3f4f6&line=9ca3af&point=e5e7eb&area_color=374151&area=true&hide_border=true',
  statsLight: 'bg_color=f9fafb&text_color=1f2937&title_color=1f2937&icon_color=4b5563&hide_border=true',
  statsDark: 'bg_color=111827&text_color=f3f4f6&title_color=f3f4f6&icon_color=9ca3af&hide_border=true',
  languagesLight: 'layout=donut&langs_count=10&bg_color=f9fafb&title_color=111827&text_color=374151&hide_border=true',
  languagesDark: 'layout=donut&langs_count=10&bg_color=111827&title_color=f3f4f6&text_color=d1d5db&hide_border=true',
};

const activityGraphLight = `${ACTIVITY_BASE_URL}?username=${USERNAME}&${graphTheme.activityLight}`;
const activityGraphDark = `${ACTIVITY_BASE_URL}?username=${USERNAME}&${graphTheme.activityDark}`;
const statsOptions = `username=${USERNAME}&show_icons=true&include_all_commits=true&show=prs_merged,prs_merged_percentage`;
const statsLight = `${STATS_BASE_URL}/api?${statsOptions}&${graphTheme.statsLight}`;
const statsDark = `${STATS_BASE_URL}/api?${statsOptions}&${graphTheme.statsDark}`;
const languagesLight = `${STATS_BASE_URL}/api/top-langs?username=${USERNAME}&${graphTheme.languagesLight}`;
const languagesDark = `${STATS_BASE_URL}/api/top-langs?username=${USERNAME}&${graphTheme.languagesDark}`;

const cardClass =
  'overflow-hidden rounded-xl border border-gray-200 bg-gray-50 shadow-sm transition-colors dark:border-white/10 dark:bg-gray-900';

export const GithubGraphPage = () => {
  const navigate = useNavigate();
  const { resolvedTheme } = useTheme();

  return (
    <main className="min-h-screen bg-white text-gray-900 transition-colors dark:bg-[#0a0a0a] dark:text-gray-100">
      <div className="sticky top-0 z-20 border-b border-gray-200 bg-white/85 px-4 py-3 backdrop-blur-md dark:border-white/10 dark:bg-[#0a0a0a]/85">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3">
          <button
            type="button"
            className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-950 dark:text-gray-300 dark:hover:text-white"
            onClick={() => navigate(-1)}
          >
            <IoChevronBackOutline size={20} />
            Back
          </button>

          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-300 hover:bg-white dark:hover:bg-gray-700/20 dark:border-white/10 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-white/20"
          >
            <FaGithub />
            GitHub
            <HiArrowTopRightOnSquare />
          </a>
        </div>
      </div>

      <section className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-4 py-8 sm:px-6">
        <header className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
            GitHub analytics
          </span>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Developer Activity</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-300">
                Contribution history, recent activity, account stats, and language usage from my GitHub profile.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded border border-gray-200 bg-white px-3 py-2 dark:border-white/10 dark:bg-gray-950">
                <p className="text-lg font-bold">365</p>
                <p className="text-[0.65rem] uppercase tracking-wider text-gray-500">Days</p>
              </div>
              <div className="rounded border border-gray-200 bg-white px-3 py-2 dark:border-white/10 dark:bg-gray-950">
                <p className="text-lg font-bold">31</p>
                <p className="text-[0.65rem] uppercase tracking-wider text-gray-500">Recent</p>
              </div>
              <div className="rounded border border-gray-200 bg-white px-3 py-2 dark:border-white/10 dark:bg-gray-950">
                <p className="text-lg font-bold">10</p>
                <p className="text-[0.65rem] uppercase tracking-wider text-gray-500">Langs</p>
              </div>
            </div>
          </div>
        </header>

        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Contribution Graph</h2>
          </div>

          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${cardClass} block select-none `}
            draggable="false"
          >
            <div className="overflow-x-auto p-4">
              <GitHubCalendar
                username={USERNAME}
                colorScheme={resolvedTheme === 'dark' ? 'dark' : 'light'}
                theme={calendarTheme}
                tooltips={{
                  activity: { text: activity => `${activity.count} contributions on ${activity.date}` },
                }}
              />
            </div>
          </a>
        </section>

        <section className="grid grid-cols-1 gap-5">
          <article className={cardClass}>
            <div className="border-b border-gray-200 px-4 py-3 dark:border-white/10">
              <h2 className="text-base font-semibold">31 Days Activity Graph</h2>
            </div>
            <div className="flex min-h-10 items-center justify-center">
              <img
                src={activityGraphLight}
                alt="GitHub 31 Days Activity"
                className="block w-full select-none dark:hidden"
                draggable="false"
              />
              <img
                src={activityGraphDark}
                alt="GitHub 31 Days Activity"
                className="hidden w-full select-none dark:block"
                draggable="false"
              />
            </div>
          </article>

          <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
            <div className="flex flex-col gap-5">
              <article className={cardClass}>
                <div className="border-b border-gray-200 px-4 py-3 dark:border-white/10">
                  <h2 className="text-base font-semibold">GitHub Stats</h2>
                </div>
                <div className="flex min-h-48 items-center justify-center">
                  <img
                    src={statsLight}
                    alt="GitHub Stats"
                    className="block w-full select-none dark:hidden"
                    draggable="false"
                  />
                  <img
                    src={statsDark}
                    alt="GitHub Stats"
                    className="hidden w-full select-none dark:block"
                    draggable="false"
                  />
                </div>
              </article>

              <section className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold">Earned achievements</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {achievements.map(ach => (
                    <a
                      key={ach.name}
                      href={`https://github.com/${USERNAME}?tab=achievements&achievement=${ach.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-start gap-3 w-20 text-center"
                      draggable="false"
                    >
                      {/* Relative wrapper to anchor the badge to the image corner */}
                      <div className="relative">
                        <img
                          src={ach.image}
                          alt={ach.name}
                          className="w-[60px] h-[60px] object-contain drop-shadow-md"
                          draggable="false"
                        />
                        {ach.badge && (
                          <span className="absolute -bottom-1 -right-1 bg-gray-200 text-gray-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-md border border-neutral-900">
                            {ach.badge}
                          </span>
                        )}
                      </div>

                      {/* Clean, uniform text label */}
                      <span className="text-[13px] font-semibold">{ach.name}</span>
                    </a>
                  ))}
                </div>
              </section>
            </div>

            <article className={cardClass}>
              <div className="border-b border-gray-200 px-4 py-3 dark:border-white/10">
                <h2 className="text-base font-semibold">Most Used Languages</h2>
              </div>
              <div className="flex min-h-48 items-center justify-center p-2">
                <img
                  src={languagesLight}
                  alt="Most Used Languages Donut Chart"
                  className="block w-full select-none dark:hidden"
                  draggable="false"
                />
                <img
                  src={languagesDark}
                  alt="Most Used Languages Donut Chart"
                  className="hidden w-full select-none dark:block"
                  draggable="false"
                />
              </div>
            </article>
          </div>
        </section>
      </section>

      <Footer />
    </main>
  );
};
