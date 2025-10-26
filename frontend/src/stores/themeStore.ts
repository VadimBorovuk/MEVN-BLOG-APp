import {defineStore} from "pinia";
import {ref} from "vue";

export const useThemeStore = defineStore('ThemeStore', () => {
  let theme = ref(localStorage.getItem("blog-theme") || "light");

  const setTheme = (themeColor: string) => {
    localStorage.setItem("blog-theme", themeColor);
    theme.value = themeColor
  }

  return {
    theme, setTheme
  }
})
