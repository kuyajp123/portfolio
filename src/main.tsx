import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'

import './index.css'
import { Router } from './routes.tsx'
import { ScrollToTop } from './components/ScrollToTop.tsx'

import { ThemeProvider } from './providers/ThemeProvider.tsx';
import { WindowShadowOverlay } from './components/ui/WindowShadowOverlay';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider>
      <ReactLenis
        root
        options={{
          lerp: 0.075,
          wheelMultiplier: 1.15,
          smoothWheel: true,
          stopInertiaOnNavigate: true,
          respectReducedMotion: true,
        }}
      >
        <BrowserRouter>
          <ScrollToTop />
          <WindowShadowOverlay />
          <Router />
        </BrowserRouter>
      </ReactLenis>
    </ThemeProvider>
  </StrictMode>
);
