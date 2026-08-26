import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { HiX } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FiDownload } from 'react-icons/fi';
import { ThemeToggle } from '@/components/button/Theme';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { num: '01', label: 'Featured Work', href: '/projects', isHash: false },
  { num: '02', label: 'Activities & Hackathons', href: '/activities', isHash: false },
  { num: '03', label: 'About & Ethos', href: '#about', isHash: true },
  { num: '04', label: 'Visual Moments', href: '#moments', isHash: true },
  { num: '05', label: 'Outside the IDE', href: '/outside-ide', isHash: false },
  { num: '06', label: 'Tech Taxonomy', href: '/tech-stack', isHash: false },
  { num: '07', label: 'GitHub Activity', href: '/github-graphs', isHash: false },
  { num: '08', label: 'Research Awards', href: '/certificates/best-paper', isHash: false },
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
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-black/8 dark:border-white/10">
                <div className="flex flex-col">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                    Navigation Index
                  </span>
                  <span className="font-mono text-sm font-semibold text-gray-900 dark:text-gray-100">
                    John Paul Naag
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                    aria-label="Close navigation"
                  >
                    <HiX size={20} />
                  </button>
                </div>
              </div>

              {/* Navigation links */}
              <nav className="mt-8 flex flex-col gap-2">
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gray-400 dark:text-gray-500 mb-2">
                  Directory
                </p>
                {navLinks.map(link => {
                  if (link.isHash) {
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={onClose}
                        className="group flex items-center justify-between py-3 px-3 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                      >
                        <span className="font-sans text-base sm:text-lg font-medium group-hover:translate-x-1 transition-transform">
                          {link.label}
                        </span>
                        <span className="font-mono text-xs text-gray-400 dark:text-gray-500 group-hover:text-sky-500 transition-colors">
                          {link.num}
                        </span>
                      </a>
                    );
                  }
                  return (
                    <Link
                      key={link.label}
                      to={link.href}
                      onClick={onClose}
                      className="group flex items-center justify-between py-3 px-3 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    >
                      <span className="font-sans text-base sm:text-lg font-medium group-hover:translate-x-1 transition-transform">
                        {link.label}
                      </span>
                      <span className="font-mono text-xs text-gray-400 dark:text-gray-500 group-hover:text-sky-500 transition-colors">
                        {link.num} ↗
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Footer with contacts & CV */}
            <div className="pt-8 mt-8 border-t border-black/8 dark:border-white/10 flex flex-col gap-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gray-400 dark:text-gray-500">
                Connect
              </p>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="mailto:johnpaulnaag10@gmail.com"
                  className="flex items-center gap-2 p-2.5 rounded-lg border border-black/8 dark:border-white/8 text-xs font-mono text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <MdEmail size={16} />
                  <span>Email</span>
                </a>
                <a
                  href="https://github.com/kuyajp123"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-lg border border-black/8 dark:border-white/8 text-xs font-mono text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <FaGithub size={15} />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/john-paul-naag-40129b3a8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-lg border border-black/8 dark:border-white/8 text-xs font-mono text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <FaLinkedin size={15} />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://www.facebook.com/jeyps.py/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-lg border border-black/8 dark:border-white/8 text-xs font-mono text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <FaFacebook size={15} />
                  <span>Facebook</span>
                </a>
                <a
                  href="https://www.instagram.com/jeyps.css/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-lg border border-black/8 dark:border-white/8 text-xs font-mono text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <FaInstagram size={15} />
                  <span>Instagram</span>
                </a>
                <a
                  href="/resume.pdf"
                  download
                  className="flex items-center gap-2 p-2.5 rounded-lg border border-black/8 dark:border-white/8 text-xs font-mono text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <FiDownload size={15} />
                  <span>Resume</span>
                </a>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 dark:text-gray-500 pt-2">
                <span>Cavite, Philippines</span>
                <span>Press Esc to close</span>
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};