export type EventCommunity = 'presales-india' | 'gtm-india'
export type EventFormat = 'virtual' | 'in-person'
export type EventSeries = 'regular' | 'self' // SELF = SE Leaders Forum

export interface Event {
  slug: string
  title: string
  date: string          // ISO 8601: "2025-07-15"
  time?: string         // e.g. "6:30 PM IST"
  community: EventCommunity
  format: EventFormat
  series: EventSeries
  city?: string         // for in-person events
  description: string
  lumaUrl: string       // full Luma event URL
  status: 'upcoming' | 'past'
}
