import type { Metadata, Viewport } from 'next'

const BASE_URL = 'https://gtmindia.co'

export const viewport: Viewport = {
  themeColor: '#9E3A26',
  width: 'device-width',
  initialScale: 1,
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: 'GTM India — Sales & GTM community for India',
    template: '%s · GTM India',
  },

  description:
    'GTM India is a practitioner-led sales and go-to-market community for B2B professionals across Bengaluru, Mumbai, Hyderabad and Delhi NCR. Events, programs, and peer learning — no theory, no fluff.',

  keywords: [
    'GTM India',
    'sales community India',
    'go-to-market India',
    'B2B sales India',
    'presales India',
    'GTM community Bengaluru',
    'GTM community Mumbai',
    'sales enablement India',
  ],

  authors: [{ name: 'GTM India', url: BASE_URL }],
  creator: 'GTM India',
  publisher: 'GTM India',

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: BASE_URL,
    siteName: 'GTM India',
    title: 'GTM India — Sales & GTM community for India',
    description:
      'Practitioner-led events and programs for B2B sales and GTM professionals across India.',
    images: [
      {
        url: '/og-image.png',   // add a 1200×630 image to /public/
        width: 1200,
        height: 630,
        alt: 'GTM India',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'GTM India — Sales & GTM community for India',
    description:
      'Practitioner-led events and programs for B2B sales and GTM professionals across India.',
    images: ['/og-image.png'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: BASE_URL,
  },
}