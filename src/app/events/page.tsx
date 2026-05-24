import type { Metadata } from 'next'
import { EventsFilter } from '@/components/events/EventsFilter'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Upcoming and past events from GTM India and Presales India.',
}

export default function EventsPage() {
  return (
    <section style={{ paddingBlock: 'var(--section-pad-y)' }}>
      <div className="container">
        <div className="section-head">
          <h1>All <em>events.</em></h1>
          <p className="section-head__aside">
            Virtual and in-person, across India. Free to attend — RSVP on Luma.
          </p>
        </div>
        <EventsFilter limit={100} stickyFilters={true} />
      </div>
    </section>
  )
}