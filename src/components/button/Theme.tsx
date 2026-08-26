import { useTheme } from 'next-themes';
import { HiMoon, HiSun } from 'react-icons/hi2';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  return (
    <button
      onClick={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
      }}
      className="cursor-pointer p-1.5 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
      aria-label="Toggle visual theme"
    >
      {theme === 'dark' ? <HiMoon size={18} /> : <HiSun size={18} />}
    </button>
  );
};