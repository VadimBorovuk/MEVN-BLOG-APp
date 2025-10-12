<template>
  <div
      class="w-full p-6 bg-white rounded-2xl border border-gray-200 flex-col justify-start items-start gap-8 flex">
    <div class="w-full flex-col justify-center items-start gap-3.5 flex">
      <div class="w-full justify-between items-center inline-flex">
        <div class="justify-start items-center gap-2.5 flex">
          <div
              class="w-10 h-10 bg-gray-300 rounded-full justify-start items-start gap-2.5 flex">
            <img class="rounded-full object-cover h-full w-full"
                 :src="commentBody.userId.profilePic"
                 alt="Jenny wilson image"/>
          </div>
          <div class="flex-col justify-start items-start gap-1 inline-flex">
            <h5 class="text-gray-900 text-sm font-semibold leading-snug">
              {{ commentBody.userId.fullName }}
            </h5>
            <h6 class="text-gray-500 text-xs font-normal leading-5">
              {{
                useDate(commentBody.createdAt!, 'DD MM YYYY H:mm')
              }}
            </h6>
          </div>
        </div>
        <div class="dropdown dropdown-end">
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
      <input v-else type="text"
             @keypress.enter.prevent="updateComment(commentBody.content)"
             v-model="commentBody.content"
             class="w-full py-3 px-5 rounded-lg border border-gray-300 bg-white shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed"
             placeholder="Write comments here....">
    </div>
    <div class="w-full justify-between items-center inline-flex">
      <div/>
      <div class="justify-end items-center gap-1 flex">
        <h5 class="text-gray-500 text-sm font-normal leading-snug">30</h5>
        <div class="justify-start items-start flex -space-x-2 overflow-hidden">
          <div
              class="p-1.5 inline-block ring-1 ring-white bg-gray-100 rounded-full border border-white justify-center items-center flex">
            <img class="w-3 h-3"
                 src="https://pagedone.io/asset/uploads/1716545141.png"
                 alt="Thumbs Up emoji"/>
          </div>
          <div
              class="p-1.5 inline-block ring-1 ring-white bg-gray-100 rounded-full border border-white justify-center items-center flex">
            <img class="w-3 h-3"
                 src="https://pagedone.io/asset/uploads/1716545183.png"
                 alt="Smiling eyes emoji"/>
          </div>
          <div
              class="p-1.5 inline-block ring-1 ring-white bg-gray-100 rounded-full border border-white justify-center items-center flex">
            <img class="w-3 h-3"
                 src="https://pagedone.io/asset/uploads/1716545217.png"
                 alt="hugging face emoji"/>
          </div>
        </div>
      </div>
    </div>
  </div>


  <!--  <div class="justify-start items-center gap-2.5 flex">-->
  <!--    <div-->
  <!--        class="w-10 h-10 bg-stone-300 rounded-full justify-start items-start gap-2.5 flex">-->
  <!--      <img class="rounded-full object-cover"-->
  <!--           :src="commentBody.userId.profilePic"-->
  <!--           alt="John smith image" />-->
  <!--    </div>-->
  <!--    <div class="flex-col justify-start items-start gap-1 inline-flex">-->
  <!--      <h5 class="text-gray-900 text-sm font-semibold leading-snug">{{commentBody.userId.fullName}}</h5>-->
  <!--      <h6 class="text-gray-500 text-xs font-normal leading-5">-->
  <!--        {{-->
  <!--          !useDiff(commentBody.createdAt!) ? 'Today' :-->
  <!--              useDiff(commentBody.createdAt!) === 1 ? `${useDiff(commentBody.createdAt!)} day ago` : `${useDiff(commentBody.createdAt!)} days ago`-->
  <!--        }}-->
  <!--      </h6>-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<script setup lang="ts">
import {defineProps} from "vue";
import type {TypeComment} from "../../types";
import {useDate} from "../../composables/useDateFormat.ts";
import {SquarePen, Trash2} from "lucide-vue-next";
import {useBlogStore} from "../../stores/blogStore.ts";
import {useNotification} from "@kyvg/vue3-notification";
import {useRoute} from "vue-router";

const props = defineProps<{
  commentBody: TypeComment,
}>()

const route = useRoute()
const currentBlogId = route.params.id;
const blogStore = useBlogStore();
const {notify} = useNotification();

const deleteComment = async () => {
  try {
    if (currentBlogId){
      await blogStore.deleteCurrentComment(currentBlogId, props.commentBody._id)
      await blogStore.getCurrentBlog(currentBlogId)
    }

    notify({
      type: "success",
      title: "Success",
      text: "delete comment",
    });
  } catch (e) {
    console.log(e)
  }
}

const handleComment = (commentData: TypeComment) => {
  commentData.is_updated = !commentData.is_updated
}

const updateComment =  async (content: string) =>{
  if (!content.length) {
    notify({
      type: "error",
      title: "error",
      text: "Content not be empty",
    });
    return;
  }
  try {
    if (currentBlogId){
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
</script>
