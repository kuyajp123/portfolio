import { useEffect } from 'react';
import { Footer } from '@/components/footer/Footer';
import { SubpageHeader } from '@/components/layout/SubpageHeader';
import { Badge } from '@/components/ui/Badge';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FiArrowUpRight, FiCalendar, FiCompass, FiHeadphones, FiMapPin, FiSliders, FiTerminal } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { SpotifyNowPlaying } from './SpotifyNowPlaying';
import { TopPlayedTracks } from './TopPlayedTracks';
import { offScreenInterests, upcomingEvents } from './constant';

export const OutsideIdePage = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
        return () => {
          clearTimeout(timer);
        };
      }
    }
  }, [hash]);

  return (
    <div className="min-h-[100dvh] bg-grid-pattern flex flex-col items-center overflow-x-clip">
      {/* Top Sticky Liquid Glass Header */}
      <SubpageHeader />

      {/* Main Content */}
      <main className="w-full max-w-3xl px-4 sm:px-6 py-4 flex-1 flex flex-col gap-12">
        {/* Page Title & Narrative Header */}
        <div className="flex flex-col gap-4">
          <SectionHeader
            number="05"
            title="Outside the IDE"
            subtitle="Soundtracks, upcoming hackathons, and creative rituals when the editor is closed."
          />

          <div className="flex flex-wrap gap-2 pt-1">
            <Badge variant="default" className="flex items-center gap-1.5">
              <FiTerminal size={11} className="shrink-0" />
              <span>AFK</span>
            </Badge>
            <Badge variant="default" className="flex items-center gap-1.5">
              <FiSliders size={11} className="shrink-0" />
              <span>Off-Screen</span>
            </Badge>
            <Badge variant="default" className="flex items-center gap-1.5">
              <FiHeadphones size={11} className="shrink-0" />
              <span>Audio & Spotify</span>
            </Badge>
            <Badge variant="default" className="flex items-center gap-1.5">
              <FiCompass size={11} className="shrink-0" />
              <span>Event Radar</span>
            </Badge>
          </div>

          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
            Software engineering is powered by what happens away from the keyboard. This space captures the live
            soundtracks fueling daily focus, upcoming hackathon milestones, and the habits that keep building fun.
          </p>
        </div>

        {/* 01 / Live Soundtrack & Audio Deck */}
        <section
          id="audio"
          className="flex flex-col gap-5 pt-6 border-t border-black/8 dark:border-white/10 scroll-mt-24"
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
              <span className="text-sky-500">01</span>
              <span>/</span>
              <span>Audio & Frequency</span>
            </div>
            <h2 className="font-sans text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
              Soundtrack & Heavy Rotation
            </h2>
          </div>

          {/* Live Spotify Component */}
          <SpotifyNowPlaying />

          {/* Dynamic Top 5 Most Played Tracks Component */}
          <TopPlayedTracks />
        </section>

        {/* 02 / Upcoming Events & Radar */}
        <section
          id="radar"
          className="flex flex-col gap-5 pt-6 border-t border-black/8 dark:border-white/10 scroll-mt-24"
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                <span className="text-sky-500">02</span>
                <span>/</span>
                <span>Radar & Appearances</span>
              </div>
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
              <div className="p-4 sm:p-4.5 flex gap-2.5 transition-colors">
                <p className="text-sm text-center text-gray-600 dark:text-gray-300 leading-relaxed w-full">
                  No upcoming events at the moment. Check back later for updates!
                </p>
              </div>
            )}
          </div>
        </section>

        {/* 03 / Off-Screen Rituals & Gear */}
        <section
          id="rituals"
          className="flex flex-col gap-5 pt-6 border-t border-black/8 dark:border-white/10 scroll-mt-24"
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
              <span className="text-sky-500">03</span>
              <span>/</span>
              <span>Off-Screen Rituals</span>
            </div>
            <h2 className="font-sans text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
              Beyond the Codebase
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {offScreenInterests.map(item => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-black/6 dark:border-white/8 bg-black/2 dark:bg-white/2 flex flex-col gap-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-sky-600 dark:text-sky-400 font-semibold">
                    {item.iconTag}
                  </span>
                  <span className="font-mono text-[10px] text-gray-400 dark:text-gray-500">{item.category}</span>
                </div>

                <h3 className="font-sans text-sm font-semibold text-gray-900 dark:text-gray-100">{item.title}</h3>

                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};