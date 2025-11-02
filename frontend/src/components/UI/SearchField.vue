<template>
  <div class="relative w-100">
    <div class="relative">
      <!-- Іконка пошуку -->
      <Search
          class="absolute cursor-pointer left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 z-50"
      />
      <!-- Інпут -->
      <input
          v-model="blogStore.searchQueryBlog"
          type="text"
          placeholder="Search..."
          class="input input-bordered w-full pl-10"
          @focus="isOpen = true"
          @input="onInput"
          @blur="closeDropdown"
      />

      <!-- Кнопка очистки -->
      <button
          v-if="blogStore.searchQueryBlog.length"
          type="button"
          class="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 z-50"
          @click="clearSearch"
      >
        <CircleX />
      </button>
    </div>

    <!-- Результати -->
    <div
        v-if="isOpen && blogStore.searchingBlogs.pagination?.total"
        class="absolute left-0 right-0 mt-1 bg-base-100 border border-base-300 rounded-box shadow-lg z-50 max-h-60 overflow-auto"
    >

      <BlogCardSearch
          v-for="(item, index) in blogStore.searchingBlogs.data"
          :key="index"
          :blogData="item"
          class="px-4 py-2 cursor-pointer hover:bg-base-200"
          @mousedown.prevent="selectItem(item)"
      />
    </div>

<!--    <div v-else-if="isOpen && blogStore.isLoadingSearchBlog">-->
<!--      <Loader class="size-10 animate-spin" />-->
<!--    </div>-->

    <!-- Not found -->
    <div
        v-else-if="isOpen && blogStore.isLoadingSearchBlog"
        class="flex items-center justify-center absolute left-0 right-0 mt-1 bg-base-100 border border-base-300 rounded-box shadow-lg z-50 p-3 text-sm text-gray-500"
    >
      <Loader class="size-10 animate-spin" />
    </div>

    <div
        v-else-if="isOpen && !blogStore.isLoadingSearchBlog && blogStore.searchingBlogs.pagination?.total === 0"
        class="absolute left-0 right-0 mt-1 bg-base-100 border border-base-300 rounded-box shadow-lg z-50 p-3 text-sm text-gray-500"
    >
      Not found
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import BlogCardSearch from "./BlogCardSearch.vue";
import {Loader, Search, CircleX} from "lucide-vue-next";
import {useBlogStore} from "../../stores/blogStore.ts";
import type {PartialTypeBlog} from "../../types";
import {useRouter} from "vue-router";

const router = useRouter()
const isOpen = ref<boolean>(false);
const blogStore = useBlogStore();

let timerId: number | null = null;
const debounceDelay = 500;

const onInput = (e: Event): void => {
  const target = e.target as HTMLInputElement;
  blogStore.searchQueryBlog = target.value;

  if (timerId) clearTimeout(timerId);
  timerId = setTimeout(() => {
    handleSearchBlog(blogStore.searchQueryBlog);
  }, debounceDelay);
};


const handleSearchBlog = async (title: string) => {
  if (!title) {
    blogStore.clearSearchingBlogs();
    return;
  }

  await blogStore.fetchBlogsByTitle({title})
};


const clearSearch = (): void => {
  blogStore.searchQueryBlog = "";
  blogStore.clearSearchingBlogs()
  if (timerId) clearTimeout(timerId);
  handleSearchBlog("");
};

const selectItem = (item: PartialTypeBlog): void => {
  let route = router.resolve({
    name: 'blogData',
    params: {id: item._id},
  });
  window.open(route.href, '_self');
  isOpen.value = false;
};

const closeDropdown = (): void => {
  setTimeout(() => (isOpen.value = false), 150);
};
</script>
