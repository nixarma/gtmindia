import type { Metadata } from 'next'
import { HeroSection }       from '@/components/home/HeroSection'
import { BlurbSection }      from '@/components/home/BlurbSection'
import { EventsSection }     from '@/components/home/EventsSection'
import { NextEventSection }  from '@/components/home/NextEventSection'
import { ProgrammesSection } from '@/components/home/ProgrammesSection'
import { PastEventsSection } from '@/components/home/PastEventsSection'
import { FaqSection }        from '@/components/home/FaqSection'
import { CtaBannerSection }  from '@/components/home/CtaBannerSection'

export const metadata: Metadata = {
  title: 'GTM India — Building India\'s GTM community',
  description:
    'GTM India and Presales India bring together sales engineers, presales professionals, and go-to-market leaders through virtual and in-person events across India.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BlurbSection />
      <NextEventSection />
      <ProgrammesSection />
      <PastEventsSection />
      <FaqSection />
      <CtaBannerSection />
    </>
  )
}