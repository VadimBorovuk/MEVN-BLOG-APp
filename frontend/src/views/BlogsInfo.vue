<template>
  <div>
    <h1>{{blogData.title}}</h1>
   <span>{{blogData.content}}</span>

    <div v-if="isLoading">Blog loading...</div>

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
            :src="blogData.previewImage || '/avatar.png'"
            alt="image"
        />
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {axiosInstance} from "../utils/axios.ts";
import {useRoute} from "vue-router";
import type {PartialIBlog, TypeBlog} from "../types";

const isLoading = ref<boolean>(false)
const blogData = ref<PartialIBlog>({})
const route = useRoute()
const currentBlogId = route.params.id

const fetchBlogById = async (id: string | string[]) => {
  isLoading.value = true
  try {
    const res = await axiosInstance.get<TypeBlog>(`/blogs/${id}`);
    blogData.value = res.data
  } catch (e) {
    console.log(e)
  } finally {
    isLoading.value = false
  }
}

const handleImageUpload = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;
  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = async () => {
    blogData.value.previewImage = reader.result as string
    await updateBlog({
      title: blogData.value.title ?? '',
      content: blogData.value.content ?? '',
      previewImage: blogData.value.previewImage ?? ''
    });
  };
};

const updateBlog = async (data: PartialIBlog) => {
  try {
    await axiosInstance.put(`/blogs/update/${currentBlogId}`, data);
    console.log('updated')
  } catch (e) {
    console.log(e)
  }
}


onMounted(() => {
  if (currentBlogId){
    fetchBlogById(currentBlogId)
  }
  // fetchBlogs()
})
</script>
