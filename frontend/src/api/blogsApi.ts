import {axiosInstance} from "../utils/axios.ts";
import type {PartialIBlog} from "../types";

export function fetchBlogs() {
  return axiosInstance({
    url: `/blogs`,
    method: 'get'
  })
}

export function fetchBlogById(id: string | string[]) {
  return axiosInstance({
    url: `/blogs/${id}`,
    method: 'get'
  })
}

export function createBlog(data: PartialIBlog) {
  return axiosInstance({
    url: `/blogs/create`,
    method: 'post',
    data
  })
}

export function updateBlog(data: PartialIBlog, id: string | string[]) {
  return axiosInstance({
    url: `/blogs/update/${id}`,
    method: 'put',
    data
  })
}

export function deleteBlog(id: string | string[]) {
  return axiosInstance({
    url: `/blogs/delete/${id}`,
    method: 'delete'
  })
}
