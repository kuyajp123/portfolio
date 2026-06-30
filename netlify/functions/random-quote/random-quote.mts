const API_NINJAS_QUOTES_URL = 'https://api.api-ninjas.com/v2/randomquotes';

const jsonResponse = (body: unknown, init?: ResponseInit) =>
  new Response(JSON.stringify(body), {
    ...init,
    headers: {
      'content-type': 'application/json',
      ...init?.headers,
    },
  });

export default async (request: Request) => {
  if (request.method !== 'GET') {
    return jsonResponse({ error: 'Method not allowed' }, { status: 405 });
  }

  const apiKey = process.env.API_NINJAS_KEY;

  if (!apiKey) {
    return jsonResponse({ error: 'API_NINJAS_KEY is not configured' }, { status: 500 });
  }

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

    return jsonResponse(body, {
      status: upstreamResponse.status,
      headers: {
        'cache-control': 'no-store',
      },
    });
  } catch (error) {
    return jsonResponse(
      {
        error: error instanceof Error ? error.message : 'Unable to fetch quote',
      },
      { status: 500 },
    );
  }
};
