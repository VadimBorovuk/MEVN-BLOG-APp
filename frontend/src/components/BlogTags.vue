<template>
  <div>
    <h3 class="text-xl font-bold my-6">
      Tags
    </h3>
    <div class="flex flex-wrap">
      <button
          v-for="tag in TAGS"
          @click="applyFetchByTag(tag)"
          :disabled="tag === currentQueryTag"
          class="transition bg-base-100 flex items-center px-3 py-1 w-fit rounded-xl relative cursor-pointer hover:bg-base-200 mr-3 mb-3"
      >
        <span class="w-[8px] h-[8px] mr-[6px] rounded-full" :class="useTagColor(tag)?.class"/>
        <span class="text-sm">{{ tag.toUpperCase() }}</span>
      </button>
    </div>
  </div>
</template>

<!--
after link of tag query not work load  more
-->

<script setup lang="ts">
import {ref, watch} from "vue"
import {useTagColor} from "../composables/useTagOfBlog.ts";
import {useBlogStore} from "../stores/blogStore.ts";
import {useRoute, useRouter} from "vue-router";
import {TAGS} from "../constants"

const blogStore = useBlogStore();
const router = useRouter();
const route = useRoute();

const currentQueryTag = ref('')
const applyFetchByTag = async (tag: string) => {
  blogStore.applyQueryTag('tag', tag)
  blogStore.isLoadingBlogs = true;

  router.push({
    path: '/',
    query: {
      tag: tag,
    },
  })
}

watch(() => route.query.tag, (val) => {
  const resTag = val as string
  currentQueryTag.value = resTag
  blogStore.applyQueryParams(resTag)
},{ immediate: true})
</script>

<!--1761643655405-->
