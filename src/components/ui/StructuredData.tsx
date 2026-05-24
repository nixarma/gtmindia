// Drop <StructuredData /> into your root layout, inside <head> or at the top of <body>.
// Pass `events` from your data layer when rendering pages that list upcoming events.

const BASE_URL = 'https://gtmindia.co'

interface EventData {
  name: string
  description?: string
  startDate: string        // ISO 8601, e.g. '2025-09-15'
  endDate?: string
  location: string         // city name
  url?: string
  format?: 'in-person' | 'virtual' | 'hybrid'
}

interface StructuredDataProps {
  events?: EventData[]
}

export function StructuredData({ events = [] }: StructuredDataProps) {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: 'GTM India',
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/logo.png`,
    },
    description:
      'A practitioner-led sales and go-to-market community for B2B professionals across India.',
    foundingLocation: {
      '@type': 'Place',
      addressCountry: 'IN',
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    sameAs: [
      // Add LinkedIn, Twitter etc. when available
    ],
  }

  const eventSchemas = events.map((ev) => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: ev.name,
    description: ev.description ?? `A GTM India event in ${ev.location}.`,
    startDate: ev.startDate,
    ...(ev.endDate ? { endDate: ev.endDate } : {}),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode:
      ev.format === 'virtual'
        ? 'https://schema.org/OnlineEventAttendanceMode'
        : ev.format === 'hybrid'
        ? 'https://schema.org/MixedEventAttendanceMode'
        : 'https://schema.org/OfflineEventAttendanceMode',
    location:
      ev.format === 'virtual'
        ? {
            '@type': 'VirtualLocation',
            url: ev.url ?? BASE_URL,
          }
        : {
            '@type': 'Place',
            name: ev.location,
            address: {
              '@type': 'PostalAddress',
              addressLocality: ev.location,
              addressCountry: 'IN',
            },
          },
    organizer: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'GTM India',
      url: BASE_URL,
    },
    ...(ev.url ? { url: ev.url } : {}),
  }))

  const schemas = [organization, ...eventSchemas]

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}