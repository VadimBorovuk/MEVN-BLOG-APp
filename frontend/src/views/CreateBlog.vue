<template>
  <div class="container mx-auto px-4 pt-16 pb-10" ref="formEndRef">

    <Breadcrumbs current-crumb="Create blog" type="create"/>

    <form @submit.prevent="createNewBlog">

      <fieldset class="fieldset mb-3">
        <legend class="fieldset-legend">Blog title</legend>
        <input
            type="text"
            class="input validator w-full"
            required
            placeholder="Enter title"
            v-model="blogStore.blogDataCreate.title"
            pattern=".{3,100}"
            minlength="3"
            maxlength="100"
            title="Введіть від 3 до 100 символів"
        />
        <p class="validator-hint">
          Must be 3 to 30 characters
        </p>
      </fieldset>

      <fieldset class="fieldset mb-3">
        <legend class="fieldset-legend">Tags</legend>
        <select class="select select-primary" v-model="blogStore.blogDataCreate.tag">
          <option disabled selected>Pick a tags</option>
          <option
              v-for="tag in TAGS"
              :key="tag"
              :value="tag"
          >
            {{ tag }}
          </option>
        </select>
      </fieldset>

      <fieldset class="fieldset mb-3">
        <legend class="fieldset-legend">Blog content</legend>
        <Ckeditor v-model="blogStore.blogDataCreate.content" placeholder="Enter content"/>
      </fieldset>


      <div class="flex justify-between mb-6">
        <div class="flex flex-col flex-1">
          <fieldset class="fieldset mb-3">
            <legend class="fieldset-legend">Blog preview image</legend>
            <input type="file"
                   class="file-input file-input-success"
                   accept="image/*"
                   @change="handleImageUpload"
            />
          </fieldset>

          <div
              v-if="blogStore.blogDataCreate.previewImage"
              class="max-w-sm mb-3">
            <div class="avatar">
              <div class="w-72 rounded">
                <img :src="blogStore.blogDataCreate.previewImage"/>
              </div>
            </div>
          </div>
        </div>

        <div class="flex-1 pointer-events-none">
          <fieldset class="fieldset mb-3">
            <legend class="fieldset-legend">Preview</legend>
          </fieldset>

          <BlogCard
              :blog-data="blogStore.blogDataCreate"
              :index="0"
          />
        </div>
      </div>

      <button type="submit" class="btn btn-soft btn-success flex items-center w-full">
        <DiamondPlus/>
        <span>Create</span>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">

import Ckeditor from "../components/Ckeditor.vue";
import {useBlogStore} from "../stores/blogStore.js";
import {DiamondPlus} from "lucide-vue-next";
import Breadcrumbs from "../components/UI/Breadcrumbs.vue";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {useNotification} from "@kyvg/vue3-notification";
import BlogCard from "../components/BlogCardOld.vue";
import {TAGS} from "../constants"

const blogStore = useBlogStore();
const router = useRouter();
const {notify} = useNotification();

const formEndRef = ref<HTMLDivElement | null>(null);

const createNewBlog = async () => {
  try {
    await blogStore.addBlog();
    notify({
      duration: 4000,
      type: "success",
      title: "Success",
      text: "Create",
    });
    await router.push({path: '/', query: {}})
  } catch (e) {
    notify({
      duration: 4000,
      type: "error",
      title: "Error",
      text: "error",
    });
  }
}

const handleImageUpload = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;
  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = async () => {
    blogStore.selectPreviewImage(reader.result as string)
  };
};

onMounted(() => {
  blogStore.clearParamsBlog()
  if (formEndRef.value) {
    formEndRef.value.scrollIntoView({behavior: "smooth"});
  }
})
</script>
