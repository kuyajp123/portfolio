import profile from '@/assets/profile.jpg';
import { ThemeToggle } from '@/components/button/Theme';
import { GithubLink, LinkedinLink, SendEmail } from '@/constant/links';
import { MdOutlineLocationOn } from 'react-icons/md';

export const Header = () => {
  return (
    <main className="flex flex-row items-center gap-4">
      <img src={profile} alt="Profile" className="w-40 h-40 rounded-full" />
      <div className="flex flex-col gap-2 w-full">
        <div>
          <h1 className="text-2xl font-bold">John Paul Naag</h1>
          <div className="flex items-center">
            <MdOutlineLocationOn className="inline mr-1 " size={18} />
            <p>Cavite, Philippines</p>
          </div>
        </div>
        <p>Developer</p>
        <div className="flex flex-row gap-2 w-full">
          <SendEmail />
          <GithubLink />
          <LinkedinLink />
        </div>
      </div>
      <div className="ml-auto mb-auto">
        <ThemeToggle />
      </div>
    </main>
  );
};
