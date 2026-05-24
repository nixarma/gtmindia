import type { Event, EventFormat } from '@/types/event'
import { getAllEvents } from '@/lib/events'

// Re-export browser-safe constants and utilities
export { ALL_CITIES, ALL_FORMATS } from '@/lib/eventConstants'
export { formatEventDate } from '@/lib/dateUtils'

// Re-export loader helpers
export { getAllEvents, getEventBySlug, getUpcomingEvents, getPastEvents } from '@/lib/events'

/**
 * Returns up to `limit` events for homepage display:
 * - Upcoming events first, ascending by date
 * - Backfilled with most-recent past events if upcoming < limit
 * Filters are applied before the cap.
 */
export function getHomeEvents({
  format,
  city,
  limit = 5,
}: {
  format?: EventFormat | 'all'
  city?: string | 'all'
  limit?: number
}): { event: Event; isPast: boolean }[] {
  const all = getAllEvents()

  const filterFn = (e: Event) => {
    if (format && format !== 'all' && e.format !== format) return false
    if (city && city !== 'all' && e.city !== city) return false
    return true
  }

  const upcoming = all
    .filter((e) => e.status === 'upcoming' && filterFn(e))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const past = all
    .filter((e) => e.status === 'past' && filterFn(e))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const result: { event: Event; isPast: boolean }[] = [
    ...upcoming.slice(0, limit).map((e) => ({ event: e, isPast: false })),
  ]

  if (result.length < limit) {
    const backfill = past.slice(0, limit - result.length)
    backfill.forEach((e) => result.push({ event: e, isPast: true }))
  }

  return result
}