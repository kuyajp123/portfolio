import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { useEffect, useRef, useState, type FC } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Draggable);
}

export const LanyardBadge: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const shadowPathRef = useRef<SVGPathElement>(null);
  const stitchPathRef = useRef<SVGPathElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Update dynamic SVG strap connecting top anchor to the badge clasp
  const updateStrap = () => {
    if (!cardRef.current || !pathRef.current || !containerRef.current) return;

    const card = cardRef.current;
    const x = gsap.getProperty(card, 'x') as number;
    const y = gsap.getProperty(card, 'y') as number;
    const rot = (gsap.getProperty(card, 'rotation') as number) || 0;

    // Anchor coordinates (top center of 224px container: 112px)
    const anchorX = 112;
    const anchorY = 0;

    // Clasp coordinates (center-top of card + current card translation & rotation)
    const cardTopCenterX = 112 + x;
    const cardTopCenterY = 58 + y;

    // Sway the clip attachment point slightly with card rotation
    const rad = (rot * Math.PI) / 180;
    const clipX = cardTopCenterX - Math.sin(rad) * 6;
    const clipY = cardTopCenterY + Math.cos(rad) * 2;

    // Natural catenary sag control point
    const midX = (anchorX + clipX) / 2 + x * 0.15;
    const midY = (anchorY + clipY) / 2 + Math.max(8, 14 - Math.abs(x) * 0.08);

    const sx = clipX.toFixed(1);
    const sy = clipY.toFixed(1);
    const mx = midX.toFixed(1);
    const my = midY.toFixed(1);

    const pathData = `M 112 0 Q ${mx} ${my} ${sx} ${sy}`;

    // Update main ribbon path, shadow, and stitch accent
    pathRef.current.setAttribute('d', pathData);
    if (shadowPathRef.current) shadowPathRef.current.setAttribute('d', pathData);
    if (stitchPathRef.current) stitchPathRef.current.setAttribute('d', pathData);
  };

  useEffect(() => {
    const card = cardRef.current;
    const container = containerRef.current;
    if (!card || !container) return;

    // Render initial strap in its resting position (no default swinging motion)
    updateStrap();

    // Re-align strap if viewport resizes to desktop breakpoint
    const mediaQuery = window.matchMedia('(min-width: 1280px)');
    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        updateStrap();
      }
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    // Make the badge draggable with GSAP Draggable
    const draggableInstance = Draggable.create(card, {
      type: 'x,y',
      bounds: {
        minX: -75,
        maxX: 75,
        minY: -35,
        maxY: 95,
      },
      edgeResistance: 0.75,
      cursor: 'grab',
      activeCursor: 'grabbing',
      onPress() {
        setIsDragging(true);
      },
      onDrag() {
        // Natural tilt corresponding to drag velocity
        const dragContext = this as unknown as { deltaX?: number };
        const deltaX = dragContext.deltaX ?? 0;
        gsap.to(card, {
          rotation: Math.max(-15, Math.min(15, deltaX * 1.8)),
          duration: 0.12,
          overwrite: 'auto',
        });
        updateStrap();
      },
      onRelease() {
        setIsDragging(false);
        // Damped glide back to center resting position without swinging
        gsap.to(card, {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.85,
          ease: 'power3.out',
          onUpdate: updateStrap,
        });
      },
    })[0];

    // 3D Tilt on Hover (subtle perspective tracking when pointer moves across the badge)
    const handleMouseMove = (e: MouseEvent) => {
      if (draggableInstance.isDragging) return;

      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);

      gsap.to(card, {
        rotateY: Math.max(-12, Math.min(12, deltaX * 12)),
        rotateX: Math.max(-10, Math.min(10, -deltaY * 10)),
        rotation: Math.max(-4, Math.min(4, deltaX * 3)),
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
        onUpdate: updateStrap,
      });
    };

    const handleMouseLeave = () => {
      if (draggableInstance.isDragging) return;

      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        rotation: 0,
        duration: 0.7,
        ease: 'power3.out',
        overwrite: 'auto',
        onUpdate: updateStrap,
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      draggableInstance.kill();
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-56 select-none pointer-events-auto flex flex-col items-center pt-2"
      style={{ perspective: 1000 }}
      aria-label="Interactive Employee ID Lanyard Badge"
    >
      {/* Top Anchor: Brushed Metal Rivet / Grommet Pin */}
      <div className="relative z-20 flex flex-col items-center">
        <div className="w-5.5 h-5.5 rounded-full bg-gradient-to-b from-gray-300 via-gray-400 to-gray-600 dark:from-zinc-500 dark:via-zinc-600 dark:to-zinc-800 p-0.5 shadow-md flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-gray-700 to-gray-500 dark:from-zinc-900 dark:to-zinc-700 shadow-inner" />
        </div>
      </div>

      {/* SVG Dynamic Lanyard Ribbon Strap */}
      <svg className="absolute top-2.5 left-0 w-56 h-16 pointer-events-none z-10 overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id="lanyardStrapGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#082352" />
            <stop offset="35%" stopColor="#0B3A82" />
            <stop offset="65%" stopColor="#0B3A82" />
            <stop offset="100%" stopColor="#082352" />
          </linearGradient>
          <filter id="lanyardShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.25" />
          </filter>
        </defs>
        {/* Shadow path */}
        <path
          ref={shadowPathRef}
          d="M 112 0 Q 112 28 112 56"
          fill="none"
          stroke="rgba(0,0,0,0.25)"
          strokeWidth="13"
          strokeLinecap="round"
          transform="translate(0, 2)"
        />
        {/* Main textured lanyard ribbon */}
        <path
          ref={pathRef}
          d="M 112 0 Q 112 28 112 56"
          fill="none"
          stroke="url(#lanyardStrapGrad)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Subtle center stitch accent with Easybus Yellow */}
        <path
          ref={stitchPathRef}
          d="M 112 0 Q 112 28 112 56"
          fill="none"
          stroke="#FFD200"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          strokeOpacity="0.85"
        />
      </svg>

      {/* Hanging Clasp + ID Badge Card Container */}
      <div
        ref={cardRef}
        className={`relative z-20 pt-10 flex flex-col items-center cursor-grab active:cursor-grabbing transform-gpu will-change-transform ${
          isDragging ? 'scale-[1.02]' : ''
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Metallic Clasp / Lobster Hook Hardware */}
        <div className="relative -mb-1.5 z-30 flex flex-col items-center">
          {/* Swivel Ring */}
          <div className="w-6 h-4 rounded-full border-2 border-gray-400 dark:border-zinc-500 bg-gradient-to-b from-gray-200 to-gray-400 dark:from-zinc-600 dark:to-zinc-800 shadow-sm" />
          {/* Lobster Clip Tongue */}
          <div className="w-3.5 h-6 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 dark:from-zinc-500 dark:via-zinc-400 dark:to-zinc-700 rounded-b-sm shadow-md -mt-1 flex items-center justify-center">
            <div className="w-1 h-4 bg-black/30 dark:bg-black/50 rounded-full" />
          </div>
        </div>

        {/* Outer Molded Easybus Blue Badge Holder (Image 2 Style) */}
        <div className="relative w-[218px] flex flex-col items-center">
          {/* Top Tab with Carabiner Slot */}
          <div className="relative -mb-1 z-20 w-16 h-5 rounded-t-lg bg-[#0B3A82] dark:bg-[#092B66] border-t border-x border-[#072452] dark:border-[#1A4AA0] shadow-sm flex items-center justify-center">
            {/* Slot Punch Hole */}
            <div className="w-8 h-2 rounded-full bg-black/40 dark:bg-black/70 shadow-inner" />
          </div>

          {/* Main Card Holder Frame */}
          <div className="relative w-full rounded-2xl p-1 bg-[#0B3A82] dark:bg-[#092B66] border border-[#072452] dark:border-[#1A4AA0] shadow-[0_16px_36px_-6px_rgba(11,58,130,0.35)] dark:shadow-[0_20px_45px_-8px_rgba(0,0,0,0.85)]">
            {/* Left & Right Grip Notches (Signature industrial holder aesthetic from Image 2) */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-[#08285C] dark:bg-[#071F47] rounded-r-sm z-30 pointer-events-none" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-[#08285C] dark:bg-[#071F47] rounded-l-sm z-30 pointer-events-none" />

            {/* Inner Printed Employee ID Card (Matte in dark mode, zero specular glares) */}
            <div className="relative overflow-hidden rounded-[14px] bg-[#FFFFFF] dark:bg-[#0B1019] border border-black/5 dark:border-white/8 px-4 py-4.5 flex flex-col justify-between min-h-[295px]">
              {/* Central Soft 4-Point Starburst Cross Gradient from Image 2 */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none select-none"
                viewBox="0 0 200 280"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <filter id="centerBlur" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="9" />
                  </filter>
                </defs>
                {/* Soft Radial Ambient Glow */}
                <ellipse
                  cx="100"
                  cy="140"
                  rx="50"
                  ry="50"
                  fill="#0B3A82"
                  className="fill-[#0B3A82] dark:fill-[#3B82F6] opacity-15 dark:opacity-20"
                  filter="url(#centerBlur)"
                />
                {/* 4-point Diamond Starburst Cross from Image 2 */}
                <path
                  d="M 100 55 Q 100 132 30 140 Q 100 148 100 225 Q 100 148 170 140 Q 100 132 100 55 Z"
                  fill="#0B3A82"
                  className="fill-[#0B3A82] dark:fill-[#3B82F6] opacity-30 dark:opacity-25"
                  filter="url(#centerBlur)"
                />
              </svg>

              {/* Top Row: Year & Easybus PH Branding (Left) | Name (Right) */}
              <div className="relative z-10 flex items-start justify-between">
                {/* Top Left: 2026 & Easybus PH */}
                <div className="flex flex-col">
                  <span className="font-mono text-[9px] font-semibold text-gray-500 dark:text-gray-400 tracking-wider">
                    2026
                  </span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="font-sans text-[10.5px] font-black uppercase tracking-wider text-gray-900 dark:text-gray-100 leading-none">
                      Easybus PH
                    </span>
                  </div>
                </div>

                {/* Top Right: Name in Image 2 Hierarchy (MOEL BRIAN style) */}
                <div className="flex flex-col items-end">
                  <span className="font-mono text-[9px] font-semibold tracking-widest text-gray-500 dark:text-gray-400 uppercase">
                    JOHN PAUL
                  </span>
                  <span className="font-sans text-[22px] font-black tracking-tight text-[#0B3A82] dark:text-[#4A8DFF] leading-none mt-0.5">
                    NAAG
                  </span>
                </div>
              </div>

              {/* Middle Row: ALL ACCESS Indicator */}
              <div className="relative z-10 flex items-center justify-between px-0.5 my-auto py-6">
                <span className="font-mono text-[9px] font-bold tracking-[0.28em] text-gray-400 dark:text-gray-500 uppercase">
                  ALL
                </span>
                <span className="font-mono text-[9px] font-bold tracking-[0.28em] text-gray-400 dark:text-gray-500 uppercase">
                  ACCESS
                </span>
              </div>

              {/* Bottom Row: Role in Image 2 Hierarchy (PRODUCTION STAFF style) */}
              <div className="relative z-10 flex items-baseline justify-between pt-3 border-t border-black/6 dark:border-white/8">
                <span className="font-mono text-[9px] font-semibold tracking-wider text-gray-600 dark:text-gray-400 uppercase">
                  ANDROID DEVELOPER
                </span>
                <span className="font-sans text-[15px] font-black uppercase tracking-tight text-[#0B3A82] dark:text-[#4A8DFF]">
                  ASSOCIATE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanyardBadge;
