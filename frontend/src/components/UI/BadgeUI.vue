<template>
  <div class="dropdown dropdown-hover">
    <div class="badge badge-lg">
      <component :is="getIcon" class="w-5 h-5"/>
      {{data?.list?.length}}
    </div>

    <ul v-if="data?.label === 'like' && !!data?.list?.length" tabindex="-1" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
      <li v-for="item in data?.list">
        {{ item?.userId?.fullName }}
      </li>
    </ul>
  </div>


</template>

<script setup lang="ts">
import {computed} from "vue";
import {Flag, ThumbsUp, MessageCircle} from 'lucide-vue-next';
import type {TypeBadge} from "../../types";


const props = defineProps<{
  data?: TypeBadge | null
}>()

const getIcon = computed(() => {
  switch (props.data?.label) {
    case 'like':
      return ThumbsUp
    case 'comment':
      return MessageCircle
    default:
      return Flag
  }
})
</script>
