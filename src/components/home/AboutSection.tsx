import { SectionHeader } from '@/components/ui/SectionHeader';
import { experiences } from '@/constant/experience';
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import { GithubRecentGraph } from '@/components/github/GithubRecentGraph';

export const AboutSection = () => {
  return (
    <section id="about" className="py-10 border-t border-black/8 dark:border-white/10 scroll-mt-24">
      <SectionHeader
        number="03"
        title="About & Ethos"
        subtitle="Background, technical journey, and development philosophy."
      />

      <div className="flex flex-col gap-6 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
        <p>
          I am a Full Stack Developer graduated with a degree in Information Technology from Cavite State University. My focus centers on architecting clean, maintainable software and intuitive interfaces across web and mobile platforms.
        </p>

        <p>
          Recently, I have been exploring the realms of AI and Machine Learning, integrating these technologies into my projects to enhance user experiences and streamline development workflows. My approach emphasizes type safety, reactive state management, and leveraging modern frameworks to build scalable applications.
        </p>
      </div>

      {/* Experience Milestone Timeline */}
      <div className="mt-8 pt-6 border-t border-black/8 dark:border-white/8">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
            Journey & Milestones
          </h4>
          <Link
            to="/tech-stack"
            className="inline-flex items-center gap-1 font-mono text-xs text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors"
          >
            <span>Tech Taxonomy</span>
            <FiArrowUpRight size={13} />
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {experiences.map(item => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-baseline justify-between py-2 border-b border-black/5 dark:border-white/5 last:border-b-0"
            >
              <div className="flex flex-col">
                <span className="font-sans text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {item.role}
                </span>
                <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
                  {item.organization}
                </span>
              </div>

              <span className="font-mono text-xs text-gray-400 dark:text-gray-500 mt-1 sm:mt-0">
                {item.period}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Contributions Section */}
      <div className="mt-8 pt-6 border-t border-black/8 dark:border-white/8">
        <GithubRecentGraph showSubpageLink={true} />
      </div>
    </section>
  );
};