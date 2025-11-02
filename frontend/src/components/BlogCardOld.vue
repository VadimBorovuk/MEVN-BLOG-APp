<!--<template>-->
<!--  <article-->
<!--      class="bg-base-300 flex flex-col relative p-6 shadow-lg transition duration-300 group transform hover:-translate-y-2 hover:shadow-2xl rounded-2xl"-->
<!--  >-->
<!--    <div class="flex-2 relative z-10 mb-4 rounded-2xl overflow-hidden">-->
<!--      <img-->
<!--          class="rounded-2xl w-full object-cover transition-transform duration-300 transform group-hover:scale-105"-->
<!--          :class="getColSpanClass(index)"-->
<!--          :src="blogData?.previewImage"-->
<!--          alt=""-->
<!--      />-->

<!--      <div-->
<!--          v-if="blogData?.userId?._id === authUserStore.authUser?._id"-->
<!--          class="absolute top-3 right-3 inline-flex items-center rounded-lg bg-base-200 p-1 shadow-md z-20 cursor-pointer dropdown dropdown-end">-->
<!--        <button tabindex="0" role="button" class="btn btn-ghost btn-circle">-->
<!--          <EllipsisVertical class="size-4"/>-->
<!--        </button>-->
<!--        <ul tabindex="0"-->
<!--            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-44 p-2 shadow">-->
<!--          <li>-->
<!--            <router-link-->
<!--                :to="`/update-blog/${blogData?._id}`"-->
<!--            >-->
<!--              <SquarePen class="size-4"/>-->
<!--              Update-->
<!--            </router-link>-->
<!--          </li>-->
<!--          <li @click="deleteBlog">-->
<!--            <div class="flex items-center">-->
<!--              <Trash2 class="size-4"/>-->
<!--              <span>Delete</span>-->
<!--            </div>-->
<!--          </li>-->
<!--        </ul>-->
<!--      </div>-->

<!--      &lt;!&ndash; Лайки &ndash;&gt;-->
<!--      <div v-if="blogData?.likes?.length" tabindex="0"-->
<!--           class="dropdown absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md z-30 cursor-pointer">-->
<!--        <svg-->
<!--            xmlns="http://www.w3.org/2000/svg"-->
<!--            fill="currentColor"-->
<!--            viewBox="0 0 24 24"-->
<!--            stroke-width="1.5"-->
<!--            stroke="currentColor"-->
<!--            class="h-5 w-5 text-red-700"-->
<!--        >-->
<!--          <path-->
<!--              stroke-linecap="round"-->
<!--              stroke-linejoin="round"-->
<!--              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"-->
<!--          />-->
<!--        </svg>-->
<!--        <div class="m-1 text-black">{{ blogData?.likes?.length }}</div>-->

<!--        <ul v-if="blogData?.likes?.length" tabindex="0"-->
<!--            class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">-->
<!--          <li v-for="likeItem in blogData?.likes">-->
<!--            {{ likeItem?.userId?.fullName }}-->
<!--          </li>-->
<!--        </ul>-->
<!--      </div>-->

<!--      &lt;!&ndash;  comments    &ndash;&gt;-->
<!--      <div v-if="blogData?.comments?.length" tabindex="1"-->
<!--           class="dropdown absolute bottom-3 left-18 inline-flex items-center rounded-lg bg-white p-2 shadow-md z-30 cursor-pointer">-->
<!--        <MessageCircle class="text-black"/>-->
<!--        <div class="m-1 text-black">{{ blogData?.comments?.length }}</div>-->
<!--      </div>-->

<!--      &lt;!&ndash; Оверлей на ховер &ndash;&gt;-->
<!--      <router-link-->
<!--          class="flex justify-center items-center bg-red-400 bg-opacity-80 z-10 absolute top-0 left-0 w-full h-full text-white rounded-2xl opacity-0 transition-all duration-300 transform group-hover:scale-105 text-xl group-hover:opacity-100 cursor-pointer"-->
<!--          :to="`/blogs/${blogData?._id}`">-->
<!--        <span>Read article</span>-->
<!--        <ChevronsRight class="mt-1"/>-->
<!--      </router-link>-->
<!--    </div>-->

<!--    <div class="flex-1 flex flex-col justify-between">-->

<!--      &lt;!&ndash; Заголовок &ndash;&gt;-->
<!--      <div class="">-->
<!--        <h3 class="relative z-10 font-medium text-xl leading-8">-->
<!--          <router-link-->
<!--              :to="`/blogs/${blogData?._id}`"-->
<!--              class="relative group-hover:text-red-400 transition-colors duration-200 line-clamp-3"-->
<!--          >-->
<!--            {{ blogData?.title }}-->
<!--          </router-link>-->
<!--        </h3>-->
<!--        &lt;!&ndash;        <div class="text-gray-500 line-clamp-4"&ndash;&gt;-->
<!--        &lt;!&ndash;             v-html="blogData?.content"/>&ndash;&gt;-->
<!--        &lt;!&ndash;          {{&ndash;&gt;-->
<!--        &lt;!&ndash;            blogData?.content && blogData?.content.length > 250 ? blogData?.content.substring(0, 250) + "..." : blogData?.content&ndash;&gt;-->
<!--        &lt;!&ndash;          }}&ndash;&gt;-->
<!--      </div>-->


<!--      &lt;!&ndash; Автор і дата &ndash;&gt;-->
<!--      <div>-->
<!--        <div class="divider"></div>-->
<!--        <div class="relative z-10 flex justify-between items-start w-full pb-4">-->

<!--          <div class="flex items-center">-->
<!--            <div class="pr-3">-->
<!--              <img-->
<!--                  class="h-12 w-12 rounded-full object-cover"-->
<!--                  :src="blogData?.userId?.profilePic"-->
<!--                  alt="avatar"-->
<!--              />-->
<!--            </div>-->
<!--            <div class="flex flex-1">-->
<!--              <div>-->
<!--                <p class="text-sm font-semibold">{{ blogData?.userId?.fullName }}</p>-->
<!--                <p class="text-sm text-gray-500">Published on {{ useDate(blogData?.createdAt!) }}</p>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->

<!--          <div class="flex justify-end">-->
<!--            <div class="text-sm flex items-center text-gray-500">-->
<!--              <span class="mr-2">-->
<!--                {{-->
<!--                  !useDiff(blogData?.createdAt!) ? 'Today' :-->
<!--                      useDiff(blogData?.createdAt!) === 1 ? `${useDiff(blogData?.createdAt!)} day ago` : `${useDiff(blogData?.createdAt!)} days ago`-->
<!--                }}-->
<!--              </span>-->
<!--              <Clock/>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </article>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import type {PartialTypeBlog} from "../types";-->
<!--import {useAuthStore} from "../stores/authStore.ts";-->
<!--import {useDate, useDiff} from "../composables/useDateFormat.ts";-->
<!--import {ChevronsRight, Clock, MessageCircle, SquarePen,EllipsisVertical, Trash2} from 'lucide-vue-next';-->
<!--import {useBlogStore} from "../stores/blogStore.ts";-->

<!--const {notify} = useNotification();-->
<!--const authUserStore = useAuthStore();-->
<!--const blogStore = useBlogStore();-->

<!--const getColSpanClass = (index: number) => {-->
<!--  const spans = ['min-h-90 max-h-90', 'min-h-90 max-h-90', 'min-h-70 max-h-70', 'min-h-70 max-h-70', 'min-h-70 max-h-70'];-->

<!--  return spans[index % spans.length];-->
<!--}-->

<!--const props = defineProps<{-->
<!--  blogData?: PartialTypeBlog | null-->
<!--  index: number-->
<!--}>()-->

<!--const deleteBlog = async () => {-->
<!--  try {-->
<!--    if (props.blogData){-->
<!--      await blogStore.deleteCurrentBlog(props.blogData?._id ?? '')-->
<!--      // await blogStore.getAllBlogs()-->
<!--    }-->

<!--    notify({-->
<!--      type: "success",-->
<!--      title: "Success",-->
<!--      text: "delete blog",-->
<!--    });-->
<!--  } catch (e) {-->
<!--    notify({-->
<!--      type: "error",-->
<!--      title: "Error",-->
<!--      text: "delete blog",-->
<!--    });-->
<!--  }-->
<!--}-->

<!--</script>-->

<template>
  <div>
bard card
  </div>
</template>

<script setup>

</script>
