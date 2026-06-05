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
              role="Founder, GTM India"
              bio={
               <>
                <p>I'm a firm believer that as knowledge workers our learning accelerates outside our company bubbles and few things give me greater joy than bringing GTM professionals together to learn and grow together.</p>
                <p>I started Germany's longest running Presales meetup in Berlin in 2022, and launched Presales India in March 2024.</p>
                <p>What started as a 4-person meetup in Hyderabad has now grown into the thriving pan-India community that is now <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>GTM India.</em></p>
                <p>I'm thrilled to have had Utkarsh bring his energy into organizing and spreading the word since January 2025. </p>
                <p>Through <a href="https://www.gtmsolutions.co" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>GTM Solutions Consulting</a>, I coach frontline revenue-generating teams at B2B SaaS companies on guiding buyers towards confident and timely purchasing decisions.</p>
                <p>I do this through a deep focus on Value Discovery, Storytelling, Value Demonstration, and Business Acumen.</p>
               </> 
              }
              photo="/images/nikhil-headshot.jpg"
              linkedIn="https://linkedin.com/in/nikhilsarma"
              objectPosition="70% 45%"
            />
            <PersonCard
              name="Utkarsh Banwar"
              role="Community Lead, GTM India"
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
        gridTemplateColumns: 'clamp(180px, 25%, 320px) 1fr',
        alignItems: 'center',
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
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="16"
            height="16"
            aria-hidden="true"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          LinkedIn
        </a>
      </div>
    </div>
  )
}