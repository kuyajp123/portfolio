import { useTheme } from 'next-themes';
import { HiMoon, HiSun } from 'react-icons/hi2';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="cursor-pointer w-fit ml-auto">
      {theme === 'dark' ? <HiMoon size={24} /> : <HiSun size={24} />}
    </button>
  );
};
