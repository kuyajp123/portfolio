import { Certifications } from '@/components/';

interface CertificateProps {
  isBackendMode?: boolean;
}

export const Certificate = ({ isBackendMode = false }: CertificateProps) => {
  return <Certifications isBackendMode={isBackendMode} />;
};
