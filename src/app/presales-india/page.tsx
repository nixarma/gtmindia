import { getAllEvents } from '@/lib/events'
import { NextEventSection } from '@/components/home/NextEventSection'
import { PastEventsSection } from '@/components/home/PastEventsSection'
import PresalesHero from '@/components/PresalesHero'
import { CtaBannerSection } from '@/components/home/CtaBannerSection'
export const metadata = {
  title: 'Presales India — GTM India',
  description:
    'Where it started. Presales India was founded in 2024 and is now GTM India — a community for go-to-market professionals in India selling globally.',
}

export default async function PresalesIndiaPage() {
  const allEvents = await getAllEvents()

  const now = new Date()

  const upcomingEvents = allEvents.filter(
    (e) => new Date(e.date).setHours(23, 59, 59, 999) >= now.getTime()
  )
  
const pastPsiEvents = allEvents
  .filter(
    (e) =>
      e.community === 'presales-india' &&
      (new Date(e.date).setHours(23,59,59,999) < now.getTime())
  )
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <main>
      <PresalesHero />
      <NextEventSection upcoming={upcomingEvents} />
      <section className="psi-archive" id="past-events">
        <div className="container">
          <h2 className="psi-archive__heading">Past Presales India events</h2>
          <p className="psi-archive__sub">
            Every event that brought this community together.
          </p>
          <PastEventsSection events={pastPsiEvents} />
        </div>
      </section>
      <CtaBannerSection />
    </main>
  )
}