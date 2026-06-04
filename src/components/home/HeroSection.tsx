export function HeroSection() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero__eyebrow-row">
          <p className="eyebrow">Practitioner-led, across India</p>
        </div>

        <h1 className="hero__title">
          Building India&apos;s GTM{' '}
          <em>community.</em>
        </h1>

        <div className="hero__photo-wrap">
          <div className="hero__photo" />
          <span className="hero__photo-cap">
            Bengaluru · Hyderabad · Mumbai · Delhi NCR
          </span>
        </div>

        <div className="tag-row">
          <span>Sales</span>
          <span className="plus">+</span>
          <span>Presales / Solutions Engineering</span>
          <span className="plus">+</span>
          <span>GTM Leadership</span>
          <span className="plus">+</span>
          <span>Product Marketing</span>
          <span className="plus">+</span>
          <span>RevOps</span>
        </div>
      </div>
    </section>
  )
}