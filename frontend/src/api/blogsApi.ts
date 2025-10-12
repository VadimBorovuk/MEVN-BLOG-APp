import {axiosInstance} from "../utils/axios.ts";
import type {PartialIBlog, PickCreateBlog, TypeBlogId} from "../types";

export function fetchBlogs() {
  return axiosInstance({
    url: `/blogs`,
    method: 'get'
  })
}

export function fetchBlogById(id: TypeBlogId) {
  return axiosInstance({
    url: `/blogs/${id}`,
    method: 'get'
  })
}

export function createBlog(data: PickCreateBlog) {
  return axiosInstance({
    url: `/blogs/create`,
    method: 'post',
    data
  })
}

export function updateBlog(data: PartialIBlog, id: TypeBlogId) {
  return axiosInstance({
    url: `/blogs/update/${id}`,
    method: 'put',
    data
  })
}

export function deleteBlog(id: TypeBlogId) {
  return axiosInstance({
    url: `/blogs/delete/${id}`,
    method: 'delete'
  })
}

// comments
export function addCommentOfBlog(data: {content: string}, blogId: TypeBlogId) {
  return axiosInstance({
    url: `/blogs/${blogId}/comments/add`,
    method: 'post',
    data
  })
}

export function updateCommentOfBlog(data: {content: string}, blogId: TypeBlogId, commentId: string) {
  return axiosInstance({
    url: `/blogs/${blogId}/comments/${commentId}/update`,
    method: 'put',
    data
  })
}

export function deleteCommentOfBlog(blogId: TypeBlogId, commentId: string) {
  return axiosInstance({
    url: `/blogs/${blogId}/comments/${commentId}/delete`,
    method: 'delete'
  })
}

//likes

// of blog
export function likeBlog(blogId: string) {
  return axiosInstance({
    url: `/blogs/${blogId}/like`,
    method: 'post'
  })
}

// of comment


