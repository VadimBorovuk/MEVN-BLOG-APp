import {defineStore} from "pinia";
import {ref} from "vue";

export const useThemeStore = defineStore('ThemeStore', () => {
  let theme = ref(localStorage.getItem("chat-theme") || "coffee");

  const setTheme = (themeColor: any) => {
    localStorage.setItem("chat-theme", themeColor);
    theme.value = themeColor
  }

  // must apply theme immediatly

  return {
    theme, setTheme
  }
})
