<template>
  <ScrollProgress/>

  <div class="container mx-auto px-4 pt-24 pb-8" ref="blogsEndRef">
    <Breadcrumbs :current-crumb="blogStore.currentBlog.title" type="view"/>

    <div class="grid grid-cols-6 grid-rows-5 gap-10">
      <div class="col-span-4 row-span-5">
        <div>

          <div class="min-h-screen"
               v-if="!blogStore.isLoadingCurrentBlog && blogStore.currentBlog.previewImage">
            <div class="rounded-2xl shadow">
              <!-- Blog image -->
              <div class="bg-base-300 rounded-2xl p-4 relative w-full flex flex-col shadow-2xl">

                <img
                    :src="blogStore.currentBlog.previewImage"
                    alt="Blog cover"
                    class="w-full h-full object-cover rounded-xl max-h-[400px]"
                />

                <div class="px-10 pt-10">

                  <div class="flex items-center justify-between">
                    <div>
                      <div
                          v-if="blogStore.currentBlog?.tag"
                          class="max-w-fit transition bg-base-100 text-[.875rem] mt-[0] mr-[8px] mb-[12px] ml-[0] flex items-center h-[32px] leading-[32px] px-[12px] py-[0] rounded-xl relative cursor-pointer hover:bg-base-200"
                      >
                      <span class="w-[8px] h-[8px] mr-[6px] rounded-full"
                            :class="useTagColor(blogStore.currentBlog?.tag)?.class"/>
                        <span>{{ blogStore.currentBlog?.tag.toLocaleUpperCase() }}</span>
                      </div>
                    </div>

                    <div class="flex items-center justify-between pt-4">
                      <!-- Likes -->
                      <button
                          v-if="blogStore.currentBlog._id"
                          @click="toggleLike(blogStore.currentBlog._id)"
                          class="flex items-center space-x-2 hover:text-pink-600 transition cursor-pointer"
                      >
                        <ThumbsUp />
                        <span>{{ blogStore?.currentBlog?.likes?.length }}</span>
                      </button>
                    </div>

                  </div>

                  <h3 class="relative z-10 font-medium text-3xl">
                    {{ blogStore.currentBlog?.title }}
                  </h3>

                  <div class="flex items-center my-6">
                    <div class="flex items-center mr-4">
                      <User class="mr-2 h-4 w-4 text-gray-400"/>
                      <span class="text-xs text-gray-400">{{ blogStore.currentBlog?.userId?.fullName }}</span>
                    </div>
                    <div class="flex items-center mr-4">
                      <CalendarDays class="mr-2 h-4 w-4 text-gray-400"/>
                      <p class="text-xs text-gray-400"> {{ useDate(blogStore.currentBlog?.createdAt!, 'MMM D, YYYY') }}</p>
                    </div>

                    <ViewReadingUI class="text-gray-400 text-xs" :text="blogStore.currentBlog?.content"/>

                  </div>

                  <!-- Blog content -->
                  <div class="prose max-w-none mb-8"
                       v-html="blogStore.currentBlog.content"/>

                  <div class="divider mt-0"></div>

                  <!-- Comment section -->
                  <Comments/>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <BlogSkeleton/>
          </div>
        </div>
      </div>

      <div class="col-span-2 row-span-5 col-start-5">
        <BlogNavigation/>
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
import {useShowNotify} from "../composables/useNotivue.ts";
import Comments from "../components/UI/Comments.vue";
import BlogNavigation from "../components/BlogNavigation.vue";
import {useTagColor} from "../composables/useTagOfBlog.ts";
import {CalendarDays, User, ThumbsUp} from "lucide-vue-next";
import ViewReadingUI from "../components/UI/ViewReadingUI.vue";

const {showNotify} = useShowNotify();


const blogStore = useBlogStore()
const route = useRoute()
const currentBlogId = route.params.id;

const blogEndRef = ref<HTMLDivElement | null>(null)

const toggleLike = async (id: string) => {
  try {
    await blogStore.switchLikeBlog(id);
    if (currentBlogId) {
      await blogStore.getCurrentBlog(currentBlogId)
    }
  } catch (e) {
    showNotify(true, "Not liked", "");
  }
}

onMounted(async () => {
  await blogStore.getPersonalBlogs({limit: 3});
  if (currentBlogId) {
    await blogStore.getCurrentBlog(currentBlogId)
  }
  if (blogEndRef.value) {
    blogEndRef.value.scrollIntoView({behavior: "smooth"});
  }
})
// @kyvg/vue3-notification
</script>
