export type EventFormat = 'virtual' | 'in-person'
export type EventCommunity = 'presales-india' | 'gtm-india' | 'self'
export type EventStatus = 'upcoming' | 'past'

export interface Speaker {
  name: string
  role?: string
  company?: string
  linkedin?: string
}

export interface Event {
  id?: string
  slug?: string
  title: string
  description: string
  community: EventCommunity
  format: EventFormat
  city: string
  date: string           // DD.MM.YYYY
  time?: string
  status: EventStatus
  lumaUrl?: string
  series?: string
  photos?: string[]      // first image used as cover
  speakers?: Speaker[]
  venue?: string
  capacity?: number
  tags?: string[]
}