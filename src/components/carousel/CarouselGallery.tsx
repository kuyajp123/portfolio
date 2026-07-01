import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/styles.css';

import empireImg from '@/assets/empire.png';
import laptopImg from '@/assets/laptop.jpg';
import meImg from '@/assets/me.jpg';
import symposiumImg from '@/assets/symposium.png';

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}

const images: GalleryImage[] = [
  {
    src: symposiumImg,
    alt: '2026 Student Research Symposium',
    caption: '2026 Student Research Symposium',
  },
  {
    src: empireImg,
    alt: 'EMPIRE 2026 Conference',
    caption: 'EMPIRE 2026 Conference',
  },
  {
    src: laptopImg,
    alt: 'Coding at a café',
    caption: 'Late-night coding session',
  },
  {
    src: meImg,
    alt: 'John Paul Naag',
    caption: 'Golden hour at Startuplab',
  },
];

// Show this many images per row before Embla kicks in for scrolling
const VISIBLE_COUNT = 4;

export const CarouselGallery = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    dragFree: true,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // Each slide takes an equal share of the row; Embla enables scrolling when there are more
  const slideWidth = `calc(${String(100 / VISIBLE_COUNT)}% - 12px)`;

  return (
    <div className="relative group">
      {/* Viewport */}
      <div ref={emblaRef} className="overflow-hidden rounded-xl -my-4 py-4 -mx-2 px-2">
        <div className="flex gap-0">
          {images.map((img, i) => {
            const rotation = i % 2 === 0 ? '-rotate-2' : 'rotate-2';
            const translateY = i % 2 === 0 ? 'translate-y-1' : '-translate-y-1';

            return (
              <div
                key={i}
                className={`relative shrink-0 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 ${rotation} ${translateY} hover:!rotate-0 hover:z-10`}
                style={{ flex: `0 0 ${slideWidth}` }}
                onClick={() => {
                  setLightboxIndex(i);
                }}
              >
                {/* Fixed height thumbnail */}
                <div className="relative h-28 bg-gray-200 dark:bg-gray-800 overflow-hidden group/img hover:!rotate-0 hover:z-10">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-500 "
                    loading="lazy"
                  />
                  {/* Caption on hover */}
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 p-2">
                    <p className="text-white text-[10px] font-medium leading-tight line-clamp-2">{img.caption}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Prev / Next — only visible when there are more images than fit */}
      {canScrollPrev && (
        <button
          id="carousel-prev"
          onClick={scrollPrev}
          aria-label="Previous images"
          className="absolute left-1 top-1/2 -translate-y-1/2 z-10
            w-7 h-7 flex items-center justify-center rounded-full
            bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm
            border border-gray-200 dark:border-white/10
            text-gray-700 dark:text-gray-200 shadow-md
            hover:bg-white dark:hover:bg-gray-800
            transition-all duration-200 cursor-pointer"
        >
          <HiChevronLeft className="text-sm" />
        </button>
      )}

      {canScrollNext && (
        <button
          id="carousel-next"
          onClick={scrollNext}
          aria-label="Next images"
          className="absolute right-1 top-1/2 -translate-y-1/2 z-10
            w-7 h-7 flex items-center justify-center rounded-full
            bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm
            border border-gray-200 dark:border-white/10
            text-gray-700 dark:text-gray-200 shadow-md
            hover:bg-white dark:hover:bg-gray-800
            transition-all duration-200 cursor-pointer"
        >
          <HiChevronRight className="text-sm" />
        </button>
      )}

      {/* ── Lightbox ── */}
      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => {
          setLightboxIndex(-1);
        }}
        slides={images.map(img => ({ src: img.src, alt: img.alt, title: img.caption }))}
        plugins={[Captions]}
        captions={{ showToggle: false, descriptionTextAlign: 'center' }}
      />
    </div>
  );
};
