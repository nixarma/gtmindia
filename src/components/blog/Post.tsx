import Link from 'next/link'
import type { Post } from '@/types/post'

interface PostCardProps {
  post: Post
  featured?: boolean
}

function formatPostDate(date: string) {
  if (!date) return ''

  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Kolkata',
  })
}

function getAuthorName(author: Post['author']): string {
  if (typeof author === 'string') return author
  if (Array.isArray(author)) {
    return author.map((entry) => (typeof entry === 'string' ? entry : entry.name)).filter(Boolean).join(', ')
  }
  if (typeof author === 'object' && author !== null) {
    return author.name
  }
  return 'GTM India'
}

export function PostCard({ post, featured = false }: PostCardProps) {
  const postUrl = post.slug ? `/blog/${post.slug}` : '/blog'
  const authorName = getAuthorName(post.author)

  if (featured) {
    return (
      <article className="overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--bg-surface)] shadow-sm">
        <div className="p-8 sm:p-10 lg:p-12">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--sage)]">
            <span>{post.category || 'Perspective'}</span>
            {post.readTime ? <span>• {post.readTime}</span> : null}
          </div>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <p className="text-sm text-[var(--fg-muted)]">{formatPostDate(post.date)}</p>
              <Link href={postUrl} className="mt-3 block">
                <h2 className="text-3xl sm:text-4xl text-[var(--fg)] transition-colors duration-200 hover:text-[var(--accent)]">
                  {post.title}
                </h2>
              </Link>
              <p className="mt-4 max-w-2xl text-lg text-[var(--fg-body)]">{post.description}</p>
            </div>
            <div className="rounded-[24px] border border-[var(--border)] bg-[var(--bg-page)] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--sage)]">Featured</p>
              <p className="mt-4 text-sm text-[var(--fg-muted)]">By {authorName}</p>
              <p className="mt-2 text-sm text-[var(--fg-muted)]">{post.readTime ?? '5 min read'}</p>
              <Link href={postUrl} className="mt-6 inline-flex items-center font-semibold text-[var(--accent)] transition-colors duration-200 hover:text-[var(--accent-hover)]">
                Read the piece →
              </Link>
            </div>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="rounded-[24px] border border-[var(--border)] bg-[var(--bg-page)] p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-sm">
      <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--sage)]">
        <span>{post.category || 'Perspective'}</span>
        {post.readTime ? <span>• {post.readTime}</span> : null}
      </div>
      <div className="mt-4">
        <p className="text-sm text-[var(--fg-muted)]">{formatPostDate(post.date)}</p>
        <Link href={postUrl} className="mt-2 block">
          <h3 className="text-2xl text-[var(--fg)] transition-colors duration-200 hover:text-[var(--accent)]">
            {post.title}
          </h3>
        </Link>
        <p className="mt-3 text-[var(--fg-body)]">{post.description || 'Read the latest update from GTM India.'}</p>
      </div>
      <div className="mt-6 flex items-center justify-between gap-3 border-t border-[var(--border)] pt-4 text-sm text-[var(--fg-muted)]">
        <span>By {authorName}</span>
        <Link href={postUrl} className="font-semibold text-[var(--accent)] transition-colors duration-200 hover:text-[var(--accent-hover)]">
          Read more →
        </Link>
      </div>
    </article>
  )
}
