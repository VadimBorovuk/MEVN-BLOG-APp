<template>
  <template v-if="blogStore.isLoadingBlogs">
    <BlogSkeleton v-for="i in 1" :key="i" class="col-span-12 mb-6"/>
  </template>

  <template v-else>
    <div v-if="blogStore.blogs.pagination?.total">
      <BlogCard
          v-for="(blog, index) in blogStore.blogs.data"
          :blogData="blog"
          :index="index"
          :key="blog._id"
          class="col-span-12"
      />

      <div class="text-center mt-6" v-if="blogStore.blogs.pagination">
        <button
            v-if="blogStore.queryParams.page! < blogStore.blogs.pagination.totalPages"
            @click="loadMoreBlogs"
            class="btn btn-primary text-white px-6 py-2 rounded-md transition"
        >
          Show more
        </button>
        <div v-if="blogStore.isLoadingMoreBlogs" class="w-full flex justify-center items-center">
          <Loader class="size-10 animate-spin" />
        </div>


      </div>
    </div>

    <div v-else class="bg-base-300 relative p-6 shadow-lg transition duration-300 transform rounded-lg mb-10 min-h-[350px] flex items-center justify-center">
      <h2 class="text-3xl">Not founded</h2>
    </div>

  </template>

</template>

<script setup lang="ts">

import BlogCard from "./BlogCard.vue";
import BlogSkeleton from "./UI/BlogSkeleton.vue";
import {useBlogStore} from "../stores/blogStore.ts";
import {useRoute} from "vue-router";
import {watch} from "vue";
import {Loader} from "lucide-vue-next";

const route = useRoute();
const blogStore = useBlogStore();

const loadMoreBlogs = async () => {
  if (blogStore.blogs.pagination) {
    if (blogStore.queryParams.page! < blogStore.blogs.pagination.totalPages) {
      blogStore.incrementPage();
      await getMoreBlogs();
    }
  }
};

const getMoreBlogs = async () => {
  try {
    await blogStore.loadMoreBlogs(blogStore.queryParams)
  } catch (err) {
    console.error("Помилка при отриманні блогів:", err);
  }
}

watch(() => route.query.tag, (val) => {
  blogStore.applyQueryParams(val as string)
}, {immediate: true})
</script>
