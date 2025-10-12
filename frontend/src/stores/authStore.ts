import {defineStore} from 'pinia'
import {ref} from "vue";
import {getAuthCheck, loginAuth, signupAuth, updateUserAuth} from "../api/authApi.ts";
import type {AxiosResponse} from "axios";
import type {Router} from "vue-router";
import type {TypeAuth} from "../types";


export const useAuthStore = defineStore('authUser', () => {
  const authUser = ref<TypeAuth | null>(null);
  const isSigningUp = ref(false);
  const isLoggingIn = ref(false);
  const isCheckingAuth = ref(true);
  const isChecked = ref(false);
  const isChangeProfile = ref(false);

  const currentAvatarProfile = ref<string>('')

  const checkAuth = async () => {
    try {
      const res = await getAuthCheck();
      authUser.value = res.data
    } catch (error) {
      console.log(error);
      authUser.value = null;
    } finally {
      isCheckingAuth.value = false;
      isChecked.value = true;
    }
  }

  const login = async (data: TypeAuth, router: Router) => {
    isLoggingIn.value = true;
    try {
      const res: AxiosResponse<TypeAuth> = await loginAuth(data);
      authUser.value = res.data;
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      router.push("/")
    } catch (e) {
      console.log(e)
    } finally {
      isLoggingIn.value = false;
    }
  }

  const signup = async (data: TypeAuth, router: Router) => {
    isSigningUp.value = true;
    try {
      const res: AxiosResponse<TypeAuth> = await signupAuth(data);
      authUser.value = res.data;
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      router.push({path: '/'})
    } catch (e) {
      console.log(e)
    } finally {
      isSigningUp.value = false;
    }
  }

  const logout = async (router: Router) => {
    authUser.value = null;
    localStorage.removeItem("token");
    router.push({path: '/login'})
  }

  const updateProfile = async () => {
    isChangeProfile.value = true;
    try {
      const res: AxiosResponse<TypeAuth> = await updateUserAuth({
        ...authUser.value,
        profilePic: currentAvatarProfile.value
      });
      authUser.value = res.data;
      currentAvatarProfile.value = res.data.profilePic;
    } catch (e) {
      console.log(e)
    } finally {
      isChangeProfile.value = false;
    }
  }

  const changeAvatarProfile = (data: string) => {
    currentAvatarProfile.value = data
  }

  return {
    authUser,
    isSigningUp,
    isLoggingIn,
    isCheckingAuth,
    isChecked,
    isChangeProfile,
    currentAvatarProfile,
    checkAuth,
    logout,
    login,
    signup,
    updateProfile,
    changeAvatarProfile
  }
})



