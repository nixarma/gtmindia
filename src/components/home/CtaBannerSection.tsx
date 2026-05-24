import Link from 'next/link'

export function CtaBannerSection() {
  return (
    <section className="cta-banner">
      <div className="container">
        <h2 className="cta-banner__title">
          Show up. The <em>community</em> is the room.
        </h2>
        <p className="cta-banner__sub">
          The best way to understand what this community is about is to come to
          one event. RSVP for any session — virtual or in-person — and see for
          yourself.
        </p>
        <div className="cta-banner__actions">
          <Link href="/events" className="btn btn--primary btn--lg">
            See upcoming events <span className="arrow">&rarr;</span>
          </Link>
          <a
            href="https://lu.ma/gtmindia"
            className="btn btn--ghost-dark btn--lg"
            target="_blank"
            rel="noopener"
          >
            Follow on Luma
          </a>
        </div>
      </div>
    </section>
  )
}
