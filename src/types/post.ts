export interface PostAuthor {
  id?: string
  slug?: string
  name: string
  title?: string
  bio?: string
  linkedin?: string
  headshot?: string
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
  authors: string[] | PostAuthor[]
  tags?: string[]
  content?: string          // raw MDX body
  readTime?: string
  featured?: boolean
}
