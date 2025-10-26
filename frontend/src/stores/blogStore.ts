import {defineStore} from 'pinia'
import {ref} from "vue";

// import type {Router} from "vue-router";
import type {IBlog, PartialIBlog, PartialTypeBlog, PickCreateBlog, TypeAuth, TypeBlog, TypeBlogId} from "../types";
import type {AxiosResponse} from "axios";
import {
  addCommentOfBlog,
  createBlog, deleteBlog,
  deleteCommentOfBlog,
  fetchBlogById,
  fetchBlogs,
  fetchPersonalBlogs,
  likeBlog, likeComment,
  updateBlog, updateCommentOfBlog
} from "../api/blogsApi.ts";
import {useAuthStore} from "./authStore.ts";

export const useBlogStore = defineStore('Blog', () => {
  const authStore = useAuthStore()

  const isLoadingBlogs = ref<boolean>(true)
  const isLoadingPersonalBlogs = ref<boolean>(true)
  const isLoadingCurrentBlog = ref<boolean>(false)
  const isLoadingCreatingBlog = ref<boolean>(false)

  const blogs = ref<PartialIBlog>({})
  const myPersonalBlogs = ref<PartialIBlog>({})
  const currentBlog = ref<PartialTypeBlog>({
    title: '',
    content: '',
    tag: '',
    previewImage: ''
  })

  const blogDataCreate = ref<PickCreateBlog & {userId: TypeAuth | null}>({
    title: '',
    content: '',
    previewImage: '',
    tag: '',
    userId: null
  });


  const commentVal = ref('');

  const getAllBlogs = async () => {
    // isLoadingBlogs.value = true
    try {
      const res: AxiosResponse<IBlog> = await fetchBlogs();
      blogs.value = res.data;

    } catch (e) {
      blogs.value = {}
      console.log(e)
    } finally {
      isLoadingBlogs.value = false
    }
  }

  const getPersonalBlogs = async (params: any) => {
    try {
      const res: AxiosResponse<IBlog> = await fetchPersonalBlogs({...params, userId: authStore.authUser?._id});
      myPersonalBlogs.value = res.data;

    } catch (e) {
      myPersonalBlogs.value = {}
      console.log(e)
    } finally {
      isLoadingPersonalBlogs.value = false
    }
  }

  const getCurrentBlog = async (id: TypeBlogId) => {
    isLoadingCurrentBlog.value = true
    currentBlog.value = {title: '', content: '', previewImage: ''}
    try {
      const res: AxiosResponse<TypeBlog> = await fetchBlogById(id);
      currentBlog.value = {
        ...res.data,
        comments: res.data.comments.map(item => ({...item, is_updated: false}))
      }
    } catch (e) {
      console.log(e)
    } finally {
      isLoadingCurrentBlog.value = false
    }
  }


  const switchLikeBlog = async (blogId: string) => {
    try {
      await likeBlog(blogId)
    } catch (e) {
      console.log(e)
    }
  }

  const switchLikeComment = async (blogId: TypeBlogId, commentId: string) => {
    try {
      await likeComment(blogId, commentId)
    } catch (e) {
      console.log(e)
    }
  }

  const changePreviewImage = (data: string) => {
    currentBlog.value.previewImage = data
  }

  const selectPreviewImage = (data: string) => {
    blogDataCreate.value.previewImage = data
  }

  const clearParamsBlog = () => {
    blogDataCreate.value = {
      title: '',
      content: '',
      tag: '',
      previewImage: '',
      userId: authStore.authUser
    }
  }

  const addBlog = async () => {
    isLoadingCreatingBlog.value = true
    try {
      await createBlog(blogDataCreate.value);
    } catch (e) {
      console.log(e)
    } finally {
      isLoadingCreatingBlog.value = false
    }
  }

  const updateCurrentBlog = async (id: TypeBlogId) => {
    isLoadingCurrentBlog.value = true
    try {
      const res: AxiosResponse<TypeBlog> = await updateBlog(currentBlog.value, id);
      currentBlog.value = res.data
    } catch (e) {
      console.log(e)
    } finally {
      isLoadingCurrentBlog.value = false
    }
  }

  const deleteCurrentBlog = async (blogId: TypeBlogId) => {
    isLoadingCurrentBlog.value = true
    try {
      await deleteBlog(blogId);
    } catch (e) {
      console.log(e)
    } finally {
      isLoadingCurrentBlog.value = false
    }
  }

  // comments

  const createNewComment = async (blogId: string) => {
    try {
      // commentVal
      await addCommentOfBlog({content: commentVal.value}, blogId);
      commentVal.value = '';
    } catch (e) {
      console.log(e)
    }
  }

  const updateCurrentComment = async (content: string, blogId: TypeBlogId, commentId: string) => {
    try {
      await updateCommentOfBlog({content}, blogId, commentId);
      commentVal.value = '';
    } catch (e) {
      console.log(e)
    }
  }

  const deleteCurrentComment = async (blogId: TypeBlogId, commentId: string) => {
    try {
      await deleteCommentOfBlog(blogId, commentId);
    } catch (e) {
      console.log(e)
    }
  }

  // deleteCommentOfBlog

  return {
    isLoadingBlogs,
    isLoadingCurrentBlog,
    currentBlog,
    blogs,
    blogDataCreate,
    commentVal,
    myPersonalBlogs,
    isLoadingPersonalBlogs,
    getPersonalBlogs,
    switchLikeBlog,
    switchLikeComment,
    createNewComment,
    deleteCurrentBlog,
    clearParamsBlog,
    selectPreviewImage,
    changePreviewImage,
    addBlog,
    getAllBlogs,
    getCurrentBlog,
    updateCurrentBlog,
    deleteCurrentComment,
    updateCurrentComment
  }
})



