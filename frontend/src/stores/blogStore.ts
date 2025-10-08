import {defineStore} from 'pinia'
import {ref} from "vue";

// import type {Router} from "vue-router";
import type {PartialIBlog, TypeBlog} from "../types";
import type {AxiosResponse} from "axios";
import {fetchBlogById, fetchBlogs, updateBlog} from "../api/blogsApi.ts";

export const useBlogStore = defineStore('Blog', () => {
  const isLoadingBlogs = ref<boolean>(false)
  const isLoadingCurrentBlog = ref<boolean>(false)

  const blogs = ref<TypeBlog[]>([])
  const currentBlog = ref<PartialIBlog>({})

  const getAllBlogs = async () => {
    isLoadingBlogs.value = true
    try {
      const res: AxiosResponse<TypeBlog[]> = await fetchBlogs();
      blogs.value = res.data
    } catch (e) {
      blogs.value = []
      console.log(e)
    } finally {
      isLoadingBlogs.value = false
    }
  }

  const getCurrentBlog = async (id: string | string[]) => {
    isLoadingCurrentBlog.value = true
    try {
      const res: AxiosResponse<TypeBlog> = await fetchBlogById(id);
      currentBlog.value = res.data
    } catch (e) {
      console.log(e)
    } finally {
      isLoadingCurrentBlog.value = false
    }
  }

  const changePreviewImage = (data: string) => {
    currentBlog.value.previewImage = data
  }

  const updateCurrentBlog = async (data: PartialIBlog, id: string | string[]) => {
    isLoadingCurrentBlog.value = true
    try {
      const res: AxiosResponse<TypeBlog> = await updateBlog(data,id);
      currentBlog.value = res.data
    } catch (e) {
      console.log(e)
    } finally {
      isLoadingCurrentBlog.value = false
    }
  }

  return {
    isLoadingBlogs,
    isLoadingCurrentBlog,
    currentBlog,
    blogs,
    changePreviewImage,
    getAllBlogs,
    getCurrentBlog,
    updateCurrentBlog
  }
})



