import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
}

export default function HomePage() {
  return (
    <section
      style={{
        paddingBlock: 'var(--section-pad-y)',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="container">
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            opacity: 0.5,
            marginBottom: '1.25rem',
          }}
        >
          An initiative by GTM Solutions Consulting
        </p>
        <h1 style={{ maxWidth: '16ch', marginBottom: '1.5rem' }}>
          Building India&apos;s GTM community.
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.1rem',
            maxWidth: '52ch',
            lineHeight: 1.7,
            opacity: 0.75,
            marginBottom: '2.5rem',
          }}
        >
          GTM India and Presales India bring together sales engineers, presales professionals,
          and go-to-market leaders through virtual and in-person events across India.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
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
            See all events
          </Link>
          <Link
            href="/presales-india"
            style={{
              display: 'inline-block',
              padding: '0.75rem 1.75rem',
              border: '1px solid var(--color-lightest)',
              color: 'var(--color-ink)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              fontWeight: 500,
              borderRadius: '0.375rem',
              textDecoration: 'none',
            }}
          >
            About Presales India
          </Link>
        </div>
      </div>
    </section>
  )
}
