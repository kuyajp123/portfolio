import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import profile from '@/assets/profile.jpg';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FiArrowUpRight } from 'react-icons/fi';
import { getProfileStatus } from '@/services/communityNotes';

export const HeroSection = () => {
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    const fetchStatus = async () => {
      const liveStatus = await getProfileStatus();
      setStatus(liveStatus);
    };
    void fetchStatus();
  }, []);

  return (
    <section id="intro" className="pt-6 sm:pt-10 pb-10 scroll-mt-24">
      {/* Top Profile + Bio Block */}
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-9 items-start">
        {/* Avatar Image with subtle border, status bubble, and online indicator */}
        <div className="relative shrink-0 pt-6 sm:pt-7">
          {/* Instagram-style Floating Status Bubble */}
          {status !== '' && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="absolute -top-1 sm:-top-2 left-0 sm:left-[28%] sm:-translate-x-1/2 z-20 select-none pointer-events-none whitespace-nowrap"
            >
              <div className="relative px-3 py-1 rounded-2xl bg-white/95 dark:bg-[#151923]/95 backdrop-blur-md border border-black/10 dark:border-white/15 shadow-[0_4px_16px_rgba(0,0,0,0.12)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] flex items-center gap-1.5 max-w-[200px] sm:max-w-[220px]">
                <span className="font-sans text-[11px] sm:text-xs text-gray-800 dark:text-gray-100 font-medium tracking-tight truncate">
                  {status}
                </span>

                {/* Speech bubble pointer dots (Instagram style, pointing down to avatar) */}
                <span className="absolute -bottom-1 left-6 sm:left-[58%] sm:-translate-x-1/2 w-2 h-2 rounded-full bg-white/95 dark:bg-[#151923]/95 border-b border-r border-black/10 dark:border-white/15" />
                <span className="absolute -bottom-2 left-5 sm:left-[55%] sm:-translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/95 dark:bg-[#151923]/95 border-b border-r border-black/10 dark:border-white/15" />
              </div>
            </motion.div>
          )}

          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-black/10 dark:border-white/15 shadow-sm bg-black/5 dark:bg-white/5">
            <img
              src={profile}
              alt="John Paul Naag"
              className="w-full h-full object-cover grayscale contrast-110"
              loading="eager"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-[#f6f7f9] dark:ring-[#0b0d10]" title="Available for opportunities" />
        </div>

        {/* Narrative & Name */}
        <div className="flex flex-col gap-3 sm:pt-2">
          <div>
            <h1 className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              John Paul Naag
            </h1>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400 mt-0.5">
              Full Stack Developer
            </p>
          </div>

          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
            Information Technology graduate passionate about building thoughtful, reliable web and mobile applications. Focused on React, TypeScript, Node.js, and modern interface engineering.
          </p>

          {/* Social Links Row */}
          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-mono text-gray-500 dark:text-gray-400">
            <a
              href="https://github.com/kuyajp123"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <FaGithub size={13} />
              <span>github</span>
              <FiArrowUpRight size={12} className="opacity-70" />
            </a>
            <a
              href="https://www.linkedin.com/in/john-paul-naag-40129b3a8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <FaLinkedin size={13} />
              <span>linkedin</span>
              <FiArrowUpRight size={12} className="opacity-70" />
            </a>
            <a
              href="mailto:johnpaulnaag10@gmail.com"
              className="inline-flex items-center gap-1 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <MdEmail size={14} />
              <span>email</span>
              <FiArrowUpRight size={12} className="opacity-70" />
            </a>
          </div>
        </div>
      </div>

      {/* 4-Column Key Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10 pt-6 border-t border-black/8 dark:border-white/10">
        <div className="flex flex-col">
          <span className="font-mono text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">
            1st Place
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 mt-0.5">
            Best Research Paper
          </span>
        </div>

        <div className="flex flex-col">
          <span className="font-mono text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">
            Full Stack
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 mt-0.5">
            React & Node.js
          </span>
        </div>

        <div className="flex flex-col">
          <span className="font-mono text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">
            Freelance
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 mt-0.5">
            Developer Alum
          </span>
        </div>

        <div className="flex flex-col">
          <span className="font-mono text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">
            BSIT '26
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 mt-0.5">
            CVSU Graduate
          </span>
        </div>
      </div>
    </section>
  );
};
