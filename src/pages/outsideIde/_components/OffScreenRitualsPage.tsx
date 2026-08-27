import { Footer } from '@/components/footer/Footer';
import { SubpageHeader } from '@/components/layout/SubpageHeader';
import { Badge } from '@/components/ui/Badge';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FiSliders, FiTerminal, FiZap } from 'react-icons/fi';
import { offScreenInterests } from './constant';

export const OffScreenRitualsPage = () => {
  return (
    <div className="min-h-[100dvh] bg-grid-pattern flex flex-col items-center overflow-x-clip">
      {/* Top Sticky Liquid Glass Header */}
      <SubpageHeader />

      {/* Main Content */}
      <main className="w-full max-w-3xl px-4 sm:px-6 py-4 flex-1 flex flex-col gap-10">
        {/* Page Title & Narrative Header */}
        <div className="flex flex-col gap-4">
          <SectionHeader
            number="05"
            title="Off-Screen Rituals"
            subtitle="Creative habits, workspace ergonomics, and hardware tinkering beyond the editor."
          />

          <div className="flex flex-wrap gap-2 pt-1">
            <Badge variant="default" className="flex items-center gap-1.5">
              <FiSliders size={11} className="shrink-0" />
              <span>Off-Screen</span>
            </Badge>
            <Badge variant="default" className="flex items-center gap-1.5">
              <FiTerminal size={11} className="shrink-0" />
              <span>AFK Habits</span>
            </Badge>
            <Badge variant="default" className="flex items-center gap-1.5">
              <FiZap size={11} className="shrink-0" />
              <span>Focus Craft</span>
            </Badge>
          </div>

          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
            Software engineering is powered by what happens away from the keyboard. This space captures the live
            soundtracks fueling daily focus, upcoming hackathon milestones, and the habits that keep building fun.
          </p>
        </div>

        {/* Off-Screen Rituals & Gear Cards */}
        <section className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
              Practices
            </span>
            <h2 className="font-sans text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
              Beyond the Codebase
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {offScreenInterests.map(item => (
              <div
                key={item.id}
                className="p-4.5 rounded-xl border border-black/8 dark:border-white/10 bg-black/2 dark:bg-white/3 flex flex-col gap-2 transition-colors hover:border-black/15 dark:hover:border-white/20"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-sky-600 dark:text-sky-400 font-semibold px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20">
                    {item.iconTag}
                  </span>
                  <span className="font-mono text-[10px] text-gray-400 dark:text-gray-500">{item.category}</span>
                </div>

                <h3 className="font-sans text-sm font-semibold text-gray-900 dark:text-gray-100 mt-1">{item.title}</h3>

                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
