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
    const { data } = matter(raw)

    return {
      slug,
      id:          data.id          ?? slug,
      title:       data.title       ?? 'Untitled Event',
      description: data.description ?? '',
      community:   data.community   ?? 'presales-india',
      format:      data.format      ?? 'in-person',
      city:        data.city        ?? '',
      date:        data.date        ?? '',
      status:      data.status      ?? 'upcoming',
      lumaUrl:     data.lumaUrl,
      series:      data.series,
      photos:      data.photos      ?? [],
      speakers:    data.speakers    ?? [],
      venue:       data.venue,
      capacity:    data.capacity,
      tags:        data.tags        ?? [],
    } satisfies Event
  })

  return events.sort((a, b) => {
    if (a.status === 'upcoming' && b.status === 'past') return -1
    if (a.status === 'past' && b.status === 'upcoming') return 1
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return a.status === 'upcoming' ? dateA - dateB : dateB - dateA
  })
}

export function getEventBySlug(slug: string): Event | undefined {
  return getAllEvents().find((e) => e.slug === slug)
}

export function getUpcomingEvents(): Event[] {
  return getAllEvents().filter((e) => e.status === 'upcoming')
}

export function getPastEvents(): Event[] {
  return getAllEvents().filter((e) => e.status === 'past')
}