import { Link } from 'react-router-dom';
import { Footer } from '@/components/footer/Footer';

export const NotFound = () => {
  return (
    <div className="min-h-[100dvh] bg-grid-pattern flex flex-col items-center justify-between p-6">
      <div className="w-full max-w-3xl py-6 flex items-center justify-between">
        <Link to="/" className="font-mono text-sm font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          johnpaul.dev
        </Link>
      </div>

      <main className="w-full max-w-lg text-center flex flex-col items-center gap-4 py-16">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-sky-600 dark:text-sky-400">
          404 / Not Found
        </span>
        <h1 className="font-mono text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
          Page Not Located
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-sm leading-relaxed">
          The requested route does not exist or may have been relocated in the portfolio directory.
        </p>
        <Link
          to="/"
          className="mt-4 px-5 py-2.5 rounded-lg bg-black/5 dark:bg-white/8 hover:bg-black/10 dark:hover:bg-white/12 text-xs font-mono text-gray-900 dark:text-gray-100 transition-colors"
        >
          ? Return to Directory
        </Link>
      </main>

      <Footer />
    </div>
  );
};
