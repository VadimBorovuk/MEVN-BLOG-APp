<template>
  <div
      class="w-full p-6 bg-white rounded-2xl border border-gray-200 flex-col justify-start items-start gap-8 flex">
    <div class="w-full flex-col justify-center items-start gap-3.5 flex">
      <div class="w-full justify-between items-center inline-flex">
        <div class="justify-start items-center gap-2.5 flex">
          <div
              class="w-10 h-10 bg-gray-300 rounded-full justify-start items-start gap-2.5 flex">
            <img class="rounded-full object-cover h-full w-full"
                 :src="commentBody?.userId?.profilePic"
                 alt="Jenny wilson image"/>
          </div>
          <div class="flex-col justify-start items-start gap-1 inline-flex">
            <h5 class="text-gray-900 text-sm font-semibold leading-snug">
              {{ commentBody?.userId?.fullName }}
            </h5>
            <h6 class="text-gray-500 text-xs font-normal leading-5">
              {{
                useDate(commentBody.createdAt!, 'DD MM YYYY H:mm')
              }}
            </h6>
          </div>
        </div>
        <div class="dropdown dropdown-end"  v-if="commentBody?.userId?._id === authUserStore.authUser?._id">
          <button tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                 viewBox="0 0 24 24" fill="none">
              <path
                  d="M12.0161 16.9893V17.0393M12.0161 11.9756V12.0256M12.0161 6.96191V7.01191"
                  stroke="black" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
          </button>
          <ul tabindex="0"
              class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-44 p-2 shadow">
            <li @click="handleComment(commentBody)">
              <div class="flex items-center">
                <SquarePen class="size-4"/>
                <span>Edit</span>
              </div>
            </li>
            <li @click="deleteComment">
              <div class="flex items-center">
                <Trash2 class="size-4"/>
                <span>Delete</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <p v-if="!commentBody.is_updated" class="text-gray-800 text-sm font-normal leading-snug">
        {{ commentBody.content }}
      </p>
      <!--      -->
      <textarea
          v-else
          rows="5"
          @keypress.enter.prevent="updateComment(commentBody.content)"
          v-model="commentBody.content"
          class="w-full py-3 px-5 rounded-lg border border-gray-300 bg-white shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed"
          placeholder="Write comments here...."/>
    </div>
    <div class="w-full justify-between items-center inline-flex">
      <div/>
      <button
          v-if="blogStore.currentBlog._id && commentBody._id"
          @click="toggleLike(blogStore.currentBlog._id, commentBody._id)"
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
        <span>{{ commentBody?.likes?.length }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from "vue";
import type {TypeBlogId, TypeComment} from "../../types";
import {useDate} from "../../composables/useDateFormat.ts";
import {SquarePen, Trash2} from "lucide-vue-next";
import {useBlogStore} from "../../stores/blogStore.ts";
import {useNotification} from "@kyvg/vue3-notification";
import {useRoute} from "vue-router";
import {useAuthStore} from "../../stores/authStore.ts";

const props = defineProps<{
  commentBody: TypeComment,
}>()

const route = useRoute()
const currentBlogId = route.params.id;
const blogStore = useBlogStore();
const {notify} = useNotification();
const authUserStore = useAuthStore();

const deleteComment = async () => {
  try {
    if (currentBlogId) {
      await blogStore.deleteCurrentComment(currentBlogId, props.commentBody._id)
      await blogStore.getCurrentBlog(currentBlogId)
    }

    notify({
      type: "success",
      title: "Success",
      text: "delete comment",
    });
  } catch (e) {
    notify({
      type: "error",
      title: "Error",
      text: "delete comment",
    });
  }
}

const handleComment = (commentData: TypeComment) => {
  commentData.is_updated = !commentData.is_updated
}

const updateComment = async (content: string) => {
  if (!content.length) {
    notify({
      type: "error",
      title: "error",
      text: "Content not be empty",
    });
    return;
  }
  try {
    if (currentBlogId) {
      await blogStore.updateCurrentComment(content, currentBlogId!, props.commentBody._id)
      await blogStore.getCurrentBlog(currentBlogId!)
    }

    notify({
      type: "success",
      title: "Success",
      text: "updated comment",
    });
  } catch (e) {
    console.log(e)
  }
}

const toggleLike = async (blogId: TypeBlogId, commentId: string) => {
  try {
    await blogStore.switchLikeComment(blogId, commentId);
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

</script>
