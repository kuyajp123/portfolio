import { QUOTE_URL, QUOTES } from '@/API/endpoint';
import { programmingQuotes } from '@/constant/quotes';
import { usePageVisible } from '@/hooks/usePageVisible';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export interface QuoteResponse {
  quote: string;
  author: string;
  category?: string;
}

const QUOTE_REFRESH_INTERVAL_MS = 15000;
const QUOTE_FADE_DURATION_MS = 300;

let fallbackIndex = Math.floor(Math.random() * programmingQuotes.length);

const getNextFallback = (): QuoteResponse => {
  const q = programmingQuotes[fallbackIndex % programmingQuotes.length];
  fallbackIndex++;
  return q;
};

let quoteRequest: Promise<QuoteResponse> | null = null;

const getQuote = async (): Promise<QuoteResponse> => {
  if (quoteRequest) return quoteRequest;

  quoteRequest = (async () => {
    try {
      const response = await fetch(`${QUOTE_URL}${QUOTES.GET}`);
      if (!response.ok) {
        throw new Error('Unable to load quote');
      }
      const data: unknown = await response.json();
      const nextQuote = (Array.isArray(data) ? data[0] : data) as Record<string, unknown> | null;

      if (
        !nextQuote ||
        typeof nextQuote.quote !== 'string' ||
        typeof nextQuote.author !== 'string'
      ) {
        throw new Error('Invalid quote response');
      }

      return {
        quote: nextQuote.quote,
        author: nextQuote.author,
        category: typeof nextQuote.category === 'string' ? nextQuote.category : undefined,
      };
    } finally {
      quoteRequest = null;
    }
  })();

  return quoteRequest;
};

export const Quote = () => {
  const [quote, setQuote] = useState<QuoteResponse>(
    () => programmingQuotes[Math.floor(Math.random() * programmingQuotes.length)],
  );
  const [isVisible, setIsVisible] = useState(true);
  const fadeTimeoutRef = useRef<number | null>(null);
  const timeRemainingRef = useRef(QUOTE_REFRESH_INTERVAL_MS);
  const lastResumeTimeRef = useRef<number | null>(null);

  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
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

  useEffect(() => {
    if (!isCurrentlyViewed) {
      return;
    }

    const ignore = { current: false };
    let timeoutId: number | null = null;

    lastResumeTimeRef.current = Date.now();

    const loadQuote = () => {
      getQuote()
        .then(nextQuote => {
          if (!ignore.current) {
            showQuote(nextQuote, ignore);
          }
        })
        .catch(() => {
          if (!ignore.current) {
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
  }, [isCurrentlyViewed]);

  return (
    <aside ref={sectionRef} className="w-full max-w-2xl mx-auto px-4 py-8 flex flex-col items-center text-center">
      <figure
        className={`transition-all duration-300 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
        }`}
      >
        <blockquote className="text-xs sm:text-sm text-gray-700 dark:text-gray-400 italic leading-relaxed font-medium">
          "{quote.quote}"
        </blockquote>
        <figcaption className="mt-2 text-[11px] font-mono text-gray-600 dark:text-gray-500 font-medium">
          - {quote.author}
        </figcaption>
      </figure>
    </aside>
  );
};