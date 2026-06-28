import { BackendDataView } from '@/components/ui/cards/BackendDataView';
import { Card } from '@/components/ui/cards/Card';
import { FlipCard } from '@/components/ui/cards/FlipCard';

const experienceData = {
  sectionTitle: 'Experience',
  milestones: [
  {
    title: 'Startuplab',
    description: 'Full stack web developer.',
    date: '2026',
  },
  {
    title: 'BS Information Technology',
    description: 'Cavite State University.',
    date: '2026',
  },
  {
    title: 'Hello World!',
    description: 'Wrote my first line of code.👏',
    date: '2019',
  },
  ],
};

interface ExperienceProps {
  isBackendMode?: boolean;
}

export const Experience = ({ isBackendMode = false }: ExperienceProps) => {
  const frontendView = (
    <Card>
      <div className="mb-6">{experienceData.sectionTitle}</div>
      <ol className="border-l-2 border-gray-200 ml-2">
        {experienceData.milestones.map((step) => (
          <li key={step.title} className="relative mb-10 pl-4">
            <span className="absolute flex items-center justify-center w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-0.5">
              <svg
                className="w-3.5 h-3.5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <h3 className="font-bold text-sm">{step.title}</h3>
            <p className="text-sm font-semibold">{step.description}</p>
            <p className="text-xs text-gray-500">{step.date}</p>
          </li>
        ))}
      </ol>
    </Card>
  );

  const backendView = <BackendDataView sectionTitle="Experience" objectName="experienceData" data={experienceData} />;

  return <FlipCard isFlipped={isBackendMode} front={frontendView} back={backendView} />;
};
