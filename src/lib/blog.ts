import 'server-only'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Post, PostAuthor } from '@/types/post'

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog')
const AUTHORS_DIR = path.join(process.cwd(), 'src/content/authors')

function toDateValue(value: unknown): string {
  if (typeof value !== 'string') return ''
  return value
}

function getAuthorRegistry(): Record<string, PostAuthor> {
  if (!fs.existsSync(AUTHORS_DIR)) return {}

  const files = fs.readdirSync(AUTHORS_DIR).filter((file) => file.endsWith('.mdx'))

  return Object.fromEntries(
    files.map((filename) => {
      const raw = fs.readFileSync(path.join(AUTHORS_DIR, filename), 'utf8')
      const { data } = matter(raw)
      const slug = String(data.slug ?? filename.replace(/\.mdx$/, ''))

      return [slug, {
        id: String(data.id ?? slug),
        slug,
        name: String(data.name ?? 'Unknown author'),
        title: data.title ? String(data.title) : undefined,
        bio: data.bio ? String(data.bio) : undefined,
        linkedin: data.linkedin ? String(data.linkedin) : undefined,
        headshot: data.headshot ? String(data.headshot) : undefined,
      } satisfies PostAuthor]
    })
  )
}

function resolveAuthors(rawAuthors: unknown): Post['authors'] {
  const authorRegistry = getAuthorRegistry()

  if (Array.isArray(rawAuthors)) {
    return rawAuthors.map((entry) => {
      if (typeof entry === 'string') {
        return authorRegistry[entry] ?? { name: entry }
      }
      if (entry && typeof entry === 'object') {
        const author = entry as Record<string, unknown>
        if (typeof author.slug === 'string' && authorRegistry[author.slug]) {
          return authorRegistry[author.slug]
        }
        return {
          id: typeof author.id === 'string' ? author.id : undefined,
          slug: typeof author.slug === 'string' ? author.slug : undefined,
          name: typeof author.name === 'string' ? author.name : 'Unknown author',
          title: typeof author.title === 'string' ? author.title : undefined,
          bio: typeof author.bio === 'string' ? author.bio : undefined,
          linkedin: typeof author.linkedin === 'string' ? author.linkedin : undefined,
          headshot: typeof author.headshot === 'string' ? author.headshot : undefined,
        }
      }
      return { name: 'Unknown author' }
    })
  }

  if (typeof rawAuthors === 'string') {
    return [authorRegistry[rawAuthors] ?? { name: rawAuthors }]
  }

  if (rawAuthors && typeof rawAuthors === 'object') {
    const author = rawAuthors as Record<string, unknown>
    if (typeof author.slug === 'string' && authorRegistry[author.slug]) {
      return [authorRegistry[author.slug]]
    }
    return [{
      id: typeof author.id === 'string' ? author.id : undefined,
      slug: typeof author.slug === 'string' ? author.slug : undefined,
      name: typeof author.name === 'string' ? author.name : 'Unknown author',
      title: typeof author.title === 'string' ? author.title : undefined,
      bio: typeof author.bio === 'string' ? author.bio : undefined,
      linkedin: typeof author.linkedin === 'string' ? author.linkedin : undefined,
      headshot: typeof author.headshot === 'string' ? author.headshot : undefined,
    }]
  }

  return [{ name: 'GTM India' }]
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'))

  const posts: Post[] = files.map((filename) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf8')
    const { data, content } = matter(raw)
    const slug = String(data.slug ?? filename.replace(/\.mdx$/, ''))

    return {
      slug,
      id: String(data.id ?? slug),
      title: String(data.title ?? 'Untitled Post'),
      description: String(data.description ?? ''),
      category: String(data.category ?? 'Perspective'),
      date: toDateValue(data.publishedAt ?? data.date ?? ''),
      publishedAt: toDateValue(data.publishedAt ?? data.date ?? ''),
      heroImage: data.heroImage ? String(data.heroImage) : undefined,
      authors: resolveAuthors(data.authors ?? data.author),
      tags: Array.isArray(data.tags) ? data.tags.map((tag: unknown) => String(tag)) : [],
      content: content.trim() || undefined,
      readTime: data.readTime ? String(data.readTime) : undefined,
      featured: Boolean(data.featured),
    } satisfies Post
  })

  return posts.sort((a, b) => {
    const dateA = new Date(a.publishedAt ?? a.date).getTime()
    const dateB = new Date(b.publishedAt ?? b.date).getTime()
    return dateB - dateA
  })
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug)
}

export function getFeaturedPost(): Post | undefined {
  return getAllPosts().find((post) => post.featured)
}

export function getRecentPosts(limit = 3): Post[] {
  return getAllPosts().slice(0, limit)
}