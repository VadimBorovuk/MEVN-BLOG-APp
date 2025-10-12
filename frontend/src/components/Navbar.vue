<template>
  <header
      class="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40
    backdrop-blur-lg bg-base-100/80"
  >
    <div class="container mx-auto px-4 h-16">
      <div class="flex items-center justify-between h-full">
        <div class="flex items-center gap-8">
          <router-link to="/" class="flex items-center gap-2.5 hover:opacity-80 transition-all">
            <div class="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Newspaper class="w-5 h-5 text-primary"/>
            </div>
            <h1 class="text-lg font-bold">Blogitty</h1>
          </router-link>
        </div>

        <div v-if="authUserStore.authUser" class="flex items-center gap-2">
          <router-link to="/create-blog" class="btn btn-soft btn-primary flex items-center">
            <DiamondPlus/>
            <span>Create blog</span>
          </router-link>
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">
                <img
                    alt="Tailwind CSS Navbar component"
                    :src="authUserStore.authUser?.profilePic || '/image.png'"/>
              </div>
            </div>

            <ul
                tabindex="0"
                class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <router-link to="/profile" class="justify-between">
                  Profile
                  <span class="badge">
                    {{authUserStore.authUser?.fullName}}
                  </span>
                </router-link>
              </li>
              <li>
                <router-link
                    to="/settings"
                >
                  <Settings class="w-4 h-4"/>
                  <span>Settings</span>
                </router-link>
              </li>
              <li @click="authUserStore.logout(router)">
                <div class="flex items-center">
                  <LogOut class="size-4"/>
                  <span>Logout</span>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  </header>

</template>

<script setup>
import {useAuthStore} from "../stores/authStore.ts";
import {useRouter} from "vue-router";

const router = useRouter()
const authUserStore = useAuthStore()
import {Newspaper, Settings, LogOut, DiamondPlus} from "lucide-vue-next";

</script>
