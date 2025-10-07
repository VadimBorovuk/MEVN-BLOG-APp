<template>
  <div class="hidden lg:flex items-center justify-center bg-base-200 p-12">
    <div class="max-w-md text-center">
      <div class="grid grid-cols-3 gap-3 mb-8">
        <div
            v-for="(item, i) in patternItems"
            :key="i"
            class="aspect-square rounded-2xl bg-primary/10"
            :class="{ 'animate-pulse': i % 2 === 0 }"
        ></div>
      </div>

      <h2 class="text-2xl font-bold mb-4">{{ title }}</h2>

      <p class="text-base-content/60">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
const patternItems = Array(9).fill(null);
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
});
</script>
