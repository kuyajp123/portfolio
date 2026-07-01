import { QUOTE_URL, QUOTES } from '@/API/endpoint';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

type QuoteResponse = {
  quote: string;
  author: string;
  category?: string;
};

const QUOTE_REFRESH_INTERVAL_MS = 15000;
const QUOTE_FADE_DURATION_MS = 300;
const CACHE_KEY = 'portfolio_quote_cache';

// ---------------------------------------------------------------------------
// Session cache helpers — persists quote + fetch timestamp across page reloads
// so we don't make a redundant API call if the 15-second window hasn't elapsed.
// ---------------------------------------------------------------------------
type QuoteCache = {
  data: QuoteResponse;
  fetchedAt: number; // Unix ms timestamp
};

const saveCache = (data: QuoteResponse): void => {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, fetchedAt: Date.now() } satisfies QuoteCache));
  } catch {
    // sessionStorage may be unavailable (e.g. private browsing restrictions)
  }
};

const loadCache = (): QuoteCache | null => {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    return raw ? (JSON.parse(raw) as QuoteCache) : null;
  } catch {
    return null;
  }
};

// ---------------------------------------------------------------------------
// API
// ---------------------------------------------------------------------------
let quoteRequest: Promise<QuoteResponse> | null = null;

const getQuote = () => {
  quoteRequest ??= fetch(`${QUOTE_URL}${QUOTES.GET}`)
    .then(response => {
      if (!response.ok) {
        quoteRequest = null;
        throw new Error('Unable to load quote');
      }

      return response.json();
    })
    .then(data => {
      const nextQuote = Array.isArray(data) ? data[0] : data;

      if (!nextQuote?.quote || !nextQuote?.author) {
        quoteRequest = null;
        throw new Error('Invalid quote response');
      }

      return nextQuote;
    })
    .catch(error => {
      quoteRequest = null;
      throw error;
    })
    .finally(() => {
      quoteRequest = null;
    });

  return quoteRequest;
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const Quote = () => {
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasQuoteRef = useRef(false);
  const fadeTimeoutRef = useRef<number | null>(null);

  // Track whether the quote section is currently scrolled into view.
  // The recurring interval is only active while `inView` is true.
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1, // trigger when at least 10 % of the element is visible
  });

  const clearFadeTimeout = () => {
    if (fadeTimeoutRef.current !== null) {
      window.clearTimeout(fadeTimeoutRef.current);
      fadeTimeoutRef.current = null;
    }
  };

  const showQuote = (nextQuote: QuoteResponse, ignore: { current: boolean }) => {
    clearFadeTimeout();

    if (!hasQuoteRef.current) {
      hasQuoteRef.current = true;
      setQuote(nextQuote);
      setIsVisible(true);
      return;
    }

    setIsVisible(false);
    fadeTimeoutRef.current = window.setTimeout(() => {
      if (!ignore.current) {
        setQuote(nextQuote);
        setIsVisible(true);
      }

      fadeTimeoutRef.current = null;
    }, QUOTE_FADE_DURATION_MS);
  };

  // On mount: serve the cached quote instantly if available (no API call).
  // Only fall back to a real fetch when the cache is empty.
  useEffect(() => {
    const ignore = { current: false };
    const cached = loadCache();

    if (cached) {
      console.log('[Quote] Restored from cache — skipping initial API call.');
      showQuote(cached.data, ignore);
      return () => {
        ignore.current = true;
        clearFadeTimeout();
      };
    }

    console.log('[Quote] No cache found — fetching initial quote.');
    getQuote()
      .then(nextQuote => {
        if (!ignore.current) {
          saveCache(nextQuote);
          showQuote(nextQuote, ignore);
          setError(null);
        }
      })
      .catch(err => {
        if (!ignore.current) {
          setError(err instanceof Error ? err.message : 'Unable to load quote');
        }
      });

    return () => {
      ignore.current = true;
      clearFadeTimeout();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Start the recurring interval only while the section is visible on screen.
  // Uses the cached timestamp to honour the original 15-second schedule even
  // after a page reload — so the next fetch fires at the right time, not
  // immediately.
  useEffect(() => {
    if (inView) {
      console.log('[Quote] Section entered viewport — scheduling next refresh.');
    } else {
      console.log('[Quote] Section left viewport — pausing refresh.');
    }

    if (!inView) return;

    const ignore = { current: false };

    const loadQuote = () => {
      console.log('[Quote] Fetching new quote…');
      getQuote()
        .then(nextQuote => {
          if (!ignore.current) {
            saveCache(nextQuote);
            showQuote(nextQuote, ignore);
            setError(null);
          }
        })
        .catch(err => {
          if (!ignore.current) {
            setError(err instanceof Error ? err.message : 'Unable to load quote');
          }
        });
    };

    // Calculate how long until the NEXT scheduled fetch based on the last
    // recorded fetch time. This preserves the 15-second cadence across
    // reloads and navigation events instead of always restarting from zero.
    const cached = loadCache();
    const elapsed = cached ? Date.now() - cached.fetchedAt : QUOTE_REFRESH_INTERVAL_MS;
    const timeUntilNext = Math.max(0, QUOTE_REFRESH_INTERVAL_MS - elapsed);

    console.log(`[Quote] Next fetch in ${Math.round(timeUntilNext / 1000)}s.`);

    let intervalId: number;
    const timeoutId = window.setTimeout(() => {
      if (!ignore.current) {
        loadQuote();
        intervalId = window.setInterval(loadQuote, QUOTE_REFRESH_INTERVAL_MS);
      }
    }, timeUntilNext);

    return () => {
      ignore.current = true;
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
      clearFadeTimeout();
      console.log('[Quote] Refresh paused.');
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  if (error || !quote) {
    // Still attach the ref so IntersectionObserver can detect when the
    // section becomes visible (e.g. on first load before any quote is shown).
    return <div ref={sectionRef} />;
  }

  return (
    <aside ref={sectionRef} className="w-full max-w-4xl px-4 pb-4 flex flex-row justify-center">
      <figure
        className={`p-4 text-sm transition-all duration-300 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
        }`}
      >
        <blockquote className="text-gray-700 dark:text-gray-200">"{quote.quote}"</blockquote>
        <figcaption className="mt-2 text-xs text-gray-500 dark:text-gray-400">- {quote.author}</figcaption>
      </figure>
    </aside>
  );
};
