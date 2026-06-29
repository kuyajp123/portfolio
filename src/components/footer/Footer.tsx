const year = new Date().getFullYear();

const commits = [
  {
    hash: 'f7g8h9i',
    type: 'fix',
    message: 'looking for my next opportunity👋',
    typeClass: 'text-rose-600 dark:text-rose-300',
  },
  {
    hash: 'e4f5g6h',
    type: 'feat',
    message: 'built this portfolio',
    typeClass: 'text-emerald-600 dark:text-emerald-300',
  },
  {
    hash: 'd1e2f3a',
    type: 'feat!',
    message: 'graduated BSIT',
    typeClass: 'text-amber-600 dark:text-amber-300',
  },
  {
    hash: 'c7d8e9f',
    type: 'feat',
    message: 'developed Rescuenect🏆',
    typeClass: 'text-emerald-600 dark:text-emerald-300',
  },
  {
    hash: 'b4c5d6e',
    type: 'feat',
    message: 'started my development journey',
    typeClass: 'text-emerald-600 dark:text-emerald-300',
  },
  {
    hash: 'a1b2c3d',
    type: 'chore',
    message: 'initial commit',
    typeClass: 'text-sky-600 dark:text-sky-300',
  },
];

export const Footer = () => {
  return (
    <footer className="p-4 pt-0">
      <section className="font-jetbrains overflow-hidden rounded-sm border border-gray-200 bg-white text-xs shadow-sm dark:border-white/10 dark:bg-gray-950">
        <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-4 py-2 dark:border-white/10 dark:bg-gray-900">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" aria-hidden="true" />
          <span className="ml-auto text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
            portfolio.git
          </span>
        </div>

        <div className="px-4 py-4">
          <p className="flex flex-wrap items-center gap-x-1 gap-y-0.5 text-gray-700 dark:text-gray-300">
            <span className="font-semibold text-emerald-600 dark:text-emerald-300">john-paul@portfolio</span>
            <span className="text-gray-400">:</span>
            <span className="font-semibold text-sky-600 dark:text-sky-300">~/career</span>
            <span className="text-gray-500">$</span>
            <span className="text-gray-950 dark:text-gray-100">git log --oneline --decorate</span>
          </p>

          <p className="mt-3 text-gray-700 dark:text-gray-300">
            <span className="font-semibold text-yellow-600 dark:text-yellow-300">HEAD</span>
            <span className="text-gray-400"> -&gt; </span>
            <span className="font-semibold text-cyan-600 dark:text-cyan-300">main</span>
          </p>

          <ol className="mt-2 space-y-1.5">
            {commits.map((commit) => (
              <li className="grid grid-cols-[4.75rem_minmax(0,1fr)] gap-3 text-gray-800 dark:text-gray-200" key={commit.hash}>
                <span className="font-semibold text-purple-600 dark:text-purple-300">{commit.hash}</span>
                <span className="min-w-0 break-words">
                  <span className={`font-semibold ${commit.typeClass}`}>{commit.type}:</span> {commit.message}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <p className="border-t border-gray-200 px-4 py-3 text-center text-[0.7rem] text-gray-500 dark:border-white/10 dark:text-gray-400">
          © {year} John Paul Naag All rights reserved.
        </p>
      </section>
    </footer>
  );
};
