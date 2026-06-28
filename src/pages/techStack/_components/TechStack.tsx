import { Chip } from '@/components/ui/chip/Chip';
import {
  AITechStack,
  backendTechStack,
  developmentTools,
  devOpsAndCloudTechStack,
  frontendTechStack,
  networkingAndVirtualization,
} from '@/pages/techStack/_components/constant';
import { IoChevronBackOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

export const TechStack = () => {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="max-w-4xl">
        <button className="flex cursor-pointer items-center gap-2 mt-4" onClick={() => navigate(-1)}>
          <IoChevronBackOutline size={20} className="mt-1" />
          <h1 className="text-2xl font-bold">Tech Stack</h1>
        </button>
        <div className="mt-4">
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
        <div className="mt-4">
          <h1 className="text-sm text-muted-foreground">AI</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            {AITechStack.map(tech => (
              <Chip key={tech}>{tech}</Chip>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <h1 className="text-sm text-muted-foreground">Development Tools</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            {developmentTools.map(tech => (
              <Chip key={tech}>{tech}</Chip>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <h1 className="text-sm text-muted-foreground">Networking & Virtualization</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            {networkingAndVirtualization.map(tech => (
              <Chip key={tech}>{tech}</Chip>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};
