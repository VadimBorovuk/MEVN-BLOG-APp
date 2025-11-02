import {defineStore} from 'pinia'
import {ref} from "vue";
import {getAuthCheck, loginAuth, signupAuth, updateUserAuth} from "../api/authApi.ts";
import type {AxiosResponse} from "axios";
import type {Router} from "vue-router";
import type {PartialFormAuth, TypeAuth} from "../types";
import type {Socket} from "socket.io-client";
import {io} from "socket.io-client";
import {useShowNotify} from "../composables/useNotivue.ts";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:2001" : "/";

export const useAuthStore = defineStore('authUser', () => {
  const {showNotify} = useShowNotify();

  const authUser = ref<TypeAuth | null>(null);
  const isSigningUp = ref(false);
  const isLoggingIn = ref(false);
  const isCheckingAuth = ref(true);
  const isChecked = ref(false);
  const isChangeProfile = ref(false);
  const currentAvatarProfile = ref<string>('');
  const socket = ref<Socket | null>(null);

  const connectSocket = () => {
    if (!authUser.value || socket.value?.connected) return;

    const socketVal = io(BASE_URL, {
      query: {
        userId: authUser.value._id,
      },
    });

    socketVal.connect();
    socket.value = socketVal;

    socketVal.on("newBlog", (data: string) => {
      const blog = JSON.parse(data);
      showNotify(false, "", `${blog?.userId?.fullName} create <a class="underline" href="/blogs/${blog._id}">${blog.title}</a>`);
    });

    socketVal.on("newComment", (data: string) => {
      const {blog, comment} = JSON.parse(data);

      if (comment?.userId?.fullName && (blog.userId === authUser.value?._id)) {
        showNotify(false, "", `${comment?.userId?.fullName} added a comment under  <a class="underline" href="/blogs/${blog._id}">${blog.title}</a>`);
      }
    });

    socketVal.on("newLikeBlog", (data: string) => {
      const {blog, like} = JSON.parse(data);

      if (like?.userId?.fullName && (blog.userId === authUser.value?._id)) {
        showNotify(false, "", `${like?.userId?.fullName} liked  <a class="underline" href="/blogs/${blog._id}">"${blog.title}"</a>`);
      }
    });
  }

  const disconnectSocket = () => {
    if (socket.value?.connected) socket.value?.disconnect();
  }

  const checkAuth = async () => {
    try {
      const res = await getAuthCheck();
      authUser.value = res.data;
      connectSocket();
    } catch (error) {
      console.log(error);
      authUser.value = null;
    } finally {
      isCheckingAuth.value = false;
      isChecked.value = true;
    }
  }

  const login = async (data: PartialFormAuth, router: Router) => {
    isLoggingIn.value = true;
    try {
      const res: AxiosResponse<TypeAuth> = await loginAuth(data);
      authUser.value = res.data;
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      router.push("/")
      connectSocket()
    } catch (e) {
      console.log(e)
    } finally {
      isLoggingIn.value = false;
    }
  }

  const signup = async (data: PartialFormAuth, router: Router) => {
    isSigningUp.value = true;
    try {
      const res: AxiosResponse<TypeAuth> = await signupAuth(data);
      authUser.value = res.data;
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      router.push({path: '/'})
      connectSocket()
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
    disconnectSocket()
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
    socket,
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



