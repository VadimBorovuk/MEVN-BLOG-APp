<template>
  <div
      class="w-full p-6 bg-base-100 rounded-2xl flex-col justify-start items-start gap-6 flex">
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
            <h5 class="text-sm font-semibold leading-snug">
              {{ commentBody?.userId?.fullName }}
            </h5>
            <h6 class="text-gray-500 text-xs font-normal leading-5">
              {{
                useDate(commentBody.createdAt!, 'MMM D, YYYY')
              }}
            </h6>
          </div>
        </div>
        <div class="dropdown dropdown-end" v-if="commentBody?.userId?._id === authUserStore.authUser?._id">
          <button tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <EllipsisVertical class="size-4"/>
          </button>
          <ul tabindex="0"
              class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-44 p-2 shadow">
            <li @click="handleComment(commentBody)">
              <div class="flex items-center">
                <SquarePen class="size-4"/>
                <span>{{ commentBody?.is_updated ? "Hide" : "Edit" }}</span>
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
      <p v-if="!commentBody.is_updated" class="text-sm font-normal leading-snug">
        {{ commentBody.content }}
      </p>
      <!--      -->
      <textarea
          v-else
          rows="5"
          @keypress.enter.prevent="updateComment(commentBody.content)"
          v-model="commentBody.content"
          class="w-full py-3 px-5 rounded-lg bg-base-300 shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] focus:outline-none placeholder-gray-400 text-lg font-normal leading-relaxed"
          placeholder="Write comments here...."/>
    </div>
    <div class="w-full justify-between items-center inline-flex">
      <div/>
      <button
          v-if="blogStore.currentBlog._id && commentBody._id"
          @click="toggleLike(blogStore.currentBlog._id, commentBody._id)"
          class="flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition cursor-pointer"
      >
        <ThumbsUp />
        <span>{{ commentBody?.likes?.length }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from "vue";
import type {TypeBlogId, TypeComment} from "../../types";
import {useDate} from "../../composables/useDateFormat.ts";
import {EllipsisVertical, SquarePen, Trash2, ThumbsUp} from "lucide-vue-next";
import {useBlogStore} from "../../stores/blogStore.ts";
import {useRoute} from "vue-router";
import {useAuthStore} from "../../stores/authStore.ts";
import {useShowNotify} from "../../composables/useNotivue.ts";

const props = defineProps<{
  commentBody: TypeComment,
}>()

const route = useRoute()
const currentBlogId = route.params.id;
const blogStore = useBlogStore();
const {showNotify} = useShowNotify();
const authUserStore = useAuthStore();

const deleteComment = async () => {
  try {
    if (currentBlogId) {
      await blogStore.deleteCurrentComment(currentBlogId, props.commentBody._id)
      await blogStore.getCurrentBlog(currentBlogId)
    }

    showNotify(false, "", "Deleted comment");
  } catch (e) {

    showNotify(true, "Not deleted comment", "");
  }
}

const handleComment = (commentData: TypeComment) => {
  commentData.is_updated = !commentData.is_updated
}

const updateComment = async (content: string) => {
  if (!content.length) {
    showNotify(true, "Content not be empty", "");
    return;
  }

  try {
    if (currentBlogId) {
      await blogStore.updateCurrentComment(content, currentBlogId!, props.commentBody._id)
      await blogStore.getCurrentBlog(currentBlogId!)
    }

    showNotify(false, "", "Updated comment");
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
  } catch (e) {
    showNotify(true, "Not liked comment", "");
  }
}

</script>
