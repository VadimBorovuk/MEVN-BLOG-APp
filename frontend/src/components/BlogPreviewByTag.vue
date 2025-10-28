<template>
  <div class="bg-base-300 rounded-2xl p-14 relative w-full flex shadow-2xl mb-6">
    <div class="absolute top-4 left-4 right-4 bottom-4">
      <img class="w-full h-full object-cover rounded-xl"
           :src="useTagColor(currentQueryTag)?.url" alt="image">
    </div>
    <div class="tag-cover-content-wrap max-w-3xl mx-auto text-center relative text-gray-50">
      <h1 class="relative z-1 my-0 text-3xl font-bold"
          v-if="currentQueryTag">
        {{currentQueryTag.toUpperCase()}}
      </h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {useTagColor} from "../composables/useTagOfBlog.ts";
import {ref, watch} from "vue";

const route = useRoute();
const currentQueryTag = ref('')


watch(() => route.query.tag, (val) => {
  currentQueryTag.value = val as string
},{ immediate: true})

</script>

<style scoped>
.tag-cover-content-wrap{
  max-width: 848px;
  margin: 3rem auto;
  padding: 1.5rem;
  z-index: 1;
}
.tag-cover-content-wrap:before{
  content: "";
  background-color: #161819;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 90%;
  border-radius: 16px;
}
</style>
