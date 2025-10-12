<template>
  <ScrollProgress/>
  <div class="container mx-auto px-4 pt-24 pb-10" ref="blogEndRef">
    <Breadcrumbs :current-crumb="blogStore.currentBlog.title"/>

    <template v-if="blogStore.isLoadingCurrentBlog">
      <BlogSkeleton/>
    </template>

    <div v-else>

      <div class="min-h-screen">
        <div class="rounded-2xl shadow pb-5">
          <!-- Blog image -->
          <img
              :src="blogStore.currentBlog.previewImage"
              alt="Blog cover"
              class="w-full h-120 object-cover rounded-xl mb-6"
          />

          <div class=" px-5">
            <!-- Blog header -->
            <div class="flex flex-row items-center justify-between mb-4">
              <span>Published by {{ blogStore.currentBlog.userId?.fullName }}</span>
              <span class="text-gray-500">{{ useDate(blogStore.currentBlog.createdAt!, 'DD MMMM YYYY') }}</span>
            </div>

            <!-- Blog content -->
            <div class="prose max-w-none mb-8"
                 v-html="blogStore.currentBlog.content"/>

            <div class="divider mt-0"></div>

            <!-- Like & Comment actions -->
            <div class="flex items-center justify-between pt-4">
              <!-- Likes -->
              <button
                  v-if="blogStore.currentBlog._id"
                  @click="toggleLike(blogStore.currentBlog._id)"
                  class="flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition cursor-pointer"
              >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    class="w-6 h-6"
                    :class="{ 'text-pink-600': 1 }"
                >
                  <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2
              6.5 3.5 5 5.5 5c1.54 0 3.04.99
              3.57 2.36h1.87C13.46 5.99 14.96 5
              16.5 5 18.5 5 20 6.5 20
              8.5c0 3.78-3.4 6.86-8.55
              11.54L12 21.35z"
                  />
                </svg>
                <span>{{ blogStore?.currentBlog?.likes?.length }}</span>
              </button>
            </div>

            <!-- Comment section -->
            <Comments/>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {useBlogStore} from "../stores/blogStore.ts";
import ScrollProgress from "../components/UI/ScrollProgress.vue";
import BlogSkeleton from "../components/UI/BlogSkeleton.vue";
import Breadcrumbs from "../components/UI/Breadcrumbs.vue";
import {useDate} from "../composables/useDateFormat.ts";
import Comments from "../components/UI/Comments.vue";
import {useNotification} from "@kyvg/vue3-notification";

const blogStore = useBlogStore()
const route = useRoute()
const currentBlogId = route.params.id;

const {notify} = useNotification();
const blogEndRef = ref<HTMLDivElement | null>(null)

const toggleLike = async (id: string) => {
  try {
    await blogStore.switchLikeBlog(id);
    if (currentBlogId) {
      await blogStore.getCurrentBlog(currentBlogId)
    }

    notify({
      type: "success",
      title: "Success",
      text: "Liked",
    });

  } catch (e) {
    notify({
      type: "error",
      title: "Error",
      text: "error",
    });
  }
}


onMounted(() => {
  if (currentBlogId) {
    blogStore.getCurrentBlog(currentBlogId)
  }
  if (blogEndRef.value) {
    blogEndRef.value.scrollIntoView({ behavior: "smooth" });
  }
})
</script>
