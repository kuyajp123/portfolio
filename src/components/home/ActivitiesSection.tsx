import { activities } from '@/constant/activities';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { FiAward, FiMapPin, FiCalendar, FiArrowUpRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export const ActivitiesSection = () => {
  return (
    <section id="activities" className="py-10 border-t border-black/8 dark:border-white/10">
      <SectionHeader
        number="02"
        title="Activities & Hackathons"
        subtitle="Competitive engineering hackathons, industry workshops, and hands-on developer sprints."
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

              {/* Brief One-Line Summary */}
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                {activity.summary}
              </p>

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