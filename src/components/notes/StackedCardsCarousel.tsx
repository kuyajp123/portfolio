import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { CommunityCard } from '@/components/notes/CommunityCard';
import type { CommunityNote } from '@/services/communityNotes';

interface StackedCardsCarouselProps {
  notes: CommunityNote[];
  onOpenModal: () => void;
  userHasNote: boolean;
}

export const StackedCardsCarousel = ({
  notes,
  onOpenModal,
  userHasNote,
}: StackedCardsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [lastActionTime, setLastActionTime] = useState<number>(() => Date.now());

  const total = notes.length;

  const nextCard = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex(prev => (prev + 1) % total);
  }, [total]);

  const prevCard = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex(prev => (prev - 1 + total) % total);
  }, [total]);

  const registerUserAction = useCallback(() => {
    setLastActionTime(Date.now());
  }, []);

  const handleNext = useCallback(() => {
    registerUserAction();
    nextCard();
  }, [nextCard, registerUserAction]);

  const handlePrev = useCallback(() => {
    registerUserAction();
    prevCard();
  }, [prevCard, registerUserAction]);

  const handleCardSelect = useCallback((idx: number) => {
    registerUserAction();
    setCurrentIndex(idx);
  }, [registerUserAction]);

  // Auto Rotation with Inactivity Cooldown (waits 6s of no action / no hover before advancing)
  useEffect(() => {
    if (total <= 1 || isHovered) {
      return;
    }

    const intervalId = window.setInterval(() => {
      const elapsedSinceAction = Date.now() - lastActionTime;
      // 6-second cooldown of zero action before resuming 3s auto rotation
      if (elapsedSinceAction >= 6000) {
        nextCard();
      }
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [total, isHovered, lastActionTime, nextCard]);

  if (total === 0) {
    const emptyNote: CommunityNote = {
      id: 'empty-placeholder',
      authorKey: 'empty',
      name: 'Claim Spot #1',
      role: 'First Community Contributor',
      message: 'No community notes yet. Be the first to leave your feedback, testimonial, or note and claim Spot #1 on the board!',
      color: 'obsidian',
      spotNumber: 1,
      createdAt: Date.now(),
    };

    return (
      <div className="relative w-full flex flex-col items-center py-6 sm:py-8 overflow-hidden">
        {/* Empty State Card */}
        <div
          className="w-[280px] sm:w-[310px] cursor-pointer hover:scale-102 transition-transform"
          onClick={onOpenModal}
        >
          <CommunityCard note={emptyNote} isInteractive={true} />
        </div>

        {/* Sub-label under card */}
        <div className="text-center pt-3 flex flex-col items-center gap-2">
          <span className="font-mono text-xs text-amber-400/90 font-medium">
            ✨ Spot #1 is currently open & ready to be claimed
          </span>

          {/* Interactive Action: Claim Spot #1 */}
          <button
            type="button"
            onClick={onOpenModal}
            className="mt-1 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-sans text-xs font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-102"
          >
            <span>✍️ Claim Spot #1</span>
          </button>
        </div>
      </div>
    );
  }

  const topNote = notes[currentIndex];

  return (
    <div
      className="relative w-full flex flex-col items-center py-6 sm:py-8 overflow-hidden"
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      {/* 3D Stage Container */}
      <div
        style={{ perspective: '1200px' }}
        className="relative w-full max-w-[360px] sm:max-w-[440px] h-[450px] sm:h-[480px] flex items-center justify-center"
      >
        {notes.map((note, idx) => {
          // Calculate shortest circular offset relative to currentIndex (-2, -1, 0, 1, 2)
          let offset = (idx - currentIndex + total) % total;
          if (offset > total / 2) {
            offset -= total;
          }

          const isVisible = Math.abs(offset) <= 2;
          if (!isVisible) return null;

          const isCenter = offset === 0;

          // 3D placement parameters matching HeroUI Pro reference
          let xOffset = 0;
          let yOffset = 0;
          let scale = 1;
          let rotateY = 0;
          let rotateZ = 0;
          let zIndex = 30;
          let opacity = 1;
          let brightness = 1;

          if (offset === 0) {
            xOffset = 0;
            yOffset = 0;
            scale = 1;
            rotateY = 0;
            rotateZ = 0;
            zIndex = 30;
            opacity = 1;
            brightness = 1;
          } else if (offset === 1) {
            xOffset = 60;
            yOffset = 5;
            scale = 0.93;
            rotateY = -14;
            rotateZ = 2.5;
            zIndex = 20;
            opacity = 0.90;
            brightness = 0.78;
          } else if (offset === -1) {
            xOffset = -60;
            yOffset = 5;
            scale = 0.93;
            rotateY = 14;
            rotateZ = -2.5;
            zIndex = 20;
            opacity = 0.90;
            brightness = 0.78;
          } else if (offset === 2) {
            xOffset = 110;
            yOffset = 12;
            scale = 0.85;
            rotateY = -24;
            rotateZ = 4.5;
            zIndex = 10;
            opacity = 0.50;
            brightness = 0.55;
          } else if (offset === -2) {
            xOffset = -110;
            yOffset = 12;
            scale = 0.85;
            rotateY = 24;
            rotateZ = -4.5;
            zIndex = 10;
            opacity = 0.50;
            brightness = 0.55;
          }

          return (
            <motion.div
              key={note.id}
              animate={{
                x: xOffset,
                y: yOffset,
                scale,
                rotateY,
                rotateZ,
                opacity,
                filter: `brightness(${String(brightness)})`,
              }}
              transition={{
                type: 'spring',
                stiffness: 180,
                damping: 24,
                mass: 0.75,
              }}
              style={{
                zIndex,
                transformStyle: 'preserve-3d',
              }}
              onClick={() => {
                if (!isCenter) {
                  handleCardSelect(idx);
                }
              }}
              className={`absolute w-[280px] sm:w-[310px] cursor-pointer transition-shadow ${
                isCenter ? 'cursor-default' : 'hover:opacity-100'
              }`}
            >
              <CommunityCard
                note={note}
                isInteractive={isCenter}
                onMouseEnter={() => {
                  setIsHovered(true);
                  registerUserAction();
                }}
                onMouseLeave={() => {
                  setIsHovered(false);
                  registerUserAction();
                }}
              />
            </motion.div>
          );
        })}

        {/* Left Arrow Button */}
        {total > 1 && (
          <button
            type="button"
            onClick={e => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute -left-2 sm:-left-8 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-black/75 hover:bg-black dark:bg-white/10 dark:hover:bg-white/20 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xl hover:scale-110 active:scale-95"
            aria-label="Previous card"
          >
            <FiChevronLeft size={20} />
          </button>
        )}

        {/* Right Arrow Button */}
        {total > 1 && (
          <button
            type="button"
            onClick={e => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute -right-2 sm:-right-8 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-black/75 hover:bg-black dark:bg-white/10 dark:hover:bg-white/20 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xl hover:scale-110 active:scale-95"
            aria-label="Next card"
          >
            <FiChevronRight size={20} />
          </button>
        )}
      </div>

      {/* Sub-label under card */}
      <div className="text-center pt-3 flex flex-col items-center gap-2">
        <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
          {topNote.name} claimed Spot #{String(topNote.spotNumber + 1)}
        </span>
        <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
          Get your spot anonymously!
        </span>

        {/* Interactive Action: Leave / Edit Note */}
        <button
          type="button"
          onClick={onOpenModal}
          className="mt-1 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500/90 to-amber-600/90 hover:from-amber-500 hover:to-amber-600 text-black font-sans text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-102"
        >
          <span>{userHasNote ? '✨ Edit Your Spot' : '🚀 Claim Your Spot!'}</span>
        </button>
      </div>
    </div>
  );
};
