'use client'

import { useEffect, useRef } from 'react'

export function CtaBannerSection() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Remove any previously injected script to avoid duplicates on hot reload
    const existing = document.querySelector(
      'script[src*="subscribe-forms.beehiiv.com"]'
    )
    if (existing) existing.remove()

    const script = document.createElement('script')
    script.src = 'https://subscribe-forms.beehiiv.com/v3/loader.js'
    script.async = true
    script.setAttribute(
      'data-beehiiv-form',
      '363345a1-5540-48d0-83d9-2525a09360e6'
    )

    mountRef.current.appendChild(script)
  }, [])

  return (
    <section className="cta-banner">
      <div className="container">
        <h2 className="cta-banner__title">
          Stay current with <em>GTM India</em>
        </h2>
        <p className="cta-banner__sub">
          Events, conversations, and ideas from the GTM India community —
          delivered monthly.
        </p>
        <div ref={mountRef} className="beehiiv-embed" />
      </div>
    </section>
  )
}