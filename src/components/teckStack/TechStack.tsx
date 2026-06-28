import { BackendDataView } from '@/components/ui/cards/BackendDataView';
import { Card } from '@/components/ui/cards/Card';
import { FlipCard } from '@/components/ui/cards/FlipCard';
import { Chip } from '@/components/ui/chip/Chip';
import { backendTechStack, devOpsAndCloudTechStack, frontendTechStack } from '@/pages/techStack/_components/constant';
import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';

const techStackData = {
  sectionTitle: 'Tech Stack',
  viewAllHref: '/tech-stack',
  categories: [
    {
      key: 'frontend',
      label: 'Frontend',
      items: frontendTechStack,
    },
    {
      key: 'backend',
      label: 'Backend',
      items: backendTechStack,
    },
    {
      key: 'devopsAndCloud',
      label: 'DevOps & Cloud',
      items: devOpsAndCloudTechStack,
    },
  ],
};

interface TechStackProps {
  isBackendMode?: boolean;
}

export const TechStack = ({ isBackendMode = false }: TechStackProps) => {
  const frontendView = (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h2>{techStackData.sectionTitle}</h2>
        <Link
          to={techStackData.viewAllHref}
          className="flex flex-row items-center gap-1 text-sm font-light text-muted-foreground"
        >
          View All <IoIosArrowForward />
        </Link>
      </div>
      {techStackData.categories.map((category, index) => (
        <div className={index === 0 ? undefined : 'mt-4'} key={category.key}>
          <h1 className="text-sm text-muted-foreground">{category.label}</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            {category.items.map((tech) => (
              <Chip key={tech}>{tech}</Chip>
            ))}
          </div>
        </div>
      ))}
    </Card>
  );

  const backendView = <BackendDataView sectionTitle="Tech Stack" objectName="techStackData" data={techStackData} />;

  return <FlipCard isFlipped={isBackendMode} front={frontendView} back={backendView} />;
};
