import { StrictMode, useEffect, useState, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';

import './index.css';
import { Router } from './routes.tsx';
import { ScrollToTop } from './components/ScrollToTop.tsx';

import { ThemeProvider } from './providers/ThemeProvider.tsx';
import { WindowShadowOverlay } from './components/ui/WindowShadowOverlay';

const isMobileOrTouch = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
};

const SmoothScrollWrapper = ({ children }: { children: ReactNode }) => {
  const [isMobile, setIsMobile] = useState(isMobileOrTouch);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(isMobileOrTouch());
    };
    window.addEventListener('resize', checkScreen);
    return () => {
      window.removeEventListener('resize', checkScreen);
    };
  }, []);

  if (isMobile) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        wheelMultiplier: 1.15,
        smoothWheel: true,
        stopInertiaOnNavigate: true,
        respectReducedMotion: true,
      }}
    >
      {children}
    </ReactLenis>
  );
};

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider>
      <SmoothScrollWrapper>
        <BrowserRouter>
          <ScrollToTop />
          <WindowShadowOverlay />
          <Router />
        </BrowserRouter>
      </SmoothScrollWrapper>
    </ThemeProvider>
  </StrictMode>
);
