import type { CardColor, CommunityNote } from '@/services/communityNotes';
import { useRef, useState } from 'react';

interface CommunityCardProps {
  note: CommunityNote;
  isInteractive?: boolean;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}

const colorThemeMap: Record<CardColor, { bg: string; glow: string; textMuted: string }> = {
  obsidian: {
    bg: 'bg-gradient-to-b from-[#1e2430] via-[#141820] to-[#0c0e14] border-white/15',
    glow: 'from-white/10',
    textMuted: 'text-gray-400',
  },
  amber: {
    bg: 'bg-gradient-to-b from-[#bf7406] via-[#995b03] to-[#6b3d00] border-amber-300/30',
    glow: 'from-amber-200/20',
    textMuted: 'text-amber-200/80',
  },
  emerald: {
    bg: 'bg-gradient-to-b from-[#0e5c4d] via-[#094236] to-[#052b23] border-emerald-300/30',
    glow: 'from-emerald-200/20',
    textMuted: 'text-emerald-200/80',
  },
  sapphire: {
    bg: 'bg-gradient-to-b from-[#1b3a6e] via-[#12274d] to-[#0a1730] border-sky-300/30',
    glow: 'from-sky-200/20',
    textMuted: 'text-sky-200/80',
  },
  plum: {
    bg: 'bg-gradient-to-b from-[#5c1a45] via-[#401130] to-[#280a1e] border-pink-300/30',
    glow: 'from-pink-200/20',
    textMuted: 'text-pink-200/80',
  },
  titanium: {
    bg: 'bg-gradient-to-b from-[#2f3545] via-[#202530] to-[#141820] border-white/20',
    glow: 'from-white/15',
    textMuted: 'text-gray-300',
  },
};

const formatDate = (timestamp: number) => {
  const d = new Date(timestamp);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const CommunityCard = ({
  note,
  isInteractive = true,
  className = '',
  onMouseEnter,
  onMouseLeave,
  onClick,
}: CommunityCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const theme = colorThemeMap[note.color];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isInteractive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Dynamic 3D tilt calculation (-12 to 12 degrees)
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseEnterCard = () => {
    setIsHovered(true);
    onMouseEnter?.();
  };

  const handleMouseLeaveCard = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    onMouseLeave?.();
  };

  return (
    <div
      style={{ perspective: '1000px' }}
      className={`block w-full max-w-full min-w-0 select-none ${className}`}
      onClick={onClick}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnterCard}
        onMouseLeave={handleMouseLeaveCard}
        style={{
          transform:
            isInteractive && isHovered
              ? `rotateX(${String(rotate.x)}deg) rotateY(${String(rotate.y)}deg) scale3d(1.02, 1.02, 1.02)`
              : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
          transformStyle: 'preserve-3d',
        }}
        className={`relative w-full max-w-full min-w-0 min-h-[380px] sm:min-h-[415px] aspect-[1/1.42] rounded-[28px] p-6 sm:p-7 flex flex-col justify-between overflow-hidden shadow-2xl border ${theme.bg}`}
      >
        {/* Luxury Gold Inner Inset Hairline Padding */}
        <div className="absolute inset-[8px] sm:inset-[9px] rounded-[20px] border border-amber-400/25 pointer-events-none z-20 shadow-[inset_0_0_12px_rgba(251,191,36,0.06)]" />

        {/* Atmospheric Radial Top Highlight */}
        <div
          className={
            'absolute -top-16 -left-16 w-56 h-56 rounded-full bg-radial ' +
            theme.glow +
            ' to-transparent blur-2xl pointer-events-none opacity-60'
          }
        />

        {/* Top Header: Logo / Emblem */}
        <div className="relative z-10 flex items-center justify-between pb-2 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] text-white/80 font-medium">
              note
            </span>
          </div>
          <span className="font-mono text-[11px] sm:text-xs text-white/50 tracking-wider">jp.dev</span>
        </div>

        {/* Center: Author, Subtitle & Testimonial Message */}
        <div className="relative z-10 my-auto py-2 flex flex-col items-center text-center w-full max-w-full min-w-0 flex-1 justify-center">
          {Boolean(note.name && note.name.trim() !== '') && (
            <h3 className="font-sans text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight drop-shadow-sm break-words  max-w-full">
              {note.name}
            </h3>
          )}

          {Boolean(note.role && note.role.trim() !== '') && (
            <span
              className={`font-mono text-[10px] sm:text-[11px] tracking-wider uppercase mt-1 break-words  max-w-full ${theme.textMuted}`}
            >
              {note.role}
            </span>
          )}

          {/* Decorative Divider - only if name or role is present */}
          {Boolean(
            (note.name && note.name.trim() !== '') ||
            (note.role && note.role.trim() !== '')
          ) && (
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent my-2.5 shrink-0" />
          )}

          {/* Note Quote */}
          <blockquote className="font-sans text-xs sm:text-[13px] text-white/90 leading-relaxed font-normal italic px-1 max-w-full w-full break-words ">
            "{note.message}"
          </blockquote>
        </div>

        {/* Bottom Details: Date & Spot # */}
        <div className="relative z-10 flex items-end justify-between pt-2.5 border-t border-white/10 shrink-0 mt-auto">
          <div className="flex flex-col text-left">
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/50">Posted</span>
            <span className="font-mono text-xs sm:text-sm font-medium text-white/90">{formatDate(note.createdAt)}</span>
          </div>

          <div className="flex flex-col text-right">
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/50">Spot</span>
            <span className="font-mono text-xs sm:text-sm font-bold text-amber-300/90">#{note.spotNumber}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
