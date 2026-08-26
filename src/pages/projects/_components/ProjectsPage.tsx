import { useState, useEffect } from 'react';
import { projectDetails, type ProjectDetail } from '@/constant/projectDetails';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { AppBuildersBadge } from '@/components/ui/AppBuildersBadge';
import { EditorialImageViewer, type ViewerItem } from '@/components/ui/EditorialImageViewer';
import { Footer } from '@/components/footer/Footer';
import { ThemeToggle } from '@/components/button/Theme';
import {
  FiAward,
  FiCalendar,
  FiMaximize2,
  FiArrowUpRight,
  FiGithub,
  FiDownload,
  FiExternalLink,
  FiArrowRight,
} from 'react-icons/fi';
import { IoChevronBackOutline } from 'react-icons/io5';
import { Link, useLocation } from 'react-router-dom';

export const ProjectsPage = () => {
  const { hash } = useLocation();
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Auto-scroll to target project when hash is provided in URL
  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
        return () => {
          clearTimeout(timer);
        };
      }
    }
  }, [hash]);

  const viewerItems: ViewerItem[] = selectedProject
    ? selectedProject.images.map(img => ({
        src: img.src,
        title: img.title,
        caption: img.caption,
        category: selectedProject.title,
        date: selectedProject.date,
      }))
    : [];

  return (
    <div className="min-h-[100dvh] bg-grid-pattern flex flex-col items-center">
      {/* Top Bar */}
      <header className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <IoChevronBackOutline size={15} />
          <span>Back</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/" className="font-mono text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            johnpaul.dev
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-3xl px-4 sm:px-6 py-4 flex-1 flex flex-col gap-10">
        <SectionHeader
          number="01"
          title="Featured Work"
          subtitle="Comprehensive architectural breakdowns, technical capabilities, repositories, and photo galleries for selected applications."
        />

        <div className="flex flex-col divide-y divide-black/8 dark:divide-white/8">
          {projectDetails.map(project => (
            <article
              key={project.key}
              id={project.key}
              className="py-10 first:pt-0 last:pb-2 flex flex-col gap-6 scroll-mt-24"
            >
              {/* Header: Title, Award, Date */}
              <div className="flex flex-col gap-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h2 className="font-sans text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
                      {project.title}
                    </h2>

                    {project.award && (
                      <Link to={project.awardLink ?? '/certificates/best-paper'}>
                        <Badge variant="award">
                          <FiAward size={12} className="shrink-0" />
                          <span>{project.award}</span>
                        </Badge>
                      </Link>
                    )}
                  </div>

                  <span className="inline-flex items-center gap-1 font-mono text-xs text-gray-400 dark:text-gray-500 shrink-0">
                    <FiCalendar size={11} />
                    {project.date}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-200 font-medium leading-relaxed">
                  {project.subtitle}
                </p>
              </div>

              {/* Narrative Description */}
              <div className="flex flex-col gap-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                {project.description.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>

              {/* Architecture Note if available */}
              {project.architectureNote && (
                <div className="p-3.5 rounded-xl border border-sky-500/20 bg-sky-500/5 dark:bg-sky-400/5 text-xs text-sky-700 dark:text-sky-300 font-mono leading-relaxed">
                  <span className="font-semibold text-sky-800 dark:text-sky-200 block mb-1">
                    System Architecture Note:
                  </span>
                  {project.architectureNote}
                </div>
              )}

              {/* Microsoft Store / Play Store Style Screenshot Rail */}
              <div className="flex flex-col gap-2 pt-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                    Screenshots & Visuals (Click to Inspect)
                  </span>
                  <span className="font-mono text-[11px] text-gray-400 dark:text-gray-500">
                    {project.images.length} visuals • scroll ↔
                  </span>
                </div>

                <div className="flex gap-3.5 overflow-x-auto pb-3 pt-1 scrollbar-thin scroll-smooth snap-x snap-mandatory">
                  {project.images.map((img, imgIdx) => (
                    <div
                      key={img.title}
                      onClick={() => {
                        setSelectedProject(project);
                        setActiveImageIndex(imgIdx);
                      }}
                      className={`shrink-0 snap-start group/shot relative overflow-hidden rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 cursor-pointer transition-all duration-300 hover:border-black/25 dark:hover:border-white/25 hover:shadow-md ${
                        img.aspect === 'portrait'
                          ? 'w-[170px] sm:w-[210px] aspect-[9/16]'
                          : 'w-[280px] sm:w-[380px] aspect-[16/10]'
                      }`}
                    >
                      <img
                        src={img.src}
                        alt={img.title}
                        className="w-full h-full object-cover grayscale group-hover/shot:grayscale-0 group-hover/shot:scale-102 transition-all duration-500 ease-out"
                        loading="lazy"
                      />

                      {/* Top Inspect Pill */}
                      <div className="absolute top-2.5 right-2.5 opacity-0 group-hover/shot:opacity-100 transition-opacity duration-300 bg-black/70 backdrop-blur-md text-white p-1.5 rounded-lg border border-white/20">
                        <FiMaximize2 size={12} />
                      </div>

                      {/* Bottom Caption Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover/shot:opacity-100 transition-opacity duration-300 p-3.5 flex flex-col justify-end">
                        <span className="font-sans text-xs font-semibold text-white line-clamp-1">
                          {img.title}
                        </span>
                        <span className="font-mono text-[10px] text-gray-300 line-clamp-2 mt-0.5">
                          {img.caption}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features List */}
              <div className="flex flex-col gap-3 pt-2">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                  Key Capabilities & Features
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map(feat => (
                    <div
                      key={feat.title}
                      className="p-3 rounded-xl border border-black/6 dark:border-white/8 bg-black/2 dark:bg-white/2 flex flex-col gap-1"
                    >
                      <div className="flex items-center gap-1.5 font-sans text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100">
                        <span className="font-mono text-sky-500 select-none">›</span>
                        <span>{feat.title}</span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed pl-3.5">
                        {feat.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tags.map(tag => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>

              {/* External Links & App Builders PH Embed */}
              <div className="flex flex-col gap-4 pt-2">
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-semibold"
                    >
                      <FiExternalLink size={13} />
                      <span>Visit Live Application</span>
                      <FiArrowUpRight size={12} />
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      <FiGithub size={13} />
                      <span>GitHub Repository</span>
                      <FiArrowUpRight size={12} />
                    </a>
                  )}

                  {project.downloadUrl && (
                    <a
                      href={project.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      <FiDownload size={13} />
                      <span>Download Releases</span>
                      <FiArrowUpRight size={12} />
                    </a>
                  )}

                  <Link
                    to={`/projects/${project.key}`}
                    className="inline-flex items-center gap-1.5 text-gray-800 dark:text-gray-200 hover:text-sky-600 dark:hover:text-sky-400 font-semibold"
                  >
                    <span>Full Case Study</span>
                    <FiArrowRight size={12} />
                  </Link>

                  {project.awardLink && (
                    <Link
                      to={project.awardLink}
                      className="inline-flex items-center gap-1.5 text-amber-600 dark:text-amber-400 hover:underline"
                    >
                      <FiAward size={13} />
                      <span>View Research Paper Award</span>
                      <FiArrowUpRight size={12} />
                    </Link>
                  )}
                </div>

                {/* App Builders PH Themed Badge */}
                {project.appBuildersSlug && (
                  <div className="pt-2">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 block mb-2">
                      Community Spotlight
                    </span>
                    <AppBuildersBadge appName={project.title} appSlug={project.appBuildersSlug} />
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />

      {/* Bespoke Editorial Image Viewer for Project Screenshots */}
      <EditorialImageViewer
        isOpen={selectedProject !== null}
        currentIndex={activeImageIndex}
        onIndexChange={idx => {
          setActiveImageIndex(idx);
        }}
        onClose={() => {
          setSelectedProject(null);
        }}
        items={viewerItems}
      />
    </div>
  );
};