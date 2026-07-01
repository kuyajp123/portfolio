import { QUOTE_URL, QUOTES } from '@/API/endpoint';
import { programmingQuotes } from '@/constant/quotes';
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
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasQuoteRef = useRef(false);
  const fadeTimeoutRef = useRef<number | null>(null);

  // Track whether the quote section is currently scrolled into view.
  // Nothing runs — no fetch, no interval — until inView becomes true.
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
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

    // Subsequent quotes — fade out → swap → fade in.
    setIsVisible(false);
    fadeTimeoutRef.current = window.setTimeout(() => {
      if (!ignore.current) {
        setQuote(nextQuote);
        setIsVisible(true);
      }

      fadeTimeoutRef.current = null;
    }, QUOTE_FADE_DURATION_MS);
  };

  // All fetching and scheduling lives here — only active while inView is true.
  useEffect(() => {
    if (inView) {
      logger.log('[Quote] Section entered viewport — starting quote cycle.');
    } else {
      logger.log('[Quote] Section left viewport — pausing quote cycle.');
    }

    if (!inView) return;

    const ignore = { current: false };

    // Show a fallback quote immediately so the section is never empty.
    const fallback = getNextFallback();
    logger.log('[Quote] Showing fallback quote:', fallback.author);
    showQuote(fallback, ignore);

    const loadQuote = () => {
      logger.log('[Quote] Fetching new quote from API…');
      getQuote()
        .then(nextQuote => {
          if (!ignore.current) {
            logger.log('[Quote] API quote received — replacing fallback.');
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

    // Fetch from the API after the interval — the fallback is shown in the
    // meantime so users always see something right away.
    const intervalId = window.setInterval(loadQuote, QUOTE_REFRESH_INTERVAL_MS);

    return () => {
      ignore.current = true;
      window.clearInterval(intervalId);
      clearFadeTimeout();
      logger.log('[Quote] Quote cycle paused.');
    };
  }, [inView]);

  return (
    <aside ref={sectionRef} className="w-full max-w-4xl px-4 pb-4 flex flex-row justify-center">
      <figure
        className={`p-4 text-sm transition-all duration-300 ease-out ${
          quote && isVisible ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
        }`}
      >
        {quote && (
          <>
            <blockquote className="text-gray-700 dark:text-gray-200">"{quote.quote}"</blockquote>
            <figcaption className="mt-2 text-xs text-gray-500 dark:text-gray-400">- {quote.author}</figcaption>
          </>
        )}
      </figure>
    </aside>
  );
};
