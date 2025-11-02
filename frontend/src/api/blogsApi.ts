import {axiosInstance} from "../utils/axios.ts";
import type {PartialTypeBlog, PickCreateBlog, TypeBlogId, TypeQuery} from "../types";

export function fetchBlogs(params: TypeQuery = {}) {
  const cleanedParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v !== '' && v != null)
  );

  return axiosInstance({
    url: `/blogs`,
    method: 'get',
    params: cleanedParams
  })
}

export function fetchPersonalBlogs(params: {userId?: string}) {
  return axiosInstance({
    url: `/blogs/personal`,
    method: 'get',
    params
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

export function updateBlog(data: PartialTypeBlog, id: TypeBlogId) {
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
export function addCommentOfBlog(data: { content: string }, blogId: TypeBlogId) {
  return axiosInstance({
    url: `/blogs/${blogId}/comments/add`,
    method: 'post',
    data
  })
}

export function updateCommentOfBlog(data: { content: string }, blogId: TypeBlogId, commentId: string) {
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
export function likeBlog(blogId: TypeBlogId) {
  return axiosInstance({
    url: `/blogs/${blogId}/like`,
    method: 'post'
  })
}


// of comment

export function likeComment(blogId: TypeBlogId, commentId: string) {
  return axiosInstance({
    url: `/blogs/${blogId}/comments/${commentId}/like`,
    method: 'post'
  })
}
