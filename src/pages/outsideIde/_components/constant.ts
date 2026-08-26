export interface UpcomingEvent {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  status: 'Upcoming' | 'Confirmed' | 'Radar' | 'Recent';
  description: string;
  link?: string;
}

export interface OffScreenInterest {
  id: string;
  title: string;
  category: string;
  description: string;
  iconTag: string;
}

export interface CuratedPlaylist {
  title: string;
  curator: string;
  description: string;
  spotifyUrl: string;
  embedUrl?: string;
  tag: string;
}

export interface TopTrack {
  rank: string;
  title: string;
  artist: string;
  album: string;
  duration?: string;
  spotifyUrl: string;
}

export const topPlayedTracks: TopTrack[] = [
  {
    rank: '01',
    title: '13',
    artist: 'LANY',
    album: 'LANY',
    duration: '3:54',
    spotifyUrl: 'https://open.spotify.com/search/13%20LANY',
  },
  {
    rank: '02',
    title: 'Mean It',
    artist: 'LAUV, LANY',
    album: "~how i'm feeling~",
    duration: '3:52',
    spotifyUrl: 'https://open.spotify.com/search/Mean%20It%20LAUV%20LANY',
  },
  {
    rank: '03',
    title: 'Akala Ko Nung Una (feat. Future Thug)',
    artist: 'O.C. Dawgs, Future Thug',
    album: 'Akala Ko Nung Una',
    duration: '5:01',
    spotifyUrl: 'https://open.spotify.com/search/Akala%20Ko%20Nung%20Una%20OC%20Dawgs',
  },
  {
    rank: '04',
    title: 'Sa Susunod Na Lang',
    artist: 'PDL, Skusta Clee, Yuridope',
    album: 'Sa Susunod Na Lang',
    duration: '3:34',
    spotifyUrl: 'https://open.spotify.com/search/Sa%20Susunod%20Na%20Lang%20Skusta%20Clee',
  },
  {
    rank: '05',
    title: 'On Bended Knee',
    artist: 'Boyz II Men',
    album: 'II',
    duration: '5:29',
    spotifyUrl: 'https://open.spotify.com/search/On%20Bended%20Knee%20Boyz%20II%20Men',
  },
];

export const upcomingEvents: UpcomingEvent[] = [
  // {
  //   id: 'devcon-2026',
  //   title: 'Philippine Developer & Tech Summit',
  //   category: 'Conference',
  //   date: 'Q3 2026',
  //   location: 'Metro Manila, Philippines',
  //   status: 'Radar',
  //   description: 'Exploring advances in agentic AI development, local cloud architectures, and developer ecosystems.',
  // },
  // {
  //   id: 'community-hackathons',
  //   title: 'National Open-Source & GovTech Sprints',
  //   category: 'Hackathon',
  //   date: '2026 Continuous',
  //   location: 'Hybrid / Philippines',
  //   status: 'Upcoming',
  //   description: 'Building impactful civic tech, emergency coordination tools, and student developer utility platforms.',
  // },
  // {
  //   id: 'aws-builders-meetup',
  //   title: 'AWS Cloud & Serverless Community Meetup',
  //   category: 'Workshop',
  //   date: '2026',
  //   location: 'Cavite / Manila',
  //   status: 'Upcoming',
  //   description: 'Deep dives into AWS Lambda, serverless relational persistence, and modern edge deployments.',
  // },
];

export const offScreenInterests: OffScreenInterest[] = [
  {
    id: 'soundtracks',
    title: 'Soundtracks & Coding Audio',
    category: 'Acoustics',
    description: 'Deep focus soundscapes, lo-fi beats, synthwave rhythms, and ambient electronica for marathon programming sessions.',
    iconTag: 'AUDIO',
  },
  {
    id: 'rapid-prototyping',
    title: 'Civic Tech & Hackathon Sprints',
    category: 'Maker Culture',
    description: 'Turning raw ideas into deployable prototypes under tight deadlines. Passionate about emergency response and developer tooling.',
    iconTag: 'SPRINTS',
  },
  {
    id: 'desk-setup',
    title: 'Workspace Ergonomics & Tooling',
    category: 'Hardware',
    description: 'Custom mechanical keyboards, high-contrast dark editors, and uncluttered dual-screen configurations designed for uninterrupted flow.',
    iconTag: 'GEAR',
  },
  {
    id: 'continuous-learning',
    title: 'AI Agents & Interface Taste',
    category: 'Exploration',
    description: 'Studying modern design systems, LLM agent integration patterns, and craft-driven web engineering outside formal projects.',
    iconTag: 'LEARNING',
  },
];