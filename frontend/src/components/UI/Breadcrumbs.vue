<template>
  <div class="breadcrumbs text-lg">
    <ul>
      <li>
        <router-link to="/">
          Blogs
        </router-link>
      </li>
      <li class="font-bold">{{ currentCrumb }}</li>
    </ul>
  </div>
  <div class="divider mt-0"></div>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

defineProps<{
  currentCrumb: string | undefined
}>()
</script>
