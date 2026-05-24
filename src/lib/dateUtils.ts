/**
 * Format an ISO 8601 date string for display.
 * e.g. '2025-07-19T18:30:00+05:30' -> 'Sat, 19 July 2025 · 6:30 PM IST'
 */
export function formatEventDate(iso: string): string {
    const date = new Date(iso)
    const dateStr = date.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Kolkata',
    })
    const timeStr = date
      .toLocaleTimeString('en-IN', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata',
      })
      .toUpperCase()
    return `${dateStr} · ${timeStr} IST`
  }