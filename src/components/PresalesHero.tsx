import Image from 'next/image'

export default function PresalesHero() {
  return (
    <section className="psi-hero">
      <div className="container">

        {/* Origin label */}
        <span className="psi-hero__label">Presales India</span>

        {/* Main heading */}
        <h1 className="psi-hero__heading">Where it started</h1>

        {/* Subtitle */}
        <p className="psi-hero__subtitle">
          From a casual meetup in Hyderabad in March, 2024 to the community that is now GTM India.
        </p>

        {/* Founding image */}
        <div className="psi-hero__image">
          <Image
            src="https://res.cloudinary.com/dq8lca1ey/image/upload/w_1200,f_auto,q_auto/v1780663876/psi-founding.jpg"
            alt="The founding Presales India meetup, Hyderabad 2024"
            width={900}
            height={600}
            className="psi-hero__image-img"
          />
          <p className="psi-hero__image-caption">Hyderabad, March 2024</p>
        </div>

        {/* Story prose */}
        <div className="psi-hero__story">
          <p>
            Presales India started with a clear focus: building a home for
            presales professionals in India who sell globally. The idea was
            simple - most learning happens outside the bubble of one's company.
          </p>
          <p>
            What followed was richer than expected. Virtual meetups, in-person events, and a growing community.
            Soon, the conversations moved beyond presales methodology into all the intersects with broader
            GTM work — how to partner with sales, navigate marketing,
            influence product, and tell stories that land with buyers.
          </p>
          <p>
            Over two years, that became obvious enough to act on.
          </p>
        </div>

        {/* Transition block */}
        <div className="psi-hero__transition">
          <h2 className="psi-hero__transition-heading">Now part of GTM India</h2>
          <p>
            GTM India is the next chapter — broadening the community beyond
            presales to include all go-to-market functions. Presales is still at
            the heart of it. The events, the peer learning, the honest
            conversation — all of that continues, now under a name that better
            reflects what we actually talk about.
          </p>
          <p>
            For those who have been a part of the Presales India journey, thank you! We look forward to growing GTM India with you. And if you know
            someone who belongs here, please invite them!
          </p>
          <a href="/" className="psi-hero__cta">
            Explore GTM India →
          </a>
        </div>

        <p>-Nikhil</p>

        {/* Cities */}
        <div className="psi-hero__cities">
          <p className="psi-hero__cities-label">Active cities</p>
          <ul className="psi-hero__cities-list">
            <li>Bengaluru</li>
            <li>Hyderabad</li>
            <li>Mumbai</li>
            <li>Delhi NCR</li>
          </ul>
        </div>

      </div>
    </section>
  )
}