export function HeroSection() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero__eyebrow-row">
          <p className="eyebrow">
            An initiative by<br />GTM Solutions Consulting
          </p>
          <p className="eyebrow eyebrow--right">
            Practitioner-led<br />community across India
          </p>
        </div>

        <h1 className="hero__title">
          Building India&apos;s GTM{' '}
        
          <em>community.</em>
        </h1>

        <div className="hero__photo-wrap">
          <div className="hero__photo" />
          <span className="hero__photo-cap">
            Bangalore · Hyderabad · Mumbai · Delhi
          </span>
        </div>

        <div className="tag-row">
          <span>Sales</span>
          <span className="plus">+</span>
          <span>Presales / Solutions</span>
          <span className="plus">+</span>
          <span>GTM Leadership</span>
          <span className="plus">+</span>
          <span>Product Marketing</span>
        </div>
      </div>
    </section>
  )
}
