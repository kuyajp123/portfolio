import { QUOTE_URL, QUOTES } from '@/API/endpoint';
import { useEffect, useRef, useState } from 'react';

type QuoteResponse = {
  quote: string;
  author: string;
  category?: string;
};

const QUOTE_REFRESH_INTERVAL_MS = 15000;
const QUOTE_FADE_DURATION_MS = 300;

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

export const Quote = () => {
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasQuoteRef = useRef(false);
  const fadeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    let ignore = false;

    const clearFadeTimeout = () => {
      if (fadeTimeoutRef.current !== null) {
        window.clearTimeout(fadeTimeoutRef.current);
        fadeTimeoutRef.current = null;
      }
    };

    const showQuote = (nextQuote: QuoteResponse) => {
      clearFadeTimeout();

      if (!hasQuoteRef.current) {
        hasQuoteRef.current = true;
        setQuote(nextQuote);
        setIsVisible(true);
        return;
      }

      setIsVisible(false);
      fadeTimeoutRef.current = window.setTimeout(() => {
        if (!ignore) {
          setQuote(nextQuote);
          setIsVisible(true);
        }

        fadeTimeoutRef.current = null;
      }, QUOTE_FADE_DURATION_MS);
    };

    const loadQuote = () => {
      getQuote()
        .then(nextQuote => {
          if (!ignore) {
            showQuote(nextQuote);
            setError(null);
          }
        })
        .catch(error => {
          if (!ignore) {
            setError(error instanceof Error ? error.message : 'Unable to load quote');
          }
        });
    };

    loadQuote();
    const intervalId = window.setInterval(loadQuote, QUOTE_REFRESH_INTERVAL_MS);

    return () => {
      ignore = true;
      window.clearInterval(intervalId);
      clearFadeTimeout();
    };
  }, []);

  if (error || !quote) {
    return null;
  }

  return (
    <aside className="w-full max-w-4xl px-4 pb-4 flex flex-row justify-center">
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
