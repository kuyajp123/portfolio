import rescuenectIcon from '@/assets/rescuenect/rescuenect-app-icon.png';
import rescuenectCover from '@/assets/rescuenect/navigation.png';

import likhadocsIcon from '@/assets/likhadocs/likhadocs-app-icon.png';
import likhadocsCover from '@/assets/likhadocs/likhadocs_facebook_ad.png';

import devventoryIcon from '@/assets/devventory/devventory-app-icon.png';
import devventoryCover from '@/assets/devventory/dashboard.png';

export interface ProjectItem {
  key: string;
  title: string;
  subtitle: string;
  description?: string;
  award?: string;
  awardLink?: string;
  date: string;
  tags: string[];
  link?: string;
  github?: string;
  featured?: boolean;
  icon?: string;
  coverImage?: string;
}

export const projects: ProjectItem[] = [
  {
    key: 'rescuenect',
    title: 'Rescuenect',
    subtitle: 'Disaster risk management platform connecting community members with real-time emergency dispatch and response.',
    award: 'Best Research Paper Award (EMPIRE 2026)',
    awardLink: '/certificates/best-paper',
    date: '2025 - 2026',
    tags: ['React Native', 'React.js', 'Express', 'Firebase', 'Typescript'],
    featured: true,
    icon: rescuenectIcon,
    coverImage: rescuenectCover,
  },
  {
    key: 'likhadocs',
    title: 'LikhaDocs',
    subtitle: 'AI-assisted narrative report generation engine streamlining structured technical and academic documentation.',
    date: 'March 2026',
    tags: ['Next.js', 'TypeScript', 'Google AI Studio', 'Tailwind CSS'],
    featured: true,
    icon: likhadocsIcon,
    coverImage: likhadocsCover,
  },
  {
    key: 'devventory',
    title: 'Devventory',
    subtitle: 'Local-first developer workspace to manage and track personal projects, assets, files, and environments.',
    date: '2026',
    tags: ['React 19', 'TypeScript', 'Tauri v2', 'Rust', 'SQLite'],
    featured: true,
    icon: devventoryIcon,
    coverImage: devventoryCover,
  },
];
