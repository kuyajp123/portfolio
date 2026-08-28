import { ActivitiesPage } from '@/pages/activities/_components/ActivitiesPage';
import { ProjectsPage } from '@/pages/projects/_components/ProjectsPage';
import { ProjectDetailPage } from '@/pages/projects/_components/ProjectDetailPage';
import { AudioFrequencyPage } from '@/pages/outsideIde/_components/AudioFrequencyPage';
import { RadarAppearancesPage } from '@/pages/outsideIde/_components/RadarAppearancesPage';
import { OffScreenRitualsPage } from '@/pages/outsideIde/_components/OffScreenRitualsPage';
import { CertificateDetailsPage } from '@/pages/certifications/_components/CertificateDetailsPage';
import { GithubGraphPage } from '@/pages/githubGraphs/_components/GithubGraphPage';
import { TechStack } from '@/pages/techStack/_components/TechStack';
import { CommunityNotesPage } from '@/pages/notes/_components/CommunityNotesPage';
import { NotFound } from '@/pages/NotFound';
import { Route, Routes } from 'react-router-dom';
import App from './App';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/projects/:id" element={<ProjectDetailPage />} />
      <Route path="/activities" element={<ActivitiesPage />} />
      <Route path="/outside-ide" element={<AudioFrequencyPage />} />
      <Route path="/outside-ide/audio" element={<AudioFrequencyPage />} />
      <Route path="/outside-ide/radar" element={<RadarAppearancesPage />} />
      <Route path="/outside-ide/rituals" element={<OffScreenRitualsPage />} />
      <Route path="/tech-stack" element={<TechStack />} />
      <Route path="/github-graphs" element={<GithubGraphPage />} />
      <Route path="/certificates/:id" element={<CertificateDetailsPage />} />
      <Route path="/notes" element={<CommunityNotesPage />} />
      <Route path="/testimonials" element={<CommunityNotesPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};