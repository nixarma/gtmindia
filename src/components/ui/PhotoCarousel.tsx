'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'

interface PhotoCarouselProps {
  images: string[]         // array of paths e.g. ['/images/bangalore-may-2025/01.jpg']
  alt?: string             // base alt text — index is appended automatically
  aspectRatio?: string     // tailwind aspect class, defaults to 'aspect-[16/10]'
  className?: string
}

export default function PhotoCarousel({
  images,
  alt = 'Event photo',
  aspectRatio = 'aspect-[16/10]',
  className = '',
}: PhotoCarouselProps) {
  const [current, setCurrent] = useState(0)

  const prev = useCallback(() => {
    setCurrent(i => (i - 1 + images.length) % images.length)
  }, [images.length])

  const next = useCallback(() => {
    setCurrent(i => (i + 1) % images.length)
  }, [images.length])

  if (!images || images.length === 0) {
    return (
      <div className={`${aspectRatio} w-full rounded-2xl bg-[#DDDCDB] ${className}`} />
    )
  }

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl bg-[#DDDCDB] ${aspectRatio} ${className}`}>

      {/* Photos */}
      {images.map((src, index) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: index === current ? 1 : 0 }}
          aria-hidden={index !== current}
        >
          <Image
            src={src}
            alt={`${alt} ${index + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 90vw"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Only render arrows when there is more than one image */}
      {images.length > 1 && (
        <>
          {/* Left arrow */}
          <button
            onClick={prev}
            aria-label="Previous photo"
            className="
              group absolute left-4 top-1/2 -translate-y-1/2 z-10
              flex h-9 w-9 items-center justify-center
              rounded-full bg-white/20 backdrop-blur-sm
              border border-white/30
              transition-all duration-200
              hover:bg-white/40
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60
            "
          >
            <ChevronLeft className="h-4 w-4 text-white transition-transform duration-200 group-hover:-translate-x-0.5" />
          </button>

          {/* Right arrow */}
          <button
            onClick={next}
            aria-label="Next photo"
            className="
              group absolute right-4 top-1/2 -translate-y-1/2 z-10
              flex h-9 w-9 items-center justify-center
              rounded-full bg-white/20 backdrop-blur-sm
              border border-white/30
              transition-all duration-200
              hover:bg-white/40
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60
            "
          >
            <ChevronRight className="h-4 w-4 text-white transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                aria-label={`Go to photo ${index + 1}`}
                className="
                  h-1.5 rounded-full bg-white transition-all duration-300
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60
                "
                style={{ width: index === current ? '20px' : '6px', opacity: index === current ? 1 : 0.5 }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// Inline SVG chevrons — no icon library dependency
function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}