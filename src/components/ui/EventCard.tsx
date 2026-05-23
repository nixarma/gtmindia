import type { Event } from '@/types/event'

interface EventCardProps {
  event: Event
}

const communityLabel: Record<string, string> = {
  'presales-india': 'Presales India',
  'gtm-india':      'GTM India',
}

const formatLabel: Record<string, string> = {
  virtual:    'Virtual',
  'in-person': 'In-person',
}

export function EventCard({ event }: EventCardProps) {
  const dateObj = new Date(event.date)
  const day     = dateObj.toLocaleDateString('en-IN', { day: '2-digit' })
  const month   = dateObj.toLocaleDateString('en-IN', { month: 'short' }).toUpperCase()
  const year    = dateObj.getFullYear()

  const isSelf = event.series === 'self'

  return (
    <article
      style={{
        border: '1px solid var(--color-lightest)',
        borderRadius: '0.75rem',
        padding: '1.5rem',
        background: event.status === 'past'
          ? 'var(--color-lightest)'
          : 'var(--color-white)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        opacity: event.status === 'past' ? 0.7 : 1,
        transition: 'box-shadow 0.2s',
      }}
    >
      {/* Date + badges row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
        {/* Date block */}
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 500, color: 'var(--color-primary)' }}>
            {day}
          </span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', letterSpacing: '0.08em', color: 'var(--color-ink)', opacity: 0.6 }}>
            {month} {year}
          </span>
        </div>

        {/* Badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          <Badge label={communityLabel[event.community]} variant="community" />
          <Badge label={formatLabel[event.format]} variant="format" />
          {isSelf && <Badge label="SELF" variant="self" />}
          {event.format === 'in-person' && event.city && (
            <Badge label={event.city} variant="city" />
          )}
        </div>
      </div>

      {/* Title + time */}
      <div>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.4rem',
            fontWeight: 500,
            color: 'var(--color-ink)',
            marginBottom: '0.25rem',
          }}
        >
          {event.title}
        </h3>
        {event.time && (
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', opacity: 0.6 }}>
            {event.time}
          </p>
        )}
      </div>

      {/* Description */}
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', lineHeight: 1.6, opacity: 0.8, flexGrow: 1 }}>
        {event.description}
      </p>

      {/* CTA */}
      {event.status === 'upcoming' && (
        <a
          href={event.lumaUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            alignSelf: 'flex-start',
            padding: '0.6rem 1.25rem',
            background: 'var(--color-primary)',
            color: 'var(--color-white)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            fontWeight: 500,
            borderRadius: '0.375rem',
            textDecoration: 'none',
            transition: 'background 0.2s',
          }}
        >
          Register on Luma
        </a>
      )}
    </article>
  )
}

/* ── Badge ── */

interface BadgeProps {
  label: string
  variant: 'community' | 'format' | 'self' | 'city'
}

function Badge({ label, variant }: BadgeProps) {
  const styles: Record<string, React.CSSProperties> = {
    community: { background: 'var(--color-primary-light)', color: 'var(--color-primary-dark)' },
    format:    { background: 'var(--color-linen)',          color: 'var(--color-ink)' },
    self:      { background: 'var(--color-secondary-light)', color: 'var(--color-secondary-dark)' },
    city:      { background: 'var(--color-lightest)',        color: 'var(--color-ink)' },
  }

  return (
    <span
      style={{
        ...styles[variant],
        fontFamily: 'var(--font-body)',
        fontSize: '0.72rem',
        fontWeight: 500,
        letterSpacing: '0.04em',
        padding: '0.2rem 0.6rem',
        borderRadius: '999px',
        textTransform: 'uppercase',
      }}
    >
      {label}
    </span>
  )
}
