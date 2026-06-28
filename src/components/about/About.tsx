import { BackendDataView } from '@/components/ui/cards/BackendDataView';
import { Card } from '@/components/ui/cards/Card';
import { FlipCard } from '@/components/ui/cards/FlipCard';

const aboutData = {
  title: 'About',
  paragraphs: [
    'Information Technology graduate with hands-on experience in full-stack web and mobile application development through internship and academic projects.',
    'Passionate about software development, problem-solving, and continuous learning for personal and professional growth. Seeking opportunities to contribute to innovative projects and expand my skill set in a dynamic work environment.',
  ],
  technologies: ['React.js', 'React Native', 'Node.js', 'TypeScript', 'Database'],
};

interface AboutProps {
  isBackendMode?: boolean;
}

export const About = ({ isBackendMode = false }: AboutProps) => {
  const frontendView = (
    <Card>
      <h1 className="mb-2">About</h1>
      <div className="text-justify font-semibold">
        {aboutData.paragraphs[0]} Worked with technologies including {aboutData.technologies.join(', ')} to develop
        academic and internship projects.
        <br />
        <br />
        {aboutData.paragraphs[1]}
      </div>
    </Card>
  );

  const backendView = <BackendDataView sectionTitle="About" objectName="aboutData" data={aboutData} />;

  return <FlipCard isFlipped={isBackendMode} front={frontendView} back={backendView} />;
};
