import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import { Router } from './routes.tsx'
import { ScrollToTop } from './components/ScrollToTop.tsx'

import { ThemeProvider } from './providers/ThemeProvider.tsx';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
