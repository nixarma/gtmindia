import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { CldImage } from 'next-cloudinary'
import { getAllPosts, getPostBySlug, getRecentPosts } from '@/lib/blog'
import type { Post, PostAuthor } from '@/types/post'

interface Props {
  params: Promise<{ slug: string }>
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

function getAuthorBio(author: Post['author']): PostAuthor | undefined {
  if (Array.isArray(author)) {
    return author.find((entry): entry is PostAuthor => typeof entry !== 'string' && Boolean(entry))
  }
  if (typeof author === 'object' && author !== null) {
    return author as PostAuthor
  }
  return undefined
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug ?? '' }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) return {}

  return {
    title: `${post.title} | GTM India Blog`,
    description: post.description,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) notFound()

  const authorName = getAuthorName(post.author)
  const authorBio = getAuthorBio(post.author)
  const relatedPosts = getRecentPosts(3).filter((entry) => entry.slug !== post.slug)

  return (
    <main className="min-h-screen bg-[var(--bg-page)]">
      <section className="container max-w-4xl py-16 sm:py-20 lg:py-24">
        <Link href="/blog" className="inline-flex items-center text-sm font-semibold text-[var(--accent)] transition-colors duration-200 hover:text-[var(--accent-hover)]">
          ← Back to blog
        </Link>

        <article className="mt-8 overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--bg-page)] shadow-sm">
          <div className="p-8 sm:p-10 lg:p-12">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--sage)]">
              <span>{post.category || 'Perspective'}</span>
              {post.readTime ? <span>• {post.readTime}</span> : null}
            </div>

            <h1 className="mt-4 text-4xl sm:text-5xl">{post.title}</h1>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-[var(--fg-muted)]">
              <span>By {authorName}</span>
              {post.date ? <span>• {formatPostDate(post.date)}</span> : null}
            </div>

            {post.description ? (
              <p className="mt-6 text-lg text-[var(--fg-body)]">{post.description}</p>
            ) : null}

            {post.heroImage ? (
              <div className="mt-8 overflow-hidden rounded-[24px] border border-[var(--border)]">
                <CldImage
                  src={post.heroImage}
                  alt={post.title}
                  width={1200}
                  height={675}
                  crop={{ type: 'fill', gravity: 'center' }}
                  sizes="(max-width: 768px) 100vw, 900px"
                  className="h-auto w-full object-cover"
                />
              </div>
            ) : null}

            {post.tags && post.tags.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-[var(--border)] bg-[var(--bg-surface)] px-3 py-1 text-sm text-[var(--fg-muted)]">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}

            {post.content ? (
              <article className="prose prose-neutral mt-10 max-w-none prose-headings:font-[family-name:var(--font-display)] prose-a:text-[var(--accent)]">
                <MDXRemote source={post.content} />
              </article>
            ) : (
              <div className="mt-10 rounded-[20px] border border-dashed border-[var(--border)] bg-[var(--bg-surface)] p-6">
                <p className="text-[var(--fg-muted)]">The full post content will be published here soon.</p>
              </div>
            )}

            {(authorBio?.name || authorName) ? (
              <div className="mt-12 rounded-[24px] border border-[var(--border)] bg-[var(--bg-surface)] p-6 sm:p-8">
                <h2 className="text-2xl">About the author</h2>
                <p className="mt-3 text-sm font-semibold text-[var(--sage)]">{authorBio?.name ?? authorName}</p>
                {authorBio?.bio ? (
                  <p className="mt-3 text-[var(--fg-body)]">{authorBio.bio}</p>
                ) : null}
                {authorBio?.linkedin ? (
                  <a href={authorBio.linkedin} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)]">
                    Connect on LinkedIn →
                  </a>
                ) : null}
              </div>
            ) : null}

            {relatedPosts.length > 0 ? (
              <div className="mt-12 border-t border-[var(--border)] pt-8">
                <h2 className="text-2xl">More from GTM India</h2>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {relatedPosts.map((entry) => (
                    <Link key={entry.slug} href={`/blog/${entry.slug}`} className="rounded-[20px] border border-[var(--border)] bg-[var(--bg-page)] p-5 transition-colors duration-200 hover:border-[var(--accent)]">
                      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--sage)]">{entry.category || 'Perspective'}</p>
                      <h3 className="mt-3 text-xl text-[var(--fg)]">{entry.title}</h3>
                      <p className="mt-2 text-sm text-[var(--fg-muted)]">{entry.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </article>
      </section>
    </main>
  )
}
