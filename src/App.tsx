import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Header } from '@/components/layout/Header';
import { NavigationDrawer } from '@/components/layout/NavigationDrawer';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { ActivitiesSection } from '@/components/home/ActivitiesSection';
import { AboutSection } from '@/components/home/AboutSection';
import { GallerySection } from '@/components/home/GallerySection';
import { Quote } from '@/components/quote/Quote';
import { Footer } from '@/components/footer/Footer';

export const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Leftward shift amount based on viewport size
  const shiftAmount = isMobile ? -60 : -220;

  return (
    <div className="min-h-[100dvh] bg-grid-pattern relative flex flex-col items-center overflow-x-hidden">
      {/* Animated Main Content Wrapper that shifts left when sidebar opens */}
      <motion.div
        animate={{
          x: isDrawerOpen ? shiftAmount : 0,
          scale: isDrawerOpen ? (isMobile ? 0.98 : 0.96) : 1,
          opacity: isDrawerOpen ? 0.6 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 280,
          damping: 30,
          mass: 0.8,
        }}
        className="w-full flex flex-col items-center flex-1 origin-left pointer-events-auto"
      >
        {/* Top Header */}
        <Header
          onOpenDrawer={() => {
            setIsDrawerOpen(true);
          }}
        />

        {/* Main Centered Editorial Spine */}
        <main className="w-full max-w-3xl px-4 sm:px-6 flex-1">
          <HeroSection />
          <FeaturedProjects />
          <ActivitiesSection />
          <AboutSection />
          <GallerySection />
          <Quote />
        </main>

        {/* Clean Minimal Footer */}
        <Footer />
      </motion.div>

      {/* Slide-over Navigation Drawer */}
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
        }}
      />
    </div>
  );
};

export default App;