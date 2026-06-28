import { certifications } from '@/pages/certifications/_components/constant';
import { useParams } from 'react-router-dom';

export const CertificateDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const certificate = certifications.find(cert => cert.id === id);

  if (!certificate) {
    return (
      <main>
        <div>
          <h1>Certificate not found</h1>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div>
        <h1>{certificate.name}</h1>
        <p>{certificate.issuer}</p>
        <p>{certificate.date}</p>
      </div>
    </main>
  );
};
