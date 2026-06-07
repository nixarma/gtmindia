import type { Metadata } from 'next'
import { getAllEvents } from '@/lib/events'
import { EventsFilter } from '@/components/events/EventsFilter'
import { CtaBannerSection } from '@/components/home/CtaBannerSection'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Upcoming and past events from GTM India and Presales India.',
}

export default function EventsPage() {
  const all = getAllEvents()
  const now = new Date()

  const upcoming = all
  .filter((e) => new Date(e.date).setHours(23, 59, 59, 999) >= now.getTime())
  .map((event) => ({ event, isPast: false }))

  const past = all
    .filter((e) => new Date(e.date).setHours(23, 59, 59, 999) < now.getTime())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((event) => ({ event, isPast: true }))

    const events = [...upcoming, ...past]

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