import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getEventBySlug, getAllEvents } from '@/data/events'
import { formatEventDate } from '@/lib/dateUtils'
import PhotoCarousel from '@/components/ui/PhotoCarousel'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const events = getAllEvents()
  return events.map((e) => ({ slug: e.slug ?? e.id ?? '' }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const event = getEventBySlug(slug)
  if (!event) return {}
  return {
    title: event.title,
    description: event.description,
  }
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params
  const event = getEventBySlug(slug)
  if (!event) notFound()

  const isPast = event.status === 'past'

  const communityLabel: Record<string, string> = {
    'presales-india': 'Presales India',
    'gtm-india':      'GTM India',
    'self':           'SELF',
  }

  return (
    <div className="event-page">
      <div className="container">

        <Link href="/events" className="event-page__back">
          &larr; All events
        </Link>

        <header className="event-page__header">
          <div className="event-page__chips">
            <span className="event-meta__chip event-meta__chip--community">
              {communityLabel[event.community] ?? event.community}
            </span>
            <span className="event-meta__chip">
              {event.format === 'virtual' ? 'Virtual' : 'In-person'}
            </span>
            <span className="event-meta__chip">
              {event.city}
            </span>
            {isPast && (
              <span className="event-meta__chip event-meta__chip--past">
                Past
              </span>
            )}
          </div>

          <h1 className="event-page__title">{event.title}</h1>

          <div className="event-page__meta-row">
            <span className="event-page__date">{formatEventDate(event.date)}</span>
            {event.venue && (
              <span className="event-page__venue">{event.venue}</span>
            )}
          </div>
        </header>

        <div className="event-page__body">

          <div className="event-page__main">

            {isPast && event.photos && event.photos.length > 0 && (
              <PhotoCarousel
                images={event.photos}
                alt={event.title}
                className="event-page__carousel"
              />
            )}

            {!isPast && event.lumaEmbedUrl && (
              <div className="event-page__luma">
                <iframe
                  src={event.lumaEmbedUrl}
                  width="100%"
                  height="450"
                  frameBorder={0}
                  style={{ border: 'none', borderRadius: 'var(--radius-lg)' }}
                  allow="fullscreen; payment"
                  aria-label={`Register for ${event.title} on Luma`}
                  tabIndex={0}
                />
              </div>
            )}

            <p className="event-page__description">{event.description}</p>

          </div>

          <aside className="event-page__sidebar">

            {!isPast && event.lumaUrl && (
              <div className="event-page__cta-card">
                <a
                  href={event.lumaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="event-page__luma-fallback"
                >
                  Open on Luma &rarr;
                </a>
              </div>
            )}

            <div className="event-page__detail-card">
              <h3 className="event-page__detail-heading">Details</h3>
              <dl className="event-page__detail-list">
                <dt>Date</dt>
                <dd>{formatEventDate(event.date)}</dd>
                {event.venue && (
                  <>
                    <dt>Venue</dt>
                    <dd>{event.venue}</dd>
                  </>
                )}
                <dt>City</dt>
                <dd>{event.city}</dd>
                <dt>Format</dt>
                <dd>{event.format === 'virtual' ? 'Virtual' : 'In-person'}</dd>
                {event.capacity && (
                  <>
                    <dt>Capacity</dt>
                    <dd>{event.capacity} attendees</dd>
                  </>
                )}
              </dl>
            </div>

            {event.speakers && event.speakers.length > 0 && event.speakers[0].name !== 'TBC' && (
              <div className="event-page__detail-card">
                <h3 className="event-page__detail-heading">Speakers</h3>
                <ul className="event-page__speaker-list">
                  {event.speakers.map((speaker, i) => (
                    <li key={i} className="event-page__speaker">
                      <div className="event-page__speaker-info">
                        <span className="event-page__speaker-name">{speaker.name}</span>
                        {(speaker.role || speaker.company) && (
                          <span className="event-page__speaker-role">
                            {[speaker.role, speaker.company].filter(Boolean).join(', ')}
                          </span>
                        )}
                      </div>
                      {speaker.linkedin && (
                        <a
                          href={speaker.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="event-page__speaker-linkedin"
                          aria-label={`${speaker.name} on LinkedIn`}
                        >
                          in
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {event.tags && event.tags.length > 0 && (
              <div className="event-page__tags">
                {event.tags.map((tag) => (
                  <span key={tag} className="event-meta__chip">{tag}</span>
                ))}
              </div>
            )}

          </aside>
        </div>
      </div>
    </div>
  )
}