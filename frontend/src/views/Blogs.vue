<template>
  <ScrollProgress/>
  <div class="container mx-auto px-4 pt-24 pb-8" ref="blogsEndRef">

    <BlogPreviewByTag v-if="route.query.tag"/>
    <BlogCarousel v-else/>

    <div class="grid grid-cols-6 grid-rows-5 gap-10">
      <div class="col-span-4 row-span-5">
        <BlogsContainer/>
      </div>

      <div class="col-span-2 row-span-5 col-start-5">
        <BlogNavigation/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {useBlogStore} from "../stores/blogStore.ts";
import ScrollProgress from "../components/UI/ScrollProgress.vue";
import BlogNavigation from "../components/BlogNavigation.vue";
import BlogsContainer from "../components/BlogsContainer.vue";
import {useRoute} from "vue-router";
import BlogPreviewByTag from "../components/BlogPreviewByTag.vue";
import BlogCarousel from "../components/BlogCarousel.vue";

const blogStore = useBlogStore();
const route = useRoute();
const tagQueryName = route.query.tag;
const tagQueryPersonal = route.query.personal;

const blogsEndRef = ref<HTMLDivElement | null>(null);

watch(() => route.query, async (query) => {
  if (!!Object.values(query).length) {
    await blogStore.getAllBlogs(blogStore.queryParams);
  } else {
    await blogStore.getAllBlogs({page: 1, limit: 10});
  }
})

onMounted(async () => {
  if (!tagQueryName && !tagQueryPersonal) {
    await blogStore.getAllBlogs({page: 1, limit: 10});
  } else {
    console.log(tagQueryName)
    if (typeof tagQueryName === 'string') {
      blogStore.applyQueryParam('tag', tagQueryName)
    }
    if (typeof tagQueryPersonal === 'string') {
      blogStore.applyQueryParam('personal', tagQueryPersonal)
    }
    await blogStore.getAllBlogs(blogStore.queryParams);
  }

  //
  // if (!tagQueryPersonal) {
  //   await blogStore.getAllBlogs({page: 1, limit: 10});
  // } else {
  //   console.log(tagQueryPersonal)
  //   if (typeof tagQueryPersonal === 'string') {
  //     blogStore.applyQueryParam('personal', tagQueryPersonal)
  //   }
  //   await blogStore.getAllBlogs(blogStore.queryParams);
  // }

  await blogStore.getPersonalBlogs({limit: 3});

  if (blogsEndRef.value) {
    blogsEndRef.value.scrollIntoView({behavior: "smooth"});
  }
})
</script>
