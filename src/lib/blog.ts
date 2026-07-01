import 'server-only'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Post } from '@/types/post'

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog')

function toDateValue(value: unknown): string {
  if (typeof value !== 'string') return ''
  return value
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
      author: data.author ?? 'GTM India',
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