export function CtaBannerSection() {
  return (
    <section className="cta-banner">
      <div className="container">
        <h2 className="cta-banner__title">
          Stay current with <em>GTM India</em>
        </h2>
        <p className="cta-banner__sub">
          Events, conversations, and ideas from the GTM India community —
          delivered monthly.
        </p>
        <div className="beehiiv-embed">
          <iframe
            src="https://newsletter.gtmindia.co"
            width="100%"
            height="500"
            frameBorder="0"
            scrolling="no"
          />
        </div>
      </div>
    </section>
  )
}