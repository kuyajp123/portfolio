// Rescuenect Images
import rescuenectWelcome from '@/assets/rescuenect/playstore welcome.png';
import rescuenectPlaystore from '@/assets/rescuenect/playstore.png';
import rescuenectDark from '@/assets/rescuenect/playstore dark.png';
import rescuenectCommunity from '@/assets/rescuenect/community.png';
import rescuenectAnalytics from '@/assets/rescuenect/analytics.png';
import rescuenectNavigation from '@/assets/rescuenect/navigation.png';

// LikhaDocs Images
import likhadocsFb from '@/assets/likhadocs/likhadocs_facebook_ad.png';
import likhadocsSmartResearch from '@/assets/likhadocs/smart_research_ad.png';
import likhadocsWorkspace from '@/assets/likhadocs/weekly_report_workspace_ad.png';
import likhadocsOutro from '@/assets/likhadocs/likhadocs_outro_ad.png';

// Devventory Images
import devventoryDashboard from '@/assets/devventory/dashboard.png';
import devventoryEnv from '@/assets/devventory/environment-tracker.png';
import devventoryFiles from '@/assets/devventory/file-inventory.png';
import devventoryAgents from '@/assets/devventory/agent-usage.png';

export interface ProjectImage {
  src: string;
  title: string;
  caption: string;
  aspect?: 'portrait' | 'landscape';
}

export interface ProjectDetail {
  key: string;
  title: string;
  subtitle: string;
  description: string[];
  architectureNote?: string;
  award?: string;
  awardLink?: string;
  date: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  downloadUrl?: string;
  appBuildersSlug?: string;
  embedIframe?: {
    src: string;
    title: string;
    width: number;
    height: number;
  };
  features: {
    title: string;
    description: string;
  }[];
  images: ProjectImage[];
}

export const projectDetails: ProjectDetail[] = [
  {
    key: 'rescuenect',
    title: 'Rescuenect',
    subtitle: 'Community disaster risk management and emergency dispatch coordination ecosystem.',
    description: [
      'Rescuenect helps communities, residents, and local responders communicate quickly during disasters through real-time reports, alerts, and emergency coordination.',
      'Rescuenect provides a straightforward platform for residents to report emergencies and for administrators to verify and manage information.',
    ],
    architectureNote:
      'Rescuenect consists of a native mobile application for community residents and a centralized administrative web dashboard for barangay officials and emergency dispatchers.',
    award: 'Best Research Paper - Developmental Category (EMPIRE 2026)',
    awardLink: '/certificates/best-paper',
    date: '2025 - 2026',
    tags: ['React Native', 'React.js', 'Express', 'Firebase', 'Typescript', 'Tailwind CSS'],
    liveUrl: 'https://rescuenect.vercel.app/home',
    appBuildersSlug: 'rescuenect-11k',
    embedIframe: {
      src: 'https://appbuildersph.com/embed/apps/rescuenect-11k',
      title: 'Rescuenect votes on App Builders PH',
      width: 320,
      height: 72,
    },
    features: [
      {
        title: 'Real-Time Emergency Reporting',
        description:
          'Residents can submit instant reports about floods, hazards, accidents, or emergency situations in their vicinity.',
      },
      {
        title: 'Disaster Alerts and Notifications',
        description:
          'Users receive verified updates, weather advisories, and critical announcements from authorized local officials.',
      },
      {
        title: 'Location-Based Reports',
        description:
          'Reports include precise geolocation data to help first responders locate affected zones and allocate aid faster.',
      },
      {
        title: 'Admin Monitoring Dashboard',
        description:
          'Administrators view, verify, coordinate, and resolve incident reports through a unified web command center.',
      },
      {
        title: 'Community Status Updates',
        description:
          'Residents can share hyper-local status reports to keep neighboring communities informed about real-time conditions.',
      },
      {
        title: 'Evacuation Center Guidance',
        description:
          'Instant directory of open evacuation shelters with capacity, amenities, and safe movement status during crises.',
      },
      {
        title: 'Danger Zone Mapping',
        description:
          'Interactive map submission where residents can flag active hazards for official verification and quarantine.',
      },
      {
        title: 'Dynamic Evacuation Routing',
        description:
          'Calculates the safest and nearest evacuation path based on real-time road conditions, danger zones, and flood traffic.',
      },
    ],
    images: [
      {
        src: rescuenectWelcome,
        title: 'Rescuenect Resident Mobile App',
        caption: 'Onboarding and emergency dispatch portal for community residents.',
        aspect: 'portrait',
      },
      {
        src: rescuenectPlaystore,
        title: 'Emergency Reporting & Alerting',
        caption: 'Mobile feed showing disaster bulletins and instant alert subscriptions.',
        aspect: 'portrait',
      },
      {
        src: rescuenectDark,
        title: 'Incident Mapping & Shelters',
        caption: 'Geolocation mapping of designated evacuation points and localized road status.',
        aspect: 'portrait',
      },
      {
        src: rescuenectCommunity,
        title: 'Community Hub & Live Updates',
        caption: 'Crowdsourced community status updates verified by emergency dispatchers.',
        aspect: 'landscape',
      },
      {
        src: rescuenectAnalytics,
        title: 'Barangay Admin Dashboard',
        caption: 'Incident telemetry, resolution metrics, and dispatch resource management.',
        aspect: 'landscape',
      },
      {
        src: rescuenectNavigation,
        title: 'Safe Evacuation Navigation',
        caption: 'Dynamic routing engine computing the safest evacuation path around danger zones.',
        aspect: 'landscape',
      },
    ],
  },
  {
    key: 'likhadocs',
    title: 'LikhaDocs',
    subtitle: 'AI-assisted structured narrative report builder and OJT documentation workspace.',
    description: [
      'LikhaDocs helps users draft structured narrative reports with AI assistance, organize weekly entries, references, and templates, and export final documents in DOCX format.',
      'The platform uses Supabase for authentication, relational data storage, and file storage.',
      'LikhaDocs was utilized by Cavite State University (CvSU) students for preparing their official OJT narrative reports, validating the platform through real-world academic usage.',
    ],
    date: 'March 2026',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Google AI Studio', 'Tailwind CSS',],
    liveUrl: 'https://likhadocs.com',
    appBuildersSlug: 'likhadocs',
    embedIframe: {
      src: 'https://appbuildersph.com/embed/apps/likhadocs',
      title: 'LikhaDocs votes on App Builders PH',
      width: 320,
      height: 72,
    },
    features: [
      {
        title: 'Weekly Report Workspace',
        description: 'Dedicated workspace for preparing, organizing, and managing weekly internship milestone entries.',
      },
      {
        title: 'OJT Experience Logging',
        description: 'Record daily workplace tasks, skills learned, and achievements in one central repository.',
      },
      {
        title: 'AI Narrative Generation',
        description:
          'Transform rough notes and weekly bullet points into polished, professional narrative chapters with AI.',
      },
      {
        title: 'Narrative Report Builder with DOCX Export',
        description:
          'Assemble complete narrative documents with standardized academic formatting and export directly to Microsoft Word (.docx).',
      },
      {
        title: 'Reduced Blank-Page Friction',
        description:
          'Eliminates writer block so students spend less time formatting and more time reflecting on career growth.',
      },
      {
        title: 'Validated by CvSU Students',
        description:
          'Field-tested by actual graduating IT students for submitting thesis and internship requirement documents.',
      },
    ],
    images: [
      {
        src: likhadocsWorkspace,
        title: 'Weekly Report Workspace',
        caption: 'Structured journal view for drafting, organizing, and refining weekly OJT logs.',
        aspect: 'landscape',
      },
      {
        src: likhadocsSmartResearch,
        title: 'AI-Assisted Report Generation',
        caption: 'Context-aware AI assistant helping convert raw bullet notes into formal narrative paragraphs.',
        aspect: 'landscape',
      },
      {
        src: likhadocsFb,
        title: 'LikhaDocs Platform Overview',
        caption: 'Modern writing interface built for students and technical professionals.',
        aspect: 'landscape',
      },
      {
        src: likhadocsOutro,
        title: 'DOCX Document Exporting',
        caption: 'One-click automated export to standard DOCX format ready for institutional submission.',
        aspect: 'landscape',
      },
    ],
  },
  {
    key: 'devventory',
    title: 'Devventory',
    subtitle: 'Local-first offline development workspace to track environments, assets, and coding-agent quotas.',
    description: [
      'Devventory is a personal development workspace tool that allows engineers to manage multi-environment workflows with precision.',
      'Devventory was built because modern projects with local, staging, and production environments require specific keys and configuration variables that frequently get missing, misplaced, or mismatched, while assets like logos, variants, and configs get scattered across repositories.',
      'Devventory operates 100% offline, locally on your machine, with zero secret value storage and no account required.',
    ],
    date: '2026',
    tags: ['React 19', 'TypeScript', 'Tauri v2', 'Rust', 'Tailwind CSS', 'SQLite'],
    githubUrl: 'https://github.com/kuyajp123/devventory',
    downloadUrl: 'https://github.com/kuyajp123/devventory-releases',
    features: [
      {
        title: 'Environment & Key Tracker',
        description:
          'Inspect which environment variables and keys are present, missing, required, optional, or misplaced across local, staging, and production.',
      },
      {
        title: 'Environment Health Indicators',
        description: 'Instantly verify configuration health across active projects with visual status diagnostics.',
      },
      {
        title: 'Project Asset & File Inventory',
        description:
          'Scan and index files, schemas, and configurations inside your repository so they are easy to locate.',
      },
      {
        title: 'Relational File Linking',
        description:
          'Associate logos, icon variants, configuration files, and related assets together for fast multi-project lookup.',
      },
      {
        title: 'Coding-Agent Quota Monitor',
        description:
          'Track account quotas across AI coding-agent platforms to see which account is ready for active development.',
      },
      {
        title: 'Offline & Secret-Safe Architecture',
        description:
          'Never stores or transmits actual secret values. Operates fully offline and locally on your desktop machine.',
      },
    ],
    images: [
      {
        src: devventoryDashboard,
        title: 'Devventory Project Dashboard',
        caption: 'Central cockpit showing project health, environment matrix, and file inventories.',
        aspect: 'landscape',
      },
      {
        src: devventoryEnv,
        title: 'Environment Key Tracker',
        caption: 'Comparison matrix highlighting missing, present, and mismatched keys across deployment targets.',
        aspect: 'landscape',
      },
      {
        src: devventoryFiles,
        title: 'File & Asset Relational Inventory',
        caption: 'Relational file mapping linking design variants, configs, and assets across workspaces.',
        aspect: 'landscape',
      },
      {
        src: devventoryAgents,
        title: 'Coding-Agent Quota Monitor',
        caption: 'Real-time telemetry and quota tracker for AI developer tool accounts.',
        aspect: 'landscape',
      },
    ],
  },
];