"use client";

/**
 * Accordion / FAQ component
 *
 * Implements the GTM India FAQ accordion using the native <details>/<summary>
 * element pair with a CSS grid-template-rows animation — matching the design
 * system pattern exactly (no external accordion library needed).
 *
 * The animation works via:
 *   .faq__answer  { display: grid; grid-template-rows: 0fr; transition: ... }
 *   [open] .faq__answer { grid-template-rows: 1fr; }
 *
 * This is a controlled component — only one item can be open at a time.
 * To allow multiple open simultaneously, remove the `openIndex` state and
 * manage open state per-item independently.
 *
 * Usage:
 *   <Accordion items={faqItems} />
 *
 * Where faqItems = Array<{ question: string; answer: ReactNode }>
 */

import { useState, useRef, type ReactNode } from "react";

interface AccordionItem {
  question: string;
  answer: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Allow multiple items open simultaneously (default: false = single open) */
  allowMultiple?: boolean;
}

export function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set([0]));

  function toggle(index: number) {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        if (!allowMultiple) next.clear();
        next.add(index);
      }
      return next;
    });
  }

  return (
    <div className="faq__list">
      {items.map((item, index) => {
        const isOpen = openIndices.has(index);
        const num = String(index + 1).padStart(2, "0");

        return (
          <details
            key={index}
            className="faq__item"
            open={isOpen}
            // Prevent native toggle — we control state ourselves so the
            // CSS animation works correctly via the `open` attribute.
            onToggle={(e) => e.preventDefault()}
          >
            <summary
              className="faq__btn"
              aria-expanded={isOpen}
              onClick={(e) => {
                e.preventDefault();
                toggle(index);
              }}
            >
              <span className="faq__num">{num}</span>
              <span className="faq__q">{item.question}</span>
              <span className="faq__toggle" aria-hidden="true" />
            </summary>

            <div className="faq__answer">
              <div className="faq__answer-inner">{item.answer}</div>
            </div>
          </details>
        );
      })}
    </div>
  );
}

/**
 * AccordionItem — lower-level building block if you prefer composing
 * individual items rather than passing an array.
 *
 * Usage:
 *   <AccordionItem num="01" question="Who can attend?" defaultOpen>
 *     <p>Anyone working in or adjacent to GTM...</p>
 *   </AccordionItem>
 */

interface AccordionItemProps {
  num: string;
  question: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function AccordionItem({
  num,
  question,
  children,
  defaultOpen = false,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <details
      className="faq__item"
      open={isOpen}
      onToggle={(e) => e.preventDefault()}
    >
      <summary
        className="faq__btn"
        aria-expanded={isOpen}
        onClick={(e) => {
          e.preventDefault();
          setIsOpen((v) => !v);
        }}
      >
        <span className="faq__num">{num}</span>
        <span className="faq__q">{question}</span>
        <span className="faq__toggle" aria-hidden="true" />
      </summary>

      <div className="faq__answer">
        <div className="faq__answer-inner">{children}</div>
      </div>
    </details>
  );
}