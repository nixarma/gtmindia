export type EventFormat = 'virtual' | 'in-person'
export type EventCommunity = 'presales-india' | 'gtm-india' | 'self'
export type EventStatus = 'upcoming' | 'past'

export interface Event {
  id?: string
  slug?: string
  title: string
  description: string
  community: EventCommunity
  format: EventFormat
  city: string
  date: string
  time?: string
  displayDate: string
  status: EventStatus
  lumaUrl: string
  series?: string
}