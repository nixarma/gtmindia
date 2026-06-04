'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { Event, EventFormat } from '@/types/event'
import { FilterBar } from './FilterBar'
import { EventCard } from './EventCard'

interface EventsFilterProps {
  /** All events passed from a server component — no data fetching here */
  events: { event: Event; isPast: boolean }[]
  /** Whether the filter bar sticks to the viewport on scroll */
  stickyFilters?: boolean
  /** Show the "See all events" footer link — disable on the /events page itself */
  showArchiveLink?: boolean
  /** Max events shown when no filters are active. Lifted when filters are applied. */
  defaultVisible?: number
}

export function EventsFilter({
  events,
  stickyFilters = false,
  showArchiveLink = true,
  defaultVisible,
}: EventsFilterProps) {
  const [format, setFormat] = useState<EventFormat | 'all'>('all')
  const [city, setCity] = useState<string>('all')

  const filtersActive = format !== 'all' || city !== 'all'

  const items = useMemo(() => {
    const filtered = events.filter(({ event }) => {
      if (format !== 'all' && event.format !== format) return false
      if (city !== 'all' && event.city !== city) return false
      return true
    })
    if (!filtersActive && defaultVisible) return filtered.slice(0, defaultVisible)
    return filtered
  }, [events, format, city, filtersActive, defaultVisible])

  const upcomingCount = items.filter((i) => !i.isPast).length
  const pastCount     = items.filter((i) => i.isPast).length

  return (
    <div className="events-filter">
      <FilterBar
        format={format}
        city={city}
        onFormatChange={setFormat}
        onCityChange={setCity}
        sticky={stickyFilters}
      />

      {items.length === 0 ? (
        <div className="events-filter__empty">
          <p>No events match this filter combination.</p>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => { setFormat('all'); setCity('all') }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <div className="events-grid">
            {items.map(({ event, isPast }) => (
              <EventCard key={event.id ?? event.slug} event={event} isPast={isPast} />
            ))}
          </div>

          <div className="events-filter__footer">
            {pastCount > 0 && upcomingCount < events.filter(i => !i.isPast).length && (
              <p className="events-filter__backfill-note">
                Showing {upcomingCount} upcoming
                {upcomingCount > 0 ? ` and ${pastCount} past` : ' past'}{' '}
                event{items.length !== 1 ? 's' : ''}.
              </p>
            )}
            {showArchiveLink && (
              <Link href="/events" className="btn btn--ghost">
                See all events <span className="arrow">&rarr;</span>
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  )
}