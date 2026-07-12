export interface PostAuthor {
  name: string
  bio?: string
  linkedin?: string
}

export interface Post {
  id?: string
  slug?: string
  title: string
  description: string
  category: string
  date: string
  publishedAt?: string
  heroImage?: string        // Cloudinary public ID
  author: string | string[] | PostAuthor | PostAuthor[]
  tags?: string[]
  content?: string          // raw MDX body
  readTime?: string
  featured?: boolean
}
