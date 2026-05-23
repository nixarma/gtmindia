import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Presales India',
  description:
    'Presales India is a community for sales engineers and presales professionals across India, founded in 2024.',
}

const cities = ['Bangalore', 'Hyderabad', 'Mumbai', 'Delhi']

export default function PresalesIndiaPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ paddingBlock: 'var(--section-pad-y)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              opacity: 0.5,
              marginBottom: '0.75rem',
            }}
          >
            Community
          </p>
          <h1 style={{ marginBottom: '1.5rem' }}>Presales India</h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.15rem',
              lineHeight: 1.75,
              opacity: 0.75,
              maxWidth: '58ch',
            }}
          >
            Started in 2024, Presales India is a practitioner-led community for sales engineers
            and presales professionals. It exists to build genuine connections, share craft,
            and raise the standard of presales in India.
          </p>
        </div>
      </section>

      {/* What we do */}
      <section
        style={{
          paddingBlock: 'var(--section-pad-y)',
          background: 'var(--color-lightest)',
        }}
      >
        <div className="container">
          <h2 style={{ marginBottom: '3rem' }}>What we run</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
              gap: '1.5rem',
            }}
          >
            <ProgrammeCard
              title="Monthly Virtual Events"
              description="Online sessions covering presales craft, tools, and live war stories from practitioners across the country."
            />
            <ProgrammeCard
              title="Monthly In-Person Events"
              description={`Meetups in four cities: ${cities.join(', ')}. Smaller, more candid conversations.`}
            />
            <ProgrammeCard
              title="SELF - Quarterly Virtual"
              description="SE Leadership Forum. A dedicated programme for SE leaders to discuss team strategy, hiring, and the business of presales."
              isSelf
            />
            <ProgrammeCard
              title="SELF - Quarterly In-Person"
              description="In-person SELF sessions in Bangalore for SE leaders who want deeper, off-the-record conversation."
              isSelf
            />
          </div>
        </div>
      </section>

      {/* Cities */}
      <section style={{ paddingBlock: 'var(--section-pad-y)' }}>
        <div className="container">
          <h2 style={{ marginBottom: '1rem' }}>Active cities</h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              opacity: 0.65,
              marginBottom: '2.5rem',
              maxWidth: '50ch',
            }}
          >
            In-person events run monthly in each of these cities.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {cities.map(city => (
              <span
                key={city}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  fontWeight: 500,
                  padding: '0.6rem 1.25rem',
                  border: '1px solid var(--color-primary-mid)',
                  borderRadius: '0.375rem',
                  color: 'var(--color-primary-dark)',
                  background: 'var(--color-primary-light)',
                }}
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Part of GTM India */}
      <section
        style={{
          paddingBlock: 'var(--section-pad-y)',
          background: 'var(--color-primary-light)',
        }}
      >
        <div className="container" style={{ maxWidth: '700px' }}>
          <h2 style={{ marginBottom: '1rem' }}>Now part of GTM India</h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              lineHeight: 1.75,
              opacity: 0.75,
              marginBottom: '2rem',
            }}
          >
            GTM India is the next chapter - broadening the community beyond presales to include
            all go-to-market functions. Presales India events continue as before, now alongside
            GTM India events.
          </p>
          <Link
            href="/events"
            style={{
              display: 'inline-block',
              padding: '0.75rem 1.75rem',
              background: 'var(--color-primary)',
              color: 'var(--color-white)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              fontWeight: 500,
              borderRadius: '0.375rem',
              textDecoration: 'none',
            }}
          >
            See upcoming events
          </Link>
        </div>
      </section>
    </>
  )
}

/* ── ProgrammeCard ── */

function ProgrammeCard({
  title,
  description,
  isSelf = false,
}: {
  title: string
  description: string
  isSelf?: boolean
}) {
  return (
    <div
      style={{
        background: 'var(--color-white)',
        border: '1px solid var(--color-linen)',
        borderRadius: '0.75rem',
        padding: '1.5rem',
      }}
    >
      {isSelf && (
        <span
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '0.2rem 0.6rem',
            borderRadius: '999px',
            background: 'var(--color-secondary-light)',
            color: 'var(--color-secondary-dark)',
            marginBottom: '0.75rem',
          }}
        >
          SELF
        </span>
      )}
      <h3 style={{ marginBottom: '0.75rem', fontSize: '1.2rem' }}>{title}</h3>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', lineHeight: 1.65, opacity: 0.7 }}>
        {description}
      </p>
    </div>
  )
}
