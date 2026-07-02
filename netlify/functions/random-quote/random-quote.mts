import { getStore } from '@netlify/blobs';

const API_NINJAS_QUOTES_URL = 'https://api.api-ninjas.com/v2/randomquotes';

const RATE_LIMIT_MS = 15_000; // must match QUOTE_REFRESH_INTERVAL_MS on the frontend
const BLOB_STORE_NAME = 'quote-rate-limit';

// ---------------------------------------------------------------------------
// Allowed origins.
//
// process.env.URL is injected automatically by Netlify on every deploy
// (e.g. "https://yajeyps.netlify.app"). Localhost entries cover local dev
// via `netlify dev` — no extra env vars required.
// ---------------------------------------------------------------------------
const getAllowedOrigins = (): string[] =>
  [
    process.env.URL,           // production domain — set by Netlify automatically
    'http://localhost:8888',   // netlify dev proxy
    'http://localhost:5173',   // vite dev server
    'http://127.0.0.1:8888',
    'http://127.0.0.1:5173',
  ].filter(Boolean) as string[];

/**
 * Returns true when the request originates from the portfolio site.
 *
 * Browsers always send an `Origin` header for cross-origin requests and a
 * `Referer` header for same-origin requests (Netlify functions are served
 * on the same domain as the site). We check both so the validation works in
 * every scenario:
 *   - production (same-origin)  → Referer: https://yajeyps.netlify.app/
 *   - local dev  (cross-origin) → Origin:  http://localhost:5173
 *
 * Direct tool calls (Postman, curl) without a matching header are rejected.
 */
const isAllowedOrigin = (request: Request): boolean => {
  const origin  = request.headers.get('origin');
  const referer = request.headers.get('referer');
  const source  = origin ?? referer;

  if (!source) return false;

  return getAllowedOrigins().some(allowed => source.startsWith(allowed));
};

// ---------------------------------------------------------------------------
// Netlify Blobs-backed rate-limit store (per IP).
//
// Blobs persist across function invocations, cold starts, and multiple
// concurrent instances — making rate limiting reliable in both local dev
// (netlify dev) and production.
//
// Blob key  : client IP address
// Blob value: JSON { lastFetchedAt: number, lastQuote: unknown }
// ---------------------------------------------------------------------------
type RateLimitEntry = {
  lastFetchedAt: number; // Unix ms
  lastQuote: unknown;    // last successful quote payload
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const buildCorsHeaders = () => ({
  // Restrict which origins the browser exposes the response to.
  // Defence-in-depth on top of the origin check above.
  'access-control-allow-origin': process.env.URL ?? 'null',
  'access-control-allow-methods': 'GET',
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

/** Best-effort extraction of the caller's IP from Netlify request headers. */
const getClientIp = (request: Request): string =>
  request.headers.get('x-nf-client-connection-ip') ??
  request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
  'unknown';

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------
export default async (request: Request) => {
  // Preflight — must succeed for CORS to work in local dev (cross-origin).
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: buildCorsHeaders() });
  }

  if (request.method !== 'GET') {
    return jsonResponse({ error: 'Method not allowed' }, { status: 405 });
  }

  // Origin / Referer guard — reject requests that don't come from the portfolio.
  if (!isAllowedOrigin(request)) {
    console.log(
      `[random-quote] 🚫 Rejected — Origin: "${request.headers.get('origin')}" Referer: "${request.headers.get('referer')}"`,
    );
    return jsonResponse({ error: 'Forbidden' }, { status: 403 });
  }

  const apiKey = process.env.API_NINJAS_KEY;

  if (!apiKey) {
    return jsonResponse({ error: 'API_NINJAS_KEY is not configured' }, { status: 500 });
  }

  const clientIp = getClientIp(request);
  const now = Date.now();

  // Load the persisted rate-limit entry for this IP from Netlify Blobs.
  const store = getStore(BLOB_STORE_NAME);
  let entry: RateLimitEntry | null = null;

  try {
    entry = await store.get(clientIp, { type: 'json' }) as RateLimitEntry | null;
  } catch {
    // Blob missing or parse error — treat as no entry, allow upstream fetch.
  }

  // Rate-limit check: if a successful response was recorded within RATE_LIMIT_MS,
  // return the cached quote instead of hitting the upstream API again.
  if (entry) {
    const elapsed = now - entry.lastFetchedAt;
    const remaining = RATE_LIMIT_MS - elapsed;

    if (remaining > 0) {
      return jsonResponse(entry.lastQuote, {
        status: 200,
        headers: {
          'cache-control': 'no-store',
          'x-rate-limit-remaining-ms': String(remaining),
          'x-rate-limit-cached': 'true',
        },
      });
    }
  }

  // Outside rate-limit window — fetch a fresh quote from the upstream API.
  try {
    const incomingUrl = new URL(request.url);
    const upstreamUrl = new URL(API_NINJAS_QUOTES_URL);
    upstreamUrl.search = incomingUrl.search;

    const upstreamResponse = await fetch(upstreamUrl, {
      headers: { 'X-Api-Key': apiKey },
    });

    const contentType = upstreamResponse.headers.get('content-type') ?? '';
    const body = contentType.includes('application/json')
      ? await upstreamResponse.json()
      : { error: await upstreamResponse.text() };

    if (upstreamResponse.ok) {
      const newEntry: RateLimitEntry = { lastFetchedAt: now, lastQuote: body };
      await store.set(clientIp, JSON.stringify(newEntry));
    }

    return jsonResponse(body, {
      status: upstreamResponse.status,
      headers: {
        'cache-control': 'no-store',
        'x-rate-limit-cached': 'false',
      },
    });
  } catch (error) {
    return jsonResponse(
      { error: error instanceof Error ? error.message : 'Unable to fetch quote' },
      { status: 500 },
    );
  }
};
