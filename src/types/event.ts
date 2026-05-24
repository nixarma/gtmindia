export type EventFormat = 'virtual' | 'in-person'
export type EventCommunity = 'presales-india' | 'gtm-india' | 'self'
export type EventStatus = 'upcoming' | 'past'

export interface Event {
  id: string
  title: string
  description: string
  community: EventCommunity
  format: EventFormat
  city: string           // 'Virtual' | 'Bangalore' | 'Hyderabad' | 'Mumbai' | 'Delhi'
  date: string           // ISO 8601 — '2025-07-19T18:30:00+05:30'
  displayDate: string    // 'Sat, 19 July 2025 · 6:30 PM IST'
  status: EventStatus
  lumaUrl: string
  series?: string        // e.g. 'SELF Q2'
}