import { Card } from '@/components/ui/cards/Card';
import { Chip } from '@/components/ui/chip/Chip';
import { backendTechStack, devOpsAndCloudTechStack, frontendTechStack } from '@/pages/techStack/_components/constant';
import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';

export const TechStack = () => {
  return (
    <Card>
      <Link
        to="/tech-stack"
        className="text-sm text-muted-foreground flex flex-row font-light justify-end items-center gap-1"
      >
        View All <IoIosArrowForward />
      </Link>
      <div>
        <h1 className="text-sm text-muted-foreground">Frontend</h1>
        <div className="flex flex-wrap gap-2 mt-2">
          {frontendTechStack.map(tech => (
            <Chip key={tech}>{tech}</Chip>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h1 className="text-sm text-muted-foreground">Backend</h1>
        <div className="flex flex-wrap gap-2 mt-2">
          {backendTechStack.map(tech => (
            <Chip key={tech}>{tech}</Chip>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h1 className="text-sm text-muted-foreground">DevOps & Cloud</h1>
        <div className="flex flex-wrap gap-2 mt-2">
          {devOpsAndCloudTechStack.map(tech => (
            <Chip key={tech}>{tech}</Chip>
          ))}
        </div>
      </div>
    </Card>
  );
};
