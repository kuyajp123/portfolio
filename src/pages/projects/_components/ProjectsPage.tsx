import { Footer } from '@/components/footer/Footer';
import { SubpageHeader } from '@/components/layout/SubpageHeader';
import { Badge } from '@/components/ui/Badge';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { projectDetails } from '@/constant/projectDetails';
import { FiArrowUpRight, FiAward, FiDownload, FiExternalLink, FiGithub } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export const ProjectsPage = () => {
  return (
    <div className="min-h-[100dvh] bg-grid-pattern flex flex-col items-center overflow-x-clip">
      {/* Top Sticky Liquid Glass Header */}
      <SubpageHeader />

      {/* Main Content */}
      <main className="w-full max-w-3xl px-4 sm:px-6 py-4 flex-1 flex flex-col gap-8">
        <SectionHeader
          number="01"
          title="All Projects"
          subtitle="Software applications, web systems, developer tooling, and academic engineering."
        />

        <div className="flex flex-col divide-y divide-black/8 dark:divide-white/8">
          {projectDetails.map(project => (
            <article key={project.key} id={project.key} className="py-7 first:pt-2 last:pb-2 group transition-colors">
              <div className="flex flex-col gap-3">
                {/* Header: Title, Award & Date */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                    {project.icon && (
                      <Link
                        to={`/projects/${project.key}`}
                        className="shrink-0 transition-transform duration-200 group-hover:scale-105"
                      >
                        <img
                          src={project.icon}
                          alt={`${project.title} icon`}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-cover shadow-xs"
                          loading="lazy"
                        />
                      </Link>
                    )}

                    <Link
                      to={`/projects/${project.key}`}
                      className="font-sans text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors"
                    >
                      {project.title}
                    </Link>

                    {project.award && (
                      <Link to={project.awardLink ?? '/certificates/best-paper'}>
                        <Badge variant="award">
                          <FiAward size={12} className="shrink-0" />
                          <span>{project.award}</span>
                        </Badge>
                      </Link>
                    )}
                  </div>

                  <span className="font-mono text-xs text-gray-400 dark:text-gray-500 shrink-0">{project.date}</span>
                </div>

                {/* Subtitle / Description */}
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl font-normal">
                  {project.subtitle}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {project.tags.map(tag => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>

                {/* Action Links Row (Consistently Below Tags) */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono pt-1">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      <FiExternalLink size={12} />
                      <span>Live</span>
                      <FiArrowUpRight size={11} />
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      <FiGithub size={13} />
                      <span>Source</span>
                      <FiArrowUpRight size={12} />
                    </a>
                  )}

                  {project.downloadUrl && (
                    <a
                      href={project.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      <FiDownload size={13} />
                      <span>Download</span>
                      <FiArrowUpRight size={12} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};
