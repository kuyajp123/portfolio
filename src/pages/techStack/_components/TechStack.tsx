import { Footer } from '@/components/footer/Footer';
import { SubpageHeader } from '@/components/layout/SubpageHeader';
import { Badge } from '@/components/ui/Badge';
import { SectionHeader } from '@/components/ui/SectionHeader';
import {
  AITechStack,
  backendTechStack,
  developmentTools,
  devOpsAndCloudTechStack,
  frontendTechStack,
  networkingAndVirtualization,
} from '@/pages/techStack/_components/constant';

export const TechStack = () => {

  const categories = [
    { title: 'Frontend Architecture', subtitle: 'Modern user interfaces, type safety & reactive state', items: frontendTechStack },
    { title: 'Backend & APIs', subtitle: 'Server runtimes, databases & real-time protocols', items: backendTechStack },
    { title: 'DevOps & Cloud', subtitle: 'Deployment environments, hosting & cloud platforms', items: devOpsAndCloudTechStack },
    { title: 'AI & Machine Intelligence', subtitle: 'LLM APIs, developer agents & assistive tooling', items: AITechStack },
    { title: 'Engineering & Design Tooling', subtitle: 'Editor tooling, API clients & workflow applications', items: developmentTools },
    { title: 'Networking & Systems', subtitle: 'Virtualization, network protocols & infrastructure', items: networkingAndVirtualization },
  ];

  return (
    <div className="min-h-[100dvh] bg-grid-pattern flex flex-col items-center overflow-x-clip">
      {/* Top Sticky Liquid Glass Header */}
      <SubpageHeader />

      {/* Main Content */}
      <main className="w-full max-w-3xl px-4 sm:px-6 py-4 flex-1">
        <SectionHeader
          number="04"
          title="Tech Taxonomy"
          subtitle="Comprehensive directory of languages, frameworks, infrastructure, and engineering tools."
        />

        <div className="flex flex-col divide-y divide-black/8 dark:divide-white/8 mt-6">
          {categories.map(cat => (
            <div key={cat.title} className="py-6 first:pt-0 last:pb-0">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="font-sans text-base font-semibold text-gray-900 dark:text-gray-100">
                    {cat.title}
                  </h3>
                  <span className="font-mono text-xs text-gray-400 dark:text-gray-500">
                    {cat.items.length} technologies
                  </span>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 font-normal">
                  {cat.subtitle}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-2">
                  {cat.items.map(tech => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};