import { CardRowData } from '@/components/ui/cards/CardRowData';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { GrInstagram } from 'react-icons/gr';
import { MdEmail } from 'react-icons/md';
import { FaFacebook } from 'react-icons/fa';

const socialObjects = [
  {
    key: 'github',
    icon: <FaGithub className="inline mr-1" size={18} />,
    label: 'GitHub: ',
    value: 'kuyajp123',
    links: 'https://github.com/kuyajp123',
  },
  {
    key: 'email',
    icon: <MdEmail className="inline mr-1" size={18} />,
    label: 'Email: ',
    value: 'johnpaulnaag10@gmail.com',
    links: 'mailto:johnpaulnaag10@gmail.com',
  },
  {
    key: 'linkedin',
    icon: <FaLinkedin className="inline mr-1" size={18} />,
    label: 'LinkedIn: ',
    value: 'John Paul Naag',
    links: 'https://www.linkedin.com/in/john-paul-naag-40129b3a8',
  },
  {
    key: 'instagram',
    icon: <GrInstagram className="inline mr-1" size={18} />,
    label: 'Instagram: ',
    value: 'jeyps.css',
    links: 'https://www.instagram.com/jeyps.css/',
  },
  {
    key: 'facebook',
    icon: <FaFacebook className="inline mr-1" size={18} />,
    label: 'Facebook: ',
    value: 'John Paul Naag',
    links: 'https://www.facebook.com/jeyps.py',
  },
];

export const Social = () => {
  return <CardRowData sectionTitle="Socials" objects={socialObjects} />;
};
