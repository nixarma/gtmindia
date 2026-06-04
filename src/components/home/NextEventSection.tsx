'use client'

import Link from 'next/link'
import PhotoCarousel from '@/components/ui/PhotoCarousel'
import { formatEventDate } from '@/lib/dateUtils'
import type { Event } from '@/types/event'
import { CldImage } from 'next-cloudinary'

const communityLabel: Record<string, string> = {
  'presales-india': 'Presales India',
  'gtm-india':      'GTM India',
  'self':           'SELF',
}

interface NextEventSectionProps {
  upcoming: Event[]
}

export function NextEventSection({ upcoming }: NextEventSectionProps) {
  const event = upcoming[0]
  if (!event) return null

  const also = upcoming.slice(1, 4)
  const isVirtual = event.format === 'virtual'
  const photos = event.photos ?? []
  return (
    <section className="next-event">
      <div className="container">

        <div className="next-event__head">
          <h2 className="next-event__title">
            Next <em>events</em>
          </h2>
        </div>

        {/* ── Featured event ── */}
        <div className="next-event__featured">

          {/* Left — poster */}
          <div className="next-event__photo">
            <PhotoCarousel
              images={photos}
              alt={event.title}
              aspectRatio="aspect-[4/5]"
            />
          </div>

          {/* Right — details */}
          <div className="next-event__panel">
            <div className="event-meta">
              <span className="event-meta__chip event-meta__chip--accent">
                {communityLabel[event.community] ?? event.community}
              </span>
              <span className="event-meta__chip">
                {isVirtual ? 'Virtual' : 'In-person'}
              </span>
              {!isVirtual && event.city && (
                <span className="event-meta__chip">{event.city}</span>
              )}
            </div>

            <h3 className="next-event__name">{event.title}</h3>

            {event.description && (
              <p className="next-event__desc">{event.description}</p>
            )}

            <dl className="next-event__dl">
              <dt>Date</dt>
              <dd>{formatEventDate(event.date)}</dd>
              {!isVirtual && event.venue && (
                <>
                  <dt>Where</dt>
                  <dd>{event.venue}</dd>
                </>
              )}
            </dl>

            {event.lumaUrl && (
              <div className="next-event__actions">
                <a
                  href={event.lumaUrl}
                  className="btn btn--primary btn--lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Register on Luma <span className="arrow">&rarr;</span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* ── Also upcoming ── */}
        {also.length > 0 && (
          <div className="next-event__also">
            <span className="next-event__also-label">Also coming up</span>
            <ul className="next-event__also-list">
              {also.map((e) => {
                const eVirtual = e.format === 'virtual'
                const ePhotos = e.photos ?? []
                const eLocation = eVirtual ? 'Virtual' : (e.city || 'India')

                return (
                  <li key={e.slug} className="next-event__also-item">
                    <Link href={`/events/${e.slug}`} className="next-event__also-link">

                      {/* Poster thumbnail */}
                      <div className="next-event__also-poster">
                      {ePhotos.length > 0 ? (
  <CldImage
    src={ePhotos[0]}
    alt={e.title}
    width={220}
    height={220}
    crop={{ type: "pad", source: true }}
    className="next-event__also-img"
  />
) : (
  <div className="next-event__also-placeholder" />
)}
                      </div>

                      {/* Details */}
                      <div className="next-event__also-details">
                        <span className="next-event__also-title">{e.title}</span>
                        <span className="next-event__also-meta">
                          {formatEventDate(e.date)} · {eLocation}
                        </span>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {/* ── Footer ── */}
        <div className="next-event__footer">
          <Link href="/events" className="btn btn--ghost-dark btn--lg">
            See all events
          </Link>
        </div>

      </div>
    </section>
  )
}