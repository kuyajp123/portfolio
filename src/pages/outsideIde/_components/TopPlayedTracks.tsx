import { useState, useEffect } from 'react';
import { FiArrowUpRight, FiMusic, FiRefreshCw } from 'react-icons/fi';
import { topPlayedTracks as fallbackTracks, type TopTrack } from './constant';

const LASTFM_API_KEY = (import.meta.env.VITE_LASTFM_API_KEY as string | undefined) ?? '';
const LASTFM_USERNAME = (import.meta.env.VITE_LASTFM_USERNAME as string | undefined) ?? '';

interface LastFmTrack {
  name: string;
  playcount: string;
  artist: {
    name: string;
    url?: string;
  };
  url: string;
  image?: { '#text': string; size: string }[];
}

interface LastFmResponse {
  toptracks?: {
    track: LastFmTrack[];
    '@attr'?: {
      total: string;
    };
  };
}

export const TopPlayedTracks = () => {
  const [period, setPeriod] = useState<'overall' | '1month' | '7day'>('overall');
  const [tracks, setTracks] = useState<TopTrack[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const fetchTopTracks = async () => {
      setIsLoading(true);
      if (!LASTFM_API_KEY || !LASTFM_USERNAME) {
        if (!isCancelled) {
          setTracks(fallbackTracks);
          setIsLive(false);
          setIsLoading(false);
        }
        return;
      }
      try {
        const url = `https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=5&period=${period}`;
        const res = await fetch(url);
        if (res.ok) {
          const data = (await res.json()) as LastFmResponse;
          const liveList = data.toptracks?.track ?? [];

          if (liveList.length > 0 && !isCancelled) {
            const formatted: TopTrack[] = liveList.slice(0, 5).map((t, idx) => ({
              rank: String(idx + 1).padStart(2, '0'),
              title: t.name,
              artist: t.artist.name,
              album: `${t.playcount} plays`,
              duration: undefined,
              spotifyUrl: `https://open.spotify.com/search/${encodeURIComponent(`${t.name} ${t.artist.name}`)}`,
            }));
            setTracks(formatted);
            setIsLive(true);
            setIsLoading(false);
            return;
          }
        }
      } catch {
        // Fallback to curated tracks
      }

      if (!isCancelled) {
        setTracks(fallbackTracks);
        setIsLive(false);
        setIsLoading(false);
      }
    };

    void fetchTopTracks();

    return () => {
      isCancelled = true;
    };
  }, [period]);

  return (
    <div className="flex flex-col gap-3 pt-2">
      {/* Section Header with Period Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
            Top 5 Heavy Rotation
          </span>
          <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/10 text-gray-500 dark:text-gray-400">
            {isLive ? 'Live Last.fm Sync' : 'Curated Rotation'}
          </span>
        </div>

        {/* Period Filter Tabs */}
        <div className="flex items-center gap-1 font-mono text-[11px] bg-black/4 dark:bg-white/5 p-0.5 rounded-lg border border-black/6 dark:border-white/8 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => {
              setPeriod('7day');
            }}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              period === '7day'
                ? 'bg-white dark:bg-[#161b22] text-gray-900 dark:text-gray-100 font-semibold shadow-xs'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            This Week
          </button>
          <button
            type="button"
            onClick={() => {
              setPeriod('1month');
            }}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              period === '1month'
                ? 'bg-white dark:bg-[#161b22] text-gray-900 dark:text-gray-100 font-semibold shadow-xs'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            30 Days
          </button>
          <button
            type="button"
            onClick={() => {
              setPeriod('overall');
            }}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              period === 'overall'
                ? 'bg-white dark:bg-[#161b22] text-gray-900 dark:text-gray-100 font-semibold shadow-xs'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            All-Time
          </button>
        </div>
      </div>

      {/* Track List */}
      <div className="rounded-xl border border-black/8 dark:border-white/10 bg-black/2 dark:bg-white/3 overflow-hidden divide-y divide-black/5 dark:divide-white/5">
        {isLoading ? (
          <div className="p-8 flex items-center justify-center gap-2 font-mono text-xs text-gray-400 dark:text-gray-500">
            <FiRefreshCw size={14} className="animate-spin text-sky-500" />
            <span>Fetching top rotation...</span>
          </div>
        ) : (
          tracks.map(track => (
            <a
              key={`${track.rank}-${track.title}`}
              href={track.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 sm:p-3.5 hover:bg-black/4 dark:hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400 w-5 shrink-0">
                  {track.rank}
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="font-sans text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors truncate">
                    {track.title}
                  </span>
                  <span className="font-mono text-[11px] text-gray-500 dark:text-gray-400 truncate">
                    {track.artist} • {track.album}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 text-xs font-mono text-gray-400 dark:text-gray-500">
                {track.duration && <span className="hidden sm:inline text-[11px]">{track.duration}</span>}
                <FiArrowUpRight
                  size={13}
                  className="group-hover:text-gray-900 dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                />
              </div>
            </a>
          ))
        )}
      </div>

      {/* Footer Scrobble Info */}
      <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 dark:text-gray-500 pt-1">
        <span className="inline-flex items-center gap-1.5">
          <FiMusic size={11} className="text-rose-500" />
          <span>Synced via Last.fm scrobbler</span>
        </span>

        <a
          href={`https://www.last.fm/user/${LASTFM_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <span>last.fm/{LASTFM_USERNAME} ↗</span>
        </a>
      </div>
    </div>
  );
};