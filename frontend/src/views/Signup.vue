<template>
  <div>
    <form @submit=handleSubmit class="space-y-6">
      <div class="form-control">
        <label class="label">
          <span class="label-text font-medium">FullName</span>
        </label>
        <div class="relative">
          <input
              v-model="formData.fullName"
              type="text"
              placeholder="Don Jon"
          />
        </div>
      </div>

      <div class="form-control">
        <label class="label">
          <span class="label-text font-medium">Email</span>
        </label>
        <div class="relative">
          <input
              v-model="formData.email"
              type="email"
              placeholder="you@example.com"
          />
        </div>
      </div>

      <div class="form-control">
        <label class="label">
          <span class="label-text font-medium">Password</span>
        </label>
        <div class="relative">
          <input
              v-model="formData.password"
              class='input-bordered w-full pl-10'
              placeholder="••••••••"
          />
        </div>
      </div>

      <div>
        <router-link to="/login">to login</router-link>
      </div>

      <button type="submit" class="btn btn-primary w-full">
        Login
      </button>
    </form>
  </div>
</template>

<script setup>
import {useAuthStore} from "../stores/authStore.ts";
import {ref} from "vue";
import {useRouter} from "vue-router";
const router = useRouter()

const formData = ref({})

const authUserStore = useAuthStore();
const handleSubmit = async (e) => {
  e.preventDefault();
  const res = await authUserStore.signup(formData.value, router);
}
</script>

<style lang="scss" scoped>

</style>
