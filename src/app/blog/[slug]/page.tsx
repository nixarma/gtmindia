import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { CldImage } from 'next-cloudinary'
import { getAllPosts, getPostBySlug, getRecentPosts } from '@/lib/blog'
import { mdxComponents, slugifyHeading } from '@/components/blog/MDXComponents'
import type { Post, PostAuthor } from '@/types/post'

interface Props {
  params: Promise<{ slug: string }>
}

function formatPostDate(date: string) {
  if (!date) return ''

  const [year, month, day] = date.split('T')[0].split('-').map((value) => Number(value))

  if (!year || !month || !day) return ''

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  return `${monthNames[month - 1]} ${day}, ${year}`
}

function getAuthorName(authors: Post['authors']): string {
  return authors.map((entry) => (typeof entry === 'string' ? entry : entry.name)).filter(Boolean).join(', ')
}

function getAuthorEntries(authors: Post['authors']): PostAuthor[] {
  return authors.filter((entry): entry is PostAuthor => typeof entry !== 'string' && Boolean(entry))
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

  const authorName = getAuthorName(post.authors)
  const authorEntries = getAuthorEntries(post.authors)
  const relatedPosts = getRecentPosts(3).filter((entry) => entry.slug !== post.slug)
  const sidebarSections = post.content
    ? Array.from(post.content.matchAll(/^##\s+(.+)$/gm)).map((match) => ({
        title: match[1].trim(),
        id: slugifyHeading(match[1].trim()),
      }))
    : []

  return (
    <main className="min-h-screen bg-[var(--bg-page)]">
      <section className="container max-w-7xl py-16 sm:py-20 lg:py-24">
        <Link href="/blog" className="inline-flex items-center text-sm font-semibold text-[var(--accent)] transition-colors duration-200 hover:text-[var(--accent-hover)]">
          ← Back to blog
        </Link>

        <article className="mt-8 overflow-hidden rounded-[32px] border border-[var(--border)] bg-[var(--bg-page)] shadow-sm">
          <div className="p-8 sm:p-10 lg:p-14">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--sage)]">
              <span>{post.category || 'Perspective'}</span>
              {post.readTime ? <span>• {post.readTime}</span> : null}
            </div>

            <h1 className="mt-4 max-w-3xl text-4xl sm:text-5xl lg:text-6xl">{post.title}</h1>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-[var(--fg-muted)]">
              <span>By {authorName}</span>
              {post.date ? <span>• {formatPostDate(post.date)}</span> : null}
            </div>

            {post.description ? (
              <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--fg-body)]">{post.description}</p>
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

            <div className="mt-12 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
              {sidebarSections.length > 0 ? (
                <aside className="mb-8 lg:mb-0 lg:pr-6">
                  <div className="lg:sticky lg:top-24">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--sage)]">On this page</p>
                    <ul className="mt-3 space-y-2 text-sm text-[var(--fg-muted)]">
                      {sidebarSections.map((section) => (
                        <li key={section.id}>
                          <a href={`#${section.id}`} className="transition-colors duration-200 hover:text-[var(--accent)]">
                            {section.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </aside>
              ) : null}

              <div className="min-w-0">
                {post.content ? (
                  <article className="prose prose-neutral max-w-none prose-headings:font-[family-name:var(--font-display)] prose-headings:scroll-mt-24 prose-headings:mt-12 prose-headings:mb-4 prose-h2:mt-16 prose-h2:mb-5 prose-h3:mt-10 prose-h3:mb-3 prose-p:text-[var(--fg-body)] prose-p:leading-8 prose-a:text-[var(--accent)] prose-blockquote:border-0 prose-blockquote:p-0 prose-blockquote:text-inherit">
                    <MDXRemote source={post.content} components={mdxComponents} />
                  </article>
                ) : (
                  <div className="rounded-[20px] border border-dashed border-[var(--border)] bg-[var(--bg-surface)] p-6">
                    <p className="text-[var(--fg-muted)]">The full post content will be published here soon.</p>
                  </div>
                )}

                {(authorEntries.length > 0 || authorName) ? (
                  <div className="mt-16 rounded-[24px] border border-[var(--border)] bg-[var(--bg-surface)] p-6 sm:p-8">
                    <h2 className="text-2xl">About the author{authorEntries.length > 1 ? 's' : ''}</h2>
                    {authorEntries.length > 0 ? (
                      <div className="mt-6 space-y-6">
                        {authorEntries.map((entry) => (
                          <div key={entry.slug ?? entry.id ?? entry.name} className="flex flex-col gap-4 sm:flex-row sm:items-start">
                            {entry.headshot ? (
                              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-[var(--border)]">
                                <Image src={entry.headshot} alt={entry.name} fill sizes="96px" style={{ objectFit: 'cover' }} />
                              </div>
                            ) : null}
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-[var(--sage)]">{entry.name}</p>
                              {entry.title ? (
                                <p className="mt-1 text-sm text-[var(--fg-muted)]">{entry.title}</p>
                              ) : null}
                              {entry.bio ? (
                                <p className="mt-3 text-[var(--fg-body)]">{entry.bio}</p>
                              ) : null}
                              {entry.linkedin ? (
                                <a href={entry.linkedin} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)]">
                                  Connect on LinkedIn →
                                </a>
                              ) : null}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-3 text-[var(--fg-body)]">{authorName}</p>
                    )}
                  </div>
                ) : null}

                {relatedPosts.length > 0 ? (
                  <div className="mt-16 border-t border-[var(--border)] pt-8">
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

            </div>
          </div>
        </article>
      </section>
    </main>
  )
}
