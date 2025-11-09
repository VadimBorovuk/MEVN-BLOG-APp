<template>
  <div class="bg-base-300 p-6 shadow-lg rounded-lg sticky top-20">
    <div class="flex items-start justify-between mb-6">
      <h3 class="text-xl font-bold">
        My posts
      </h3>
      <button @click="applyFetchBLogsByPersonal" class="btn btn-soft btn-primary rounded-3xl">
        <ExternalLink  />
      </button>
    </div>

    <template v-if="blogStore.isLoadingPersonalBlogs">
      <BlogShortSkeleton v-for="i in 3" :key="i" class="col-span-12 mb-4"/>
    </template>

    <template v-else>
      <BlogPersonalCard
          v-if="blogStore?.myPersonalBlogs?.pagination?.total"
          v-for="(blog, index) in blogStore.myPersonalBlogs.data"
          :blogData="blog"
          :index="index"
          :key="blog._id"
          class="col-span-12"
      />
      <div v-else>
        <router-link to="/create-blog" class="btn btn-soft btn-primary">
          <span>Create new personal post</span>
        </router-link>
      </div>
    </template>

    <div class="divider"></div>

    <BlogTags/>

  </div>
</template>

<script setup lang="ts">

import {useBlogStore} from "../stores/blogStore.ts";
import BlogShortSkeleton from "./UI/BlogShortSkeleton.vue";
import BlogPersonalCard from "./BlogPersonalCard.vue";
import {ExternalLink} from "lucide-vue-next";
import BlogTags from "./BlogTags.vue";
import {useRoute, useRouter} from "vue-router";
import {ref, watch} from "vue";

const route = useRoute();
const router = useRouter();
const blogStore = useBlogStore();
const currentQueryPersonal = ref('')

const applyFetchBLogsByPersonal = async () => {
  blogStore.applyQueryParams('personal', 'true')
  blogStore.isLoadingBlogs = true;

  router.push({
    path: '/',
    query: {
      personal: 'true',
    },
  })
}

watch(() => route.query.personal, (val) => {
  const resTag = val as string
  currentQueryPersonal.value = resTag
  blogStore.applyQueryParams('personal', resTag)
})
</script>
