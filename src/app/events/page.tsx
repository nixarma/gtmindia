import type { Metadata } from 'next'
import { getAllEvents } from '@/data/events'
import { EventsFilter } from '@/components/events/EventsFilter'
import { CtaBannerSection } from '@/components/home/CtaBannerSection'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Upcoming and past events from GTM India and Presales India.',
}

export default function EventsPage() {
  const all = getAllEvents()
  const events = all.map((event) => ({
    event,
    isPast: event.status === 'past',
  }))

  return (
    <>
      <section style={{ paddingBlock: 'var(--section-pad-y)' }}>
        <div className="container">
          <div className="section-head">
            <h1>All <em>events.</em></h1>
            <p className="section-head__aside">
              Virtual and in-person, across India. Free to attend — RSVP on Luma.
            </p>
          </div>
          <EventsFilter events={events} stickyFilters={true} showArchiveLink={false} />
        </div>
      </section>
      <CtaBannerSection />
    </>
  )
}