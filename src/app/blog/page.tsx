import type { Metadata } from 'next'
import { getAllPosts, getFeaturedPost } from '@/lib/blog'
import { PostCard } from '@/components/blog/Post'

export const metadata: Metadata = {
  title: 'Blog | GTM India',
  description: 'Practitioner commentary, perspectives, and resources for the GTM community.',
}

export default function BlogPage() {
  const posts = getAllPosts()
  const featuredPost = getFeaturedPost()
  const regularPosts = posts.filter((post) => post.slug !== featuredPost?.slug)

  return (
    <main className="min-h-screen bg-[var(--bg-page)]">
      <section className="container py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl">
          <p className="eyebrow text-[var(--sage)]">The Blog</p>
          <h1 className="mt-4 text-4xl sm:text-5xl">Perspectives and practical notes for the GTM community.</h1>
          <p className="mt-5 text-lg text-[var(--fg-muted)]">
            Practitioner commentary, reflections, and resources from GTM India.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="mt-12 rounded-[24px] border border-dashed border-[var(--border)] bg-[var(--bg-surface)] p-8">
            <h2 className="text-2xl">Posts are on the way.</h2>
            <p className="mt-2 text-[var(--fg-muted)]">
              New blog entries will appear here as soon as they are published.
            </p>
          </div>
        ) : (
          <>
            {featuredPost ? (
              <div className="mt-12">
                <PostCard post={featuredPost} featured />
              </div>
            ) : null}

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {regularPosts.map((post) => (
                <PostCard key={post.slug ?? post.id} post={post} />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  )
}
