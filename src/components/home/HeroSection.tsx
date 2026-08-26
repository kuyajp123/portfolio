import profile from '@/assets/profile.jpg';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FiArrowUpRight } from 'react-icons/fi';

export const HeroSection = () => {
  return (
    <section className="pt-6 sm:pt-10 pb-10">
      {/* Top Profile + Bio Block */}
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
        {/* Avatar Image with subtle border and atmospheric glow */}
        <div className="relative shrink-0">
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
        <div className="flex flex-col gap-3">
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
