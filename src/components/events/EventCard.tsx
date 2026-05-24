import Link from 'next/link'
import type { Event } from '@/types/event'
import { formatEventDate } from '@/lib/dateUtils'

const communityLabel: Record<Event['community'], string> = {
  'presales-india': 'Presales India',
  'gtm-india':      'GTM India',
  'self':           'SELF',
}

interface EventCardProps {
  event: Event
  isPast?: boolean
}

export function EventCard({ event, isPast = false }: EventCardProps) {
  const slug = event.slug ?? event.id
  const eventUrl = slug ? `/events/${slug}` : null
  const isVirtual = event.format === 'virtual'

  return (
    <article className={`event-card${isPast ? ' event-card--past' : ''}`}>
      <div className="event-card__meta">
        <span className="event-meta__chip event-meta__chip--community">
          {communityLabel[event.community]}
        </span>
        <span className="event-meta__chip">
          {isVirtual ? 'Virtual' : 'In-person'}
        </span>
        {/* Suppress city chip for virtual events — it's redundant */}
        {!isVirtual && (
          <span className="event-meta__chip">
            {event.city}
          </span>
        )}
        {isPast && (
          <span className="event-meta__chip event-meta__chip--past">
            Past
          </span>
        )}
      </div>

      <div className="event-card__body">
        <p className="event-card__date">{formatEventDate(event.date)}</p>
        {eventUrl ? (
          <Link href={eventUrl}>
            <h3 className="event-card__title">{event.title}</h3>
          </Link>
        ) : (
          <h3 className="event-card__title">{event.title}</h3>
        )}
        <p className="event-card__desc">{event.description}</p>
      </div>

      <div className="event-card__footer">
        {!isPast && event.lumaUrl && (
          <a
            href={event.lumaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary btn--sm"
            aria-label={`Register for ${event.title}`}
          >
            Register on Luma <span className="arrow">&rarr;</span>
          </a>
        )}
        {eventUrl && (
          <Link
            href={eventUrl}
            className="btn btn--ghost btn--sm"
            aria-label={`${isPast ? 'View recap for' : 'More details on'} ${event.title}`}
          >
            {isPast ? 'View recap' : 'Details'}
            <span className="arrow">&rarr;</span>
          </Link>
        )}
      </div>
    </article>
  )
}