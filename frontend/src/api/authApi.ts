import {axiosInstance} from "../utils/axios.ts";
import type {TypeAuthUser} from "../stores/authStore.ts";

export function getAuthCheck() {
  return axiosInstance({
    url: `/auth/check`,
    method: 'get'
  })
}

export function loginAuth(data: TypeAuthUser) {
  return axiosInstance({
    url: `/auth/login`,
    method: 'post',
    data
  })
}

export function signupAuth(data: TypeAuthUser) {
  return axiosInstance({
    url: `/auth/signup`,
    method: 'post',
    data
  })
}
