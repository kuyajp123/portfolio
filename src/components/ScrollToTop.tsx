import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const SCROLL_STORAGE_KEY = 'jp_page_scroll_positions';

const getSavedPositions = (): Record<string, number> => {
  try {
    const raw = sessionStorage.getItem(SCROLL_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, number>) : {};
  } catch {
    return {};
  }
};

const saveScrollPosition = (pathname: string, y: number) => {
  try {
    const positions = getSavedPositions();
    positions[pathname] = y;
    sessionStorage.setItem(SCROLL_STORAGE_KEY, JSON.stringify(positions));
  } catch {
    // Ignore storage quota errors
  }
};

export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const currentPathRef = useRef(pathname);

  // Keep track of current path in ref
  useEffect(() => {
    currentPathRef.current = pathname;
  }, [pathname]);

  // Record scroll position for the current page (debounced to eliminate main-thread scroll jank)
  useEffect(() => {
    let timeoutId: number | undefined;

    const handleScroll = () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      timeoutId = window.setTimeout(() => {
        saveScrollPosition(currentPathRef.current, window.scrollY);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      saveScrollPosition(currentPathRef.current, window.scrollY);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Restore scroll position whenever pathname changes
  useEffect(() => {
    // Skip if navigating to a specific hash anchor (e.g. #aws-workshop)
    if (hash) {
      return;
    }

    const positions = getSavedPositions();
    const savedY = positions[pathname];

    const restore = (targetY: number) => {
      const html = document.documentElement;
      const originalScrollBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = 'auto';

      window.scrollTo({
        top: targetY,
        left: 0,
      });

      requestAnimationFrame(() => {
        html.style.scrollBehavior = originalScrollBehavior;
      });
    };

    if (typeof savedY === 'number' && savedY > 0) {
      restore(savedY);
      const timer1 = setTimeout(() => {
        restore(savedY);
      }, 50);
      const timer2 = setTimeout(() => {
        restore(savedY);
      }, 150);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      restore(0);
    }
  }, [pathname, hash]);

  return null;
};