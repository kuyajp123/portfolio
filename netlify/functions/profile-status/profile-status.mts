import { Redis } from '@upstash/redis';

const REDIS_PROFILE_STATUS_KEY = 'portfolio_profile_status';

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
    console.error('[profile-status] Redis init failed:', err);
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
    return jsonResponse({ status: '' }, { status: 200 });
  }

  // GET: Retrieve profile status
  if (request.method === 'GET') {
    try {
      const data = await redis.get<string | { text?: string }>(REDIS_PROFILE_STATUS_KEY);
      if (typeof data === 'string' && data.trim() !== '') {
        return jsonResponse({ status: data.trim() });
      }
      if (typeof data === 'object' && data !== null && typeof data.text === 'string' && data.text.trim() !== '') {
        return jsonResponse({ status: data.text.trim() });
      }
      return jsonResponse({ status: '' });
    } catch (err) {
      console.error('[profile-status] GET failed:', err);
      return jsonResponse({ status: '' });
    }
  }

  // POST: Update profile status
  if (request.method === 'POST') {
    try {
      const body = (await request.json()) as { status?: string };
      const statusText = typeof body.status === 'string' ? body.status.trim() : '';

      await redis.set(REDIS_PROFILE_STATUS_KEY, statusText);
      return jsonResponse({ success: true, status: statusText });
    } catch (err) {
      console.error('[profile-status] POST failed:', err);
      return jsonResponse({ error: 'Failed to update profile status' }, { status: 500 });
    }
  }

  return jsonResponse({ error: 'Method not allowed' }, { status: 405 });
};
