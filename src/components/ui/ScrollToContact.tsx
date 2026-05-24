"use client";

/**
 * ScrollToContact
 *
 * Dedicated scroll component for the #contact section.
 * Follows the same Lenis-first pattern as ScrollButton, kept as a
 * separate component so the contact CTA can be used anywhere without
 * repeating the target string or offset.
 *
 * IMPORTANT: Never use scrollIntoView() or anchor href="#contact" —
 * Lenis cancels native scroll methods, causing the multi-click bug.
 *
 * Usage:
 *   <ScrollToContact className="btn btn--primary">
 *     Get in touch
 *   </ScrollToContact>
 */

import { type ReactNode, type MouseEvent } from "react";

interface ScrollToContactProps {
  className?: string;
  children: ReactNode;
}

export function ScrollToContact({ className, children }: ScrollToContactProps) {
  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const el = document.querySelector("#contact");
    if (!el) return;

    const lenis = (window as Window & { __lenis?: { scrollTo: (target: Element, options?: object) => void } }).__lenis;

    if (lenis) {
      lenis.scrollTo(el as Element);
    } else {
      // Double rAF: wait for Lenis to mount before scrolling
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const lenisRetry = (window as Window & { __lenis?: { scrollTo: (target: Element, options?: object) => void } }).__lenis;
          if (lenisRetry) {
            lenisRetry.scrollTo(el as Element);
          } else {
            // Fallback for touch devices where Lenis is disabled
            (el as Element).scrollIntoView({ behavior: "smooth" });
          }
        });
      });
    }
  }

  return (
    <button type="button" className={className} onClick={handleClick}>
      {children}
    </button>
  );
}