import { BackendDataView } from '@/components/ui/cards/BackendDataView';
import { Card } from '@/components/ui/cards/Card';
import { FlipCard } from '@/components/ui/cards/FlipCard';
import { IoIosArrowForward, IoMdTrophy } from 'react-icons/io';
IoIosArrowForward;

interface ProjectItem {
  key: string;
  title: string;
  subtitle?: string;
  label?: string;
  date: string;
}

interface ProjectsData {
  sectionTitle: string;
  viewAllHref: string;
  items: ProjectItem[];
}

const projectsData: ProjectsData = {
  sectionTitle: 'Projects',
  viewAllHref: '#',
  items: [
    {
      key: 'portfolio',
      title: 'My Portfolio',
      subtitle: 'A personal portfolio website showcasing my projects and skills.',
      date: 'June 2026',
    },
    {
      key: 'rescuenect',
      title: 'Rescuenect',
      subtitle:
        'A disaster risk management system that connects community members with emergency services during emergencies.',
      label: 'Best research paper AY 2025-2026',
      date: '2025 - 2026',
    },
    {
      key: 'narratechs',
      title: 'Narratechs',
      subtitle: 'AI based narrative report generation platform for students and professionals.',
      date: 'March 2026',
    },
  ],
};

interface ProjectProps {
  isBackendMode?: boolean;
}

export const Project = ({ isBackendMode = false }: ProjectProps) => {
  const frontendView = (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h2 className="mb-2">{projectsData.sectionTitle}</h2>
        {/* <a className="text-sm font-light" href={projectsData.viewAllHref}>
          <span className="flex items-center gap-1">
            View all
            <IoIosArrowForward />
          </span>
        </a> */}
      </div>
      <ul className="list-disc list-outside ml-5">
        {projectsData.items.map(project => (
          <li className="" key={project.key}>
            <div className="flex justify-between w-full p-2 gap-4">
              <div className="flex flex-col w-0 flex-grow gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold">{project.title}</span>

                  {project.label && (
                    <span className="inline-flex items-center gap-1 bg-blue-500 text-white px-2 py-1 rounded-md text-xs">
                      <IoMdTrophy size={12} />
                      {project.label}
                    </span>
                  )}
                </div>

                <span className="text-sm font-semibold">{project.subtitle}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">{project.date}</span>
                {/* <span>
                  <IoIosArrowForward />
                </span> */}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );

  const backendView = <BackendDataView sectionTitle="Projects" objectName="projectsData" data={projectsData} />;

  return <FlipCard isFlipped={isBackendMode} front={frontendView} back={backendView} />;
};
