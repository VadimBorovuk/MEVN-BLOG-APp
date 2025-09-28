<template>
  <div>
    <div style="display: flex; align-items: center">
      <h1 class="mr-3 text-4xl">App MEVN Blog</h1>
<!--      <h2 class="text-2xl">{{ authUserStore.authUser.fullName }}</h2>-->

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
const router = useRouter()
const authUserStore = useAuthStore()

</script>

<style scoped>

</style>
