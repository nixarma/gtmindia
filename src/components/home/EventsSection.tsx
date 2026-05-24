import { getHomeEvents } from '@/data/events'
import { EventsFilter } from '@/components/events/EventsFilter'

export function EventsSection() {
  const events = getHomeEvents({ limit: 5 })

  return (
    <section className="events-section">
      <div className="container">
        <div className="section-head">
          <h2>Upcoming <em>events.</em></h2>
          <p className="section-head__aside">
            Virtual and in-person, across India. Free to attend — RSVP on Luma.
          </p>
        </div>
        <EventsFilter events={events} stickyFilters={false} showArchiveLink={true} />
      </div>
    </section>
  )
}