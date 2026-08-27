import { EditorialImageViewer, type ViewerItem } from '@/components/ui/EditorialImageViewer';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useState } from 'react';
import { FiMaximize2 } from 'react-icons/fi';

import awsWorkshopImg from '@/assets/AWS-workshop.png';
import clientMeeting from '@/assets/client-meeting.jpg';
import egovBossRodImg from '@/assets/egov-boss-rod.jpg';
import egovBrylImg from '@/assets/egov-bryl.jpg';
import egovHackathonImg from '@/assets/egov-hackathon.jpg';
import empireImg from '@/assets/empire.png';
import laptopImg from '@/assets/laptop.jpg';
import meImg from '@/assets/me.jpg';
import performingTask from '@/assets/performing-task.jpg';
import symposiumImg from '@/assets/symposium.png';
import teamCollaboration from '@/assets/team-collaboration.jpg';
import graduation from '@/assets/graduation.jpg';

const moments: ViewerItem[] = [
  {
    src: symposiumImg,
    title: 'Research Symposium 2026',
    caption:
      'Presenting the award-winning research paper on disaster risk management systems at Cavite State University.',
    category: 'Research',
    date: 'May 2026',
  },
  {
    src: egovBrylImg,
    title: 'eGov Hackathon Networking',
    caption:
      'Met tarsi founder during the hackathon and have an opprtunity to talk about the future of government digitalization.',
    category: 'Hackathon',
    date: 'July 2026',
  },
  {
    src: empireImg,
    title: 'EMPIRE 2026 Conference',
    caption: 'Gathering of academic researchers and industry practitioners at the research conference.',
    category: 'Conference',
    date: 'May 2026',
  },
  {
    src: clientMeeting,
    title: 'Client Meeting',
    caption: 'Discussing project requirements and timelines with the client.',
    category: 'Work',
    date: '2026',
  },

  {
    src: awsWorkshopImg,
    title: 'AWS Workshop: Amazon Q',
    caption:
      'Hands-on technical workshop exploring Amazon Q generative developer tooling and cloud pipelines in BGC Taguig.',
    category: 'Workshop',
    date: 'August 2026',
  },
  {
    src: egovHackathonImg,
    title: 'eGov Hackathon Team DevOops',
    caption:
      'Team DevOops dominated the Technical Pitch Round with a fully functional prototype and seamless API integration, earning a spot among the Top 30 finalists out of 137 participating teams.',
    category: 'Hackathon',
    date: 'July 2026',
  },
  {
    src: meImg,
    title: 'Startuplab Workspace',
    caption: 'Golder hour after a productive day of coding and collaboration.',
    category: 'Me and i',
    date: '2026',
  },
  {
    src: laptopImg,
    title: 'Development Flow',
    caption: 'Late-night interface architecture, systems modeling, and debugging workflow.',
    category: 'Workspace',
    date: '2026',
  },
  {
    src: egovBossRodImg,
    title: 'eGov Hackathon Networking',
    caption:
      'Met upskwela founder during the hackathon and had an opportunity to discuss the future of government digitalization.',
    category: 'Hackathon',
    date: 'July 2026',
  },

  {
    src: performingTask,
    title: 'Performing Task',
    caption: 'Working on a complex task and solving problems along the way.',
    category: 'Work',
    date: '2026',
  },
  {
    src: teamCollaboration,
    title: 'Team Collaboration',
    caption: 'Klever team collaborating on a project, sharing ideas and working together to achieve a common goal.',
    category: 'Work',
    date: '2026',
  },
  {
    src: graduation,
    title: 'Graduation',
    caption: 'Celebrating the completion of my degree and the beginning of a new chapter.',
    category: 'Me and i',
    date: '2026',
  },
];

export const GallerySection = () => {
  const [activeViewerIndex, setActiveViewerIndex] = useState(-1);

  return (
    <section id="moments" className="py-10 border-t border-black/8 dark:border-white/10 scroll-mt-24">
      <SectionHeader
        number="04"
        title="Visual Moments"
        subtitle="Comprehensive visual documentation from hackathons, workshops, conferences, and development life."
      />

      {/* Pinterest-style Masonry Column Layout */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-3.5 [column-fill:_balance]">
        {moments.map((item, idx) => (
          <div
            key={item.title}
            onClick={() => {
              setActiveViewerIndex(idx);
            }}
            className="break-inside-avoid mb-3.5 group relative overflow-hidden rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 cursor-pointer transition-all duration-300 hover:border-black/20 dark:hover:border-white/25 hover:shadow-md"
          >
            <img
              src={item.src}
              alt={item.title}
              className="w-full h-auto object-cover grayscale group-hover:grayscale-0 group-hover:scale-102 transition-all duration-500 ease-out block"
              loading="lazy"
            />

            {/* Top-Right Inspect Hint */}
            <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-md text-white p-1.5 rounded-lg border border-white/20">
              <FiMaximize2 size={12} />
            </div>

            {/* Bottom Caption Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
              <div className="flex items-center gap-2 mb-1">
                {item.category && (
                  <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-white/20 text-gray-200 border border-white/20">
                    {item.category}
                  </span>
                )}
                {item.date && <span className="font-mono text-[9px] text-gray-300">{item.date}</span>}
              </div>

              <span className="font-sans text-xs font-semibold text-white">{item.title}</span>

              <span className="font-mono text-[10px] text-gray-300 line-clamp-2 mt-0.5">{item.caption}</span>
            </div>
          </div>
        ))}
      </div>

      <EditorialImageViewer
        isOpen={activeViewerIndex >= 0}
        currentIndex={Math.max(0, activeViewerIndex)}
        onIndexChange={idx => {
          setActiveViewerIndex(idx);
        }}
        onClose={() => {
          setActiveViewerIndex(-1);
        }}
        items={moments}
      />
    </section>
  );
};
