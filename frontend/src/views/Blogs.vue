<template>
  <div>
    <h1>get Blogs</h1>
    <button @click="fetchBlogs">get blogs</button>

    <ul>
      <li v-for="blog in blogs" :key="blog.id">
        {{ blog.title }} - {{ blog.text }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {axiosInstance} from "../utils/axios.ts";

type Blog = {
  id: number,
  title: string,
  text: string
}

const blogs = ref<Blog[]>([])
const fetchBlogs = async () => {
  try {
    const res = await axiosInstance.get<Blog[]>("/blogs");
    blogs.value = res.data
  } catch (e) {
    console.log(e)
  }
}
</script>
