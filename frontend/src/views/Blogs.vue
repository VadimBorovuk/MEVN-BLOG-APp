<template>
  <ScrollProgress/>
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-12 gap-8">
      <template v-if="blogStore.isLoadingBlogs">
        <BlogSkeleton v-for="i in 6" :key="i" class="col-span-6" />
      </template>

      <BlogCard
          v-else
          v-for="(blog, index) in blogStore.blogs"
          :blogData="blog"
          :key="blog._id"
          :class="getColSpanClass(index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {useBlogStore} from "../stores/blogStore.ts";
import BlogCard from "../components/BlogCard.vue";
import ScrollProgress from "../components/UI/ScrollProgress.vue";
import BlogSkeleton from "../components/UI/BlogSkeleton.vue";
const blogStore = useBlogStore()

const getColSpanClass = (index: number) => {
  const spans = ['col-span-6', 'col-span-6', 'col-span-4', 'col-span-4', 'col-span-4'];

  return spans[index % spans.length];
}

onMounted(() => {
  blogStore.getAllBlogs()
})
</script>
