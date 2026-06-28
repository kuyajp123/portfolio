import { TechStack as TechStackComponent } from '@/components';

interface TechStackProps {
  isBackendMode?: boolean;
}

export const TechStack = ({ isBackendMode = false }: TechStackProps) => {
  return <TechStackComponent isBackendMode={isBackendMode} />;
};
