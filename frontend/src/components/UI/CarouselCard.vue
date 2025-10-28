<template>
  <div
      class="min-w-full max-h-100 flex justify-between flex-wrap"
  >
    <div class="mt-4 md:mt-0 md:flex-2 mr-10">
      <div
          v-if="slide?.tag"
          @click="applyFetchByTag(slide?.tag)"
          class="transition bg-base-300 flex items-center px-3 py-1 w-fit rounded-xl relative cursor-pointer hover:bg-base-200"
      >
        <span class="w-[8px] h-[8px] mr-[6px] rounded-full text-lg" :class="useTagColor(slide?.tag)?.class"/>
        <span>{{ slide?.tag }}</span>
      </div>

      <h2 class="text-3xl font-bold my-6 leading-10">{{ slide?.title }}</h2>
      <div class="line-clamp-6 text-gray-400 font-light leading-6" v-html="slide?.content"/>

      <div class="flex items-center mt-6">
        <div class="flex items-center mr-6">
          <CalendarDays class="mr-2" />
          <p class="text-sm"> {{ useDate(slide?.createdAt!, 'MMM D, YYYY') }}</p>
        </div>
        <ViewReadingUI :text="slide?.content"/>
      </div>

    </div>

    <div class="z-10 w-full md:w-1/2 h-full md:flex-3 rounded-2xl p-4 bg-base-300 relative overflow-hidden group">
      <img
          class="h-full rounded-sm w-full object-cover transition-transform duration-300 transform"
          :src="slide?.previewImage"
          alt=""
      />

      <!-- Оверлей на ховер -->
      <router-link
          target="_blank"
          class="flex justify-center items-center bg-black/50 bg-opacity-80 z-10 absolute top-0 left-0 w-full h-full text-white rounded-2xl opacity-0 transition-all duration-300 transform text-xl hover:opacity-100 cursor-pointer"
          :to="`/blogs/${slide?._id}`">
        <ExternalLink class="h-16 w-16"/>
      </router-link>
    </div>

  </div>
</template>

<script setup lang="ts">
import type {PartialTypeBlog} from "../../types";

defineProps<{
  slide: PartialTypeBlog | null
}>()
import {CalendarDays, ExternalLink} from "lucide-vue-next";
import {useTagColor} from "../../composables/useTagOfBlog.ts";
import {useBlogStore} from "../../stores/blogStore.ts";
import {useRouter} from "vue-router";
import {useDate} from "../../composables/useDateFormat.ts";
import ViewReadingUI from "./ViewReadingUI.vue";

const blogStore = useBlogStore();
const router = useRouter();

const applyFetchByTag = async (tag: string) => {
  blogStore.applyQueryTag('tag', tag)
  blogStore.isLoadingBlogs = true;

  router.push({
    query: {
      tag: tag,
    },
  })
}
</script>

