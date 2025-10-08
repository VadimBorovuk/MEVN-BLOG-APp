<template>
  <article
      class="flex flex-col relative bg-white p-6 shadow-lg transition duration-300 group transform hover:-translate-y-2 hover:shadow-2xl rounded-2xl border border-gray-300"
  >

    <div class="flex-1 relative z-10 mb-4 rounded-2xl overflow-hidden">
      <img
          class="min-h-70 max-h-70 rounded-2xl w-full object-cover transition-transform duration-300 transform group-hover:scale-105"
          :src="blogData.previewImage"
          alt=""
      />

      <!-- Лайки -->
      <div tabindex="0" class="dropdown absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md z-20 cursor-pointer">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-5 w-5 text-red-700"
        >
          <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
        <div class="m-1">{{blogData.likes?.length}}</div>

        <ul v-if="blogData.likes" tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
          <li v-for="likeItem in blogData.likes">
            {{likeItem.userId.fullName}}
          </li>
        </ul>
      </div>

      <!-- Оверлей на ховер -->

      <router-link
          class="flex justify-center items-center bg-red-700 bg-opacity-80 z-10 absolute top-0 left-0 w-full h-full text-white rounded-2xl opacity-0 transition-all duration-300 transform group-hover:scale-105 text-xl group-hover:opacity-100 cursor-pointer"
          :to="`/blogs/${blogData._id}`">
        Read article
        <svg
            class="ml-2 w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
          ></path>
        </svg>
      </router-link>

    </div>


    <div class="flex-1 flex flex-col justify-between">
      <!-- Заголовок -->
      <div class="">
        <h3 class="relative z-10 font-medium text-xl leading-8">
          <router-link
              :to="`/blogs/${blogData._id}`"
              class="block relative group-hover:text-red-700 transition-colors duration-200"
          >
            {{ blogData.title }}
          </router-link>
        </h3>
        <span class="text-gray-500">
          {{ blogData.content && blogData.content.length > 200 ? blogData.content.substring(0, 200) + "..." : blogData.content }}
        </span>
      </div>


      <!-- Автор і дата -->
      <div>
        <div class="divider"></div>
        <div class="relative z-10 flex justify-between items-center w-full pb-4">

          <div class="flex items-center">
            <div class="pr-3">
              <img
                  class="h-12 w-12 rounded-full object-cover"
                  :src="blogData.userId?.profilePic"
                  alt="avatar"
              />
            </div>
            <div class="flex flex-1">
              <div>
                <p class="text-sm font-semibold">{{ blogData.userId?.fullName }}</p>
                <p class="text-sm text-gray-500">Published on {{ useData(blogData.createdAt!) }}</p>
              </div>
            </div>
          </div>

          <div class="flex justify-end">
            <div class="text-sm flex items-center text-gray-500">
              {{ useDiff(blogData.createdAt!) }} days ago
              <svg
                  class="ml-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

    </div>

  </article>


</template>

<script setup lang="ts">
import type {PartialIBlog} from "../types";
// import {useAuthStore} from "../stores/authStore.ts";
import {useData, useDiff} from "../composables/useDateFormat.ts";

// const authUserStore = useAuthStore()
defineProps<{
  blogData: PartialIBlog
}>()

</script>

