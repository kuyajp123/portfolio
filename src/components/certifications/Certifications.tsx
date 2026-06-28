import { BackendDataView } from '@/components/ui/cards/BackendDataView';
import { FlipCard } from '@/components/ui/cards/FlipCard';
import { certifications } from '@/pages/certifications/_components/constant';
import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { Card } from '../ui/cards/Card';

const certificationsData = {
  sectionTitle: 'Certifications',
  items: certifications,
};

interface CertificationsProps {
  isBackendMode?: boolean;
}

export const Certifications = ({ isBackendMode = false }: CertificationsProps) => {
  const frontendView = (
    <Card>
      <h1>{certificationsData.sectionTitle}</h1>
      <ul className="list-disc list-outside ml-5">
        {certificationsData.items.map((certificate) => {
          const isExternal = certificate.link.startsWith('http');

          const innerContent = (
            <div className="flex justify-between w-full p-2 gap-4">
              <div className="flex flex-col w-0 flex-grow gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold">{certificate.name}</span>
                </div>
                <span className="text-sm font-semibold">{certificate.issuer}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">{certificate.date}</span>
                <span>
                  <IoIosArrowForward />
                </span>
              </div>
            </div>
          );

          if (isExternal) {
            return (
              <a
                key={certificate.id}
                className="cursor-pointer block"
                href={certificate.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {innerContent}
              </a>
            );
          }

          return (
            <Link key={certificate.id} className="cursor-pointer block" to={certificate.link}>
              {innerContent}
            </Link>
          );
        })}
      </ul>
    </Card>
  );

  const backendView = (
    <BackendDataView sectionTitle="Certifications" objectName="certificationsData" data={certificationsData} />
  );

  return <FlipCard isFlipped={isBackendMode} front={frontendView} back={backendView} />;
};
