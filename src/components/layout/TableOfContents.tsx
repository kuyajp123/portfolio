import { useState, useEffect, useCallback, useRef } from 'react';
import { useLenis } from 'lenis/react';

interface SectionItem {
  id: string;
  num: string;
  label: string;
}

const sections: SectionItem[] = [
  { id: 'intro', num: '00', label: 'Intro' },
  { id: 'work', num: '01', label: 'Featured Work' },
  { id: 'activities', num: '02', label: 'Activities' },
  { id: 'about', num: '03', label: 'About & Ethos' },
  { id: 'moments', num: '04', label: 'Visual Moments' },
  { id: 'notes', num: '05', label: 'Notes' },
];

export const TableOfContents = () => {
  const [activeId, setActiveId] = useState<string>('intro');
  const isClickingRef = useRef<string | null>(null);
  const clickTimeoutRef = useRef<number | undefined>(undefined);

  const updateActiveSection = useCallback(() => {
    // If user clicked a TOC link and smooth scroll is animating to it, preserve that selection
    if (isClickingRef.current) {
      setActiveId(isClickingRef.current);
      return;
    }

    // If at the very top of the page
    if (window.scrollY < 80) {
      setActiveId(sections[0].id);
      return;
    }

    // If reached the bottom of the page
    const scrollPosition = window.innerHeight + window.scrollY;
    const isBottom = scrollPosition >= document.documentElement.scrollHeight - 60;
    if (isBottom) {
      setActiveId(sections[sections.length - 1].id);
      return;
    }

    // Header offset threshold (accounting for sticky header ~76px + scroll-mt-24 margin of 96px)
    const threshold = 180;
    let currentId = sections[0].id;

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= threshold) {
          currentId = section.id;
        }
      }
    }

    setActiveId(currentId);
  }, []);

  useEffect(() => {
    let ticking = false;
    let lastTime = 0;

    const handleScroll = () => {
      const now = performance.now();
      // Throttle getBoundingClientRect calls to ~60ms for silky 60fps/120fps scrolling
      if (now - lastTime > 60 && !ticking) {
        lastTime = now;
        window.requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    updateActiveSection();
    const timer = setTimeout(updateActiveSection, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      if (clickTimeoutRef.current) {
        window.clearTimeout(clickTimeoutRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [updateActiveSection]);

  const lenis = useLenis();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      // Immediately lock and highlight the clicked section
      isClickingRef.current = id;
      if (clickTimeoutRef.current) {
        window.clearTimeout(clickTimeoutRef.current);
      }
      clickTimeoutRef.current = window.setTimeout(() => {
        isClickingRef.current = null;
      }, 800);

      setActiveId(id);

      if (id === 'intro') {
        if (lenis) {
          lenis.scrollTo(0, {
            lerp: 0.075,
            onComplete: () => {
              isClickingRef.current = null;
            },
          });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }

      if (lenis) {
        // Since sections have CSS scroll-margin-top: 6rem (scroll-mt-24 = 96px),
        // Lenis automatically deducts that 96px so offset: 0 aligns the section perfectly beneath the header.
        lenis.scrollTo(el, {
          offset: 0,
          lerp: 0.075,
          onComplete: () => {
            isClickingRef.current = null;
          },
        });
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <nav aria-label="In-page sections" className="flex flex-col gap-2 font-mono text-xs">
      {sections.map(section => {
        const isActive = activeId === section.id;
        return (
          <button
            key={section.id}
            type="button"
            onClick={() => {
              scrollToSection(section.id);
            }}
            className={`group flex items-center gap-2 text-left cursor-pointer transition-colors focus-visible:outline-hidden ${
              isActive
                ? 'text-sky-600 dark:text-sky-400 font-semibold'
                : 'text-gray-600 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 font-medium'
            }`}
          >
            <span
              className={`text-[11px] transition-colors ${
                isActive
                  ? 'text-sky-500'
                  : 'text-gray-500 dark:text-gray-600 group-hover:text-gray-900 dark:group-hover:text-gray-300 font-medium'
              }`}
            >
              {section.num}
            </span>
            <span className="truncate">{section.label}</span>
          </button>
        );
      })}
    </nav>
  );
};