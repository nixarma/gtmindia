import type { Metadata } from 'next'
import { HeroSection }       from '@/components/home/HeroSection'
import { BlurbSection }      from '@/components/home/BlurbSection'
import { NextEventSection }  from '@/components/home/NextEventSection'
import { ProgramsSection } from '@/components/home/ProgramsSection'
import { PastEventsSection } from '@/components/home/PastEventsSection'
import { FaqSection }        from '@/components/home/FaqSection'
import { CtaBannerSection }  from '@/components/home/CtaBannerSection'
import ImpressionsSection    from '@/components/home/ImpressionsSection'
import { getUpcomingEvents } from '@/lib/events'

export const metadata: Metadata = {
  title: 'GTM India — Building India\'s GTM community',
  description:
    'GTM India and Presales India bring together sales engineers, presales professionals, and go-to-market leaders through virtual and in-person events across India.',
}

export default function HomePage() {
  const upcoming = getUpcomingEvents()

  return (
    <>
      <HeroSection />
      <ImpressionsSection />
      <BlurbSection />
      <NextEventSection upcoming={upcoming} />
      <PastEventsSection />
      <ProgramsSection />
      <FaqSection />
      <CtaBannerSection />
    </>
  )
}