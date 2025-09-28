import {defineStore} from 'pinia'
import {ref} from "vue";
import {getAuthCheck, loginAuth, signupAuth} from "../api/authApi.ts";
import type {AxiosResponse} from "axios";

type TypeAuthUser = {
  _id?: string
  fullName?: string
  email?: string
  password?: string
  token?: string
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
      console.log("Error in checkAuth:", error);
      authUser.value = null;
    } finally {
      isCheckingAuth.value = false;
      isChecked.value = true;
    }
  }

  const login = async (data, router) => {
    isLoggingIn.value = true;
    try {
      const res: AxiosResponse<TypeAuthUser> = await loginAuth(data);
      authUser.value = res.data;
      localStorage.setItem('token', res.data.token);
      router.push("/")
    } catch (e) {
      console.log(e)
    } finally {
      isLoggingIn.value = false;
    }
  }

  const signup = async (data, router) => {
    isSigningUp.value = true;
    try {
      const res: AxiosResponse<TypeAuthUser> = await signupAuth(data);
      authUser.value = res.data;
      localStorage.setItem('token', res.data.token)
      router.push({path: '/'})
    } catch (e) {
      console.log(e)
    } finally {
      isSigningUp.value = false;
    }
  }

  const logout = async (router) => {
    authUser.value = null;
    localStorage.removeItem("token");
    router.push({path: '/login'})
  }

  return {
    authUser,
    checkAuth,
    logout,
    login,
    signup
  }
})
