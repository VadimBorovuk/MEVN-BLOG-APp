import type {TypeAuth} from "./auth.ts";

export type TypeQuery = {
  limit?: number
  page?: number
  tag?: string | null
  title?: string | null
  userId?: string | null
}

export type TypeBadge = {
  label: string
  list?: TypeLike[] | TypeComment[]
}

export type TypeLike = {
  userId: TypeAuth | null
}

export type TypeComment = {
  _id: string
  userId: TypeAuth | null
  content: string
  likes: TypeLike[]
  createdAt: Date
  is_updated?: boolean
}

export type TypeBlog = {
  _id: string
  userId: TypeAuth | null
  title: string
  content: string
  tag: string
  previewImage: string
  comments: TypeComment[]
  likes: TypeLike[]
  createdAt: Date
}

export interface IBlog {
  data: TypeBlog[]
  pagination: {
    limit: number
    page: number
    total: number
    totalPages: number
  }
}

export type TypeBlogId = string | string[]
export type PartialTypeBlog = Partial<TypeBlog>
export type PartialIBlog = Partial<IBlog>
export type PickCreateBlog = Pick<TypeBlog, 'title' | 'content' | 'tag' | 'previewImage'>
