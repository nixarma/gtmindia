'use client'

import { useCallback } from 'react'
import type Lenis from 'lenis'

interface ScrollButtonProps {
  targetId: string
  children: React.ReactNode
  className?: string
}

export function ScrollButton({ targetId, children, className }: ScrollButtonProps) {
  const handleClick = useCallback(() => {
    const el = document.getElementById(targetId)
    if (!el) return

    const lenis = (window as Window & { __lenis?: Lenis }).__lenis

    if (lenis) {
      lenis.scrollTo(el)
    } else {
      // Lenis not yet mounted - wait for it
      let attempts = 0
      const wait = () => {
        const l = (window as Window & { __lenis?: Lenis }).__lenis
        if (l) {
          l.scrollTo(el)
        } else if (attempts < 10) {
          attempts++
          requestAnimationFrame(wait)
        }
      }
      requestAnimationFrame(wait)
    }
  }, [targetId])

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  )
}
