import type { Metadata } from 'next'
import { HeroSection }       from '@/components/home/HeroSection'
import { BlurbSection }      from '@/components/home/BlurbSection'
import { EventsSection }     from '@/components/home/EventsSection'
import { NextEventSection }  from '@/components/home/NextEventSection'
import { ProgrammesSection } from '@/components/home/ProgrammesSection'
import { PastEventsSection } from '@/components/home/PastEventsSection'
import { FaqSection }        from '@/components/home/FaqSection'
import { CtaBannerSection }  from '@/components/home/CtaBannerSection'
import PhotosSection from "@/components/home/PhotosSection";
import ImpressionsSection from "@/components/home/ImpressionsSection"
import { getUpcomingEvents, getPastEvents } from '@/lib/events'

export const metadata: Metadata = {
  title: 'GTM India — Building India\'s GTM community',
  description:
    'GTM India and Presales India bring together sales engineers, presales professionals, and go-to-market leaders through virtual and in-person events across India.',
}

export default function HomePage() {
  const upcoming = getUpcomingEvents()
  const past = getPastEvents()

  return (
    <>
      <HeroSection />
      <ImpressionsSection />
      <BlurbSection />
      <NextEventSection upcoming={upcoming} />
      <PastEventsSection events={past} />
      <ProgrammesSection />
      <FaqSection />
      <CtaBannerSection />
    </>
  )
}