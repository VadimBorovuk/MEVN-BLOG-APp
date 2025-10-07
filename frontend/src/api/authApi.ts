import {axiosInstance} from "../utils/axios.ts";
import type {PartialAuth, TypeAuth} from "../types";

export function getAuthCheck() {
  return axiosInstance({
    url: `/auth/check`,
    method: 'get'
  })
}

export function loginAuth(data: TypeAuth) {
  return axiosInstance({
    url: `/auth/login`,
    method: 'post',
    data
  })
}

export function signupAuth(data: TypeAuth) {
  return axiosInstance({
    url: `/auth/signup`,
    method: 'post',
    data
  })
}

export function updateAvatar(data: PartialAuth) {
  return axiosInstance({
    url: `/auth/update_profile`,
    method: 'put',
    data
  })
}
