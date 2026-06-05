import type { Metadata } from 'next'
import Image from 'next/image'
import { CtaBannerSection } from '@/components/home/CtaBannerSection'

export const metadata: Metadata = {
  title: 'About',
  description: 'The people behind GTM India.',
}

export default function AboutPage() {
  return (
    <>
      {/* People */}
      <section style={{ paddingBlock: 'var(--section-pad-y)', background: 'var(--bg-surface)' }}>
        <div className="container">
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--fg-muted)',
              marginBottom: '0.75rem',
            }}
          >
            About
          </p>
          <h1 style={{ marginBottom: '3rem' }}>The people behind it</h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <PersonCard
              name="Nikhil Sarma"
              role="Founder, GTM Solutions Consulting"
              bio={
               <>
                <p>I coach teams reporting to CROs, VPs of Sales, and SE leaders at B2B SaaS companies to guide buyers towards confident and timely purchasing decisions.</p>
                <p> I do this through a deep focus on Value Discovery, Storytelling, Value Demonstration, and Business Acumen.</p>
               </> 
              }
              photo="/images/nikhil-headshot.jpg"
              linkedIn="https://linkedin.com/in/nikhilsarma"
              objectPosition="70% 45%"
            />
            <PersonCard
              name="Utkarsh Banwar"
              role="Co-organiser, GTM India"
              bio={
                <>
                  <p>I currently work at Netscribes as a Senior Manager &ndash; Presales, bringing over 8 years of experience across diverse industries in the presales and GTM space.</p>
                  <p>I&apos;m passionate about building strong presales and GTM communities that enable professionals to network, collaborate, and continuously learn.</p>
                  <p>My focus is on helping people step outside their work bubbles, gain broader industry perspectives, and develop the core skills needed to excel in their roles.</p>
                </>
              }
              photo="/images/utkarsh-headshot.jpeg"
              linkedIn="https://linkedin.com/in/utkarsh-banwar"
              objectPosition="50% 20%"
            />
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <CtaBannerSection />
    </>
  )
}

/* ── PersonCard ── */

function PersonCard({
  name,
  role,
  bio,
  photo,
  linkedIn,
  objectPosition = 'center center',
}: {
  name: string
  role: string
  bio: React.ReactNode
  photo: string
  linkedIn: string
  objectPosition?: string
}) {
  return (
    <div
      style={{
        background: 'var(--bg-page)',
        border: '1px solid var(--bg-surface)',
        borderRadius: '0.75rem',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: 'clamp(180px, 28%, 320px) 1fr',
      }}
      className="person-card"
    >
      {/* Headshot */}
      <div style={{ position: 'relative', minHeight: '280px' }}>
        <Image
          src={photo}
          alt={name}
          fill
          style={{ objectFit: 'cover', objectPosition }}
          sizes="(max-width: 640px) 100vw, 320px"
        />
      </div>

      {/* Content */}
      <div style={{ padding: '2rem 2.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{name}</h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8rem',
            color: 'var(--fg-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '1.25rem',
          }}
        >
          {role}
        </p>
        <div
          className="person-card__bio"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.95rem',
            lineHeight: 1.75,
            color: 'var(--fg-body)',
            marginBottom: '1.5rem',
          }}
        >
          {bio}
        </div>
        <a
          href={linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            color: 'var(--accent)',
            textDecoration: 'none',
            fontWeight: 500,
          }}
        >
          LinkedIn &rarr;
        </a>
      </div>
    </div>
  )
}