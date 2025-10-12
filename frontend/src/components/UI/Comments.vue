<template>
  <div class="mt-6" v-if="blogStore.currentBlog.comments">

    <h2 class="text-xl font-semibold text-gray-800 mb-4">Comments ({{
        blogStore.currentBlog.comments?.length
      }})</h2>


    <div class="w-full relative flex justify-between gap-2 mb-3">
      <textarea
          rows="3"
          @keypress.enter.prevent="createComment"
          v-model="blogStore.commentVal"
          class="w-full py-3 px-5 rounded-lg border border-gray-300 bg-white shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed"
          placeholder="Write comments here...."/>
      <a href="" class="absolute right-6 top-[18px]">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
             fill="none">
          <path
              d="M11.3011 8.69906L8.17808 11.8221M8.62402 12.5909L8.79264 12.8821C10.3882 15.638 11.1859 17.016 12.2575 16.9068C13.3291 16.7977 13.8326 15.2871 14.8397 12.2661L16.2842 7.93238C17.2041 5.17273 17.6641 3.79291 16.9357 3.06455C16.2073 2.33619 14.8275 2.79613 12.0679 3.71601L7.73416 5.16058C4.71311 6.16759 3.20259 6.6711 3.09342 7.7427C2.98425 8.81431 4.36221 9.61207 7.11813 11.2076L7.40938 11.3762C7.79182 11.5976 7.98303 11.7083 8.13747 11.8628C8.29191 12.0172 8.40261 12.2084 8.62402 12.5909Z"
              stroke="#111827" stroke-width="1.6" stroke-linecap="round"/>
        </svg>
      </a>
    </div>

    <div class="space-y-4">
      <CommentBlock
          v-for="(body, index) in blogStore.currentBlog.comments"
          :commentBody="body"
          :key="index"/>
    </div>

  </div>

</template>

<script setup lang="ts">
import {useBlogStore} from "../../stores/blogStore.ts";
import CommentBlock from "./CommentBlock.vue";
import {useNotification} from "@kyvg/vue3-notification";
import {useRoute} from "vue-router";

const route = useRoute()
const currentBlogId = route.params.id;

const blogStore = useBlogStore();
const {notify} = useNotification();

const createComment = async () => {
  if (!blogStore.commentVal.length) {
    notify({
      type: "error",
      title: "error",
      text: "Content not be empty",
    });
    return;
  }
  try {
    await blogStore.createNewComment(blogStore.currentBlog._id!)
    await blogStore.getCurrentBlog(currentBlogId!)
    notify({
      type: "success",
      title: "Success",
      text: "add comment",
    });
  } catch (e) {
    console.log(e)
  }
}
</script>
