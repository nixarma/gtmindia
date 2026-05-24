import Link from 'next/link'
import { Accordion } from '@/components/ui/Accordion'

const faqItems = [
  {
    question: 'Who can attend?',
    answer: (
      <p>
        Anyone working in or adjacent to GTM — sales engineers, presales, AEs,
        GTM leaders, founders. We don&apos;t gate by company or seniority. If
        you&apos;re curious about the craft, you&apos;re welcome.
      </p>
    ),
  },
  {
    question: 'What does a typical event look like?',
    answer: (
      <p>
        A short framing talk by a practitioner, then 60-90 minutes of open
        conversation on the topic. We keep rooms intentionally small — usually
        20 to 40 people — so it&apos;s a real conversation, not a webinar.
      </p>
    ),
  },
  {
    question: 'Is there a cost?',
    answer: (
      <p>
        No. The community is non-commercial — an initiative by GTM Solutions
        Consulting. No sponsor pitches, no badge scanning, no upsell.
      </p>
    ),
  },
  {
    question: 'How do I sign up?',
    answer: (
      <p>
        Pick an event from the{' '}
        <Link href="/events">events page</Link> and RSVP on Luma. In-person
        events fill quickly — RSVP early. For SELF (leadership track), reach
        out directly.
      </p>
    ),
  },
  {
    question: 'Can I speak or host in my city?',
    answer: (
      <p>
        Yes — we&apos;re always looking for practitioners with a story to tell,
        and for hosts in new cities. Drop us a note on LinkedIn or via{' '}
        <a href="https://gtmsolutions.co" target="_blank" rel="noopener">
          gtmsolutions.co
        </a>
        .
      </p>
    ),
  },
]

export function FaqSection() {
  return (
    <section className="faq">
      <div className="container">
        <div className="faq__layout">
          <h2 className="faq__title">
            Common <em>questions.</em>
          </h2>
          <Accordion items={faqItems} />
        </div>
      </div>
    </section>
  )
}
