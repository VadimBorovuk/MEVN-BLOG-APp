<template>
  <div
      class="bg-base-300 grid grid-cols-3 grid-rows-1 gap-4 relative p-6 shadow-lg transition duration-300 transform rounded-2xl mb-6 min-h-[350px]">
    <div class="relative z-10 rounded-2xl overflow-hidden group">
      <img
          class="h-full rounded-2xl w-full object-cover transition-transform duration-300 transform group-hover:scale-105"
          :src="blogData?.previewImage"
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
          <div class="flex flex-wrap mb-3">
            <div
                v-if="blogData?.tag"
                class="transition bg-base-100 text-[.875rem] mt-[0] mr-[8px] mb-[12px] ml-[0] flex items-center h-[32px] leading-[32px] px-[12px] py-[0] rounded-xl relative cursor-pointer hover:bg-base-200"
            >
              <span class="w-[8px] h-[8px] mr-[6px] rounded-full" :class="useTagColor(blogData?.tag)"/>
              <span>{{blogData?.tag.toLocaleUpperCase()}}</span>
            </div>

          </div>
          <h3 class="relative z-10 font-medium text-3xl leading-8">
            <router-link
                :to="`/blogs/${blogData?._id}`"
                target="_blank"
                class="relative hover:text-red-400 transition-colors duration-200 line-clamp-2"
            >
              {{ blogData?.title }}
            </router-link>
          </h3>
          <div class="text-gray-400 line-clamp-3 leading-7 my-4 overflow-hidden max-h-[84px]"
               v-html="blogData?.content"/>
        </div>

        <div>
          <div class="divider mb-0"></div>
          <div class="relative z-10 flex justify-between items-start w-full">

            <div class="flex items-center">
              <div class="flex flex-1">
                <div>
                  <div class="flex items-center text-sm font-semibold text-gray-400 mb-2">
                    <User class="mr-2"/>
                    <span class="text-lg">{{ blogData?.userId?.fullName }}</span>
                  </div>
                  <p class="text-sm text-gray-500">Published on {{ useDate(blogData?.createdAt!, 'MMM D, YYYY') }}</p>
                </div>
              </div>
            </div>

            <div class="flex justify-end">
              <div class="text-sm flex items-center text-gray-500">
                    <span class="mr-2">
                      {{
                        !useDiff(blogData?.createdAt!) ? 'Today' :
                            useDiff(blogData?.createdAt!) === 1 ? `${useDiff(blogData?.createdAt!)} day ago` : `${useDiff(blogData?.createdAt!)} days ago`
                      }}
                    </span>
                <Clock class="h-4 w-4"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {PartialTypeBlog} from "../types";
import {useDate, useDiff} from "../composables/useDateFormat.ts";
import {ChevronsRight, Clock, User} from 'lucide-vue-next';
import {useTagColor} from "../composables/useTagOfBlog.ts";

defineProps<{
  blogData?: PartialTypeBlog | null
  index: number
}>()

</script>


