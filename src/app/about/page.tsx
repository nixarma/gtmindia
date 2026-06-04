import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'About GTM India, the mission, and the people behind it.',
}

export default function AboutPage() {
  return (
    <>
      {/* Mission */}
      <section style={{ paddingBlock: 'var(--section-pad-y)' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
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
            About
          </p>
          <h1 style={{ marginBottom: '1.5rem' }}>The mission</h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.15rem',
              lineHeight: 1.8,
              opacity: 0.75,
              maxWidth: '60ch',
              marginBottom: '1.25rem',
            }}
          >
            GTM India exists to build a practitioner-led go-to-market community in India -
            a space where sales engineers, presales professionals, AEs, and GTM leaders
            can learn from each other, share real experiences, and raise the collective standard.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.15rem',
              lineHeight: 1.8,
              opacity: 0.75,
              maxWidth: '60ch',
            }}
          >
            Run by practitioners for practitioners.
            It is an initiative of{' '}
            <a
              href="https://gtmsolutions.co"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}
            >
              GTM Solutions Consulting
            </a>.
          </p>
        </div>
      </section>

      {/* People */}
      <section
        style={{
          paddingBlock: 'var(--section-pad-y)',
          background: 'var(--color-lightest)',
        }}
      >
        <div className="container">
          <h2 style={{ marginBottom: '3rem' }}>The people behind it</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
              gap: '2rem',
            }}
          >
            <PersonCard
              name="Nikhil Sarma"
              role="Founder, GTM Solutions Consulting"
              bio="Nikhil is a GTM coach and consultant focused on decision confidence, value discovery, storytelling, and negotiation. He started Presales India in 2024 and continues to grow the community across India."
              linkedIn="https://linkedin.com/in/nikhilsarma"
            />
            <PersonCard
              name="Utkarsh Banwar"
              role="Co-organiser, GTM India"
              bio="[Placeholder - add Utkarsh Banwar's bio here.]"
              linkedIn="#"
              isPlaceholder
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ paddingBlock: 'var(--section-pad-y)' }}>
        <div className="container" style={{ maxWidth: '640px', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '1rem' }}>Come to an event</h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              opacity: 0.65,
              marginBottom: '2rem',
            }}
          >
            The best way to understand what this community is about is to show up.
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

/* ── PersonCard ── */

function PersonCard({
  name,
  role,
  bio,
  linkedIn,
  isPlaceholder = false,
}: {
  name: string
  role: string
  bio: string
  linkedIn: string
  isPlaceholder?: boolean
}) {
  return (
    <div
      style={{
        background: 'var(--color-white)',
        border: '1px solid var(--color-linen)',
        borderRadius: '0.75rem',
        padding: '2rem',
        opacity: isPlaceholder ? 0.6 : 1,
      }}
    >
      {/* Avatar placeholder */}
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'var(--color-primary-mid)',
          marginBottom: '1.25rem',
        }}
      />
      <h3 style={{ fontSize: '1.4rem', marginBottom: '0.25rem' }}>{name}</h3>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.85rem',
          opacity: 0.55,
          marginBottom: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
        }}
      >
        {role}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.95rem',
          lineHeight: 1.7,
          opacity: 0.75,
          marginBottom: '1.25rem',
        }}
      >
        {bio}
      </p>
      {linkedIn !== '#' && (
        <a
          href={linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            color: 'var(--color-primary)',
            textDecoration: 'none',
            fontWeight: 500,
          }}
        >
          LinkedIn -&gt;
        </a>
      )}
    </div>
  )
}
