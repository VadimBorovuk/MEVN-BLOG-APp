<template>
  <div
      class="grid grid-cols-3 grid-rows-1 gap-4 relative mb-6">
    <div class="relative z-10 rounded-lg overflow-hidden group">
      <router-link
          :to="`/blogs/${blogData?._id}`"
          target="_blank"
      >
        <img
            class="h-full rounded-2xl w-full object-cover transition-transform duration-300 transform group-hover:scale-105"
            :src="blogData?.previewImage"
            alt=""/>

      </router-link>

<!--      &lt;!&ndash; Оверлей на ховер &ndash;&gt;-->
<!--      <router-link-->
<!--          target="_blank"-->
<!--          class="flex justify-center items-center bg-black/70 bg-opacity-80 z-10 absolute top-0 left-0 w-full h-full text-white rounded-2xl opacity-0 transition-all duration-300 transform hover:scale-105 text-xl hover:opacity-100 cursor-pointer"-->
<!--          :to="`/blogs/${blogData?._id}`">-->
<!--        <span>Read article</span>-->
<!--        <ChevronsRight class="mt-1"/>-->
<!--      </router-link>-->
    </div>

    <div class="col-span-2">


      <!-- Заголовок -->
      <div class="h-full flex flex-col justify-between">
        <h3 class="relative z-10 font-medium text-xl leading-8">
          <router-link
              :to="`/blogs/${blogData?._id}`"
              target="_blank"
              class="relative hover:text-red-400 transition-colors duration-200 line-clamp-2"
          >
            {{ blogData?.title }}
          </router-link>
        </h3>

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
</template>

<script setup lang="ts">
import type {PartialTypeBlog} from "../types";
import {useDiff} from "../composables/useDateFormat.ts";
import {Clock} from 'lucide-vue-next';

defineProps<{
  blogData?: PartialTypeBlog | null
  index: number
}>()

</script>


