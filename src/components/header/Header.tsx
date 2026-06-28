import profile from '@/assets/profile.jpg';
import { ThemeToggle } from '@/components/button/Theme';
import { GithubLink, LinkedinLink, SendEmail } from '@/constant/links';
import { useState } from 'react';
import { BsPhoneFlip } from 'react-icons/bs';
import { FiDownload } from 'react-icons/fi';

export const Header = () => {
  const [isFrontendActive, setIsFrontendActive] = useState(true);

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
          <button
            className="w-fit bg-black text-white dark:bg-gray-200 dark:text-gray-800 py-2 px-3 text-sm cursor-pointer rounded flex items-center md:ml-auto"
            onClick={() => setIsFrontendActive(!isFrontendActive)}
          >
            {isFrontendActive ? 'Frontend' : 'Backend'}
            <BsPhoneFlip className="inline ml-1" size={18} />
          </button>
        </div>
      </div>
      <div className="md:flex md:flex-col md:justify-between md:self-stretch py-4 absolute md:static md:w-auto md:py-0 right-4 top-4">
        <ThemeToggle />
      </div>
    </main>
  );
};
