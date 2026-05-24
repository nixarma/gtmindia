import Link from 'next/link'

const pastEvents = [
  { id: 'a', cls: 'past__card--a', photoMod: 'past__photo--wide', title: 'Demo design fundamentals',  location: 'Bangalore', month: 'May 2025' },
  { id: 'b', cls: 'past__card--b', photoMod: 'past__photo--wide', title: 'Mumbai lightning talks',     location: 'Mumbai',    month: 'Apr 2025' },
  { id: 'c', cls: 'past__card--c', photoMod: '',                   title: 'SELF Q1',                   location: 'Bangalore', month: 'Mar 2025' },
  { id: 'd', cls: 'past__card--d', photoMod: '',                   title: 'Delhi launch',              location: 'Delhi',     month: 'Feb 2025' },
  { id: 'e', cls: 'past__card--e', photoMod: '',                   title: 'Discovery in complex deals', location: 'Virtual',  month: 'Jan 2025' },
]

export function PastEventsSection() {
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
          {pastEvents.map((ev) => (
            <div key={ev.id} className={`past__card ${ev.cls}`}>
              <div
                className={`past__photo${ev.photoMod ? ` ${ev.photoMod}` : ''}`}
              />
              <div className="past__meta">
                <b>{ev.title}</b>
                <span>{ev.location} · {ev.month}</span>
              </div>
            </div>
          ))}
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
