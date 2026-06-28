import React, { useLayoutEffect, useRef, useState } from 'react';

interface FlipCardProps {
  isFlipped: boolean;
  front: React.ReactNode;
  back: React.ReactNode;
}

export const FlipCard = ({ isFlipped, front, back }: FlipCardProps) => {
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const [activeHeight, setActiveHeight] = useState<number>();

  useLayoutEffect(() => {
    const activeFace = isFlipped ? backRef.current : frontRef.current;

    if (!activeFace) {
      return;
    }

    const updateActiveHeight = () => {
      setActiveHeight(activeFace.offsetHeight);
    };

    updateActiveHeight();

    const resizeObserver = new ResizeObserver(updateActiveHeight);
    resizeObserver.observe(activeFace);
    window.addEventListener('resize', updateActiveHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateActiveHeight);
    };
  }, [back, front, isFlipped]);

  return (
    <div
      className={`flip-card ${isFlipped ? 'flip-card--flipped' : ''}`}
      style={activeHeight === undefined ? undefined : { height: activeHeight }}
    >
      <div className={`flip-card__inner ${isFlipped ? 'flip-card__inner--flipped' : ''}`}>
        <div className="flip-card__face" ref={frontRef}>
          {front}
        </div>
        <div className="flip-card__face flip-card__face--back" ref={backRef}>
          {back}
        </div>
      </div>
    </div>
  );
};
