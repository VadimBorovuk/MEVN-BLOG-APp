<template>
  <ScrollProgress/>
  <div class="h-screen container mx-auto px-4 pt-24 pb-10" ref="profileEndRef">

    <template v-if="authUserStore.isCheckingAuth">
      <BlogSkeleton/>
    </template>

    <div v-else>
      <div class="max-w-2xl mx-auto p-4 py-8">
        <div class="bg-base-300 rounded-xl p-6 space-y-8">
          <!-- Заголовок -->
          <div class="text-center">
            <h1 class="text-2xl font-semibold">Profile</h1>
            <p class="mt-2">Your profile information</p>
          </div>

          <!-- Аватар -->
          <div class="flex flex-col items-center gap-4">
            <div class="relative">
              <img
                  :src="authUserStore.currentAvatarProfile || authUserStore.authUser?.profilePic || '/avatar.png'"
                  alt="Profile"
                  class="size-32 rounded-full object-cover border-4"
              />
              <label
                  for="avatar-upload"
                  :class="[
                'absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200'
              ]"
              >
                <Camera class="w-5 h-5 text-base-200"/>
                <input
                    type="file"
                    id="avatar-upload"
                    class="hidden"
                    accept="image/*"
                    @change="handleImageUpload"
                />
              </label>
            </div>
            <!--              <p class="text-sm text-zinc-400">-->
            <!--                {{ isUpdatingProfile ? 'Uploading...' : 'Click the camera icon to update your photo' }}-->
            <!--              </p>-->
          </div>

          <!-- Основна інформація -->
          <div class="space-y-6">
            <div class="space-y-1.5">
              <div class="text-sm text-zinc-400 flex items-center gap-2">
                <User class="w-4 h-4"/>
                Full Name
              </div>

              <input
                  v-if="authUserStore.authUser"
                  type="text"
                  class="input validator w-full"
                  required
                  placeholder="Enter title"
                  v-model="authUserStore.authUser.fullName"
                  pattern=".{3,100}"
                  minlength="3"
                  maxlength="100"
                  title="Введіть від 3 до 100 символів"
              />
            </div>

            <div class="space-y-1.5">
              <div class="text-sm text-zinc-400 flex items-center gap-2">
                <Mail class="w-4 h-4"/>
                Email Address
              </div>
              <input
                  v-if="authUserStore.authUser"
                  type="text"
                  class="input validator w-full"
                  placeholder="Enter title"
                  v-model="authUserStore.authUser.email"
                  readonly
                  title="Введіть від 3 до 100 символів"
              />
            </div>
          </div>

          <button @click="updateProfileData" class="btn btn-soft btn-success flex items-center w-full">
            <SquarePen/>
            <span>{{ authUserStore.isChangeProfile ? 'Updating...' : 'Save' }}</span>
          </button>
        </div>

      </div>


      <!--        <span v-if="authUserStoreStore.isChangeProfile" class="text-4xl">Loading...</span>-->
      <!--        <div class="max-w-sm">-->
      <!--          <img-->
      <!--              :src="selectedImg || authUserStoreStore?.authUserStore?.profilePic || '/avatar.png'"-->
      <!--              alt="Profile"-->
      <!--          />-->
      <!--        </div>-->
      <!--        <input-->
      <!--            type="file"-->
      <!--            id="avatar-upload"-->
      <!--            accept="image/*"-->
      <!--            @change="handleImageUpload"-->
      <!--        />-->
    </div>

  </div>


</template>

<script setup lang="ts">
import {useAuthStore} from "../stores/authStore.ts";
import ScrollProgress from "../components/UI/ScrollProgress.vue";
import BlogSkeleton from "../components/UI/BlogSkeleton.vue";
import {Camera, User, Mail, SquarePen} from "lucide-vue-next";
import {onMounted} from "vue";
import {useShowNotify} from "../composables/useNotivue.ts";

const {showNotify} = useShowNotify();
const authUserStore = useAuthStore()

const handleImageUpload = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;
  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = async () => {
    authUserStore.changeAvatarProfile(reader.result as string)
  };
};

const updateProfileData = async () => {
  try {
    await authUserStore.updateProfile();
    showNotify(false, "", "Profile updated");

  } catch (e) {
    showNotify(true, "Don't updated profile", "");
  }
}

onMounted(() => {
  if (authUserStore.authUser) {
    authUserStore.changeAvatarProfile(authUserStore.authUser?.profilePic)
  }
})
</script>
