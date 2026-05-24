import type { Metadata } from 'next'
import { Fraunces, DM_Sans } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { SmoothScrollProvider } from '@/components/ui/SmoothScrollProvider'

const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['opsz', 'wght'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'GTM India',
    template: '%s | GTM India',
  },
  description:
    'GTM India and Presales India - community events for sales engineering, presales, and go-to-market professionals across India.',
  openGraph: {
    siteName: 'GTM India',
    locale: 'en_IN',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body>
        <SmoothScrollProvider />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}