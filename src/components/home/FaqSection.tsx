import Link from 'next/link'
import { Accordion } from '@/components/ui/Accordion'

const faqItems = [
  {
    question: 'Who can attend?',
    answer: (
      <p>
        Anyone working in or adjacent to GTM - Sales, Presales, GTM leaders, Founders. We don&apos;t gate by company or seniority. If
        you&apos;re curious about the craft, you&apos;re welcome.
      </p>
    ),
  },
  {
    question: 'What do virtual events look like?',
    answer: (
      <p>
        Typically 60 minutes. A short framing talk by a practitioner, then about 30 minutes of discussion and/or exercises. The intention is always to give attendees practical advice that they can apply immediately.
      </p>
    ),
  },
  {
    question: 'What do in-person events look like?',
    answer: (
      <p>
        Usually about 2-3 hours long, typically with a panel discussion and a workshop component. All GTM India events aim to give you something practical that you can apply immediately.
      </p>
    ),
  },
  {
    question: 'How much do I need to pay to attend?',
    answer: (
      <p>
       Nothing. Attendance is free. 
      </p>
    ),
  },
  {
    question: 'Am I going to go hungry at in-person events',
    answer: (
      <p>
       Not on our watch! You'll have snacks, water, coffee and tea!
      </p>
    ),
  },
  {
    question: 'How do I sign up?',
    answer: (
      <p>
        Pick an event from the{' '}
        <Link href="/events">events page</Link> and RSVP on Luma.
      </p>
    ),
  },
  {
    question: 'Can I speak or host in my city?',
    answer: (
      <p>
        Yes! We&apos;re always looking for practitioners with a story to tell,
        and for hosts in new cities. Drop us a note on LinkedIn.
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
