import { EventsFilter } from '@/components/events/EventsFilter'

export function EventsSection() {
  return (
    <section className="events-section" id="events">
      <div className="container">
        <div className="section-head">
          <h2>Upcoming <em>events.</em></h2>
          <p className="section-head__aside">
            Virtual and in-person, across India. Free to attend — RSVP on Luma.
          </p>
        </div>
        <EventsFilter limit={5} stickyFilters={false} />
      </div>
    </section>
  )
}