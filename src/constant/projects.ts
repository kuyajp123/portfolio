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
}

export const projects: ProjectItem[] = [
  {
    key: 'rescuenect',
    title: 'Rescuenect',
    subtitle: 'Disaster risk management platform connecting community members with real-time emergency dispatch and response.',
    award: 'Best Research Paper Award (EMPIRE 2026)',
    awardLink: '/certificates/best-paper',
    date: '2025 - 2026',
    tags: ['React Native', 'Node.js', 'Express', 'MongoDB', 'WebSockets'],
    featured: true,
  },
  {
    key: 'likhadocs',
    title: 'LikhaDocs',
    subtitle: 'AI-assisted narrative report generation engine streamlining structured technical and academic documentation.',
    date: 'March 2026',
    tags: ['React', 'TypeScript', 'Google AI Studio', 'Tailwind CSS'],
    featured: true,
  },
  {
    key: 'devventory',
    title: 'Devventory',
    subtitle: 'local first developer workspace to manage and track personal projects, assets, files, environments, and dependencies with offline-first capabilities.',
    date: '2026',
    tags: ['React 19', 'TypeScript', 'Tauri v2', 'Rust'],
    featured: true,
  },
];
