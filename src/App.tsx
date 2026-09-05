import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { Header } from '@/components/layout/Header';
import { TableOfContents } from '@/components/layout/TableOfContents';
import { NavigationDrawer } from '@/components/layout/NavigationDrawer';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { ActivitiesSection } from '@/components/home/ActivitiesSection';
import { AboutSection } from '@/components/home/AboutSection';
import { GallerySection } from '@/components/home/GallerySection';
import { CommunityNotesSection } from '@/components/home/CommunityNotesSection';
import { Quote } from '@/components/quote/Quote';
import { Footer } from '@/components/footer/Footer';
import { getSessionCache, setSessionCache } from '@/utils/sessionCache';

const SESSION_DRAWER_OPEN_KEY = 'jp_portfolio_drawer_open';

const SPRING_TRANSITION = {
  type: 'spring',
  stiffness: 280,
  damping: 30,
  mass: 0.8,
} as const;

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
  const shiftAmount = isMobile ? -60 : -220;
  const currentTransition = shouldAnimate ? SPRING_TRANSITION : { duration: 0 };

  return (
    <div className="min-h-[100dvh] bg-grid-pattern relative flex flex-col items-center overflow-x-clip">
      {/* Fixed Left In-Page Navigation (Stays fixed when scrolling, shifts left in sync when drawer opens) */}
      <motion.aside
        initial={false}
        animate={{
          x: isDrawerOpen ? shiftAmount : 0,
        }}
        transition={currentTransition}
        className="hidden xl:block fixed left-[max(1.5rem,calc(50%-39.5rem))] top-28 z-30 w-44 pointer-events-auto"
      >
        <TableOfContents />
      </motion.aside>

      {/* Animated Main Content Wrapper that shifts left when right drawer opens */}
      <motion.div
        initial={false}
        animate={{
          x: isDrawerOpen ? shiftAmount : 0,
          scale: isDrawerOpen ? (isMobile ? 0.98 : 0.96) : 1,
          opacity: isDrawerOpen ? 0.85 : 1,
        }}
        transition={currentTransition}
        className="w-full flex flex-col items-center flex-1 origin-left pointer-events-auto"
      >
        {/* Top Header */}
        <Header onOpenDrawer={handleOpenDrawer} />

        {/* Main Centered Editorial Spine */}
        <main className="w-full max-w-3xl px-4 sm:px-6 flex-1">
          <HeroSection />
          <FeaturedProjects />
          <ActivitiesSection />
          <AboutSection />
          <GallerySection />
          <CommunityNotesSection />
          <Quote />
        </main>

        {/* Clean Minimal Footer */}
        <Footer />
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