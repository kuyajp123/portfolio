import { getStore } from '@netlify/blobs';

const API_NINJAS_QUOTES_URL = 'https://api.api-ninjas.com/v2/randomquotes';

const RATE_LIMIT_MS = 15_000; // must match QUOTE_REFRESH_INTERVAL_MS on the frontend
const BLOB_STORE_NAME = 'quote-rate-limit';

// ---------------------------------------------------------------------------
// Netlify Blobs-backed rate-limit store (per IP).
//
// Unlike an in-memory Map, Blobs persist across function invocations, cold
// starts, and multiple concurrent instances — making rate limiting reliable
// in both local dev (netlify dev) and production.
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
const jsonResponse = (body: unknown, init?: ResponseInit) =>
  new Response(JSON.stringify(body), {
    ...init,
    headers: {
      'content-type': 'application/json',
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
  if (request.method !== 'GET') {
    return jsonResponse({ error: 'Method not allowed' }, { status: 405 });
  }

  const apiKey = process.env.API_NINJAS_KEY;

  if (!apiKey) {
    return jsonResponse({ error: 'API_NINJAS_KEY is not configured' }, { status: 500 });
  }

  const clientIp = getClientIp(request);
  const now = Date.now();

  // console.log(`[random-quote] Request from IP: ${clientIp}`);

  // Load the persisted entry for this IP from Netlify Blobs.
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
      // console.log(
      //   `[random-quote] ✅ CACHE HIT — returning cached quote (${Math.ceil(remaining / 1000)}s until next upstream fetch). Upstream API NOT called.`,
      // );

      return jsonResponse(entry.lastQuote, {
        status: 200,
        headers: {
          'cache-control': 'no-store',
          'x-rate-limit-remaining-ms': String(remaining),
          'x-rate-limit-cached': 'true',
        },
      });
    }

    // console.log(`[random-quote] ⏱ Rate-limit window expired — fetching fresh quote from upstream.`);
  } else {
    // console.log(`[random-quote] 🆕 No cache entry for this IP — fetching fresh quote from upstream.`);
  }

  // Outside rate-limit window — fetch a fresh quote from the upstream API.
  try {
    const incomingUrl = new URL(request.url);
    const upstreamUrl = new URL(API_NINJAS_QUOTES_URL);
    upstreamUrl.search = incomingUrl.search;

    const upstreamResponse = await fetch(upstreamUrl, {
      headers: {
        'X-Api-Key': apiKey,
      },
    });

    const contentType = upstreamResponse.headers.get('content-type') ?? '';
    const body = contentType.includes('application/json')
      ? await upstreamResponse.json()
      : { error: await upstreamResponse.text() };

    if (upstreamResponse.ok) {
      // Persist the result so subsequent requests within the window get the
      // cached quote without hitting the upstream API.
      const newEntry: RateLimitEntry = { lastFetchedAt: now, lastQuote: body };
      await store.set(clientIp, JSON.stringify(newEntry));
      // console.log(
      //   `[random-quote] 🌐 UPSTREAM HIT — fetched fresh quote from API Ninjas. Cached for next ${RATE_LIMIT_MS / 1000}s.`,
      // );
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
