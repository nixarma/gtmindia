'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/events',        label: 'Events' },
  { href: '/presales-india', label: 'Presales India' },
  { href: '/about',         label: 'About' },
]

export function Nav() {
  const pathname = usePathname()

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'var(--color-white)',
        borderBottom: '1px solid var(--color-lightest)',
      }}
    >
      <nav
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBlock: '1rem',
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            fontWeight: 500,
            color: 'var(--color-ink)',
            textDecoration: 'none',
            letterSpacing: '-0.01em',
          }}
        >
          GTM India
        </Link>

        <ul
          style={{
            display: 'flex',
            gap: '2rem',
            listStyle: 'none',
            alignItems: 'center',
          }}
        >
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: pathname === href
                    ? 'var(--color-primary)'
                    : 'var(--color-ink)',
                  textDecoration: 'none',
                  fontWeight: pathname === href ? 500 : 400,
                  opacity: pathname === href ? 1 : 0.75,
                  transition: 'opacity 0.2s, color 0.2s',
                }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
