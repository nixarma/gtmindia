import type { Event, EventFormat } from "@/types/event"

export const events: Event[] = [
  // ── Upcoming ──────────────────────────────────────────────────────────────
  {
    id: 'blr-jul-2025',
    title: 'Multi-stakeholder demos, without losing the thread.',
    description:
      'How to run a demo when there are five people in the room, three personas, and one technical buyer who hates demos.',
    community: 'presales-india',
    format: 'in-person',
    city: 'Bangalore',
    date: '2025-07-19T18:30:00+05:30',
    displayDate: 'Sat, 19 July 2025 · 6:30 PM IST',
    status: 'upcoming',
    lumaUrl: 'https://lu.ma/presales-india-blr-july',
  },
  {
    id: 'virtual-jul-2025',
    title: 'Discovery in the age of AI-assisted buyers.',
    description:
      'Buyers are coming in more prepared than ever. How do you run discovery when they already have the answers?',
    community: 'presales-india',
    format: 'virtual',
    city: 'Virtual',
    date: '2025-07-24T19:00:00+05:30',
    displayDate: 'Thu, 24 July 2025 · 7:00 PM IST',
    status: 'upcoming',
    lumaUrl: 'https://lu.ma/presales-india-virtual-july',
  },
  {
    id: 'hyd-aug-2025',
    title: 'POC design that closes, not just impresses.',
    description:
      'The difference between a proof of concept that generates excitement and one that generates a PO.',
    community: 'presales-india',
    format: 'in-person',
    city: 'Hyderabad',
    date: '2025-08-09T18:30:00+05:30',
    displayDate: 'Sat, 9 August 2025 · 6:30 PM IST',
    status: 'upcoming',
    lumaUrl: 'https://lu.ma/presales-india-hyd-aug',
  },
  {
    id: 'self-q3-2025',
    title: 'SELF Q3 — Building a presales team that scales.',
    description:
      'Off-the-record leadership session on hiring, onboarding, and the metrics that actually matter for SE teams.',
    community: 'self',
    format: 'in-person',
    city: 'Bangalore',
    date: '2025-08-23T09:00:00+05:30',
    displayDate: 'Sat, 23 August 2025 · 9:00 AM IST',
    status: 'upcoming',
    lumaUrl: 'https://lu.ma/self-q3-2025',
    series: 'SELF Q3',
  },

  // ── Past ──────────────────────────────────────────────────────────────────
  {
    id: 'blr-may-2025',
    title: 'Demo design fundamentals.',
    description:
      'First principles of demo structure: what to show, what to skip, and how to build a narrative arc that holds attention.',
    community: 'presales-india',
    format: 'in-person',
    city: 'Bangalore',
    date: '2025-05-17T18:30:00+05:30',
    displayDate: 'Sat, 17 May 2025 · 6:30 PM IST',
    status: 'past',
    lumaUrl: 'https://lu.ma/presales-india-blr-may',
  },
  {
    id: 'mum-apr-2025',
    title: 'Mumbai lightning talks.',
    description:
      'Five practitioners, five stories, twenty minutes each. Rapid-fire format covering discovery, demos, and deal reviews.',
    community: 'presales-india',
    format: 'in-person',
    city: 'Mumbai',
    date: '2025-04-12T18:30:00+05:30',
    displayDate: 'Sat, 12 April 2025 · 6:30 PM IST',
    status: 'past',
    lumaUrl: 'https://lu.ma/presales-india-mum-apr',
  },
  {
    id: 'self-q1-2025',
    title: 'SELF Q1 — The business case for presales.',
    description:
      'How do you make the case for headcount, tooling, and SE team investment to a CRO who sees presales as a cost centre?',
    community: 'self',
    format: 'in-person',
    city: 'Bangalore',
    date: '2025-03-15T09:00:00+05:30',
    displayDate: 'Sat, 15 March 2025 · 9:00 AM IST',
    status: 'past',
    lumaUrl: 'https://lu.ma/self-q1-2025',
    series: 'SELF Q1',
  },
  {
    id: 'del-feb-2025',
    title: 'Delhi launch — Why presales in India needs a community.',
    description:
      'The founding conversation. Why now, why India, and what we want this community to become.',
    community: 'gtm-india',
    format: 'in-person',
    city: 'Delhi',
    date: '2025-02-22T18:30:00+05:30',
    displayDate: 'Sat, 22 February 2025 · 6:30 PM IST',
    status: 'past',
    lumaUrl: 'https://lu.ma/gtmindia-del-launch',
  },
  {
    id: 'virtual-jan-2025',
    title: 'Discovery in complex deals.',
    description:
      'Multi-threaded discovery: how to run it when there are six stakeholders, four agendas, and no single champion.',
    community: 'presales-india',
    format: 'virtual',
    city: 'Virtual',
    date: '2025-01-23T19:00:00+05:30',
    displayDate: 'Thu, 23 January 2025 · 7:00 PM IST',
    status: 'past',
    lumaUrl: 'https://lu.ma/presales-india-virtual-jan',
  },
]

// ── Helpers ──────────────────────────────────────────────────────────────────

export const ALL_CITIES = ['Bangalore', 'Hyderabad', 'Mumbai', 'Delhi', 'Virtual'] as const
export const ALL_FORMATS: Event['format'][] = ['virtual', 'in-person']

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
  const filterFn = (e: Event) => {
    if (format && format !== 'all' && e.format !== format) return false
    if (city && city !== 'all' && e.city !== city) return false
    return true
  }

  const upcoming = events
    .filter((e) => e.status === 'upcoming' && filterFn(e))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const past = events
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