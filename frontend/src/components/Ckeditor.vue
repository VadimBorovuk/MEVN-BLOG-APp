<template>
  <ckeditor
      v-if="editorConfig"
      v-model="localContent"
      :config="editorConfig"
  />
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from "vue"

const props = defineProps<{
  modelValue: string
}>()

// === Emits ===
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

// === Local content (editable copy of modelValue) ===
const localContent = ref(props.modelValue)

// === Watch for external modelValue changes ===
watch(
    () => props.modelValue,
    (newVal) => {
      if (newVal !== localContent.value) {
        localContent.value = newVal
      }
    }
)

// === Watch for local content changes (emit updates) ===
watch(localContent, (newVal) => {
  emit('update:modelValue', newVal)
})

// === CKEditor config ===
const editorConfig = {
  removePlugins: ['image'],
  removeButtons: 'underline',
  extraPlugins: [
    'justify',
    'smiley',
    'font',
    'colorbutton',
    'uploadimage',
    'image2',
    'stylesheetparser',
    'language',
    'indent',
    'indentblock',
    'pastefromgdocs',
  ],
  allowedContent: true,
  indentlist: false,
  extraAllowedContent: '*(*); *[*]',
  fullPage: false,
  ignoreEmptyParagraph: false,
  preserveWhitespace: true,
  versionCheck: false,
  autoParagraph: false,
  height: 250
}
</script>
