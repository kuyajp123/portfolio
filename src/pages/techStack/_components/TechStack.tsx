import { Chip } from '@/components/ui/cards/Chip';
import {
  AITechStack,
  backendTechStack,
  developmentTools,
  devOpsAndCloudTechStack,
  frontendTechStack,
  networkingAndVirtualization,
} from '@/pages/techStack/_components/constant';
import { IoChevronBackOutline } from 'react-icons/io5';

export const TechStack = () => {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="max-w-4xl">
        <a className="flex items-center gap-2 mt-4" href="/">
          <IoChevronBackOutline size={20} className="mt-1" />
          <h1 className="text-2xl font-bold">Tech Stack</h1>
        </a>
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
