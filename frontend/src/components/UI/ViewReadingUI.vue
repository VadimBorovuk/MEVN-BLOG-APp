<template>
  <div class="text-sm flex items-center">
    <Clock class="h-4 w-4"/>
    <span class="ml-2">{{ useReadingTiming(text) }} min read</span>
  </div>
</template>

<script setup lang="ts">

import {defineProps} from "vue";

defineProps({
  text: {
    type: String,
    default: ''
  }
});

import {useReadingTiming} from "../../composables/useReadingTiming.ts";
import {Clock} from "lucide-vue-next";
</script>
