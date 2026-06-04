'use client'

import Link from 'next/link'
import PhotoCarousel from '@/components/ui/PhotoCarousel'
import { formatEventDate } from '@/lib/dateUtils'
import type { Event } from '@/types/event'

const communityLabel: Record<string, string> = {
  'presales-india': 'Presales India',
  'gtm-india':      'GTM India',
  'self':           'SELF',
}

const cityAbbr: Record<string, string> = {
  'Bengaluru':  'BLR',
  'Hyderabad':  'HYD',
  'Mumbai':     'BOM',
  'Delhi NCR':  'DEL',
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

        <h2 className="next-event__title">
          Next <em>events</em>
        </h2>

        {/* ── Featured card ── */}
        <Link href={`/events/${event.slug}`} className="featured-card">

          {/* Left — poster / carousel */}
          <div className="featured-card__poster">
            <PhotoCarousel
              images={photos}
              alt={event.title}
              aspectRatio="aspect-[4/5]"
            />
          </div>

          {/* Right — details */}
          <div className="featured-card__panel">
            <div className="event-meta">
              <span className="event-meta__chip event-meta__chip--accent">
                {communityLabel[event.community] ?? event.community}
              </span>
              <span className="event-meta__chip event-meta__chip--on-wheat">
                {isVirtual ? 'Virtual' : 'In-person'}
              </span>
              {!isVirtual && event.city && (
                <span className="event-meta__chip event-meta__chip--on-wheat">
                  {event.city}
                </span>
              )}
            </div>

            <h3 className="featured-card__name">{event.title}</h3>

            {event.description && (
              <p className="featured-card__desc">{event.description}</p>
            )}

            <dl className="featured-card__dl">
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
              <div className="featured-card__actions">
                <span className="btn btn--primary btn--lg">
                  Register on Luma
                </span>
              </div>
            )}
          </div>
        </Link>

        {/* ── Also coming up ── */}
        {also.length > 0 && (
          <div className="next-event__also">
            <span className="next-event__also-label">Also coming up</span>
            <ul className="next-event__also-list">
              {also.map((e) => {
                const eVirtual = e.format === 'virtual'
                const eLocation = eVirtual ? 'Virtual' : (e.city || 'India')
                const eCommunity = communityLabel[e.community] ?? e.community

                return (
                  <li key={e.slug}>
                    <Link href={`/events/${e.slug}`} className="small-card">

                      {/* City / format block */}
                      <div className="small-card__identity">
                        <span className="small-card__location">
                          {eVirtual ? 'VIRTUAL' : (cityAbbr[e.city ?? ''] ?? e.city ?? '')}
                        </span>
                      </div>

                      {/* Title + meta */}
                      <div className="small-card__body">
                        <span className="small-card__title">{e.title}</span>
                        <span className="small-card__meta">
                          {e.date ? formatEventDate(e.date) : 'Date TBC'}
                          {' · '}
                          {eVirtual ? 'Virtual' : 'In-person'}
                          {!eVirtual && e.city ? ` · ${e.city}` : ''}
                        </span>
                      </div>

                      {/* View details CTA — always shown */}
                      <span className="small-card__register">View details</span>
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