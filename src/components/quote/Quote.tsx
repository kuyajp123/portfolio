import { QUOTE_URL, QUOTES } from '@/API/endpoint';
import { programmingQuotes } from '@/constant/quotes';
import { usePageVisible } from '@/hooks/usePageVisible';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { logger } from '@/config/logger';

type QuoteResponse = {
  quote: string;
  author: string;
  category?: string;
};

const QUOTE_REFRESH_INTERVAL_MS = 15000;
const QUOTE_FADE_DURATION_MS = 300;

// ---------------------------------------------------------------------------
// Fallback helpers — cycles through local quotes on API failure.
// ---------------------------------------------------------------------------
let fallbackIndex = Math.floor(Math.random() * programmingQuotes.length);

const getNextFallback = (): QuoteResponse => {
  const q = programmingQuotes[fallbackIndex % programmingQuotes.length];
  fallbackIndex++;
  return q;
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
  // Pick one random fallback on first render only — never replaced on re-entry.
  // The inView effect only starts the interval; it never touches this initial value.
  const [quote, setQuote] = useState<QuoteResponse>(
    () => programmingQuotes[Math.floor(Math.random() * programmingQuotes.length)],
  );
  const [isVisible, setIsVisible] = useState(true);
  const fadeTimeoutRef = useRef<number | null>(null);
  const timeRemainingRef = useRef(QUOTE_REFRESH_INTERVAL_MS);
  const lastResumeTimeRef = useRef<number | null>(null);

  // Track whether the quote section is currently scrolled into view.
  // Nothing runs — no fetch, no interval — until inView becomes true.
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1, // trigger when at least 10 % of the element is visible
  });

  const isPageVisible = usePageVisible();
  const isCurrentlyViewed = inView && isPageVisible;

  const clearFadeTimeout = () => {
    if (fadeTimeoutRef.current !== null) {
      window.clearTimeout(fadeTimeoutRef.current);
      fadeTimeoutRef.current = null;
    }
  };

  const showQuote = (nextQuote: QuoteResponse, ignore: { current: boolean }) => {
    clearFadeTimeout();
    setIsVisible(false);

    fadeTimeoutRef.current = window.setTimeout(() => {
      if (!ignore.current) {
        setQuote(nextQuote);
        setIsVisible(true);
      }

      fadeTimeoutRef.current = null;
    }, QUOTE_FADE_DURATION_MS);
  };

  // Manages the accumulated viewing time. The 15-second countdown pauses when
  // scrolled out of view or tab is hidden, and resumes where it left off when scrolled back in.
  useEffect(() => {
    if (!isCurrentlyViewed) {
      logger.log(`[Quote] Section left viewport or tab inactive — pausing quote cycle. (${Math.round(timeRemainingRef.current / 1000)}s remaining)`);
      return;
    }

    logger.log(
      `[Quote] Section entered viewport and tab active — starting/resuming countdown (${Math.round(timeRemainingRef.current / 1000)}s remaining).`
    );

    const ignore = { current: false };
    let timeoutId: number | null = null;

    lastResumeTimeRef.current = Date.now();

    const loadQuote = () => {
      logger.log('[Quote] Fetching new quote from API…');
      getQuote()
        .then(nextQuote => {
          if (!ignore.current) {
            logger.log('[Quote] API quote received — replacing current quote.');
            showQuote(nextQuote, ignore);
          }
        })
        .catch(() => {
          if (!ignore.current) {
            // API failed — silently cycle to the next local fallback.
            logger.log('[Quote] API failed — cycling to next fallback quote.');
            showQuote(getNextFallback(), ignore);
          }
        });
    };

    const scheduleNext = (delay: number) => {
      timeoutId = window.setTimeout(() => {
        if (ignore.current) return;

        loadQuote();
        timeRemainingRef.current = QUOTE_REFRESH_INTERVAL_MS;
        lastResumeTimeRef.current = Date.now();
        scheduleNext(QUOTE_REFRESH_INTERVAL_MS);
      }, delay);
    };

    scheduleNext(timeRemainingRef.current);

    return () => {
      ignore.current = true;
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
      if (lastResumeTimeRef.current !== null) {
        const elapsed = Date.now() - lastResumeTimeRef.current;
        timeRemainingRef.current = Math.max(0, timeRemainingRef.current - elapsed);
        lastResumeTimeRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCurrentlyViewed]);

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
