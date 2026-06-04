import Link from 'next/link'
import { getPastEvents } from '@/lib/events'
import { formatEventDate } from '@/lib/dateUtils'

const communityLabel: Record<string, string> = {
  'presales-india': 'Presales India',
  'gtm-india':      'GTM India',
  'self':           'SELF',
}

export function PastEventsSection() {
  const past = getPastEvents().slice(0, 3)
  if (past.length === 0) return null

  return (
    <section className="past-events">
      <div className="container">

        <h2 className="past-events__title">
          Past <em>events</em>
        </h2>

        <div className="past-events__grid">
          {past.map((event) => {
            const isVirtual = event.format === 'virtual'
            const location = isVirtual ? 'Virtual' : (event.city || 'India')
            const photos = event.photos ?? []
            const community = communityLabel[event.community] ?? event.community

            return (
              <Link
                key={event.slug ?? event.id}
                href={`/events/${event.slug}`}
                className="past-card"
              >
                {/* Thumbnail */}
                <div className="past-card__thumb">
                  <div className="past-card__thumb-inner">
                    <span className="past-card__thumb-community">{community}</span>
                    <span className="past-card__thumb-location">
                      {location}
                      {event.date
                        ? ` · ${new Date(event.date).toLocaleString('en-IN', {
                            month: 'short',
                            year: 'numeric',
                          })}`
                        : ''}
                    </span>
                  </div>
                  {photos.length > 0 && (
                    <span className="past-card__photo-count" aria-label={`${photos.length} photos`}>
                      {photos.length} photos
                    </span>
                  )}
                </div>

                {/* Body */}
                <div className="past-card__body">
                  <div className="event-meta">
                    <span className="event-meta__chip event-meta__chip--accent">
                      {community}
                    </span>
                    <span className="event-meta__chip">
                      {isVirtual ? 'Virtual' : 'In-person'}
                    </span>
                    {!isVirtual && event.city && (
                      <span className="event-meta__chip">{event.city}</span>
                    )}
                  </div>

                  <h3 className="past-card__title">{event.title}</h3>

                  {event.description && (
                    <p className="past-card__desc">{event.description}</p>
                  )}

                  <div className="past-card__footer">
                    <span className="past-card__date">
                      {event.date ? formatEventDate(event.date) : ''}
                    </span>
                    <span className="past-card__link">View recap</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="past-events__footer">
          <Link href="/events#past" className="btn btn--ghost btn--lg">
            See all past events
          </Link>
        </div>

      </div>
    </section>
  )
}