export const achievements = [
  {
    name: 'Pull Shark',
    badge: 'x3',
    image:
      'https://raw.githubusercontent.com/Schweinepriester/github-profile-achievements/main/images/pull-shark-default.png',
    slug: 'pull-shark',
  },
  {
    name: 'Quickdraw',
    badge: null,
    image:
      'https://raw.githubusercontent.com/Schweinepriester/github-profile-achievements/main/images/quickdraw-default.png',
    slug: 'quickdraw',
  },
  {
    name: 'YOLO',
    badge: null,
    image:
      'https://raw.githubusercontent.com/Schweinepriester/github-profile-achievements/main/images/yolo-default.png',
    slug: 'yolo',
  },
  {
    name: 'Pair Extraordinaire',
    badge: null,
    image:
      'https://raw.githubusercontent.com/Schweinepriester/github-profile-achievements/main/images/pair-extraordinaire-default.png',
    slug: 'pair-extraordinaire',
  },
];

export const USERNAME = 'kuyajp123';
export const STATS_BASE_URL = 'https://github-readme-stats-gamma-blush-51.vercel.app';
export const ACTIVITY_BASE_URL = 'https://github-readme-activity-graph.vercel.app/graph';

export interface LanguageStat {
  name: string;
  percentage: number;
  color: string;
}

export const topLanguages: LanguageStat[] = [
  { name: 'JavaScript', percentage: 46.5, color: '#f7df1e' },
  { name: 'TypeScript', percentage: 39.4, color: '#3178c6' },
  { name: 'PHP', percentage: 5.6, color: '#777bb4' },
  { name: 'Rust', percentage: 4.4, color: '#dea584' },
  { name: 'HTML', percentage: 2.0, color: '#e34c26' },
  { name: 'PostgreSQL', percentage: 0.9, color: '#336791' },
  { name: 'CSS', percentage: 0.9, color: '#563d7c' },
  { name: 'SCSS', percentage: 0.3, color: '#c6538c' },
];