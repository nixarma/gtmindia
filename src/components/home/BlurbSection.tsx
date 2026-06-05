export function BlurbSection() {
  return (
    <section id="about">
      <div className="container">
        <p className="about__eyebrow">About GTM India</p>
        <h2 className="about__heading">
          Built for GTM <em>practitioners</em> in India.<br />
          Not just borrowed from elsewhere.
        </h2>

        <div className="about__grid">
          <div className="about__card">
            <span className="about__card-label">Community</span>
            <div className="about__card-stat">530<em>+</em></div>
            <p className="about__card-body">
              Presales, Sales, CS, PS, PMM, and GTM leaders - frontline practitioners
              and the people who lead them. Active since 2024.
            </p>
          </div>

          <div className="about__card">
            <span className="about__card-label">The India lens</span>
            <div className="about__card-stat">Made <em>here.</em></div>
            <p className="about__card-body">
              Most GTM thinking is built for the US. We focus on what
              works when you're selling both domestically and globally from India — the context,
              the constraints, the craft.
            </p>
          </div>

          <div className="about__card">
            <span className="about__card-label">How we learn</span>
            <div className="about__card-stat">Peer <em>first.</em></div>
            <p className="about__card-body">
              No panels of executives pontificating in generalities at you. Real stories, real
              playbooks, and honest conversation.
            </p>
          </div>

          <div className="about__card">
            <span className="about__card-label">Where we meet</span>
            <div className="about__card-stat">Online <em>&</em> in-person.</div>
            <p className="about__card-body">
              4{' '}
              <a className="about__card-link" href="#event-formats">
                event formats
              </a>{' '}
              - virtual and in-person - and expanding to new cities. Free to
              attend.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}