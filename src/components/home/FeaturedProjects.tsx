import { SectionHeader } from '@/components/ui/SectionHeader';
import { projects } from '@/constant/projects';
import { FiAward } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export const FeaturedProjects = () => {
  return (
    <section id="work" className="py-10 border-t border-black/8 dark:border-white/10 scroll-mt-24">
      <SectionHeader
        number="01"
        title="Featured Work"
        subtitle="Selected software projects, applications, and academic engineering."
        viewAllLink={{
          label: 'All Projects',
          href: '/projects',
        }}
      />

      {/* Microsoft Store Style 3-Column App Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4.5 sm:gap-5 items-stretch">
        {projects.map(project => (
          <Link
            key={project.key}
            to={`/projects/${project.key}`}
            className="group relative flex flex-col justify-end overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-gray-100 dark:bg-[#12161f] shadow-sm hover:shadow-xl hover:border-black/25 dark:hover:border-white/25 hover:-translate-y-1 transition-all duration-300 min-h-[280px] sm:min-h-[290px] h-full w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            {/* Background Cover Image */}
            {project.coverImage && (
              <img
                src={project.coverImage}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />
            )}

            {/* Smooth Frosted Theme-Adaptive Backdrop Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/80 via-45% to-transparent dark:from-black/95 dark:via-black/80 dark:via-45% dark:to-transparent pointer-events-none transition-all duration-300" />

            {/* Bottom Content Bar */}
            <div className="relative z-10 p-3.5 sm:p-4 flex items-end">
              {/* App Icon + App Name & Subtitle */}
              <div className="flex items-center gap-3 min-w-0 w-full">
                {project.icon && (
                  <img
                    src={project.icon}
                    alt={`${project.title} icon`}
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover shadow-md border border-black/10 dark:border-white/10 shrink-0"
                    loading="lazy"
                  />
                )}

                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <h3 className="font-sans text-sm sm:text-base font-semibold text-gray-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors">
                      {project.title}
                    </h3>
                    {project.award && (
                      <span title="Award Winner" className="inline-flex items-center">
                        <FiAward size={14} className="text-amber-500 dark:text-amber-400 fill-amber-500/20 dark:fill-amber-400/20 shrink-0" />
                      </span>
                    )}
                  </div>

                  <p className="font-sans text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-tight mt-0.5 font-normal">
                    {project.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
