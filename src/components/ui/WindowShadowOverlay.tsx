import type { FC } from 'react';

interface WindowShadowOverlayProps {
  className?: string;
}

/**
 * WindowShadowOverlay
 *
 * Renders an architectural sunlight and window pane shadow overlay across the background canvas.
 * - Light mode: Soft natural window mullion shadow (black with gentle alpha falloff).
 * - Dark mode: Subtle ambient moonlight beam (white with soft luminosity).
 * - Fully accessible, zero layout shift, non-intrusive (pointer-events-none), smooth 700ms theme crossfade.
 */
export const WindowShadowOverlay: FC<WindowShadowOverlayProps> = ({ className = '' }) => {
  return (
    <div
      aria-hidden="true"
      role="presentation"
      className={`fixed inset-0 pointer-events-none select-none z-0 overflow-hidden ${className}`}
    >
      {/* Light Mode: Natural Soft Window Mullion Shadow Overlay */}
      <img
        src="/window-shadow.png"
        alt=""
        draggable={false}
        loading="eager"
        decoding="async"
        className="absolute -inset-3 w-[calc(100%+1.5rem)] h-[calc(100%+1.5rem)] object-cover object-center opacity-24 dark:opacity-0 blur-[6px] transition-opacity duration-700 ease-in-out transform-gpu"
      />

      {/* Dark Mode: Ambient Moonlight / Soft Window Beam Overlay */}
      <img
        src="/window-light.png"
        alt=""
        draggable={false}
        loading="eager"
        decoding="async"
        className="absolute -inset-3 w-[calc(100%+1.5rem)] h-[calc(100%+1.5rem)] object-cover object-center opacity-0 dark:opacity-12 blur-[6px] transition-opacity duration-700 ease-in-out transform-gpu"
      />
    </div>
  );
};

export default WindowShadowOverlay;
