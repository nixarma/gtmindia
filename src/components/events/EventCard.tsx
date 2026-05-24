import type { Event } from '@/types/event'

const communityLabel: Record<Event['community'], string> = {
  'presales-india': 'Presales India',
  'gtm-india':      'GTM India',
  'self':           'SELF',
}

const cityLabel: Record<string, string> = {
  Virtual:   'Virtual',
  Bangalore: 'Bangalore',
  Hyderabad: 'Hyderabad',
  Mumbai:    'Mumbai',
  Delhi:     'Delhi',
}

interface EventCardProps {
  event: Event
  isPast?: boolean
}

export function EventCard({ event, isPast = false }: EventCardProps) {
  return (
    <article className={`event-card${isPast ? ' event-card--past' : ''}`}>
      <div className="event-card__meta">
        <span className="event-meta__chip event-meta__chip--community">
          {communityLabel[event.community]}
        </span>
        <span className="event-meta__chip">
          {event.format === 'virtual' ? 'Virtual' : 'In-person'}
        </span>
        <span className="event-meta__chip">
          {cityLabel[event.city] ?? event.city}
        </span>
        {isPast && (
          <span className="event-meta__chip event-meta__chip--past">
            Past
          </span>
        )}
      </div>

      <div className="event-card__body">
        <p className="event-card__date">{event.displayDate}</p>
        <h3 className="event-card__title">{event.title}</h3>
        <p className="event-card__desc">{event.description}</p>
      </div>

      <div className="event-card__footer">
        <a
          href={event.lumaUrl}
          target="_blank"
          rel="noopener"
          className={`btn ${isPast ? 'btn--ghost' : 'btn--primary'} btn--sm`}
          aria-label={`${isPast ? 'View recap for' : 'Register for'} ${event.title}`}
        >
          {isPast ? 'View recap' : 'Register on Luma'}
          <span className="arrow">&rarr;</span>
        </a>
      </div>
    </article>
  )
}