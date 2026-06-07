import 'server-only'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Event } from '@/types/event'

const EVENTS_DIR = path.join(process.cwd(), 'src/content/events')

export function getAllEvents(): Event[] {
  if (!fs.existsSync(EVENTS_DIR)) return []

  const files = fs.readdirSync(EVENTS_DIR).filter((f) => f.endsWith('.mdx'))

  const events: Event[] = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '')
    const raw = fs.readFileSync(path.join(EVENTS_DIR, filename), 'utf8')
    const { data, content } = matter(raw)

    return {
      slug,
      id:           data.id           ?? slug,
      title:        data.title        ?? 'Untitled Event',
      description:  data.description  ?? '',
      community:    data.community    ?? 'presales-india',
      format:       data.format       ?? 'in-person',
      city:         data.city         ?? '',
      date:         data.date         ?? '',
      status:       data.status       ?? 'upcoming',
      lumaUrl:      data.lumaUrl,
      lumaEmbedUrl: data.lumaEmbedUrl,
      series:       data.series,
      photos:       data.photos       ?? [],
      speakers:     data.speakers     ?? [],
      venue:        data.venue,
      capacity:     data.capacity,
      tags:         data.tags         ?? [],
      content:      content.trim()    || undefined,
    } satisfies Event
  })

  return events.sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateA - dateB
  })
}

function isUpcoming(event: Event): boolean {
  if (!event.date) return true
  const eventEnd = new Date(event.date)
  eventEnd.setHours(23, 59, 59, 999)
  return eventEnd >= new Date()
}

export function getEventBySlug(slug: string): Event | undefined {
  return getAllEvents().find((e) => e.slug === slug)
}

export function getUpcomingEvents(): Event[] {
  return getAllEvents().filter(isUpcoming)
}

export function getPastEvents(): Event[] {
  return getAllEvents()
    .filter((e) => !isUpcoming(e))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}