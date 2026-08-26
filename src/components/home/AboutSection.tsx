import { SectionHeader } from '@/components/ui/SectionHeader';
import { experiences } from '@/constant/experience';
import { Link } from 'react-router-dom';

export const AboutSection = () => {
  return (
    <section id="about" className="py-10 border-t border-black/8 dark:border-white/10">
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
          During my developer tenure at Startuplab Business Center, I collaborated on production applications using React, Node.js, and TypeScript. In parallel, my academic research culminated in authoring <strong className="text-gray-900 dark:text-gray-100 font-semibold">Rescuenect</strong>, an emergency disaster management platform awarded Best Research Paper at the EMPIRE 2026 conference.
        </p>
      </div>

      {/* Experience Milestone Timeline */}
      <div className="mt-8 pt-6 border-t border-black/8 dark:border-white/8">
        <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-4">
          Journey & Milestones
        </h4>

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

        <div className="mt-5 flex items-center justify-between">
          <Link
            to="/tech-stack"
            className="font-mono text-xs text-sky-600 dark:text-sky-400 hover:underline"
          >
            Explore Complete Tech Taxonomy ?
          </Link>
          <Link
            to="/github-graphs"
            className="font-mono text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            View GitHub Activity ?
          </Link>
        </div>
      </div>
    </section>
  );
};
