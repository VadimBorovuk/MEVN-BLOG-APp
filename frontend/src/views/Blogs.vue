<template>
  <div>

    <div v-if="isLoading">Blog loading...</div>

    <ul v-else>
      <li v-for="blog in blogs" :key="blog._id" style="border: 3px solid; padding: 10px; margin-bottom: 10px">
        <router-link :to="`/blogs/${blog._id}`" v-if="authUserStore.authUser?._id === blog.userId?._id">
          {{ blog.title }} - {{ blog.content }} - {{ blog.userId.fullName }}
        </router-link>
        <span v-else>
            {{ blog.title }} - {{ blog.content }} - {{ blog.userId.fullName }}
        </span>

        <div>
          <ul v-if="!!blog.comments.length">
            <li v-for="comment in blog.comments" :key="comment._id" style="background-color: indianred">
              {{ comment.content }}
              <hr>
              <h2>Likes</h2>: {{ comment.likes }}
            </li>
          </ul>
        </div>
        <hr>
        <div v-if="!!blog.likes.length">
          <h2>Likes</h2>: {{ blog.likes }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {axiosInstance} from "../utils/axios.ts";
import {useAuthStore} from "../stores/authStore.ts";
import type {TypeBlog} from "../types";


const authUserStore = useAuthStore()

const isLoading = ref<boolean>(false)
const blogs = ref<TypeBlog[]>([])

const fetchBlogs = async () => {
  isLoading.value = true
  try {
    const res = await axiosInstance.get<TypeBlog[]>("/blogs");
    blogs.value = res.data
  } catch (e) {
    blogs.value = []
    console.log(e)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchBlogs()
})
</script>
