<template>
  <div
      class="grid grid-cols-3 grid-rows-1 gap-4 relative max-h-20 min-h-20">
    <div class="relative z-10 rounded-lg overflow-hidden group max-h-[70px]">
      <router-link
          :to="`/blogs/${blogData?._id}`"
          target="_blank"
      >
        <img
            class="h-full rounded-2xl w-full object-cover transition-transform duration-300 transform group-hover:scale-105"
            :src="blogData?.previewImage || '/noPreviewImage.png'"
            :class="!blogData?.previewImage && 'opacity-40'"
            alt=""/>

      </router-link>
    </div>

    <div class="col-span-2">

      <!-- Заголовок -->
      <div class="h-full flex flex-col justify-between">
        <h3 class="relative z-10 font-medium text-md">
          <router-link
              :to="`/blogs/${blogData?._id}`"
              target="_blank"
              class="relative hover:text-red-400 transition-colors duration-200 line-clamp-2"
          >
            {{ blogData?.title }}
          </router-link>
        </h3>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {PartialTypeBlog} from "../../types";

defineProps<{
  blogData?: PartialTypeBlog | null
}>()

</script>


