import type { Metadata } from 'next'
import { getAllEvents } from '@/lib/events'
import { EventFilters } from '@/components/ui/EventFilters'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Upcoming and past events from GTM India and Presales India.',
}

export default function EventsPage() {
  const events = getAllEvents()

  return (
    <section style={{ paddingBlock: 'var(--section-pad-y)' }}>
      <div className="container">
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            opacity: 0.5,
            marginBottom: '0.75rem',
          }}
        >
          GTM India + Presales India
        </p>
        <h1 style={{ marginBottom: '0.75rem' }}>Events</h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            opacity: 0.65,
            marginBottom: '3rem',
            maxWidth: '60ch',
          }}
        >
          Virtual and in-person events across India. Filter by community, format, or status.
        </p>
        <EventFilters events={events} />
      </div>
    </section>
  )
}
