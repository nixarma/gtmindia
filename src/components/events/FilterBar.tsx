import type { EventFormat } from '@/types/event'
import { ALL_FORMATS } from '@/lib/eventConstants'

interface FilterBarProps {
  format: EventFormat | 'all'
  city: string
  onFormatChange: (f: EventFormat | 'all') => void
  onCityChange: (c: string) => void
  sticky?: boolean
}

const formatLabels: Record<EventFormat | 'all', string> = {
  all:         'All formats',
  virtual:     'Virtual',
  'in-person': 'In-person',
}

const CITIES = [
  { value: 'Bengaluru',     label: 'BLR' },
  { value: 'Mumbai',        label: 'BOM' },
  { value: 'Delhi NCR', label: 'DEL' },
  { value: 'Hyderabad',     label: 'HYD' },
] as const

export function FilterBar({
  format,
  city,
  onFormatChange,
  onCityChange,
  sticky = false,
}: FilterBarProps) {
  const cityDisabled = format === 'virtual'

  return (
    <div className={`filters${sticky ? ' filters--sticky' : ''}`}>
      <div className="filters__inner">

        {/* Format group */}
        <div className="filters__group">
          <span className="filters__label">Format</span>
          <div className="filters__pills">
            {(['all', ...ALL_FORMATS] as (EventFormat | 'all')[]).map((f) => (
              <button
                key={f}
                type="button"
                className={`filter-pill${format === f ? ' filter-pill--active' : ''}`}
                onClick={() => {
                  onFormatChange(f)
                  if (f === 'virtual') onCityChange('all')
                }}
                aria-pressed={format === f}
              >
                {formatLabels[f]}
              </button>
            ))}
          </div>
        </div>

        {/* City group */}
        <div className={`filters__group${cityDisabled ? ' filters__group--disabled' : ''}`}>
          <span className="filters__label">City</span>
          <div className="filters__pills">
            <button
              type="button"
              className={`filter-pill${city === 'all' ? ' filter-pill--active' : ''}`}
              onClick={() => onCityChange('all')}
              aria-pressed={city === 'all'}
              disabled={cityDisabled}
              aria-disabled={cityDisabled}
            >
              All
            </button>
            {CITIES.map((c) => (
              <button
                key={c.value}
                type="button"
                className={`filter-pill${city === c.value ? ' filter-pill--active' : ''}`}
                onClick={() => onCityChange(c.value)}
                aria-pressed={city === c.value}
                disabled={cityDisabled}
                aria-disabled={cityDisabled}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}