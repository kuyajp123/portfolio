import { BackendDataView } from '@/components/ui/cards/BackendDataView';
import { CardRowData } from '@/components/ui/cards/CardRowData';
import { FlipCard } from '@/components/ui/cards/FlipCard';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { GrInstagram } from 'react-icons/gr';
import { MdEmail } from 'react-icons/md';
import { FaFacebook } from 'react-icons/fa';
import type { ReactNode } from 'react';

type SocialKey = 'github' | 'email' | 'linkedin' | 'instagram' | 'facebook';

interface SocialAccount {
  key: SocialKey;
  label: string;
  value: string;
  link: string;
}

const socialData = {
  sectionTitle: 'Socials',
  accounts: [
    {
      key: 'github',
      label: 'GitHub',
      value: 'kuyajp123',
      link: 'https://github.com/kuyajp123',
    },
    {
      key: 'email',
      label: 'Email',
      value: 'johnpaulnaag10@gmail.com',
      link: 'mailto:johnpaulnaag10@gmail.com',
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      value: 'John Paul Naag',
      link: 'https://www.linkedin.com/in/john-paul-naag-40129b3a8',
    },
    {
      key: 'instagram',
      label: 'Instagram',
      value: 'jeyps.css',
      link: 'https://www.instagram.com/jeyps.css/',
    },
    {
      key: 'facebook',
      label: 'Facebook',
      value: 'John Paul Naag',
      link: 'https://www.facebook.com/jeyps.py',
    },
  ] satisfies SocialAccount[],
};

const socialIcons: Record<SocialKey, ReactNode> = {
  github: <FaGithub className="inline mr-1" size={18} />,
  email: <MdEmail className="inline mr-1" size={18} />,
  linkedin: <FaLinkedin className="inline mr-1" size={18} />,
  instagram: <GrInstagram className="inline mr-1" size={18} />,
  facebook: <FaFacebook className="inline mr-1" size={18} />,
};

const socialObjects = socialData.accounts.map((account) => ({
  key: account.key,
  icon: socialIcons[account.key],
  label: `${account.label}: `,
  value: account.value,
  links: account.link,
}));

interface SocialProps {
  isBackendMode?: boolean;
}

export const Social = ({ isBackendMode = false }: SocialProps) => {
  const frontendView = <CardRowData sectionTitle={socialData.sectionTitle} objects={socialObjects} />;
  const backendView = <BackendDataView sectionTitle="Socials" objectName="socialData" data={socialData} />;

  return <FlipCard isFlipped={isBackendMode} front={frontendView} back={backendView} />;
};
