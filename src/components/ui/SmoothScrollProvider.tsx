'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export function SmoothScrollProvider() {
  useEffect(() => {
    // Desktop only - skip on touch devices (mirrors GTMSolutions pattern)
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    if (isTouch) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    // Expose on window for ScrollButton / ScrollToContact components
    ;(window as Window & { __lenis?: Lenis }).__lenis = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      ;(window as Window & { __lenis?: Lenis }).__lenis = undefined
    }
  }, [])

  return null
}
