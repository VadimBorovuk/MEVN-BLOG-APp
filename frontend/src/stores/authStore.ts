import {defineStore} from 'pinia'
import {ref} from "vue";
import {getAuthCheck, loginAuth, signupAuth} from "../api/authApi.ts";
import type {AxiosResponse} from "axios";
import type { Router } from "vue-router";

export type TypeAuthUser = {
  _id?: string
  fullName?: string
  email?: string
  password?: string
  token?: string
  profilePic?: string
}

export const useAuthStore = defineStore('authUser', () => {
  const authUser = ref<TypeAuthUser | null>(null);
  const isSigningUp = ref(false);
  const isLoggingIn = ref(false);
  const isCheckingAuth = ref(true);
  const isChecked = ref(false);

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

  const login = async (data: TypeAuthUser, router: Router) => {
    isLoggingIn.value = true;
    try {
      const res: AxiosResponse<TypeAuthUser> = await loginAuth(data);
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

  const signup = async (data: TypeAuthUser, router: Router) => {
    isSigningUp.value = true;
    try {
      const res: AxiosResponse<TypeAuthUser> = await signupAuth(data);
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

  return {
    authUser,
    isSigningUp,
    isLoggingIn,
    isCheckingAuth,
    isChecked,
    checkAuth,
    logout,
    login,
    signup
  }
})



