import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-10 mt-8 border-t border-black/8 dark:border-white/10">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs font-mono text-gray-700 dark:text-gray-400 font-medium">
          <span>(c) {currentYear} John Paul Naag</span>
          <span className="hidden sm:inline text-gray-400 dark:text-gray-700">/</span>
          <span>Cavite, Philippines</span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-gray-700 dark:text-gray-400">
          <a
            href="https://github.com/kuyajp123"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 dark:hover:text-white transition-colors"
            aria-label="GitHub profile"
          >
            <FaGithub size={15} />
          </a>
          <a
            href="https://www.linkedin.com/in/john-paul-naag-40129b3a8"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 dark:hover:text-white transition-colors"
            aria-label="LinkedIn profile"
          >
            <FaLinkedin size={15} />
          </a>
          <a
            href="https://www.facebook.com/jeyps.py/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 dark:hover:text-white transition-colors"
            aria-label="Facebook profile"
          >
            <FaFacebook size={15} />
          </a>
          <a
            href="https://www.instagram.com/jeyps.css/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 dark:hover:text-white transition-colors"
            aria-label="Instagram profile"
          >
            <FaInstagram size={15} />
          </a>
          <a
            href="mailto:johnpaulnaag10@gmail.com"
            className="hover:text-gray-900 dark:hover:text-white transition-colors"
            aria-label="Email address"
          >
            <MdEmail size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
};