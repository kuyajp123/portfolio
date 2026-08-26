import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FiArrowLeft, FiArrowRight, FiX } from 'react-icons/fi';

export interface ViewerItem {
  src: string;
  title: string;
  caption?: string;
  category?: string;
  date?: string;
}

export interface EditorialImageViewerProps {
  isOpen: boolean;
  onClose: () => void;
  currentIndex: number;
  onIndexChange: (index: number) => void;
  items: ViewerItem[];
}

export const EditorialImageViewer = ({
  isOpen,
  onClose,
  currentIndex,
  onIndexChange,
  items,
}: EditorialImageViewerProps) => {
  const currentItem = items[currentIndex];
  const hasMultiple = items.length > 1;

  // Keyboard navigation & escape listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasMultiple) {
        onIndexChange((currentIndex - 1 + items.length) % items.length);
      } else if (e.key === 'ArrowRight' && hasMultiple) {
        onIndexChange((currentIndex + 1) % items.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, items.length, hasMultiple, onClose, onIndexChange]);

  // Lock body scroll when open
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
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Deep Frosted Atmospheric Backdrop - Clicking outside closes viewer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#07090c]/85 dark:bg-[#05070a]/90 backdrop-blur-2xl cursor-pointer"
            aria-label="Click outside to close"
          />

          {/* Main Inspection Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={e => {
              // Clicking canvas background also closes unless clicking an interactive element
              if (e.target === e.currentTarget) {
                onClose();
              }
            }}
            className="relative z-10 w-full h-full max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10 flex flex-col justify-between overflow-y-auto cursor-pointer"
          >
            {/* Top Minimal Bar */}
            <div className="flex items-center justify-between pointer-events-auto pb-4 cursor-default">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">
                  Document & Image Inspection
                </span>
                {currentItem.category && (
                  <span className="hidden sm:inline-block font-mono text-[11px] px-2 py-0.5 rounded bg-white/10 text-gray-300 border border-white/10">
                    {currentItem.category}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
              >
                <span>Close</span>
                <span className="text-[10px] text-gray-500">[Esc]</span>
                <FiX size={14} />
              </button>
            </div>

            {/* Split Editorial Area: Left = Title & Context, Right = High-Res Image */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-4 cursor-default">
              {/* Left Column: Generous Title, Narrative, Metadata & Cycling Controls */}
              <div
                className="lg:col-span-5 flex flex-col gap-4 text-left pointer-events-auto select-text"
                onClick={e => {
                  e.stopPropagation();
                }}
              >
                {/* Index Counter */}
                {hasMultiple && (
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-sky-400">
                      {String(currentIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                    </span>
                    <span className="text-gray-600">•</span>
                    {currentItem.date && (
                      <span className="font-mono text-xs text-gray-400">
                        {currentItem.date}
                      </span>
                    )}
                  </div>
                )}

                {/* Main Image Title */}
                <h2 className="font-sans text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                  {currentItem.title}
                </h2>

                {/* Narrative Caption */}
                {currentItem.caption && (
                  <p className="font-sans text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
                    {currentItem.caption}
                  </p>
                )}

                {/* Navigation Controls */}
                {hasMultiple && (
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => {
                        onIndexChange((currentIndex - 1 + items.length) % items.length);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-mono text-gray-200 bg-white/8 hover:bg-white/15 border border-white/10 transition-colors cursor-pointer"
                      aria-label="Previous image"
                    >
                      <FiArrowLeft size={13} />
                      <span>Prev</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onIndexChange((currentIndex + 1) % items.length);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-mono text-gray-200 bg-white/8 hover:bg-white/15 border border-white/10 transition-colors cursor-pointer"
                      aria-label="Next image"
                    >
                      <span>Next</span>
                      <FiArrowRight size={13} />
                    </button>

                    <span className="font-mono text-[11px] text-gray-500 ml-2 hidden sm:inline">
                      (use arrow keys)
                    </span>
                  </div>
                )}
              </div>

              {/* Right Column: Featured Image with Hairline Frame */}
              <div
                className="lg:col-span-7 flex items-center justify-center pointer-events-auto"
                onClick={e => {
                  e.stopPropagation();
                }}
              >
                <div className="relative max-h-[70vh] sm:max-h-[75vh] w-auto overflow-hidden rounded-2xl border border-white/15 shadow-2xl bg-black/40">
                  <motion.img
                    key={currentItem.src}
                    src={currentItem.src}
                    alt={currentItem.title}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="max-h-[70vh] sm:max-h-[75vh] w-auto max-w-full object-contain rounded-xl select-none"
                    draggable={false}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Subtle Click-Outside Hint */}
            <div className="text-center text-[11px] font-mono text-gray-500 pt-2 cursor-default">
              Click anywhere outside or press Esc to return
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};