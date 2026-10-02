import { activities } from '@/constant/activities';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { FiAward, FiMapPin, FiCalendar, FiArrowUpRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export const ActivitiesSection = () => {
  return (
    <section id="activities" className="py-10 border-t border-black/8 dark:border-white/10 scroll-mt-24">
      <SectionHeader
        number="02"
        title="Activities & Hackathons"
        subtitle="Competitive engineering hackathons, industry workshops, and hands-on developer sprints."
        viewAllLink={{
          label: 'All Activities',
          href: '/activities',
        }}
      />

      <div className="flex flex-col divide-y divide-black/8 dark:divide-white/8">
        {activities.map(activity => (
          <article
            key={activity.id}
            className="py-6 first:pt-2 last:pb-2 group transition-colors"
          >
            <div className="flex flex-col gap-2.5">
              {/* Header: Title, Award Badge, Metadata */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Link
                    to={`/activities#${activity.id}`}
                    className="font-sans text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors"
                  >
                    {activity.title}
                  </Link>

                  {activity.roleOrAward && (
                    activity.awardLink ? (
                      activity.awardLink.startsWith('http') ? (
                        <a
                          href={activity.awardLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:opacity-85 transition-opacity"
                          title="View official award / news coverage"
                        >
                          <Badge variant="award">
                            <FiAward size={12} className="shrink-0" />
                            <span>{activity.roleOrAward}</span>
                            <FiArrowUpRight size={11} className="shrink-0 opacity-75" />
                          </Badge>
                        </a>
                      ) : (
                        <Link to={activity.awardLink} className="hover:opacity-85 transition-opacity">
                          <Badge variant="award">
                            <FiAward size={12} className="shrink-0" />
                            <span>{activity.roleOrAward}</span>
                          </Badge>
                        </Link>
                      )
                    ) : (
                      <Badge variant="award">
                        <FiAward size={12} className="shrink-0" />
                        <span>{activity.roleOrAward}</span>
                      </Badge>
                    )
                  )}

                  <Badge variant="accent">
                    <span>{activity.type}</span>
                  </Badge>
                </div>

                <div className="flex items-center gap-3 font-mono text-xs text-gray-600 dark:text-gray-500 font-medium shrink-0">
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

              {/* Brief One-Line Summary */}
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                {activity.summary}
              </p>

              {/* Featured Award Visual Card */}
              {activity.images.length > 0 && activity.roleOrAward && (
                <Link
                  to={`/activities#${activity.id}`}
                  className="group/award-card relative my-2 overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 block aspect-[16/9] sm:aspect-[21/9] shadow-sm hover:shadow-lg transition-all duration-300 hover:border-black/20 dark:hover:border-white/20"
                >
                  <img
                    src={activity.images[0].src}
                    alt={activity.images[0].title}
                    className="w-full h-full object-cover grayscale group-hover/award-card:grayscale-0 group-hover/award-card:scale-102 transition-all duration-500 ease-out"
                    loading="lazy"
                  />
                  {/* Frosted Atmospheric Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 p-3.5 sm:p-5 flex flex-col justify-between">
                    {/* Top Row: Award Badge */}
                    <div className="flex items-center justify-between">
                    </div>

                    {/* Bottom Row: Title, Caption & Action Hint */}
                    <div className="flex items-end justify-between gap-3 text-white">
                      <div className="flex flex-col min-w-0">
                        <span className="font-sans text-sm sm:text-base font-semibold text-white drop-shadow-sm truncate">
                          {activity.images[0].title}
                        </span>
                        <span className="font-mono text-xs text-gray-300 line-clamp-1 mt-0.5">
                          {activity.images[0].caption}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Tech Tags & Link */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex flex-wrap gap-1.5">
                  {activity.tags.map(tag => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>

                <Link
                  to={`/activities#${activity.id}`}
                  className="inline-flex items-center gap-1 text-xs font-mono text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <span>View Details</span>
                  <FiArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};