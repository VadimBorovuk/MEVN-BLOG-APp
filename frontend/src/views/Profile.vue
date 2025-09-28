<template>
  <div>

    <img
        :src="selectedImg || authUserStore.authUser.profilePic || '/avatar.png'"
        alt="Profile"
    />
    <input
        type="file"
        id="avatar-upload"
        accept="image/*"
        @change="handleImageUpload"
    />
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {axiosInstance} from "../utils/axios.ts";
import {useAuthStore} from "../stores/authStore.ts";

const authUserStore = useAuthStore()

const selectedImg = ref<any>(null)

const handleImageUpload = async (e: any) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = async () => {
    const base64Image = reader.result;
    selectedImg.value = base64Image;
    await updateProfile({profilePic: base64Image});
  };
};

const updateProfile = async (data: any) => {
  console.log(data)
  try {

   await axiosInstance.put("/auth/update_profile", data);
    authUserStore.authUser.value = res.data
    console.log('updated')
  } catch (e) {
    console.log(e)
  }
}

</script>

<style scoped>

</style>
