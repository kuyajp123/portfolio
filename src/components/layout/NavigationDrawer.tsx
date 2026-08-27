import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { HiX } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FiDownload, FiArrowUpRight, FiHeadphones, FiCompass, FiSliders } from 'react-icons/fi';
import { ThemeToggle } from '@/components/button/Theme';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const outsideIdeSections = [
  {
    num: '01',
    label: 'Audio & Frequency',
    href: '/outside-ide/audio',
    desc: 'Live Spotify radar & heavy rotation',
    icon: FiHeadphones,
  },
  {
    num: '02',
    label: 'Radar & Appearances',
    href: '/outside-ide/radar',
    desc: 'Upcoming hackathons & community summits',
    icon: FiCompass,
  },
  {
    num: '03',
    label: 'Off-Screen Rituals',
    href: '/outside-ide/rituals',
    desc: 'Beyond the codebase & hardware focus',
    icon: FiSliders,
  },
];

const dedicatedDirectories = [
  { num: '01', label: 'Projects Directory', href: '/projects' },
  { num: '02', label: 'Activities & Hackathons', href: '/activities' },
  { num: '03', label: 'Tech Taxonomy', href: '/tech-stack' },
  { num: '04', label: 'GitHub Activity', href: '/github-graphs' },
  { num: '05', label: 'Research Awards', href: '/certificates/best-paper' },
];

export const NavigationDrawer = ({ isOpen, onClose }: NavigationDrawerProps) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop with soft tint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/25 dark:bg-black/45 backdrop-blur-[2px]"
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.aside
            ref={drawerRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 30, mass: 0.8 }}
            className="relative z-10 w-full max-w-md h-full bg-[#f6f7f9]/95 dark:bg-[#0e1116]/95 backdrop-blur-xl border-l border-black/8 dark:border-white/10 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
          >
            {/* Header & Navigation */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-black/8 dark:border-white/10">
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                    Navigation Index
                  </span>
                  <span className="font-mono text-sm font-semibold text-gray-900 dark:text-gray-100">
                    John Paul Naag
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                    aria-label="Close navigation"
                  >
                    <HiX size={20} />
                  </button>
                </div>
              </div>

              {/* Top: Outside the IDE Individual Navigation Buttons */}
              <div className="mt-6 flex flex-col gap-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gray-400 dark:text-gray-500 font-semibold">
                    Outside the IDE
                  </span>
                  <span className="font-mono text-[10px] text-gray-400 dark:text-gray-500">Spaces</span>
                </div>

                {outsideIdeSections.map(item => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={onClose}
                      className="group p-3 rounded-xl border border-black/8 dark:border-white/10 bg-black/2 dark:bg-white/3 hover:bg-black/5 dark:hover:bg-white/6 hover:border-black/15 dark:hover:border-white/20 transition-all flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                          <Icon size={15} />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-semibold text-gray-900 dark:text-gray-100 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors truncate">
                              {item.label}
                            </span>
                          </div>
                          <span className="text-[11px] text-gray-500 dark:text-gray-400 truncate">{item.desc}</span>
                        </div>
                      </div>

                      <span className="font-mono text-xs text-gray-400 dark:text-gray-500 group-hover:text-sky-500 transition-colors ml-2 shrink-0 flex items-center gap-0.5">
                        <span>{item.num}</span>
                        <FiArrowUpRight size={13} />
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="my-6 border-t border-black/8 dark:border-white/10" />

              {/* Bottom: Dedicated Directories */}
              <div className="flex flex-col gap-1.5">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gray-400 dark:text-gray-500 mb-1">
                  Dedicated Directories
                </p>
                {dedicatedDirectories.map(page => (
                  <Link
                    key={page.label}
                    to={page.href}
                    onClick={onClose}
                    className="group flex items-center justify-between py-2 px-3"
                  >
                    <span className="font-mono text-xs font-semibold group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
                      {page.label}
                    </span>
                    <span className="font-mono text-xs text-gray-400 dark:text-gray-500 group-hover:text-sky-500 transition-colors flex items-center gap-1">
                      <span>{page.num}</span>
                      <FiArrowUpRight size={12} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Footer with contacts */}
            <div className="pt-6 mt-6 border-t border-black/8 dark:border-white/10 flex flex-col gap-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gray-400 dark:text-gray-500">
                Connect
              </p>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="mailto:johnpaulnaag10@gmail.com"
                  className="flex items-center gap-2 p-2 rounded-lg border border-black/8 dark:border-white/8 text-xs font-mono text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <MdEmail size={14} />
                  <span>Email</span>
                </a>
                <a
                  href="https://github.com/kuyajp123"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 rounded-lg border border-black/8 dark:border-white/8 text-xs font-mono text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <FaGithub size={14} />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/john-paul-naag-40129b3a8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 rounded-lg border border-black/8 dark:border-white/8 text-xs font-mono text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <FaLinkedin size={14} />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://www.facebook.com/jeyps.py/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 rounded-lg border border-black/8 dark:border-white/8 text-xs font-mono text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <FaFacebook size={14} />
                  <span>Facebook</span>
                </a>
                <a
                  href="https://www.instagram.com/jeyps.css/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 rounded-lg border border-black/8 dark:border-white/8 text-xs font-mono text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <FaInstagram size={14} />
                  <span>Instagram</span>
                </a>
                <a
                  href="/resume.pdf"
                  download
                  className="flex items-center gap-2 p-2 rounded-lg border border-black/8 dark:border-white/8 text-xs font-mono text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <FiDownload size={14} />
                  <span>Resume</span>
                </a>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 dark:text-gray-500 pt-1">
                <span>Cavite, Philippines</span>
                <span>Esc to close</span>
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};