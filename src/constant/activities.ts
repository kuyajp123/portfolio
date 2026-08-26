import awsWorkshopImg from '@/assets/AWS-workshop.png';
import egovBossRodImg from '@/assets/egov-boss-rod.jpg';
import egovBrylImg from '@/assets/egov-bryl.jpg';
import egovHackathonImg from '@/assets/egov-hackathon.jpg';

export interface ActivityImage {
  src: string;
  title: string;
  caption: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  summary: string;
  roleOrAward?: string;
  type: 'Hackathon' | 'Workshop' | 'Conference';
  location: string;
  date: string;
  highlights: string[];
  tags: string[];
  images: ActivityImage[];
}

export const activities: ActivityItem[] = [
  {
    id: 'egov-hackathon',
    title: 'eGov Hackathon',
    summary:
      'Built an AI agent automating government document processing and workflow pipelines using the eGov API, placing Top 30 among 137 teams.',
    roleOrAward: 'Top 30 Finalist (137 Teams)',
    type: 'Hackathon',
    location: 'BGC Taguig',
    date: 'July 21 - 22, 2026',
    highlights: [
      'Developed an AI agent for automating document processing and government-related workflows using the eGov API.',
      'Integrated the eGov API to enable the application to interact with government services and process relevant data.',
      'Presented the application and defended its technical implementation during Q&A, placing in the Top 30 among 137 participating teams.',
    ],
    tags: ['eGov API', 'AI Agent', 'Workflow Automation', 'FastAPI', 'Next.js'],
    images: [
      {
        src: egovHackathonImg,
        title: 'eGov Hackathon Technical Pitch',
        caption:
          'Team DevOops dominated the Technical Pitch Round with a fully functional prototype and seamless API integration, earning a spot among the Top 30 finalists out of 137 participating teams.',
      },
      {
        src: egovBrylImg,
        title: 'eGov Hackathon Networking',
        caption:
          'Met tarsi founder during the hackathon and have an opprtunity to talk about the future of government digitalization.',
      },
      {
        src: egovBossRodImg,
        title: 'eGov Hackathon Networking',
        caption:
          'Met upskwela founder during the hackathon and had an opportunity to discuss the future of government digitalization.',
      },
    ],
  },
  {
    id: 'aws-workshop',
    title: 'AWS Workshop: Amazon Q & Cloud AI',
    summary:
      'Hands-on exploration of Amazon Q generative developer tooling and cloud-assisted AI workflows in BGC Taguig.',
    type: 'Workshop',
    location: 'BGC Taguig',
    date: 'August 14, 2026',
    highlights: [
      'Participated in an AWS workshop focused on Amazon Q, gaining hands-on experience with AI-assisted development and cloud-based workflows.',
      'Applied the concepts learned by implementing Amazon Q in a practical development task to explore AI-assisted coding and application development.',
    ],
    tags: ['Amazon Q', 'AWS Cloud', 'AI-Assisted Dev', 'Cloud Architecture'],
    images: [
      {
        src: awsWorkshopImg,
        title: 'AWS Amazon Q Workshop Session',
        caption: 'Hands-on technical session exploring Amazon Q generative coding capabilities and cloud pipelines.',
      },
    ],
  },
];
