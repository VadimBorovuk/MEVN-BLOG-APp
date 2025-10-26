<template>
  <div class="breadcrumbs text-lg">
    <ul>
      <li>
        <router-link to="/">
          <House class="w-5 h-5"/>
          <span>Blogs</span>
        </router-link>
      </li>
      <li class="font-bold">
        <component :is="getIcon" class="w-5 h-5"/>
        <span class="ml-2">{{ currentCrumb }}</span>
      </li>
    </ul>
  </div>
  <div class="divider mt-0"></div>
</template>

<script setup lang="ts">
import {House, DiamondPlus, NotebookTabs, SquarePen} from "lucide-vue-next";
import {computed, defineProps} from "vue";

const props = defineProps<{
  currentCrumb: string | undefined
  type: string | undefined
}>()

const getIcon = computed(() => {
  switch (props.type) {
    case 'create':
      return DiamondPlus
    case 'update':
      return SquarePen
    case 'view':
      return NotebookTabs
  }
})
</script>
