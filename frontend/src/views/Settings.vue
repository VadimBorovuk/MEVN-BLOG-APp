<template>
  <div class="container mx-auto px-4 max-w-5xl">
    <div class="space-y-6 flex justify-center items-center flex-col">
      <div class="flex flex-col gap-1">
        <h2 class="text-center text-lg font-semibold">Theme</h2>
        <p class="text-center text-sm text-base-content/70">Choose a theme for your chat interface</p>
      </div>

      <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 w-full">
        <button
            v-for="t in THEMES"
            :key="t"
            :class="[
        'group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors',
        themeStore.theme === t ? 'bg-base-200' : 'hover:bg-base-200/50'
      ]"
            @click="themeStore.setTheme(t)"
        >
          <div class="relative h-8 w-full rounded-md overflow-hidden" :data-theme="t">
            <div class="absolute inset-0 grid grid-cols-4 gap-px p-1">
              <div class="rounded bg-primary"></div>
              <div class="rounded bg-secondary"></div>
              <div class="rounded bg-accent"></div>
              <div class="rounded bg-neutral"></div>
            </div>
          </div>
          <span class="text-[11px] font-medium truncate w-full text-center">
        {{ t.charAt(0).toUpperCase() + t.slice(1) }}
      </span>
        </button>
      </div>

      <div class="flex justify-center w-full items-center card bg-base-100 max-w-md shadow-lg mt-10 border border-gray-200">
        <figure class="min-h-[100px] max-h-[250px]">
          <img
              src='/image.png'
              alt="preview" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">
            Card Title
            <div class="badge badge-secondary">NEW</div>
          </h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae orci ac lorem bibendum tempus. Suspendisse potenti. Phasellus blandit orci et lorem viverra, sit amet tristique ex vehicula. Integer at orci at nulla gravida eleifend. Nulla facilisi. Donec nec eros sit amet sapien egestas tincidunt eget ac urna.</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Fashion</button>
            <button class="btn btn-neutral">Products</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import {THEMES} from "../constants";
import {useThemeStore} from "../stores/themeStore.js";

const themeStore = useThemeStore();
</script>

