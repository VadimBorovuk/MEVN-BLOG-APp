import { toast} from 'vue3-toastify';
import {useThemeStore} from "../stores/themeStore.ts";

export const useShowNotify = () => {

  const showNotify = (haveError: boolean, errorText: string, successText: string) => {
    const themeStore = useThemeStore();

    if (haveError) {
      toast(errorText, {
        icon: "⛔️",
        type: "error",
        theme: themeStore.theme === 'dark' ? "dark" : "light",
      });
    }
    if (!haveError && successText) {
      toast(successText, {
        icon: "🛎️",
        theme: themeStore.theme === 'dark' ? "dark" : "light",
      });
    }
  };

  return {showNotify};
}
