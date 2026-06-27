import { hoverThemeClass } from '@/utils/themeClasses';
import { useTheme } from 'next-themes';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const handleEmailClick = () => {
  window.location.href = 'mailto:johnpaulnaag10@email.com';
};

const handleGithubClick = () => {
  window.open('https://github.com/kuyajp123', '_blank');
};

const handleLinkedinClick = () => {
  window.open('https://www.linkedin.com/in/john-paul-naag-40129b3a8', '_blank');
};

export const SendEmail = () => {
  const { resolvedTheme } = useTheme();

  return (
    <button
      className={`border border-gray-600 w-fit p-2 text-sm rounded cursor-pointer ${hoverThemeClass(resolvedTheme as 'light' | 'dark')}`}
      onClick={handleEmailClick}
    >
      Send Email
    </button>
  );
};

export const GithubLink = () => {
  return (
    <button
      onClick={handleGithubClick}
      className="text-sm inline-flex items-center gap-1 w-fit p-2 rounded cursor-pointer"
    >
      <FaGithub />
      Github
    </button>
  );
};

export const LinkedinLink = () => {
  return (
    <button
      onClick={handleLinkedinClick}
      className="text-sm inline-flex items-center gap-1 w-fit p-2 rounded cursor-pointer"
    >
      <FaLinkedin />
      LinkedIn
    </button>
  );
};
