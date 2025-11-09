<template>
  <div class="container mx-auto px-4 pt-16 pb-10">

    <Breadcrumbs current-crumb="Update blog" type="update"/>

    <template v-if="blogStore.isLoadingCurrentBlog">
      <FormSkeleton/>
    </template>

    <template v-else>
      <form @submit.prevent="updateNewBlog">

        <div class="flex items-start justify-between">
          <fieldset class="fieldset flex-1 mr-6">
            <legend class="fieldset-legend">Blog title</legend>
            <input
                type="text"
                class="input validator w-full"
                required
                placeholder="Enter title"
                v-model="blogStore.currentBlog.title"
                pattern=".{3,100}"
                minlength="3"
                :disabled="isAuthor"
                maxlength="100"
                title="Введіть від 3 до 100 символів"
            />
            <p class="validator-hint">
              Must be 3 to 30 characters
            </p>
          </fieldset>

          <fieldset class="fieldset flex-1">
            <legend class="fieldset-legend">Tags</legend>
            <select class="select select-primary w-full"
                    :disabled="isAuthor"
                    v-model="blogStore.currentBlog.tag">
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
        </div>


        <fieldset class="fieldset">
          <legend class="fieldset-legend">Blog content</legend>
          <Ckeditor v-model="contentModel"
                    :config="editorConfig"
                    :disabled="authUserStore.authUser?._id !== blogStore.currentBlog?.userId?._id"
                    placeholder="Enter content"/>
        </fieldset>

        <div class="flex justify-between mb-6">
          <div class="flex flex-col flex-2">
            <fieldset class="fieldset mb-3">
              <legend class="fieldset-legend">Blog preview image</legend>
              <input type="file"
                     :disabled="isAuthor"
                     class="file-input file-input-success"
                     accept="image/*"
                     @change="handleImageUpload"
              />
            </fieldset>

            <div
                v-if="blogStore.currentBlog.previewImage"
                class="max-w-sm mb-3">
              <div class="avatar">
                <div class="w-72 rounded">
                  <img :src="blogStore.currentBlog.previewImage"/>
                </div>
              </div>
            </div>
          </div>

          <div class="flex-3 pointer-events-none">
            <fieldset class="fieldset mb-3">
              <legend class="fieldset-legend">Preview</legend>
            </fieldset>

            <BlogCard
                :blog-data="blogStore.currentBlog"
                :index="0"
            />
          </div>
        </div>

        <button
            type="submit"
            :disabled="isAuthor"
            class="btn btn-soft btn-success flex items-center w-full">
          <SquarePen/>
          <span>Save</span>
        </button>
      </form>
    </template>

  </div>
</template>

<script setup lang="ts">
import Ckeditor from "../components/Ckeditor.vue";
import {useBlogStore} from "../stores/blogStore.js";
import {SquarePen} from "lucide-vue-next";
import Breadcrumbs from "../components/UI/Breadcrumbs.vue";
import {computed, onMounted} from "vue";
import {useRoute} from "vue-router";
import BlogCard from "../components/BlogCard.vue";
import FormSkeleton from "../components/UI/FormSkeleton.vue";
import {TAGS} from "../constants";
import {useShowNotify} from "../composables/useNotivue.ts";
import {useAuthStore} from "../stores/authStore.ts";

const blogStore = useBlogStore();
const route = useRoute()
const currentBlogId = route.params.id
const authUserStore = useAuthStore()

const isAuthor = computed(()=>authUserStore.authUser?._id !== blogStore.currentBlog?.userId?._id)
const editorConfig = {
  readOnly: isAuthor.value
}
const {showNotify} = useShowNotify();

const updateNewBlog = async () => {
  try {
    await blogStore.updateCurrentBlog(currentBlogId ?? '');
    await blogStore.getCurrentBlog(currentBlogId ?? '')

    showNotify(false, "", "Post updated");

  } catch (e) {
    showNotify(true, "Don't updated post", "");
  }
}

const contentModel = computed({
  get: () => blogStore.currentBlog.content || '',
  set: (val: string) => (blogStore.currentBlog.content = val),
})

const handleImageUpload = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;
  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = async () => {
    blogStore.changePreviewImage(reader.result as string)
  };
};

onMounted(() => {
  if (currentBlogId) {
    blogStore.getCurrentBlog(currentBlogId)
  }
})
</script>
