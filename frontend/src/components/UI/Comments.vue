<template>
  <div class="mt-6" v-if="blogStore.currentBlog.comments">

    <h2 class="text-xl font-semibold mb-4">Comments ({{
        blogStore.currentBlog.comments?.length
      }})</h2>


    <div class="w-full relative flex justify-between gap-2 mb-4">
      <textarea
          rows="3"
          @keypress.enter.prevent="createComment"
          v-model="blogStore.commentVal"
          class="w-full py-3 px-5 rounded-lg bg-base-100 shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] focus:outline-none placeholder-gray-400 text-lg font-normal leading-relaxed"
          placeholder="Write comments here...."/>
      <div class="absolute right-6 top-[18px]">
        <Send />
      </div>
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
import {useRoute} from "vue-router";
import {Send} from "lucide-vue-next";
import {useShowNotify} from "../../composables/useNotivue.ts";
const route = useRoute()
const currentBlogId = route.params.id;

const blogStore = useBlogStore();
const {showNotify} = useShowNotify();

const createComment = async () => {
  if (!blogStore.commentVal.length) {
    showNotify(true, "Title not be empty", "");
    return;
  }
  try {
    await blogStore.createNewComment(blogStore.currentBlog._id!)
    await blogStore.getCurrentBlog(currentBlogId!)
    showNotify(false, "", "Comment added ");
  } catch (e) {
    showNotify(true, "Not added comment", "");
  }
}
</script>
