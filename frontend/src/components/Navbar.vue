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
            <h1 class="text-lg font-bold">Blogify</h1>
          </router-link>
        </div>


        <div class="flex items-center">
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
                    {{ authUserStore.authUser?.fullName }}
                  </span>
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
          <!--                <button-->
          <!--                    v-for="t in THEMES"-->
          <!--                    :key="t"-->
          <!--                    :class="[-->
          <!--        'group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors',-->
          <!--        themeStore.theme === t ? 'bg-base-200' : 'hover:bg-base-200/50'-->
          <!--      ]"-->
          <!--                    @click="themeStore.setTheme(t)"-->
          <!--                >-->

          <!--                </button>-->
          <label class="flex cursor-pointer gap-2 ml-4">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round">
              <circle cx="12" cy="12" r="5"/>
              <path
                  d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>
            </svg>
            <input
                type="checkbox"
                class="toggle theme-controller"
                :checked="themeStore.theme === 'dark'"
                @change="handleTheme"
            />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </label>
        </div>

      </div>
    </div>
  </header>

</template>

<script setup lang="ts">
import {useAuthStore} from "../stores/authStore.ts";
import {useRouter} from "vue-router";


import {Newspaper, LogOut, DiamondPlus} from "lucide-vue-next";
import {useThemeStore} from "../stores/themeStore.js";
import {onMounted} from "vue";


const router = useRouter()
const authUserStore = useAuthStore()
const themeStore = useThemeStore()

const handleTheme = (event: Event) => {
  const target = event.target as HTMLInputElement
  const isChecked = target.checked
  const newTheme = isChecked ? 'dark' : 'light'
  themeStore.setTheme(newTheme)
}

onMounted(() => {
  themeStore.setTheme(themeStore.theme)
})
</script>
