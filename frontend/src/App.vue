<template>
  <div class="bg-violet-200">
    <div style="display: flex; align-items: center">
      <h1 class="mr-3 text-4xl">App MEVN Blog</h1>
      <h2 v-if="authUserStore.authUser" class="text-2xl">{{ userFullName }}</h2>

      <button @click="() => authUserStore.logout(router)">Logout</button>
    </div>

    <hr>
    <aside>
      <router-link active-class="text-white bg-blue-600" class="text-xl mr-3" to="/">Home</router-link>
      <router-link active-class="text-white bg-blue-600" class="text-xl" to="/profile">Profile</router-link>
    </aside>

    <router-view/>
  </div>
</template>

<script setup lang="ts">
import {useAuthStore} from "./stores/authStore.ts";
import {useRouter} from "vue-router";
import {computed} from "vue";
const router = useRouter()
const authUserStore = useAuthStore()

const userFullName = computed(() => authUserStore.authUser?.fullName ?? "");
</script>

<style scoped>

</style>
