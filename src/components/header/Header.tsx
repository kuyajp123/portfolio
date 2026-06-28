import profile from '@/assets/profile.jpg';
import { ThemeToggle } from '@/components/button/Theme';
import { GithubLink, LinkedinLink, SendEmail } from '@/constant/links';
import type { DisplayMode } from '@/types/displayMode';
import { BsPhoneFlip } from 'react-icons/bs';
import { FiDownload } from 'react-icons/fi';

interface HeaderProps {
  displayMode: DisplayMode;
  onDisplayModeChange: (mode: DisplayMode) => void;
}

export const Header = ({ displayMode, onDisplayModeChange }: HeaderProps) => {
  return (
    <main className="flex flex-col sm:flex-row items-center gap-4">
      <img src={profile} alt="Profile" className="w-40 h-40 rounded-full" />
      <div className="flex flex-col gap-2 w-full items-center sm:items-start">
        <div>
          <h1 className="text-2xl font-bold">John Paul Naag</h1>
        </div>
        <p className="font-semibold">Developer</p>
        <div className="flex flex-row flex-wrap justify-center sm:justify-start gap-2 w-full">
          <SendEmail />
          <GithubLink />
          <LinkedinLink />
          <a
            href="/resume.pdf"
            download
            className="flex flex-row items-center px-2 bg-gray-300 dark:bg-gray-800 text-sm cursor-pointer rounded"
          >
            Download CV
            <FiDownload className="inline ml-1" size={18} />
          </a>
          <div className="flex w-fit overflow-hidden rounded border border-gray-300 text-sm font-semibold dark:border-gray-700 md:ml-auto">
            <button
              className={`cursor-pointer px-3 py-2 ${
                displayMode === 'frontend'
                  ? 'bg-black text-white dark:bg-gray-200 dark:text-gray-800'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
              }`}
              onClick={() => {
                onDisplayModeChange('frontend');
              }}
              type="button"
            >
              Frontend
            </button>
            <button
              className={`flex cursor-pointer items-center px-3 py-2 ${
                displayMode === 'backend'
                  ? 'bg-black text-white dark:bg-gray-200 dark:text-gray-800'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
              }`}
              onClick={() => {
                onDisplayModeChange('backend');
              }}
              type="button"
            >
              Backend
              <BsPhoneFlip className="inline ml-1" size={18} />
            </button>
          </div>
        </div>
      </div>
      <div className="md:flex md:flex-col md:justify-between md:self-stretch py-4 absolute md:static md:w-auto md:py-0 right-4 top-4">
        <ThemeToggle />
      </div>
    </main>
  );
};
