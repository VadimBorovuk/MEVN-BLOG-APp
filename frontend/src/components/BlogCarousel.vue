<template>
  <template v-if="blogStore.isLoadingBlogs">
    <BlogCarouselSkeleton class="col-span-12 mb-[110px]"/>
  </template>

  <div v-else class="w-full overflow-hidden mb-[50px]">
    <div
        class="flex transition-transform duration-400 ease-in-out"
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
    >
      <CarouselCard
          v-for="(slide, index) in blogStore.blogs.data"
          :key="index"
          :slide="slide"
      />
    </div>

    <div class="flex items-center justify-end mt-5">
      <button
          @click="prevSlide"
          class="cursor-pointer mx-2"
      >
        <MoveLeft class="w-10 h-10"/>
      </button>
      <button
          @click="nextSlide"
          class="cursor-pointer mx-2"
      >
        <MoveRight class="w-10 h-10"/>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {useBlogStore} from "../stores/blogStore.ts";
import {MoveLeft, MoveRight} from "lucide-vue-next";
import CarouselCard from "./UI/CarouselCard.vue";
import BlogCarouselSkeleton from "./UI/BlogCarouselSkeleton.vue";

const blogStore = useBlogStore();
const currentSlide = ref(0);
// const countBlogs = ref(0);

const nextSlide = () => {
  if (blogStore?.blogs?.pagination?.total) {
    const length = blogStore?.blogs?.pagination?.total > blogStore?.blogs?.pagination?.limit ? blogStore?.blogs?.pagination?.limit : blogStore?.blogs?.pagination?.total
    currentSlide.value = (currentSlide.value + 1) % length;
  }
}

const prevSlide = () => {
  if (blogStore?.blogs?.pagination?.total) {
    const length = blogStore?.blogs?.pagination?.total > blogStore?.blogs?.pagination?.limit ? blogStore?.blogs?.pagination?.limit : blogStore?.blogs?.pagination?.total
    currentSlide.value = (currentSlide.value - 1 + length) % length;
  }
}

onMounted(()=>{
  setInterval(()=>{
    if (blogStore?.blogs?.pagination?.total) {
      const length = blogStore?.blogs?.pagination?.total > blogStore?.blogs?.pagination?.limit ? blogStore?.blogs?.pagination?.limit : blogStore?.blogs?.pagination?.total
      currentSlide.value = (currentSlide.value + 1) % length;
    }
  },6000)
})
</script>

<style scoped>
/* Анімація для плавності переходів */
.transition-transform {
  transition: transform 0.4s ease-in-out;
}
</style>
