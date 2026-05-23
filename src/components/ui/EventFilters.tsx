'use client'

import { useState, useMemo } from 'react'
import { EventCard } from '@/components/ui/EventCard'
import type { Event, EventCommunity, EventFormat } from '@/types/event'

interface EventFiltersProps {
  events: Event[]
}

type StatusFilter = 'all' | 'upcoming' | 'past'

export function EventFilters({ events }: EventFiltersProps) {
  const [status,    setStatus]    = useState<StatusFilter>('upcoming')
  const [community, setCommunity] = useState<EventCommunity | 'all'>('all')
  const [format,    setFormat]    = useState<EventFormat | 'all'>('all')

  const filtered = useMemo(() => {
    return events.filter(e => {
      if (status    !== 'all' && e.status    !== status)    return false
      if (community !== 'all' && e.community !== community) return false
      if (format    !== 'all' && e.format    !== format)    return false
      return true
    })
  }, [events, status, community, format])

  return (
    <div>
      {/* Filter bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          marginBottom: '2.5rem',
        }}
      >
        <FilterGroup label="Show">
          {(['upcoming', 'past', 'all'] as StatusFilter[]).map(v => (
            <FilterChip key={v} active={status === v} onClick={() => setStatus(v)}>
              {v === 'all' ? 'All' : v.charAt(0).toUpperCase() + v.slice(1)}
            </FilterChip>
          ))}
        </FilterGroup>

        <FilterGroup label="Community">
          {(['all', 'presales-india', 'gtm-india'] as const).map(v => (
            <FilterChip key={v} active={community === v} onClick={() => setCommunity(v)}>
              {v === 'all' ? 'All' : v === 'presales-india' ? 'Presales India' : 'GTM India'}
            </FilterChip>
          ))}
        </FilterGroup>

        <FilterGroup label="Format">
          {(['all', 'virtual', 'in-person'] as const).map(v => (
            <FilterChip key={v} active={format === v} onClick={() => setFormat(v)}>
              {v === 'all' ? 'All' : v.charAt(0).toUpperCase() + v.slice(1)}
            </FilterChip>
          ))}
        </FilterGroup>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p style={{ fontFamily: 'var(--font-body)', opacity: 0.5, fontSize: '1rem' }}>
          No events match the selected filters.
        </p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
            gap: '1.5rem',
          }}
        >
          {filtered.map(event => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Primitives ── */

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', opacity: 0.5, marginRight: '0.25rem' }}>
        {label}:
      </span>
      {children}
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.8rem',
        fontWeight: active ? 500 : 400,
        padding: '0.35rem 0.85rem',
        borderRadius: '999px',
        border: `1px solid ${active ? 'var(--color-primary)' : 'var(--color-lightest)'}`,
        background: active ? 'var(--color-primary)' : 'transparent',
        color: active ? 'var(--color-white)' : 'var(--color-ink)',
        cursor: 'pointer',
        transition: 'all 0.15s',
      }}
    >
      {children}
    </button>
  )
}
