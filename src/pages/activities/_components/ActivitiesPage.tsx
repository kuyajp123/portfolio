import { useState, useEffect } from 'react';
import { activities, type ActivityItem } from '@/constant/activities';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { EditorialImageViewer, type ViewerItem } from '@/components/ui/EditorialImageViewer';
import { Footer } from '@/components/footer/Footer';
import { SubpageHeader } from '@/components/layout/SubpageHeader';
import { FiAward, FiMapPin, FiCalendar, FiMaximize2 } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';

export const ActivitiesPage = () => {
  const { hash } = useLocation();
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Auto-scroll to target activity when hash is present
  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
        return () => {
          clearTimeout(timer);
        };
      }
    }
  }, [hash]);

  const viewerItems: ViewerItem[] = selectedActivity
    ? selectedActivity.images.map(img => ({
        src: img.src,
        title: img.title,
        caption: img.caption,
        category: selectedActivity.title,
        date: selectedActivity.date,
      }))
    : [];

  return (
    <div className="min-h-[100dvh] bg-grid-pattern flex flex-col items-center overflow-x-clip">
      {/* Top Sticky Liquid Glass Header */}
      <SubpageHeader />

      {/* Main Content */}
      <main className="w-full max-w-3xl px-4 sm:px-6 py-4 flex-1 flex flex-col gap-10">
        <SectionHeader
          number="02"
          title="Activities & Hackathons"
          subtitle="Comprehensive archive of competitive hackathons, industry workshops, and hands-on developer sprints with technical breakdowns and photo documentation."
        />

        <div className="flex flex-col divide-y divide-black/8 dark:divide-white/8">
          {activities.map(activity => (
            <article
              key={activity.id}
              id={activity.id}
              className="py-8 first:pt-0 last:pb-0 group transition-colors scroll-mt-24"
            >
                <div className="flex flex-col gap-4">
                  {/* Header: Title, Award Badge, Metadata */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h2 className="font-sans text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {activity.title}
                      </h2>

                      {activity.roleOrAward && (
                        <Badge variant="award">
                          <FiAward size={12} className="shrink-0" />
                          <span>{activity.roleOrAward}</span>
                        </Badge>
                      )}

                      <Badge variant="accent">
                        <span>{activity.type}</span>
                      </Badge>
                    </div>

                    <div className="flex items-center gap-3 font-mono text-xs text-gray-400 dark:text-gray-500 shrink-0">
                      <span className="inline-flex items-center gap-1">
                        <FiMapPin size={11} />
                        {activity.location}
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1">
                        <FiCalendar size={11} />
                        {activity.date}
                      </span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-normal">
                    {activity.summary}
                  </p>

                  {/* Full Highlights List */}
                  <div className="flex flex-col gap-2 pt-1">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                      Key Highlights & Contributions
                    </span>
                    <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                      {activity.highlights.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="font-mono text-sky-500 text-xs mt-0.5 select-none shrink-0">
                            ›
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {activity.tags.map(tag => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>

                  {/* Multi-Image Gallery Row */}
                  {activity.images.length > 0 && (
                    <div className="flex flex-col gap-2 pt-3">
                      <span className="font-mono text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                        Photo Documentation (Click to Inspect)
                      </span>
                      <div
                        className={`grid gap-3 ${
                          activity.images.length === 1
                            ? 'grid-cols-1 sm:grid-cols-2'
                            : activity.images.length === 2
                              ? 'grid-cols-1 sm:grid-cols-2'
                              : 'grid-cols-1 sm:grid-cols-3'
                        }`}
                      >
                        {activity.images.map((img, imgIdx) => (
                          <div
                            key={img.title}
                            onClick={() => {
                              setSelectedActivity(activity);
                              setActiveImageIndex(imgIdx);
                            }}
                            className="group/img relative overflow-hidden rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 cursor-pointer aspect-[16/10]"
                          >
                            <img
                              src={img.src}
                              alt={img.title}
                              className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 group-hover/img:scale-103 transition-all duration-500 ease-out"
                              loading="lazy"
                            />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-end">
                              <div className="flex items-center justify-between text-white">
                                <span className="font-sans text-xs font-semibold line-clamp-1">
                                  {img.title}
                                </span>
                                <FiMaximize2 size={13} className="shrink-0 ml-1 opacity-80" />
                              </div>
                              <span className="font-mono text-[10px] text-gray-300 line-clamp-1 mt-0.5">
                                Inspect ↗
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            ))}
        </div>
      </main>

      <Footer />

      {/* Bespoke Editorial Image Viewer for Activity Photos */}
      <EditorialImageViewer
        isOpen={selectedActivity !== null}
        currentIndex={activeImageIndex}
        onIndexChange={idx => {
          setActiveImageIndex(idx);
        }}
        onClose={() => {
          setSelectedActivity(null);
        }}
        items={viewerItems}
      />
    </div>
  );
};