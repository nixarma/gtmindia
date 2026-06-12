'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  { href: '/events',         label: 'Events' },
  { href: '/presales-india', label: 'Presales India' },
  { href: '/about',          label: 'About' },
]

const WHATSAPP_URL = 'https://chat.whatsapp.com/FZQTMFdJfB9HVW3WywBm38'

export function Nav() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="nav">
      <div className="container nav__inner">
        <Link href="/" className="wm" aria-label="GTM India — Home">
          GTM <em>India</em>
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="nav__link"
              aria-current={pathname === href ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}
          <a
            href={WHATSAPP_URL}
            className="nav__link"
            target="_blank"
            rel="noopener"
          >
            Join on WhatsApp
          </a>
          <Link href="/events" className="nav__cta">
            See upcoming events
          </Link>
        </nav>

        <button
          className={`nav__burger${menuOpen ? ' is-open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`nav__menu${menuOpen ? ' is-open' : ''}`}
      >
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="nav__link"
            aria-current={pathname === href ? 'page' : undefined}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </Link>
        ))}
        <a
          href={WHATSAPP_URL}
          className="nav__link"
          target="_blank"
          rel="noopener"
          onClick={() => setMenuOpen(false)}
        >
          Join WhatsApp
        </a>
        <Link
          href="/events"
          className="nav__cta"
          style={{ alignSelf: 'flex-start' }}
          onClick={() => setMenuOpen(false)}
        >
          See upcoming events
        </Link>
      </div>
    </header>
  )
}