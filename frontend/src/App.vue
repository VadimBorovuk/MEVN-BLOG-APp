<template>
  <div :data-theme="themeStore.theme" class="min-h-screen flex flex-col">
    <Navbar />

    <div v-if="authUserStore.isCheckingAuth && !authUserStore.authUser"
         class="flex-grow flex items-center justify-center">
      <Loader class="size-10 animate-spin" />
    </div>

    <div v-else class="flex-grow pt-20 pb-10 h-full">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import {useAuthStore} from "./stores/authStore.js";
import { Loader } from "lucide-vue-next";
import {useThemeStore} from "./stores/themeStore.js";
import Navbar from "./components/Navbar.vue";

const authUserStore = useAuthStore();
const themeStore = useThemeStore();
</script>
