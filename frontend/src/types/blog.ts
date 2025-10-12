import type {TypeAuth} from "./auth.ts";

export type TypeLike = {
  userId: TypeAuth
}

export type TypeComment = {
  _id: string
  userId: TypeAuth
  content: string
  likes: TypeLike[]
  createdAt: Date
  is_updated?: boolean
}

export type TypeBlog = {
  _id: string
  userId: TypeAuth
  title: string
  content: string
  previewImage: string
  comments: TypeComment[]
  likes: TypeLike[]
  createdAt: Date
}

export type TypeBlogId = string | string[]
export type PartialIBlog = Partial<TypeBlog>
export type PickCreateBlog = Pick<TypeBlog, 'title' | 'content' | 'previewImage'>
