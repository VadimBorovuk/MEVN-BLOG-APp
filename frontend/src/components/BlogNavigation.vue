<template>
  <div class="bg-base-300 p-6 shadow-lg rounded-2xl sticky top-20">
    <h3 class="text-xl font-bold mb-6">My posts</h3>

    <template v-if="blogStore.isLoadingPersonalBlogs">
      <BlogShortSkeleton v-for="i in 3" :key="i" class="col-span-12 mb-6"/>
    </template>

    <BlogShortCard
        v-else
        v-for="(blog, index) in blogStore.myPersonalBlogs.data"
        :blogData="blog"
        :index="index"
        :key="blog._id"
        class="col-span-12"
    />
  </div>
</template>

<script setup lang="ts">

import {useBlogStore} from "../stores/blogStore.ts";
import BlogShortCard from "./BlogShortCard.vue";
import BlogShortSkeleton from "./UI/BlogShortSkeleton.vue";

const blogStore = useBlogStore();
</script>
