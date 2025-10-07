<template>
  <div>
      <span v-if="authUserStore.isChangeProfile" class="text-4xl">Loading...</span>
    <div class="max-w-sm">
      <img
          :src="selectedImg || authUserStore?.authUser?.profilePic || '/avatar.png'"
          alt="Profile"
      />
    </div>
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
import {useAuthStore} from "../stores/authStore.ts";

const authUserStore = useAuthStore()

const selectedImg = ref<string>('')

const handleImageUpload = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;
  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = async () => {
    const base64Image = reader.result as string;
    selectedImg.value = base64Image;
    await authUserStore.updateProfile({profilePic: base64Image});
  };
};

</script>

<style scoped>

</style>
