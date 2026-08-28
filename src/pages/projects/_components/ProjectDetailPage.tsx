import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectDetails } from '@/constant/projectDetails';
import { Badge } from '@/components/ui/Badge';
import { AppBuildersBadge } from '@/components/ui/AppBuildersBadge';
import { EditorialImageViewer, type ViewerItem } from '@/components/ui/EditorialImageViewer';
import { Footer } from '@/components/footer/Footer';
import { SubpageHeader } from '@/components/layout/SubpageHeader';
import {
  FiAward,
  FiCalendar,
  FiMaximize2,
  FiPlay,
  FiArrowUpRight,
  FiGithub,
  FiDownload,
  FiExternalLink,
  FiArrowLeft,
  FiArrowRight,
} from 'react-icons/fi';

export const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [activeImageIndex, setActiveImageIndex] = useState(-1);

  const currentIndex = projectDetails.findIndex(p => p.key === id);
  const project = currentIndex >= 0 ? projectDetails[currentIndex] : projectDetails[0];

  const prevProject = currentIndex > 0 ? projectDetails[currentIndex - 1] : null;
  const nextProject = currentIndex < projectDetails.length - 1 ? projectDetails[currentIndex + 1] : null;

  const viewerItems: ViewerItem[] = project.images.map(img => ({
    src: img.src,
    title: img.title,
    caption: img.caption,
    category: project.title,
    date: project.date,
    type: img.type,
    poster: img.poster,
  }));

  return (
    <div className="min-h-[100dvh] bg-grid-pattern flex flex-col items-center overflow-x-clip">
      {/* Top Sticky Liquid Glass Header */}
      <SubpageHeader />

      {/* Main Project Case Study Content */}
      <main className="w-full max-w-3xl px-4 sm:px-6 py-4 flex-1 flex flex-col gap-10">
        <article className="flex flex-col gap-8">
          {/* Section Indicator & Title Header */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-gray-400 dark:text-gray-500">
              <span className="text-sky-500">01</span>
              <span>/</span>
              <span>Case Study</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                {project.icon && (
                  <img
                    src={project.icon}
                    alt={`${project.title} icon`}
                    className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl object-cover bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 shadow-sm shrink-0"
                  />
                )}

                <h1 className="font-sans text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                  {project.title}
                </h1>

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

            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-200 font-normal leading-relaxed">
              {project.subtitle}
            </p>
          </div>

          {/* Narrative Overview */}
          <div className="flex flex-col gap-3.5 text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
            {project.description.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Architecture Note if available */}
          {project.architectureNote && (
            <div className="p-4 rounded-xl border border-sky-500/20 bg-sky-500/5 dark:bg-sky-400/5 text-xs sm:text-sm text-sky-800 dark:text-sky-300 font-mono leading-relaxed">
              <span className="font-bold text-sky-900 dark:text-sky-200 block mb-1">
                System Architecture Note:
              </span>
              {project.architectureNote}
            </div>
          )}

          {/* Microsoft Store / Play Store Style Screenshot Rail */}
          <div className="flex flex-col gap-2 pt-2">
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
                    setActiveImageIndex(imgIdx);
                  }}
                  className={`shrink-0 snap-start group/shot relative overflow-hidden rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 cursor-pointer transition-all duration-300 hover:border-black/25 dark:hover:border-white/25 hover:shadow-md ${
                    img.aspect === 'portrait'
                      ? 'w-[180px] sm:w-[220px] aspect-[9/16]'
                      : 'w-[300px] sm:w-[400px] aspect-[16/10]'
                  }`}
                >
                  <img
                    src={img.poster ?? img.src}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover/shot:scale-102 transition-all duration-500 ease-out"
                    loading="lazy"
                  />

                  {/* Video center play badge & top pill */}
                  {(img.type === 'video' || img.src.endsWith('.mp4')) && (
                    <>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/shot:bg-black/35 transition-colors">
                        <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xl group-hover/shot:scale-110 group-hover/shot:bg-sky-600 transition-all duration-300">
                          <FiPlay size={18} className="fill-white ml-0.5" />
                        </div>
                      </div>
                      <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-md text-white px-2 py-0.5 rounded-md border border-white/20 text-[10px] font-mono flex items-center gap-1">
                        <FiPlay size={8} className="fill-white" />
                        <span>VIDEO</span>
                      </div>
                    </>
                  )}

                  {/* Top Inspect Pill (for standard images) */}
                  {!img.type && !img.src.endsWith('.mp4') && (
                    <div className="absolute top-2.5 right-2.5 opacity-0 group-hover/shot:opacity-100 transition-opacity duration-300 bg-black/70 backdrop-blur-md text-white p-1.5 rounded-lg border border-white/20">
                      <FiMaximize2 size={12} />
                    </div>
                  )}

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

          {/* Key Capabilities & Features (Bullet Points List) */}
          <div className="flex flex-col gap-3 pt-2">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
              Key Capabilities & Features
            </span>
            <ul className="flex flex-col gap-2 list-none">
              {project.features.map(feat => (
                <li key={feat.title} className="flex items-start gap-2.5 text-xs sm:text-sm">
                  <span className="font-mono text-sky-500 dark:text-sky-400 font-bold select-none leading-relaxed">
                    •
                  </span>
                  <div className="leading-relaxed text-gray-700 dark:text-gray-300">
                    <strong className="font-semibold text-gray-900 dark:text-gray-100">
                      {feat.title}:
                    </strong>{' '}
                    <span>{feat.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tags.map(tag => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>

          {/* External Links & App Builders PH Embed */}
          <div className="flex flex-col gap-4 pt-2 border-t border-black/8 dark:border-white/8">
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

          {/* Project-to-Project Pagination Navigation */}
          <div className="pt-6 border-t border-black/8 dark:border-white/8 flex items-center justify-between gap-4">
            {prevProject ? (
              <Link
                to={`/projects/${prevProject.key}`}
                className="inline-flex items-center gap-2 p-3 rounded-xl border border-black/8 dark:border-white/10 bg-black/2 dark:bg-white/3 hover:bg-black/5 dark:hover:bg-white/6 text-xs font-mono text-gray-700 dark:text-gray-300 transition-colors group"
              >
                <FiArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
                <span>{prevProject.title}</span>
              </Link>
            ) : (
              <div />
            )}

            {nextProject ? (
              <Link
                to={`/projects/${nextProject.key}`}
                className="inline-flex items-center gap-2 p-3 rounded-xl border border-black/8 dark:border-white/10 bg-black/2 dark:bg-white/3 hover:bg-black/5 dark:hover:bg-white/6 text-xs font-mono text-gray-700 dark:text-gray-300 transition-colors group ml-auto"
              >
                <span>{nextProject.title}</span>
                <FiArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </article>
      </main>

      <Footer />

      {/* Bespoke Editorial Image Viewer for Project Screenshots */}
      <EditorialImageViewer
        isOpen={activeImageIndex >= 0}
        currentIndex={Math.max(0, activeImageIndex)}
        onIndexChange={idx => {
          setActiveImageIndex(idx);
        }}
        onClose={() => {
          setActiveImageIndex(-1);
        }}
        items={viewerItems}
      />
    </div>
  );
};