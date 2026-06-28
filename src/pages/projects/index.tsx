import { Project } from '@/components';

interface ProjectsProps {
  isBackendMode?: boolean;
}

export const Projects = ({ isBackendMode = false }: ProjectsProps) => {
  return <Project isBackendMode={isBackendMode} />;
};
