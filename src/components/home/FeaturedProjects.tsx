import { projects } from '@/constant/projects';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { FiAward, FiArrowUpRight, FiGithub } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export const FeaturedProjects = () => {
  return (
    <section id="work" className="py-10 border-t border-black/8 dark:border-white/10 scroll-mt-24">
      <SectionHeader
        number="01"
        title="Featured Work"
        subtitle="Selected software projects, applications, and academic engineering."
      />

      <div className="flex flex-col divide-y divide-black/8 dark:divide-white/8">
        {projects.map(project => (
          <article
            key={project.key}
            className="py-7 first:pt-2 last:pb-2 group transition-colors"
          >
            <div className="flex flex-col gap-3">
              {/* Header: Title, Award & Date */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2.5">
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

                <span className="font-mono text-xs text-gray-400 dark:text-gray-500 shrink-0">
                  {project.date}
                </span>
              </div>

              {/* Subtitle / Description */}
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl font-normal">
                {project.subtitle}
              </p>

              {/* Tech Stack & Links */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map(tag => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>

                <div className="flex items-center gap-3 text-xs font-mono">
                  <Link
                    to={`/projects/${project.key}`}
                    className="inline-flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-gray-950 dark:hover:text-white transition-colors"
                  >
                    <span>View Project</span>
                    <FiArrowUpRight size={13} />
                  </Link>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      <FiGithub size={13} />
                      <span>Source</span>
                      <FiArrowUpRight size={12} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};