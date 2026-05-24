import type { EventFormat } from '@/types/event'
import { ALL_CITIES, ALL_FORMATS } from '@/data/events'

interface FilterBarProps {
  format: EventFormat | 'all'
  city: string
  onFormatChange: (f: EventFormat | 'all') => void
  onCityChange: (c: string) => void
  sticky?: boolean
}

const formatLabels: Record<EventFormat | 'all', string> = {
  all:        'All formats',
  virtual:    'Virtual',
  'in-person': 'In-person',
}

export function FilterBar({
  format,
  city,
  onFormatChange,
  onCityChange,
  sticky = false,
}: FilterBarProps) {
  return (
    <div className={`filters${sticky ? ' filters--sticky' : ''}`}>
      <div className="filters__inner">
        <div className="filters__group">
          <span className="filters__label">Format</span>
          {(['all', ...ALL_FORMATS] as (EventFormat | 'all')[]).map((f) => (
            <button
              key={f}
              type="button"
              className={`filter-pill${format === f ? ' filter-pill--active' : ''}`}
              onClick={() => onFormatChange(f)}
              aria-pressed={format === f}
            >
              {formatLabels[f]}
            </button>
          ))}
        </div>

        <div className="filters__group">
          <span className="filters__label">City</span>
          <button
            type="button"
            className={`filter-pill${city === 'all' ? ' filter-pill--active' : ''}`}
            onClick={() => onCityChange('all')}
            aria-pressed={city === 'all'}
          >
            All cities
          </button>
          {ALL_CITIES.map((c) => (
            <button
              key={c}
              type="button"
              className={`filter-pill${city === c ? ' filter-pill--active' : ''}`}
              onClick={() => onCityChange(c)}
              aria-pressed={city === c}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}