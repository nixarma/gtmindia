import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Event } from '@/types/event'

const EVENTS_DIR = path.join(process.cwd(), 'src/content/events')

export function getAllEvents(): Event[] {
  if (!fs.existsSync(EVENTS_DIR)) return []

  const files = fs.readdirSync(EVENTS_DIR).filter(f => f.endsWith('.mdx'))

  const events: Event[] = files.map(filename => {
    const slug = filename.replace(/\.mdx$/, '')
    const raw = fs.readFileSync(path.join(EVENTS_DIR, filename), 'utf8')
    const { data } = matter(raw)

    return {
      slug,
      title:       data.title       ?? 'Untitled Event',
      date:        data.date        ?? '',
      time:        data.time,
      community:   data.community   ?? 'presales-india',
      format:      data.format      ?? 'virtual',
      series:      data.series      ?? 'regular',
      city:        data.city,
      description: data.description ?? '',
      lumaUrl:     data.lumaUrl     ?? '#',
      status:      data.status      ?? 'upcoming',
    } satisfies Event
  })

  // Sort: upcoming first (chronological), then past (reverse chronological)
  return events.sort((a, b) => {
    if (a.status === 'upcoming' && b.status === 'past') return -1
    if (a.status === 'past' && b.status === 'upcoming') return 1
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return a.status === 'upcoming'
      ? dateA - dateB
      : dateB - dateA
  })
}

export function getUpcomingEvents(): Event[] {
  return getAllEvents().filter(e => e.status === 'upcoming')
}

export function getPastEvents(): Event[] {
  return getAllEvents().filter(e => e.status === 'past')
}
