import type { SyntheticEvent } from 'react';
import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const terminalLines = [
  'HTTP/1.1 404 Not Found',
  '',
  "The page you're looking for doesn't exist.",
  '',
  'Maybe it was renamed,',
  'deleted,',
  'or never committed.',
  '',
  'Available commands:',
  '',
  '> home',
];

export const NotFound = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  const goHome = () => {
    void navigate('/');
  };

  const runCommand = () => {
    const normalizedCommand = command.trim().toLowerCase();

    if (!normalizedCommand || ['home', 'y', 'yes'].includes(normalizedCommand)) {
      goHome();
      return;
    }

    setHistory(currentHistory => [...currentHistory, `$ ${command}`, `command not found: ${command}`, 'try: home', '']);
    setCommand('');
  };

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    runCommand();
  };

  return (
    <main className="flex min-h-screen flex-col bg-gray-50 p-4 text-gray-900 dark:bg-[#0a0a0a] dark:text-gray-100">
      <section className="flex flex-1 items-center justify-center py-10">
        <div className="w-full max-w-2xl text-center">
          {/* <div className="relative mx-auto mb-8 flex h-48 w-full max-w-sm items-center justify-center">
            <div className="absolute left-8 top-6 h-28 w-24 rotate-[-8deg] rounded-sm border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-gray-900" />
            <div className="absolute right-8 bottom-4 h-28 w-24 rotate-[7deg] rounded-sm border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-gray-900" />
            <div className="relative z-10 flex h-40 w-40 items-center justify-center rounded-sm border border-gray-200 bg-white shadow-md dark:border-white/10 dark:bg-gray-950">
              <HiOutlineDocumentSearch className="h-20 w-20 text-sky-600 dark:text-sky-300" />
              <span className="absolute -right-4 -top-4 rounded-sm bg-amber-300 px-3 py-1 font-jetbrains text-sm font-semibold text-gray-950 shadow-sm dark:bg-amber-400">
                404
              </span>
              <span className="absolute -bottom-4 left-4 flex items-center gap-1 rounded-sm border border-gray-200 bg-gray-50 px-2 py-1 font-jetbrains text-[0.65rem] font-semibold text-gray-600 shadow-sm dark:border-white/10 dark:bg-gray-900 dark:text-gray-300">
                <HiOutlineTerminal className="h-3.5 w-3.5" />
                lost commit
              </span>
            </div>
          </div> */}

          <p className="font-jetbrains text-sm font-semibold text-rose-600 dark:text-rose-300">
            HTTP/1.1 404 Not Found
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950 dark:text-white md:text-5xl">
            Page Not Found
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-gray-600 dark:text-gray-400">
            This route is not in the portfolio history. It may have been renamed, deleted, or never committed.
          </p>
        </div>
      </section>

      <section
        className="font-jetbrains mx-auto w-full max-w-3xl overflow-hidden rounded-sm border border-gray-200 bg-white text-xs shadow-sm dark:border-white/10 dark:bg-gray-950"
        onClick={() => {
          inputRef.current?.focus();
        }}
      >
        <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-4 py-2 dark:border-white/10 dark:bg-gray-900">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" aria-hidden="true" />
          <span className="ml-auto text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
            not-found.sh
          </span>
        </div>

        <div className="max-h-[30rem] space-y-1 overflow-y-auto px-4 py-4 leading-6 text-gray-800 dark:text-gray-200">
          <p className="break-words">
            <span className="text-emerald-600 dark:text-emerald-300">$</span>{' '}
            <span className="text-sky-600 dark:text-sky-300">curl</span>{' '}
            <span className="text-rose-600 dark:text-rose-300">https://paul{pathname}</span>
          </p>

          <div className="pt-3">
            {terminalLines.map((line, index) => (
              <p
                className={
                  line === 'HTTP/1.1 404 Not Found'
                    ? 'font-semibold text-amber-600 dark:text-amber-300'
                    : line === '> home'
                      ? 'font-semibold text-emerald-600 dark:text-emerald-300'
                      : 'min-h-6'
                }
                key={`${line}-${String(index)}`}
              >
                {line}
              </p>
            ))}
          </div>

          {history.length > 0 && (
            <div className="pt-3">
              {history.map((line, index) => (
                <p
                  className={line.startsWith('command not found') ? 'text-rose-600 dark:text-rose-300' : 'min-h-6'}
                  key={`${line}-${String(index)}`}
                >
                  {line}
                </p>
              ))}
            </div>
          )}

          <form className="flex items-center gap-2 pt-3" onSubmit={handleSubmit}>
            <label className="text-emerald-600 dark:text-emerald-300" htmlFor="not-found-command">
              $
            </label>
            <input
              ref={inputRef}
              id="not-found-command"
              value={command}
              onChange={event => {
                setCommand(event.target.value);
              }}
              autoComplete="off"
              autoCapitalize="none"
              autoFocus
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  runCommand();
                }
              }}
              className="min-w-0 flex-1 bg-transparent text-gray-950 caret-emerald-500 outline-none dark:text-gray-100"
              aria-label="404 terminal command"
            />
          </form>
        </div>
      </section>
    </main>
  );
};
