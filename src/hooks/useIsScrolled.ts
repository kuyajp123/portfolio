import { useState, useEffect } from 'react';

/**
 * Hook to detect whether the page has scrolled past a specific threshold (in px).
 */
export const useIsScrolled = (threshold = 20) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const checkScroll = () => {
      setIsScrolled(window.scrollY > threshold);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(checkScroll);
        ticking = true;
      }
    };

    checkScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return isScrolled;
};