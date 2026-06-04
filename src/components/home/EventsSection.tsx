import { getAllEvents } from '@/lib/events'
import { EventsFilter } from '@/components/events/EventsFilter'

export function EventsSection() {
  const all = getAllEvents()
  const events = all.map((event) => ({
    event,
    isPast: event.status === 'past',
  }))

  return (
    <section className="events-section">
      <div className="container">
        <div className="section-head">
          <h2>Upcoming <em>events.</em></h2>
          <p className="section-head__aside">
            Virtual and in-person, across India. Free to attend — RSVP on Luma.
          </p>
        </div>
        <EventsFilter events={events} stickyFilters={false} showArchiveLink={true} defaultVisible={6} />
      </div>
    </section>
  )
}