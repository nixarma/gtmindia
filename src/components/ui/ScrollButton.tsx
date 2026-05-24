"use client";

/**
 * ScrollButton
 *
 * Scrolls to any element by selector string using the Lenis-first pattern.
 * - If Lenis is mounted (window.__lenis is set), calls lenis.scrollTo() directly.
 * - If Lenis is not yet mounted (rare edge case on slow hydration), uses a double
 *   requestAnimationFrame to wait for it before scrolling.
 *
 * IMPORTANT: Never use scrollIntoView() or anchor href="#id" — Lenis cancels
 * native scroll methods, causing a multi-click bug where the first click does
 * nothing. Always go through this component or ScrollToContact.
 *
 * Usage:
 *   <ScrollButton target="#presales-india" className="...">
 *     Presales India
 *   </ScrollButton>
 */

import { type ReactNode, type MouseEvent } from "react";

interface ScrollButtonProps {
  /** CSS selector for the target element, e.g. "#events" or ".hero" */
  target: string;
  className?: string;
  children: ReactNode;
  /** Pixel offset from the top of the target element (default: 0) */
  offset?: number;
}

export function ScrollButton({
  target,
  className,
  children,
  offset = 0,
}: ScrollButtonProps) {
  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const el = document.querySelector(target);
    if (!el) return;

    function doScroll() {
      const lenis = (window as Window & { __lenis?: { scrollTo: (target: Element, options?: object) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(el as Element, { offset });
      } else {
        // Lenis not yet mounted — double rAF to wait for it
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const lenisRetry = (window as Window & { __lenis?: { scrollTo: (target: Element, options?: object) => void } }).__lenis;
            if (lenisRetry) {
              lenisRetry.scrollTo(el as Element, { offset });
            } else {
              // Final fallback: native scroll (Lenis never mounted, e.g. touch device)
              (el as Element).scrollIntoView({ behavior: "smooth" });
            }
          });
        });
      }
    }

    doScroll();
  }

  return (
    <button type="button" className={className} onClick={handleClick}>
      {children}
    </button>
  );
}