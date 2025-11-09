<template>
  <div
      class="bg-base-300 grid grid-cols-3 grid-rows-1 gap-6 relative p-6 shadow-lg transition duration-300 transform rounded-lg mb-10 min-h-[350px]"
  >
    <div
        v-if="authUserStore.authUser?._id === blogData?.userId?._id"
        title="My personal post"
        class="absolute top-0 left-0 w-14 h-14 bg-primary text-white flex items-center justify-center rounded-tl-lg"
        style="clip-path: polygon(0 0, 100% 0, 0 100%);">
      <BookMarked class="absolute top-1.5 left-1.5 h-5 w-5"/><!-- Іконка всередині -->
    </div>

    <div class="relative z-10 rounded-2xl overflow-hidden group">
      <img
          class="h-full rounded-2xl w-full object-cover transition-transform duration-300 transform group-hover:scale-105"
          :src="blogData?.previewImage || '/noPreviewImage.png'"
          :class="!blogData?.previewImage && 'opacity-40'"
          alt=""
      />


      <!-- Оверлей на ховер -->
      <router-link
          target="_blank"
          class="flex justify-center items-center bg-black/70 bg-opacity-80 z-10 absolute top-0 left-0 w-full h-full text-white rounded-2xl opacity-0 transition-all duration-300 transform hover:scale-105 text-xl hover:opacity-100 cursor-pointer"
          :to="`/blogs/${blogData?._id}`">
        <span>Read article</span>
        <ChevronsRight class="mt-1"/>
      </router-link>
    </div>

    <div class="col-span-2">
      <!-- Заголовок -->
      <div class="h-full flex flex-col justify-between">
        <div>
          <div class="flex flex-wrap mb-3 items-center justify-between">
            <div>
              <div
                  v-if="blogData?.tag"
                  @click="applyFetchByTag(blogData?.tag)"
                  class="transition bg-base-100 text-[.875rem] mt-[0] mr-[8px] mb-[12px] ml-[0] flex items-center h-[32px] leading-[32px] px-[12px] py-[0] rounded-xl relative cursor-pointer hover:bg-base-200"
              >
                <span class="w-[8px] h-[8px] mr-[6px] rounded-full" :class="useTagColor(blogData?.tag)?.class"/>
                <span class="text-sm">{{ blogData?.tag.toLocaleUpperCase() }}</span>
              </div>
            </div>

            <div class="flex items-center">
              <BadgeUI class="mr-2" :data="{label: 'like', list: blogData?.likes}"/>
              <BadgeUI class="" :data="{label: 'comment', list: blogData?.comments}"/>
            </div>
          </div>
          <h3 class="relative z-10 font-medium text-2xl cursor-pointer">
            <router-link
                :to="`/blogs/${blogData?._id}`"
                target="_blank"
                class="relative hover:text-red-400 transition-colors duration-200 line-clamp-2"
            >
              {{ blogData?.title }}
            </router-link>
          </h3>
          <div class="text-gray-400 line-clamp-3 leading-6 my-4 overflow-hidden max-h-[84px] font-light text-md"
               v-html="blogData?.content"/>
        </div>

        <div>
          <div class="divider mb-0"></div>
          <div class="relative z-10 flex justify-between items-start w-full">

            <div class="flex items-center">
              <div class="flex flex-1">
                <div>
                  <div class="flex items-center text-sm font-semibold mb-2">
                    <User class="mr-2"/>
                    <span class="text-md">{{ blogData?.userId?.fullName }}</span>
                  </div>
                  <div class="flex items-center">
                    <CalendarDays class="mr-3"/>
                    <p class="text-sm"> {{ useDate(blogData?.createdAt!, 'MMM D, YYYY') }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex justify-end">
              <ViewReadingUI :text="blogData?.content"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {PartialTypeBlog} from "../types";
import {useDate} from "../composables/useDateFormat.ts";
import {ChevronsRight, User, CalendarDays, BookMarked} from 'lucide-vue-next';
import {useTagColor} from "../composables/useTagOfBlog.ts";
import {useRouter, useRoute} from "vue-router";
import {useBlogStore} from "../stores/blogStore.ts";
import ViewReadingUI from "./UI/ViewReadingUI.vue";
import BadgeUI from "./UI/BadgeUI.vue";
import {useAuthStore} from "../stores/authStore.ts";

defineProps<{
  blogData?: PartialTypeBlog | null
  index: number
}>()


const blogStore = useBlogStore();
const router = useRouter();
const route = useRoute();
const authUserStore = useAuthStore()

const applyFetchByTag = async (tag: string) => {
  if (!route.query.tag) {
    blogStore.applyQueryParam('tag', tag)
    blogStore.isLoadingBlogs = true;

    router.push({
      query: {
        tag: tag,
      }
    })
  }
}
</script>


