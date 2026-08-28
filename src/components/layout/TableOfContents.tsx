import { useState, useEffect, useCallback } from 'react';

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
  { id: 'notes', num: '05', label: 'Community Notes' },
];

export const TableOfContents = () => {
  const [activeId, setActiveId] = useState<string>('intro');

  const updateActiveSection = useCallback(() => {
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

    // Header offset threshold (accounting for sticky header ~60px + scroll-mt-24 margin)
    const threshold = 160;
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

    const handleScroll = () => {
      if (!ticking) {
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
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [updateActiveSection]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
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
                : 'text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <span
              className={`text-[11px] transition-colors ${
                isActive
                  ? 'text-sky-500'
                  : 'text-gray-400 dark:text-gray-600 group-hover:text-gray-700 dark:group-hover:text-gray-300'
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