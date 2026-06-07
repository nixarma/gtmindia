import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getEventBySlug, getAllEvents } from '@/lib/events'
import type { Event } from '@/types/event'
import { formatEventDate } from '@/lib/dateUtils'
import PhotoCarousel from '@/components/ui/PhotoCarousel'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const events = getAllEvents()
  return events.map((e: Event) => ({ slug: e.slug ?? e.id ?? '' }))
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

  const isPast = event.date
    ? new Date(event.date).setHours(23, 59, 59, 999) < Date.now()
    : false
  const isVirtual = event.format === 'virtual'
  const hasSpeakers = event.speakers && event.speakers.length > 0 && event.speakers[0].name !== 'TBC'

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

        {/* ── Header ── */}
        <header className="event-page__header">
          <div className="event-meta">
            <span className="event-meta__chip event-meta__chip--community">
              {communityLabel[event.community] ?? event.community}
            </span>
            <span className="event-meta__chip">
              {isVirtual ? 'Virtual' : 'In-person'}
            </span>
            {!isVirtual && event.city && (
              <span className="event-meta__chip">{event.city}</span>
            )}
            {isPast && (
              <span className="event-meta__chip event-meta__chip--past">Past</span>
            )}
          </div>

          <h1 className="event-page__title">{event.title}</h1>

          <div className="event-page__meta-row">
            <span className="event-page__date">{formatEventDate(event.date)}</span>
            {!isVirtual && event.venue && (
              <>
                <span className="event-page__meta-sep">·</span>
                <span className="event-page__venue">{event.venue}</span>
              </>
            )}
          </div>
        </header>

        {/* ── Body ── */}
        <div className="event-page__body">

          {/* Photos — past events */}
          {isPast && event.photos && event.photos.length > 0 && (
            <PhotoCarousel
              images={event.photos}
              crops={['pad']}
              alt={event.title}
              className="event-page__carousel"
            />
          )}

          {/* Luma embed — upcoming events */}
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

          {/* Luma fallback link */}
          {!isPast && event.lumaUrl && !event.lumaEmbedUrl && (
            <a
              href={event.lumaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary btn--lg"
            >
              Register on Luma
            </a>
          )}

          {/* Description */}
          {event.description && (
            <p className="event-page__description">{event.description}</p>
          )}

          {/* Body content (agenda, etc.) */}
          {event.content && (
            <div className="event-page__content">
              <MDXRemote source={event.content} />
            </div>
          )}

          {/* Speakers */}
          {hasSpeakers && (
            <div className="event-page__speakers">
              <h2 className="event-page__section-heading">Speakers</h2>
              <ul className="event-page__speaker-list">
                {(event.speakers ?? []).map((speaker: { name: string; role?: string; company?: string; linkedin?: string }, i: number) => (
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

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div className="event-meta">
              {event.tags.map((tag: string) => (
                <span key={tag} className="event-meta__chip">{tag}</span>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}