<template>
  <ScrollProgress/>
  <div>
    <h1>{{ blogStore.currentBlog.title}}</h1>
   <span>{{blogStore.currentBlog.content}}
   </span>

    <div v-if="blogStore.isLoadingCurrentBlog">Blog loading...</div>

    <div>
      <input
          type="file"
          id="avatar-upload"
          accept="image/*"
          @change="handleImageUpload"
      />
      <div class="max-w-sm">
        <img
            class="w-full"
            :src="blogStore.currentBlog.previewImage || '/avatar.png'"
            alt="image"
        />
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {useRoute} from "vue-router";
import type {PartialIBlog} from "../types";
import {useBlogStore} from "../stores/blogStore.ts";
import ScrollProgress from "../components/UI/ScrollProgress.vue";

const blogStore = useBlogStore()
const route = useRoute()
const currentBlogId = route.params.id


const handleImageUpload = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;
  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = async () => {
    blogStore.changePreviewImage(reader.result as string)
    await updateBlog({
      title: blogStore.currentBlog.title ?? '',
      content: blogStore.currentBlog.content ?? '',
      previewImage: blogStore.currentBlog.previewImage ?? ''
    });
  };
};

const updateBlog = async (data: PartialIBlog) => {
  try {
    await blogStore.updateCurrentBlog(data, currentBlogId ?? '');
    console.log('updated')
  } catch (e) {
    console.log(e)
  }
}


onMounted(() => {
  if (currentBlogId){
    blogStore.getCurrentBlog(currentBlogId)
  }
})
</script>
