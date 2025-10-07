import type {TypeAuth} from "./auth.ts";

export type TypeLike = {
  userId: TypeAuth
}

export type TypeComment = {
  _id: number
  userId: TypeAuth
  content: string
  likes: TypeLike[]
  createdAt: Date
}

export type TypeBlog = {
  _id: number
  userId: TypeAuth
  title: string
  content: string
  previewImage: string
  comments: TypeComment[]
  likes: TypeLike[]
  createdAt: Date
}

export type PartialIBlog = Partial<TypeBlog>
