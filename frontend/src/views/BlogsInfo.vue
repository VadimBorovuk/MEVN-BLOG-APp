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
      <img
          style="max-width: 300px"
          :src="blogData.previewImage || '/avatar.png'"
          alt="image"
      />
    </div>

  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {axiosInstance} from "../utils/axios.ts";
import {useRoute} from "vue-router";

type TypeUser = {
  fullName: string
  email: string
  password: string
}

type TypeLike = {
  userId: TypeUser
}

type TypeComment = {
  _id: number
  userId: TypeUser
  content: string
  likes: TypeLike[]
  createdAt: Date
}


interface IBlog {
  _id?: number
  userId?: TypeUser
  title?: string
  content?: string
  comments?: TypeComment[]
  likes?: TypeLike[]
  previewImage?: any
}

const isLoading = ref<boolean>(false)
const blogData = ref<IBlog>({})
const route = useRoute()
const currentBlogId = route.params.id

const fetchBlogById = async (id: string | string[]) => {
  isLoading.value = true
  try {
    const res = await axiosInstance.get<IBlog>(`/blogs/${id}`);
    blogData.value = res.data
  } catch (e) {
    console.log(e)
  } finally {
    isLoading.value = false
  }
}

const handleImageUpload = async (e: any) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = async () => {
    const base64Image = reader.result;
    blogData.value.previewImage = base64Image
    await updateBlog({
      title: blogData.value.title,
      content: blogData.value.content,
      previewImage: blogData.value.previewImage
    });
  };
};

const updateBlog = async (data: any) => {
  console.log(data)
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
