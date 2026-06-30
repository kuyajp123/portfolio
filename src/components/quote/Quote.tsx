import { QUOTE_URL, QUOTES } from '@/API/endpoint';
import { useEffect, useState } from 'react';

type QuoteResponse = {
  quote: string;
  author: string;
  category?: string;
};

export const Quote = () => {
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${QUOTE_URL}${QUOTES.GET}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Unable to load quote');
        }

        return response.json();
      })
      .then(data => {
        const nextQuote = Array.isArray(data) ? data[0] : data;
        setQuote(nextQuote);
      })
      .catch(error => {
        setError(error instanceof Error ? error.message : 'Unable to load quote');
      });
  }, []);

  if (error || !quote) {
    return null;
  }

  return (
    <aside className="w-full max-w-4xl px-4 pb-4">
      <figure className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm shadow-sm dark:border-white/10 dark:bg-gray-900">
        <blockquote className="text-gray-700 dark:text-gray-200">"{quote.quote}"</blockquote>
        <figcaption className="mt-2 text-xs text-gray-500 dark:text-gray-400">- {quote.author}</figcaption>
      </figure>
    </aside>
  );
};
