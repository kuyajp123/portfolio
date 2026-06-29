import {
  About,
  CarouselGallery,
  Experience,
  Footer,
  GithubGraphs,
  Header,
  PersonalDetails,
  Social,
} from '@/components/';
import { Certificate } from '@/pages/certifications/Certificate';
import { Projects } from '@/pages/projects';
import { TechStack } from '@/pages/techStack';
import type { DisplayMode } from '@/types/displayMode';
import { useState } from 'react';

const App = () => {
  const [displayMode, setDisplayMode] = useState<DisplayMode>('frontend');
  const isBackendMode = displayMode === 'backend';

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full max-w-4xl">
        <header className="p-4">
          <Header displayMode={displayMode} onDisplayModeChange={setDisplayMode} />
        </header>

        <section className="flex flex-col gap-4 p-4 md:grid md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-start">
          <div className="contents md:flex md:flex-col md:gap-4">
            <div className="order-1 md:order-none">
              <About isBackendMode={isBackendMode} />
            </div>
            <div className="order-3 md:order-none">
              <Projects isBackendMode={isBackendMode} />
            </div>
          </div>
          <div className="contents md:flex md:flex-col md:gap-4">
            <div className="order-2 md:order-none">
              <PersonalDetails isBackendMode={isBackendMode} />
            </div>
            <div className="order-4 md:order-none">
              <Experience isBackendMode={isBackendMode} />
            </div>
          </div>
        </section>
        <section className="p-4 pt-0">
          <TechStack isBackendMode={isBackendMode} />
        </section>
        <section className="grid grid-cols-1 items-start gap-4 p-4 pt-0 md:grid-cols-[1.5fr_1fr]">
          <Certificate isBackendMode={isBackendMode} />
          <Social isBackendMode={isBackendMode} />
        </section>
        <section className="p-4 pt-0">
          <h2 className="mb-2">Gallery</h2>
          <CarouselGallery />
        </section>
        <section className="p-4 pt-0">
          <h2 className="mb-2">Developer's Activity</h2>
          <GithubGraphs />
        </section>
        <div className="flex items-center m-4 mb-7">
          <div className="grow border-t border-gray-200 dark:border-gray-700"></div>
          <span className="px-4 text-gray-500 dark:text-gray-400 text-sm">Thanks for visiting!</span>
          <div className="grow border-t border-gray-200 dark:border-gray-700"></div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default App;
