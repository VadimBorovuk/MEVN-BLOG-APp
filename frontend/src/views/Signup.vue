<template>
  <div class="h-screen grid lg:grid-cols-2">
    <div class="flex flex-col justify-center items-center p-6 sm:p-12">
      <div class="w-full max-w-md space-y-8">
        <div class="text-center mb-8">
          <div class="flex flex-col items-center gap-2 group">
            <div
                class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
              transition-colors"
            >
              <Newspaper class="w-6 h-6 text-primary"/>
            </div>
            <h1 class="text-2xl font-bold mt-2">Welcome Back</h1>
            <p class="text-base-content/60">Sign in to your account</p>
          </div>

          <form @submit=handleSubmit class="space-y-6">

            <div class="mb-5">
              <label for="fullName" class="block mb-2 text-sm font-medium text-left">Enter your name</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail class="h-5 w-5 text-base-content/40"/>
                </div>
                <input
                    v-model="formData.fullName"
                    type="text" name="fullName" id="fullName"
                    class="pl-10 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-500 dark:placeholder-gray-400"
                    placeholder="Don Jon" required/>
              </div>
            </div>

            <div class="mb-5">
              <label for="email" class="block mb-2 text-sm font-medium text-left">Enter your email</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail class="h-5 w-5 text-base-content/40"/>
                </div>
                <input
                    v-model="formData.email"
                    type="email" name="email" id="email"
                    class="pl-10 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-500 dark:placeholder-gray-400"
                    placeholder="name@company.com" required/>
              </div>
            </div>

            <div class="mb-5">
              <label for="email" class="block mb-2 text-sm font-medium text-left">Enter your password</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock class="h-5 w-5 text-base-content/40"/>
                </div>
                <input
                    v-model="formData.password"
                    type="password" name="email" id="email"
                    class="pl-10 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-500 dark:placeholder-gray-400"
                    placeholder="***********" required/>
              </div>
            </div>

            <button type="submit" class="btn btn-primary w-full">
              Sign up
            </button>

            <div class="text-center">
              <p class="text-base-content/60">
                Don&apos;t have an account?
                <router-link to="/login" class="link link-primary">
                  Sign in
                </router-link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
    <AuthImagePattern
        subtitle="Sign in to continue your conversations"
        title="Welcome back!"
    />
  </div>

</template>

<script setup>
import {useAuthStore} from "../stores/authStore.ts";
import {ref} from "vue";
import {useRouter} from "vue-router";
import AuthImagePattern from "../components/UI/AuthImagePattern.vue";
import {Lock, Mail, Newspaper} from "lucide-vue-next";

const router = useRouter()

const formData = ref({})

const authUserStore = useAuthStore();
const handleSubmit = async (e) => {
  e.preventDefault();
  await authUserStore.signup(formData.value, router);
}
</script>

<style lang="scss" scoped>

</style>
