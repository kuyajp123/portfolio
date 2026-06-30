import { CertificateDetailsPage } from '@/pages/certifications/_components/CertificateDetailsPage';
import { GithubGraphPage } from '@/pages/githubGraphs/_components/GithubGraphPage';
import { TechStack } from '@/pages/techStack/_components/TechStack';
import { NotFound } from '@/pages/NotFound';
import { Route, Routes } from 'react-router-dom';
import App from './App';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/tech-stack" element={<TechStack />} />
      <Route path="/github-graphs" element={<GithubGraphPage />} />
      <Route path="/certificates/:id" element={<CertificateDetailsPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
