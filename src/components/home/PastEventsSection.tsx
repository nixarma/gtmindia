import Link from 'next/link'
import PhotoCarousel from '@/components/ui/PhotoCarousel'
import { getPastEvents } from '@/lib/events'
import { formatEventDate } from '@/lib/dateUtils'

// Fixed grid slots — CSS drives the column spans via --a through --e
const GRID_SLOTS = [
  { cls: 'past__card--a', photoMod: 'past__photo--wide',  aspectRatio: 'aspect-[16/9]' },
  { cls: 'past__card--b', photoMod: 'past__photo--wide',  aspectRatio: 'aspect-[16/9]' },
  { cls: 'past__card--c', photoMod: '',                   aspectRatio: 'aspect-[4/3]'  },
] as const

export function PastEventsSection() {
  const past = getPastEvents().slice(0, 3)

  if (past.length === 0) return null

  return (
    <section className="past">
      <div className="container">
        <div className="section-head">
          <h2>Past <em>events.</em></h2>
          <p className="section-head__aside">
            A look at the rooms we&apos;ve shown up in. Documentary
            photography — no stock, no stage lights.
          </p>
        </div>

        <div className="past__grid">
          {past.map((event, i) => {
            const slot = GRID_SLOTS[i]
            const isVirtual = event.format === 'virtual'
            const location = isVirtual ? 'Virtual' : (event.city || 'India')
            const month = event.date
              ? new Date(event.date).toLocaleString('en-IN', { month: 'long', year: 'numeric' })
              : ''
            const photos = event.photos ?? []

            return (
              <div key={event.slug ?? event.id} className={`past__card ${slot.cls}`}>
                <PhotoCarousel
                  images={photos}
                  alt={event.title}
                  aspectRatio={slot.aspectRatio}
                  className={slot.photoMod}
                />
                <div className="past__meta">
                  <b>{event.title}</b>
                  <span>{location}{month ? ` · ${month}` : ''}</span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="past__archive-link">
          <Link href="/events#past" className="btn btn--ghost">
            See full archive <span className="arrow">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  )
}