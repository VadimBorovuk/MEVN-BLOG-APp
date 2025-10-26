import {axiosInstance} from "../utils/axios.ts";
import type {PartialAuth, PartialFormAuth} from "../types";

export function getAuthCheck() {
  return axiosInstance({
    url: `/auth/check`,
    method: 'get'
  })
}

export function loginAuth(data: PartialFormAuth) {
  return axiosInstance({
    url: `/auth/login`,
    method: 'post',
    data
  })
}

export function signupAuth(data: PartialFormAuth) {
  return axiosInstance({
    url: `/auth/signup`,
    method: 'post',
    data
  })
}

export function updateUserAuth(data: PartialAuth) {
  return axiosInstance({
    url: `/auth/update_profile`,
    method: 'put',
    data
  })
}
