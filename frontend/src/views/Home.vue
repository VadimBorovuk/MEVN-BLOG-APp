<template>
  <div>
    {{ count }}
    <button @mouseleave="incrementCount">increment</button>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const count = ref<number>(0);
const incrementCount = () => {
  count.value++
}
</script>
