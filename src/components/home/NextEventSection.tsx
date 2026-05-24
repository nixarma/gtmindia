import Link from 'next/link'

export function NextEventSection() {
  return (
    <section className="next-event">
      <div className="container">
        <div className="next-event__head">
          <h2 className="next-event__title">
            Next <em>event</em>
          </h2>
          <span className="next-event__count">01 / 04 upcoming</span>
        </div>

        <div className="next-event__grid">
          <div className="next-event__panel">
            <div className="event-meta">
              <span className="event-meta__chip event-meta__chip--accent">
                Presales India
              </span>
              <span className="event-meta__chip">In-person</span>
              <span className="event-meta__chip">Bangalore</span>
            </div>

            <h3 className="next-event__name">
              Multi-stakeholder<br />
              <em>demos</em>, without losing<br />
              the thread.
            </h3>

            <p className="next-event__desc">
              Monthly in-person meetup for presales practitioners in Bangalore.
              This month: how to run a demo when there are five people in the
              room, three personas, and one technical buyer who hates demos.
            </p>

            <dl className="next-event__dl">
              <dt>Date</dt>
              <dd>Sat, 19 July 2025 · 6:30 PM IST</dd>
              <dt>Where</dt>
              <dd>Indiranagar, Bangalore (venue shared on RSVP)</dd>
              <dt>RSVP</dt>
              <dd>
                <a
                  href="https://lu.ma/presales-india-blr-july"
                  target="_blank"
                  rel="noopener"
                  className="next-event__luma-link"
                >
                  lu.ma/presales-india-blr-july &rarr;
                </a>
              </dd>
            </dl>

            <div className="next-event__actions">
              <a
                href="https://lu.ma/presales-india-blr-july"
                className="btn btn--primary btn--lg"
                target="_blank"
                rel="noopener"
              >
                Register on Luma <span className="arrow">&rarr;</span>
              </a>
              <Link href="/events" className="btn btn--ghost-dark btn--lg">
                See all events
              </Link>
            </div>
          </div>

          <div className="next-event__photo">
            <div className="next-event__photo-cap">
              <b>Last month, Bangalore</b>
              <span>32 in the room</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
