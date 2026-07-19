import type { ReactNode, ElementType } from 'react'

interface PullQuoteProps {
  children: ReactNode
  cite?: string
}

interface HeadingProps {
  children: ReactNode
}

export function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/<[^>]+>/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function createHeading(level: 2 | 3 | 4) {
  const Component = `h${level}` as ElementType
  const className = level === 2
    ? 'mt-12 mb-4 scroll-mt-24'
    : level === 3
      ? 'mt-8 mb-3 scroll-mt-24'
      : 'mt-6 mb-2 scroll-mt-24'

  return function Heading({ children }: HeadingProps) {
    const textContent = typeof children === 'string'
      ? children
      : Array.isArray(children)
        ? children.map((child) => (typeof child === 'string' ? child : '')).join('')
        : ''

    const id = slugifyHeading(textContent)

    return <Component id={id} className={className}>{children}</Component>
  }
}

const H2 = createHeading(2)
const H3 = createHeading(3)
const H4 = createHeading(4)

export function PullQuote({ children, cite }: PullQuoteProps) {
  return (
    <blockquote className="my-8 border-l-4 border-[var(--accent)] bg-[var(--bg-surface)] px-6 py-5 sm:px-8 sm:py-6">
      <p className="text-xl font-[family-name:var(--font-serif)] leading-8 text-[var(--fg)] sm:text-2xl">
        {children}
      </p>
      {cite ? (
        <footer className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--sage)]">
          — {cite}
        </footer>
      ) : null}
    </blockquote>
  )
}

interface BlogImageProps {
  src: string
  alt: string
  caption?: string
}

export function BlogImage({ src, alt, caption }: BlogImageProps) {
  return (
    <figure className="my-8 overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--bg-page)]">
      <img src={src} alt={alt} className="h-auto w-full object-cover" loading="lazy" />
      {caption ? (
        <figcaption className="border-t border-[var(--border)] px-4 py-3 text-sm text-[var(--fg-muted)]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}

interface VideoEmbedProps {
  src: string
  title?: string
  aspectRatio?: string
}

export function VideoEmbed({ src, title = 'Embedded video', aspectRatio = '16 / 9' }: VideoEmbedProps) {
  return (
    <div className="my-8 overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--bg-page)] p-2">
      <div style={{ aspectRatio }} className="overflow-hidden rounded-[18px]">
        <iframe
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    </div>
  )
}

export const mdxComponents = {
  PullQuote,
  BlogImage,
  VideoEmbed,
  h2: H2,
  h3: H3,
  h4: H4,
}
