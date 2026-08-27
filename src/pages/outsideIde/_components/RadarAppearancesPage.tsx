import { Footer } from '@/components/footer/Footer';
import { SubpageHeader } from '@/components/layout/SubpageHeader';
import { Badge } from '@/components/ui/Badge';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FiArrowUpRight, FiCalendar, FiCompass, FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { upcomingEvents } from './constant';

export const RadarAppearancesPage = () => {
  return (
    <div className="min-h-[100dvh] bg-grid-pattern flex flex-col items-center overflow-x-clip">
      {/* Top Sticky Liquid Glass Header */}
      <SubpageHeader />

      {/* Main Content */}
      <main className="w-full max-w-3xl px-4 sm:px-6 py-4 flex-1 flex flex-col gap-10">
        {/* Page Title & Narrative Header */}
        <div className="flex flex-col gap-4">
          <SectionHeader
            number="05"
            title="Radar & Appearances"
            subtitle="Upcoming hackathons, engineering summits, and developer community meetups."
          />

          <div className="flex flex-wrap gap-2 pt-1">
            <Badge variant="default" className="flex items-center gap-1.5">
              <FiCompass size={11} className="shrink-0" />
              <span>Event Radar</span>
            </Badge>
            <Badge variant="default" className="flex items-center gap-1.5">
              <FiCalendar size={11} className="shrink-0" />
              <span> Schedule</span>
            </Badge>
          </div>

          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
            Software engineering is powered by what happens away from the keyboard. This space captures the live
            soundtracks fueling daily focus, upcoming hackathon milestones, and the habits that keep building fun.
          </p>
        </div>

        {/* Upcoming Events & Radar List */}
        <section className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                Roadmap
              </span>
              <h2 className="font-sans text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                Upcoming Events & Milestones
              </h2>
            </div>

            <Link
              to="/activities"
              className="inline-flex items-center gap-1 font-mono text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <span>Past Hackathons</span>
              <FiArrowUpRight size={12} />
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {upcomingEvents.map(evt => (
              <div
                key={evt.id}
                className="p-4 sm:p-4.5 rounded-xl border border-black/8 dark:border-white/10 bg-black/2 dark:bg-white/3 flex flex-col gap-2.5 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="font-sans text-base font-semibold text-gray-900 dark:text-gray-100">{evt.title}</h3>
                    <Badge variant={evt.status === 'Confirmed' ? 'award' : 'default'}>{evt.status}</Badge>
                  </div>

                  <div className="flex items-center gap-3 font-mono text-xs text-gray-400 dark:text-gray-500 shrink-0">
                    <span className="inline-flex items-center gap-1">
                      <FiCalendar size={11} />
                      {evt.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <FiMapPin size={11} />
                      {evt.location}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{evt.description}</p>
              </div>
            ))}
            {upcomingEvents.length === 0 && (
              <div className="p-8 rounded-xl border border-dashed border-black/10 dark:border-white/10 flex flex-col items-center justify-center text-center gap-2">
                <FiCompass size={24} className="text-gray-400 dark:text-gray-500" />
                <p className="font-mono text-xs text-gray-600 dark:text-gray-300">
                  Targeting upcoming 2026 hackathons & regional tech summits. Updates will sync here soon.
                </p>
                <Link
                  to="/activities"
                  className="mt-2 inline-flex items-center gap-1 font-mono text-xs text-sky-600 dark:text-sky-400 hover:underline"
                >
                  <span>Explore 6+ Completed Hackathon Archives</span>
                  <FiArrowUpRight size={12} />
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
