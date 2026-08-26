export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  highlights?: string[];
  type: 'work' | 'education' | 'milestone';
}

export const experiences: ExperienceItem[] = [
  {
    id: 'freelance',
    role: 'Freelance Web Developer',
    organization: 'Self-Employed',
    period: '2026 - Present',
    description:
      'Provided custom web development services, collaborating with clients to design and implement barangay document management system that streamlined the processing, tracking, and management of government-related documents and requests.',
    type: 'work',
  },
  {
    id: 'cvsu',
    role: 'BS in Information Technology',
    organization: 'Cavite State University',
    period: '2022 - 2026',
    description:
      'Graduated with major in Information Technology. Authored the award-winning research study on emergency disaster systems.',
    type: 'education',
  },
  {
    id: 'startuplab',
    role: 'Full Stack Web Developer',
    organization: 'Startuplab Business Center',
    period: '2026',
    description:
      'Engineered web applications and client platforms with React, Node.js, and modern full-stack workflows.',
    type: 'work',
  },
  {
    id: 'journey',
    role: 'First Line of Code',
    organization: 'Self-Directed Engineering',
    period: '2019',
    description:
      'Started the software development journey exploring algorithms, web fundamentals, and system architecture.',
    type: 'milestone',
  },
];
