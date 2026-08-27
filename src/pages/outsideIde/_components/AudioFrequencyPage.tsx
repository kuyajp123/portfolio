import { Footer } from '@/components/footer/Footer';
import { SubpageHeader } from '@/components/layout/SubpageHeader';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SpotifyNowPlaying } from './SpotifyNowPlaying';
import { TopPlayedTracks } from './TopPlayedTracks';

export const AudioFrequencyPage = () => {
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
            title="Audio & Frequency"
            subtitle="Live Spotify presence telemetry and heavy-rotation playlists."
          />

          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
            Software engineering is powered by what happens away from the keyboard. This space captures the live
            soundtracks fueling daily focus, upcoming hackathon milestones, and the habits that keep building fun.
          </p>
        </div>

        {/* Live Spotify Component */}
        <SpotifyNowPlaying />

        {/* Dynamic Top 5 Most Played Tracks Component */}
        <TopPlayedTracks />
      </main>

      <Footer />
    </div>
  );
};