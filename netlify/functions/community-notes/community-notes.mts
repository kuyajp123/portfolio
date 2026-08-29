import { Redis } from '@upstash/redis';

export type CardColor = 'obsidian' | 'amber' | 'emerald' | 'sapphire' | 'plum' | 'titanium';

export interface CommunityNote {
  id: string;
  authorKey: string;
  name: string;
  role?: string;
  message: string;
  color: CardColor;
  spotNumber: number;
  memberNumber?: number;
  createdAt: number;
  updatedAt?: number;
}

const REDIS_KEY = 'portfolio_community_notes_v2';

const getAllowedOrigins = (): string[] =>
  [
    process.env.URL,
    'http://localhost:8888',
    'http://localhost:5173',
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
  'access-control-allow-methods': 'GET, POST, OPTIONS',
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

const getRedisClient = (): Redis | null => {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.VITE_UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.VITE_UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  try {
    return new Redis({ url, token });
  } catch (err) {
    console.error('[community-notes] Redis init failed:', err);
    return null;
  }
};

export default async (request: Request) => {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: buildCorsHeaders() });
  }

  if (!isAllowedOrigin(request)) {
    return jsonResponse({ error: 'Forbidden' }, { status: 403 });
  }

  const redis = getRedisClient();
  if (!redis) {
    return jsonResponse({ error: 'Upstash Redis is not configured' }, { status: 500 });
  }

  // GET: Fetch all community notes
  if (request.method === 'GET') {
    try {
      const data = await redis.get<CommunityNote[]>(REDIS_KEY);
      return jsonResponse(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('[community-notes] GET failed:', err);
      return jsonResponse({ error: 'Failed to retrieve notes' }, { status: 500 });
    }
  }

  // POST: Create or update a community note
  if (request.method === 'POST') {
    try {
      const body = (await request.json()) as {
        id?: string;
        authorKey?: string;
        name?: string;
        role?: string;
        message?: string;
        color?: CardColor;
      };

      if (!body || typeof body.message !== 'string' || body.message.trim() === '') {
        return jsonResponse({ error: 'Message is required' }, { status: 400 });
      }

      const authorKey =
        typeof body.authorKey === 'string' && body.authorKey.trim() !== ''
          ? body.authorKey.trim()
          : 'usr_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);

      const color: CardColor = body.color ?? 'obsidian';
      const name = typeof body.name === 'string' ? body.name.trim() : '';
      const role = typeof body.role === 'string' && body.role.trim() !== '' ? body.role.trim() : undefined;
      const message = body.message.trim();

      const existingData = await redis.get<CommunityNote[]>(REDIS_KEY);
      const existingNotes: CommunityNote[] = Array.isArray(existingData) ? existingData : [];

      const existingIndex = body.id
        ? existingNotes.findIndex(n => n.id === body.id && (n.authorKey === authorKey || !n.authorKey))
        : -1;

      let savedNote: CommunityNote;
      let isNew = false;
      let updatedList: CommunityNote[];

      if (existingIndex >= 0) {
        savedNote = {
          ...existingNotes[existingIndex],
          name,
          role,
          message,
          color,
          updatedAt: Date.now(),
        };
        updatedList = [...existingNotes];
        updatedList[existingIndex] = savedNote;
      } else {
        isNew = true;
        const maxSpotNumber = existingNotes.reduce(
          (max, n) => (n.spotNumber > max ? n.spotNumber : max),
          0
        );

        savedNote = {
          id: 'note_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36),
          authorKey,
          name,
          role,
          message,
          color,
          spotNumber: maxSpotNumber + 1,
          createdAt: Date.now(),
        };
        updatedList = [savedNote, ...existingNotes];
      }

      await redis.set(REDIS_KEY, updatedList);
      return jsonResponse({ note: savedNote, isNew });
    } catch (err) {
      console.error('[community-notes] POST failed:', err);
      return jsonResponse({ error: 'Failed to save note' }, { status: 500 });
    }
  }

  return jsonResponse({ error: 'Method not allowed' }, { status: 405 });
};
