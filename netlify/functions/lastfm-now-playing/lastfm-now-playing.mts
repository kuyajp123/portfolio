// ---------------------------------------------------------------------------
// Allowed origins.
// ---------------------------------------------------------------------------
const getAllowedOrigins = (): string[] =>
  [
    process.env.URL, // production domain set by Netlify automatically
    'http://localhost:8888', // netlify dev proxy
    'http://localhost:5173', // vite dev server
    'http://127.0.0.1:8888',
    'http://127.0.0.1:5173',
  ].filter(Boolean) as string[];

const isAllowedOrigin = (request: Request): boolean => {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  const source = origin ?? referer;

  if (!source) return false;

  return getAllowedOrigins().some(allowed => source.startsWith(allowed));
};

const buildCorsHeaders = () => ({
  'access-control-allow-origin': process.env.URL ?? '*',
  'access-control-allow-methods': 'GET, OPTIONS',
  'access-control-allow-headers': 'Content-Type',
});

const jsonResponse = (body: unknown, init?: ResponseInit) =>
  new Response(JSON.stringify(body), {
    ...init,
    headers: {
      'content-type': 'application/json',
      ...buildCorsHeaders(),
      ...init?.headers,
    },
  });

interface LastFmRecentResponse {
  recenttracks?: {
    track: {
      name: string;
      artist: { '#text': string };
      album: { '#text': string };
      image?: { '#text': string; size: string }[];
      '@attr'?: { nowplaying?: string };
      url: string;
    }[];
  };
}

export default async (request: Request) => {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: buildCorsHeaders() });
  }

  if (request.method !== 'GET') {
    return jsonResponse({ error: 'Method not allowed' }, { status: 405 });
  }

  if (!isAllowedOrigin(request)) {
    return jsonResponse({ error: 'Forbidden' }, { status: 403 });
  }

  const apiKey = process.env.LASTFM_API_KEY ?? process.env.VITE_LASTFM_API_KEY;
  const username = process.env.LASTFM_USERNAME ?? process.env.VITE_LASTFM_USERNAME;

  if (!apiKey || !username) {
    return jsonResponse({ isPlaying: false, track: null, message: 'Last.fm credentials not configured' }, { status: 200 });
  }

  try {
    const lastFmUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(username)}&api_key=${encodeURIComponent(apiKey)}&format=json&limit=1`;
    const res = await fetch(lastFmUrl);

    if (!res.ok) {
      return jsonResponse({ isPlaying: false, track: null }, { status: 200 });
    }

    const data = (await res.json()) as LastFmRecentResponse;
    const firstTrack = data.recenttracks?.track?.[0];

    if (firstTrack && firstTrack['@attr']?.nowplaying === 'true') {
      const largeImage =
        firstTrack.image?.find(img => img.size === 'extralarge' || img.size === 'large')?.['#text'] ?? '';

      return jsonResponse({
        isPlaying: true,
        track: {
          title: firstTrack.name,
          artist: firstTrack.artist['#text'],
          album: firstTrack.album['#text'] || 'Single',
          albumArt: largeImage,
          spotifyUrl: `https://open.spotify.com/search/${encodeURIComponent(`${firstTrack.name} ${firstTrack.artist['#text']}`)}`,
          source: 'lastfm',
        },
      });
    }

    return jsonResponse({ isPlaying: false, track: null });
  } catch (error) {
    return jsonResponse(
      { isPlaying: false, track: null, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 200 },
    );
  }
};
