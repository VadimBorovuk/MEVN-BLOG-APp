<template>
  <ScrollProgress/>
  <div class="container mx-auto px-4 pt-24 pb-8" ref="blogsEndRef">

    <BlogPreview/>

    <div class="grid grid-cols-6 grid-rows-5 gap-5">
      <div class="col-span-4 row-span-5">
        <template v-if="blogStore.isLoadingBlogs">
          <BlogSkeleton v-for="i in 6" :key="i" class="col-span-12 mb-6"/>
        </template>

        <BlogCard
            v-else
            v-for="(blog, index) in blogStore.blogs.data"
            :blogData="blog"
            :index="index"
            :key="blog._id"
            class="col-span-12"
        />
      </div>

      <div class="col-span-2 row-span-5 col-start-5">
          <BlogNavigation/>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useBlogStore} from "../stores/blogStore.ts";
import BlogCard from "../components/BlogCard.vue";
import ScrollProgress from "../components/UI/ScrollProgress.vue";
import BlogSkeleton from "../components/UI/BlogSkeleton.vue";
import BlogPreview from "../components/BlogPreview.vue";
import BlogNavigation from "../components/BlogNavigation.vue";

const blogStore = useBlogStore();

const blogsEndRef = ref<HTMLDivElement | null>(null)

onMounted(async () => {
  await blogStore.getAllBlogs();
  await blogStore.getPersonalBlogs({limit: 3});


  if (blogsEndRef.value) {
    blogsEndRef.value.scrollIntoView({behavior: "smooth"});
  }
})
</script>
