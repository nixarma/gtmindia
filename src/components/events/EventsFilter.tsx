'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { EventFormat } from '@/types/event'
import { getHomeEvents } from '@/data/events'
import { FilterBar } from './FilterBar'
import { EventCard } from './EventCard'

interface EventsFilterProps {
  /** Cap for total events shown (upcoming + backfill past). Default: 5 */
  limit?: number
  /** Whether the filter bar sticks to the viewport on scroll */
  stickyFilters?: boolean
}

export function EventsFilter({
  limit = 5,
  stickyFilters = false,
}: EventsFilterProps) {
  const [format, setFormat] = useState<EventFormat | 'all'>('all')
  const [city, setCity] = useState<string>('all')

  const items = getHomeEvents({ format, city, limit })

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
              <EventCard key={event.id} event={event} isPast={isPast} />
            ))}
          </div>

          <div className="events-filter__footer">
            {pastCount > 0 && upcomingCount < limit && (
              <p className="events-filter__backfill-note">
                Showing {upcomingCount} upcoming
                {upcomingCount > 0 ? ` and ${pastCount} past` : ` past`}{' '}
                event{items.length !== 1 ? 's' : ''}.
              </p>
            )}
            <Link href="/events" className="btn btn--ghost">
              See all events <span className="arrow">&rarr;</span>
            </Link>
          </div>
        </>
      )}
    </div>
  )
}