import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'motion/react';
import { Header } from '@/components/layout/Header';
import { TableOfContents } from '@/components/layout/TableOfContents';
import { LanyardBadge } from '@/components/ui/LanyardBadge';
import { NavigationDrawer } from '@/components/layout/NavigationDrawer';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { ActivitiesSection } from '@/components/home/ActivitiesSection';
import { AboutSection } from '@/components/home/AboutSection';
import { GallerySection } from '@/components/home/GallerySection';
import { CommunityNotesSection } from '@/components/home/CommunityNotesSection';
import { Quote } from '@/components/quote/Quote';
import { Footer } from '@/components/footer/Footer';
import { Globe } from '@/components/lightswind/globe';
import { getSessionCache, setSessionCache } from '@/utils/sessionCache';

const SESSION_DRAWER_OPEN_KEY = 'jp_portfolio_drawer_open';

const SPRING_TRANSITION = {
  type: 'spring',
  stiffness: 280,
  damping: 30,
  mass: 0.8,
} as const;

const PHILIPPINES_MARKER = [{ location: [14.5995, 120.9842] as [number, number], size: 0.07 }];

export const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(() => {
    return getSessionCache(SESSION_DRAWER_OPEN_KEY) === true;
  });
  const [shouldAnimate, setShouldAnimate] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  const handleOpenDrawer = useCallback(() => {
    setShouldAnimate(true);
    setIsDrawerOpen(true);
    setSessionCache(SESSION_DRAWER_OPEN_KEY, true);
  }, []);

  const handleExplicitCloseDrawer = useCallback(() => {
    setShouldAnimate(true);
    setIsDrawerOpen(false);
    setSessionCache(SESSION_DRAWER_OPEN_KEY, false);
  }, []);

  const handleNavigateAway = useCallback(() => {
    // Suppress animations when navigating away using drawer links
    setShouldAnimate(false);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const shouldBeOpen = getSessionCache(SESSION_DRAWER_OPEN_KEY) === true;
      setShouldAnimate(false);
      setIsDrawerOpen(shouldBeOpen);
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Leftward shift amount based on viewport size
  const shiftAmount = -220;
  const currentTransition = shouldAnimate ? SPRING_TRANSITION : { duration: 0 };

  const memoizedMainContent = useMemo(
    () => (
      <main className="w-full max-w-3xl px-4 sm:px-6 flex-1 relative z-10">
        <HeroSection />
        <FeaturedProjects />
        <ActivitiesSection />
        <AboutSection />
        <GallerySection />
        <CommunityNotesSection />
        <Quote />
      </main>
    ),
    []
  );

  const memoizedFooter = useMemo(() => <Footer />, []);

  return (
    <div className="min-h-[100dvh] bg-grid-pattern relative flex flex-col items-center overflow-x-clip">
      {/* Fixed Left In-Page Navigation & Interactive Lanyard (Only rendered on desktop xl: 1280px+) */}
      {!isMobile && (
        <motion.aside
          initial={false}
          animate={{
            x: isDrawerOpen ? shiftAmount : 0,
          }}
          transition={currentTransition}
          className="hidden xl:flex flex-col items-start gap-5 fixed left-[max(1.5rem,calc(50%-40.5rem))] top-28 z-30 w-56 pointer-events-auto"
        >
          <TableOfContents />
          <div className="w-full h-px bg-black/6 dark:bg-white/8 my-0.5" />
          <LanyardBadge />
        </motion.aside>
      )}

      {/* Animated Main Content Wrapper: pure GPU transform x-shift on desktop, 0 repaint overhead on mobile */}
      <motion.div
        initial={false}
        animate={{
          x: isDrawerOpen && !isMobile ? shiftAmount : 0,
        }}
        transition={currentTransition}
        className="w-full flex flex-col items-center flex-1 origin-left pointer-events-auto relative transform-gpu"
      >
        {/* Top Header */}
        <Header onOpenDrawer={handleOpenDrawer} />

        {/* Main Centered Editorial Spine */}
        {memoizedMainContent}

        {/* Clean Minimal Footer */}
        {memoizedFooter}

        {/* Large Rotating Globe (Positioned at bottom only, non-fixed, under content) */}
        <div
          className="absolute bottom-0 right-0 w-full h-[550px] sm:h-[750px] md:h-[1100px] lg:h-[1250px] overflow-hidden pointer-events-none select-none z-0 transform-gpu"
          style={{ contain: 'paint layout' }}
          aria-hidden="true"
        >
          <div className="absolute right-0 bottom-0 translate-x-[36%] translate-y-[20%] sm:translate-x-[40%] sm:translate-y-[22%] md:translate-x-[42%] md:translate-y-[26%] w-[380px] h-[380px] sm:w-[650px] sm:h-[650px] md:w-[1100px] md:h-[1100px] lg:w-[1450px] lg:h-[1450px] xl:w-[1600px] xl:h-[1600px] opacity-85 dark:opacity-80 transition-opacity duration-300">
            <Globe
              autoRotate={true}
              autoRotateSpeed={0.003}
              interactive={false}
              enableZoom={false}
              markers={PHILIPPINES_MARKER}
              className="w-full h-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Slide-over Navigation Drawer (Opens from right side) */}
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={handleExplicitCloseDrawer}
        onNavigate={handleNavigateAway}
        shouldAnimate={shouldAnimate}
      />
    </div>
  );
};

export default App;