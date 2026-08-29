import { useState, useEffect, useRef, useCallback } from 'react';
import { FaSpotify } from 'react-icons/fa';
import { FiArrowUpRight, FiDisc, FiRadio } from 'react-icons/fi';
import { getSessionCache, setSessionCache } from '@/utils/sessionCache';
import { LASTFM } from '@/API/endpoint';

const DISCORD_USER_ID = (import.meta.env.VITE_DISCORD_USER_ID as string | undefined) ?? '';
const LANYARD_WS_URL = 'wss://api.lanyard.rest/socket';

interface TrackDisplay {
  title: string;
  artist: string;
  album: string;
  albumArt: string;
  spotifyUrl: string;
  source: 'lanyard' | 'lastfm';
  timestamps?: {
    start: number;
    end: number;
  };
}

interface SpotifyPlaybackCache {
  discordStatus: 'online' | 'idle' | 'dnd' | 'offline';
  activeTrack: TrackDisplay | null;
}

interface LanyardSpotifyData {
  track_id: string;
  song: string;
  artist: string;
  album: string;
  album_art_url: string;
  timestamps: {
    start: number;
    end: number;
  };
}

interface LanyardPresence {
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  listening_to_spotify: boolean;
  spotify: LanyardSpotifyData | null;
}

interface LanyardSocketMessage {
  op: number;
  t?: 'INIT_STATE' | 'PRESENCE_UPDATE';
  d?: {
    heartbeat_interval?: number;
    discord_status?: 'online' | 'idle' | 'dnd' | 'offline';
    listening_to_spotify?: boolean;
    spotify?: LanyardSpotifyData | null;
  } & Record<string, unknown>;
}

export const SpotifyNowPlaying = () => {
  const [discordStatus, setDiscordStatus] = useState<'online' | 'idle' | 'dnd' | 'offline'>(() => {
    return (getSessionCache('jp_spotify_playback_cache') as SpotifyPlaybackCache | null)?.discordStatus ?? 'offline';
  });
  const [activeTrack, setActiveTrack] = useState<TrackDisplay | null>(() => {
    return (getSessionCache('jp_spotify_playback_cache') as SpotifyPlaybackCache | null)?.activeTrack ?? null;
  });
  const [progress, setProgress] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState('0:00');
  const [totalTimeStr, setTotalTimeStr] = useState('0:00');

  // Ref tracking whether Discord is currently actively streaming Spotify via WebSocket
  const isDiscordStreamingRef = useRef(false);
  const discordStatusRef = useRef<'online' | 'idle' | 'dnd' | 'offline'>('offline');

  useEffect(() => {
    discordStatusRef.current = discordStatus;
  }, [discordStatus]);

  const updatePlayback = useCallback(
    (status: 'online' | 'idle' | 'dnd' | 'offline', track: TrackDisplay | null) => {
      setDiscordStatus(status);
      setActiveTrack(track);
      setSessionCache('jp_spotify_playback_cache', {
        discordStatus: status,
        activeTrack: track,
      });
    },
    [],
  );

  // 1. Last.fm Fallback (invoked ONLY when Discord is truly offline / disconnected)
  const checkLastFm = useCallback(async () => {
    if (
      isDiscordStreamingRef.current ||
      discordStatusRef.current !== 'offline' ||
      document.visibilityState !== 'visible'
    ) {
      return;
    }

    try {
      const res = await fetch(LASTFM.NOW_PLAYING);
      if (res.ok) {
        const data = (await res.json()) as { isPlaying: boolean; track: TrackDisplay | null };
        if (data.isPlaying && data.track) {
          updatePlayback('offline', data.track);
          return;
        }
      }
    } catch {
      // Quiet fallback
    }

    setActiveTrack(null);
    setSessionCache('jp_spotify_playback_cache', {
      discordStatus: 'offline',
      activeTrack: null,
    });
  }, [updatePlayback]);

  // 2. Real-time Lanyard WebSocket Gateway
  useEffect(() => {
    let socket: WebSocket | null = null;
    let heartbeatTimer: ReturnType<typeof setInterval> | null = null;
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
    let isUnmounted = false;

    const connectWebSocket = () => {
      if (isUnmounted) return;
      if (!DISCORD_USER_ID) {
        void checkLastFm();
        return;
      }

      try {
        const ws = new WebSocket(LANYARD_WS_URL);
        socket = ws;

        ws.onmessage = event => {
          if (isUnmounted) return;
          try {
            const message = JSON.parse(event.data as string) as LanyardSocketMessage;

            // Op 1: Hello -> start heartbeat and subscribe to Discord user ID
            if (message.op === 1 && message.d?.heartbeat_interval) {
              const intervalMs = message.d.heartbeat_interval;

              if (heartbeatTimer !== null) clearInterval(heartbeatTimer);
              heartbeatTimer = setInterval(() => {
                if (ws.readyState === WebSocket.OPEN) {
                  ws.send(JSON.stringify({ op: 3 }));
                }
              }, intervalMs);

              ws.send(
                JSON.stringify({
                  op: 2,
                  d: { subscribe_to_id: DISCORD_USER_ID },
                }),
              );
              return;
            }

            // Op 0: Event (INIT_STATE or PRESENCE_UPDATE)
            if (message.op === 0 && (message.t === 'INIT_STATE' || message.t === 'PRESENCE_UPDATE')) {
              const data = message.d as LanyardPresence | undefined;
              if (!data) return;

              const status = data.discord_status;

              if (data.listening_to_spotify && data.spotify) {
                isDiscordStreamingRef.current = true;
                const trackData: TrackDisplay = {
                  title: data.spotify.song,
                  artist: data.spotify.artist,
                  album: data.spotify.album,
                  albumArt: data.spotify.album_art_url,
                  spotifyUrl: `https://open.spotify.com/track/${data.spotify.track_id}`,
                  source: 'lanyard',
                  timestamps: data.spotify.timestamps,
                };
                updatePlayback(status, trackData);
              } else {
                isDiscordStreamingRef.current = false;
                if (status === 'offline') {
                  setDiscordStatus('offline');
                  void checkLastFm();
                } else {
                  // Discord is active (online/idle/dnd) but player is paused/idle
                  updatePlayback(status, null);
                }
              }
            }
          } catch {
            // Ignore parse errors
          }
        };

        ws.onerror = () => {
          isDiscordStreamingRef.current = false;
        };

        ws.onclose = () => {
          isDiscordStreamingRef.current = false;
          if (heartbeatTimer !== null) {
            clearInterval(heartbeatTimer);
            heartbeatTimer = null;
          }
          // Schedule reconnect attempt in 5 seconds if still mounted
          if (!isUnmounted) {
            reconnectTimer = setTimeout(connectWebSocket, 5000);
          }
        };
      } catch {
        isDiscordStreamingRef.current = false;
        reconnectTimer = setTimeout(connectWebSocket, 5000);
      }
    };

    connectWebSocket();

    return () => {
      isUnmounted = true;
      if (heartbeatTimer !== null) clearInterval(heartbeatTimer);
      if (reconnectTimer !== null) clearTimeout(reconnectTimer);
      if (socket !== null) {
        socket.onclose = null;
        socket.onerror = null;
        socket.close();
      }
    };
  }, [checkLastFm, updatePlayback]);

  // 3. Fallback Last.fm interval check (runs every 10s only when Discord is OFFLINE and tab is visible)
  useEffect(() => {
    const interval = setInterval(() => {
      if (discordStatusRef.current === 'offline') {
        void checkLastFm();
      }
    }, 10000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && discordStatusRef.current === 'offline') {
        void checkLastFm();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [checkLastFm]);

  // Update live progress bar timer when timestamps are available (e.g. from Discord Lanyard)
  useEffect(() => {
    if (!activeTrack?.timestamps) {
      return;
    }

    const { start, end } = activeTrack.timestamps;
    const totalDuration = end - start;

    const updateTimer = () => {
      const now = Date.now();
      const elapsed = Math.max(0, Math.min(now - start, totalDuration));
      const percentage = totalDuration > 0 ? (elapsed / totalDuration) * 100 : 0;
      setProgress(percentage);

      const elapsedSec = Math.floor(elapsed / 1000);
      const totalSec = Math.floor(totalDuration / 1000);

      const currentMin = Math.floor(elapsedSec / 60);
      const currentRemainingSec = elapsedSec % 60;
      const totalMin = Math.floor(totalSec / 60);
      const totalRemainingSec = totalSec % 60;

      setCurrentTimeStr(`${String(currentMin)}:${currentRemainingSec.toString().padStart(2, '0')}`);
      setTotalTimeStr(`${String(totalMin)}:${totalRemainingSec.toString().padStart(2, '0')}`);
    };

    updateTimer();
    const timerInterval = setInterval(updateTimer, 500);

    return () => {
      clearInterval(timerInterval);
    };
  }, [activeTrack]);

  const isPlaying = Boolean(activeTrack);

  return (
    <div className="p-4 sm:p-5 rounded-2xl border border-black/8 dark:border-white/10 bg-black/2 dark:bg-white/3 transition-colors">
      {/* Header bar: Live indicator */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-black/6 dark:border-white/6">
        <div className="flex items-center gap-2">
          <FaSpotify size={16} className="text-[#1DB954]" />
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
            {isPlaying ? 'Live on Spotify' : 'Spotify Status'}
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px]">
          {isPlaying ? (
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span>Now Playing</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 text-gray-400 dark:text-gray-500">
              <span
                className={`w-2 h-2 rounded-full ${
                  discordStatus === 'online'
                    ? 'bg-emerald-500'
                    : discordStatus === 'idle'
                    ? 'bg-amber-500'
                    : discordStatus === 'dnd'
                    ? 'bg-rose-500'
                    : 'bg-gray-400 dark:bg-gray-600'
                }`}
              />
              <span className="capitalize">{discordStatus}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Track Display */}
      {activeTrack ? (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            {/* Album Cover */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/5 shrink-0 shadow-sm">
              {activeTrack.albumArt ? (
                <img
                  src={activeTrack.albumArt}
                  alt={activeTrack.album}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <FiDisc size={24} />
                </div>
              )}
            </div>

            {/* Song Meta */}
            <div className="flex flex-col min-w-0 flex-1">
              <a
                href={activeTrack.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 hover:text-sky-600 dark:hover:text-sky-400 transition-colors truncate"
              >
                {activeTrack.title}
              </a>
              <span className="font-mono text-xs text-gray-600 dark:text-gray-300 truncate mt-0.5">
                {activeTrack.artist}
              </span>
              <span className="font-mono text-[11px] text-gray-400 dark:text-gray-500 truncate mt-0.5">
                {activeTrack.album}
              </span>
            </div>

            {/* Animated Equalizer Waveform Bars */}
            <div className="hidden sm:flex items-end gap-0.5 h-4 shrink-0 px-2" aria-hidden="true">
              <span className="w-1 bg-[#1DB954] rounded-full animate-[pulse_1s_ease-in-out_infinite] h-3" />
              <span className="w-1 bg-[#1DB954] rounded-full animate-[pulse_0.7s_ease-in-out_infinite_0.2s] h-4" />
              <span className="w-1 bg-[#1DB954] rounded-full animate-[pulse_1.1s_ease-in-out_infinite_0.4s] h-2" />
              <span className="w-1 bg-[#1DB954] rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.1s] h-3.5" />
            </div>
          </div>

          {/* Progress Bar (if timestamps are available, e.g. from Discord Lanyard) */}
          {activeTrack.timestamps && (
            <div className="flex flex-col gap-1.5 pt-1">
              <div className="w-full h-1.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-sky-500 rounded-full transition-all duration-300"
                  style={{ width: `${String(Math.min(100, Math.max(0, progress)))}%` }}
                />
              </div>
              <div className="flex items-center justify-between font-mono text-[10px] text-gray-400 dark:text-gray-500">
                <span>{currentTimeStr}</span>
                <span>{totalTimeStr}</span>
              </div>
            </div>
          )}

          {/* Direct Track Action Link */}
          <div className="pt-2 flex items-center justify-between border-t border-black/6 dark:border-white/6">
            <a
              href={activeTrack.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-semibold transition-colors"
            >
              <span>Listen along on Spotify</span>
              <FiArrowUpRight size={13} />
            </a>

            <span className="font-mono text-[10px] text-gray-400 dark:text-gray-500">
              {activeTrack.source === 'lanyard' ? 'Discord Gateway Sync' : 'Last.fm Scrobble Sync'}
            </span>
          </div>
        </div>
      ) : (
        /* Off-Duty / Paused State */
        <div className="flex flex-col gap-3.5 py-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-gray-400 dark:text-gray-500 shrink-0">
              <FiDisc size={20} className="animate-[spin_8s_linear_infinite]" />
            </div>

            <div className="flex flex-col min-w-0">
              <span className="font-sans text-sm font-semibold text-gray-800 dark:text-gray-200">
                Currently Resting / Offline
              </span>
              <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
                Spotify player is quiet right now. Playlists on rotation below.
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-black/6 dark:border-white/6 flex items-center justify-between">
            <span className="font-mono text-[11px] text-gray-400 dark:text-gray-500 inline-flex items-center gap-1">
              <FiRadio size={12} />
              <span>Multi-gateway listening sync active</span>
            </span>

            <a
              href="https://open.spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-mono text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <span>Spotify Profile</span>
              <FiArrowUpRight size={12} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};