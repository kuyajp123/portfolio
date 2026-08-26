interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle?: string;
  viewAllLink?: {
    label: string;
    href: string;
  };
}

export const SectionHeader = ({ number, title, subtitle, viewAllLink }: SectionHeaderProps) => {
  return (
    <div className="flex flex-col gap-1 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-xs font-semibold text-sky-600 dark:text-sky-400">
            {number}
          </span>
          <span className="font-mono text-xs text-gray-400 dark:text-gray-600">/</span>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 font-semibold">
            {title}
          </h2>
        </div>

        {viewAllLink && (
          <a
            href={viewAllLink.href}
            className="font-mono text-xs text-gray-500 dark:text-gray-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
          >
            {viewAllLink.label} ?
          </a>
        )}
      </div>

      {subtitle && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
};
